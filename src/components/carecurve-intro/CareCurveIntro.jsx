import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import careCurveLogo from '../../assets/images/logo.png';
import './CareCurveIntro.css';

gsap.registerPlugin(ScrollTrigger);

const Particles = ({ isVisible }) => {
  const particlesRef = useRef([]);
  const [particles, setParticles] = useState([]);
  const boundsRef = useRef({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 1000,
  });

  useEffect(() => {
    const handleResize = () => {
      boundsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * boundsRef.current.width,
      y: Math.random() * boundsRef.current.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (!isVisible || particles.length === 0) return;

    let animationFrameId;

    const animate = () => {
      const { width, height } = boundsRef.current;
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;

        const particleData = particles[i];
        if (!particleData) return;

        particleData.x += particleData.speedX;
        particleData.y += particleData.speedY;

        if (particleData.x < 0) particleData.x = width;
        if (particleData.x > width) particleData.x = 0;
        if (particleData.y < 0) particleData.y = height;
        if (particleData.y > height) particleData.y = 0;

        particle.style.transform = `translate(${particleData.x}px, ${particleData.y}px)`;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, particles]);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          ref={(el) => (particlesRef.current[particle.id] = el)}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: 0,
            top: 0,
            transform: `translate(${particle.x}px, ${particle.y}px)`,
          }}
        />
      ))}
    </div>
  );
};

const CareCurveIntro = () => {
  const sectionRef = useRef(null);
  const ribbonRef = useRef(null);
  const heartRef = useRef(null);
  const logoRef = useRef(null);
  const nameRef = useRef(null);
  const glowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    let pathLength = 1000;
    if (ribbonRef.current) {
      pathLength = ribbonRef.current.getTotalLength();
      ribbonRef.current.style.strokeDasharray = pathLength;
      ribbonRef.current.style.strokeDashoffset = pathLength;
    }

    const ctx = gsap.context(() => {
      gsap.set([ribbonRef.current, heartRef.current, logoRef.current, nameRef.current], { 
        opacity: 0 
      });
      gsap.set(heartRef.current, { scale: 0 });
      gsap.set(logoRef.current, { scale: 1.5 });
      gsap.set(nameRef.current, { y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      });

      tl.to(ribbonRef.current, {
        opacity: 1,
        duration: 0.5
      })
      .to(ribbonRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut'
      })
      .to(heartRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
      }, '-=1')
      .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)'
      }, '-=0.5')
      .to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.5');
    }, sectionRef);

    const quickToX = glowRef.current
      ? gsap.quickTo(glowRef.current, "x", { duration: 0.6, ease: "power2.out" })
      : null;
    const quickToY = glowRef.current
      ? gsap.quickTo(glowRef.current, "y", { duration: 0.6, ease: "power2.out" })
      : null;

    const handleMouseMove = (e) => {
      if (quickToX && quickToY) {
        quickToX(e.clientX);
        quickToY(e.clientY);
      }
    };

    const sectionEl = sectionRef.current;
    if (sectionEl) {
      sectionEl.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      ctx.revert();
      if (sectionEl) {
        sectionEl.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="carecurve-intro">
      <Particles isVisible={isVisible} />
      <div className="glow-effect" ref={glowRef} />
      
      <div className="intro-content">
        <div className="logo-container">
          <svg className="ribbon-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              ref={ribbonRef}
              className="ribbon-path"
              d="M10,50 Q30,30 50,50 T90,50"
            />
          </svg>
          
          <motion.div
            ref={heartRef}
            className="heart-icon"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="#ef4444"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
          
          <img
            ref={logoRef}
            src={careCurveLogo}
            alt="CareCurve Logo"
            className="logo-image"
          />
        </div>
        
        <motion.h1
          ref={nameRef}
          className="company-name"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          CareCurve
        </motion.h1>
      </div>
    </section>
  );
};

export default CareCurveIntro;