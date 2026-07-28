import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, forwardRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

/* ─── Event Data ─── */
const timelineEvents = [
  {
    year: '2021',
    description:
      'TensorFlow Turkey işbirliği ile gerçekleştirdiğimiz etkinliklerde, birçok sektörden yapay zeka uzmanı ve tecrübeli profesyoneller ağırladık.',
    highlight: 'TensorFlow Turkey İşbirliği',
    colorHex: '#39B8BA', // cta
  },
  {
    year: '2023',
    description:
      'TUSAŞ ve Massive Bio sponsorluğunda gerçekleştirdiğimiz etkinliklere 500\'ü aşkın katılımcı büyük ilgi gösterdi.',
    highlight: '500+ Katılımcı',
    colorHex: '#4E439B', // accent
  },
  {
    year: '2024',
    description:
      'Aselsan ve Anadolu Grubu sponsorluğunda gerçekleştirdiğimiz etkinlik, yapay zeka dünyasının en önemli isimlerini bir araya getirdi.',
    highlight: 'Rekor Katılım',
    colorHex: '#DA5D97', // badge
  },
  {
    year: '2025',
    description:
      'Platin Sponsorumuz Aselsan ve Altın Sponsorumuz Deepix başta olmak üzere, teknoloji ve yapay zeka dünyasına yön veren değerli markaların destekleriyle zengin bir etkinlik gerçekleştirdik.',
    highlight: 'Genişleyen Ekosistem',
    colorHex: '#461E64', // deep
  },
];

/* ─── Dimensions ─── */
const PAGE_WIDTH = 1000;
const PAGE_HEIGHT = 450;

/* ─── Flipping Book Page Component ─── */
const Page = forwardRef<HTMLDivElement, { event: typeof timelineEvents[0]; number: number }>(
  ({ event, number }, ref) => {
    return (
      // The flipbook treats this as a landscape page
      <div className="demoPage relative overflow-hidden bg-transparent" ref={ref} style={{ width: PAGE_HEIGHT, height: PAGE_WIDTH }}>

        {/* 
          Inner wrapper rotated -90deg to counter the container's 90deg rotation.
          This makes the content appear right-side up to the user.
        */}
        <div
          style={{
            width: PAGE_WIDTH,
            height: PAGE_HEIGHT,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
          }}
          className="rounded-b-2xl border-b border-gray-200 shadow-md flex flex-col overflow-hidden"
        >
          {/* Spacer for Stationary Header (Transparent) */}
          <div className="relative h-14 sm:h-16 w-full shrink-0" />

          {/* Page Content (Opaque Paper) */}
          <div className="p-8 flex-1 flex flex-row items-center justify-center gap-12 bg-white rounded-b-2xl"
            style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, transparent 100%)' }}
          >
            {/* Left Side: Year */}
            <div className="flex flex-col items-center justify-center min-w-[250px]">
              <div className="text-7xl sm:text-[9rem] font-black drop-shadow-sm tracking-tighter" style={{ color: event.colorHex }}>
                {event.year}
              </div>
            </div>

            {/* Right Side: Info */}
            <div className="flex flex-col items-start justify-center text-left flex-1 max-w-lg">
              <p className="text-base sm:text-xl text-text-muted font-body mb-5 leading-relaxed">
                {event.description}
              </p>
              <div className="text-sm sm:text-base font-bold py-2 px-5 rounded-xl bg-white border border-gray-200 shadow-sm" style={{ color: event.colorHex }}>
                ✨ {event.highlight}
              </div>
            </div>
          </div>

          {/* Page Number */}
          <div className="absolute bottom-4 right-6 text-gray-300 font-body text-sm font-semibold">
            Sayfa {number}
          </div>
        </div>
      </div>
    );
  }
);
Page.displayName = 'Page';


/* ─── E-Book FlipBook Component ─── */
function EBookFlip() {
  const flipBook = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (flipBook.current && flipBook.current.pageFlip) {
        const pageFlip = flipBook.current.pageFlip();
        if (pageFlip) {
          const current = pageFlip.getCurrentPageIndex();
          if (current >= timelineEvents.length - 1) {
            pageFlip.turnToPage(0);
          } else {
            pageFlip.flipNext();
          }
        }
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative mx-auto flex justify-center"
      style={{
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        perspective: '1500px',
        marginTop: '10px',
        marginBottom: '10px'
      }}
    >
      {/* Stationary Binding Assembly */}
      <div className="absolute top-[-6px] left-0 right-0 z-10 pointer-events-none flex flex-col items-center">
        {/* Stationary Colored Header (Modern Binding Strip) */}
        <div
          className="relative h-14 sm:h-16 w-full shadow-inner mt-[6px]"
          style={{
            backgroundColor: timelineEvents[currentPage]?.colorHex || timelineEvents[0].colorHex,
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)',
            transition: 'background-color 0.5s ease-in-out'
          }}
        >
          <div className="absolute bottom-2 left-4 right-4 border-b-2 border-white/20 border-dashed opacity-50" />
        </div>

        {/* Stationary Metal Rings Overlay */}
        <div className="absolute top-0 left-0 right-0 flex justify-evenly px-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ring) => (
            <div key={`static-ring-${ring}`} className="relative flex flex-col items-center">
              {/* 3D Metallic Ring */}
              <div
                className="w-[14px] h-[40px] rounded-b-[7px] border-x border-b border-black/20"
                style={{
                  background: 'linear-gradient(90deg, #737373 0%, #d4d4d8 25%, #f4f4f5 50%, #a1a1aa 75%, #52525b 100%)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), inset 2px 2px 4px rgba(255,255,255,0.8), 2px 4px 6px rgba(0,0,0,0.3)'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 
        Rotate the entire FlipBook 90 degrees.
        This moves the left-bound spine to the TOP, creating a bottom-to-top calendar flip!
      */}
      <div
        style={{
          width: PAGE_HEIGHT,
          height: PAGE_WIDTH,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(90deg)'
        }}
        className="shadow-2xl rounded-b-2xl z-20"
      >
        {/* @ts-ignore */}
        <HTMLFlipBook
          ref={flipBook}
          width={PAGE_HEIGHT}
          height={PAGE_WIDTH}
          size="fixed"
          showCover={false}
          mobileScrollSupport={false} // Disabled because swipe directions are 90deg offset
          usePortrait={true}
          className="ebook-flipbook"
          onFlip={(e: any) => setCurrentPage(e.data)}
        >
          {timelineEvents.map((event, i) => (
            <Page key={event.year} event={event} number={i + 1} />
          ))}
          {/* @ts-ignore */}
        </HTMLFlipBook>
      </div>
    </div>
  );
}

/* ─── Main Timeline Component ─── */
export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null!);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="tarihce"
      className="relative w-full py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-deep/30 to-deep/40"
    >
      {/* Background glow blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-cta/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-badge/10 blur-[150px]" />

      {/* Section header */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center text-center mb-16 sm:mb-24 w-full px-4 relative z-20"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-text mb-3">
          AI Fest{' '}
          <span className="bg-gradient-to-r from-deep to-accent bg-clip-text text-transparent">
            Yolculuğu
          </span>
        </h2>
        <p className="text-text-muted italic font-body text-base sm:text-lg max-w-xl text-center">
          Sayfalarca başarıyla dolu, <br /> her yıl büyüyen hikâyemiz 2021'den bugüne...
        </p>
      </motion.div>

      {/* E-Book FlipBook UI */}
      <div className="relative w-full z-10 px-4 flex justify-center">
        <EBookFlip />
      </div>
    </section>
  );
}
