import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { MapPin, CalendarHeart, Heart, Volume2, VolumeX, ChevronDown } from 'lucide-react';

const ParallaxBanner = ({ className, style, imagePosition }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Move image in opposite direction to scroll for a 3D depth effect
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className={className} style={{ ...style, overflow: 'hidden', position: 'relative' }}>
      <motion.div 
        style={{ 
          y,
          position: 'absolute', top: '-30%', left: 0, right: 0, bottom: '-30%',
          backgroundImage: `url('${import.meta.env.BASE_URL}bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: imagePosition || 'center'
        }} 
      />
    </div>
  );
};

const AudioVisualizer = () => {
  return (
    <div style={{ display: 'flex', gap: '3px', height: '14px', alignItems: 'flex-end' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{ width: '3px', backgroundColor: 'var(--color-text-secondary)', borderRadius: '2px' }}
          animate={{ height: ['4px', '14px', '4px'] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Audio handling moved directly to App.jsx to ensure synchronous play on click

const Petals = () => {
  const isMobile = window.innerWidth < 768;
  const petals = Array.from({ length: isMobile ? 15 : 45 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100, 
    delay: Math.random() * 5, 
    duration: 10 + Math.random() * 15, 
    scale: 0.2 + Math.random() * 0.6,
    rotationStart: Math.random() * 360,
  }));

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 10 }}>
      {petals.map(petal => (
        <motion.div
          key={petal.id}
          style={{
            position: 'absolute',
            top: '-10%',
            left: `${petal.left}%`,
            width: '12px',
            height: '20px',
            backgroundColor: 'rgba(255, 230, 235, 0.7)',
            borderRadius: '100% 0 100% 0',
            boxShadow: '0 0 8px rgba(255, 230, 235, 0.5)',
            scale: petal.scale,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            y: ['0vh', '120vh'],
            x: [0, (Math.random() * 100 - 50)],
            rotate: [petal.rotationStart, petal.rotationStart + 360 * (Math.random() > 0.5 ? 1 : -1)]
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: petal.delay,
          }}
        />
      ))}
    </div>
  );
};

const TypewriterText = ({ text, className, style, delay = 0, duration = 2, rtl = false }) => {
  return (
    <motion.div
      className={className}
      style={{ ...style, display: 'inline-block', whiteSpace: 'nowrap' }}
      initial={{ clipPath: rtl ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0 0 0)' }}
      transition={{ duration, delay, ease: "easeInOut" }}
    >
      {text}
    </motion.div>
  );
};

const TopFlourish = () => (
  <motion.div 
    initial={{ opacity: 0, y: -10 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
    style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', width: '100%' }}
  >
    <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="rose-gold-svg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b76e79" />
          <stop offset="50%" stopColor="#c88d9b" />
          <stop offset="100%" stopColor="#b76e79" />
        </linearGradient>
      </defs>
      <path d="M60 2 C45 18, 20 18, 0 10" stroke="url(#rose-gold-svg)" strokeWidth="1.5" fill="none" />
      <path d="M60 2 C75 18, 100 18, 120 10" stroke="url(#rose-gold-svg)" strokeWidth="1.5" fill="none" />
      <circle cx="60" cy="8" r="3" fill="url(#rose-gold-svg)" />
    </svg>
  </motion.div>
);

const OrnateDivider = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.5 }} 
    animate={{ opacity: 1, scale: 1 }} 
    transition={{ delay: 2.5, duration: 1.5, ease: "easeOut" }}
    style={{ margin: '1.5rem 0 2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
  >
    <svg width="240" height="24" viewBox="0 0 240 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', height: 'auto' }}>
      {/* Left side flourish */}
      <path d="M110 12 C90 12, 80 2, 60 2 C40 2, 25 22, 5 12" stroke="url(#rose-gold-svg)" strokeWidth="1.2" fill="none" />
      <path d="M100 12 C85 12, 75 22, 60 22 C45 22, 30 2, 10 12" stroke="url(#rose-gold-svg)" strokeWidth="0.8" fill="none" opacity="0.7"/>
      {/* Right side flourish */}
      <path d="M130 12 C150 12, 160 2, 180 2 C200 2, 215 22, 235 12" stroke="url(#rose-gold-svg)" strokeWidth="1.2" fill="none" />
      <path d="M140 12 C155 12, 165 22, 180 22 C195 22, 210 2, 230 12" stroke="url(#rose-gold-svg)" strokeWidth="0.8" fill="none" opacity="0.7"/>
      {/* Center ornate diamond/flower */}
      <path d="M120 4 C124 4, 126 8, 126 12 C126 16, 124 20, 120 20 C116 20, 114 16, 114 12 C114 8, 116 4, 120 4 Z" fill="url(#rose-gold-svg)" />
      <circle cx="120" cy="12" r="2.5" fill="#fff" />
      <path d="M120 0 L122.5 6 L120 4 L117.5 6 Z" fill="url(#rose-gold-svg)" />
      <path d="M120 24 L122.5 18 L120 20 L117.5 18 Z" fill="url(#rose-gold-svg)" />
      <path d="M108 12 L114 9.5 L112 12 L114 14.5 Z" fill="url(#rose-gold-svg)" />
      <path d="M132 12 L126 9.5 L128 12 L126 14.5 Z" fill="url(#rose-gold-svg)" />
    </svg>
  </motion.div>
);

const Sparkles = () => {
  const isMobile = window.innerWidth < 768;
  const sparkles = Array.from({ length: isMobile ? 15 : 40 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100, 
    delay: Math.random() * 5, 
    duration: 5 + Math.random() * 10, 
    size: 1.5 + Math.random() * 3,
  }));

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 15 }}>
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: `${sparkle.left}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: '#FFD700',
            borderRadius: '50%',
            boxShadow: '0 0 12px 3px rgba(255, 215, 0, 0.7)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, (Math.random() * 50 - 25)],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: sparkle.delay,
          }}
        />
      ))}
    </div>
  );
};

