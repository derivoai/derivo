import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Logo } from './Logo';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1000px] px-4"
    >
      <div
        className={cn(
          "flex items-center justify-between px-5 py-2.5 mx-auto rounded-full transition-all duration-500",
          isScrolled 
            ? "bg-[#111111]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-[#111111]/40 backdrop-blur-md border border-white/5"
        )}
      >
        <Link to="/" className="flex items-center gap-3 pl-2 group">
          <Logo className="w-6 h-6 text-white group-hover:scale-105 transition-transform" />
          <span className="font-medium text-white tracking-tight">Derivo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'How it works', 'Pricing', 'Docs', 'Blog'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-[13px] font-medium text-white/50 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:block text-[13px] font-medium text-white/50 hover:text-white transition-colors px-3">
            Sign in
          </Link>
          <Link to="/register" className="px-5 py-2 rounded-full bg-white/[0.08] border border-white/[0.08] text-white text-[13px] font-medium hover:bg-white/[0.15] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] block">
            Get Started
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
