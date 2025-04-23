import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import careCurveLogo from '../../assets/images/logo.png';
import './CareCurveIntro.css';

gsap.registerPlugin(ScrollTrigger);

const Particles = () => {
  const particlesRef = useRef([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);

    const animate = () => {
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;
        
        const particleData = newParticles[i];
        particleData.x += particleData.speedX;
        particleData.y += particleData.speedY;

        if (particleData.x < 0) particleData.x = window.innerWidth;
        if (particleData.x > window.innerWidth) particleData.x = 0;
        if (particleData.y < 0) particleData.y = window.innerHeight;
        if (particleData.y > window.innerHeight) particleData.y = 0;

        particle.style.transform = `translate(${particleData.x}px, ${particleData.y}px)`;
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

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

    const handleMouseMove = (e) => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 1,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="carecurve-intro">
      <Particles />
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
              ease: "easeInOut"
            }}
          >
            ❤️
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