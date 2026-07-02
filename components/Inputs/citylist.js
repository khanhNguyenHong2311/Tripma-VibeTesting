import styles from "./citylist.module.css";
import CityItem from "./cityitem";
export default function CityList({ width, cities, onSelect }) {
  return (
    <div className={styles.container} style={{ width }}>
      <div className={styles.list}>
        {cities.map((city, index) => (
          <CityItem key={index} cityname={city} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
