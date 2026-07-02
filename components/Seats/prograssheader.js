import React from "react";
import Image from "next/image";
import styles from "./prograssheader.module.css";

export default function ProgressStepHeader({ Step }) {
  return (
    <div className={styles.container}>
      <div className={styles.flightcontainer}>
        <div className={styles.step}>
          <p className={styles.big}>SFO</p>
          <p className={styles.small}>California, US</p>
        </div>
        <div className={styles.imagecontainer}>
          <Image
            src={"./arrowRight.svg"}
            alt="arrowRight"
            width={32}
            height={32}
          />
        </div>
        <div className={styles.step}>
          <p className={styles.big}>NRT</p>
          <p className={styles.small}>Tokyo, Japan</p>
        </div>
      </div>
      <div className={`${styles.step} ${Step === 1 ? styles.current : ""}`}>
        {Step === 1 && (
          <div className={styles.iconContainer}>
            <Image
              src="/activestep.svg"
              alt="current step icon"
              width={24}
              height={24}
              className={styles.icon}
            />
          </div>
        )}
        <div className={styles.stepContent}>
          <p className={styles.time}>Feb 25 | 7:00AM</p>
          <p className={styles.small}>Departing</p>
        </div>
      </div>
      <div className={`${styles.step} ${Step === 2 ? styles.current : ""}`}>
        {Step === 2 && (
          <div className={styles.iconContainer}>
            <Image
              src="/activestep.svg"
              alt="current step icon"
              width={24}
              height={24}
              className={styles.icon}
            />
          </div>
        )}
        <div className={styles.stepContent}>
          <p className={styles.time}>Mar 21 | 12:15PM</p>
          <p className={styles.small}>Arriving</p>
        </div>
      </div>
    </div>
  );
}
