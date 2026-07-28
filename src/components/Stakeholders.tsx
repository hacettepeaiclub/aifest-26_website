import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const partners = [
  { name: 'IEEE Hacettepe', color: 'from-blue-400 to-blue-600' },
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
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 text-center overflow-hidden h-full flex flex-col items-center justify-center">
                {/* Top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r ${partner.color} opacity-50 group-hover:opacity-100 transition-opacity`} />

                <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${partner.color} text-white font-heading font-bold text-xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {partner.name.charAt(0)}
                </div>
                <p className="font-body font-medium text-base sm:text-lg text-text leading-tight">{partner.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
