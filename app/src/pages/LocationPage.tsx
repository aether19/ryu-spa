import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locationData: Record<string, {
  name: string;
  suburb: string;
  address: string;
  phone: string;
  hours: { monFri: string; satSun: string };
  services: string[];
  rating: string;
  reviewCount: string;
}> = {
  'anzac-square': {
    name: 'Chi Link Anzac Square',
    suburb: 'Anzac Square',
    address: 'Shop 12, Anzac Square Arcade, 200 Edward St, Brisbane QLD 4000',
    phone: '(07) 3018 0001',
    hours: { monFri: '9:00 AM – 6:00 PM', satSun: '10:00 AM – 5:00 PM' },
    services: ['Acupuncture', 'Deep Tissue Massage', 'Cupping Therapy', 'Head Spa', 'Reflexology'],
    rating: '4.9',
    reviewCount: '312',
  },
};

const defaultLocation = locationData['anzac-square'];

const sampleReviews = [
  { name: 'Amanda P.', text: 'The Anzac Square location is beautiful and the staff are incredibly skilled. My acupuncture sessions here have made a huge difference.', rating: 5, date: '2 weeks ago' },
  { name: 'Robert K.', text: 'Convenient location in the CBD. I book my massages during lunch breaks. Always leave feeling rejuvenated.', rating: 5, date: '1 month ago' },
  { name: 'Jessica M.', text: 'Professional practitioners who really listen. The head spa treatment is my favourite treat after a stressful week.', rating: 5, date: '3 weeks ago' },
];

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = locationData[slug || ''] || defaultLocation;

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const triggers: ScrollTrigger[] = [];

    // Hero content reveal
    if (contentRef.current) {
      const children = contentRef.current.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.3,
        }
      );
    }

    // Sticky bar on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile && stickyBarRef.current) {
      const sTween = gsap.fromTo(
        stickyBarRef.current,
        { y: 100 },
        {
          y: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        }
      );
      if (sTween.scrollTrigger) triggers.push(sTween.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [slug]);

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] lg:min-h-[90vh] flex flex-col lg:flex-row"
      >
        {/* Left panel - details */}
        <div
          className="w-full lg:w-[45%] flex flex-col justify-center px-6 lg:px-16 py-20 lg:py-0 order-2 lg:order-1"
          style={{ backgroundColor: '#F5F0E3' }}
        >
          <div ref={contentRef}>
            <span className="label-style text-chi-cinnabar block mb-4 opacity-0">
              CHI LINK LOCATION
            </span>

            <h1
              className="font-display text-chi-ink mb-4 opacity-0"
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
              }}
            >
              {location.suburb}
            </h1>

            <p className="font-body text-chi-smoke text-sm mb-6 opacity-0">
              {location.address}
            </p>

            {/* Hours */}
            <div className="mb-6 opacity-0">
              <h3 className="label-style text-chi-ink mb-2">OPENING HOURS</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 font-body text-sm text-chi-smoke">
                <span>Mon – Fri</span>
                <span>{location.hours.monFri}</span>
                <span>Sat – Sun</span>
                <span>{location.hours.satSun}</span>
              </div>
            </div>

            {/* CTA */}
            <a
              href={`https://bookrelax.com.au/booking?clinic=${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-chi-cinnabar text-chi-parchment font-body text-sm font-medium rounded-chi hover:bg-chi-ink transition-all duration-300 mb-4 opacity-0"
            >
              Book at {location.suburb} →
            </a>

            <p className="font-body text-chi-smoke text-sm opacity-0">
              Also available at{' '}
              <Link
                to="/locations/queens-plaza"
                className="text-chi-cinnabar hover:underline"
              >
                Queens Plaza →
              </Link>
            </p>
          </div>
        </div>

        {/* Right panel - image */}
        <div className="w-full lg:w-[55%] min-h-[40vh] lg:min-h-full order-1 lg:order-2">
          <img
            src="/images/clinic-interior.jpg"
            alt={`${location.name} interior`}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F5F0E3' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <h2
            className="font-display text-chi-ink mb-10"
            style={{ fontSize: 'clamp(28px, 3vw, 48px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            Services at this location
          </h2>

          <div className="flex flex-wrap gap-3">
            {location.services.map((service) => (
              <span
                key={service}
                className="px-5 py-2.5 rounded-full font-body text-sm flex items-center gap-2"
                style={{ backgroundColor: '#EBE5D6', color: '#1A1208' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-chi-sage" />
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#EBE5D6' }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-10">
            <h2
              className="font-display text-chi-ink"
              style={{ fontSize: 'clamp(28px, 3vw, 48px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
            >
              What visitors say
            </h2>
            <div className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#C9903A">
                <path d="M8 0l2.47 5.01L16 5.81l-4 3.9.94 5.5L8 12.88l-4.94 2.6.94-5.5-4-3.9 5.53-.8z" />
              </svg>
              <span className="font-body text-chi-ink text-sm font-medium">{location.rating}</span>
              <span className="font-body text-chi-smoke text-sm">({location.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleReviews.map((review, i) => (
              <div
                key={i}
                className="p-6 rounded-chi"
                style={{ backgroundColor: '#F5F0E3' }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 16 16" fill="#C9903A">
                      <path d="M8 0l2.47 5.01L16 5.81l-4 3.9.94 5.5L8 12.88l-4.94 2.6.94-5.5-4-3.9 5.53-.8z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-chi-ink text-sm mb-4" style={{ lineHeight: 1.7 }}>
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-chi-smoke text-sm font-medium">{review.name}</span>
                  <span className="font-body text-chi-mist text-xs">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile sticky booking bar */}
      <div
        ref={stickyBarRef}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden"
        style={{
          backgroundColor: 'rgba(13, 10, 6, 0.95)',
          backdropFilter: 'blur(12px)',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-chi-parchment text-sm">{location.name}</span>
          </div>
          <a
            href={`https://bookrelax.com.au/booking?clinic=${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-chi-cinnabar text-chi-parchment font-body text-sm rounded-chi"
          >
            Book This Location →
          </a>
        </div>
      </div>
    </main>
  );
}
