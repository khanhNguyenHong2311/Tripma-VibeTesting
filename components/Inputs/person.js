import styles from "./person.module.css";
import Counter from "./counter";

export default function PersonInput({ text, count, setCount }) {
  return (
    <div className={styles.container}>
      <div className={styles.leftcontainer}>
        <span className={styles.personcategory}>{text}:</span>
      </div>
      <Counter ok={false} count={count} setCount={setCount} />
    </div>
  );
}
