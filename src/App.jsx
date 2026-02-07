// import { auth } from "./firebase";
// import { signOut } from "firebase/auth";

// import { useState } from "react";
// import "./styles/layout.css";

// import Landing from "./pages/Landing";
// import TherapistSignUp from "./pages/TherapistSignUp";
// import PatientSignUp from "./pages/PatientSignUp";
// import Login from "./pages/Login";
// import TherapistDashboard from "./pages/TherapistDashboard";
// import PatientSlots from "./pages/PatientSlots";
// import PatientHistory from "./pages/PatientHistory";

// const App = () => {
//   const [user, setUser] = useState(null); // { role, uid }
//   const [mode, setMode] = useState(null); // signup-therapist | signup-patient | login

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//     setMode(null);
//   };

//   if (!user && !mode) {
//   return (
//     <Landing
//       onLogin={() => setMode("login")}
//       onSignup={() => setMode("signup-patient")}
//     />
//   );
// }


//   if (user) {
//     return (
//       <div className="container">
//         <div className="topbar">
//           <h2>
//             {user.role === "therapist"
//               ? "Therapist Dashboard"
//               : "Patient Dashboard"}
//           </h2>

//           <button onClick={handleLogout}>Logout</button>
//         </div>

//         {user.role === "therapist" && <TherapistDashboard />}

//         {user.role === "patient" && (
//           <>
//             <PatientSlots patientId={user.uid} />
//             <PatientHistory patientId={user.uid} />
//           </>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <h1>Therapy Booking App</h1>

//       {!mode && (
//         <>
//           <button onClick={() => setMode("signup-therapist")}>
//             Therapist Sign Up
//           </button>
//           <button onClick={() => setMode("signup-patient")}>
//             Patient Sign Up
//           </button>
//           <button onClick={() => setMode("login")}>
//             Login
//           </button>
//         </>
//       )}

//       {mode && (
//         <button className="secondary" onClick={() => setMode(null)}>
//           ← Back
//         </button>
//       )}

//       {mode === "signup-therapist" && <TherapistSignUp />}
//       {mode === "signup-patient" && <PatientSignUp />}
//       {mode === "login" && <Login onLogin={setUser} />}
//     </div>
//   ); 
// };

// export default App;

import { useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";
import TherapistSignUp from "./pages/TherapistSignUp";
import PatientSignUp from "./pages/PatientSignUp";
import Login from "./pages/Login";
import TherapistDashboard from "./pages/TherapistDashboard";
import PatientSlots from "./pages/PatientSlots";
import PatientHistory from "./pages/PatientHistory";

const App = () => {
  const [user, setUser] = useState(null); 
  const [mode, setMode] = useState(null);
  const [prevMode, setPrevMode] = useState(null) 

  const goTo = (nextMode) => {
    setPrevMode(mode);
    setMode(nextMode);
  }

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setMode(null);
    setPrevMode(null)
  };

  // Landing page entry
  if (!user && !mode) {
    return (
      <Landing
        onLogin={() => goTo("login")}
        onGetStarted={() => goTo("role-select")}
      />
    );
  }

  // Logged-in dashboard
  if (user) {
    return (
      <div className="container">
        <div className="topbar">
          <h2>
            {user.role === "therapist"
              ? "Therapist Dashboard"
              : "Patient Dashboard"}
          </h2>
          <button onClick={handleLogout}>Logout</button>
        </div>

        {user.role === "therapist" && <TherapistDashboard />}

        {user.role === "patient" && (
          <>
            <PatientSlots patientId={user.uid} />
            <PatientHistory patientId={user.uid} />
          </>
        )}
      </div>
    );
  }

  // Signup / Login pages
  return (
    <div className="container">

      {mode && (
        <button className="secondary" onClick={() => 
          {
            setMode(prevMode)
            setPrevMode(null)
          }}>
          ← Back
        </button>
      )}


      {mode === "login" && (
        <Login
          onLogin={setUser}
          onCreateAccount={() => goTo("role-select")}
        />
      )}

      {mode === "role-select" && (
      <RoleSelect onSelect={(role) => goTo(role)} />
      )}

      {mode === "signup-patient" && (
        <PatientSignUp onSignup={setUser} />
      )}
      {mode === "signup-therapist" && (
        <TherapistSignUp onSignup={setUser} />
      )}

      {/* {mode === "login" && (
        <Login
          onLogin={setUser}
          onCreateAccount={() => setMode("role-select")}
        />
      )} */}
    </div>
   );
  };

export default App;



// if (user) {
//     return (
//       <div className="container">
//         <button onClick={handleLogout}>
//           Logout
//         </button>

//         {user.role === "therapist" && (
//           <TherapistDashboard />
//         )}

//         {user.role === "patient" && (
//           <>
//             <PatientSlots patientId={user.uid} />
//             <PatientHistory patientId={user.uid} />
//           </>
//         )}
//       </div>
//     );
//   }
