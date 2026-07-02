"use client";
import { useState } from "react";
import PassengerHeader from "@/components/Passenger/passengerheader";
import styles from "./passenger.module.css";
import PassengerInfo from "@/components/Passenger/passengerinfo";
import CustomButton from "@/components/HomePage/button";
import Reservation from "@/components/Flights/reservation";
import Image from "next/image";
export default function PassengerPage({
  selectedFlights,
  action,
  formPassengerInfo,
  setFormPassengerInfo,
  isSameAsPassenger,
  setIsSameAsPassenger,
}) {
  const [isValid, setIsValid] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.leftcontainer}>
        <div className={styles.passengercontainer}>
          <PassengerHeader />
        <PassengerInfo
            setValid={setIsValid}
            formPassengerInfo={formPassengerInfo}
            setFormPassengerInfo={setFormPassengerInfo}
            isSameAsPassenger={isSameAsPassenger}
            setIsSameAsPassenger={setIsSameAsPassenger}
          />
        </div>
        <div className={styles.buttonscontainer}>
          <CustomButton
            text="Save and close"
            backgroundcolor="white"
            color="#605DEC"
            border="1px solid #605DEC"
          />
          <CustomButton
            text="Select seats"
            backgroundcolor={isValid ? "#605dec" : "rgba(203, 212, 230, 0.3)"}
            color={isValid ? "#fafafa" : "#7C8DB0"}
            border={isValid ? "none" : "1px solid #7C8DB0"}
            action={action}
          />
        </div>
      </div>

      <div className={styles.rightcontainer}>
        <Reservation
          flights={selectedFlights}
          type="Passenger"
          isValid={isValid}
          text={"Select seats"}
          action={action}
        />
        <div className={styles.Imagecontainer}>
          <Image src="./Bag.svg" alt="bag icon" width={382} height={525} />
        </div>
      </div>
    </div>
  );
}
