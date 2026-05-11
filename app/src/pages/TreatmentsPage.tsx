import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const treatments = [
  {
    image: '/images/treatment-acupuncture.jpg',
    name: 'Acupuncture',
    description: 'Restore flow to blocked pathways. Fine needles stimulate key points to rebalance your energy.',
    duration: '30 – 60 min',
    price: 'From $65',
    regions: ['head', 'neck', 'back', 'arms', 'legs'],
  },
  {
    image: '/images/treatment-massage.jpg',
    name: 'Deep Tissue Massage',
    description: 'Release weeks of carried tension. Targeted pressure reaches deep muscle layers.',
    duration: '30 – 90 min',
    price: 'From $55',
    regions: ['neck', 'back', 'shoulders', 'legs'],
  },
  {
    image: '/images/treatment-headspa.jpg',
    name: 'Head Spa Therapy',
    description: 'Calm the mind, restore clarity. A deeply relaxing scalp and head treatment.',
    duration: '45 – 60 min',
    price: 'From $75',
    regions: ['head'],
  },
  {
    image: '/images/treatment-cupping.jpg',
    name: 'Cupping Therapy',
    description: 'Draw out stagnation, improve circulation. Ancient technique for modern wellness.',
    duration: '20 – 45 min',
    price: 'From $45',
    regions: ['back', 'shoulders'],
  },
  {
    image: '/images/treatment-herbal.jpg',
    name: 'Herbal Medicine',
    description: 'Support healing from within. Personalised herbal formulations for your constitution.',
    duration: 'Consultation',
    price: 'From $50',
    regions: ['internal'],
  },
  {
    image: '/images/treatment-reflexology.jpg',
    name: 'Reflexology',
    description: 'Balance through the feet. Pressure point therapy that connects to your whole body.',
    duration: '30 – 60 min',
    price: 'From $55',
    regions: ['feet'],
  },
];

const bodyRegions = [
  { id: 'head', label: 'Head', cx: 100, cy: 40, r: 25 },
  { id: 'neck', label: 'Neck', cx: 100, cy: 75, r: 12 },
  { id: 'shoulders', label: 'Shoulders', cx: 100, cy: 95, r: 30 },
  { id: 'back', label: 'Back', cx: 100, cy: 140, r: 35 },
  { id: 'arms', label: 'Arms', cx: 55, cy: 130, r: 20 },
  { id: 'legs', label: 'Legs', cx: 100, cy: 220, r: 30 },
  { id: 'feet', label: 'Feet', cx: 100, cy: 310, r: 20 },
];

