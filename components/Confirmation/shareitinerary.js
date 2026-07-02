import { useState } from "react";
import CustomInput from "../Inputs/custominput";
import styles from "./shareitinerary.module.css";
import CustomButton from "../HomePage/button";
export default function ShareItinerary() {
  const [formData, setFormData] = useState({
    first: "",
    second: "",
    third: "",
  });
  function handleChange() {}
  return (
    <div className={styles.container}>
      <h3>Share your travel itinerary</h3>
      <p>
        You can email your itinerary to anyone by entering their email address
        here.
      </p>
      <CustomInput
        type="email"
        placeholder="Email address"
        name="first"
        value={formData.first}
        onChange={handleChange}
        width={400}
      />
      <CustomInput
        type="email"
        placeholder="Email address"
        name="second"
        value={formData.second}
        onChange={handleChange}
        width={400}
      />
      <CustomInput
        type="email"
        placeholder="Email address"
        name="third"
        value={formData.third}
        onChange={handleChange}
        width={400}
      />
      <div className={styles.buttons}>
        <CustomButton text="Email itinerary"></CustomButton>
        <CustomButton
          text="Add another"
          color="#605DEC
"
          backgroundcolor="white"
        ></CustomButton>
      </div>
    </div>
  );
}
