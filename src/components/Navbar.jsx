import "../styles/landing.css";

const Navbar = ({ onLogin, onSignup }) => {
  return (
    <nav className="navbar">
      <span className="logo">Healing Harbour</span>

      <div>
        <button className="link" onClick={onLogin}>Login</button>
        <button onClick={onSignup}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
