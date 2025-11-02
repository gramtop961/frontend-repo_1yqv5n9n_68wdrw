import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp } from 'lucide-react';

export default function Partnership() {
  return (
    <section id="partnership" className="relative bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Partner Network & Growth</h2>
            <p className="text-neutral-300 mt-3 leading-relaxed">
              Hover over the live map to see current and planned locations across India. Real-time telemetry powers revenue insights with an exponential growth curve as deployments scale.
            </p>
            <ul className="mt-6 space-y-3 text-neutral-300">
              <li className="flex items-center gap-2"><MapPin className="text-cyan-400" size={18}/> National coverage: stadiums, rental hubs, smart campuses</li>
              <li className="flex items-center gap-2"><TrendingUp className="text-cyan-400" size={18}/> Rapid ROI through usage-based monetization</li>
            </ul>
          </div>
          <Dashboard />
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  const [hovered, setHovered] = useState(false);
  const [value, setValue] = useState(0);
  const targetValue = 1000000; // ₹10L+

  useEffect(() => {
    if (!hovered) return;
    const start = performance.now();
    const duration = 1200;
    const startVal = value;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.floor(startVal + (targetValue - startVal) * eased);
      setValue(v);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      className="relative w-full rounded-2xl border border-white/10 overflow-hidden bg-neutral-900/40"
    >
      <div className="grid md:grid-cols-5 gap-0">
        <div className="md:col-span-3 relative p-6">
          <IndiaMap active={hovered} />
        </div>
        <div className="md:col-span-2 p-6 flex flex-col gap-6">
          <div>
            <p className="text-sm text-neutral-400">Projected Monthly Revenue</p>
            <div className="text-3xl font-extrabold tracking-tight mt-1">
              ₹{formatIndianNumber(value)}<span className="text-cyan-400 text-xl align-super">+</span>
            </div>
          </div>
          <GrowthChart active={hovered} />
        </div>
      </div>
    </div>
  );
}

function IndiaMap({ active }) {
  // approximate major metro coordinates (normalized 0..1) for dot placement
  const points = useMemo(
    () => [
      { x: 0.46, y: 0.18 }, // Delhi
      { x: 0.29, y: 0.62 }, // Mumbai
      { x: 0.66, y: 0.60 }, // Kolkata
      { x: 0.37, y: 0.71 }, // Pune
      { x: 0.41, y: 0.78 }, // Bengaluru
      { x: 0.43, y: 0.72 }, // Hyderabad
      { x: 0.51, y: 0.32 }, // Jaipur
      { x: 0.56, y: 0.55 }, // Patna
      { x: 0.38, y: 0.58 }, // Ahmedabad
      { x: 0.47, y: 0.50 }, // Bhopal
      { x: 0.59, y: 0.68 }, // Bhubaneswar
      { x: 0.35, y: 0.84 }, // Kochi
    ],
    []
  );

  return (
    <div className="relative aspect-[4/3] rounded-xl bg-neutral-950 border border-white/10 overflow-hidden">
      <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full">
        {/* India silhouette (stylized path) */}
        <defs>
          <radialGradient id="g" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.0)" />
          </radialGradient>
        </defs>
        <path
          d="M241 60l18 22 20 10 2 24 16 18-16 26 28 20 12 20-22 10-8 18 20 18-6 22-24 8-12 22-14 10-18 2-16 14-18 0-12-16-26-4-10-20 10-22-12-16 0-18 14-14 2-24 12-18 18-12 8-22 18-10 16-18z"
          fill="#0b1220"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
      </svg>
      {/* Glow dots */}
      {points.map((p, i) => (
        <Dot key={i} x={p.x} y={p.y} index={i} active={active} />
      ))}
      {/* hover hint */}
      <div className="absolute bottom-3 right-3 text-[11px] text-neutral-400/80">Hover to light up deployment map</div>
    </div>
  );
}

function Dot({ x, y, index, active }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0 }}
      animate={active ? { opacity: [0, 1, 0.6, 1], scale: [0, 1.2, 0.9, 1.05] } : { opacity: 0.2, scale: 0.8 }}
      transition={{ duration: 0.9, delay: index * 0.05, repeat: active ? Infinity : 0, repeatType: 'mirror' }}
      className="absolute size-3 rounded-full bg-cyan-400/90 shadow-[0_0_18px_4px_rgba(34,211,238,0.65)]"
      style={{ left: `calc(${x * 100}% - 6px)`, top: `calc(${y * 100}% - 6px)` }}
    />
  );
}

function GrowthChart({ active }) {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = active ? `${len}` : '0';
    if (active) {
      requestAnimationFrame(() => {
        path.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)';
        path.style.strokeDashoffset = '0';
      });
    }
  }, [active]);

  return (
    <div className="relative h-40 w-full rounded-lg bg-neutral-950 border border-white/10 overflow-hidden">
      <svg viewBox="0 0 300 120" className="w-full h-full">
        <defs>
          <linearGradient id="l" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.6)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.0)" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M10 110 C 40 100, 60 90, 80 80 C 110 60, 140 40, 170 30 C 200 20, 230 18, 290 14"
          fill="none"
          stroke="url(#l)"
          strokeWidth="3"
        />
      </svg>
      <div className="absolute bottom-2 left-2 text-[11px] text-neutral-400/80">Revenue trend</div>
    </div>
  );
}

function formatIndianNumber(num) {
  // Indian numbering format (e.g., 1000000 => 10,00,000)
  const s = num.toString();
  const lastThree = s.slice(-3);
  const other = s.slice(0, -3);
  return other ? other.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree : lastThree;
}
