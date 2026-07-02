import styles from "./footergrid.module.css";
import Link from "next/link";
import Image from "next/image";
export default function FooterGrid() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={107} height={30} />
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>About</h3>
          <ul className={styles.list}>
            <li>
              <Link href="#">About Tripma</Link>
            </li>
            <li>
              <Link href="#">How it works</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
            <li>
              <Link href="#">Press</Link>
            </li>
            <li>
              <Link href="#">Blog</Link>
            </li>
            <li>
              <Link href="#">Forum</Link>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Partner with us</h3>
          <ul className={styles.list}>
            <li>
              <Link href="#">Partnership programs</Link>
            </li>
            <li>
              <Link href="#">Affiliate program</Link>
            </li>
            <li>
              <Link href="#">Connectivity partners</Link>
            </li>
            <li>
              <Link href="#">Promotions and events</Link>
            </li>
            <li>
              <Link href="#">Integrations</Link>
            </li>
            <li>
              <Link href="#">Community</Link>
            </li>
            <li>
              <Link href="#">Loyalty program</Link>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Support</h3>
          <ul className={styles.list}>
            <li>
              <Link href="#">Help Center</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Terms of Service</Link>
            </li>
            <li>
              <Link href="#">Trust and safety</Link>
            </li>
            <li>
              <Link href="#">Accessibility</Link>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Get the App</h3>
          <ul className={styles.list}>
            <li>
              <Link href="#">Tripma for Android</Link>
            </li>
            <li>
              <Link href="#">Tripma for iOS</Link>
            </li>
            <li>
              <Link href="#">Mobile site</Link>
            </li>
            <li>
              <Link href="#">
                <Image
                  src="/appstore.svg"
                  alt="appstore"
                  width={135}
                  height={40}
                  className={styles.logo}
                />
              </Link>
            </li>
            <li>
              <Link href="#">
                <Image
                  src="/googleplay.svg"
                  alt="googleplay"
                  width={135}
                  height={40}
                  className={styles.logo}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
