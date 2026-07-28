import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* 25 sponsors total: 12 sponsors (2 Platin, 4 Altın, 6 Gümüş), 8 Fuaye, 5 Medya */
interface Sponsor {
  name: string;
  color: string;
  link?: string;
}

const platinSponsors: Sponsor[] = [
  { name: 'ASELSAN', color: 'from-amber-300 to-amber-500' },
  { name: 'HAVELSAN', color: 'from-sky-400 to-blue-600' },
];

const altinSponsors: Sponsor[] = [
  { name: 'Deepix', color: 'from-violet-400 to-purple-600' },
  { name: 'Türk Telekom', color: 'from-blue-400 to-cyan-500' },
  { name: 'Anadolu Grubu', color: 'from-red-400 to-orange-500' },
  { name: 'TUSAŞ', color: 'from-emerald-400 to-green-600' },
];

const gumusSponsors: Sponsor[] = [
  { name: 'Massive Bio', color: 'from-teal-300 to-cyan-500' },
  { name: 'Miuul', color: 'from-indigo-400 to-blue-500' },
  { name: 'Digicertify', color: 'from-green-400 to-emerald-500' },
  { name: 'Turkcell', color: 'from-yellow-400 to-amber-500' },
  { name: 'İş Bankası', color: 'from-blue-500 to-indigo-600' },
  { name: 'BtcTurk', color: 'from-sky-400 to-blue-500' },
];

const fuayeSponsors: Sponsor[] = [
  { name: 'Tat', color: 'from-red-400 to-red-600' },
  { name: "Nuh'un Ankara Makarnası", color: 'from-yellow-400 to-orange-500' },
  { name: 'Kanta Coffee Shop', color: 'from-amber-700 to-amber-900' },
  { name: 'Cihan Kuruyemiş', color: 'from-green-500 to-lime-600' },
  { name: 'Meşhur Selanik Aspava', color: 'from-red-500 to-orange-600' },
  { name: 'Elmasu', color: 'from-pink-400 to-rose-500' },
  { name: 'Salina', color: 'from-blue-300 to-cyan-400' },
  { name: 'Campus Cafe', color: 'from-amber-500 to-yellow-600' },
];

const medyaSponsors: Sponsor[] = [
  { name: 'Etkinkampüs', color: 'from-purple-400 to-violet-500' },
  { name: 'Bilim Şenliği', color: 'from-blue-400 to-indigo-500' },
  { name: 'Tekno Haber', color: 'from-cyan-400 to-teal-500' },
  { name: 'AI Turkey', color: 'from-emerald-400 to-green-600' },
  { name: 'StartupHR', color: 'from-orange-400 to-red-500' },
];

function SponsorPill({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center group w-[160px] sm:w-[180px]">
      <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center text-white font-heading font-bold text-5xl shadow-sm border border-accent/15 hover:shadow-md hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300`}>
        {sponsor.name.charAt(0)}
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <span className="font-body font-semibold text-xs sm:text-sm text-text text-center w-full truncate px-2">{sponsor.name}</span>
        <a href={sponsor.link || "#"} target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-xs px-4 py-1.5 rounded-full bg-bg text-text-muted border border-accent/20 hover:bg-cta hover:text-white transition-colors">
          Siteye Git
        </a>
      </div>
    </div>
  );
}

interface MarqueeRowProps {
  sponsors: Sponsor[];
  direction?: 'left' | 'right';
  speed?: string;
}

function MarqueeRow({ sponsors }: MarqueeRowProps) {
  return (
    <div className="w-full pb-2 px-4 sm:px-8">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
        {sponsors.map((sponsor, i) => (
          <SponsorPill key={`${sponsor.name}-${i}`} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}

interface TierSectionProps {
  title: string;
  sponsors: Sponsor[];
  tierColor: string;
  direction?: 'left' | 'right';
  speed?: string;
}

function TierSection({ title, sponsors, tierColor, direction = 'left', speed = '30s' }: TierSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-[5px] w-full"
    >
      <div className="flex items-center justify-center gap-3 mb-4 px-4 sm:px-8 lg:px-16 xl:px-32 w-full">
        <div className="h-px flex-1 bg-accent/15" />
        <div className={`w-2.5 h-2.5 rounded-full ${tierColor}`} />
        <h3 className="font-heading font-semibold text-text text-base sm:text-lg whitespace-nowrap">{title}</h3>
        <div className="h-px flex-1 bg-accent/15" />
      </div>
      <MarqueeRow sponsors={sponsors} direction={direction} speed={speed} />
    </motion.div>
  );
}

export default function Sponsors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="sponsorlar" className="py-20 sm:py-28 relative overflow-hidden w-full bg-gradient-to-b from-deep/15 to-deep/20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-transparent pointer-events-none" />

      <div ref={ref} className="relative z-10 w-full">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 px-4 sm:px-8 lg:px-16 xl:px-32 w-full"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text">
            <span className="bg-gradient-to-r from-accent to-cta bg-clip-text text-transparent">
              <br />Sponsorlar <br />
            </span>
          </h2>
        </motion.div>

        {/* Financial Sponsors */}
        <TierSection
          title="Platin Sponsor"
          sponsors={platinSponsors}
          tierColor="bg-amber-400"
          direction="left"
          speed="60s"
        />

        <TierSection
          title="Altın Sponsor"
          sponsors={altinSponsors}
          tierColor="bg-yellow-500"
          direction="left"
          speed="75s"
        />

        <TierSection
          title="Gümüş Sponsor"
          sponsors={gumusSponsors}
          tierColor="bg-gray-400"
          direction="left"
          speed="84s"
        />

        {/* Divider */}
        <div className="my-[5px] mx-auto max-w-md h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        {/* Foyer & Media */}
        <TierSection
          title="Fuaye Sponsorları"
          sponsors={fuayeSponsors}
          tierColor="bg-cta"
          direction="left"
          speed="96s"
        />

        <TierSection
          title="Medya Tanıtım Sponsorları"
          sponsors={medyaSponsors}
          tierColor="bg-badge"
          direction="left"
          speed="72s"
        />
      </div>
    </section>
  );
}
