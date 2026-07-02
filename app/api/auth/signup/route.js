import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;

function generateUsername(email) {
  // Create a base username using the email and current timestamp
  const timestamp = Date.now();
  const emailBase = email.split("@")[0];
  return `${emailBase}_${timestamp}`;
}

export async function POST(req) {
  try {
    const { email, password, agreeTerms } = await req.json();

    // validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        {
          error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
        },
        { status: 400 }
      );
    }
    if (!agreeTerms) {
      return NextResponse.json(
        { error: "You must agree to the terms and conditions" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmailUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingEmailUser) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 400 }
      );
    }
    const username = generateUsername(email);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        city: "Cairo",
        country: "Egypt",
      },
    });
    return NextResponse.json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
