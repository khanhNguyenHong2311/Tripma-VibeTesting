import styles from "./footer.module.css";
import Image from "next/image";
import FooterGrid from "./footergrid";
export default function Footer() {
  return (
    <div className={styles.container}>
      <FooterGrid></FooterGrid>
      <div className={styles.footerdivider}></div>
      <div className={styles.copyrightscontainer}>
        <div className={styles.logocontainer}>
          <Image
            src={"./twitter.svg"}
            alt="twitter logo"
            width={24}
            height={24}
          ></Image>
          <Image
            src={"./instagram.svg"}
            alt="instagram logo"
            width={24}
            height={24}
          ></Image>
          <Image
            src={"./facebookfooter.svg"}
            alt="facebook logo"
            width={24}
            height={24}
          ></Image>
        </div>
        <div className={styles.copyrightsdescription}>
          <span>© 2020 Tripma incorporated</span>
        </div>
      </div>
    </div>
  );
}
