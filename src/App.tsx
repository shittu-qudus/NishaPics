import {Navbar } from './app/components/Navbar';
import Hero from './app/components/Hero';
import { About } from './app/components/About';
import  {Portfolio } from './app/components/Portfolio';
import  Services  from './app/components/Services';
import  Testimonials  from './app/components/Testimonials';
import { CTA } from './app/components/CTA';
import  Contact  from './app/components/Contact';
import { Footer } from './app/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
