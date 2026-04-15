"use client";

import { memo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useInView } from "framer-motion";

// ── Data ───────────────────────────────────────────────────────────────────────
const SCROLL_STEPS = [
  {
    image:
      "https://images.pexels.com/photos/17286112/pexels-photo-17286112.jpeg",
    word: "Help",
  },
  {
    image:
      "https://images.pexels.com/photos/20754865/pexels-photo-20754865.jpeg",
    word: "Educate",
  },
  {
    image:
      "https://images.pexels.com/photos/31894104/pexels-photo-31894104.jpeg",
    word: "Feed",
  },
  {
    image:
      "https://images.pexels.com/photos/7617884/pexels-photo-7617884.jpeg",
    word: "Protect",
  },
  {
    image:
      "https://images.pexels.com/photos/5329153/pexels-photo-5329153.jpeg",
    word: "Love",
  },
  {
    image:
      "https://images.pexels.com/photos/30248240/pexels-photo-30248240.jpeg",
    word: "Care",
  },
];

const STICKY_IMAGE =
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1600&auto=format&fit=crop";

// ── Shared text styles ─────────────────────────────────────────────────────────
const wordStyle = {
  fontFamily: "var(--font-satoshi)",
  fontSize: "clamp(3rem, 6.5vw, 8.5rem)",
  fontWeight: 300,
  color: "white",
  letterSpacing: "0.03em",
  lineHeight: 1.05,
};

const prefixStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.58rem",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.32)",
  marginBottom: "0.85rem",
  display: "block",
};

// ── Camera-viewfinder corner markers ──────────────────────────────────────────
const CornerMarkers = memo(function CornerMarkers() {
  return (
    <>
      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/20 pointer-events-none" />
      <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-white/20 pointer-events-none" />
      <span className="absolute bottom-10 left-3 w-5 h-5 border-b border-l border-white/20 pointer-events-none" />
      <span className="absolute bottom-10 right-3 w-5 h-5 border-b border-r border-white/20 pointer-events-none" />
      <p
        className="absolute bottom-5 left-5 pointer-events-none"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.48rem",
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
        }}
      >
        Merhamat
      </p>
    </>
  );
});

// ── Reusable image panel ──────────────────────────────────────────────────────
const ImagePanel = memo(function ImagePanel({ image, word, fromLeft, isInView }) {
  return (
    <motion.div
      className="w-full md:w-1/2 flex items-center shrink-0"
      style={{
        paddingTop: "clamp(2.5rem, 4vh, 4rem)",
        paddingBottom: "clamp(2.5rem, 4vh, 4rem)",
        paddingLeft: fromLeft ? "clamp(2rem, 5vw, 6rem)" : "clamp(1rem, 2vw, 2rem)",
        paddingRight: fromLeft ? "clamp(1rem, 2vw, 2rem)" : "clamp(2rem, 5vw, 6rem)",
      }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (fromLeft ? -50 : 50) }}
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full overflow-hidden rounded-xl" style={{ height: "clamp(50vh, 72vh, 78vh)" }}>
        <Image
          src={image}
          alt={word}
          fill
          sizes="(max-width: 768px) 95vw, 50vw"
          className="object-cover"
        />
        <CornerMarkers />
      </div>
    </motion.div>
  );
});

// ── Reusable text panel ───────────────────────────────────────────────────────
const TextPanel = memo(function TextPanel({ word, fromLeft, isInView, delay = 0 }) {
  return (
    <motion.div
      className="w-full md:w-1/2 flex flex-col items-center md:items-start"
      style={{
        // "slightly above center" — push content down by ~22vh so it sits in the upper-middle
        paddingTop: "clamp(18vh, 22vh, 26vh)",
        paddingLeft: !fromLeft
          ? "clamp(2rem, 5vw, 6rem)"
          : "clamp(1.5rem, 3vw, 4rem)",
        paddingRight: !fromLeft
          ? "clamp(1.5rem, 3vw, 4rem)"
          : "clamp(2rem, 5vw, 6rem)",
      }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (fromLeft ? -50 : 50) }}
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span style={prefixStyle}>A hope for</span>
      <h2 style={wordStyle}>{word}</h2>
    </motion.div>
  );
});

// ── Individual scroll step with alternating layout ────────────────────────────
const StepItem = memo(function StepItem({ image, word, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.25 });

  // Even index (0,2,4) → image LEFT, text RIGHT
  // Odd index  (1,3,5) → text LEFT, image RIGHT
  const imageOnLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="h-screen flex flex-col md:flex-row overflow-hidden"
    >
      {imageOnLeft ? (
        <>
          <ImagePanel image={image} word={word} fromLeft isInView={isInView} />
          <TextPanel word={word} fromLeft={false} isInView={isInView} delay={0.09} />
        </>
      ) : (
        <>
          <TextPanel word={word} fromLeft isInView={isInView} delay={0} />
          <ImagePanel image={image} word={word} fromLeft={false} isInView={isInView} />
        </>
      )}
    </div>
  );
});

// ── Step 7: Sticky image (left) + FOR → EVERY → GENERATION on right ───────────
const WORDS = ["Help", "Them", "Rise"];

const StickyStep = memo(function StickyStep() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33)      setActiveIndex(0); // FOR
    else if (v < 0.67) setActiveIndex(1); // EVERY
    else               setActiveIndex(2); // GENERATION
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex flex-col md:flex-row">

        {/* Left: sticky image — enters once, stays fixed */}
        <motion.div
          className="w-full md:w-1/2 flex items-center shrink-0"
          style={{
            paddingTop: "clamp(2.5rem, 4vh, 4rem)",
            paddingBottom: "clamp(2.5rem, 4vh, 4rem)",
            paddingLeft: "clamp(2rem, 5vw, 6rem)",
            paddingRight: "clamp(1rem, 2vw, 2rem)",
          }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.25, once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ height: "clamp(50vh, 72vh, 78vh)" }}
          >
            <Image
              src={STICKY_IMAGE}
              alt="A place for every generation"
              fill
              sizes="(max-width: 768px) 95vw, 50vw"
              className="object-cover"
            />
            <CornerMarkers />
          </div>
        </motion.div>

        {/* Right: one word at a time */}
        <div
          className="w-full md:w-1/2 flex flex-col items-center md:items-start relative"
          style={{
            paddingTop: "clamp(18vh, 22vh, 26vh)",
            paddingLeft: "clamp(1.5rem, 3vw, 4rem)",
            paddingRight: "clamp(2rem, 5vw, 6rem)",
          }}
        >
          <span style={prefixStyle}>A hand to</span>

          <div style={{ position: "relative", overflow: "visible", minHeight: "clamp(6rem, 12vh, 14rem)", width: "100%" }}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeIndex}
                style={wordStyle}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {WORDS[activeIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
});

// ── Main export ────────────────────────────────────────────────────────────────
function ScrollStory() {
  return (
    <section className="bg-black">
      {SCROLL_STEPS.map((step, i) => (
        <StepItem key={step.word} image={step.image} word={step.word} index={i} />
      ))}
      <StickyStep />
    </section>
  );
}

export default memo(ScrollStory);
