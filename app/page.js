"use client";
import styles from "./page.module.css";
import Image from "next/image";
import CookiePopup from "@/components/Cookies/cookies";
import { useState, useEffect } from "react";
import FlightDeals from "@/components/HomePage/flightdeals";
import CustomButton from "@/components/HomePage/button";
import CommentSection from "@/components/HomePage/commentsection";
import SelectionInputs from "@/components/HomePage/selectioninputs";
function FlightDealsHeader1() {
  return (
    <div className={styles.leftdescription}>
      <h3 className={styles.normalheader}>
        Find your next adventure with these
      </h3>
      <span className={styles.sepcialheader1}>flight deals</span>
    </div>
  );
}
function FlightDealsHeader2() {
  return (
    <div className={styles.leftdescription}>
      <h3 className={styles.normalheader}>Explore unique</h3>
      <span className={styles.specialheader2}>places to stay</span>
    </div>
  );
}

export default function HomePage() {
  const [cookiespopup, setCookiespopup] = useState(true);

  return (
    <>
      <div className={styles.outercontainer}>
        <div className={styles.imagewandselectcontainer}>
          <div className={styles.imagecontainer}>
            <Image
              src="/heroText.svg"
              alt="it's more than just a trip"
              width={756}
              height={265}
              className={styles.logo}
            />
          </div>
          <SelectionInputs></SelectionInputs>
          {cookiespopup && (
            <CookiePopup
              onClose={() => {
                setCookiespopup(false);
              }}
            ></CookiePopup>
          )}
        </div>
        <FlightDeals
          Header={FlightDealsHeader1}
          type={"FLIGHTS"}
          imgpath={"./flightdeal.svg"}
        ></FlightDeals>
        <FlightDeals
          showfull={false}
          Header={FlightDealsHeader2}
          type={""}
          imgpath={"./uniqueplacestest.svg"}
        ></FlightDeals>
        <CustomButton></CustomButton>
        <CommentSection></CommentSection>
      </div>
    </>
  );
}
