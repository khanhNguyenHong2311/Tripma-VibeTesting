import { useState } from "react";
import styles from "./paymentmethod.module.css";
import Image from "next/image";

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState("creditcard");

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.methodcontainer} ${
          selectedMethod === "creditcard" ? styles.selected : ""
        }`}
        onClick={() => handleSelect("creditcard")}
      >
        <div className={styles.image}>
          <Image src={"./creditcard.svg"} alt="CreditCard icon" fill />
        </div>
        <p>Credit card</p>
      </div>
      <div
        className={`${styles.methodcontainer} ${
          selectedMethod === "google" ? styles.selected : ""
        }`}
        onClick={() => handleSelect("google")}
      >
        <div className={styles.image}>
          <Image src={"./googlepayment.svg"} alt="Google icon" fill />
        </div>
        <p>Google Pay</p>
      </div>
      <div
        className={`${styles.methodcontainer} ${
          selectedMethod === "apple" ? styles.selected : ""
        }`}
        onClick={() => handleSelect("apple")}
      >
        <div className={styles.image}>
          <Image src={"./applepayment.svg"} alt="Apple icon" fill />
        </div>
        <p>Apple Pay</p>
      </div>
      <div
        className={`${styles.methodcontainer} ${
          selectedMethod === "paypal" ? styles.selected : ""
        }`}
        onClick={() => handleSelect("paypal")}
      >
        <div className={styles.image}>
          <Image src={"./paypal.svg"} alt="Paypal icon" fill />
        </div>
        <p>Paypal</p>
      </div>
      <div
        className={`${styles.methodcontainer} ${
          selectedMethod === "crypto" ? styles.selected : ""
        }`}
        onClick={() => handleSelect("crypto")}
      >
        <div className={styles.image}>
          <Image src={"./crypto.svg"} alt="Crypto icon" fill />
        </div>
        <p>Crypto</p>
      </div>
    </div>
  );
}
