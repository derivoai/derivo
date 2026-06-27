import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Logo } from './Logo';

interface TerminalLine {
  type: 'input' | 'spinner' | 'info' | 'success' | 'warning' | 'error';
  text: string;
  meta?: string;
}

export function CLIDemo() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!isPlaying) return;

    let timeoutId: NodeJS.Timeout;
    const terminalScript: { delay: number; action: () => void }[] = [
      {
        delay: 0,
        action: () => setLines([{ type: 'input', text: 'derivo setup' }])
      },
      {
        delay: 1000,
        action: () => setLines(prev => [...prev, { type: 'spinner', text: 'Checking Node.js version...' }])
      },
      {
        delay: 2200,
        action: () => setLines(prev => {
          const next = prev.filter(l => !l.text.includes('Checking Node.js'));
          return [...next, { type: 'error', text: 'Wrong Node.js version detected: v16.14.0 (v22.0.0+ required)' }];
        })
      },
      {
        delay: 3500,
        action: () => setLines(prev => [...prev, { type: 'spinner', text: 'Installing Node.js v22.3.0 via nvm...' }])
      },
      {
        delay: 5500,
        action: () => {
          setLines(prev => {
            const next = prev.filter(l => !l.text.includes('Installing Node.js'));
            return [...next, { type: 'success', text: 'Node.js updated to v22.3.0', meta: 'nvm' }];
          });
          setProgress(25);
        }
      },
      {
        delay: 6500,
        action: () => setLines(prev => [...prev, { type: 'spinner', text: 'Verifying Docker engine daemon...' }])
      },
      {
        delay: 7800,
        action: () => setLines(prev => {
          const next = prev.filter(l => !l.text.includes('Verifying Docker'));
          return [...next, { type: 'warning', text: 'Docker engine is currently stopped.' }];
        })
      },
      {
        delay: 9000,
        action: () => setLines(prev => [...prev, { type: 'spinner', text: 'Booting Docker background service...' }])
      },
      {
        delay: 11000,
        action: () => {
          setLines(prev => {
            const next = prev.filter(l => !l.text.includes('Booting Docker'));
            return [...next, { type: 'success', text: 'Docker engine active and ready', meta: 'daemon' }];
          });
          setProgress(60);
        }
      },
      {
        delay: 12000,
        action: () => setLines(prev => [...prev, { type: 'spinner', text: 'Checking Redis service...' }])
      },
      {
        delay: 13200,
        action: () => setLines(prev => {
          const next = prev.filter(l => !l.text.includes('Checking Redis'));
          return [...next, { type: 'warning', text: 'Redis container not responding on port 6379.' }];
        })
      },
      {
        delay: 14500,
        action: () => setLines(prev => [...prev, { type: 'spinner', text: 'Provisioning Redis container via docker-compose...' }])
      },
      {
        delay: 17000,
        action: () => {
          setLines(prev => {
            const next = prev.filter(l => !l.text.includes('Provisioning Redis'));
            return [...next, { type: 'success', text: 'Redis active and bounded to port 6379', meta: 'docker' }];
          });
          setProgress(90);
        }
      },
      {
        delay: 18000,
        action: () => setLines(prev => [...prev, { type: 'spinner', text: 'Validating project environment and schemas...' }])
      },
      {
        delay: 19500,
        action: () => {
          setLines(prev => {
            const next = prev.filter(l => !l.text.includes('Validating project'));
            return [...next, { type: 'success', text: 'All local environments successfully verified.', meta: 'derivo.json' }];
          });
          setProgress(100);
        }
      },
      {
        delay: 20500,
        action: () => setLines(prev => [...prev, { type: 'info', text: 'Ready. Happy coding!' }])
      },
      {
        delay: 25000,
        action: () => {
          setLines([]);
          setProgress(0);
        }
      }
    ];

    const timeouts = terminalScript.map(step => {
      return setTimeout(step.action, step.delay);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isPlaying, lines.length === 0]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale, y, rotateX, transformPerspective: 1000 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto px-6 mt-12 md:mt-20 relative z-10"
    >
      {/* Visual signature glow background */}
      <div className="absolute -inset-10 bg-gradient-to-b from-white/[0.03] to-transparent blur-3xl opacity-50 rounded-[4rem] pointer-events-none" />

      <div className="relative rounded-2xl bg-[#030303]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_40px_120px_-20px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden flex flex-col h-[480px] md:h-[520px]">
        {/* Terminal Top Window Bar */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#0c0c0c]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/[0.12]" />
            <div className="w-3 h-3 rounded-full bg-white/[0.12]" />
            <div className="w-3 h-3 rounded-full bg-white/[0.12]" />
          </div>
          <div className="text-[11px] font-mono tracking-widest text-white/30 flex items-center gap-2 uppercase">
            <Logo className="w-3.5 h-3.5 text-white/40" />
            derivo terminal
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-[10px] font-mono text-white/30 hover:text-white/80 transition-colors border border-white/10 rounded px-2 py-0.5 bg-white/[0.02]"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="flex-1 overflow-hidden p-8 md:p-10 font-mono text-xs md:text-sm text-white/70 flex flex-col gap-4 bg-gradient-to-b from-[#080808] to-[#040404] select-text">
          <AnimatePresence mode="popLayout">
            {lines.map((line, idx) => {
              if (line.type === 'input') {
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 text-white font-medium"
                  >
                    <span className="text-white/40 select-none">&gt;</span>
                    <span>{line.text}</span>
                    <span className="w-1.5 h-4 bg-white/80 inline-block animate-[pulse_1s_infinite] select-none" />
                  </motion.div>
                );
              }

              if (line.type === 'spinner') {
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 text-white/50"
                  >
                    <span className="inline-block animate-spin text-white/40">⠋</span>
                    <span>{line.text}</span>
                  </motion.div>
                );
              }

              if (line.type === 'error') {
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 text-rose-400 bg-rose-500/[0.03] border border-rose-500/10 p-3 rounded-lg"
                  >
                    <span className="text-rose-400 select-none font-bold">✗</span>
                    <span className="flex-1">{line.text}</span>
                  </motion.div>
                );
              }

              if (line.type === 'warning') {
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 text-amber-400 bg-amber-500/[0.02] border border-amber-500/10 p-3 rounded-lg"
                  >
                    <span className="text-amber-400 select-none">!</span>
                    <span className="flex-1">{line.text}</span>
                  </motion.div>
                );
              }

              if (line.type === 'success') {
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between text-emerald-400 bg-emerald-500/[0.02] border border-emerald-500/10 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#34d399] select-none font-bold">✓</span>
                      <span>{line.text}</span>
                    </div>
                    {line.meta && (
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">{line.meta}</span>
                    )}
                  </motion.div>
                );
              }

              if (line.type === 'info') {
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 text-white font-semibold border-t border-white/[0.06] pt-6 mt-4"
                  >
                    <span className="text-[#34d399] text-base">●</span>
                    <span className="tracking-tight">{line.text}</span>
                  </motion.div>
                );
              }

              return null;
            })}
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="shrink-0 border-t border-white/[0.06] px-8 py-5 bg-[#080808] flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex justify-between text-[11px] font-mono text-white/40 uppercase tracking-wider">
              <span>Environment Readiness</span>
              <span className="w-10 text-right">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
              <div 
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-white/40 to-white/90 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(255,255,255,0.3)]"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
