import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/70 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Shield className="text-cyan-400" size={18} />
          </div>
          <span className="font-semibold tracking-wide">Shield X Syndicate</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          <a href="#hero" className="hover:text-white transition-colors">Overview</a>
          <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
          <a href="#partnership" className="hover:text-white transition-colors">Partnership</a>
        </nav>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white text-neutral-950 text-sm font-semibold shadow hover:shadow-lg transition">
          <Sparkles size={16} /> Live Demo
        </button>
      </div>
    </header>
  );
}