export default function TreatmentsPage() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<{ x: number; y: number; treatment: string } | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const triggers: ScrollTrigger[] = [];

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
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (hTween.scrollTrigger) triggers.push(hTween.scrollTrigger);
    }

    const cards = cardsRef.current?.querySelectorAll('.treatment-card');
    if (cards) {
      const cTween = gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
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

  const getTreatmentsForRegion = (regionId: string) => {
    return treatments.filter((t) => t.regions.includes(regionId));
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24" style={{ backgroundColor: '#0D0A06' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div ref={headerRef} className="text-center opacity-0">
            <span className="label-style text-chi-cinnabar block mb-4">
              OUR TREATMENTS
            </span>
            <h1
              className="font-display text-chi-parchment mb-6"
              style={{
                fontSize: 'clamp(40px, 5vw, 80px)',
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
              }}
            >
              The Body Map
            </h1>
            <p className="font-body text-chi-mist max-w-xl mx-auto" style={{ fontSize: '17px', lineHeight: 1.8 }}>
              Explore our treatments by body region. Each therapy is designed to restore flow where you need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Body Map */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F5F0E3' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* SVG Body Silhouette */}
            <div className="relative flex-shrink-0">
              <svg
                width="200"
                height="380"
                viewBox="0 0 200 380"
                className="mx-auto"
              >
                {/* Simple body silhouette outline */}
                <ellipse
                  cx="100"
                  cy="45"
                  rx="28"
                  ry="32"
                  fill="none"
                  stroke="#1A1208"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
                {/* Neck */}
                <path
                  d="M85 75 Q 100 70, 115 75 L 120 100 Q 100 95, 80 100 Z"
                  fill="none"
                  stroke="#1A1208"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
                {/* Torso */}
                <path
                  d="M80 100 Q 60 110, 55 140 L 50 200 Q 100 210, 150 200 L 145 140 Q 140 110, 120 100 Z"
                  fill="none"
                  stroke="#1A1208"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
                {/* Arms */}
                <path
                  d="M55 120 Q 30 140, 25 180 Q 20 200, 30 220"
                  fill="none"
                  stroke="#1A1208"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
                <path
                  d="M145 120 Q 170 140, 175 180 Q 180 200, 170 220"
                  fill="none"
                  stroke="#1A1208"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
                {/* Legs */}
                <path
                  d="M70 205 Q 65 250, 60 300 Q 55 340, 65 370"
                  fill="none"
                  stroke="#1A1208"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
                <path
                  d="M130 205 Q 135 250, 140 300 Q 145 340, 135 370"
                  fill="none"
                  stroke="#1A1208"
                  strokeWidth="0.8"
                  opacity="0.6"
                />

                {/* Interactive regions */}
                {bodyRegions.map((region) => {
                  const matchingTreatments = getTreatmentsForRegion(region.id);
                  const isHovered = hoveredRegion === region.id;

                  return (
                    <g
                      key={region.id}
                      className="cursor-pointer"
                      onMouseEnter={(e) => {
                        setHoveredRegion(region.id);
                        if (matchingTreatments.length > 0) {
                          const rect = (e.target as SVGElement).getBoundingClientRect();
                          setActiveTooltip({
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                            treatment: matchingTreatments.map((t) => t.name).join(', '),
                          });
                        }
                      }}
                      onMouseLeave={() => {
                        setHoveredRegion(null);
                        setActiveTooltip(null);
                      }}
                    >
                      <circle
                        cx={region.cx}
                        cy={region.cy}
                        r={region.r}
                        fill={isHovered ? 'rgba(184, 49, 31, 0.15)' : 'transparent'}
                        stroke={isHovered ? '#B8311F' : 'transparent'}
                        strokeWidth="1"
                        className="transition-all duration-300"
                      />
                      {isHovered && (
                        <text
                          x={region.cx}
                          y={region.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#B8311F"
                          fontSize="10"
                          fontFamily="Inter"
                        >
                          {region.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip */}
              {activeTooltip && (
                <div
                  className="fixed z-50 px-4 py-2 rounded-chi pointer-events-none"
                  style={{
                    backgroundColor: '#1A1208',
                    border: '1px solid rgba(201, 144, 58, 0.2)',
                    left: activeTooltip.x,
                    top: activeTooltip.y - 50,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <p className="font-body text-chi-parchment text-xs whitespace-nowrap">
                    {activeTooltip.treatment}
                  </p>
                </div>
              )}
            </div>

            {/* Region legend */}
            <div className="flex-1">
              <h3 className="font-display text-chi-ink text-2xl mb-6">Hover to explore</h3>
              <p className="font-body text-chi-smoke mb-8" style={{ lineHeight: 1.8 }}>
                Move your cursor over different body regions on the silhouette to discover which treatments target each area. Every treatment is designed to restore flow and balance.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {bodyRegions.map((region) => {
                  const count = getTreatmentsForRegion(region.id).length;
                  return (
                    <div
                      key={region.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-chi transition-all duration-300"
                      style={{
                        backgroundColor: hoveredRegion === region.id ? 'rgba(184, 49, 31, 0.08)' : '#EBE5D6',
                      }}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                    >
                      <span className="w-2 h-2 rounded-full bg-chi-cinnabar" />
                      <span className="font-body text-chi-ink text-sm">{region.label}</span>
                      <span className="font-body text-chi-smoke text-xs ml-auto">{count} treatments</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Cards Grid */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#EBE5D6' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <h2
            className="font-display text-chi-ink mb-10"
            style={{ fontSize: 'clamp(28px, 3vw, 48px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            All treatments
          </h2>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {treatments.map((treatment, i) => (
              <div
                key={i}
                className="treatment-card group rounded-chi overflow-hidden opacity-0 transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: '#F5F0E3' }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={treatment.image}
                    alt={treatment.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:saturate-75"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-chi-ink text-xl mb-2">{treatment.name}</h3>
                  <p className="font-body text-chi-smoke text-sm mb-4" style={{ lineHeight: 1.7 }}>
                    {treatment.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span
                        className="px-3 py-1 rounded-full font-body text-xs"
                        style={{ backgroundColor: '#EBE5D6', color: '#1A1208' }}
                      >
                        {treatment.duration}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full font-body text-xs"
                        style={{ backgroundColor: '#EBE5D6', color: '#1A1208' }}
                      >
                        {treatment.price}
                      </span>
                    </div>
                    <a
                      href="https://bookrelax.com.au/booking"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-chi-cinnabar text-sm hover:underline"
                    >
                      Book →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
