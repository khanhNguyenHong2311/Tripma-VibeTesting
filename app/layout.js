"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import { SessionProvider } from "next-auth/react";

// export const metadata = {
//   title: "Tripma - Your Ultimate Flight Booking Destination",
//   description:
//     "Book flights with ease using Tripma, your go-to platform for finding the best deals and exploring new destinations. Compare prices, select your preferred airlines, and manage your bookings seamlessly.",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isBookingPage = pathname === "/booking";

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {!isBookingPage && <Header />}
          {children}
          {!isBookingPage && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
