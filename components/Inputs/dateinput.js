import React, { useState, useEffect, useRef } from "react";
import styles from "./dateinput.module.css";
import Image from "next/image";
import DateComponent from "./date";

export default function DateInput({
  imgpath,
  text,
  width,
  selectedDates,
  onDateChange,
  type,
  setType,
}) {
  const [showDate, setShowDate] = useState(false);

  const wrapperRef = useRef(null);

  const formatDateRange = (start, end) => {
    if (start === null && end === null) return text;
    const startDate = start instanceof Date ? start : new Date(start);
    const endDate = end instanceof Date ? end : new Date(end);
    if (!isNaN(startDate) && !isNaN(endDate) && type) {
      const startFormatted = startDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const endFormatted = endDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return `${startFormatted} - ${endFormatted}`;
    } else if (!isNaN(startDate)) {
      const startFormatted = startDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return `${startFormatted}`;
    }
    return text;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDate(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleDateChange = (start, end) => {
    onDateChange(start, end);
  };
  return (
    <div
      ref={wrapperRef}
      className={styles.selectWrapper}
      style={{ width: width }}
      onClick={() => setShowDate((prev) => !prev)}
    >
      <div className={styles.container}>
        <div className={styles.customSelect}>
          <Image
            src={imgpath}
            alt={`${text} icon`}
            className={styles.icon}
            width={32}
            height={32}
          />
          <span className={styles.placeholder}>
            {formatDateRange(selectedDates.startDate, selectedDates.endDate)}
          </span>
        </div>
      </div>
      {showDate && (
        <div className={styles.listContainer}>
          <DateComponent
            action={(e) => {
              e.stopPropagation();
              setShowDate(false);
            }}
            onDateChange={handleDateChange}
            startDate={selectedDates.startDate}
            endDate={selectedDates.endDate}
            type={type}
            setType={setType}
          />
        </div>
      )}
    </div>
  );
}
