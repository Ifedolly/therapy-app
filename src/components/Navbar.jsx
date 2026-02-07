import "../styles/landing.css";

const Navbar = ({ onLogin }) => {
  return (
    <nav className="navbar">
      <span className="logo">Healing Harbour</span>

      <div>
        <button className="link" onClick={onLogin}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
