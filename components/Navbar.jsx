"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";

// Logo adapts stroke color based on whether navbar is scrolled
const AntlerLogo = memo(function AntlerLogo({ color = "white" }) {
  return (
    <svg
      width="52"
      height="42"
      viewBox="0 0 52 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Marhamat logo"
    >
      {/* Left antler */}
      <path
        d="M26 38 L26 26 L18 14 L14 4"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 14 L8 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 20 L14 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Right antler */}
      <path
        d="M26 26 L34 14 L38 4"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 14 L44 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M30 20 L38 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
});

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Donate", href: "#donate" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  // Adaptive colors: transparent over dark hero → white bg when scrolled
  const logoColor    = scrolled ? "#1e3a8a" : "white";
  const linkColor    = scrolled ? "text-blue-900" : "text-white";
  const activeDot    = scrolled ? "bg-blue-900" : "bg-white";
  const barColor     = scrolled ? "bg-blue-900" : "bg-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 md:px-10 lg:px-14 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <AntlerLogo color={logoColor} />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-12">
          {NAV_LINKS.map(({ label, href, active }) => (
            <li key={label}>
              <Link
                href={href}
                className={`relative flex items-center gap-1.5 text-sm tracking-[0.15em] uppercase font-light transition-opacity duration-200 hover:opacity-100 ${linkColor} ${
                  active ? "opacity-100" : "opacity-60"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {active && (
                  <span className={`w-1 h-1 rounded-full ${activeDot} inline-block`} />
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
          {NAV_LINKS.map(({ label, href, active }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={toggleMenu}
                className={`flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-blue-900 transition-opacity duration-200 ${
                  active ? "opacity-100" : "opacity-60"
                }`}
              >
                {active && (
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
