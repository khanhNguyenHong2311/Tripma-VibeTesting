import React from "react";
import styles from "./custominput.module.css";

const CustomInput = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  width = 300,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.input}
      style={{ width: `${width}px` }}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomInput;
