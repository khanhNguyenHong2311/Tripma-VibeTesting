import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const flightId = url.pathname.split("/")[3];

  try {
    const seats = await prisma.seat.findMany({
      where: {
        flightId: flightId,
        available: true,
      },
      orderBy: [
        {
          seatNumber: "asc",
        },
      ],
    });

    const businessSeats = seats.filter((seat) => seat.type === "Business");
    const economySeats = seats.filter((seat) => seat.type === "Economy");
    return NextResponse.json({
      businessSeats,
      economySeats,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
