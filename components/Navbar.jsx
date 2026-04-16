"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";

// ── Charity Heart Icon — adapts stroke color based on navbar state ────────────
const CharityHeartIcon = memo(function CharityHeartIcon({ color = "white", size = 32 }) {
  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Marhamat charity logo"
    >
      <path
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
});

const NAV_LINKS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Donate", href: "#donate", id: "donate" },
  { label: "About Us", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "donate", "about", "contact"];

    const handleScroll = () => {
      let current = "home";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 100;
          if (window.scrollY >= top) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  // Adaptive colors: transparent over dark hero → white bg when scrolled
  const logoColor = scrolled ? "#1e3a8a" : "white";
  const linkColor = scrolled ? "text-blue-900" : "text-white";
  const activeDot = scrolled ? "bg-blue-900" : "bg-white";
  const barColor = scrolled ? "bg-blue-900" : "bg-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 md:px-10 lg:px-14 py-5">
        {/* Logo with Heart Icon + Brand Name */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <CharityHeartIcon color={logoColor} size={34} />
          <span
            className={`font-bold text-xl tracking-tight hidden sm:inline-block ${
              scrolled ? "text-blue-900" : "text-white"
            }`}
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            Marhamat
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-12">
          {NAV_LINKS.map(({ label, href, id }) => (
            <li key={label}>
              <Link
                href={href}
                className={`relative flex items-center gap-1.5 text-sm tracking-[0.15em] uppercase font-light transition-opacity duration-200 hover:opacity-100 ${linkColor} ${
                  activeSection === id ? "opacity-100" : "opacity-60"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {activeSection === id && (
                  <span
                    className={`w-1 h-1 rounded-full ${activeDot} inline-block`}
                  />
                )}
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#donate"
            className={`text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 border px-5 py-2.5 ${
              scrolled
                ? "text-blue-900 border-blue-900/40 hover:bg-blue-900 hover:text-white"
                : "text-white border-white/40 hover:bg-white hover:text-black"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 ${barColor} transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 ${barColor} transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 ${barColor} transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu — always white + dark blue */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white/98 backdrop-blur-md border-b border-gray-200`}
      >
        <ul className="flex flex-col px-6 py-6 gap-5">
          {NAV_LINKS.map(({ label, href, id }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={toggleMenu}
                className={`flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-blue-900 transition-opacity duration-200 ${
                  activeSection === id ? "opacity-100" : "opacity-60"
                }`}
              >
                {activeSection === id && (
                  <span className="w-1 h-1 rounded-full bg-blue-900 inline-block" />
                )}
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-4 border-t border-gray-200">
            <Link
              href="#donate"
              onClick={toggleMenu}
              className="text-xs tracking-[0.2em] uppercase font-medium text-blue-900 border border-blue-900/40 px-5 py-3 inline-block hover:bg-blue-900 hover:text-white transition-all duration-300"
            >
              Donate Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default memo(Navbar);