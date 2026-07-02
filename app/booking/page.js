"use client";
import PassengerPage from "./passenger";
import SeatsPage from "./selectseats";
import { useState, useEffect } from "react";
import PaymentPage from "./payment";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import { useRouter } from "next/navigation";
import Popup from "@/components/Payment/popup";
import { useSession } from "next-auth/react";

const PASSENGER_PAGE = "PASSENGER_PAGE";
const SEATS_PAGE = "SEATS_PAGE";
const PAYMENT_PAGE = "PAYMENT_PAGE";

export default function BookingPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [currentPage, setCurrentPage] = useState(PASSENGER_PAGE);
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [formPassengerInfo, setFormPassengerInfo] = useState({
    firstname: "",
    middle: "",
    lastname: "",
    suffix: "",
    birthDate: "",
    email: "",
    phonenumber: "",
    redressnumber: "",
    travellernumber: "",
    emergencyfirstname: "",
    emergencylastname: "",
    emergencyemail: "",
    emergencyphonenumber: "",
    checkedBags: 0,
  });

  const [formPaymentInfo, setFormPaymentInfo] = useState({
    cardname: "",
    cardnumber: "",
    expiredate: "",
    ccvnumber: "",
  });
  const [departingSeat, setDepartingSeat] = useState(null);
  const [arrivingSeat, setArrivingSeat] = useState(null);
  const [isSameAsPassenger, setIsSameAsPassenger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const departingFlight = localStorage.getItem("departingFlight");
    const arrivingFlight = localStorage.getItem("arrivingFlight");

    const flights = [];
    if (departingFlight) {
      flights.push(JSON.parse(departingFlight));
    }
    if (arrivingFlight) {
      flights.push(JSON.parse(arrivingFlight));
    }
    setSelectedFlights(flights);
    console.log(flights);
  }, []);

  async function flightBooking() {
    try {
      setLoading(true);
      setError(null);
      console.log(selectedFlights[0]);
      console.log(selectedFlights[1]);
      const requestData = {
        userId: session?.user?.id || null,
        departingFlightId: selectedFlights[0].flightId,
        returningFlightId: selectedFlights[1]?.flightId || null, // Optional
        departingSeat: departingSeat.seatNumber,
        arrivingSeat: arrivingSeat?.seatNumber || null, // Optional
        passengerInfo: {
          firstName: formPassengerInfo.firstname,
          middleName: formPassengerInfo.middle || null,
          lastName: formPassengerInfo.lastname,
          suffix: formPassengerInfo.suffix || null,
          dateOfBirth: formPassengerInfo.birthDate,
          email: formPassengerInfo.email,
          phone: formPassengerInfo.phonenumber,
          redressNumber: formPassengerInfo.redressnumber || null,
          knownTravelerNumber: formPassengerInfo.travellernumber,
          checkedBags: formPassengerInfo.checkedBags,
        },
        paymentInfo: {
          paymentType: "Visa",
          nameOnCard: formPaymentInfo.cardname,
          cardNumber: formPaymentInfo.cardnumber,
          ccv: formPaymentInfo.ccvnumber,
          expireDate: formPaymentInfo.expiredate,
        },
      };
      console.log(requestData);

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`${result.message}`);
      }
      localStorage.setItem("bookingInfo", JSON.stringify(result));
      console.log("Booking confirmed:", result);
      router.push("/successbooking");
    } catch (error) {
      setError(`${error}`);
      console.error("Error confirming booking:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {currentPage !== SEATS_PAGE && <Header />}
      {currentPage === PASSENGER_PAGE && (
        <PassengerPage
          selectedFlights={selectedFlights}
          formPassengerInfo={formPassengerInfo}
          setFormPassengerInfo={setFormPassengerInfo}
          isSameAsPassenger={isSameAsPassenger}
          setIsSameAsPassenger={setIsSameAsPassenger}
          action={() => setCurrentPage(SEATS_PAGE)}
        />
      )}
      {currentPage === SEATS_PAGE && (
        <SeatsPage
          action={() => setCurrentPage(PAYMENT_PAGE)}
          selectedFlights={selectedFlights}
          passengerName={`${formPassengerInfo.firstname} ${formPassengerInfo.lastname}`}
          setDepartingSeat={setDepartingSeat}
          setArrivingSeat={setArrivingSeat}
          arrivingSeat={arrivingSeat}
          departingSeat={departingSeat}
        />
      )}
      {currentPage === PAYMENT_PAGE && (
        <PaymentPage
          selectedFlights={selectedFlights}
          action={flightBooking}
          setFormPaymentInfo={setFormPaymentInfo}
          formPaymentInfo={formPaymentInfo}
        />
      )}
      {currentPage !== SEATS_PAGE && <Footer />}
      {loading && (
        <Popup
          message="Processing your booking request..."
          onClose={() => setLoading(false)}
          type="normal"
        />
      )}
      {error && (
        <Popup message={error} onClose={() => setError(null)} type="error" />
      )}
    </>
  );
}
