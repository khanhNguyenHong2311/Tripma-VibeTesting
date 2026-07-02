import styles from "./filteritem.module.css";

export default function FilterItem({ item, onSelect }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <span className={styles.cityname}>{item}</span>
    </div>
  );
}
