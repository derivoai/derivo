import { motion } from 'motion/react';

const problems = [
  {
    question: "Wrong Node version?",
    answer: "We'll fix it.",
    details: "Automatically match local node environments with your .nvmrc or package.json requirements on shell entry."
  },
  {
    question: "Redis isn't running?",
    answer: "We'll tell you exactly why.",
    details: "Identify missing container binaries, network issues, or configuration conflicts, then launch it in the background."
  },
  {
    question: "Port already in use?",
    answer: "We'll find the blocking process.",
    details: "Find the stale Node or Docker process occupying port 3000, and free it in a single click."
  },
  {
    question: "Missing .env configs?",
    answer: "Generate it instantly.",
    details: "Populate missing local variables using team-approved templates and secure placeholder definitions."
  },
  {
    question: "Docker daemon down?",
    answer: "We'll boot it backgrounded.",
    details: "Detect inactive engines, safely initialize the service, and handle container status gracefully."
  },
  {
    question: "Stale database schema?",
    answer: "Sync and seed in one run.",
    details: "Run safe isolated migrations and seed mock records so your local database perfectly matches main branch schemas."
  }
];

export function Features() {
  return (
    <section id="features" className="w-full max-w-5xl mx-auto px-6 mt-40 relative z-10 text-left">
      <div className="max-w-2xl mb-20">
        <span className="text-[11px] font-mono tracking-widest text-white/30 uppercase">Interactive Diagnostics</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-3">We don’t just report errors. We fix them.</h2>
        <p className="mt-4 text-base text-white/50 leading-relaxed font-light">
          Derivo constantly monitors your local development space, resolving everyday alignment friction before you can even open your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((prob, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, scale: 0.95, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            whileHover={{ y: -5, scale: 1.02, rotateX: -2, rotateY: 2 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1000 }}
            className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-md border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 flex flex-col justify-between min-h-[220px] overflow-hidden"
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest block mb-4">
                Scenario 0{idx + 1}
              </span>
              <h3 className="text-lg font-medium text-white group-hover:text-white/90 transition-colors">
                {prob.question}
              </h3>
              <p className="text-base text-[#34d399] font-medium mt-1">
                {prob.answer}
              </p>
            </div>
            
            <p className="relative z-10 text-sm text-white/40 leading-relaxed mt-6 font-light group-hover:text-white/60 transition-colors">
              {prob.details}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
