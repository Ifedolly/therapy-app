import "../styles/landing.css";

const Footer = () => {
  return (
    <footer className="footer" data-aos="fade-up" data-aos-duration="800">
      <div className="footer-container">
        <h2 
          className="footer-title" 
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Or we could just talk…
        </h2>

        <a href="tel:+18005629" 
          className="footer-phone"
          // data-aos="fade-up"
          // data-aos-delay="100"
        >
          Call +1 800 5629
        </a>

        <p 
          className="footer-copy"
          // data-aos="fade-up"
          // data-aos-delay="100"
        >
          © {new Date().getFullYear()} Healing Harbour. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
