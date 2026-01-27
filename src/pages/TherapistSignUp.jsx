import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import '../styles/auth.css'

const TherapistSignUp = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
    alert("Please fill all fields");
    return;
    }

    try {
      // Auth user creation
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Firestore profile creation
      await setDoc(doc(db, "therapists", uid), {
        fullName,
        role: "therapist",
        createdAt: serverTimestamp(),
      });

      alert("Therapist account created! Please log in.");

      setFullName("");
      setEmail("");
      setPassword("");
    } 
    catch (error) {
      console.error(error);
      alert("Error creating account: " + error.message);
    }
  };

    return(
        <form className="auth-container" onSubmit={handleSignUp}>
          
          <h2>Sign Up as a Therapist</h2>

          <div><input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" /></div>
          <div><input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" /></div>
          <div><input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" /></div>
          <div><button type="submit">Sign Up</button></div>
        </form>
    )
}

export default TherapistSignUp;