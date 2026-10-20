import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { EffectCoverflow, Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight, RotateCcw, Lock, Sparkles, X } from 'lucide-react';
import styles from './Curved3DCarousel.module.css';

interface SlideItem {
  index: number;
  title: string;
  image: string;
  language: string;
  creator: string;
  isCLanguage: boolean;
}

const SLIDES_DATA: SlideItem[] = [
  {
    index: 0,
    title: '01 • C Language • Dennis Ritchie',
    image: '/carousel/slide_1.jpg',
    language: 'C Language',
    creator: 'Dennis Ritchie (Bell Labs)',
    isCLanguage: true,
  },
  {
    index: 1,
    title: '02 • Python • Guido van Rossum',
    image: '/carousel/slide_2.jpg',
    language: 'Python',
    creator: 'Guido van Rossum (CWI)',
    isCLanguage: false,
  },
  {
    index: 2,
    title: '03 • Java • James Gosling',
    image: '/carousel/slide_3.jpg',
    language: 'Java',
    creator: 'James Gosling (Sun Microsystems)',
    isCLanguage: false,
  },
  {
    index: 3,
    title: '04 • C++ • Bjarne Stroustrup',
    image: '/carousel/slide_4.jpg',
    language: 'C++',
    creator: 'Bjarne Stroustrup (Bell Labs)',
    isCLanguage: false,
  },
];

interface Curved3DCarouselProps {
  onEnterCLanguage: () => void;
  onBackToIntro?: () => void;
}

