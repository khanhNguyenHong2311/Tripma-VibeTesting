import CustomButton from "../HomePage/button";
import styles from "./pricerating.module.css";

export default function PriceRating() {
  return (
    <div className={styles.container}>
      <div className={styles.priceratingheader}>
        <h4 className={styles.paragraph1}>Price rating</h4>
        <CustomButton
          text="Buy soon"
          padding={{
            top: "6",
            down: "6",
            left: "16",
            right: "16",
          }}
          backgroundcolor="#5CD6C0
"
        ></CustomButton>
      </div>
      <div className={styles.descriptioncontainer}>
        <p className={styles.paragraph1}>
          We recommend booking soon. The average cost of this flight is $750,
          but could rise 18% to $885 in two weeks.
        </p>
        <p className={styles.paragraph2}>
          <br></br> Tripma analyzes thousands of flights, prices, and trends to
          ensure you get the best deal.
        </p>
      </div>
    </div>
  );
}

/*

*/
