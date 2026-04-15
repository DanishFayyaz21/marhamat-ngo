"use client";

import { memo, useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// ── Reveal image shown behind the FAQ curtain ─────────────────────────────────
const REVEAL_IMAGE =
  "https://images.pexels.com/photos/7459470/pexels-photo-7459470.jpeg";

// ── FAQ Data ───────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: "What is Marhamat and what does it do?",
    answer:
      "Marhamat is a Pakistani charity platform dedicated to supporting orphans, vulnerable children, and struggling families. We provide essential aid including hot meals, clean drinking water, educational supplies, medical care, and safe shelter to those most in need across Pakistan.",
  },
  {
    question: "What causes does Marhamat support?",
    answer:
      "Our work focuses on five core areas: food (daily hot meals), clean water access, education supplies for children, basic medical care, and emergency shelter for displaced families. Every rupee donated goes directly toward these essential needs.",
  },
  {
    question: "How can I make a donation?",
    answer:
      "You can donate directly through our secure online platform using any major payment method. All donations are accepted in PKR (Pakistani Rupees). You can choose a one-time donation or set up a recurring monthly contribution to provide sustained support.",
  },
  {
    question: "How much does it cost to help a child or family?",
    answer:
      "Even a small contribution makes a real difference. As little as ₨500 can provide a week of hot meals for a child. ₨2,000 can cover a month of educational supplies. ₨5,000 can fund medical care for an entire family in need.",
  },
  {
    question: "Are my donations used transparently?",
    answer:
      "Absolutely. Marhamat operates with full financial transparency. We publish regular impact reports and ensure the majority of every donation goes directly to beneficiaries — not administration. You will receive a clear breakdown of exactly how your contribution was used.",
  },
  {
    question: "How can I get involved beyond donating?",
    answer:
      "There are many ways to support Marhamat — volunteer your time, share our mission on social media, organise a local fundraiser, or sign up to our newsletter to stay updated. Every act of kindness, no matter how small, creates ripples of lasting change.",
  },
];

// ── Text styles — white bg + dark blue palette ────────────────────────────────
const questionStyle = {
  fontFamily: "var(--font-satoshi)",
  fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)",
  fontWeight: 400,
  color: "#1e3a8a",
  letterSpacing: "0.02em",
  lineHeight: 1.3,
  flex: 1,
  textAlign: "left",
};

const answerStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "clamp(0.78rem, 1.1vw, 0.9rem)",
  fontWeight: 300,
  color: "rgba(30,58,138,0.65)",
  lineHeight: 1.8,
  letterSpacing: "0.01em",
};

// ── Corner markers — dark blue palette ───────────────────────────────────────
const SectionCorners = memo(function SectionCorners() {
  return (
    <>
      <span className="absolute top-6 left-6 w-5 h-5 border-t border-l border-blue-900/20 pointer-events-none" />
      <span className="absolute top-6 right-6 w-5 h-5 border-t border-r border-blue-900/20 pointer-events-none" />
      <span className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-blue-900/20 pointer-events-none" />
      <span className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-blue-900/20 pointer-events-none" />
      <p
        className="absolute bottom-8 left-8 pointer-events-none"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.48rem",
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: "rgba(30,58,138,0.32)",
        }}
      >
        Marhamat
      </p>
    </>
  );
});

