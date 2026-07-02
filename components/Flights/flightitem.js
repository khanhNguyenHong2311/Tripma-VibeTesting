import styles from "./flightitem.module.css";
import Image from "next/image";
export default function FlightItem({ flight, onSelectFlight }) {
  const image = "./flight.svg";
  const {
    duration,
    fromToTime: fromto,
    availableSeats: numofSeats,
    subtotalPrice: price,
    airlineName: airport,
    type: isRoundTrip,
    stopsNumber: numofstops,
    stopsInfo: stopinfo,
  } = flight;
  const tripType = isRoundTrip ? "Round Trip" : "One Way";

  return (
    <div
      className={styles.flightcontainer}
      onClick={() => {
        onSelectFlight(flight);
      }}
    >
      <div className={styles.imagecontainer}>
        <Image src={image} alt="flightimage" width={48} height={48} />
      </div>
      <div className={styles.infosection}>
        <div className={styles.timinginfo}>
          <span>{duration}</span>
          <span>{fromto}</span>
          <span>{numofstops}</span>

          <span>{price}</span>
        </div>
        <div className={styles.locationinfo}>
          <span>{airport}</span>
          <span></span>
          <span>{stopinfo}</span>
          <span>{tripType}</span>
        </div>
      </div>
    </div>
  );
}
