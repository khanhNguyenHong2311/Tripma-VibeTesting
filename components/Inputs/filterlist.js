import FilterItem from "./filteritem";
import styles from "./filterlist.module.css";

export default function FilterList({ items, onSelect }) {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {items.map((item, index) => (
          <FilterItem key={index} item={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
