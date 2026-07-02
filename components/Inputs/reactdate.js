import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./reactdate.css";

export default function ReactDate({ startDate, endDate, onDateChange, type }) {
  const handleChange = (dates) => {
    if (type) {
      const [start, end] = dates;
      onDateChange(start, end);
    } else {
      onDateChange(dates, null);
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={type ? endDate : null} // If one-way, don't use endDate
      selectsRange={type} // Only select range if type is true
      monthsShown={2}
      inline
    />
  );
}
