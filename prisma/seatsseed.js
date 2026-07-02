const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Fetch a subset of flights from the database
  const flights = await prisma.flight.findMany({
    select: {
      flightId: true,
    },
  });

  for (const flight of flights) {
    // Seed both Economy and Business seats for each flight
    await seedSeats(flight.flightId, "Economy");
    await seedSeats(flight.flightId, "Business");
  }

  console.log("Seats have been seeded successfully.");
}

async function seedSeats(flightId, seatType) {
  // Define the range of rows to choose from
  const maxRows = 35;
  const minRows = seatType === "Business" ? 3 : 10;
  const rows = Math.floor(Math.random() * (maxRows - minRows + 1)) + minRows;

  const seatsPerRow = seatType === "Business" ? 4 : 6;

  // Create a set to track unique seat numbers for this flight
  const uniqueSeatNumbers = new Set();

  const seats = [];

  for (let row = 1; row <= rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      let seatNumber;
      do {
        seatNumber = `${String.fromCharCode(64 + seat)}${row}`; // e.g., A1, B2
      } while (uniqueSeatNumbers.has(seatNumber));

      uniqueSeatNumbers.add(seatNumber);

      seats.push({
        flightId: flightId,
        type: seatType,
        seatNumber: seatNumber,
        available: true, // Or set based on availability logic
        price: seatType === "Business" ? 500 : 100, // Example pricing
      });
    }
  }

  // Insert seats into the database
  await prisma.seat.createMany({
    data: seats,
    skipDuplicates: true, // To avoid duplication errors if running the seed multiple times
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
