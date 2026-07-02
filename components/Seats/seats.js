import React from "react";
import styles from "./seats.module.css";
import Image from "next/image";

const BusinessSeats = ({ rows, selectedSeat, onSeatClick, businessSeats }) => {
  return (
    <div className={styles.businessSection}>
      {rows.map((row, rowIndex) => (
        <div key={row} className={styles.row}>
          {businessSeats.slice(rowIndex * 4, rowIndex * 4 + 2).map((seat) => (
            <div
              key={seat.seatNumber}
              className={`${styles.seatBusiness} ${
                selectedSeat?.seatNumber === seat.seatNumber
                  ? styles.selected
                  : ""
              }`}
              onClick={() => onSeatClick(seat)}
            ></div>
          ))}
          <div className={styles.rowNumber}>{row}</div>
          {businessSeats
            .slice(rowIndex * 4 + 2, rowIndex * 4 + 4)
            .map((seat) => (
              <div
                key={seat.seatNumber}
                className={`${styles.seatBusiness} ${
                  selectedSeat?.seatNumber === seat.seatNumber
                    ? styles.selected
                    : ""
                }`}
                onClick={() => onSeatClick(seat)}
              ></div>
            ))}
        </div>
      ))}
    </div>
  );
};

const EconomySeats = ({
  rows,
  exitrows,
  selectedSeat,
  onSeatClick,
  economySeats,
}) => {
  return (
    <div className={styles.economySection}>
      {rows.map((row, rowIndex) => (
        <React.Fragment key={row}>
          {exitrows.includes(row) && (
            <div className={styles.rowexitrowcontainer}>
              <Image
                src="./information.svg"
                alt="info icon"
                width={18}
                height={18}
              />
              <div className={styles.exitRow}>Exit row</div>
            </div>
          )}
          <div className={styles.row}>
            {economySeats.slice(rowIndex * 6, rowIndex * 6 + 3).map((seat) => (
              <div
                key={seat.seatNumber}
                className={`${styles.seatEconomy} ${
                  selectedSeat?.seatNumber === seat.seatNumber
                    ? styles.selected
                    : ""
                }`}
                onClick={() => onSeatClick(seat)}
              ></div>
            ))}
            <span className={styles.rowNumber}>{row}</span>
            {economySeats
              .slice(rowIndex * 6 + 3, rowIndex * 6 + 6)
              .map((seat) => (
                <div
                  key={seat.seatNumber}
                  className={`${styles.seatEconomy} ${
                    selectedSeat?.seatNumber === seat.seatNumber
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => onSeatClick(seat)}
                ></div>
              ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const Seats = ({ selectedSeat, onSeatClick, economySeats, businessSeats }) => {
  const businessRows = Array.from(
    { length: businessSeats.length / 4 },
    (_, i) => i + 1
  );
  const economyExitRows = [6, 14, 19, 29];
  const economyRows = Array.from(
    { length: economySeats.length / 6 },
    (_, i) => i + businessRows.length + 1
  );

  return (
    <div className={styles.container}>
      <BusinessSeats
        rows={businessRows}
        selectedSeat={selectedSeat}
        onSeatClick={onSeatClick}
        businessSeats={businessSeats}
      />
      <EconomySeats
        rows={economyRows}
        exitrows={economyExitRows}
        selectedSeat={selectedSeat}
        onSeatClick={onSeatClick}
        economySeats={economySeats}
      />
    </div>
  );
};

export default Seats;