const AmbientPulse = () => (
  <motion.div
    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    animate={{ backgroundColor: ['rgba(255, 230, 235, 0)', 'rgba(255, 230, 235, 0.25)', 'rgba(255, 230, 235, 0)'] }}
    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const GoldenThread = ({ scrollYProgress }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', height: '100dvh', width: '2px', zIndex: 1, pointerEvents: 'none' }}>
      <svg width="2" height="100%" viewBox="0 0 2 100" preserveAspectRatio="none">
         <motion.line 
           x1="1" y1="0" x2="1" y2="100" 
           stroke="#b76e79" 
           strokeWidth="2"
           vectorEffect="non-scaling-stroke"
           style={{ pathLength: scrollYProgress, opacity: scrollYProgress }} 
         />
      </svg>
    </div>
  );
};

const EntranceScreen = ({ onOpen }) => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.4, delayChildren: 0.5 } },
    exit: { 
      opacity: 0, 
      scale: 1.15,
      filter: 'blur(8px)',
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    }
  };
  
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(rawMouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    rawMouseX.set((clientX / innerWidth - 0.5) * 2);
    rawMouseY.set((clientY / innerHeight - 0.5) * 2);
  };

  useEffect(() => {
    const handleOrientation = (event) => {
      let x = event.gamma; 
      let y = event.beta;
      if (x > 30) x = 30;
      if (x < -30) x = -30;
      if (y > 30) y = 30;
      if (y < -30) y = -30;
      if (x !== null && y !== null) {
        rawMouseX.set(x / 30);
        rawMouseY.set(y / 30);
      }
    };
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const bgX = useTransform(mouseX, [-1, 1], ['-3%', '3%']);
  const bgY = useTransform(mouseY, [-1, 1], ['-3%', '3%']);
  const cardX = useTransform(mouseX, [-1, 1], ['3%', '-3%']);
  const cardY = useTransform(mouseY, [-1, 1], ['3%', '-3%']);
  
  const spotlightX = useTransform(mouseX, [-1, 1], ['40%', '60%']);
  const spotlightY = useTransform(mouseY, [-1, 1], ['40%', '60%']);
  const spotlightStyle = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, transparent 0%, rgba(0,0,0,0.45) 130%)`;

  return (
    <motion.section 
      style={{ padding: 0, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', zIndex: 100, overflow: 'hidden' }}
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        style={{
          position: 'absolute', top: '-5%', left: '-5%', width: '110%', height: '110%',
          backgroundImage: `url('${import.meta.env.BASE_URL}bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center',
          x: bgX, y: bgY
        }}
      />
      
      <motion.div 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1,
          background: spotlightStyle
        }}
      />
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Petals />
        <Sparkles />
        
        <motion.div 
          className="glass-card" 
          style={{ x: cardX, y: cardY, zIndex: 20 }}
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <TopFlourish />

          <TypewriterText 
            text="بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ" 
            className="arabic-text rose-gold-foil" 
            style={{ fontSize: 'clamp(2.5rem, 11vw, 4.8rem)', marginBottom: '0', zIndex: 2, padding: '0 5px' }} 
            delay={1.0} 
            duration={2} 
            rtl={true} 
          />
          
          <OrnateDivider />
          
          <motion.h3 
            style={{ 
              fontFamily: 'var(--font-body)', fontWeight: '400', fontSize: 'clamp(0.95rem, 4.5vw, 1.25rem)', letterSpacing: '2px', 
              color: 'var(--color-text-primary)', textAlign: 'center', 
              lineHeight: '1.6', marginTop: '0', marginBottom: '0', textTransform: 'uppercase', width: '100%'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1.5 }}
          >
            Une heureuse nouvelle<br/>vous est destinée
          </motion.h3>

          <motion.div 
            style={{ marginTop: '2rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.0, duration: 1 }}
          >
            <motion.button 
              className="btn-primary" 
              style={{ 
                padding: '1rem 3.5rem', backgroundColor: 'var(--color-text-secondary)', border: 'none', borderRadius: '50px',
                color: '#fff', boxShadow: '0 4px 15px rgba(201, 107, 125, 0.3)',
                fontFamily: 'var(--font-body)', fontWeight: '500', letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase'
              }}
              onClick={onOpen}
              whileHover={{ scale: 1.05, backgroundColor: '#b55a6a' }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 4px 15px rgba(201, 107, 125, 0.3)', '0 4px 25px rgba(201, 107, 125, 0.6)', '0 4px 15px rgba(201, 107, 125, 0.3)'] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              Ouvrir
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const ScrollIndicator = () => {
  const handleScrollDown = (e) => {
    e.stopPropagation();
    const container = document.querySelector('.fullpage-container');
    if (container) {
      container.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <motion.button 
      onClick={handleScrollDown}
      aria-label="Section suivante"
      style={{ 
        position: 'absolute',
        bottom: '1.5rem',
        left: '50%',
        x: '-50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        pointerEvents: 'auto',
        zIndex: 50,
        padding: 0
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 253, 252, 0.9)',
          boxShadow: '0 4px 15px rgba(138, 75, 86, 0.25), 0 0 1px rgba(138, 75, 86, 0.2)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <ChevronDown size={24} color="#8a4b56" strokeWidth={2.2} />
      </motion.div>
    </motion.button>
  );
};

const Hero = () => {
  return (
    <section className="snap-section" style={{ 
      backgroundImage: `url('${import.meta.env.BASE_URL}bg.jpg')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Soft overlay to ensure readability */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
        background: 'rgba(255,253,252,0.4)',
        zIndex: 0
      }} />
      
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        height: '100%', 
        minHeight: '100dvh',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        padding: '2rem',
        paddingTop: '3rem',
        paddingBottom: '2rem'
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2.5rem' }}>
        {/* Top text with frosted glass backing */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ 
            textAlign: 'center',
            maxWidth: '600px', 
            background: 'rgba(255,253,252,0.7)', 
            padding: '1.2rem 1.5rem', 
            borderRadius: '20px', 
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}
        >
          <p className="subheader-uppercase" style={{ marginBottom: '0.6rem' }}>
            Monsieur et Madame Izri
          </p>
          <p className="body-italic" style={{ marginBottom: '0.2rem' }}>
            ont l'immense plaisir de vous annoncer
          </p>
          <p className="body-italic">
            le mariage de leur fille
          </p>
        </motion.div>

        {/* Massive Center Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, delay: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <h1 className="script-heading-large rose-gold-foil">
            Celina
          </h1>
        </motion.div>

        {/* Bottom text with frosted glass backing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ 
            textAlign: 'center', 
            maxWidth: '500px', 
            background: 'rgba(255,253,252,0.7)', 
            padding: '1.2rem 1.5rem', 
            borderRadius: '20px', 
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}
        >
          <p className="body-italic">
            Votre présence en ce jour de célébration sera notre plus beau cadeau.
          </p>
        </motion.div>
        </div>
        
        <ScrollIndicator />
      </div>
    </section>
  );
};

const Countdown = () => {
  const targetDate = new Date('2026-08-29T11:00:00+01:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    Jours: 0, Heures: 0, Min: 0, Sec: 0
  });

  const downloadICS = () => {
      const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//IZRI Wedding//FR
BEGIN:VEVENT
UID:${new Date().getTime()}@izriwedding.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:20260829T100000Z
DTEND:20260829T140000Z
SUMMARY:Invitation de mariage IZRI
LOCATION:Salle des Fêtes Palais Royal, Wilaya de Tizi Ouzou, Algeria
DESCRIPTION:Faites-nous l'honneur de votre présence lors de cette merveilleuse journée.
BEGIN:VALARM
TRIGGER:-PT1D
ACTION:DISPLAY
DESCRIPTION:Rappel: Invitation de mariage IZRI demain !
END:VALARM
BEGIN:VALARM
TRIGGER:-PT2H
ACTION:DISPLAY
DESCRIPTION:Rappel: Invitation de mariage IZRI dans 2 heures !
END:VALARM
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'mariage_celina.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        Jours: Math.floor(distance / (1000 * 60 * 60 * 24)),
        Heures: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        Min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        Sec: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="snap-section" style={{ 
      backgroundImage: `url('${import.meta.env.BASE_URL}blush_floral_bg.jpg')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'relative',
      paddingTop: '3rem',
      paddingBottom: '2rem'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 253, 252, 0.6)', backdropFilter: 'blur(3px)', zIndex: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1, width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', padding: '2rem 1rem', background: 'rgba(255,253,252,0.6)', borderRadius: '30px', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', maxWidth: '95%', width: '700px' }}
      >
        <CalendarHeart size={38} strokeWidth={1} color="#8a4b56" style={{ marginBottom: '1rem' }} />
        <h2 className="subheader-uppercase">Le Grand Jour</h2>
        
        {/* Date perfectly clamped to stay on one line inside rectangle */}
        <p className="date-script-heading">
          Samedi 29 Août 2026
        </p>
        
        {/* Countdown units separated into distinct elegant rectangles */}
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginTop: '1.2rem', flexWrap: 'wrap' }}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,253,252,0.9)',
              border: '1px solid rgba(138, 75, 86, 0.2)',
              borderRadius: '12px',
              padding: '0.5rem 0.8rem',
              minWidth: '58px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)', 
                fontWeight: 500, 
                color: '#4a3b3f', 
                lineHeight: 1 
              }}>
                {String(value).padStart(2, '0')}
              </div>
              <div className="label-uppercase" style={{ fontSize: 'clamp(0.6rem, 1.8vw, 0.75rem)', marginTop: '4px', opacity: 0.85 }}>{unit}</div>
            </div>
          ))}
        </div>
        
        <motion.button 
          className="label-uppercase" 
          style={{ 
            display: 'inline-block', 
            padding: '0.8rem 2.5rem', 
            backgroundColor: 'transparent', 
            border: '1px solid rgba(74, 59, 63, 0.3)', 
            borderRadius: '50px',
            color: '#4a3b3f', 
            whiteSpace: 'nowrap',
            marginTop: '1.8rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={downloadICS}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(74, 59, 63, 0.02)', borderColor: '#4a3b3f' }}
          whileTap={{ scale: 0.98 }}
        >
          Ajouter au calendrier
        </motion.button>
      </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  );
};

