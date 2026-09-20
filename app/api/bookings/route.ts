import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
      if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        success: false,
        message:
          "Online booking is coming soon. Please contact Green Hill Retreat directly for reservations.",
      },
      { status: 503 }
    );
  }
  try {
    const body = await request.json();

    const {
      guestName,
      guestPhone,
      guestEmail,
      guestAddress = null,
      guestIdDocument = null,
      checkIn,
      checkOut,
      adults = 1,
      children = 0,
      roomId,
      packageId = null,
      promoCode = null,
      extras = [],
      source = "WEBSITE",
    } = body;

    if (!guestName || !guestPhone || !guestEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Guest name, phone and email are required.",
        },
        { status: 400 }
      );
    }

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        {
          success: false,
          message: "Check-in and check-out are required.",
        },
        { status: 400 }
      );
    }

    if (!roomId) {
      return NextResponse.json(
        {
          success: false,
          message: "A room must be selected.",
        },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (
      Number.isNaN(checkInDate.getTime()) ||
      Number.isNaN(checkOutDate.getTime())
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid check-in or check-out date.",
        },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Check-out must be after check-in.",
        },
        { status: 400 }
      );
    }

    const adultCount = Number(adults);
    const childCount = Number(children);

    if (
      !Number.isInteger(adultCount) ||
      !Number.isInteger(childCount) ||
      adultCount < 1 ||
      childCount < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid guest count.",
        },
        { status: 400 }
      );
    }
    const availabilityUrl = new URL(
  "/api/availability",
  request.url
);

const availabilityResponse = await fetch(availabilityUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    checkIn,
    checkOut,
    adults: adultCount,
    children: childCount,
    packageId,
    promoCode,
    extras,
  }),
  cache: "no-store",
});

const availabilityResult = await availabilityResponse.json();

if (!availabilityResponse.ok || !availabilityResult.success) {
  return NextResponse.json(
    {
      success: false,
      message: "Unable to verify live availability.",
    },
    { status: 400 }
  );
}
const selectedRoom = availabilityResult.rooms?.find(
  (room: { id: string }) => room.id === roomId
);
if (!selectedRoom) {
  return NextResponse.json(
    {
      success: false,
      message:
        "The selected room is no longer available for these dates.",
    },
    { status: 409 }
  );
}
  let createdBooking;

for (let attempt = 0; attempt < 3; attempt++) {
  try {
    createdBooking = await prisma.$transaction(
      async (tx) => {
    const roomForBooking = await tx.room.findUnique({
  where: {
    id: roomId,
  },
  select: {
    id: true,
    quantity: true,
  },
});

if (!roomForBooking) {
  throw new Error("Selected room no longer exists.");
}

const overlappingBookings = await tx.booking.count({
  where: {
    roomId,
    OR: [
  {
    status: "CONFIRMED",
  },
  {
    status: "PENDING",
    holdExpiresAt: {
      gt: new Date(),
    },
  },
],
    checkIn: {
      lt: checkOutDate,
    },
    checkOut: {
      gt: checkInDate,
    },
  },
});

if (overlappingBookings >= roomForBooking.quantity) {
  throw new Error(
    "The selected room is no longer available for these dates."
  );
}
  const year = checkInDate.getUTCFullYear();

  const counter = await tx.bookingCounter.upsert({
    where: {
      year,
    },
    update: {
      sequence: {
        increment: 1,
      },
    },
    create: {
      year,
      sequence: 1,
    },
  });

  const bookingNumber = `GHR-${year}-${String(
    counter.sequence
  ).padStart(5, "0")}`;

  const booking = await tx.booking.create({
    data: {
      bookingNumber,

      checkIn: checkInDate,
      checkOut: checkOutDate,

      guests: adultCount + childCount,
      adults: adultCount,
      children: childCount,

      guestName,
      guestPhone,
      guestEmail,
      guestAddress,
      guestIdDocument,

      propertyId: "green-hill-retreat",
      roomId,
      packageId,

      source,

      subtotalAmount: selectedRoom.subtotal,
      discountAmount: selectedRoom.discountAmount,
      extrasAmount: selectedRoom.extrasAmount,
      taxAmount: selectedRoom.taxAmount,
      totalAmount: selectedRoom.finalAmount,

      status: "PENDING",
      paymentStatus: "UNPAID",
      holdExpiresAt: new Date(Date.now() + 15 * 60 * 1000),

      nights: {
        create: selectedRoom.nightlyRates.map(
          (night: {
            date: string;
            rate: number;
          }) => ({
            date: new Date(`${night.date}T00:00:00.000Z`),
            baseRate: night.rate,
            finalRate: night.rate,
          })
        ),
      },

      bookingExtras: {
        create: selectedRoom.selectedExtras.map(
          (extra: {
            name: string;
            quantity: number;
            unitPrice: number;
            totalPrice: number;
          }) => ({
            name: extra.name,
            quantity: extra.quantity,
            unitPrice: extra.unitPrice,
            totalPrice: extra.totalPrice,
          })
        ),
      },
    },

    include: {
      nights: true,
      bookingExtras: true,
    },
  });

    return booking;
      },
      {
        isolationLevel: "Serializable",
      }
    );

    break;
  } catch (error: any) {
    if (error?.code === "P2034" && attempt < 2) {
      continue;
    }

    throw error;
  }
}

if (!createdBooking) {
  throw new Error("Unable to create booking.");
}

  return NextResponse.json({
  success: true,
  message: "Booking created successfully.",
  booking: createdBooking,
  pricing: selectedRoom,
});
  } catch (error) {
  console.error("BOOKING API ERROR:", error);

  const message =
    error instanceof Error
      ? error.message
      : "Unable to process booking request.";

  const status =
    message === "The selected room is no longer available for these dates."
      ? 409
      : 500;

  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}
}