import styles from "./pricebreakdown.module.css";

export default function PriceBreakdown({
  baggageFees,
  upgradeFees,
  taxes,
  totaldeparting,
  totalreturning,
  total,
}) {
  const subtotal = total - taxes;

  return (
    <div className={styles.container}>
      <h3>Price Breakdown</h3>
      <div className={styles.info}>
        <div className={styles.pricelistitem}>
          <p>Departing Flight</p>
          <p>${totaldeparting.toFixed(2)}</p>
        </div>
        {totalreturning !== undefined && (
          <div className={styles.pricelistitem}>
            <p>Arriving Flight</p>
            <p>${totalreturning.toFixed(2)}</p>
          </div>
        )}
        <div className={styles.pricelistitem}>
          <p>Baggage Fees</p>
          <p>${baggageFees.toFixed(2)}</p>
        </div>
        <div className={styles.pricelistitem}>
          <p>Seat Upgrade (Business)</p>
          <p>${upgradeFees.toFixed(2)}</p>
        </div>
        <div className={styles.pricelistitem}>
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className={styles.pricelistitem}>
          <p>Taxes</p>
          <p>${taxes.toFixed(2)}</p>
        </div>
      </div>
      <div className={styles.amount}>
        <div className={styles.pricelistitem}>
          <h4>Amount Paid</h4>
          <h4>${total.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
}
