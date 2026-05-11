import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GiftCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
  }, []);

  return (
    <section
      id="gift-cards"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#9A6B2A' }}
    >
      <div
        ref={contentRef}
        className="max-w-[1280px] mx-auto px-6 lg:px-10 opacity-0"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="label-style text-chi-parchment opacity-60 block mb-4">
              GIFT CARDS
            </span>
            <h2
              className="font-display text-white mb-6"
              style={{
                fontSize: 'clamp(36px, 4vw, 72px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
              }}
            >
              Give the gift of flow.
            </h2>
            <p
              className="font-body text-white opacity-80 mb-8"
              style={{ fontSize: '17px', lineHeight: 1.8 }}
            >
              E-Vouchers starting from $40. Share the experience of restored energy
              with someone you care about.
            </p>
            <a
              href="https://bookrelax.com.au/gift-cards"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 bg-chi-cinnabar text-chi-parchment font-body text-sm font-medium rounded-chi hover:bg-chi-parchment hover:text-chi-ink transition-all duration-300"
            >
              Purchase Gift Card
            </a>
          </div>

          {/* Gift card illustration */}
          <div className="flex-shrink-0 w-[280px] lg:w-[360px]">
            <img
              src="/images/gift-card.png"
              alt="Chi Link Gift Card"
              className="w-full h-auto"
              style={{
                filter: 'brightness(0) invert(1)',
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
