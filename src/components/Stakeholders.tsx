import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* Custom social SVG icon (Lucide doesn't include brand icons) */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const partners = [
  {
    name: 'Atılım Üniversitesi\nYapay Zeka Topluluğu',
    color: 'from-blue-400 to-blue-600',
    logo: 'atilim_logo.png',
    instagram: 'https://www.instagram.com/atilimai'
  },
  { name: 'Google DSC Hacettepe', color: 'from-red-400 to-yellow-500' },
  { name: 'ACM Hacettepe', color: 'from-indigo-400 to-purple-500' },
  { name: 'Yazılım Topluluğu', color: 'from-green-400 to-emerald-500' },
  { name: 'Robotik Topluluğu', color: 'from-orange-400 to-red-500' },
  { name: 'Siber Güvenlik Topluluğu', color: 'from-gray-500 to-slate-700' },
  { name: 'Veri Bilimi Kulübü', color: 'from-cyan-400 to-teal-500' },
  { name: 'Girişimcilik Topluluğu', color: 'from-amber-400 to-orange-500' },
];

export default function Stakeholders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="paydaslar" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-16 xl:px-32 w-full relative flex flex-col items-center bg-gradient-to-b from-deep/20 to-deep/30">
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-badge/5 blur-[80px]" />

      <div ref={ref} className="w-full relative z-10 flex flex-col items-center">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16 w-full"
        >

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white" style={{ textAlign: 'center' }}>
            <span className="bg-gradient-to-r from-cta to-badge bg-clip-text text-transparent">
              <br /> Paydaşlar
            </span>
          </h2>
          <p className="mt-4 text-white/80 font-body max-w-2xl mx-auto text-base sm:text-lg" style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '10px' }}>
            AI Fest'i birlikte şekillendirdiğimiz topluluklar ve kurumsal ortaklar <br />
          </p>
        </motion.div>

        {/* Partners grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" style={{ marginBottom: '10px' }}>
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="group"
            >
              <div className="relative px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-12 rounded-3xl bg-[#f3f4f6]/45 backdrop-blur-3xl border border-white/60 hover:bg-white/60 hover:border-white/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 text-center overflow-hidden h-full flex flex-col items-center justify-center">

                {partner.logo ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${partner.logo}`}
                    alt={partner.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ marginTop: '10px', marginBottom: '3px' }}
                  />
                ) : (
                  <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${partner.color} text-white font-heading font-bold text-xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {partner.name.charAt(0)}
                  </div>
                )}

                <p className="font-body font-medium text-base sm:text-lg text-text leading-tight">
                  {partner.name.split('\n').map((line, idx, arr) => (
                    <span key={idx}>
                      {line}
                      {idx !== arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>

                {partner.instagram && (
                  <a
                    href={partner.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-black hover:text-cta transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
