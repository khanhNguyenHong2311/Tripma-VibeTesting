import Image from "next/image";
import classes from "./logo.module.css";
export default function Logo() {
  return (
    <div className={classes.container}>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={107}
        height={30}
        className={styles.logo}
      />
    </div>
  );
}
