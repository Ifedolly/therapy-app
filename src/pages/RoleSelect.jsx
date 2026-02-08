// import '../styles/layout.css'
import '../styles/roleselect.css'

const RoleSelect = ({ onSelect }) => {
  return (
    <div className="role-container">
      <h2>Get Started</h2>
      <p>Choose how you’d like to continue</p>
      <div className="rolebuttons">
        <button className='role-button' onClick={() => onSelect("signup-patient")}>
          I’m a Patient
        </button>
        
        <button className='role-button' onClick={() => onSelect("signup-therapist")}>
          I’m a Therapist
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;
