import styles from "./Personslist.module.css";
import PersonInput from "./person";

export default function PersonsList({
  adultsCount,
  setAdultsCount,
  minorsCount,
  setMinorsCount,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <PersonInput
          text={"Adults"}
          count={adultsCount}
          setCount={setAdultsCount}
        />
        <PersonInput
          text={"Minors"}
          count={minorsCount}
          setCount={setMinorsCount}
        />
      </div>
    </div>
  );
}
