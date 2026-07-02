"use client";
import Image from "next/image";
import styles from "./counter.module.css";

export default function Counter({ ok, count, setCount }) {
  const handleDecrease = (e) => {
    e.stopPropagation();
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    setCount(count + 1);
  };

  return (
    <div className={styles.rightcontainer} style={ok ? { gap: "24px" } : {}}>
      <div className={styles.button} onClick={handleDecrease}>
        <Image src="/minus.svg" alt="minus" width={32} height={32} />
      </div>
      <span className={styles.value} style={ok ? { marginTop: "-5px" } : {}}>
        {count}
      </span>
      <div className={styles.button} onClick={handleIncrease}>
        <Image src="/plus.svg" alt="plus" width={32} height={32} />
      </div>
    </div>
  );
}
