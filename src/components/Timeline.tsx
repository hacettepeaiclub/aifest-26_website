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
    embedUrl: 'https://www.instagram.com/p/CXjjy24MsQU/embed',
  },
  {
    year: '2023',
    description:
      'TUSAŞ ve Massive Bio sponsorluğunda gerçekleştirdiğimiz etkinliklere 500\'ü aşkın katılımcı büyük ilgi gösterdi.',
    highlight: '500+ Katılımcı',
    colorHex: '#4E439B', // accent
    embedUrl: 'https://www.instagram.com/p/Cz_77LAtD-G/embed',
  },
  {
    year: '2024',
    description:
      'Aselsan ve Anadolu Grubu sponsorluğunda gerçekleştirdiğimiz etkinlik, yapay zeka dünyasının en önemli isimlerini bir araya getirdi.',
    highlight: 'Rekor Katılım',
    colorHex: '#DA5D97', // badge
    embedUrl: 'https://www.instagram.com/p/DCV_g12tv3K/embed',
  },
  {
    year: '2025',
    description:
      'Platin Sponsorumuz Aselsan ve Altın Sponsorumuz Deepix başta olmak üzere, teknoloji ve yapay zeka dünyasına yön veren değerli markaların destekleriyle zengin bir etkinlik gerçekleştirdik.',
    highlight: 'Genişleyen Ekosistem',
    colorHex: '#461E64', // deep
    embedUrl: 'https://www.instagram.com/p/DRhfOuxDNsH/embed',
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
          <div className="p-6 flex-1 flex flex-row items-center justify-between gap-8 bg-[#f3f4f6]/45 backdrop-blur-3xl rounded-b-2xl px-10"
            style={{ backgroundImage: 'radial-gradient(circle at right, #ffffff 0%, transparent 50%)' }}
          >
            {/* Left Side: Instagram Embed or Photo Card */}
            <div className="w-[320px] h-[360px] shrink-0 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg border border-white/60 bg-white/70 relative" style={{ marginLeft: '80px', marginTop: '-10px' }}>
              {event.embedUrl ? (
                <div className="w-full h-full overflow-hidden rounded-2xl relative">
                  <iframe
                    src={event.embedUrl}
                    className="w-full border-0 rounded-2xl relative"
                    style={{ marginTop: '-56px', height: 'calc(100% + 110px)' }}
                    title={`Instagram Post ${event.year}`}
                    allowTransparency
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-6xl font-black drop-shadow-sm tracking-tighter" style={{ color: event.colorHex }}>
                    {event.year}
                  </div>
                  <span className="text-xs font-semibold text-text-muted mt-2">AI Fest Hatıraları</span>
                </div>
              )}
            </div>

            {/* Right Side: Info Block */}
            <div className="flex flex-col items-start justify-center text-left flex-1 max-w-lg">
              {/* Year at Top Left */}
              <div className="text-5xl sm:text-6xl font-black mb-6 tracking-tighter drop-shadow-sm" style={{ color: event.colorHex, marginTop: '0px' }}>
                {event.year}
              </div>

              {/* Description */}
              <p className="text-2xl sm:text-xl text-text-light font-body mb-2 leading-relaxed"
                style={{ marginRight: '30px', marginTop: '30px' }}>
                {event.description}
              </p>
            </div>
          </div>

          {/* Page Footer */}
          <div className="absolute bottom-1 left-1 right-2 flex justify-between text-gray-400 font-body text-sm font-semibold pointer-events-none">
            <div className="flex items-left" >
              <span>← Geri</span>
            </div>
            <div className="flex items-right">
              <span className="text-gray-300" > Sayfa {number} </span>
              <span className="text-gray-500 "></span>
              <span>|İleri →</span>
            </div>
          </div>
        </div>
      </div >
    );
  }
);
Page.displayName = 'Page';


/* ─── E-Book FlipBook Component ─── */
function EBookFlip({ scale }: { scale: number }) {
  const flipBook = useRef<any>(null);

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
    }, 25000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ width: PAGE_WIDTH * scale, height: PAGE_HEIGHT * scale, margin: '0 auto' }}>
      <div
        className="relative mx-auto flex justify-center origin-top-left"
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          perspective: '1500px',
          transform: `scale(${scale})`,
        }}
      >
        {/* Stationary Binding Assembly */}
        <div className="absolute top-[-6px] left-0 right-0 z-10 pointer-events-none flex flex-col items-center">
          {/* Stationary Colored Header (Modern Binding Strip) */}
          <div
            className="relative h-14 rounded-2xl sm:h-16 w-full shadow-inner mt-[6px]"
            style={{
              backgroundColor: '#0000007d', // Elegant, modern static dark zinc
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.3) 100%)',
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
          >
            {timelineEvents.map((event, i) => (
              <Page key={event.year} event={event} number={i + 1} />
            ))}
            {/* @ts-ignore */}
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Timeline Component ─── */
export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null!);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const checkWidth = () => setWindowWidth(window.innerWidth);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const isMobile = windowWidth < 768;
  const scale = isMobile ? Math.min(1, (windowWidth - 14) / PAGE_WIDTH) : 1;

  return (
    <section
      ref={sectionRef}
      id="tarihce"
      className="relative w-full py-12 px-[7px] sm:py-28 sm:px-8 lg:px-16 overflow-hidden bg-transparent"
    >
      {/* Background glow blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-cta/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-badge/10 blur-[150px]" />

      {/* Section header */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center text-center mb-10 sm:mb-24 w-full px-4 relative z-20"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-text mb-3">
          AI Fest{' '}
          <span className="bg-gradient-to-r from-deep to-accent bg-clip-text text-transparent">
            Yolculuğu
          </span>
        </h2>
        <p className="text-text-muted italic font-body text-base sm:text-lg max-w-xl text-center" style={{ marginBottom: '1rem' }}>
          Sayfalarca başarıyla dolu, <br /> her yıl büyüyen hikâyemiz 2021'den bugüne...
        </p>
      </motion.div>

      {/* Content: Mobile cards or Desktop flipbook */}
      <div className="relative w-full z-10 px-4 sm:px-4 flex justify-center">
        <EBookFlip scale={scale} />
      </div>
    </section>
  );
}
