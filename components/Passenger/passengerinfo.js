"use client";
import React, { useState, useEffect } from "react";
import Counter from "../Inputs/counter";
import CustomInput from "../Inputs/custominput";
import styles from "./passengerinfo.module.css";

export default function PassengerInfo({
  setValid,
  formPassengerInfo,
  setFormPassengerInfo,
  isSameAsPassenger,
  setIsSameAsPassenger,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPassengerInfo({ ...formPassengerInfo, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setIsSameAsPassenger(e.target.checked);
  };

  const validateForm = () => {
    const isValidPassengerInfo =
      formPassengerInfo.firstname !== "" &&
      formPassengerInfo.lastname !== "" &&
      formPassengerInfo.birthDate !== "" &&
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formPassengerInfo.email) &&
      /^[0-9]{11,11}$/.test(formPassengerInfo.phonenumber) &&
      formPassengerInfo.travellernumber !== "";

    const isValidEmergencyContact =
      isSameAsPassenger ||
      (formPassengerInfo.emergencyfirstname !== "" &&
        formPassengerInfo.emergencylastname !== "" &&
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
          formPassengerInfo.emergencyemail
        ) &&
        /^[0-9]{11,11}$/.test(formPassengerInfo.emergencyphonenumber));

    const isValidCheckedBags =
      Number.isInteger(formPassengerInfo.checkedBags) &&
      formPassengerInfo.checkedBags >= 0;

    return (
      isValidPassengerInfo && isValidEmergencyContact && isValidCheckedBags
    );
  };

  useEffect(() => {
    const formIsValid = validateForm();
    setValid(formIsValid);
  }, [formPassengerInfo, isSameAsPassenger]);

  return (
    <div className={styles.infosection}>
      <h4>Passenger 1 (Adult)</h4>
      <div className={styles.innercontainer}>
        <div className={styles.infosection}>
          <div className={styles.inputscontainer}>
            <CustomInput
              type="text"
              placeholder="First name*"
              name="firstname"
              value={formPassengerInfo.firstname}
              onChange={handleChange}
              width="200"
            />
            <CustomInput
              type="text"
              placeholder="Middle"
              name="middle"
              value={formPassengerInfo.middle}
              onChange={handleChange}
              width="200"
            />
            <CustomInput
              type="text"
              placeholder="Last name*"
              name="lastname"
              value={formPassengerInfo.lastname}
              onChange={handleChange}
              width="200"
            />
          </div>
          <div className={styles.inputscontainer}>
            <CustomInput
              type="text"
              placeholder="Suffix"
              name="suffix"
              value={formPassengerInfo.suffix}
              onChange={handleChange}
              width="200"
            />
            <CustomInput
              type="date"
              placeholder="Date of birth*"
              name="birthDate"
              value={formPassengerInfo.birthDate}
              onChange={handleChange}
              width="252"
            />
          </div>
        </div>
        <div className={styles.infosection}>
          <div className={styles.inputscontainer}>
            <CustomInput
              type="email"
              placeholder="Email address*"
              name="email"
              value={formPassengerInfo.email}
              onChange={handleChange}
            />
            <CustomInput
              type="tel"
              placeholder="Phone number*"
              name="phonenumber"
              value={formPassengerInfo.phonenumber}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputscontainer}>
            <CustomInput
              type="text"
              placeholder="Redress number"
              name="redressnumber"
              value={formPassengerInfo.redressnumber}
              onChange={handleChange}
            />
            <CustomInput
              type="tel"
              placeholder="Known traveller number*"
              name="travellernumber"
              value={formPassengerInfo.travellernumber}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.infosection}>
        <h4>Emergency contact information</h4>
        <div className={styles.checkboxcontainer}>
          <input
            type="checkbox"
            id="save-card-checkbox"
            name="checkbox"
            checked={isSameAsPassenger}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="save-card-checkbox">Same as Passenger 1</label>
        </div>
        {!isSameAsPassenger && (
          <>
            <div className={styles.inputscontainer}>
              <CustomInput
                type="text"
                placeholder="First name*"
                name="emergencyfirstname"
                value={formPassengerInfo.emergencyfirstname}
                onChange={handleChange}
              />
              <CustomInput
                type="text"
                placeholder="Last name*"
                name="emergencylastname"
                value={formPassengerInfo.emergencylastname}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputscontainer}>
              <CustomInput
                type="email"
                placeholder="Email address*"
                name="emergencyemail"
                value={formPassengerInfo.emergencyemail}
                onChange={handleChange}
              />
              <CustomInput
                type="tel"
                placeholder="Phone number*"
                name="emergencyphonenumber"
                value={formPassengerInfo.emergencyphonenumber}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.innercontainer}>
        <div className={styles.container16}>
          <h4>Bag information</h4>
          <p>
            Each passenger is allowed one free carry-on bag and one personal
            item. First checked bag for each passenger is also free. Second bag
            check fees are waived for loyalty program members.{" "}
            <span className={styles.highlight}>See the full bag policy.</span>
          </p>
        </div>
        <div className={styles.passengerinfobags}>
          <div className={styles.container16}>
            <div className={styles.checkedbag}>
              <h4>Passenger 1</h4>
            </div>
            <h4>{`${formPassengerInfo.firstname} ${formPassengerInfo.lastname}`}</h4>
          </div>
          <div className={styles.container16}>
            <div className={styles.checkedbag}>
              <h4>Checked bags</h4>
            </div>
            <Counter
              ok={true}
              count={formPassengerInfo.checkedBags}
              setCount={(newCount) =>
                setFormPassengerInfo({
                  ...formPassengerInfo,
                  checkedBags: newCount,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
