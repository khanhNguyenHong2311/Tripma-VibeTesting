import PlaceCard from "./placecard";
import styles from "./flightdeals.module.css";
import Image from "next/image";

function NamePriceComponent({ placename, city, price }) {
  return (
    <div className={styles.locationpricecontainer}>
      <div className={styles.placeinfocontainer}>
        <h4 className={styles.country}>{`${placename}, `}</h4>
        <h4 className={styles.city}>{city}</h4>
      </div>
      {price && <h4 className={styles.price}>{price}</h4>}
    </div>
  );
}

function TextComponent({ normaltext, specialtext }) {
  return (
    <div className={styles.textonly}>
      <h4 className={styles.normaltext}>{normaltext}</h4>
      <span className={styles.specialtext}>{specialtext}</span>
    </div>
  );
}
function HotelComponent({ text }) {
  return (
    <div>
      <h4 className={styles.text}>{text}</h4>
    </div>
  );
}

export default function FlightDeals({
  showfull = true,
  Header,
  type,
  imgpath,
}) {
  const renderedelement =
    type === "FLIGHTS" ? (
      <NamePriceComponent placename="The Bund" city="Shanghai" price="$598" />
    ) : type === "HOTEL" ? (
      <HotelComponent text={"Hotel Kaneyamaen and Bessho SASA"} />
    ) : (
      <TextComponent
        normaltext="Stay among the atolls in"
        specialtext="Maldives"
      />
    );

  return (
    <div className={styles.outercontainer}>
      <div className={styles.descriptioncontainer}>
        {Header && <Header />}
        <div className={styles.rightdescription}>
          <span>All</span>
          <Image
            src="./arrowRight.svg"
            alt="arrowRight"
            width={32}
            height={32}
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.combinedcontainer}>
          <PlaceCard
            imageSrc={imgpath}
            description="China's most international city"
            width={410.67}
            height={397}
          >
            {renderedelement}
          </PlaceCard>
          <PlaceCard
            imageSrc={imgpath}
            description="China's most international city"
            width={410.67}
            height={397}
          >
            {renderedelement}
          </PlaceCard>
          <PlaceCard
            imageSrc={imgpath}
            description="China's most international city"
            width={410.67}
            height={397}
          >
            {renderedelement}
          </PlaceCard>
        </div>
        {showfull && (
          <PlaceCard
            imageSrc="./flightdealfull.svg"
            description="China's most international city"
            width={1312}
            height={397}
          >
            {renderedelement}
          </PlaceCard>
        )}
      </div>
    </div>
  );
}
