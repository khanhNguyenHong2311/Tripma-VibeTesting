import React from "react";
import Image from "next/image";
import styles from "./seatclass.module.css";

export default function SeatClass({ classType, description, benefits }) {
  const seatsImage =
    classType === "Economy" ? "./EconomySeats.svg" : "./BusinessSeats.svg";
  const benefitsImage =
    classType === "Economy" ? "./Economymark.svg" : "./BusinessMark.svg";
  const dividerStyle = classType === "Economy" ? "economy" : "business";
  return (
    <div className={styles.seatContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={seatsImage}
          alt={`${classType} seat`}
          width={320}
          height={180}
        />
      </div>
      <div className={styles.infoContainer}>
        <h4 className={styles.seatType}>{`${classType}`}</h4>
        <p className={styles.description}>{description}</p>
        <div className={`${styles.divider} ${styles[dividerStyle]}`}></div>
        <ul className={styles.benefitsList}>
          {benefits.map((benefit, index) => (
            <li key={index} className={styles.benefitItem}>
              <Image
                src={benefitsImage}
                alt={`${classType} benefitmark`}
                className={styles.benefitImage}
                width={24}
                height={24}
              />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
