"use client";
import styles from "./payment.module.css";
import PaymentMethod from "@/components/Payment/paymentmethod";
import CustomInput from "@/components/Inputs/custominput";
import { useState } from "react";
import LoginWithButton from "@/components/Authentication/loginwith";
import CustomButton from "@/components/HomePage/button";
import Reservation from "@/components/Flights/reservation";

export default function PaymentPage({
  selectedFlights,
  action,
  setFormPaymentInfo,
  formPaymentInfo,
}) {
  const [isValidPayment, setIsValidPayment] = useState(false);
  const [checkmarkChecked, setCheckmarkChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPaymentInfo((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      validateForm(updatedData);
      return updatedData;
    });
  };

  const handleCheckboxChange = (e) => {
    setCheckmarkChecked(e.target.checked);
    validateForm({ ...formPaymentInfo, saveCard: e.target.checked });
  };

  const validateForm = (data) => {
    const {
      cardname = "",
      cardnumber = "",
      expiredate = "",
      ccvnumber = "",
      email = "",
      password = "",
    } = data;

    const isCardNumberValid = /^\d{16}$/.test(cardnumber);
    const isCCVValid = /^\d{3}$/.test(ccvnumber);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordEntered = password.trim() !== "";
    const isEmailOrPasswordValid =
      (!email && !password) || (isEmailValid && isPasswordEntered);

    const isValid =
      cardname &&
      isCardNumberValid &&
      expiredate &&
      isCCVValid &&
      isEmailOrPasswordValid;

    setIsValidPayment(isValid);
  };

  return (
    <div className={styles.container}>
      <div className={styles.verticalcontainer16}>
        <h3>Payment method</h3>
        <p>
          Select a payment method below. Tripma processes your payment securely
          with end-to-end encryption.
        </p>
      </div>
      <div className={styles.body}>
        <div className={styles.leftcontainer}>
          <div className={styles.paymentsection}>
            <PaymentMethod />
            <div className={styles.paymentbody}>
              <h4>Credit card details</h4>
              <div className={styles.checkboxcontainer}>
                <input
                  type="checkbox"
                  id="billing-address-checkbox"
                  name="billing-address"
                />
                <label htmlFor="billing-address-checkbox">
                  Billing address is same as Passenger 1
                </label>
              </div>
              <CustomInput
                type="text"
                placeholder="Name on card"
                name="cardname"
                value={formPaymentInfo.cardname}
                onChange={handleChange}
                width="480"
              />
              <CustomInput
                type="tel"
                placeholder="Card number"
                name="cardnumber"
                value={formPaymentInfo.cardnumber}
                onChange={handleChange}
                width="480"
              />
              <div className={styles.horizontalcontainer24}>
                <CustomInput
                  type="date"
                  placeholder="Expiration date"
                  name="expiredate"
                  value={formPaymentInfo.expiredate}
                  onChange={handleChange}
                  width="240"
                />
                <CustomInput
                  type="tel"
                  placeholder="CCV"
                  name="ccvnumber"
                  value={formPaymentInfo.ccvnumber}
                  onChange={handleChange}
                  width="216"
                />
              </div>
            </div>
          </div>

          <div className={styles.createaccountcontainer}>
            <div className={styles.verticalcontainer16}>
              <div className={styles.createaccountheader}>
                <h4>Create an account</h4>
              </div>
              <div className={styles.verticalcontainer24}>
                <p>
                  Tripma is free to use as a guest, but if you create an account
                  today, you can save and view flights, manage your trips, earn
                  rewards, and more.
                </p>
                <div className={styles.checkboxcontainer}>
                  <input
                    type="checkbox"
                    id="save-card-checkbox"
                    name="save-card"
                    checked={checkmarkChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="save-card-checkbox">
                    Save card and create account for later
                  </label>
                </div>
                <>
                  <CustomInput
                    type="email"
                    placeholder="Email address or phone number"
                    name="email"
                    value={formPaymentInfo.email}
                    onChange={handleChange}
                    width={480}
                  />
                  <CustomInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formPaymentInfo.password}
                    onChange={handleChange}
                    width={480}
                  />
                </>
              </div>
            </div>
            <div className={styles.thirdpartySignup}>
              <div className={styles.or}>or</div>
              <LoginWithButton
                imgpath={"./google.svg"}
                text={"Sign up with Google"}
              />
              <LoginWithButton
                imgpath={"./apple.svg"}
                text={"Continue with Apple"}
              />
              <LoginWithButton
                imgpath={"./facebook.svg"}
                text={"Continue with Facebook"}
              />
            </div>
          </div>
          <div className={styles.verticalcontainer16}>
            <h4>Cancellation policy</h4>
            <p>
              This flight has a flexible cancellation policy. If you cancel or
              change your flight up to 30 days before the departure date, you
              are eligible for a free refund. All flights booked on Tripma are
              backed by our satisfaction guarantee; however, cancellation
              policies vary by airline. See the{" "}
              <span className={styles.highlight}>full cancellation policy</span>{" "}
              for this flight.
            </p>
          </div>
          <div className={styles.buttonscontainer}>
            <CustomButton
              text="Back to seat select"
              backgroundcolor="white"
              color="#605DEC"
              border="1px solid #605DEC"
            />
            <CustomButton
              text="Confirm and pay"
              backgroundcolor={
                isValidPayment ? "#605dec" : "rgba(203, 212, 230, 0.3)"
              }
              color={isValidPayment ? "#fafafa" : "#7C8DB0"}
              border={isValidPayment ? "none" : "1px solid #7C8DB0"}
              action={action}
              disabled={!isValidPayment}
            />
          </div>
        </div>
        <div className={styles.rightcontainer}>
          <Reservation
            flights={selectedFlights}
            type="passenger"
            isValid={isValidPayment}
            text={"Confirm and pay"}
            action={action}
          />
        </div>
      </div>
    </div>
  );
}
