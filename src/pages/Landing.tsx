import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { TrustedBy } from '../components/landing/TrustedBy';
import { CLIDemo } from '../components/landing/CLIDemo';
import { DeveloperWorkflow } from '../components/landing/DeveloperWorkflow';
import { Features } from '../components/landing/Features';
import { PricingPreview } from '../components/landing/PricingPreview';
import { FAQ } from '../components/landing/FAQ';
import { CTA } from '../components/landing/CTA';
import { Footer } from '../components/landing/Footer';
import { Background } from '../components/landing/Background';

export function Landing() {
  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden font-sans text-white selection:bg-white/20">
      <Background />
      
      <Navbar />
      
      <main className="relative z-10 pt-20 pb-24 flex flex-col items-center">
        <Hero />
        <CLIDemo />
        <TrustedBy />
        <Features />
        <DeveloperWorkflow />
        <PricingPreview />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
