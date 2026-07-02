import Link from "next/link";
import styles from "./navbar.module.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
export default function Navbar({ onOpen, setMode }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={107}
            height={30}
            className={styles.logo}
          />
        </Link>
      </div>
      <nav className={styles.navList}>
        <ul>
          <div className={styles.outerdiv}>
            <li className={styles.navItem}>
              <Link href="/flights">Flights</Link>
            </li>
          </div>
          <div className={styles.outerdiv}>
            <li className={styles.navItem}>
              <Link href="/hotels">Hotels</Link>
            </li>
          </div>
          <div className={styles.outerdiv}>
            <li className={styles.navItem}>
              <Link href="/packages">Packages</Link>
            </li>
          </div>
          {!loading && session && (
            <div className={styles.outerdiv}>
              <li className={styles.navItem}>
                <Link href="/packages">Your Trips</Link>
              </li>
            </div>
          )}
          {!loading && !session && (
            <>
              {" "}
              <button
                className={styles.btn}
                onClick={() => {
                  onOpen();
                  setMode("SIGNIN");
                }}
              >
                <div className={styles.signup}>
                  <li>Sign In</li>
                </div>
              </button>
              <button
                className={styles.btn}
                onClick={() => {
                  onOpen();
                  setMode("SIGNUP");
                }}
              >
                <div className={styles.signup}>
                  <li>Sign up</li>
                </div>
              </button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
