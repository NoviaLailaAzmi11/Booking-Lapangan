import { auth } from "@/auth";
import { prisma } from "@/prisma";

async function requireAdmin(headers: Headers) {
  const session = await auth.api.getSession({
    headers,
    query: { disableCookieCache: true },
  });

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  return user?.role === "ADMIN" ? user : null;
}

export async function GET(request: Request) {
  const admin = await requireAdmin(request.headers);
  if (!admin) return Response.json({ message: "Akses admin diperlukan." }, { status: 403 });

  const [payments, bookings, customers, lapangan] = await Promise.all([
    prisma.payment.count(),
    prisma.booking.count(),
    prisma.customer.count(),
    prisma.lapangan.count(),
  ]);

  return Response.json({ payments, bookings, customers, lapangan });
}

export async function DELETE(request: Request) {
  const admin = await requireAdmin(request.headers);
  if (!admin) return Response.json({ message: "Akses admin diperlukan." }, { status: 403 });

  const [payments, bookings, customers, lapangan] = await prisma.$transaction([
    prisma.payment.deleteMany(),
    prisma.booking.deleteMany(),
    prisma.customer.deleteMany(),
    prisma.lapangan.deleteMany(),
  ]);

  return Response.json({
    message: "Data operasional berhasil direset.",
    deleted: {
      payments: payments.count,
      bookings: bookings.count,
      customers: customers.count,
      lapangan: lapangan.count,
    },
  });
}