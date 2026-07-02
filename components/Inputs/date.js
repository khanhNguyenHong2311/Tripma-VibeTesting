"use client";
import styles from "./date.module.css";
import DateHeader from "./dateheader";
import ReactDate from "./reactdate";
export default function DateComponent({
  action,
  onDateChange,
  startDate,
  endDate,
  type,
  setType,
}) {
  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <DateHeader
        action={action}
        startDate={startDate}
        endDate={endDate}
        type={type}
        setType={setType}
      />
      <div className={styles.separator}></div>
      <div className={styles.reactdate}>
        <ReactDate
          onDateChange={onDateChange}
          startDate={startDate}
          endDate={endDate}
          type={type}
        ></ReactDate>
      </div>
    </div>
  );
}
