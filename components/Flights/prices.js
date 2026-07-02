import styles from "./prices.module.css";
export default function Prices({ subtotal, taxes, total }) {
  return (
    <div className={styles.container}>
      <div className={styles.totalprice}>
        <h5>Subtotal </h5>
        <h5>Taxes and Fees</h5>
        <h5>Total </h5>
      </div>
      <div className={styles.totalprice}>
        <h5>{`$ ${Math.floor(subtotal)}`}</h5>
        <h5>{`$ ${Math.floor(taxes)}`}</h5>
        <h5>{`$ ${Math.floor(total)}`}</h5>
      </div>
    </div>
  );
}
