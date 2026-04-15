"use client";

import { memo } from "react";

// ── Charity Heart Icon — dark blue palette ────────────────────────────────────
const CharityHeartIcon = memo(function CharityHeartIcon({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
        stroke="#1e3a8a"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
});

// ── Footer columns data ────────────────────────────────────────────────────────
const FOOTER_COLUMNS = [
  {
    heading: "Our Mission",
    items: ["Help Children", "Feed The Hungry", "Educate Orphans", "Support Families"],
  },
  {
    heading: "Get Involved",
    items: ["Donate Now", "Become a Volunteer", "Sponsor a Child", "Corporate Partnership"],
  },
  {
    heading: "Connect",
    items: ["Contact Us", "Newsletter", "Instagram", "Success Stories"],
  },
];

// ── Main Footer Component ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="relative bg-white w-full"
      style={{
        borderTop: "1px solid rgba(30,58,138,0.1)",
        borderBottom: "1px solid rgba(30,58,138,0.1)",
      }}
    >
      {/* ── Corner markers ───────────────────────────────────────────────── */}
      <span className="absolute top-6 left-6 w-5 h-5 border-t border-l border-blue-900/20 pointer-events-none" />
      <span className="absolute top-6 right-6 w-5 h-5 border-t border-r border-blue-900/20 pointer-events-none" />
      <span className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-blue-900/20 pointer-events-none" />
      <span className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-blue-900/20 pointer-events-none" />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div
        className="flex flex-col md:flex-row w-full"
        style={{
          paddingTop: "clamp(3rem, 6vh, 5rem)",
          paddingBottom: "clamp(3rem, 6vh, 5rem)",
          paddingLeft: "clamp(2rem, 5vw, 5rem)",
          paddingRight: "clamp(2rem, 5vw, 5rem)",
        }}
      >
        {/* ── LEFT: Logo & Tagline (40%) ─────────────────────────────────── */}
        <div
          className="w-full md:w-[40%] flex flex-col items-start justify-start shrink-0"
          style={{ marginBottom: "clamp(2.5rem, 5vw, 0rem)" }}
        >
          {/* Logo mark + wordmark */}
          <div className="flex items-center gap-3 mb-4">
            <CharityHeartIcon size={52} />
            <div>
              <span
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: 700,
                  color: "#1e3a8a",
                  letterSpacing: "-0.02em",
                }}
              >
                Marhamat
              </span>
            </div>
          </div>
          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.7rem",
              color: "rgba(30,58,138,0.55)",
              lineHeight: 1.5,
              maxWidth: "80%",
            }}
          >
            A hand to help them rise — supporting orphans, children, and needy families worldwide.
          </p>
        </div>

        {/* ── RIGHT: 3 columns (60%) ───────────────────────────────────── */}
        <div className="w-full md:w-[60%] grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              {/* Column heading */}
              <p
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#1e3a8a",
                  fontWeight: 600,
                  marginBottom: "1.4rem",
                }}
              >
                {col.heading}
              </p>

              {/* Sub-items */}
              <ul className="flex flex-col" style={{ gap: "0.85rem" }}>
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                        fontWeight: 300,
                        color: "rgba(30,58,138,0.55)",
                        letterSpacing: "0.02em",
                        textDecoration: "none",
                        transition: "color 0.25s ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#1e3a8a")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(30,58,138,0.55)")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid rgba(30,58,138,0.08)",
          paddingTop: "1.4rem",
          paddingBottom: "1.6rem",
          paddingLeft: "clamp(2rem, 5vw, 5rem)",
          paddingRight: "clamp(2rem, 5vw, 5rem)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(30,58,138,0.35)",
          }}
        >
          © {new Date().getFullYear()} Marhamat — All rights reserved
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(30,58,138,0.35)",
          }}
        >
          Privacy Policy &nbsp;·&nbsp; Terms of Use
        </p>
      </div>

      {/* ── Full-width text-mask banner ──────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(160px, 20vh, 280px)",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {/* White background layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#fff",
          }}
        />

        {/* Fallback text with dark blue stroke outline */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-satoshi), Arial, sans-serif",
              fontSize: "clamp(2rem, 8vw, 6rem)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(30,58,138,0.25)",
              textTransform: "uppercase",
              margin: 0,
              userSelect: "none",
              whiteSpace: "nowrap",
              padding: "0 1rem",
            }}
          >
            MARHAMAT
          </h2>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
