import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    numeral: '一',
    title: 'Restore',
    description: 'Muscle tension, chronic pain, fatigue',
  },
  {
    numeral: '二',
    title: 'Balance',
    description: 'Nervous system, immunity, hormonal harmony',
  },
  {
    numeral: '三',
    title: 'Renew',
    description: 'Circulation, cellular repair, deep relaxation',
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Watermark rotation on scroll
    if (watermarkRef.current) {
      const wmTween = gsap.to(watermarkRef.current, {
        rotation: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      if (wmTween.scrollTrigger) triggers.push(wmTween.scrollTrigger);
    }

    // Quote reveal
    if (quoteRef.current) {
      const qTween = gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (qTween.scrollTrigger) triggers.push(qTween.scrollTrigger);
    }

    // Columns stagger reveal
    const cols = columnsRef.current?.querySelectorAll('.pillar');
    if (cols) {
      const cTween = gsap.fromTo(
        cols,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: columnsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (cTween.scrollTrigger) triggers.push(cTween.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ backgroundColor: '#0D0A06' }}
    >
      {/* 气 watermark */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-display"
        style={{
          fontSize: 'clamp(300px, 30vw, 500px)',
          color: 'rgba(201, 144, 58, 0.03)',
          lineHeight: 1,
        }}
      >
        气
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Quote */}
        <div ref={quoteRef} className="text-center mb-20 lg:mb-28 opacity-0">
          <blockquote
            className="font-subhead text-chi-parchment italic"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            "Qi flows where attention goes."
          </blockquote>
        </div>

        {/* Three pillars */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
        >
          {pillars.map((pillar) => (
            <div key={pillar.title} className="pillar relative text-center opacity-0">
              {/* Background numeral */}
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 font-display pointer-events-none select-none"
                style={{
                  fontSize: '96px',
                  color: '#B8311F',
                  opacity: 0.07,
                  lineHeight: 1,
                  transform: 'translateX(-50%) translateY(-30%)',
                }}
              >
                {pillar.numeral}
              </span>

              {/* Foreground numeral */}
              <span
                className="block font-display text-chi-cinnabar mb-4"
                style={{ fontSize: '28px', lineHeight: 1 }}
              >
                {pillar.numeral}
              </span>

              <h3
                className="font-display text-chi-parchment mb-3"
                style={{ fontSize: '24px', letterSpacing: '-0.01em' }}
              >
                {pillar.title}
              </h3>

              <p
                className="font-body text-chi-mist"
                style={{ fontSize: '15px', lineHeight: 1.8 }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
