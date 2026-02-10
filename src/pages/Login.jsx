import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import '../styles/auth.css'

const Login = ({ onLogin, onCreateAccount }) => { // <-- added onCreateAccount
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      const therapistRef = doc(db, "therapists", uid);
      const therapistSnap = await getDoc(therapistRef);

      if (therapistSnap.exists()) {
        onLogin({ role: "therapist", uid });
        return;
      }

      const patientRef = doc(db, "patients", uid);
      const patientSnap = await getDoc(patientRef);

      if (patientSnap.exists()) {
        onLogin({ role: "patient", uid });
        return;
      }

      alert("User role not found");

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="auth-container" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Create Account Link */}
      <p className="switch-auth" style={{ textAlign: "center", marginTop: "1rem" }}>
        Don’t have an account?{" "}
        <span
          onClick={onCreateAccount}
          style={{
            cursor: "pointer",
            color: "#1b496b",
            textDecoration: "underline",
            fontWeight: "600",
          }}
        >
          Create account
        </span>
      </p>
    </>
  );
};

export default Login;
