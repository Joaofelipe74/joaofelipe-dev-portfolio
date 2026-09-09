import { useState } from 'react';
import Loader from './components/ui/Loader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import CustomCursor from './components/layout/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Technologies from './sections/Technologies';
import Projects from './sections/Projects';
import Process from './sections/Process';
import CTAFinal from './sections/CTAFinal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <a href="#inicio" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {isLoading && <Loader onFinish={() => setIsLoading(false)} />}

      <CustomCursor />
      <Navbar />

      <main id="conteudo-principal">
        <Hero />
        <About />
        <Services />
        <Technologies />
        <Projects />
        <Process />
        <CTAFinal />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
