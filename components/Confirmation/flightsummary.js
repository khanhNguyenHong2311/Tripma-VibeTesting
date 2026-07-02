import styles from "./flightsummary.module.css";
import FlightItem from "../Flights/flightitem";

export default function FlightSummary({
  departingFlight,
  returningFlight,
  departingSeat,
  arrivingSeat,
  checkedBags,
}) {
  const formatDate = (date) => {
    console.log;
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.container}>
      <h3>Flight Summary</h3>
      <div className={styles.info}>
        <h4>Departing {formatDate(departingFlight.Date)}</h4>
        <FlightItem flight={departingFlight} onSelectFlight={() => {}} />
        <p>
          Seat {departingSeat.seatNumber} {departingSeat.type} window,{" "}
          {checkedBags} checked bag{`${checkedBags > 1 ? "s" : ""}`}
        </p>
      </div>
      {returningFlight && (
        <div className={styles.info}>
          <h4>Arriving {formatDate(returningFlight.Date)}</h4>
          <FlightItem flight={returningFlight} onSelectFlight={() => {}} />
          <p>
            Seat {arrivingSeat.seatNumber} {arrivingSeat.type} window,{" "}
            {checkedBags} checked bag{`${checkedBags > 1 ? "s" : ""}`}
          </p>
        </div>
      )}
    </div>
  );
}
