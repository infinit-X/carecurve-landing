import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './ProblemStatement.css';

// Import Videos
import videoRain from '../../assets/videos/rain-lightning.mp4';
import videoAccess from '../../assets/videos/accessibility-bg.mp4';
import videoIncomplete from '../../assets/videos/incomplete-bg.mp4';

// Placeholder Icon Component
const PlaceholderIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const ProblemStatement = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardContainerRef = useRef(null);
  const backgroundVideoRef = useRef(null);
  const cursorRef = useRef(null);

  // Refs for each card
  const cardRefs = useRef([]);

  const problems = [
    { id: 1, title: 'Misplaced / Damaged', description: "The physical records are easily misplaced during moves, damaged by humidity, or simply wear out, erasing irreplaceable health history.", icon: 'icon-damage', video: videoRain },
    { id: 2, title: 'Limited Accessibility', description: "Accessing records quickly in emergencies or across different clinics becomes a significant challenge.", icon: 'icon-access', video: videoAccess },
    { id: 3, title: 'Incomplete Information', description: "Manual entries are prone to errors or illegibility. Healthcare providers face delays when crucial data isn't readily available.", icon: 'icon-incomplete', video: videoIncomplete },
  ];

  // Function to set refs for cards
  const setCardRef = (el, index) => {
    cardRefs.current[index] = el;
  };

  useLayoutEffect(() => {
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
    }

    const ctx = gsap.context(() => {
      // Heading Animation with ScrollTrigger
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', // Start when the top of the section is 80% from the top of the viewport
          toggleActions: 'play none none reverse', // Play on enter, reverse on leave
        },
      });

      const headingText = "Addressing a critical problem";

      // Cursor blink animation
      const blinkTl = gsap.timeline({ repeat: -1, delay: 0.1 });
      blinkTl.to(cursorRef.current, { opacity: 0, duration: 0.5, immediateRender: true })
             .to(cursorRef.current, { opacity: 1, duration: 0.5 });

      // Typing animation for the heading
      headingTl.to(titleRef.current, {
        duration: headingText.length * 0.06,
        text: { value: headingText },
        ease: "none",
        onComplete: () => {
          gsap.delayedCall(1, () => {
            blinkTl.kill();
            gsap.to(cursorRef.current, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                gsap.set(cursorRef.current, { display: 'none' });
              }
            });
          });
        }
      });

      // Subtitle animation
      headingTl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power1.out',
        delay: 0.5
      }, ">");

      // Card Animation Timeline
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000',
          scrub: 1,
          pin: true,
        },
      });

      // Initially hide all cards
      cardRefs.current.forEach((card) => {
        gsap.set(card, { opacity: 0, x: -200 });
      });

      // Animate cards in sequence with labels for video timing
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        // Label when card starts fading in
        cardTl.addLabel(`card${index}_fadeInStart`, cardTl.recent() ? cardTl.recent().endTime() : 0);

        // Fade in from left
        cardTl.to(card, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
        });

        // Label when card is fully visible
        cardTl.addLabel(`card${index}_start`, cardTl.recent().endTime());

        // Delay (fully visible period)
        cardTl.to({}, { duration: 1 });

        // Label when card starts fading out
        cardTl.addLabel(`card${index}_end`, cardTl.recent().endTime());

        // Fade out to right
        cardTl.to(card, {
          opacity: 0,
          x: 200,
          duration: 1,
          ease: 'power2.in',
        }, "+=0.5");
      });

      // Video change triggers using fade-in start label
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const videoSrc = problems[index].video;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => cardTl.scrollTrigger.labelToScroll(`card${index}_fadeInStart`),
          end: () => cardTl.scrollTrigger.labelToScroll(`card${index}_end`),
          onEnter: () => {
            if (backgroundVideoRef.current) {
              gsap.to(backgroundVideoRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                  backgroundVideoRef.current.src = videoSrc;
                  backgroundVideoRef.current.play();
                  gsap.to(backgroundVideoRef.current, { opacity: 1, duration: 0.5 });
                },
              });
            }
          },
          onEnterBack: () => {
            if (backgroundVideoRef.current) {
              gsap.to(backgroundVideoRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                  backgroundVideoRef.current.src = videoSrc;
                  backgroundVideoRef.current.play();
                  gsap.to(backgroundVideoRef.current, { opacity: 1, duration: 0.5 });
                },
              });
            }
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="problem-section" ref={sectionRef} className="problem-section new-layout">
      <div className="problem-video-background">
        <video ref={backgroundVideoRef} loop muted playsInline>
          {/* Source will be set dynamically */}
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="problem-container">
        <h2 className="problem-title">
          <span ref={titleRef}></span>
          <span ref={cursorRef} className="typing-cursor">|</span>
        </h2>

        <p ref={subtitleRef} className="problem-intro-text initial-hidden">
          Sri Lanka's essential Child Growth and Development Record, while vital, is often a fragile paper booklet.
        </p>

        <div ref={cardContainerRef} className="problem-cards-area">
          {problems.map((problem, index) => (
            <div
              key={problem.id}
              ref={(el) => setCardRef(el, index)}
              className="problem-card"
            >
              <div className="problem-card-icon">
                <PlaceholderIcon />
              </div>
              <h3 className="problem-card-title">{problem.title}</h3>
              <p className="problem-card-description">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;