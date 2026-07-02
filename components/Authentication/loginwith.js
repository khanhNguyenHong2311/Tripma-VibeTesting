import styles from "./loginwith.module.css";
import { signIn } from "next-auth/react";

import Image from "next/image";
export default function LoginWithButton({ imgpath, text, provider }) {
  const handleLogin = async () => {
    try {
      await signIn(provider, { redirect: true });
      console.log("done");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <button className={styles.container} onClick={handleLogin}>
      <div className={styles.innercontainer}>
        <Image src={imgpath} alt="google" width={18} height={18} />
        <span>{text}</span>
      </div>
    </button>
  );
}
