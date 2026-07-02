import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    const {
      userId, // Optional
      departingFlightId,
      returningFlightId, // Optional
      departingSeat,
      arrivingSeat, // Optional
      passengerInfo,
      paymentInfo,
    } = body;

    if (
      !departingFlightId ||
      !departingSeat ||
      !passengerInfo ||
      !paymentInfo
    ) {
      console.log("wow");
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (userId) {
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        return NextResponse.json(
          { message: "Invalid user ID" },
          { status: 400 }
        );
      }
    }

    // Validate passenger information
    const { firstName, lastName, dateOfBirth, email, phone, checkedBags } =
      passengerInfo;
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !email ||
      !phone ||
      typeof checkedBags === "undefined"
    ) {
      console.log("wow2");

      return NextResponse.json(
        { message: "Missing required passenger info" },
        { status: 400 }
      );
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPhoneValid = /^\d{11}$/.test(phone);
    const isDateOfBirthValid = new Date(dateOfBirth) < new Date();
    if (!isEmailValid || !isPhoneValid || !isDateOfBirthValid) {
      console.log("wow3");

      return NextResponse.json(
        { message: "Invalid passenger information" },
        { status: 400 }
      );
    }

    const { paymentType, nameOnCard, cardNumber, ccv, expireDate } =
      paymentInfo;

    if (
      paymentType !== "Visa" ||
      !nameOnCard ||
      !cardNumber ||
      !ccv ||
      !expireDate
    ) {
      console.log("wow4");

      return NextResponse.json(
        { message: "Invalid payment information" },
        { status: 400 }
      );
    }

    const isCardNumberValid = /^\d{16}$/.test(cardNumber);
    const isCCVValid = /^\d{3}$/.test(ccv);
    const isExpireDateValid = new Date(expireDate) > new Date();
    if (!isCardNumberValid || !isCCVValid || !isExpireDateValid) {
      console.log("wow5");

      return NextResponse.json(
        { message: "Invalid card number, CCV, or expiration date" },
        { status: 400 }
      );
    }
    console.log("here");

    const departingFlight = await prisma.flight.findUnique({
      where: { flightId: departingFlightId },
      include: { Seats: true },
    });

    if (!departingFlight) {
      return NextResponse.json(
        { message: "Departing flight not found" },
        { status: 400 }
      );
    }

    const departingBaggageFees = departingFlight.baggageFees * checkedBags;

    // Fetch seat details for departing seat
    const departingSeatDetails = departingSeat
      ? await prisma.seat.findUnique({
          where: {
            flightId_seatNumber: {
              flightId: departingFlightId,
              seatNumber: departingSeat,
            },
          },
        })
      : null;

    const upgradeFees =
      departingSeatDetails?.type === "Business"
        ? departingSeatDetails.price
        : 0;

    const departingTotalPrice =
      departingFlight.subtotalPrice +
      departingFlight.taxesAndFees +
      departingBaggageFees +
      upgradeFees;

    let returningTotalPrice = 0;
    let returningBaggageFees = 0;
    let returningUpgradeFees = 0;

    let returningFlight;
    let arrivingSeatDetails = null;
    if (returningFlightId) {
      returningFlight = await prisma.flight.findUnique({
        where: { flightId: returningFlightId },
        include: { Seats: true },
      });

      if (!returningFlight) {
        return NextResponse.json(
          { message: "Returning flight not found" },
          { status: 400 }
        );
      }

      returningBaggageFees = returningFlight.baggageFees * checkedBags;

      arrivingSeatDetails = arrivingSeat
        ? await prisma.seat.findUnique({
            where: {
              flightId_seatNumber: {
                flightId: returningFlightId,
                seatNumber: arrivingSeat,
              },
            },
          })
        : null;

      returningUpgradeFees =
        arrivingSeatDetails?.type === "Business"
          ? arrivingSeatDetails.price
          : 0;
      returningTotalPrice =
        returningFlight?.subtotalPrice +
        returningFlight?.taxesAndFees +
        returningBaggageFees +
        returningUpgradeFees;
    }

    const totalPrice = departingTotalPrice + returningTotalPrice;

    const confirmationMessage = uuidv4().replace(/-/g, "").slice(0, 12);

    const booking = await prisma.booking.create({
      data: {
        userId: userId || null,
        departingFlightId,
        returningFlightId,
        departingSeat,
        arrivingSeat: arrivingSeat || null,
        baggageFees: departingBaggageFees + returningBaggageFees,
        upgradeFees: upgradeFees + returningUpgradeFees,
        total: totalPrice,
        confirmationMessage,
        PassengerInfos: {
          create: {
            firstName,
            middleName: passengerInfo.middleName || null,
            lastName,
            suffix: passengerInfo.suffix || null,
            dateOfBirth: new Date(dateOfBirth),
            email,
            phone,
            redressNumber: passengerInfo.redressNumber || null,
            knownTravelerNumber: passengerInfo.knownTravelerNumber || null,
          },
        },
        PaymentInfos: {
          create: {
            paymentType,
            nameOnCard,
            cardNumber,
            ccv,
            date: new Date(),
            expireDate: new Date(expireDate),
          },
        },
      },
    });

    return NextResponse.json(
      {
        bookingId: booking.id,
        departingFlight,
        returningFlight: returningFlightId ? returningFlight : null,
        passengerInfo: {
          firstName,
          checkedBags,
        },
        paymentInfo: {
          paymentType,
          nameOnCard,
          cardNumber: cardNumber.slice(-4),
          ccv,
          expireDate,
        },
        departingSeat: departingSeatDetails,
        arrivingSeat: arrivingSeatDetails,
        confirmationMessage,
        baggageFees: departingBaggageFees + returningBaggageFees,
        upgradeFees: upgradeFees + returningUpgradeFees,
        total: totalPrice,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
