import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import InkCanvas from '@/components/InkCanvas';

export default function HeroSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance animations after preloader
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        lineRef.current,
        { width: '0%' },
        { width: '100%', duration: 1.2, ease: 'power2.inOut' },
        '-=0.6'
      )
      .fromTo(
        sublineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden" style={{ backgroundColor: '#0D0A06' }}>
      {/* Diagonal split layout */}
      <div className="relative min-h-[100dvh] w-full flex flex-col lg:flex-row">
        {/* Left panel (65%) - WebGL ink canvas */}
        <div
          className="relative w-full lg:w-[65%] min-h-[50vh] lg:min-h-full overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
          }}
        >
          <InkCanvas />
        </div>

        {/* Right panel (35%) - Content */}
        <div
          className="relative w-full lg:w-[45%] lg:-ml-[10%] flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0"
          style={{ backgroundColor: '#0D0A06' }}
        >
          {/* Headline */}
          <div ref={headlineRef} className="opacity-0">
            <h1
              className="font-display text-chi-parchment"
              style={{
                fontSize: 'clamp(48px, 6vw, 96px)',
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                fontWeight: 400,
              }}
            >
              Chi Link
            </h1>
            <h2
              className="font-display text-chi-parchment mt-4"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 56px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                fontWeight: 400,
              }}
            >
              Twenty years
              <br />
              of restoring flow.
            </h2>
          </div>

          {/* Cinnabar line */}
          <div
            ref={lineRef}
            className="mt-8 h-px bg-chi-cinnabar"
            style={{ width: '0%' }}
          />

          {/* Subline */}
          <p
            ref={sublineRef}
            className="mt-6 font-body text-chi-mist opacity-0"
            style={{ fontSize: '14px', letterSpacing: '0.02em' }}
          >
            23 locations · Brisbane · Gold Coast · Sunshine Coast · Sydney
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4 opacity-0">
            <a
              href="/locations/anzac-square"
              className="inline-flex items-center px-6 py-3 bg-chi-cinnabar text-chi-parchment font-body text-sm font-medium rounded-chi hover:bg-chi-parchment hover:text-chi-ink transition-all duration-300"
            >
              Find My Location
            </a>
            <a
              href="/treatments"
              className="inline-flex items-center px-6 py-3 border border-chi-cinnabar text-chi-cinnabar font-body text-sm font-medium rounded-chi hover:bg-chi-cinnabar hover:text-chi-parchment transition-all duration-300"
            >
              Explore Treatments
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-[67%] lg:translate-x-0 flex flex-col items-center gap-3 opacity-0"
      >
        <span
          className="label-style text-chi-cinnabar"
          style={{
            writingMode: 'vertical-rl',
            fontSize: '10px',
            letterSpacing: '0.15em',
          }}
        >
          SCROLL TO DISCOVER
        </span>
        <div className="w-px bg-chi-cinnabar animate-breathe" />
      </div>
    </section>
  );
}
