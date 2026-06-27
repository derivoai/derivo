import { motion } from 'motion/react';

const technologies = [
  { name: 'Node.js', type: 'Runtime' },
  { name: 'Docker', type: 'Containers' },
  { name: 'PostgreSQL', type: 'Database' },
  { name: 'Redis', type: 'Cache' },
  { name: 'Next.js', type: 'Framework' },
  { name: 'NestJS', type: 'Backend' },
  { name: 'Express', type: 'Server' },
  { name: 'React', type: 'Frontend' },
  { name: 'pnpm', type: 'Package Manager' },
  { name: 'Bun', type: 'Runtime' }
];

export function TrustedBy() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 mt-32 md:mt-44 relative z-10 text-left">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 border-t border-white/[0.06] pt-16">
        <div className="md:w-1/3">
          <span className="text-[11px] font-mono tracking-widest text-white/30 uppercase">Ecosystem</span>
          <h2 className="text-3xl font-bold text-white tracking-tight mt-3">Works with your favorite tech stack.</h2>
          <p className="mt-4 text-sm text-white/50 leading-relaxed font-light">
            Derivo reads your existing stack configuration files, automatically provisions local dependencies, and ensures your environment stays aligned with production. No code changes required.
          </p>
        </div>

        <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {technologies.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15, scale: 0.95, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              whileHover={{ y: -3, scale: 1.05, rotateX: -5, rotateY: 5 }}
              viewport={{ once: true }}
              style={{ transformPerspective: 1000 }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between p-4 rounded-xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_10px_20px_-10px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="relative z-10 text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                {tech.name}
              </span>
              <span className="relative z-10 text-[10px] font-mono text-white/30 mt-4 uppercase tracking-wider">
                {tech.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
