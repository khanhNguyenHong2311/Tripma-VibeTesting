"use client";
import React, { useState, useEffect } from "react";

import styles from "./page.module.css";
import ConfirmationMessage from "@/components/Confirmation/message";
import FlightSummary from "@/components/Confirmation/flightsummary";
import PriceBreakdown from "@/components/Confirmation/pricebreakdown";
import PaymentMethodConfirmation from "@/components/Confirmation/paymentmethod";
import ShareItinerary from "@/components/Confirmation/shareitinerary";
import Image from "next/image";
import PlaceSuggestion from "@/components/Confirmation/placesugguesstion";

export default function ConfirmationPage() {
  const [bookingInfo, setBookingInfo] = useState(null);
  useEffect(() => {
    const storedBookingInfo = localStorage.getItem("bookingInfo");
    if (storedBookingInfo) {
      setBookingInfo(JSON.parse(storedBookingInfo));
      console.log(JSON.parse(storedBookingInfo));
    }
  }, []);

  if (!bookingInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.outercontainer}>
      <div className={styles.leftcontainer}>
        <ConfirmationMessage
          confirmationMessage={bookingInfo.confirmationMessage}
          name={bookingInfo.passengerInfo.firstName}
        />
        <FlightSummary
          departingFlight={bookingInfo.departingFlight}
          returningFlight={bookingInfo.returningFlight}
          departingSeat={bookingInfo.departingSeat}
          arrivingSeat={bookingInfo.arrivingSeat}
          checkedBags={bookingInfo.passengerInfo.checkedBags}
        />
        <PriceBreakdown
          baggageFees={bookingInfo.baggageFees}
          upgradeFees={bookingInfo.upgradeFees}
          total={bookingInfo.total}
          taxes={
            bookingInfo.departingFlight.taxesAndFees +
            (bookingInfo.returningFlight?.taxesAndFees || 0)
          }
          totaldeparting={bookingInfo.departingFlight.subtotalPrice}
          totalreturning={bookingInfo.returningFlight?.subtotalPrice}
        />
        <PaymentMethodConfirmation paymentInfo={bookingInfo.paymentInfo} />
        <ShareItinerary bookingInfo={bookingInfo} />
        <div className={styles.route}>
          <h3>Flight Route</h3>
          <div className={styles.routeimage}>
            <Image
              src="./confirmationmap.svg"
              alt="route icon"
              width={756}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className={styles.rightcontainer}>
        <PlaceSuggestion bookingInfo={bookingInfo} />
      </div>
    </div>
  );
}
