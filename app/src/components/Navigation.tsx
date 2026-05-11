import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(13, 10, 6, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201, 144, 58, 0.1)' : 'none',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className="font-display text-xl lg:text-2xl tracking-tight"
            style={{ color: scrolled ? '#F5F0E3' : '#F5F0E3' }}
          >
            Chi Link
          </span>
          <span className="text-chi-cinnabar text-lg font-display">气</span>
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { label: 'Treatments', to: '/treatments' },
            { label: 'Locations', to: '/locations/anzac-square' },
            { label: 'Gift Cards', to: '/#gift-cards' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="label-style text-chi-mist hover:text-chi-parchment transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://bookrelax.com.au/booking"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-chi-cinnabar text-chi-parchment label-style hover:bg-chi-parchment hover:text-chi-ink transition-all duration-300 rounded-chi"
          >
            Book Now
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
          <span className="w-5 h-px bg-chi-parchment block" />
          <span className="w-5 h-px bg-chi-parchment block" />
        </button>
      </div>
    </nav>
  );
}
