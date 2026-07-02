import CustomButton from "../HomePage/button";
import styles from "./placesugguesstion.module.css";
import PlaceCard from "../HomePage/placecard";

export default function PlaceSuggestion() {
  return (
    <div className={styles.container}>
      <div className={styles.hotelscontainer}>
        <h3>Shop hotels</h3>
        <div className={styles.itemscontainer}>
          <p>
            Tripma partners with thousands of hotels to get you the best deal.
            Save up to 30% when you add a hotel to your trip.
          </p>
          <PlaceCard
            imageSrc={"./placesuggesstion.svg"}
            placename={"The Bund"}
            city={"Shanghai"}
            price={"$598"}
            description={"China's most international city"}
            width={400}
            height={247}
          ></PlaceCard>
          <PlaceCard
            imageSrc={"./placesuggesstion.svg"}
            placename={"The Bund"}
            city={"Shanghai"}
            price={"$598"}
            description={"China's most international city"}
            width={400}
            height={247}
          ></PlaceCard>
          <PlaceCard
            imageSrc={"./placesuggesstion.svg"}
            placename={"The Bund"}
            city={"Shanghai"}
            price={"$598"}
            description={"China's most international city"}
            width={400}
            height={247}
          ></PlaceCard>
          <PlaceCard
            imageSrc={"./placesuggesstion.svg"}
            placename={"The Bund"}
            city={"Shanghai"}
            price={"$598"}
            description={"China's most international city"}
            width={400}
            height={247}
          ></PlaceCard>
          <div className={styles.button}>
            <CustomButton
              text="Shop all hotels"
              backgroundcolor="white"
              color="#605DEC
"
              border="1px solid #605DEC"
            ></CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.hotelscontainer}>
        <h3>Find unique experiences</h3>
        <div className={styles.itemscontainer}>
          <p>
            Find events and authentic cultrual experiences available exclusively
            to Tripma users.
          </p>
          <PlaceCard
            imageSrc={"./placesuggesstion.svg"}
            placename={"The Bund"}
            city={"Shanghai"}
            price={"$598"}
            description={"China's most international city"}
            width={400}
            height={247}
          ></PlaceCard>
          <PlaceCard
            imageSrc={"./placesuggesstion.svg"}
            placename={"The Bund"}
            city={"Shanghai"}
            price={"$598"}
            description={"China's most international city"}
            width={400}
            height={247}
          ></PlaceCard>
          <div className={styles.button}>
            <CustomButton
              text="View all experiences"
              backgroundcolor="white"
              color="#605DEC
"
              border="1px solid #605DEC"
            ></CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
