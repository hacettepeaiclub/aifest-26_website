import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Gift, CheckCircle, X, Sparkles, User, BookOpen, Clock } from 'lucide-react';

interface ScheduleItem {
  id: string;
  time: string;
  topic: string;
  speaker: string;
  speakerTitle?: string;
}

const day1Schedule: ScheduleItem[] = [
  {
    id: 'd1-1',
    time: '10:00 - 10:45',
    topic: 'Yapay Zeka Etkinliği Açılışı & Keynote',
    speaker: 'Prof. Dr. Mehmet Öz',
    speakerTitle: 'Hacettepe Üniversitesi',
  },
  {
    id: 'd1-2',
    time: '10:50 - 11:35',
    topic: 'Savunma Sanayiinde Üretken Yapay Zeka',
    speaker: 'Dr. Ahmet Yılmaz',
    speakerTitle: 'ASELSAN Kıdemli Yapay Zeka Uzmanı',
  },
  {
    id: 'd1-3',
    time: '11:40 - 12:30',
    topic: 'Otonom Sistemler ve Derin Öğrenme',
    speaker: 'Canan Kaya',
    speakerTitle: 'HAVELSAN Mühendislik Lideri',
  },
  {
    id: 'd1-4',
    time: '13:30 - 14:15',
    topic: 'Büyük Dil Modelleri (LLM) ve Ajanik Sistemler',
    speaker: 'Oğuzhan Demirel',
    speakerTitle: 'MagicLab AI Lead',
  },
  {
    id: 'd1-5',
    time: '14:20 - 15:10',
    topic: 'Yapay Zeka Destekli Sağlık Teknolojileri',
    speaker: 'Zeynep Şahin',
    speakerTitle: 'Massive Bio Veri Bilimci',
  },
  {
    id: 'd1-6',
    time: '15:15 - 16:00',
    topic: 'Geleceğin Kariyeri: AI & Veri Analitiği Paneli',
    speaker: 'Sektör Liderleri',
    speakerTitle: 'Çeşitli Şirket Temsilcileri',
  },
];

const day2Schedule: ScheduleItem[] = [
  {
    id: 'd2-1',
    time: '10:15 - 11:00',
    topic: 'Görüntü İşleme ve Bilgisayarlı Görü Uygulamaları',
    speaker: 'Emre Çelik',
    speakerTitle: 'TUSAŞ AI Araştırmacısı',
  },
  {
    id: 'd2-2',
    time: '11:05 - 11:50',
    topic: 'Telekomünikasyonda Akıllı Ağlar ve AI',
    speaker: 'Deniz Arslan',
    speakerTitle: 'Türk Telekom Ar-Ge Lideri',
  },
  {
    id: 'd2-3',
    time: '12:00 - 12:45',
    topic: 'Finans Sektöründe Doğal Dil İşleme',
    speaker: 'Burak Tan',
    speakerTitle: 'İş Bankası Yapay Zeka Bölümü',
  },
  {
    id: 'd2-4',
    time: '14:00 - 14:45',
    topic: 'Girişimciler İçin Yapay Zeka Stratejileri',
    speaker: 'Selin Yılmaz',
    speakerTitle: 'StartupHR Kurucu Ortağı',
  },
  {
    id: 'd2-5',
    time: '14:50 - 15:45',
    topic: 'Kapanış Paneli & AI Fest Ödül Töreni',
    speaker: 'AI Fest Ekibi & Konuklar',
    speakerTitle: 'Hacettepe AI Club',
  },
];

