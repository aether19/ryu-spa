import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Location {
  id: string;
  name: string;
  address: string;
  cx: number;
  cy: number;
  rating: string;
}

const locations: Location[] = [
  { id: 'anzac-square', name: 'Anzac Square', address: 'Brisbane CBD, QLD', cx: 415, cy: 195, rating: '4.9' },
  { id: 'queens-plaza', name: 'Queens Plaza', address: 'Brisbane CBD, QLD', cx: 420, cy: 188, rating: '4.8' },
  { id: 'westfield-garden', name: 'Westfield Garden City', address: 'Upper Mount Gravatt, QLD', cx: 425, cy: 205, rating: '4.9' },
  { id: 'robina', name: 'Robina Town Centre', address: 'Robina, QLD', cx: 430, cy: 230, rating: '4.7' },
  { id: 'pacific-fair', name: 'Pacific Fair', address: 'Broadbeach, QLD', cx: 432, cy: 235, rating: '4.8' },
  { id: 'maroochydore', name: 'Sunshine Plaza', address: 'Maroochydore, QLD', cx: 428, cy: 170, rating: '4.9' },
  { id: 'sydney-cbd', name: 'Westfield Sydney', address: 'Sydney CBD, NSW', cx: 480, cy: 310, rating: '4.8' },
  { id: 'chatswood', name: 'Chatswood Chase', address: 'Chatswood, NSW', cx: 485, cy: 300, rating: '4.7' },
];

