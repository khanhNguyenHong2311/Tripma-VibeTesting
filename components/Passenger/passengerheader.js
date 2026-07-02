import styles from "./passengerheader.module.css";

export default function PassengerHeader() {
  return (
    <div className={styles.passengerheader}>
      <h3>Passenger information</h3>
      <p>
        Enter the required information for each traveler and be sure that it
        exactly matches the government-issued ID presented at the airport.
      </p>
    </div>
  );
}
