import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration: number, shouldStart: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, shouldStart]);

  return count;
}

/* ─── Counter Card ─── */
function CounterCard({
  stat,
  isInView,
  delay,
}: {
  stat: { value: string; numericValue?: number; suffix?: string; label: string; color: string };
  isInView: boolean;
  delay: number;
}) {
  const count = useCountUp(stat.numericValue ?? 0, 4000, isInView);

  const displayValue = stat.numericValue !== undefined
    ? `${count}${stat.suffix ?? ''}`
    : stat.value;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative p-4 sm:p-6 rounded-3xl bg-[#f3f4f6]/45 backdrop-blur-3xl border border-white/60 hover:bg-white/60 hover:border-white/80 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 overflow-hidden text-center flex flex-col justify-center aspect-square w-full max-w-[160px] mx-auto"
    >
      <p className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-text">{displayValue}</p>
      <p className="text-xs sm:text-sm text-text-muted font-body mt-1 sm:mt-2">{stat.label}</p>
    </motion.div>
  );
}

/* ─── Typewriter Component ─── */
function TypewriterHTML({ html, isInView, delay = 0, speed = 15 }: { html: string, isInView: boolean, delay?: number, speed?: number }) {
  const [displayedHtml, setDisplayedHtml] = useState('');

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i >= html.length) {
          clearInterval(interval);
          return;
        }

        let nextI = i;
        if (html[nextI] === '<') {
          while (nextI < html.length && html[nextI] !== '>') {
            nextI++;
          }
          nextI++; // include '>'
        } else {
          nextI++;
        }

        setDisplayedHtml(html.substring(0, nextI));
        i = nextI;
      }, speed);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, html, delay, speed]);

  return <span dangerouslySetInnerHTML={{ __html: displayedHtml }} />;
}

/* ─── About Section ─── */
export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [

    { value: '6', numericValue: 6, label: 'Başarılı Etkinlik', color: 'from-accent to-accent/70' },
    { value: '1200+', numericValue: 1200, suffix: '+', label: 'Katılımcı', color: 'from-badge to-badge/70' },
    { value: '60+', numericValue: 60, suffix: '+', label: 'Konuşmacı', color: 'from-deep to-deep/70' },
  ];

  return (
    <section id="hakkinda" className="py-12 px-4 sm:py-28 sm:px-10 lg:px-20 xl:px-36 w-full relative flex flex-col items-center bg-transparent">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-cta/5 blur-[80px]" />

      <div ref={ref} className="w-full relative z-10 flex flex-col items-center">
        {/* Section header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16 w-full"
        >

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-text">
            <br />AI Fest{' '}
            <span className="bg-gradient-to-r from-accent to-cta bg-clip-text text-transparent">
              Nedir?
            </span>
          </h2>
        </motion.div>

        {/* Content container */}
        <div className="w-full flex flex-col items-center gap-12 max-w-3xl mx-auto mt-4 px-4 sm:px-4">
          {/* Main text */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full text-left px-4 sm:px-4"
          >
            <div className="space-y-5 w-full text-left min-h-[160px]">
              <TypewriterHTML
                isInView={isInView}
                delay={0.2}
                speed={15}
                html={`<p class="text-sm sm:text-base lg:text-lg text-text-muted leading-relaxed font-body">
              <span class="text-accent font-semibold"><br />AI Fest</span>, Türkiye'nin en büyük
              öğrenci odaklı yapay zeka etkinliklerinden biridir.
              <br />Her yıl sektörün önde gelen
              isimleri, araştırmacılar ve teknoloji liderlerini bir araya getirerek yapay zekanın
              geleceğini şekillendiren ilham verici bir platform sunuyoruz.
            </p>
            <p class="text-sm sm:text-base lg:text-lg text-text-muted leading-relaxed font-body mt-5">
              <br />Konferanslar, paneller, workshoplar ve networking alanlarıyla dolu bir gün sizi
              bekliyor. İster öğrenci olun ister profesyonel; yapay zeka ekosisteminin nabzını
              tutmak, yeni bağlantılar kurmak ve kariyerinize yön vermek için 
              <span class="text-cta font-semibold">AI Fest '26</span>'ya katılın!
            </p>`}
              />
            </div>
          </motion.div>

          {/* Stats cards (3 in a row) */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 0.88 } : {}}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-[600px] mx-auto mt-4"
          >
            {stats.map((stat, i) => (
              <CounterCard
                key={stat.label}
                stat={stat}
                isInView={isInView}
                delay={0.5 + i * 0.1}
              />
            ))}
          </motion.div>

          {/* Bottom centered text */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-3 w-full mt-8"
          >
            <div style={{ marginTop: '-50px' }} className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-cta/50" />
            <span className="text-xs sm:text-sm text-text-muted/60 font-body italic text-center whitespace-nowrap" style={{ marginTop: '-50px' }}>
              2019'dan bugüne, her yıl büyüyerek
            </span>
            <div style={{ marginTop: '-50px' }} className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-cta/50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