export default function InkMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);

  useEffect(() => {
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
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (hTween.scrollTrigger) triggers.push(hTween.scrollTrigger);
    }

    // Animate dots in
    const dots = sectionRef.current?.querySelectorAll('.location-dot');
    if (dots) {
      const dTween = gsap.fromTo(
        dots,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (dTween.scrollTrigger) triggers.push(dTween.scrollTrigger);
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
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16 opacity-0">
          <span className="label-style text-chi-cinnabar block mb-3">
            FIND YOUR NEAREST CLINIC
          </span>
          <h2
            className="font-display text-chi-parchment"
            style={{
              fontSize: 'clamp(36px, 4vw, 72px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            23 locations, one philosophy
          </h2>
        </div>

        {/* SVG Map - Desktop only */}
        <div className="hidden lg:block relative w-full" style={{ paddingBottom: '50%' }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 600 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Coastline - simplified Eastern Australia */}
            <path
              d="M50 320 
                 Q 60 300, 80 290
                 Q 100 280, 120 270
                 Q 140 260, 160 250
                 Q 180 240, 200 230
                 Q 220 220, 240 210
                 Q 260 200, 280 195
                 Q 300 190, 320 185
                 Q 340 180, 360 175
                 Q 380 170, 400 168
                 Q 420 166, 440 165
                 Q 460 164, 480 168
                 Q 500 172, 510 180
                 Q 520 188, 525 200
                 Q 530 212, 535 225
                 Q 540 238, 545 250
                 Q 550 262, 555 275
                 Q 560 288, 565 300
                 Q 570 312, 575 325
                 Q 580 338, 585 350"
              stroke="#C9903A"
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
            />

            {/* Queensland coastline detail */}
            <path
              d="M280 195
                 Q 300 185, 320 175
                 Q 340 165, 360 155
                 Q 380 145, 400 140
                 Q 420 135, 440 138
                 Q 460 141, 470 150
                 Q 480 159, 485 170
                 Q 490 181, 485 195
                 Q 480 209, 470 220"
              stroke="#C9903A"
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
            />

            {/* NSW coastline */}
            <path
              d="M470 220
                 Q 480 235, 490 250
                 Q 500 265, 510 280
                 Q 520 295, 530 310
                 Q 540 325, 550 340"
              stroke="#C9903A"
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
            />

            {/* State labels */}
            <text x="350" y="250" fill="#CEC5B0" fontSize="10" fontFamily="Inter" opacity="0.5">QLD</text>
            <text x="510" y="280" fill="#CEC5B0" fontSize="10" fontFamily="Inter" opacity="0.5">NSW</text>

            {/* Location dots */}
            {locations.map((loc) => (
              <g
                key={loc.id}
                className="location-dot cursor-pointer"
                style={{ transformOrigin: `${loc.cx}px ${loc.cy}px` }}
                onMouseEnter={() => setActiveLocation(loc)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                {/* Pulse ring */}
                <circle
                  cx={loc.cx}
                  cy={loc.cy}
                  r="8"
                  fill="none"
                  stroke="#B8311F"
                  strokeWidth="0.5"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="6;10;6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Dot */}
                <circle
                  cx={loc.cx}
                  cy={loc.cy}
                  r="4"
                  fill="#B8311F"
                  className="transition-all duration-300"
                  style={{
                    filter: activeLocation?.id === loc.id ? 'brightness(1.3)' : 'none',
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Location card on hover */}
          {activeLocation && (
            <div
              className="absolute z-10 p-5 rounded-chi transition-all duration-300"
              style={{
                backgroundColor: '#1A1208',
                border: '1px solid rgba(201, 144, 58, 0.2)',
                left: `${(activeLocation.cx / 600) * 100}%`,
                top: `${(activeLocation.cy / 350) * 100}%`,
                transform: 'translate(-50%, -120%)',
                minWidth: '220px',
              }}
            >
              <h4 className="font-display text-chi-parchment text-lg mb-1">
                {activeLocation.name}
              </h4>
              <p className="font-body text-chi-mist text-sm mb-3">
                {activeLocation.address}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="#C9903A">
                    <path d="M8 0l2.47 5.01L16 5.81l-4 3.9.94 5.5L8 12.88l-4.94 2.6.94-5.5-4-3.9 5.53-.8z" />
                  </svg>
                  <span className="font-body text-chi-gold text-sm">{activeLocation.rating}</span>
                </div>
                <a
                  href={`https://bookrelax.com.au/booking?clinic=${activeLocation.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-chi-cinnabar text-sm hover:underline"
                >
                  Book →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: tab-filtered list */}
        <div className="lg:hidden">
          <MobileLocationList />
        </div>

        {/* View full list link */}
        <div className="text-center mt-10">
          <a
            href="/locations/anzac-square"
            className="font-body text-chi-smoke text-sm hover:text-chi-cinnabar transition-colors duration-300"
          >
            All 23 locations · View full list →
          </a>
        </div>
      </div>
    </section>
  );
}

function MobileLocationList() {
  const [activeTab, setActiveTab] = useState('brisbane');

  const tabs = [
    { key: 'brisbane', label: 'Brisbane' },
    { key: 'gold-coast', label: 'Gold Coast' },
    { key: 'sunshine-coast', label: 'Sunshine Coast' },
    { key: 'sydney', label: 'Sydney' },
  ];

  const filteredLocations = locations.filter((loc) => {
    if (activeTab === 'brisbane') return loc.address.includes('Brisbane') || loc.address.includes('Mount Gravatt');
    if (activeTab === 'gold-coast') return loc.address.includes('Gold Coast') || loc.address.includes('Robina') || loc.address.includes('Broadbeach');
    if (activeTab === 'sunshine-coast') return loc.address.includes('Sunshine') || loc.address.includes('Maroochydore');
    if (activeTab === 'sydney') return loc.address.includes('Sydney') || loc.address.includes('Chatswood');
    return true;
  });

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-2 rounded-chi font-body text-sm whitespace-nowrap transition-all duration-300"
            style={{
              backgroundColor: activeTab === tab.key ? '#B8311F' : 'transparent',
              color: activeTab === tab.key ? '#F5F0E3' : '#8C8478',
              border: activeTab === tab.key ? 'none' : '1px solid #CEC5B0',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Location cards */}
      <div className="space-y-3">
        {filteredLocations.map((loc) => (
          <div
            key={loc.id}
            className="flex items-center justify-between p-4 rounded-chi"
            style={{ backgroundColor: '#1A1208' }}
          >
            <div>
              <h4 className="font-display text-chi-parchment text-base">{loc.name}</h4>
              <p className="font-body text-chi-smoke text-sm">{loc.address}</p>
            </div>
            <a
              href={`https://bookrelax.com.au/booking?clinic=${loc.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-chi-cinnabar text-chi-parchment font-body text-sm rounded-chi"
            >
              Book
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
