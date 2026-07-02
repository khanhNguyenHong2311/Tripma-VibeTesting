import styles from "./paymentmethodconfirmation.module.css";
import Image from "next/image";

export default function PaymentMethodConfirmation({ paymentInfo }) {
  const lastFourDigits = paymentInfo.cardNumber.slice(-4);

  const formattedExpireDate = new Date(
    paymentInfo.expireDate
  ).toLocaleDateString("en-US", { month: "2-digit", year: "2-digit" });

  return (
    <div className={styles.container}>
      <h3>Payment Method</h3>
      <div className={styles.cardinfo}>
        <div className={styles.Image}>
          <Image src="./Visa.svg" alt="Visa icon" width={76} height={24} />
        </div>
        <div className={styles.cardname}>
          <h4>{paymentInfo.nameOnCard}</h4>
          <div className={styles.cardnumber}>
            <p>••••••••••••{lastFourDigits}</p>
            <p>{formattedExpireDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
