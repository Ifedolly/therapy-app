import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/landing.css";

const Landing = ({ onLogin, onSignup }) => {
  return (
    <>
      <Navbar onLogin={onLogin} onSignup={onSignup} />

      <section className="hero">
        <div className="hero-inner">
            <div className="hero-content">
              <h1>Care that meets you where you are</h1>
              <p>
                  Book therapy sessions easily. Safe, private, and built for real
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
            <img src="/therapy-illustration.png" alt="Therapy illustration" />
            </div>
        </div>

        {/* curved divider */}
        <svg className="curve" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
            d="M0,50 C240,90 480,10 720,30 960,50 1200,90 1440,50 L1440,120 L0,120 Z"

            // d="M0,25 C360,10 480,70 720,60 960,50 1200,100 1440,85 L1440,120 L0,120 Z"
            fill="#f9fafb"
            />
        </svg>
      </section>

      <section className="info">
        <h2>How it works</h2>
        <div className="steps">
          <div>
            <h3>1. Sign up</h3>
            <p>Create an account in minutes.</p>
          </div>
          <div>
            <h3>2. Book a session</h3>
            <p>Choose a time that works for you.</p>
          </div>
          <div>
            <h3>3. Get care</h3>
            <p>Meet your therapist with ease.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;
