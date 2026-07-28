import { useState } from 'react';
import Navbar from './components/Navbar';
import SideDrawer from './components/SideDrawer';
import Hero from './components/Hero';
import About from './components/About';
import Speakers from './components/Speakers';
import Timeline from './components/Timeline';
import Vision2026 from './components/Vision2026';
import Sponsors from './components/Sponsors';
import Stakeholders from './components/Stakeholders';
import Location from './components/Location';
import Footer from './components/Footer';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-bg overflow-x-hidden">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} isMenuOpen={menuOpen} />
      <SideDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="w-full overflow-x-hidden">
        <div style={{ marginTop: '0px' }}><Hero /></div>
        <div style={{ marginBottom: '0px' }}><About /></div>
        <div style={{ marginTop: '0px', marginBottom: '0px' }}><Vision2026 /></div>
        <div style={{ marginTop: '0px', marginBottom: '0px' }}><Speakers /></div>
        <div style={{ marginTop: '0px', marginBottom: '0px' }}><Sponsors /></div>
        <div style={{ marginTop: '0px', marginBottom: '0px' }}><Stakeholders /></div>
        <div style={{ marginTop: '0px', marginBottom: '0px' }}><Timeline /></div>
        <div style={{ marginTop: '0px', marginBottom: '0px' }}><Location /></div>
      </main>

      <Footer />
    </div>
  );
}
