"use client";

import { memo, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// ── Images for About page ─────────────────────────────────────────────────────
const TEAM_MEMBERS = [
  {
    name: "Ayesha Khan",
    role: "Founder & Executive Director",
    image: "https://images.pexels.com/photos/3810795/pexels-photo-3810795.jpeg?auto=compress&cs=tinysrgb&w=800",
    bio: "Dedicated to orphan welfare for over 15 years.",
  },
  {
    name: "Omar Farooq",
    role: "Programs Director",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
    bio: "Leading education and food distribution programs.",
  },
  {
    name: "Fatima Zafar",
    role: "Head of Outreach",
    image: "https://images.pexels.com/photos/3845256/pexels-photo-3845256.jpeg?auto=compress&cs=tinysrgb&w=800",
    bio: "Connecting donors with families in need across Pakistan.",
  },
  {
    name: "Imran Ali",
    role: "Operations Manager",
    image: "https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=800",
    bio: "Ensuring every rupee reaches those who need it most.",
  },
];

const IMPACT_STATS = [
  { number: "50,000+", label: "Children Fed" },
  { number: "12,500+", label: "Families Supported" },
  { number: "8,000+", label: "Orphans Educated" },
  { number: "15+", label: "Cities Reached" },
];

// ── Corner markers (same as other components) ─────────────────────────────────
const SectionCorners = memo(function SectionCorners({ color = "#1e3a8a" }) {
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
          color: "rgba(30,58,138,0.28)",
        }}
      >
        Marhamat
      </p>
    </>
  );
});

// ── Impact Card Component ─────────────────────────────────────────────────────
const ImpactCard = memo(function ImpactCard({ number, label, index, isInView }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3
        style={{
          fontFamily: "var(--font-satoshi)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 600,
          color: "#1e3a8a",
          letterSpacing: "-0.02em",
          marginBottom: "0.5rem",
        }}
      >
        {number}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(30,58,138,0.55)",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
});

// ── Team Member Card ─────────────────────────────────────────────────────────
const TeamCard = memo(function TeamCard({ member, index, isInView }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "1/1" }}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Corner markers on each image */}
        <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/40 pointer-events-none z-10" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/40 pointer-events-none z-10" />
      </div>
      <h4
        style={{
          fontFamily: "var(--font-satoshi)",
          fontSize: "1rem",
          fontWeight: 500,
          color: "#1e3a8a",
          marginBottom: "0.25rem",
        }}
      >
        {member.name}
      </h4>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          color: "rgba(30,58,138,0.55)",
          marginBottom: "0.5rem",
        }}
      >
        {member.role}
      </p>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.7rem",
          color: "rgba(30,58,138,0.5)",
          lineHeight: 1.5,
        }}
      >
        {member.bio}
      </p>
    </motion.div>
  );
});

