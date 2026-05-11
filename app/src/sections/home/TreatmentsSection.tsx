import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const treatments = [
  {
    image: '/images/treatment-acupuncture.jpg',
    name: 'Acupuncture',
    benefit: 'Restore flow to blocked pathways',
    duration: '30 – 60 min',
    price: 'From $65',
  },
  {
    image: '/images/treatment-massage.jpg',
    name: 'Deep Tissue Massage',
    benefit: 'Release weeks of carried tension',
    duration: '30 – 90 min',
    price: 'From $55',
  },
  {
    image: '/images/treatment-headspa.jpg',
    name: 'Head Spa Therapy',
    benefit: 'Calm the mind, restore clarity',
    duration: '45 – 60 min',
    price: 'From $75',
  },
  {
    image: '/images/treatment-cupping.jpg',
    name: 'Cupping Therapy',
    benefit: 'Draw out stagnation, improve circulation',
    duration: '20 – 45 min',
    price: 'From $45',
  },
  {
    image: '/images/treatment-herbal.jpg',
    name: 'Herbal Medicine',
    benefit: 'Support healing from within',
    duration: 'Consultation',
    price: 'From $50',
  },
  {
    image: '/images/treatment-reflexology.jpg',
    name: 'Reflexology',
    benefit: 'Balance through the feet',
    duration: '30 – 60 min',
    price: 'From $55',
  },
];

export default function TreatmentsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const scrollWidth = track.scrollWidth - window.innerWidth;

    const triggers: ScrollTrigger[] = [];

    // Header reveal
    if (headerRef.current) {
      const hTween = gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (hTween.scrollTrigger) triggers.push(hTween.scrollTrigger);
    }

    // Check if mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Desktop: pinned horizontal scroll
    const tween = gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.5,
        end: () => `+=${scrollWidth}`,
      },
    });

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-0 lg:min-h-[100dvh]"
      style={{ backgroundColor: '#F5F0E3' }}
    >
      {/* Section header */}
      <div ref={headerRef} className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-8 lg:pb-12 opacity-0">
        <span className="label-style text-chi-cinnabar block mb-3">
          OUR TREATMENTS
        </span>
        <h2
          className="font-display text-chi-ink"
          style={{
            fontSize: 'clamp(36px, 4vw, 72px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
          }}
        >
          The path to wellness
        </h2>
      </div>

      {/* Card track */}
      <div
        ref={trackRef}
        className="treatment-track flex gap-6 lg:gap-8 px-6 lg:px-10 pb-16 lg:pb-0 overflow-x-auto lg:overflow-visible snap-x snap-mandatory"
        style={{
          width: 'fit-content',
        }}
      >
        {treatments.map((treatment, i) => (
          <div
            key={i}
            className="treatment-card flex-shrink-0 snap-start group relative overflow-hidden rounded-chi transition-all duration-500"
            style={{
              width: '320px',
              height: '480px',
              backgroundColor: '#EBE5D6',
            }}
          >
            {/* Cinnabar left bar on hover */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-chi-cinnabar opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            />

            {/* Image */}
            <div className="relative h-[55%] overflow-hidden">
              <img
                src={treatment.image}
                alt={treatment.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:saturate-75"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-[45%]">
              <h3
                className="font-display text-chi-ink mb-2"
                style={{ fontSize: '28px', letterSpacing: '-0.01em' }}
              >
                {treatment.name}
              </h3>

              <p
                className="font-body text-chi-smoke italic mb-4"
                style={{ fontSize: '15px', lineHeight: 1.6 }}
              >
                {treatment.benefit}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex gap-2">
                  <span
                    className="px-3 py-1 rounded-full font-body text-xs"
                    style={{ backgroundColor: '#CEC5B0', color: '#1A1208' }}
                  >
                    {treatment.duration}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full font-body text-xs"
                    style={{ backgroundColor: '#CEC5B0', color: '#1A1208' }}
                  >
                    {treatment.price}
                  </span>
                </div>

                <a
                  href="https://bookrelax.com.au/booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-chi-cinnabar text-sm font-medium hover:underline"
                >
                  Book This →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile scroll hint */}
      <div className="lg:hidden flex justify-center pb-8">
        <div className="flex gap-1.5">
          {treatments.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-chi-mist" />
          ))}
        </div>
      </div>
    </section>
  );
}
