import "../styles/landing.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h2>Or we could just Talk...</h2>
      <p>CALL +1 800 5629</p>
      <p>© {new Date().getFullYear()} TherapyCare. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
