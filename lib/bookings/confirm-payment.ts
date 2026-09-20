import { prisma } from "../prisma";

export async function confirmBookingAfterVerifiedPayment(
  paymentId: string
) {
  return prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        booking: true,
      },
    });

    if (!payment || payment.status !== "PAID") {
      throw new Error("A verified paid payment record is required.");
    }

    const booking = payment.booking;

    if (payment.amount.lessThan(booking.totalAmount)) {
      throw new Error("The payment does not cover the full booking amount.");
    }

    const now = new Date();

    const result = await tx.booking.updateMany({
      where: {
        id: booking.id,
        status: "PENDING",
        paymentStatus: "UNPAID",
        holdExpiresAt: {
          gt: now,
        },
      },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        holdExpiresAt: null,
      },
    });

    if (result.count !== 1) {
      throw new Error(
        "Booking cannot be confirmed. It may already be confirmed or its hold may have expired."
      );
    }

    return tx.booking.findUniqueOrThrow({
      where: {
        id: booking.id,
      },
    });
  });
}