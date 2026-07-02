import Image from "next/image";
import styles from "./placecard.module.css";

export default function PlaceCard({
  imageSrc,
  city,
  description,
  width,
  height,
  children,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={`${city} image`}
          width={width}
          height={height}
        />
      </div>
      <div className={styles.info}>
        {children}
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
