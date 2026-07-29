import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Globe } from 'lucide-react';

/* Custom social SVG icons (Lucide doesn't include brand icons) */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

type SocialIconComponent = ({ className }: { className?: string }) => React.JSX.Element;

const socialLinks: { icon: SocialIconComponent; label: string; href: string; color: string }[] = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com/hacettepeaiclub', color: 'hover:text-pink-400' },
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com/company/hacettepeaiclub', color: 'hover:text-blue-400' },
  { icon: YoutubeIcon, label: 'YouTube', href: 'https://youtube.com/hacettepeaiclub', color: 'hover:text-red-500' },
  { icon: XIcon, label: 'X', href: 'https://x.com/hacettepeaiclub', color: 'hover:text-gray-300' },
];

const quickLinks = [
  { label: 'Ana Sayfa', href: '#hero' },
  { label: 'Konuşmacılar', href: '#konusmacilar' },
  { label: 'Sponsorlar', href: '#sponsorlar' },
  { label: 'Paydaşlar', href: '#paydaslar' },
  { label: 'Konum', href: '#konum' },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer id="iletisim" className="relative bg-deep overflow-hidden text-white">
      {/* Animated gradient blobs (same as Hero) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -70, 40, 0],
            scale: [1, 1.25, 0.8, 1],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(57, 184, 186, 0.45) 0%, transparent 70%)', willChange: 'transform' }}
        />
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 50, -60, 0],
            scale: [1, 0.8, 1.25, 1],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(218, 93, 151, 0.45) 0%, transparent 70%)', willChange: 'transform' }}
        />
        <motion.div
          animate={{
            x: [0, 40, -50, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.15, 0.85, 1],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)', willChange: 'transform' }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep/75 via-deep-light/20 to-deep/75 pointer-events-none z-0" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div ref={ref} className="relative z-10">
        {/* Main footer content */}
        <div className="w-full px-4 sm:pl-8 lg:pl-16 xl:pl-32 sm:pr-[9px] py-12 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {/* Brand */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="md:col-span-1"
            >
              <div className="flex items-center gap-3 mb-5 justify-center sm:justify-start">
                <img
                  src={`${import.meta.env.BASE_URL}aifest_hero_logo.png`}
                  alt="AI Fest"
                  className="w-24 h-24 object-contain"
                  style={{ marginLeft: '-15px', marginTop: '-5px' }}
                />
                <div>
                  <h3 className="font-headline font-bold text-white text-xl" style={{ marginLeft: '-25px', marginTop: '5px' }}>AI Fest '26</h3>
                  <p className="text-xs text-white/50 font-body" style={{ marginLeft: '-25px', marginTop: '0px' }}>Hacettepe Üniversitesi <br />Yapay Zeka Topluluğu</p>
                </div>
              </div>
              <p className="text-sm text-white/60 font-body leading-relaxed max-w-xs text-center sm:text-left sm:pl-10" style={{ marginBottom: '7px', marginLeft: '7px' }}>
                2018'den bugüne yapay zekâ dünyasına adım atmak isteyen herkesi bir araya getiriyoruz.
              </p>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:justify-self-center text-center flex flex-col items-center"
            >
              <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5" style={{ marginTop: '17px' }}>
                Hızlı Bağlantılar
              </h4>
              <nav className="space-y-3">
                {quickLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-white/60 hover:text-cta font-body transition-colors duration-300 text-center"


                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:justify-self-end mr-0 sm:mr-[9px] text-center sm:text-left"
            >
              <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5" style={{ marginRight: '5px', marginTop: '17px' }}>
                Bize Ulaşın
              </h4>
              <div className="space-y-3 mb-6">
                <a
                  href="https://hacettepeaiclub.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-cta font-body transition-colors"
                  style={{ marginRight: '5px' }}
                >
                  <Globe className="w-4 h-4" />
                  hacettepeaiclub.com
                </a>
                <a
                  href="mailto:contact@hacettepeaiclub.com"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-cta font-body transition-colors"
                  style={{ marginRight: '5px' }}
                >
                  <Mail className="w-4 h-4" />
                  contact@hacettepeaiclub.com
                </a>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2.5 justify-center sm:justify-start" style={{ marginTop: '3px' }}>
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`p-2.5 rounded-xl bg-white/5 text-white/50 ${social.color} hover:bg-white/10 transition-all duration-300 hover:scale-110`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-center text-center">
            <p className="text-xs text-white/40 font-body text-center" style={{ padding: '5px' }}>
              © {new Date().getFullYear()} Hacettepe Üniversitesi Yapay Zeka Topluluğu  ·  AI Fest '26 | Tüm hakları saklıdır
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
