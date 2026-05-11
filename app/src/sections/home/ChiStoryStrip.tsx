import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ChiStoryStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.7,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={stripRef}
      className="relative py-16 lg:py-20 opacity-0"
      style={{ backgroundColor: '#0D0A06' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Left: Year */}
          <div className="lg:w-[3/12] text-center lg:text-left">
            <span
              className="font-display text-chi-parchment"
              style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 0.88, letterSpacing: '-0.03em' }}
            >
              Since 2004
            </span>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-16 bg-chi-mist opacity-30 mx-12" />
          <div className="lg:hidden w-16 h-px bg-chi-mist opacity-30" />

          {/* Right: Copy */}
          <div className="lg:flex-1 text-center lg:text-left">
            <p
              className="font-body text-chi-mist"
              style={{ fontSize: '16px', lineHeight: 1.7 }}
            >
              20+ years of trusted wellness. Qualified practitioners. A philosophy that works.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
