import styles from "./dateselect.module.css";
import Image from "next/image";
export default function DateSelect({ startDate, endDate }) {
  const formatDateRange = (start, end) => {
    if (start === null && end === null) return "Depart - Return";
    if (start && end) {
      const startFormatted = start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const endFormatted = end.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return `${startFormatted} - ${endFormatted}`;
    }
  };
  return (
    <div className={styles.selectWrapper}>
      <div className={styles.container}>
        <div className={styles.customSelect}>
          <Image
            src={"./calendar.svg"}
            alt={"Depart - Return"}
            className={styles.icon}
            width={32}
            height={32}
          />
          <span className={styles.placeholder}>
            {formatDateRange(startDate, endDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