// ── Main About Component ──────────────────────────────────────────────────────
function AboutPage() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);

  const heroInView = useInView(heroRef, { amount: 0.2, once: true });
  const statsInView = useInView(statsRef, { amount: 0.3, once: true });
  const missionInView = useInView(missionRef, { amount: 0.2, once: true });
  const teamInView = useInView(teamRef, { amount: 0.1, once: true });

  return (
    <main className="bg-white">
      {/* ──────────────────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────────────────── */}
      <section id="about" ref={heroRef} className="relative min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt="Children smiling - Marhamat charity"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <SectionCorners />

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 40 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
                marginBottom: "1.2rem",
              }}
            >
              About Marhamat
            </p>
            <h1
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 400,
                color: "white",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              A hand to help them rise
            </h1>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
                maxWidth: "580px",
              }}
            >
              Marhamat is a grassroots charity dedicated to uplifting orphans,
              vulnerable children, and struggling families across Pakistan.
              Every day, we work to provide food, education, medical care,
              and shelter to those who need it most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          IMPACT STATS SECTION
      ────────────────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="relative py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: statsInView ? 1 : 0, y: statsInView ? 0 : 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(30,58,138,0.5)",
                marginBottom: "0.8rem",
              }}
            >
              Our Impact So Far
            </p>
            <h2
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 300,
                color: "#1e3a8a",
                letterSpacing: "-0.01em",
              }}
            >
              Real change, measured in lives
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {IMPACT_STATS.map((stat, index) => (
              <ImpactCard
                key={stat.label}
                number={stat.number}
                label={stat.label}
                index={index}
                isInView={statsInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          MISSION & VISION SECTION
      ────────────────────────────────────────────────────────────────────── */}
      <section ref={missionRef} className="relative py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: missionInView ? 1 : 0, x: missionInView ? 0 : -40 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* <div className="mb-4">
                <CharityHeartIcon size={32} />
              </div> */}
              <h3
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)",
                  fontWeight: 500,
                  color: "#1e3a8a",
                  marginBottom: "1rem",
                }}
              >
                Our Mission
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
                  fontWeight: 300,
                  color: "rgba(30,58,138,0.65)",
                  lineHeight: 1.8,
                }}
              >
                To provide immediate relief and long-term support to orphaned
                children and vulnerable families across Pakistan. We believe no
                child should sleep hungry, miss school, or feel abandoned.
                Through transparent and compassionate action, we restore hope
                and dignity to those who need it most.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: missionInView ? 1 : 0, x: missionInView ? 0 : 40 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)",
                  fontWeight: 500,
                  color: "#1e3a8a",
                  marginBottom: "1rem",
                }}
              >
                Our Vision
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
                  fontWeight: 300,
                  color: "rgba(30,58,138,0.65)",
                  lineHeight: 1.8,
                }}
              >
                A Pakistan where every child has access to food, education,
                healthcare, and a safe place to call home. We envision a future
                where no family is left behind, and every orphan finds love,
                care, and opportunity to rise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          HOW IT WORKS SECTION
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-white border-t border-b border-blue-900/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(30,58,138,0.5)",
                marginBottom: "0.8rem",
              }}
            >
              How We Work
            </p>
            <h2
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 300,
                color: "#1e3a8a",
              }}
            >
              Your donation in action
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "You Donate",
                desc: "Every contribution, big or small, goes directly to those in need.",
              },
              {
                step: "02",
                title: "We Distribute",
                desc: "Our team ensures food, supplies, and care reach orphans and families.",
              },
              {
                step: "03",
                title: "Lives Change",
                desc: "Children eat, learn, smile, and build a brighter future.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-satoshi)",
                    fontSize: "3rem",
                    fontWeight: 600,
                    color: "rgba(30,58,138,0.15)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.step}
                </p>
                <h4
                  style={{
                    fontFamily: "var(--font-satoshi)",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "#1e3a8a",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8rem",
                    color: "rgba(30,58,138,0.6)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          TEAM SECTION
      ────────────────────────────────────────────────────────────────────── */}
      <section ref={teamRef} className="relative py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: teamInView ? 1 : 0, y: teamInView ? 0 : 30 }}
            transition={{ duration: 0.7 }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(30,58,138,0.5)",
                marginBottom: "0.8rem",
              }}
            >
              Meet Our Team
            </p>
            <h2
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 300,
                color: "#1e3a8a",
              }}
            >
              Driven by compassion
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamCard
                key={member.name}
                member={member}
                index={index}
                isInView={teamInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          TRANSPARENCY SECTION
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-white border-t border-blue-900/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "rgba(30,58,138,0.5)",
                  marginBottom: "0.8rem",
                }}
              >
                100% Transparency
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  color: "#1e3a8a",
                  marginBottom: "1rem",
                }}
              >
                Every rupee tracked
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.85rem",
                  color: "rgba(30,58,138,0.65)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                We believe in complete financial transparency. 85% of every
                donation goes directly to program services — food, education,
                healthcare, and shelter. Only 15% covers essential operational
                costs. We publish regular impact reports so you can see exactly
                where your money goes.
              </p>
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  background: "rgba(30,58,138,0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "85%",
                    height: "100%",
                    background: "#1e3a8a",
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6rem",
                    color: "#1e3a8a",
                  }}
                >
                  85% Programs
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6rem",
                    color: "rgba(30,58,138,0.4)",
                  }}
                >
                  15% Operations
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative aspect-square overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/6646948/pexels-photo-6646948.jpeg"
                alt="Children receiving care - Marhamat transparency"
                fill
                className="object-cover"
              />
              <SectionCorners />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          CTA SECTION
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-white border-t border-blue-900/10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h2
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 300,
                color: "#1e3a8a",
                marginBottom: "1rem",
              }}
            >
              Ready to make a difference?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.85rem",
                color: "rgba(30,58,138,0.6)",
                marginBottom: "2rem",
                maxWidth: "500px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Join thousands of donors who are helping orphans and families rise.
            </p>
            <button
              style={{
                padding: "0.9rem 2.5rem",
                background: "#1e3a8a",
                color: "white",
                fontFamily: "var(--font-inter)",
                fontSize: "0.65rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1e3a8a")}
            >
              Donate Now
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// ── Charity Heart Icon Component (reused from your design) ────────────────────
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

export default memo(AboutPage);