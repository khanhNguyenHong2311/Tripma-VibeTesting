import React from "react";
import styles from "./seatdetails.module.css";
import CustomButton from "../HomePage/button";

export default function SeatDetails({
  passengerNumber,
  passengerName,
  seatNumber,
  action,
  selectedFlights,
  setFetchArriving,
  fetchArriving,
}) {
  console.log(seatNumber);
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.speratorcontainer}>
        <div className={styles.section}>
          <p className={styles.up}>Passenger {passengerNumber}</p>
          <p className={styles.down}>{passengerName}</p>
        </div>
        <div className={styles.section}>
          <p className={styles.up}>Seat Number</p>
          <p className={styles.down}>{seatNumber}</p>
        </div>
      </div>
      <div className={styles.speratorcontainer}>
        <div>
          <CustomButton
            padding={{ top: 12, down: 12, left: 20, right: 20 }}
            text="Save and close"
            backgroundcolor="white"
            color="#605DEC"
            border="1px solid #605DEC"
          />
        </div>
        <div>
          {seatNumber === "--" ? (
            <CustomButton
              padding={{ top: 12, down: 12, left: 20, right: 20 }}
              text="Next Flight"
              backgroundcolor="rgba(203, 212, 230, 0.3)"
              color="#7C8DB0"
              border="1px solid #7C8DB0"
            />
          ) : selectedFlights.length === 1 || fetchArriving ? (
            <CustomButton text="Payment method" action={action} />
          ) : (
            <CustomButton
              text="Next Flight"
              action={() => {
                setFetchArriving(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );  
}
