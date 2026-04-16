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
    description: "We provide immediate assistance to orphans who have lost their parents. No child should face life alone without support. Your donation gives them shelter, food, and clothing. We ensure every child feels safe and protected. Our team works day and night to reach those in need. Together we can be the helping hand they deserve.",
  },
  {
    image:
      "https://images.pexels.com/photos/20754865/pexels-photo-20754865.jpeg",
    word: "Educate",
    description: "Every child has the right to learn and build a better future. We provide school supplies, books, uniforms, and fees. Our education programs reach children in remote villages. We also offer vocational training for older orphans. Education breaks the cycle of poverty for generations. Help us put a pencil in every child's hand.",
  },
  {
    image:
      "https://images.pexels.com/photos/31894104/pexels-photo-31894104.jpeg",
    word: "Feed",
    description: "Thousands of children go to bed hungry every single night. We provide hot, nutritious meals to orphans and needy families. Our food distribution runs across 15 cities in Pakistan. We also deliver ration bags to struggling households. No child should ever feel the pain of hunger. Your donation can fill empty stomachs today.",
  },
  {
    image:
      "https://images.pexels.com/photos/7617884/pexels-photo-7617884.jpeg",
    word: "Protect",
    description: "Orphaned children are vulnerable to abuse and exploitation. We create safe homes where they can heal and grow. Our child protection programs rescue those in danger. We provide counseling and legal support to victims. Every child deserves to feel safe and loved. Help us build a protective shield around them.",
  },
  {
    image:
      "https://images.pexels.com/photos/5329153/pexels-photo-5329153.jpeg",
    word: "Love",
    description: "Love is the most powerful gift we can give a child. Many orphans have never felt what it means to be cared for. Our volunteers become like family to these children. We celebrate their birthdays and achievements with joy. Love heals wounds that food and shelter cannot reach. Show them they matter with your compassion today.",
  },
  {
    image:
      "https://images.pexels.com/photos/30248240/pexels-photo-30248240.jpeg",
    word: "Care",
    description: "We provide medical care to sick children who cannot afford treatment. Our healthcare camps reach families in rural areas. We also offer mental health support for traumatized orphans. Daily care includes hygiene kits, blankets, and clean water. Every child deserves to be treated with dignity. Your care can save a child's life today.",
  },
];

// ── Sticky Section Data (3 words with 3 different images and descriptions) ─────
const STICKY_STEPS = [
  {
    image: "https://images.pexels.com/photos/33986221/pexels-photo-33986221.jpeg",
    word: "Help",
    description: "Your donation provides food, shelter, and hope to orphans. We reach children who have been abandoned and forgotten. Every rupee you give changes a real child's life. Our team works with transparency and love. Together we can lift families out of darkness. Join us to be the help they are waiting for.",
  },
  {
    image: "https://images.pexels.com/photos/10172985/pexels-photo-10172985.jpeg",
    word: "Support",
    description: "We support struggling families with monthly ration and medical aid. Our programs empower single mothers to earn a living. We also provide emotional support to grieving children. Support means showing up every day without fail. Your consistent help creates lasting change in communities. Be the support system these families need.",
  },
  {
    image: "https://images.pexels.com/photos/17950300/pexels-photo-17950300.jpeg",
    word: "Rise",
    description: "Every child deserves to rise above their circumstances. We help orphans dream big and achieve their goals. With education and love, they can break free from poverty. We have seen countless success stories of children who rose. Your donation gives them wings to fly high. Help them rise and build a bright future.",
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

const descriptionStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
  fontWeight: 300,
  color: "rgba(30,58,138,0.55)",
  lineHeight: 1.6,
  maxWidth: "90%",
  marginTop: "1rem",
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

// ── Reusable text panel with description ──────────────────────────────────────
const TextPanel = memo(function TextPanel({ word, description, fromLeft, isInView, delay = 0 }) {
  return (
    <motion.div
      className="w-full md:w-1/2 flex flex-col items-center md:items-start"
      style={{
        paddingTop: "clamp(12vh, 16vh, 20vh)",
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
      <motion.p
        style={descriptionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: delay + 0.15 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
});

// ── Individual scroll step with alternating layout ────────────────────────────
const StepItem = memo(function StepItem({ image, word, description, index }) {
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
          <TextPanel word={word} description={description} fromLeft={false} isInView={isInView} delay={0.09} />
        </>
      ) : (
        <>
          <TextPanel word={word} description={description} fromLeft isInView={isInView} delay={0} />
          <ImagePanel image={image} word={word} fromLeft={false} isInView={isInView} />
        </>
      )}
    </div>
  );
});

// ── Step 7: Sticky image (left) + HELP → SUPPORT → RISE on right ─────────────────
const StickyStep = memo(function StickyStep() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33)      setActiveIndex(0); // Help
    else if (v < 0.67) setActiveIndex(1); // Support
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

        {/* Right: one word at a time (changes with scroll) + description */}
        <div
          className="w-full md:w-1/2 flex flex-col items-center md:items-start relative"
          style={{
            paddingTop: "clamp(12vh, 16vh, 20vh)",
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

          {/* Description text for sticky section */}
          <motion.p
            key={`desc-${activeIndex}`}
            style={descriptionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {currentStep.description}
          </motion.p>
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
        <StepItem 
          key={step.word} 
          image={step.image} 
          word={step.word} 
          description={step.description}
          index={i} 
        />
      ))}
      <StickyStep />
    </section>
  );
}

export default memo(ScrollStory);