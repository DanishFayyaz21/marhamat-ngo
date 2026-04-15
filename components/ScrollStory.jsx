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

// ── Sticky Section Data (3 words with 3 different images) ─────────────────────
const STICKY_STEPS = [
  {
    image: "https://images.pexels.com/photos/33986221/pexels-photo-33986221.jpeg",
    word: "Help",
  },
  {
    image: "https://images.pexels.com/photos/10172985/pexels-photo-10172985.jpeg",
    word: "Them",
  },
  {
    image: "https://images.pexels.com/photos/17950300/pexels-photo-17950300.jpeg",
    word: "Rise",
  },
];

// ── Shared text styles — white bg + dark blue palette ─────────────────────────
const wordStyle = {
  fontFamily: "var(--font-satoshi)",
  fontSize: "clamp(3rem, 6.5vw, 8.5rem)",
  fontWeight: 300,
  color: "#1e3a8a",
  letterSpacing: "0.03em",
  lineHeight: 1.05,
};

const prefixStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.58rem",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: "rgba(30,58,138,0.45)",
  marginBottom: "0.85rem",
  display: "block",
};

// ── Camera-viewfinder corner markers ──────────────────────────────────────────
const CornerMarkers = memo(function CornerMarkers() {
  return (
    <>
      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-blue-900/20 pointer-events-none" />
      <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-blue-900/20 pointer-events-none" />
      <span className="absolute bottom-10 left-3 w-5 h-5 border-b border-l border-blue-900/20 pointer-events-none" />
      <span className="absolute bottom-10 right-3 w-5 h-5 border-b border-r border-blue-900/20 pointer-events-none" />
      <p
        className="absolute bottom-5 left-5 pointer-events-none"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.48rem",
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: "rgba(30,58,138,0.38)",
        }}
      >
        Marhamat
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

// ── Step 7: Sticky image (left) + HELP → THEM → RISE on right ─────────────────
const StickyStep = memo(function StickyStep() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33)      setActiveIndex(0); // Help
    else if (v < 0.67) setActiveIndex(1); // Them
    else               setActiveIndex(2); // Rise
  });

  const currentStep = STICKY_STEPS[activeIndex];

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex flex-col md:flex-row">

        {/* Left: sticky image — changes with scroll */}
        <motion.div
          key={currentStep.image}
          className="w-full md:w-1/2 flex items-center shrink-0"
          style={{
            paddingTop: "clamp(2.5rem, 4vh, 4rem)",
            paddingBottom: "clamp(2.5rem, 4vh, 4rem)",
            paddingLeft: "clamp(2rem, 5vw, 6rem)",
            paddingRight: "clamp(1rem, 2vw, 2rem)",
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ height: "clamp(50vh, 72vh, 78vh)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.image}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={currentStep.image}
                  alt={currentStep.word}
                  fill
                  sizes="(max-width: 768px) 95vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <CornerMarkers />
          </div>
        </motion.div>

        {/* Right: one word at a time (changes with scroll) */}
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
                {currentStep.word}
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
    <section className="bg-white">
      {SCROLL_STEPS.map((step, i) => (
        <StepItem key={step.word} image={step.image} word={step.word} index={i} />
      ))}
      <StickyStep />
    </section>
  );
}

export default memo(ScrollStory);
