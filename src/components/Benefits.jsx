import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function Benefits() {
  return (
    <section id="benefits" className="relative bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Bacteria Elimination</h2>
            <p className="text-neutral-300 mt-3 leading-relaxed">
              Watch microbial load vanish on contact. A neon-blue sterilization wave sweeps across the surface, converting red, pulsating germ clusters into a clean white flash that fades to pristine dark.
            </p>
            <ul className="mt-6 space-y-3 text-neutral-300">
              <li className="flex items-center gap-2"><Shield className="text-cyan-400" size={18}/> 99.9% pathogen reduction</li>
              <li className="flex items-center gap-2"><Shield className="text-cyan-400" size={18}/> UV + Ozone + Mist synergy</li>
              <li className="flex items-center gap-2"><Shield className="text-cyan-400" size={18}/> Fast, safe, residue‑free cycle</li>
            </ul>
          </div>
          <GermCanvas />
        </div>
      </div>
    </section>
  );
}

function GermCanvas() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-20% 0px' });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const scale = window.devicePixelRatio || 1;
    ctx.scale(scale, scale);

    const dots = [];
    const cols = Math.floor(canvas.offsetWidth / 6);
    const rows = Math.floor(canvas.offsetHeight / 6);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const jitter = Math.random() * 2;
        dots.push({ x: x * 6 + jitter, y: y * 6 + jitter, s: Math.random() * 1.2 + 0.4, state: 0 });
      }
    }

    let raf;
    let t = -100; // wave start x

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      // background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // draw dots
      for (const d of dots) {
        // state: 0=red pulsate, 1=hit (flash white), 2=gone (fade)
        let color;
        if (d.state === 0) {
          const pulse = 0.6 + Math.sin((performance.now() / 240) + d.x * 0.05 + d.y * 0.05) * 0.4;
          color = `rgba(220,38,38,${0.6 + pulse * 0.3})`;
        } else if (d.state === 1) {
          color = 'rgba(255,255,255,0.95)';
          d.state = 2; // immediately start fading next frame
        } else {
          color = 'rgba(255,255,255,0.0)';
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.s, 0, Math.PI * 2);
        ctx.fill();
      }

      // blue wave sweep
      if (started) {
        t += 10; // sweep speed
        const grad = ctx.createLinearGradient(t - 60, 0, t + 40, 0);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.5, 'rgba(34,211,238,0.35)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(t - 80, 0, 140, canvas.offsetHeight);

        for (const d of dots) {
          if (d.state === 0 && d.x < t) {
            d.state = 1; // flash white
          }
        }

        if (t > canvas.offsetWidth + 120) {
          cancelAnimationFrame(raf);
          return; // end
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
      height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const scale2 = window.devicePixelRatio || 1;
      ctx.scale(scale2, scale2);
    };

    window.addEventListener('resize', handleResize);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, [started]);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  return (
    <div ref={containerRef} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_-20px_rgba(34,211,238,0.5)]">
      <canvas ref={ref} className="w-full h-full block" />
      {/* initial dirty helmet lining close-up overlay that fades out once started */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: started ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_20%,rgba(255,255,255,0.05),rgba(0,0,0,0.6))]"
      />
    </div>
  );
}
