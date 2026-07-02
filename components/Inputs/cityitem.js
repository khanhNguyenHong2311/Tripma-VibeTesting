import styles from "./cityitem.module.css";
export default function CityItem({ cityname, onSelect }) {
  return (
    <div
      className={styles.container}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(cityname);
      }}
    >
      <span className={styles.cityname}>{cityname}</span>
    </div>
  );
}
