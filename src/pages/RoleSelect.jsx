// import '../styles/layout.css'
import '../styles/roleselect.css'
import { FaUser, FaUserMd } from "react-icons/fa";

const RoleSelect = ({ onSelect }) => {
  return (
    <div className="role-container">
      <h2>Get Started</h2>
      <p>Choose how you’d like to continue</p>
      <div className="role-buttons">
        <button 
          className='role-button' 
          onClick={() => onSelect("signup-patient")}>
          <FaUser className="role-icon" />
          I’m a Patient
        </button>
        
        <button 
          className='role-button' 
          onClick={() => onSelect("signup-therapist")}>
          <FaUserMd className="role-icon" />
          I’m a Therapist
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;
