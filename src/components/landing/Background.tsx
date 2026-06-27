import { Logo } from './Logo';

export function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Heavy Blur Ambient Background - Monochrome */}
      <div className="absolute top-[5%] left-[-10%] w-[60%] h-[30%] bg-white/[0.02] blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[40%] bg-white/[0.02] blur-[150px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[25%] left-[5%] w-[40%] h-[30%] bg-white/[0.02] blur-[150px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[5%] right-[-5%] w-[50%] h-[30%] bg-white/[0.02] blur-[120px] rounded-full mix-blend-screen" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)'
        }}
      />

      {/* Abstract 3D-like Shapes (Soft Glassmorphism) */}
      
      {/* Large Soft Sphere Top Left */}
      <div className="absolute top-[10%] -left-[10%] md:-left-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-3xl border border-white/[0.04] shadow-[inset_0_0_80px_rgba(255,255,255,0.01)]" />
      
      {/* Orbital Ring Top Left */}
      <div className="absolute top-[5%] -left-[5%] md:-left-[10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-white/[0.02] rotate-[30deg]" />

      {/* Small Floating Orb Top */}
      <div className="absolute top-[25%] left-[25%] md:left-[20%] w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-white/[0.06] to-transparent backdrop-blur-md border border-white/[0.06] shadow-[0_0_30px_rgba(255,255,255,0.03)]" />

      {/* Right Geometric Accent Top */}
      <div className="absolute top-[15%] right-[-5%] md:right-[5%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rotate-12 bg-gradient-to-bl from-white/[0.02] to-transparent backdrop-blur-2xl border border-white/[0.05] rounded-[4rem] shadow-[inset_0_0_60px_rgba(255,255,255,0.02)] flex items-center justify-center">
         <Logo className="w-12 h-12 md:w-16 md:h-16 text-white/10 -rotate-12" />
      </div>

      {/* Large Soft Sphere Bottom Right */}
      <div className="absolute bottom-[10%] right-[-10%] md:right-[-5%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-tl from-white/[0.02] to-transparent backdrop-blur-3xl border border-white/[0.03] shadow-[inset_0_0_80px_rgba(255,255,255,0.01)]" />

      {/* Floating Accent Bottom Left */}
      <div className="absolute bottom-[20%] left-[-5%] md:left-[5%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] -rotate-12 bg-gradient-to-tr from-white/[0.02] to-transparent backdrop-blur-2xl border border-white/[0.04] rounded-[3rem] shadow-[inset_0_0_60px_rgba(255,255,255,0.02)]" />

      {/* Center Top Light Burst */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-white/[0.03] via-transparent to-transparent blur-[100px]" />

      {/* Subtle fine horizontal border line cutting the header space */}
      <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}
