"use client";

import { memo, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2400&auto=format&fit=crop";

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

// ── Shared input style ────────────────────────────────────────────────────────
const inputBase = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.13)",
  color: "white",
  fontFamily: "var(--font-inter)",
  fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
  fontWeight: 300,
  letterSpacing: "0.02em",
  padding: "0.85rem 1rem",
  outline: "none",
  transition: "border-color 0.25s ease, background 0.25s ease",
  borderRadius: 0,
};

const labelBase = {
  display: "block",
  fontFamily: "var(--font-inter)",
  fontSize: "0.52rem",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.42)",
  marginBottom: "0.55rem",
};

// ── Corner markers — consistent with every other section ──────────────────────
const CornerMarkers = memo(function CornerMarkers() {
  return (
    <>
      <span className="absolute top-6 left-6 w-5 h-5 border-t border-l border-white/20 pointer-events-none z-10" />
      <span className="absolute top-6 right-6 w-5 h-5 border-t border-r border-white/20 pointer-events-none z-10" />
      <span className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-white/20 pointer-events-none z-10" />
      <span className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-white/20 pointer-events-none z-10" />
      <p
        className="absolute bottom-8 left-8 pointer-events-none z-10"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.48rem",
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
        }}
      >
        Marhamat
      </p>
    </>
  );
});

// ── Field wrapper — handles focus border glow via local state ─────────────────
function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelBase}>{label}</label>
      {children}
    </div>
  );
}

// ── Focusable input — swaps border colour on focus ────────────────────────────
function FocusInput({ as: Tag = "input", style: extraStyle = {}, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <Tag
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        ...extraStyle,
        borderColor: focused
          ? "rgba(255,255,255,0.45)"
          : "rgba(255,255,255,0.13)",
        background: focused
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.05)",
      }}
    />
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
function DonationForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [amount, setAmount]   = useState("");
  const [preset, setPreset]   = useState(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]     = useState("");

  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { amount: 0.12, once: true });

  const handlePreset = (val) => {
    setPreset(val);
    setAmount(String(val));
  };

  const handleAmountChange = (e) => {
    setPreset(null);
    const val = e.target.value.replace(/[^0-9]/g, "");
    setAmount(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim())            return setError("Please enter your full name.");
    if (!email.trim() || !email.includes("@"))
                                 return setError("Please enter a valid email address.");
    if (!amount || Number(amount) < 100)
                                 return setError("Minimum donation is ₨100.");
    setSubmitted(true);
  };

  return (
    <section
      id="donate"
      ref={sectionRef}
      className="relative bg-black"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Background image + overlays ───────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={BG_IMAGE}
          alt="Children in a classroom — Marhamat charity for orphans and families"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
        {/* Dark cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.74)" }}
        />
        {/* Top gradient — blends with VideoSection above */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "22vh",
            background: "linear-gradient(to bottom, #000 0%, transparent 100%)",
          }}
        />
        {/* Bottom gradient — blends with FAQSection below */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "22vh",
            background: "linear-gradient(to top, #000 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Corner markers */}
      <CornerMarkers />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-28">

        {/* Section heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 28 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.58rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.42)",
              marginBottom: "1rem",
              display: "block",
            }}
          >
            Make a Difference
          </p>
          <h2
            style={{
              fontFamily: "var(--font-satoshi)",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 300,
              color: "white",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              marginBottom: "1.2rem",
            }}
          >
            Your Donation Matters
          </h2>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "460px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Every rupee you give provides food, education, and hope to children
            and families who need it most.
          </p>
        </motion.div>

        {/* ── Form card ─────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {submitted ? (
            /* ── Success state ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "100%",
                maxWidth: "520px",
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "clamp(2.5rem, 6vw, 3.5rem)",
                textAlign: "center",
              }}
            >
              {/* Thin top accent line */}
              <div
                style={{
                  width: "2.5rem",
                  height: "1px",
                  background: "rgba(255,255,255,0.35)",
                  margin: "0 auto 2rem",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 300,
                  color: "white",
                  letterSpacing: "0.04em",
                  marginBottom: "1rem",
                }}
              >
                JazakAllah Khair
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                }}
              >
                Your generous donation of{" "}
                <span style={{ color: "white" }}>₨{Number(amount).toLocaleString("en-PK")}</span> is
                being processed. You will receive a confirmation at{" "}
                <span style={{ color: "white" }}>{email}</span>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName(""); setEmail(""); setAmount(""); setMessage(""); setPreset(null);
                }}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  background: "none",
                  border: "1px solid rgba(255,255,255,0.18)",
                  padding: "0.7rem 1.8rem",
                  cursor: "pointer",
                  transition: "border-color 0.25s ease, color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                }}
              >
                Donate Again
              </button>
            </motion.div>
          ) : (
            /* ── Form ── */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 32 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "100%",
                maxWidth: "520px",
                background: "rgba(0,0,0,0.58)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "clamp(2rem, 5vw, 3rem)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Thin top accent */}
              <div
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "rgba(255,255,255,0.25)",
                }}
              />

              {/* Name */}
              <Field label="Full Name">
                <FocusInput
                  type="text"
                  placeholder="e.g. Ahmed Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </Field>

              {/* Email */}
              <Field label="Email Address">
                <FocusInput
                  type="email"
                  placeholder="e.g. ahmed@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </Field>

              {/* Donation amount */}
              <Field label="Donation Amount (PKR ₨)">
                {/* Preset buttons */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "0.5rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  {PRESET_AMOUNTS.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handlePreset(val)}
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        fontWeight: preset === val ? 500 : 300,
                        color: preset === val ? "black" : "rgba(255,255,255,0.65)",
                        background: preset === val ? "white" : "rgba(255,255,255,0.05)",
                        border: preset === val
                          ? "1px solid white"
                          : "1px solid rgba(255,255,255,0.13)",
                        padding: "0.5rem 0.25rem",
                        cursor: "pointer",
                        transition: "all 0.22s ease",
                        textAlign: "center",
                      }}
                    >
                      ₨{val.toLocaleString("en-PK")}
                    </button>
                  ))}
                </div>
                {/* Custom input */}
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.85rem",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    ₨
                  </span>
                  <FocusInput
                    type="text"
                    inputMode="numeric"
                    placeholder="Or enter custom amount"
                    value={amount}
                    onChange={handleAmountChange}
                    style={{ paddingLeft: "2rem" }}
                  />
                </div>
              </Field>

              {/* Message — optional */}
              <Field label="Message (Optional)">
                <FocusInput
                  as="textarea"
                  placeholder="Share what inspired you to donate…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  style={{ resize: "vertical", minHeight: "80px", lineHeight: 1.6 }}
                />
              </Field>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.05em",
                      color: "rgba(255,120,120,0.9)",
                      marginTop: "-0.5rem",
                    }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: "white",
                  color: "black",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.25s ease",
                  marginTop: "0.25rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Donate Now
              </button>

              {/* Footnote */}
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.48rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                  textAlign: "center",
                  marginTop: "-0.5rem",
                }}
              >
                Secure &nbsp;·&nbsp; Transparent &nbsp;·&nbsp; 100% to beneficiaries
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default memo(DonationForm);
