import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
const {
  checkIn,
  checkOut,
  adults = 1,
  children = 0,
  packageId = null,
  promoCode = null,
  extras = [],
} = body;

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        {
          success: false,
          message: "Check-in and check-out are required.",
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

const totalGuests = adultCount + childCount;
const requestedExtras = Array.isArray(extras) ? extras : [];

const normalizedExtras = requestedExtras
  .map((item) => ({
    id: String(item?.id ?? ""),
    quantity: Number(item?.quantity ?? 0),
  }))
  .filter(
    (item) =>
      item.id.length > 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
  );
  const extraIds = normalizedExtras.map((item) => item.id);

const extraRecords =
  extraIds.length > 0
    ? await prisma.extra.findMany({
        where: {
          id: {
            in: extraIds,
          },
          isActive: true,
        },
        select: {
          id: true,
          name: true,
          price: true,
          taxType: true,
          taxPercentage: true,
        },
      })
    : [];

const now = new Date();

await prisma.booking.updateMany({
  where: {
    status: "PENDING",
    holdExpiresAt: {
      lte: now,
    },
  },
  data: {
    status: "EXPIRED",
  },
});
   const rooms = await prisma.room.findMany({
  where: {
  isActive: true,

  capacity: {
    gte: totalGuests,
  },

  OR: [
    { maxAdults: null },
    { maxAdults: { gte: adultCount } },
  ],

  AND: [
    {
      OR: [
        { maxChildren: null },
        { maxChildren: { gte: childCount } },
      ],
    },
  ],

    availability: {
      none: {
        date: {
          gte: checkInDate,
          lt: checkOutDate,
        },
        OR: [
          { isOpen: false },
          { isBlocked: true },
          { isSoldOut: true },
        ],
      },
    },
  },

  select: {
    id: true,
    name: true,
    capacity: true,
    maxAdults: true,
    maxChildren: true,
    quantity: true,
    baseRate: true,
    property: {
    select: {
    taxPercentage: true,
  },
},
    availability: {
  where: {
    date: {
      gte: checkInDate,
      lt: checkOutDate,
    },
  },
  select: {
    date: true,
    minimumStay: true,
    maximumStay: true,
  },
},
    rates: {
  where: {
    date: {
      gte: checkInDate,
      lt: checkOutDate,
    },
  },
  select: {
    date: true,
    rate: true,
  },
},

    bookings: {
      where: {
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

      select: {
        id: true,
      },
    },
  },

  orderBy: {
    name: "asc",
  },
});
const stayDates: Date[] = [];

for (
  let date = new Date(checkInDate);
  date < checkOutDate;
  date.setUTCDate(date.getUTCDate() + 1)
) {
  stayDates.push(new Date(date));
}
const stayLength = stayDates.length;
const automaticDiscounts = await prisma.discount.findMany({
  where: {
    isActive: true,
    isAutomatic: true,
    AND: [
      {
        OR: [
          { startDate: null },
          { startDate: { lte: checkInDate } },
        ],
      },
      {
        OR: [
          { endDate: null },
          { endDate: { gte: checkOutDate } },
        ],
      },
    ],
  },
  select: {
    id: true,
    name: true,
    type: true,
    value: true,
    minimumStay: true,
    usageLimit: true,
    usageCount: true,
    rooms: {
    select: {
    roomId: true,
    },
},
    packages: {
    select: {
    packageId: true,
  },
},
  },
});
const promoDiscounts = promoCode
  ? await prisma.discount.findMany({
      where: {
        isActive: true,
        promoCode: {
          equals: String(promoCode),
          mode: "insensitive",
        },
        AND: [
          {
            OR: [
              { startDate: null },
              { startDate: { lte: checkInDate } },
            ],
          },
          {
            OR: [
              { endDate: null },
              { endDate: { gte: checkOutDate } },
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        type: true,
        value: true,
        minimumStay: true,
        usageLimit: true,
        usageCount: true,

        rooms: {
          select: {
            roomId: true,
          },
        },

        packages: {
          select: {
            packageId: true,
          },
        },
      },
    })
  : [];
const availableRooms = rooms
  .map((room) => {
    const bookedQuantity = room.bookings.length;
    const availableQuantity = room.quantity - bookedQuantity;

    const nightlyRates = stayDates.map((date) => {
      const dateKey = date.toISOString().slice(0, 10);

      const specificRate = room.rates.find(
        (roomRate) =>
          roomRate.date.toISOString().slice(0, 10) === dateKey
      );

      const rate = specificRate
        ? Number(specificRate.rate)
        : Number(room.baseRate);
      
      return {
        date: dateKey,
        rate,
        source: specificRate ? "DATE_RATE" : "BASE_RATE",
      };
    });

    const subtotal = nightlyRates.reduce(
      (total, night) => total + night.rate,
      0
    );
    const discountCandidates = [
  ...automaticDiscounts,
  ...promoDiscounts,
];
    const eligibleDiscounts = discountCandidates.filter((discount) => {
  if (
    discount.minimumStay !== null &&
    stayLength < discount.minimumStay
  ) {
    return false;
  }
if (
  discount.rooms.length > 0 &&
  !discount.rooms.some((item) => item.roomId === room.id)
) {
  return false;
}
if (
  packageId &&
  discount.packages.length > 0 &&
  !discount.packages.some(
    (item) => item.packageId === packageId
  )
) {
  return false;
}
if (
  !packageId &&
  discount.packages.length > 0
) {
  return false;
}
if (
  discount.usageLimit !== undefined &&
  discount.usageLimit !== null &&
  discount.usageCount !== undefined &&
  discount.usageCount >= discount.usageLimit
) {
  return false;
}
  return true;
});
let discountAmount = 0;
let appliedDiscount = null as null | {
  id: string;
  name: string;
  type: string;
  value: number;
};

for (const discount of eligibleDiscounts) {
  let calculatedDiscount = 0;

  if (discount.type === "PERCENTAGE") {
    calculatedDiscount =
      subtotal * (Number(discount.value) / 100);
  }

  if (discount.type === "FLAT") {
    calculatedDiscount = Number(discount.value);
  }

  if (calculatedDiscount > discountAmount) {
    discountAmount = calculatedDiscount;

    appliedDiscount = {
      id: discount.id,
      name: discount.name,
      type: discount.type,
      value: Number(discount.value),
    };
  }
}
discountAmount = Math.min(discountAmount, subtotal);
const selectedExtras = normalizedExtras
  .map((requestedExtra) => {
    const extra = extraRecords.find(
      (record) => record.id === requestedExtra.id
    );

    if (!extra) {
      return null;
    }

    const unitPrice = Number(extra.price);
    const totalPrice = unitPrice * requestedExtra.quantity;

    return {
      id: extra.id,
      name: extra.name,
      quantity: requestedExtra.quantity,
      unitPrice,
      totalPrice,
      taxType: extra.taxType,
      taxPercentage:
        extra.taxPercentage !== null
          ? Number(extra.taxPercentage)
          : null,
    };
  })
  .filter(
    (extra): extra is NonNullable<typeof extra> =>
      extra !== null
  );
  const standardExtrasAmount = selectedExtras
  .filter((extra) => extra.taxType === "STANDARD")
  .reduce((total, extra) => total + extra.totalPrice, 0);

const separateTaxExtrasAmount = selectedExtras
  .filter((extra) => extra.taxType === "SEPARATE")
  .reduce((total, extra) => total + extra.totalPrice, 0);

const nonTaxableExtrasAmount = selectedExtras
  .filter((extra) => extra.taxType === "NON_TAXABLE")
  .reduce((total, extra) => total + extra.totalPrice, 0);

const extrasAmount =
  standardExtrasAmount +
  separateTaxExtrasAmount +
  nonTaxableExtrasAmount;

const discountedStayAmount = subtotal - discountAmount;

const taxPercentage = Number(room.property.taxPercentage);

const standardTaxableAmount =
  discountedStayAmount + standardExtrasAmount;

const standardTaxAmount =
  standardTaxableAmount * (taxPercentage / 100);

const separateExtrasTaxAmount = selectedExtras
  .filter((extra) => extra.taxType === "SEPARATE")
  .reduce((total, extra) => {
    const extraTaxPercentage = extra.taxPercentage ?? 0;

    return (
      total +
      extra.totalPrice * (extraTaxPercentage / 100)
    );
  }, 0);

const taxAmount =
  standardTaxAmount + separateExtrasTaxAmount;

const finalAmount =
  discountedStayAmount +
  extrasAmount +
  taxAmount;
    const minimumStayRequired = Math.max(
  0,
  ...room.availability
    .map((item) => item.minimumStay)
    .filter((value): value is number => value !== null)
);

const maximumStayValues = room.availability
  .map((item) => item.maximumStay)
  .filter((value): value is number => value !== null);

const maximumStayAllowed =
  maximumStayValues.length > 0
    ? Math.min(...maximumStayValues)
    : null;

const meetsMinimumStay =
  minimumStayRequired === 0 ||
  stayLength >= minimumStayRequired;

const meetsMaximumStay =
  maximumStayAllowed === null ||
  stayLength <= maximumStayAllowed;

    return {
      id: room.id,
      name: room.name,
      capacity: room.capacity,
      maxAdults: room.maxAdults,
      maxChildren: room.maxChildren,
      quantity: room.quantity,
      availableQuantity,
      baseRate: Number(room.baseRate),
      nightlyRates,
      subtotal,
      discountAmount,
      discountedStayAmount,
      standardExtrasAmount,
      separateTaxExtrasAmount,
      nonTaxableExtrasAmount,
      extrasAmount,
      taxPercentage,
      standardTaxAmount,
      separateExtrasTaxAmount,
      taxAmount,
      finalAmount,
      selectedExtras,
      appliedDiscount,
      minimumStayRequired,
      maximumStayAllowed,
      meetsMinimumStay,
      meetsMaximumStay,
    };
  })
  .filter(
  (room) =>
    room.availableQuantity > 0 &&
    room.meetsMinimumStay &&
    room.meetsMaximumStay
);

return NextResponse.json({
  success: true,
  message: "Availability checked successfully.",
  checkIn,
  checkOut,
  rooms : availableRooms,
});
  } catch (error) {
  console.error("AVAILABILITY API ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message: "Unable to check availability.",
    },
    { status: 500 }
  );
}
}