export default function Curved3DCarousel({
  onEnterCLanguage,
  onBackToIntro,
}: Curved3DCarouselProps) {
  const swiperContainerRef = useRef<HTMLDivElement | null>(null);
  const swiperInstanceRef = useRef<Swiper | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const onEnterCLanguageRef = useRef(onEnterCLanguage);
  onEnterCLanguageRef.current = onEnterCLanguage;

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const showToastRef = useRef(showToast);
  showToastRef.current = showToast;

  useEffect(() => {
    if (!swiperContainerRef.current) return;

    const swiper = new Swiper(swiperContainerRef.current, {
      modules: [EffectCoverflow, Navigation, Keyboard],
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      speed: 700,
      slideToClickedSlide: true,
      coverflowEffect: {
        rotate: 0,
        stretch: -80,
        depth: 300,
        scale: 0.86,
        modifier: 1,
        slideShadows: false,
      },
      navigation: {
        nextEl: '#carouselNextBtn',
        prevEl: '#carouselPrevBtn',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      on: {
        init(instance) {
          const logicalIdx =
            ((instance.realIndex % SLIDES_DATA.length) + SLIDES_DATA.length) %
            SLIDES_DATA.length;
          setActiveSlide(logicalIdx);
        },
        slideChange(instance) {
          const logicalIdx =
            ((instance.realIndex % SLIDES_DATA.length) + SLIDES_DATA.length) %
            SLIDES_DATA.length;
          setActiveSlide(logicalIdx);
        },
        tap(instance, event) {
          const target = event.target as HTMLElement | null;
          if (!target) return;
          if (target.closest(`.${styles.cIconHotspot}`) || target.id === 'cIconHotspotBtn') {
            onEnterCLanguageRef.current();
            return;
          }
          const clickedSlide = instance.clickedSlide;
          if (!clickedSlide) return;
          const slideIdxAttr = clickedSlide.getAttribute('data-slide-index');
          const slideIdx = slideIdxAttr !== null ? parseInt(slideIdxAttr, 10) : instance.realIndex % SLIDES_DATA.length;
          const slide = SLIDES_DATA[slideIdx];
          if (slide) {
            if (slide.isCLanguage) {
              onEnterCLanguageRef.current();
            } else {
              showToastRef.current(`Future Development • ${slide.language} track is currently under development.`);
            }
          }
        },
      },
    });

    swiperInstanceRef.current = swiper;

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const goToSlide = (idx: number) => {
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.slideToLoop(idx, 700);
    }
  };

  const handleSlideClick = (slide: SlideItem) => {
    if (slide.isCLanguage) {
      // User tapped on C slide -> Enter DEVORA landing page!
      onEnterCLanguage();
    } else {
      // Non-C slide -> write "Future Development"
      showToast(`Future Development • ${slide.language} track is currently under development.`);
    }
  };

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(`.${styles.cIconHotspot}`) || target.id === 'cIconHotspotBtn') {
      e.stopPropagation();
      onEnterCLanguageRef.current();
      return;
    }
    const slideEl = target.closest('.swiper-slide') as HTMLElement | null;
    if (!slideEl) return;
    const slideIdxAttr = slideEl.getAttribute('data-slide-index');
    const slideIdx = slideIdxAttr !== null ? parseInt(slideIdxAttr, 10) : activeSlide;
    const slide = SLIDES_DATA[slideIdx] || SLIDES_DATA[activeSlide];
    if (slide) {
      if (slide.isCLanguage) {
        onEnterCLanguageRef.current();
      } else {
        showToastRef.current(`Future Development • ${slide.language} track is currently under development.`);
      }
    }
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Top Bar with Return Action and Brand Title */}
      <div className={styles.topBar}>
        {onBackToIntro && (
          <button
            type="button"
            onClick={onBackToIntro}
            className={styles.backIntroBtn}
            title="Replay intro video"
          >
            <RotateCcw size={14} />
            <span>Intro Video</span>
          </button>
        )}
        <div className={styles.brandWatermark}>
          DEVORA // PIONEERS OF COMPUTING
        </div>
      </div>

      <main className={styles.mainStage}>
        {/* Header Bar */}
        <header className={styles.headerBar}>
          <span className={styles.sectionTitle}>
            Pioneers of Computing
          </span>
          <span className={styles.slideCounter}>
            <strong className={styles.slideCounterCurrent}>
              {String(activeSlide + 1).padStart(2, '0')}
            </strong>{' '}
            / 04
          </span>
        </header>

        {/* Action Instruction */}
        <div className={styles.instructionHint}>
          <span className={styles.hintPulseDot} />
          {activeSlide === 0
            ? 'Tap the C Language slide or C icon to enter DEVORA'
            : 'Swipe or navigate to C Language to enter DEVORA'}
        </div>

        {/* Swiper 3D Coverflow Container */}
        <div
          ref={swiperContainerRef}
          onClick={handleStageClick}
          className={`swiper ${styles.swiperStage}`}
        >
          <div className="swiper-wrapper items-center">
            {/* Render 2 full sets for seamless infinite 3D loop */}
            {[...SLIDES_DATA, ...SLIDES_DATA].map((slide, i) => {
              const isCurrentActive = activeSlide === slide.index;

              return (
                <div
                  key={`${slide.index}-${i}`}
                  data-slide-index={slide.index}
                  onClick={() => handleSlideClick(slide)}
                  className={`swiper-slide ${styles.slideItem} ${
                    isCurrentActive ? styles.slideActive : ''
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={styles.slideImage}
                    loading={i < 4 ? 'eager' : 'lazy'}
                  />

                  {/* Title Badge */}
                  <div className={styles.titleBadge}>
                    {slide.title}
                  </div>

                  {/* Status Badge: Active vs Future Development */}
                  {slide.isCLanguage ? (
                    <div className={styles.activeBadge}>
                      <Sparkles size={12} />
                      <span>Active • Click to Enter DEVORA</span>
                    </div>
                  ) : (
                    <div className={styles.futureBadge}>
                      <Lock size={12} />
                      <span>Future Development</span>
                    </div>
                  )}

                  {/* Interactive Holographic C Icon Beacon (Visible on C slide) */}
                  {slide.isCLanguage && (
                    <div
                      id="cIconHotspotBtn"
                      className={styles.cIconHotspot}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEnterCLanguage();
                      }}
                      title="Tap C Icon to Enter DEVORA"
                    >
                      <div className={styles.cIconBeacon} />
                      <div className={styles.cIconTooltip}>
                        Tap C Icon to Enter
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Center Navigation Controls */}
        <nav className={styles.navRow} aria-label="Carousel Navigation">
          <button
            type="button"
            id="carouselPrevBtn"
            className={styles.navArrowBtn}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <div className={styles.dotsWrap}>
            {SLIDES_DATA.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`${styles.dotBtn} ${
                  activeSlide === idx ? styles.dotActive : styles.dotInactive
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            id="carouselNextBtn"
            className={styles.navArrowBtn}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </nav>
      </main>

      {/* Toast Notification when non-C slide is clicked */}
      {toastMessage && (
        <div className={styles.toastNotice} role="alert">
          <Lock size={16} />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className={styles.toastCloseBtn}
            aria-label="Dismiss message"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
