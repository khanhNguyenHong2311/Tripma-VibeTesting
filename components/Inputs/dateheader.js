import styles from "./dateheader.module.css";
import DateSelect from "./dateselect";
import CustomButton from "../HomePage/button";

export default function DateHeader({
  action,
  startDate,
  endDate,
  type,
  setType,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.checkboxcontainer}>
          <input
            type="checkbox"
            id="Round"
            name="option1"
            checked={type}
            defaultChecked
            onChange={() => {
              if (!type) setType(true);
            }}
          />
          <span className={styles.checkboxLabel}>Round trip</span>
        </div>
        <div className={styles.checkboxcontainer}>
          <input
            type="checkbox"
            id="Oneway"
            name="option1"
            checked={!type}
            onChange={() => {
              if (type) setType(false);
            }}
          />
          <span className={styles.checkboxLabel}>Oneway</span>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.dateselect}>
          <DateSelect startDate={startDate} endDate={endDate} />
        </div>
        <CustomButton text={"Done"} action={action} />
      </div>
    </div>
  );
}