export default function ProgramSchedule() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [selectedRaffle, setSelectedRaffle] = useState<ScheduleItem | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedRaffle(null);
      setFormData({ name: '', email: '', phone: '' });
    }, 2500);
  };

  return (
    <section
      ref={sectionRef}
      id="programakisi"
      className="py-12 px-4 sm:py-20 sm:px-6 w-full relative flex flex-col items-center bg-transparent overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-10 w-[350px] h-[350px] rounded-full bg-cta/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="w-full relative z-10 flex flex-col items-center max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-8 sm:mb-12 w-full"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-3">
            Program{' '}
            <span className="bg-gradient-to-r from-accent to-cta bg-clip-text text-transparent">
              Akışı
            </span>
          </h2>
          <p className="text-text-muted italic font-body text-sm sm:text-base max-w-xl text-center">
            İki gün boyunca sürecek ilham verici oturumlar ve özel sürpriz çekilişler
          </p>
        </motion.div>

        {/* Day Selector Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 p-1.5 rounded-md bg-[#f3f4f6]/60 backdrop-blur-xl border border-white/60 shadow-inner mb-8 sm:mb-12"
        >
          <button
            onClick={() => setActiveDay(1)}
            className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-md font-heading font-semibold text-sm sm:text-base transition-all duration-300 ${activeDay === 1
              ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-105'
              : 'text-text-muted hover:text-text hover:bg-white/40'
              }`}
          >
            1. Gün
          </button>
          <button
            onClick={() => setActiveDay(2)}
            className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-md font-heading font-semibold text-sm sm:text-base transition-all duration-300 ${activeDay === 2
              ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-105'
              : 'text-text-muted hover:text-text hover:bg-white/40'
              }`}
          >
            2. Gün
          </button>
        </motion.div>

        {/* Schedule Grid Container */}
        <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-[#f3f4f6]/45 backdrop-blur-3xl border border-white/60 shadow-xl">
          {/* Header Row (Desktop) */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-white/40 border-b border-white/40 font-heading font-bold text-xs sm:text-sm text-text-muted uppercase tracking-wider">
            <div className="col-span-2 text-center flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>Saat</span>
            </div>
            <div className="col-span-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>Konu</span>
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <User className="w-4 h-4 text-accent" />
              <span>Konuşmacı</span>
            </div>
            <div className="col-span-3 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-cta" />
              <span>Çekiliş Katılımı</span>
            </div>
          </div>

          {/* Animated Schedule Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="divide-y divide-white/40"
            >
              {currentSchedule.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 p-5 sm:p-6 hover:bg-white/40 transition-colors duration-200 items-center"
                >
                  {/* Column 1: SAAT */}
                  <div className="md:col-span-2 flex items-center justify-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>

                  {/* Column 2: KONU */}
                  <div className="md:col-span-4 flex flex-col items-start">
                    <h3 className="font-heading font-semibold text-text text-sm sm:text-base leading-snug">
                      {item.topic}
                    </h3>
                  </div>

                  {/* Column 3: Konuşmacı */}
                  <div className="md:col-span-3 flex flex-col items-start">
                    <span className="font-body font-medium text-xs sm:text-sm text-text">
                      {item.speaker}
                    </span>
                    {item.speakerTitle && (
                      <span className="font-body text-xs text-text-muted">
                        {item.speakerTitle}
                      </span>
                    )}
                  </div>

                  {/* Column 4: Çekiliş Butonu */}
                  <div className="md:col-span-3 flex justify-center items-center mt-2 md:mt-0">
                    <button
                      onClick={() => setSelectedRaffle(item)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cta to-accent text-white font-body font-semibold text-xs leading-normal shadow-md shadow-cta/20 hover:shadow-lg hover:shadow-cta/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center w-full md:w-auto"
                    >
                      <Gift className="w-4 h-4 shrink-0" />
                      <span>Çekiliş Formu</span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Raffle Form Modal */}
      <AnimatePresence>
        {selectedRaffle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-deep/60 backdrop-blur-md"
              onClick={() => setSelectedRaffle(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-accent/20 text-left"
            >
              <button
                onClick={() => setSelectedRaffle(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-text-muted transition-colors"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-text">Başarıyla Kaydolundu!</h3>
                  <p className="text-sm text-text-muted">
                    Çekiliş katılımınız alındı. Oturum sonunda kazananlar açıklanacaktır!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 text-accent font-heading font-bold text-lg">
                    <Sparkles className="w-5 h-5 text-cta" />
                    <h3>Seans Çekiliş Formu</h3>
                  </div>

                  <div className="p-3 rounded-xl bg-accent/5 border border-accent/10 text-xs text-text-muted space-y-1">
                    <p className="font-semibold text-text">{selectedRaffle.topic}</p>
                    <p>{selectedRaffle.speaker} · {selectedRaffle.time}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">Ad Soyad *</label>
                    <input
                      type="text"
                      required
                      placeholder="Adınız Soyadınız"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">E-Posta *</label>
                    <input
                      type="email"
                      required
                      placeholder="ornek@hacettepe.edu.tr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">Telefon (İsteğe Bağlı)</label>
                    <input
                      type="tel"
                      placeholder="05XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cta to-accent text-white font-heading font-bold text-sm shadow-lg shadow-cta/30 hover:opacity-95 transition-all duration-200 mt-2"
                  >
                    Çekilişe Katıl
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