// ── Single FAQ accordion item ─────────────────────────────────────────────────
const FAQItem = memo(function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
  isInView,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 24 }}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 py-5 text-left group focus:outline-none"
        style={{ borderTop: "1px solid rgba(30,58,138,0.1)" }}
        aria-expanded={isOpen}
      >
        {/* Toggle icon */}
        <span
          className="shrink-0 mt-1 w-5 h-5 flex items-center justify-center rounded-full transition-colors duration-300"
          style={{
            border: "1px solid rgba(30,58,138,0.25)",
            color: "rgba(30,58,138,0.6)",
          }}
        >
          <motion.svg
            viewBox="0 0 12 12"
            width={10}
            height={10}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <line x1="6" y1="1" x2="6" y2="11" />
            <line x1="1" y1="6" x2="11" y2="6" />
          </motion.svg>
        </span>

        <span style={questionStyle}>{question}</span>
      </button>

      {/* Answer — AnimatePresence for unmount animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                ...answerStyle,
                paddingLeft: "2.25rem",
                paddingBottom: "1.4rem",
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// ── Main Component ────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const containerRef = useRef(null);

  const isInView = useInView(containerRef, { amount: 0.05, once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // FAQ curtain slides up by 100vh
  const curtainY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  // Reveal image: subtle zoom-out as curtain lifts
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.07, 1.0]);

  // Reveal content: fades in as curtain lifts
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.65], [1, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.65], [36, 0]);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    // 200vh canvas — first 100vh FAQ is static, second 100vh curtain rises
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: "200vh" }}
    >
      {/* ── Sticky viewport ───────────────────────────────────────────────── */}
      <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

        {/* ════════════════════════════════════════════════════════════════════
            LAYER 0 — Reveal image + contact content (behind the curtain)
        ════════════════════════════════════════════════════════════════════ */}
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <Image
            src={REVEAL_IMAGE}
            alt="Community volunteers helping families — Marhamat charity"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />

          {/* Dark cinematic overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.52)" }}
          />

          {/* Top gradient — blends with lifting FAQ curtain (white at top) */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "22vh",
              background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)",
            }}
          />

          {/* Bottom gradient — blends with white Footer */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "22vh",
              background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
            }}
          />

          {/* ── Centered contact content ─────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            {/* Heading */}
            <h2
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(2.2rem, 5.5vw, 6.5rem)",
                fontWeight: 300,
                color: "white",
                letterSpacing: "0.03em",
                lineHeight: 1.1,
                textAlign: "center",
                marginBottom: "2.8rem",
              }}
            >
              Help us reach every child
              <br />
              in need across Pakistan
            </h2>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Primary — dark blue */}
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.9rem 2.6rem",
                  background: "#1e3a8a",
                  color: "white",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "none",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1e3a8a")}
              >
                Donate Now
              </button>

              {/* Secondary — outlined white (stays white on dark image bg) */}
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.9rem 2.6rem",
                  background: "transparent",
                  color: "white",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.45)",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                }}
              >
                Volunteer With Us
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            LAYER 1 — FAQ curtain (white + dark blue)
            Fades in on entrance, translates up via curtainY as user scrolls
        ════════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0"
          style={{ y: curtainY, zIndex: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── White FAQ section content ──────────────────────────────── */}
          <div
            className="relative bg-white overflow-hidden"
            style={{ height: "100%" }}
          >
            {/* Corner decoration */}
            <SectionCorners />

            {/* Top gradient — blends with DonationForm above */}
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: "18vh",
                background:
                  "linear-gradient(to bottom, #000 0%, transparent 100%)",
                zIndex: 1,
              }}
            />

            {/* Inner layout container */}
            <div
              className="relative flex flex-col md:flex-row w-full"
              style={{
                height: "100%",
                zIndex: 2,
              }}
            >
              {/* ── LEFT: Video (30%) — Full height ───────────────────── */}
              <motion.div
                className="w-full md:w-[30%] shrink-0 flex flex-col"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -40 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Video container — full height */}
                <div
                  className="relative overflow-hidden w-full h-full"
                  style={{ minHeight: "100%" }}
                >
                  <div
                    className="absolute top-8 left-8 z-20"
                    style={{ padding: "0.5rem 0" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.95rem",
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        color: "rgba(30,58,138,0.85)",
                        fontWeight: 600,
                      }}
                    >
                      FAQS
                    </span>
                  </div>

                  {/* Corner viewfinder markers on the video */}
                  <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-blue-900/20 pointer-events-none z-10" />
                  <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-blue-900/20 pointer-events-none z-10" />
                  <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-blue-900/20 pointer-events-none z-10" />
                  <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-blue-900/20 pointer-events-none z-10" />

                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ pointerEvents: "none" }}
                  >
                    <source
                      src="https://www.pexels.com/download/video/17746802/"
                      type="video/mp4"
                    />
                  </video>

                  {/* Slightly lighter dark overlay for cleaner look */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(0,0,0,0.30)" }}
                  />

                  {/* Bottom fade */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: "40%",
                      background:
                        "linear-gradient(to top, #fff 0%, transparent 100%)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Vertical divider */}
              <motion.div
                className="hidden md:block shrink-0 self-stretch"
                style={{ width: "1px", background: "rgba(30,58,138,0.1)" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isInView ? 1 : 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              {/* ── RIGHT: FAQs (70%) ────────────────────────────────── */}
              <div
                className="w-full md:w-[70%] flex flex-col justify-center overflow-y-auto"
                style={{
                  paddingLeft: "clamp(1.5rem, 4vw, 5rem)",
                  paddingRight: "clamp(2rem, 5vw, 5rem)",
                  paddingTop: "clamp(5rem, 10vh, 9rem)",
                  paddingBottom: "clamp(4rem, 8vh, 7rem)",
                }}
              >
                {/* FAQ accordion list */}
                <div style={{ borderBottom: "1px solid rgba(30,58,138,0.1)" }}>
                  {FAQ_ITEMS.map((item, i) => (
                    <FAQItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                      index={i}
                      isOpen={openIndex === i}
                      onToggle={() => handleToggle(i)}
                      isInView={isInView}
                    />
                  ))}
                </div>

                {/* Subtle footnote */}
                <motion.p
                  className="mt-8"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.52rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(30,58,138,0.3)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  Further enquiries welcome — contact@marhamat.org
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default memo(FAQSection);
