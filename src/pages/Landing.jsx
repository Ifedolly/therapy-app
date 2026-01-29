import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import "../styles/landing.css";

const Landing = ({ onLogin, onSignup }) => {
  return (
    <>
      <Navbar onLogin={onLogin} onSignup={onSignup} />

      <section className="hero">
        <div className="hero-inner">
            <div className="hero-content">
              <h1>Care for you, for all.</h1>
              <p>
                  Book therapy sessions. Safe, private, for real
                  people.
              </p>
              <div className="hero-actions">
                  <button onClick={onSignup}>Get Started</button>
                  <button className="secondary" onClick={onLogin}>
                  Login
                  </button>
                </div>
            </div>

            <div className="hero-image">
            <img src="/images/tpy3.jpg" alt="Therapy illustration" />
            </div>
        </div>

        {/* curved divider */}
        <svg className="curve" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,50 C240,90 480,10 720,30 960,50 1200,90 1440,50 L1440,120 L0,120 Z"
            fill="#e9e4d1"
          />
        </svg>
      </section>

      <section className="mission">
        {/* <h2>Your Path to health starts here</h2> */}
        <p>
          Our mission is to provide compassionate, evidence-based support that
          empowers individuals to overcome anxiety, rediscover peace, 
          and live with confidence. We are committted to creating a safe, 
          welcoming space where healing and personal growth thrive.
        </p>
      </section>

      <section className="services">
        <div className="service text">
          <h3><i>Evidence-based</i> <br /> Effective Therapy</h3>
          <p>
            Our approach combines proven, science-backed techniques 
            like Cognitive behavioural Therapy (CBT) and mindfulness 
            strategies to help you manage anxiety effectively.
          </p>
        </div>

        <div className="service image">
          <img src="/images/tpy3.jpg" alt="Therapy session" />
        </div>

        <div className="service image">
          <img src="/images/tpy7.jpg" alt="Mental wellness" />
        </div>

        <div className="service text">
          <h3>Safe & Private</h3>
          <p>Your conversations are secure and confidential.</p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;
