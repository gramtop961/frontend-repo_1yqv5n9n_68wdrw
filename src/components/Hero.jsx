import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  // Rotate the 3D object as user scrolls through the hero section
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0.3]);
  const schematicOpacity = useTransform(scrollYProgress, [0.55, 0.75, 0.9], [0, 1, 0]);

  return (
    <section id="hero" ref={sectionRef} className="relative h-[130vh] md:h-[160vh] w-full overflow-clip bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900">
      <div className="absolute inset-0">
        <motion.div style={{ rotateZ: rotate }} className="h-full w-full">
          <Spline scene="https://prod.spline.design/DtQLjBkD1UpownGS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </motion.div>
      </div>

      {/* Subtle neon gradient glow overlay that does not block the 3D scene */}
      <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(34,211,238,0.20),transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 lg:px-16 pt-24 md:pt-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Future of Hygiene
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">Shield X Syndicate</span>
          </h1>
          <p className="mt-4 md:mt-6 text-neutral-300 text-base md:text-lg leading-relaxed">
            Helmet sanitization vending machines with UV, ozone, and mist sterilization. Sleek. Fast. Reliably clean.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#benefits" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-cyan-500/90 hover:bg-cyan-400 text-neutral-950 font-semibold shadow-[0_0_40px_-10px_rgba(34,211,238,0.7)] transition-colors">
              Explore Tech
            </a>
            <a href="#partnership" className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/20 hover:border-white/40 text-white/90 hover:text-white transition-colors">
              Become a Partner
            </a>
          </div>
        </div>
      </div>

      {/* Disassembly to schematic: labels and animated lines appear mid-scroll, then snap back */}
      <motion.div style={{ opacity: schematicOpacity }} className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative size-[86%] max-w-[1100px]">
          {/* UV Chamber */}
          <SchematicLabel label="UV Chamber" color="cyan" position="top-left" />
          {/* Mist Nozzle */}
          <SchematicLabel label="Mist Nozzle" color="white" position="bottom-left" />
          {/* Ozone Chamber */}
          <SchematicLabel label="Ozone Chamber" color="cyan" position="right" />
          {/* Animated split lines */}
          <div className="absolute inset-0">
            <SchematicSplit delay={0} />
            <SchematicSplit delay={0.08} />
            <SchematicSplit delay={0.16} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SchematicSplit({ delay = 0 }) {
  return (
    <>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/4 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: delay + 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-white to-transparent"
      />
    </>
  );
}

function SchematicLabel({ label, color = 'cyan', position = 'top-left' }) {
  const colorClasses = color === 'cyan' ? 'bg-cyan-400 text-neutral-900' : 'bg-white text-neutral-900';
  const pos = {
    'top-left': 'top-6 left-6',
    'bottom-left': 'bottom-6 left-8',
    right: 'top-1/2 right-6 -translate-y-1/2',
  }[position];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`absolute ${pos}`}
    >
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colorClasses} shadow`}> 
        <span className="size-2 rounded-full bg-neutral-900/60" />
        <span className="text-xs font-bold tracking-wide uppercase">{label}</span>
      </div>
    </motion.div>
  );
}
