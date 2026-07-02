import { useState } from "react";
import FilterList from "../Inputs/filterlist";
import styles from "./filtercontainer.module.css";

export default function FilterComponent({
  departingFlights,
  arrivingFlights,
  phase,
  selectedPrice,
  setSelectedPrice,
  selectedTimes,
  setSelectedTimes,
  selectedAirlines,
  setSelectedAirlines,
}) {
  const [activeFilter, setActiveFilter] = useState(null);


  const getMaxPrices = () => {
    const flights = phase === "departing" ? departingFlights : arrivingFlights;
    const prices = flights.flatMap((flight) => {
      const totalPrice = flight.subtotalPrice + flight.taxesAndFees;
      return [Math.floor(totalPrice)];
    });
    return [...new Set(prices)].map((price) => `$${price}`);
  };

  const getTimes = () => {
    const flights = phase === "departing" ? departingFlights : arrivingFlights;
    const times = flights.flatMap((flight) => {
      const time = new Date(flight.Date).getHours();
      if (time >= 0 && time < 12) return "Morning";
      if (time >= 12 && time < 18) return "Afternoon";
      return "Evening";
    });
    return [...new Set(times)];
  };

  const getAirlines = () => {
    const flights = phase === "departing" ? departingFlights : arrivingFlights;
    const airlines = flights.map((flight) => flight.airlineName);
    return [...new Set(airlines)];
  };

  const filters = [
    {
      name: "Max price",
      items: getMaxPrices(),
      width: "200px",
      state: selectedPrice,
      setState: setSelectedPrice,
    },
    {
      name: "Times",
      items: getTimes(),
      width: "200px",
      state: selectedTimes,
      setState: setSelectedTimes,
    },
    {
      name: "Airlines",
      items: getAirlines(),
      width: "200px",
      state: selectedAirlines,
      setState: setSelectedAirlines,
    },
    {
      name: "Shops",
      items: ["Shop 1", "Shop 2", "Shop 3"],
      width: "200px",
      state: null,
      setState: null,
    },
    {
      name: "Seat class",
      items: ["Economy", "Business"],
      width: "200px",
      state: null,
      setState: null,
    },
    {
      name: "More",
      items: ["Option 1", "Option 2", "Option 3"],
      width: "200px",
      state: null,
      setState: null,
    },
  ];

  const handleWrapperClick = (index) => {
    setActiveFilter(activeFilter === index ? null : index);
  };

  const handleSelect = (item, filterIndex) => {
    const filter = filters[filterIndex];
    if (filter.setState) {
      filter.setState(item);
    }
  };

  return (
    <div className={styles.container}>
      {filters.map((filter, index) => (
        <div
          key={index}
          className={styles.wrapper}
          onClick={() => handleWrapperClick(index)}
        >
          <span className={styles.item}>
            {filter.name} {filter.state ? `(${filter.state})` : ""}
          </span>
          <span className={styles.icon}>▼</span>
          {activeFilter === index && (
            <div
              className={styles.listContainer}
              style={{ width: filter.width }}
            >
              <FilterList
                items={filter.items}
                onSelect={(item) => handleSelect(item, index)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
