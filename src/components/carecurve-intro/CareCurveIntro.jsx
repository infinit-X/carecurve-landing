import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CareCurveIntro.css';

// Placeholder for the CareCurve logo
// Replace this with the actual path to your logo image
import careCurveLogo from '../../assets/images/logo.png';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

const CareCurveIntro = () => {
  const sectionRef = useRef(null);
  const rainbowLineRef = useRef(null);
  const heartRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef([]);

  const setFeatureRef = (el, index) => {
    featuresRef.current[index] = el;
  };

  const features = [
    {
      title: 'Secure Data Storage',
      description: 'Safeguard all health information using secure databases like Amazon HealthLake.',
    },
    {
      title: 'Dual Platform Access',
      description: 'Separate logins for mothers and healthcare providers for seamless interaction.',
    },
    {
      title: 'Real-Time Updates',
      description: 'Access health and growth data updates in real-time via web UI or mobile app.',
    },
    {
      title: 'Comprehensive Digitization',
      description: 'All physical card information digitized and accessible anytime, anywhere.',
    },
    {
      title: 'Smart Notifications',
      description: 'Reminders for clinic visits, vaccinations, growth predictions, and tips for mothers.',
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initially hide elements
      gsap.set(rainbowLineRef.current, { x: '-100%' });
      gsap.set(heartRef.current, { opacity: 0, scale: 0 });
      gsap.set(logoRef.current, { opacity: 0, scale: 1.5 });
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 50 });
      featuresRef.current.forEach((feature) => {
        gsap.set(feature, { opacity: 0, y: 50 });
      });

      // Rainbow Line Animation Timeline
      const rainbowTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      // Rainbow line enters from left
      rainbowTl.to(rainbowLineRef.current, {
        x: '50%',
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: function () {
          const progress = this.progress();
          const gradient = `linear-gradient(to right, #87CEEB ${progress * 100}%, #FF69B4 ${progress * 100}%)`;
          rainbowLineRef.current.style.background = gradient;
        },
      });

      // Heart shape forms in the center
      rainbowTl.to(heartRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });

      // Heart transforms into logo
      rainbowTl.to(heartRef.current, {
        opacity: 0,
        duration: 0.5,
      }, '+=0.5');

      rainbowTl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      }, '<');

      // Rainbow line exits to the right
      rainbowTl.to(rainbowLineRef.current, {
        x: '150%',
        duration: 2,
        ease: 'power2.inOut',
      }, '<');

      // Logo shrinks and title appears
      rainbowTl.to(logoRef.current, {
        scale: 0.5,
        duration: 1,
        ease: 'power2.out',
      }, '+=0.5');

      rainbowTl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }, '<');

      // Description appears
      rainbowTl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }, '+=0.5');

      // Features fade in sequentially
      featuresRef.current.forEach((feature, index) => {
        rainbowTl.to(feature, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        }, `+=${index * 0.3}`);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* SVG Clip Path for Heart Shape */}
      <svg className="heart-clip">
        <clipPath id="heart-clip">
          <path d="M50 15c-10 0-15 10-15 20 0 10 5 15 15 25 10-10 15-15 15-25 0-10-5-20-15-20z" />
        </clipPath>
      </svg>
      <section id="carecurve-intro" ref={sectionRef} className="carecurve-intro">
        <div className="animation-container">
          <div ref={rainbowLineRef} className="rainbow-line"></div>
          <div ref={heartRef} className="heart-shape"></div>
          <img ref={logoRef} src={careCurveLogo} alt="CareCurve Logo" className="carecurve-logo" />
        </div>
        <div className="content-container">
          <h2 ref={titleRef} className="carecurve-title">Introducing CareCurve</h2>
          <p ref={descriptionRef} className="carecurve-description">
            CareCurve is the ultimate digital solution for safeguarding your baby’s health information. Say goodbye to the worries of misplaced or damaged physical cards—our platform ensures all your data is secure, accessible, and up-to-date.
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => setFeatureRef(el, index)}
                className="feature-card"
              >
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareCurveIntro;