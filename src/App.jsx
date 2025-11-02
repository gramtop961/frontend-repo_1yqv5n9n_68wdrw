import React from 'react';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Partnership from './components/Partnership';
import Topbar from './components/Topbar';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white antialiased">
      <Topbar />
      <main className="flex flex-col">
        <Hero />
        <Benefits />
        <Partnership />
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24 bg-neutral-900/50 backdrop-blur">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Ready to bring the Future of Hygiene to your venue?</h3>
              <p className="text-neutral-300 mt-3 leading-relaxed">Deploy Shield X Syndicate machines to elevate safety, trust, and revenue. Compact footprint. Enterprise-grade telemetry. Built for stadiums, arenas, rental hubs, and smart facilities.</p>
            </div>
            <div className="flex md:justify-end">
              <a href="#partnership" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-cyan-500/90 hover:bg-cyan-400 text-neutral-950 font-semibold shadow-[0_0_40px_-10px_rgba(34,211,238,0.7)] transition-colors">Partner with Shield X</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="px-6 md:px-10 lg:px-16 py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} Shield X Syndicate — Future of Hygiene</p>
          <p className="opacity-80">Built with deep tech aesthetics · Neon blue + bright white</p>
        </div>
      </footer>
    </div>
  );
}
