const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function getRandomDate(startDate, days) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days);
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
}

function generateStopsInfo(numStops) {
  if (numStops === 0) return null;

  const cities = [
    "ICN",
    "LAX",
    "ORD",
    "HKG",
    "DXB",
    "LHR",
    "JFK",
    "NRT",
    "SYD",
    "SIN",
  ];

  const stops = [];
  for (let i = 0; i < numStops; i++) {
    const stopCity = cities[Math.floor(Math.random() * cities.length)];
    const durationHours = Math.floor(Math.random() * 4) + 1; // Random duration between 1 and 4 hours
    const durationMinutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
    stops.push(`${durationHours}h ${durationMinutes}m in ${stopCity}`);
  }
  return stops.join(", ");
}

async function generateAndInsertFlights() {
  const cities = ["New York", "Los Angeles", "Chicago"];

  const today = new Date();
  const nextWeek = 7; // Number of days for the next week

  const dummyFlights = [];

  // Generate base flights
  const baseFlights = Array.from({ length: 10 }).map((_, index) => {
    const departingDate = getRandomDate(today, nextWeek);
    const numStops = Math.floor(Math.random() * 3); // Random number of stops between 0 and 2

    return {
      fromCity: cities[index % cities.length],
      toCity: cities[(index + 1) % cities.length], // Ensure different from fromCity
      type: Math.random() < 0.75, // 75% chance for true, 25% chance for false
      imgPath: `/images/flight${index + 1}.jpg`,
      subtotalPrice: Math.random() * 2000 + 200, // Random price between 200 and 2200
      taxesAndFees: Math.random() * 50 + 100, // Random fees between 100 and 150
      baggageFees: Math.random() * 100 + 50, // Random baggage fees between 50 and 150
      airlineName: `Airline ${index + 1}`,
      duration: `${Math.floor(Math.random() * 10 + 1)}h ${Math.floor(
        Math.random() * 60
      )}min`,
      numberofStops: numStops,
      stopsInfo: generateStopsInfo(numStops),
      fromToTime: `${Math.floor(Math.random() * 12 + 1)}:00${
        Math.random() > 0.5 ? "AM" : "PM"
      } - ${Math.floor(Math.random() * 12 + 1)}:00${
        Math.random() > 0.5 ? "AM" : "PM"
      }`,
      Date: departingDate.toISOString(), // Full ISO-8601 string
    };
  });

  // Repeat each flight 2 times and include reverse flights
  baseFlights.forEach((flight) => {
    for (let i = 0; i < 2; i++) {
      const adjustedFlight = { ...flight };
      const offsetDays = 1; // Adjust the offset for variety
      const departingDate = new Date(flight.Date);

      // Adjust the departing date slightly for variety
      adjustedFlight.Date = getRandomDate(
        new Date(departingDate.getTime() + offsetDays * 24 * 60 * 60 * 1000),
        14 // Up to 14 days for variety
      ).toISOString();

      dummyFlights.push(adjustedFlight);

      // Add the reverse flight if it is a round-trip
      if (flight.type) {
        dummyFlights.push({
          ...adjustedFlight,
          fromCity: flight.toCity,
          toCity: flight.fromCity,
          stopsInfo: generateStopsInfo(Math.floor(Math.random() * 3)), // Random stops info for reverse flight
        });
      }
    }
  });

  // Ensure the total number of flights is 40
  dummyFlights.length = 40;

  // Filter out any undefined entries
  const filteredFlights = dummyFlights.filter((flight) => flight !== undefined);

  console.log(filteredFlights.length);
  await prisma.flight.createMany({
    data: filteredFlights,
  });

  console.log("Dummy flights inserted");
}

async function main() {
  try {
    await generateAndInsertFlights();
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
