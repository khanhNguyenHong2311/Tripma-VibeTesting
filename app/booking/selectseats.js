import React, { useState, useEffect } from "react";
import styles from "./selectseats.module.css";
import SeatClass from "@/components/Seats/seatclass";
import SeatDetails from "@/components/Seats/seatdetails";
import ProgressStepHeader from "@/components/Seats/prograssheader";
import Image from "next/image";
import Seats from "@/components/Seats/seats";
import CustomButton from "@/components/HomePage/button";

const economyBenefits = [
  "Built-in entertainment system",
  "Complimentary snacks and drinks",
  "One free carry-on and personal item",
];

const businessBenefits = [
  "Extended leg room",
  "First two checked bags free",
  "Priority boarding",
  "Personalized service",
  "Enhanced food and drink service",
  "Seats that recline 40% more than economy",
];

const economyDescription =
  "Enjoy comfort and entertainment with our economy class, featuring complimentary snacks and drinks.";
const businessDescription =
  "Experience luxury and personalized service with our business class, offering enhanced food and drink service.";

const SeatsPage = ({
  action,
  selectedFlights,
  passengerName,
  setDepartingSeat,
  setArrivingSeat,
  arrivingSeat,
  departingSeat,
}) => {
  const [economySeats, setEconomySeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);
  const [fetchArriving, setFetchArriving] = useState(false);
  const [error, setError] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [upgradedSeat, setUpgradedSeat] = useState(false);

  const selectedSeat = fetchArriving ? arrivingSeat : departingSeat;

  const Id1 = "0089b898-88d4-4e9e-ac26-e1c929279077";
  const Id2 = "06b2a838-325f-42d3-8f76-f537f5ac32d1";

  const [departingDifference, setDepartingDifference] = useState(null);
  const [arrivingDifference, setArrivingDifference] = useState(null);

  useEffect(() => {
    async function fetchSeats(Id) {
      try {
        const response = await fetch(`/api/seats/${Id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`${data.error}`);
        }
        setEconomySeats(data.economySeats);
        setBusinessSeats(data.businessSeats);

        console.log(data.economySeats);
        console.log(data.businessSeats);
        const economyPrice = data.economySeats[0]?.price;
        const businessPrice = data.businessSeats[0]?.price;
        const difference = businessPrice - economyPrice;

        if (Id === selectedFlights[0].flightId) {
          setDepartingDifference(difference);
        } else {
          setArrivingDifference(difference);
        }
      } catch (error) {
        console.error("Error fetching seats:", error);
        setError(error.message);
      }
    }

    if (fetchArriving && selectedFlights.length > 1) {
      fetchSeats(selectedFlights[1].flightId);
    } else if (selectedFlights[0]?.flightId) {
      fetchSeats(selectedFlights[0].flightId);
    }
  }, [selectedFlights, fetchArriving]);

  const onSeatClick = (seat) => {
    if (fetchArriving) {
      setArrivingSeat(seat);
    } else {
      setDepartingSeat(seat);
    }
  };

  const differenceToDisplay = fetchArriving
    ? arrivingDifference
    : departingDifference;

  const handleSeatSelection = (seat) => {
    if (!selectedSeat) {
      onSeatClick(seat);
      return;
    }
    if (seat.type === "Business" && selectedSeat.type !== "Business") {
      setUpgradedSeat(seat);
      setIsOverlayVisible(true);
    } else {
      setUpgradedSeat(null);
      setIsOverlayVisible(false);
      onSeatClick(seat);
    }
  };

  const handleUpgradeConfirm = () => {
    setIsOverlayVisible(false);
    onSeatClick(upgradedSeat);
  };

  const handleCancelUpgrade = () => {
    setIsOverlayVisible(false);
  };

  useEffect(() => {
    const bodyContainer = document.querySelector(`.${styles.bodycontainer}`);
    if (isOverlayVisible) {
      bodyContainer.classList.add(`${styles["overlay-active"]}`);
    } else {
      bodyContainer.classList.remove(`${styles["overlay-active"]}`);
    }
  }, [isOverlayVisible]);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.outercontainer}>
      <div className={styles.planecontainer}>
        <Image src={"/plane.svg"} alt="plane" layout="fill" objectFit="cover" />
        <Seats
          selectedSeat={selectedSeat}
          onSeatClick={handleSeatSelection}
          economySeats={economySeats}
          businessSeats={businessSeats}
        />
        {isOverlayVisible && (
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <h3>Upgrade Seat</h3>
              <p>
                Upgrade your seat for only ${differenceToDisplay}, and enjoy 45
                percent more leg room, and seats that recline 40 percent more
                than economy.
              </p>
              <div className={styles.buttonscontainer}>
                <CustomButton
                  text={`Upgrade for ${differenceToDisplay}`}
                  action={handleUpgradeConfirm}
                />
                <CustomButton
                  text="Cancel"
                  backgroundcolor="white"
                  color="#605DEC"
                  border="1px solid #605DEC"
                  action={handleCancelUpgrade}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.bodycontainer}>
        <ProgressStepHeader Step={1} />
        <div className={styles.seatstype}>
          <SeatClass
            classType="Economy"
            description={economyDescription}
            benefits={economyBenefits}
          />
          <SeatClass
            classType="Business Class"
            description={businessDescription}
            benefits={businessBenefits}
          />
        </div>
        <SeatDetails
          passengerNumber={1}
          passengerName={passengerName}
          seatNumber={selectedSeat?.seatNumber || "--"}
          action={action}
          selectedFlights={selectedFlights}
          setFetchArriving={setFetchArriving}
          fetchArriving={fetchArriving}
        />
      </div>
    </div>
  );
};

export default SeatsPage;
