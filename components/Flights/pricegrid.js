import React from "react";
import styles from "./pricegrid.module.css";

const PriceGrid = () => {
  const gridItems = [];

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (row === 0 && col === 0) {
        gridItems.push(
          <div key={`${row}-${col}`} className={styles.emptyHeader}></div>
        );
      } else if (row === 0) {
        gridItems.push(
          <div key={`${row}-${col}`} className={styles.headerItem}>
            2/7
          </div>
        );
      } else if (col === 0) {
        gridItems.push(
          <div key={`${row}-${col}`} className={styles.headerItem}>
            2/7
          </div>
        );
      } else {
        gridItems.push(
          <div key={`${row}-${col}`} className={styles.gridItem}>
            ${row * 10 + col * 10}
          </div>
        );
      }
    }
  }

  return (
    <div className={styles.gridpricecontainer}>
      <div className={styles.pricecontainer}>
        <h4>
          Price grid <span>(flexible dates)</span>
        </h4>
      </div>
      <div className={styles.gridContainer}>{gridItems}</div>
    </div>
  );
};

export default PriceGrid;
