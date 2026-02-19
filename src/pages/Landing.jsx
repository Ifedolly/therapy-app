import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/landing.css";

const Landing = ({ onLogin, onGetStarted }) => {

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar onLogin={onLogin} />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content" data-aos="fade-right">
            {/* <h1>Find the support you need, when life feels overwhelming, and take care of your mental wellbeing.</h1> */}
            <h2>
              Book therapy sessions. <br /> Safe, private, for real
              people.
            </h2>
            <button onClick={onGetStarted}>
              Get Started
            </button>
          </div> 
          <div className="hero-image" data-aos="fade-left">
            <img src="/images/tpy2.jpg" alt="Therapy illustration" />
          </div>
        </div>

        <svg className="curve" viewBox="0 0 1400 100" preserveAspectRatio="none">
          <path
            d="M0,50 C240,90 480,10 720,30 960,50 1200,90 1440,50 L1440,120 L0,120 Z"
            fill="#e9e4d1"
          />
        </svg>
      </section>

      <section className="mission" >
        <p data-aos="fade-up">
          Our mission is to provide compassionate, evidence-based support that
          empowers individuals to overcome anxiety, rediscover peace, 
          and live with confidence. We are committted to creating a safe, 
          welcoming space where healing and personal growth thrive.
        </p>
      </section>

      <section className="services">
        <div className="service text" data-aos="fade-right">
          <h3><i>Evidence-based</i> <br /> Effective Therapy</h3>
          <p>
            Our approach combines proven, science-backed techniques 
            
            strategies to help you manage anxiety effectively.
          </p>
        </div>

        <div className="service image" data-aos="fade-left">
          <img src="/images/tpy3.jpg" alt="Therapy session" />
        </div>

        <div className="service image" data-aos="fade-right">
          <img src="/images/tpy7.jpg" alt="Mental wellness" />
        </div>

        <div className="service text" data-aos="fade-left">
          <h3>Our Therapy Services</h3>
          <p>Get the emotional healing you need.</p>
          <ul>
            <li>Individual Therapy</li>
            <li>Adolescent Therapy</li>
          </ul>
        </div>
      </section>

      <section className="how-it-works">
        <h2 data-aos="fade-up" data-aos-duration="800">
          How Therapy Works
        </h2>

        <div className="steps">
          <div className="step" data-aos="fade-up" data-aos-delay="100">
            <div className="step-number">1</div>
            <h3>Listening</h3>
            <div className="step-line"></div>
            <p>We listen carefully to understand your thoughts and experiences.</p>
          </div>

          <div className="step" data-aos="fade-up" data-aos-delay="250">
            <div className="step-number">2</div>
            <h3>Guidance</h3>
            <div className="step-line"></div>
            <p>We listen carefully to understand your thoughts and experiences.</p>
          </div>

          <div className="step" data-aos="fade-up" data-aos-delay="400">
            <div className="step-number">3</div>
            <h3>Healing</h3>
            <div className="step-line"></div>
            <p>We support your healing and personal growth over time.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;
