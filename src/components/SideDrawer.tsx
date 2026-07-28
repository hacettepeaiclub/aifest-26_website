import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, Users, Award, Handshake, Calendar, Archive, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Ana Sayfa', href: '#hero' },
  { icon: Info, label: 'AI Fest Nedir?', href: '#hakkinda' },
  { icon: Users, label: 'Konuşmacılar', href: '#konusmacilar' },
  { icon: Award, label: 'Sponsorlar', href: '#sponsorlar' },
  { icon: Handshake, label: 'Paydaşlar', href: '#paydaslar' },
  { icon: Calendar, label: "AI Fest Yolculuğu", href: '#tarihce' },
];

const archiveItems = [
  { label: "AI Fest '24", year: '2024' },
  { label: "AI Fest '23", year: '2023' },
  { label: "AI Fest '21", year: '2021' },
  { label: "AI Fest '20", year: '2020' },
  { label: "AI Fest '19", year: '2019' },
];

export default function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const [archiveOpen, setArchiveOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-deep/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 left-0 z-50 h-full w-84 max-w-[85vw] bg-white/98 backdrop-blur-xl shadow-2xl shadow-deep/20 flex flex-col"
          >
            <div>
              {/* Header */}
              <div className="p-6 border-b border-accent/10 flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-left">
                  <div className="w-33 h-33 flex-shrink-0">
                    <img
                      src={`${import.meta.env.BASE_URL}aifest_hero_logo.png`}
                      alt="AI Fest"
                      className="w-full h-full object-contain" style={{ marginLeft: '-25px' }}
                    />
                  </div>
                  <div className="text-left" style={{ marginLeft: '-45px' }}>
                    <h1 className="font-heading font-bold text-text text-lg tracking-tight" style={{ marginRight: '12px' }}>AI Fest '26</h1>
                    <p className="text-xs text-text-muted font-bold" style={{ marginRight: '12px' }}>Hacettepe Üniversitesi <br /> Yapay Zeka Topluluğu</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 text-text-muted hover:bg-accent/10 rounded-xl transition-colors" style={{ marginRight: '5px' }}
                  aria-label="Menüyü Kapat"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Menu Items with increased vertical spacing */}
              <nav className="p-6 flex flex-col gap-[24px]" style={{ paddingTop: '7px' }}>
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.05, type: 'spring', stiffness: 200 }}
                    className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-text hover:bg-cta/10 hover:text-cta transition-all duration-200 group"
                    style={{ marginLeft: '3px' }}
                  >
                    <item.icon className="w-5 h-5 text-text-muted group-hover:text-cta transition-colors" />
                    <span className="font-body font-semibold text-base">{item.label}</span>
                  </motion.a>
                ))}

                {/* Archive dropdown */}
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35, type: 'spring', stiffness: 200 }}
                >
                  <button
                    onClick={() => setArchiveOpen(!archiveOpen)}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-text hover:bg-cta/10 hover:text-cta transition-all duration-200 group"
                    style={{ marginLeft: '-3px' }}
                  >
                    <div className="flex items-center gap-4.5">
                      <Archive className="w-5 h-5 text-text-muted group-hover:text-cta transition-colors translate-x-[6px]" />
                      <span className="font-body font-semibold text-base">Arşiv</span>
                    </div>
                    <motion.div animate={{ rotate: archiveOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-text-muted" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {archiveOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-8 mt-2 space-y-1.5"
                      >
                        {archiveItems.map((item, i) => (
                          <motion.a
                            key={item.year}
                            href={`#archive-${item.year}`}
                            onClick={onClose}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.04 }}
                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-text-muted hover:text-cta hover:bg-cta/5 transition-all duration-200 text-sm font-body font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                            {item.label}
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </nav>
            </div>

            {/* Bottom CTA */}
            <div className="px-6" style={{ marginTop: '557px' }}>
              <a
                href="#register"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-cta text-white font-body font-semibold text-base rounded-xl hover:bg-cta-hover transition-all duration-300 shadow-md shadow-cta/25 hover:shadow-lg hover:shadow-cta/35 active:scale-98"
              >
                <span>Kayıt Ol</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