const Venue = () => {
  return (
    <section className="snap-section" style={{ backgroundColor: 'var(--color-bg-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 1.5rem 4rem 1.5rem', position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ 
          textAlign: 'center', 
          maxWidth: '600px',
          width: '100%',
          padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.2rem, 3vw, 2rem)',
          border: '1px solid rgba(138, 75, 86, 0.2)',
          position: 'relative',
          backgroundColor: '#fffdfc'
        }}
      >
        {/* Decorative corner brackets */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '25px', height: '25px', borderTop: '1px solid #8a4b56', borderLeft: '1px solid #8a4b56', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '25px', height: '25px', borderTop: '1px solid #8a4b56', borderRight: '1px solid #8a4b56', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '25px', height: '25px', borderBottom: '1px solid #8a4b56', borderLeft: '1px solid #8a4b56', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '25px', height: '25px', borderBottom: '1px solid #8a4b56', borderRight: '1px solid #8a4b56', opacity: 0.5 }}></div>

        <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(138, 75, 86, 0.03)', marginBottom: '0.6rem' }}>
          <MapPin size={24} strokeWidth={1.2} color="#8a4b56" />
        </div>
        
        <h2 className="script-heading">Rendez-vous à</h2>
        
        <h3 className="subheader-uppercase" style={{ margin: '0.6rem 0' }}>Salle des Fêtes<br/>Palais Royal</h3>
        
        <OrnateDivider />
        
        <p className="label-uppercase" style={{ margin: '0.6rem 0' }}>Wilaya de Tizi Ouzou</p>
        
        <p className="body-italic" style={{ margin: '1rem 0' }}>Nous aurons le bonheur de vous y<br/>accueillir à partir de 11h.</p>
        
        <motion.a 
          href="https://www.google.com/maps/search/?api=1&query=P4H4%2BPCR%2C%20Tizi%20Ouzou%2C%20Algeria" 
          target="_blank" 
          rel="noopener noreferrer"
          className="label-uppercase"
          style={{ 
            display: 'inline-block', padding: '0.8rem 2.5rem', backgroundColor: 'transparent', border: '1px solid rgba(74, 59, 63, 0.3)', borderRadius: '50px',
            color: '#4a3b3f', textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(74, 59, 63, 0.02)', borderColor: '#4a3b3f' }}
          whileTap={{ scale: 0.98 }}
        >
          Voir sur la Carte
        </motion.a>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
};

const Footer = () => {
  return (
    <section className="snap-section" style={{ 
      backgroundImage: `url('${import.meta.env.BASE_URL}blush_floral_bg.jpg')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem 1.5rem'
    }}>
      {/* Soft Frosted Glass Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 253, 252, 0.65)', backdropFilter: 'blur(3px)', zIndex: 0 }} />

      {/* Subtle Background Watermark Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.04 }}
        transition={{ duration: 2 }}
        className="arabic-text" 
        style={{ position: 'absolute', fontSize: '22vw', color: '#4a3b3f', whiteSpace: 'nowrap', zIndex: 0, pointerEvents: 'none' }}
      >
        بارك الله لكما وجمع بينكما في خير
      </motion.p>
      
      {/* Frosted Glass Frame Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        style={{ 
          zIndex: 1, 
          textAlign: 'center', 
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)',
          background: 'rgba(255,253,252,0.7)',
          borderRadius: '30px',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          border: '1px solid rgba(138, 75, 86, 0.2)',
          maxWidth: '95%',
          width: '600px',
          position: 'relative'
        }}
      >
        {/* Decorative Corner Brackets */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', width: '25px', height: '25px', borderTop: '1px solid #8a4b56', borderLeft: '1px solid #8a4b56', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', top: '12px', right: '12px', width: '25px', height: '25px', borderTop: '1px solid #8a4b56', borderRight: '1px solid #8a4b56', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '25px', height: '25px', borderBottom: '1px solid #8a4b56', borderLeft: '1px solid #8a4b56', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '25px', height: '25px', borderBottom: '1px solid #8a4b56', borderRight: '1px solid #8a4b56', opacity: 0.5 }}></div>

        {/* Monogram / Emblem Badge */}
        <div style={{ 
          display: 'inline-flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(138, 75, 86, 0.05)', 
          border: '1px solid rgba(138, 75, 86, 0.2)',
          marginBottom: '1rem',
          boxShadow: '0 4px 15px rgba(138, 75, 86, 0.1)'
        }}>
          <Heart size={26} strokeWidth={1.2} color="#8a4b56" fill="rgba(138, 75, 86, 0.15)" />
        </div>

        <p className="arabic-text" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', color: '#8a4b56', marginBottom: '1.2rem' }}>
          بارك الله لكما وجمع بينكما في خير
        </p>

        <OrnateDivider />

        <p className="script-heading" style={{ marginTop: '1.2rem', marginBottom: '0.4rem' }}>
          Avec toute notre affection
        </p>

        <p className="subheader-uppercase" style={{ letterSpacing: '4px', marginTop: '0.8rem' }}>
          La Famille Izri
        </p>
      </motion.div>
    </section>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollYProgress } = useScroll();

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.log("Autoplay prevented:", e);
      });
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  return (
    <main style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <audio ref={audioRef} loop src="https://kad-jemputan-kahwin.vercel.app/music/Beautiful%20in%20White%20x%20Canon%20in%20D%20(Piano%20Cover%20by%20Riyandi%20Kusuma).mp3" />
      <motion.button
        onClick={toggleAudio}
        className="fab-audio"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8, type: 'spring' }}
      >
        {isPlaying ? <AudioVisualizer /> : <VolumeX size={18} />}
      </motion.button>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <EntranceScreen key="entrance" onOpen={handleOpen} />
        ) : (
          <motion.div
            key="content"
            className="fullpage-container"
            initial={{ opacity: 0, scale: 1.12, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <AmbientPulse />
            <Hero />
            <Countdown />
            <Venue />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
