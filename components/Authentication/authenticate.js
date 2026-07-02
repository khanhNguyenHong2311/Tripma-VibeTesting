import React, { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./authenticate.module.css";
import LoginWithButton from "./loginwith";

export default function Authentication({ onClose, mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveAlerts, setReceiveAlerts] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "SIGNUP";

  const handleSignup = async () => {
    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }
    const formData = {
      email,
      password,
      agreeTerms,
      receiveAlerts,
    };
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Signup failed");
      }
      console.log("Signup successful:", result);
      onClose();
    } catch (error) {
      setError(`${error.message}`);
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async () => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        throw new Error(result.error);
      }
      console.log("Signin successful:", result);
      onClose();
    } catch (error) {
      setError(`${error.message}`);
      console.error("Error during signin:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter a valid Email");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long`,");
      return;
    }
    setError(null);
    if (isSignup) {
      await handleSignup();
    } else {
      await handleSignin();
    }
  };

  const handleSigninWithGoogle = async () => {
    try {
      await signIn(provider, { redirect: true });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div
      className={styles.modal}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modalContent}>
        <div className={styles.headercontainer}>
          <div className={styles.header}>
            <h3>{isSignup ? "Sign up for Tripma" : "Sign in to Tripma"}</h3>
            <span className={styles.closeBtn} onClick={onClose}>
              &times;
            </span>
          </div>
          <p>
            {isSignup
              ? "Tripma is totally free to use. Sign up using your email address or phone number below to get started."
              : "Sign in to access your Tripma account."}
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            name="email"
            required
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          {isSignup && (
            <>
              <div className={styles.checkboxcontainer}>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={loading}
                />
                <span className={styles.checkboxLabel}>
                  I agree to the terms and conditions
                </span>
              </div>
              <div className={styles.checkboxcontainer}>
                <input
                  type="checkbox"
                  id="alerts"
                  name="alerts"
                  checked={receiveAlerts}
                  onChange={(e) => setReceiveAlerts(e.target.checked)}
                  disabled={loading}
                />
                <span className={styles.checkboxLabel}>
                  Send me the latest deal alerts
                </span>
              </div>
            </>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : isSignup ? "Create account" : "Sign in"}
          </button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
        {isSignup && (
          <>
            <div className={styles.or}>or</div>
            <div className={styles.loginwith}>
              <LoginWithButton
                imgpath="./google.svg"
                text="Continue with Google"
                provider="google"
              />
              <LoginWithButton
                imgpath="./apple.svg"
                text="Continue with Apple"
                provider="apple"
              />
              <LoginWithButton
                imgpath="./facebook.svg"
                text="Continue with Facebook"
                provider="facebook"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
