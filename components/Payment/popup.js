import styles from "./popup.module.css";
import CustomButton from "../HomePage/button";

export default function Popup({ message, onClose, type = "normal" }) {
  return (
    <div className={styles.popupOverlay}>
      <div className={`${styles.popupContainer} ${styles[type]}`}>
        <div className={styles.loader}></div>
        <p>{message}</p>
        {onClose && <CustomButton text="Close" action={onClose}></CustomButton>}
      </div>
    </div>
  );
}
