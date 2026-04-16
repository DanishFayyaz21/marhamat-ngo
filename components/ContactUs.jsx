"use client";

import { memo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Icons for contact methods ─────────────────────────────────────────────────
const MapPinIcon = memo(function MapPinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C12 21 20 15 20 9C20 5 16 2 12 2C8 2 4 5 4 9C4 15 12 21 12 21Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="9" r="3" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

const PhoneIcon = memo(function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.352 21.4019C21.1467 21.5901 20.9042 21.7335 20.6407 21.8227C20.3772 21.9119 20.0984 21.945 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.49919 10.2536 2.44544 7.29695 2.11 4.22C2.08499 3.94263 2.11796 3.6638 2.20707 3.4003C2.29617 3.13679 2.43944 2.89418 2.62764 2.68884C2.81584 2.4835 3.04477 2.31986 3.29996 2.20819C3.55515 2.09651 3.83085 2.03951 4.11 2.04H7.11C7.59525 2.03504 8.06584 2.20467 8.43383 2.51362C8.80182 2.82257 9.04131 3.24756 9.1 3.72C9.23634 4.68009 9.48994 5.6182 9.85 6.51C9.98697 6.85538 10.0128 7.23393 9.92393 7.59384C9.83509 7.95375 9.63633 8.27427 9.36 8.51L8.09 9.78C9.51351 12.4149 11.7051 14.6065 14.34 16.03L15.61 14.76C15.8457 14.4837 16.1663 14.2849 16.5262 14.1961C16.8861 14.1072 17.2646 14.133 17.61 14.27C18.5018 14.6301 19.4399 14.8837 20.4 15.02C20.8726 15.0787 21.2976 15.3182 21.6066 15.6862C21.9155 16.0542 22.0851 16.5248 22.08 17.01V16.92Z" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

const EmailIcon = memo(function EmailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6L12 13L2 6M22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6M22 6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6M22 6L12 13L2 6" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

const ClockIcon = memo(function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6V12L16 14" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

// ── Social Media Icons ────────────────────────────────────────────────────────
const InstagramIcon = memo(function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
    </svg>
  );
});

const FacebookIcon = memo(function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

const TwitterIcon = memo(function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 3C22.0424 3.675 21.0021 4.192 19.92 4.53C19.3307 3.9038 18.5634 3.46713 17.7219 3.27497C16.8804 3.08281 16.0009 3.14425 15.1927 3.45246C14.3844 3.76067 13.6829 4.30201 13.1754 5.00825C12.6679 5.71449 12.3788 6.5521 12.345 7.42V8.42C10.5626 8.46377 8.80276 8.06456 7.2038 7.26273C5.60484 6.4609 4.21439 5.2823 3.15 3.82C3.15 3.82 -0.85 13.82 8 17.82C5.95018 19.2295 3.49887 19.9642 1 19.82C9.85 24.82 20.5 19.82 20.5 7.39C20.4995 7.082 20.4681 6.77485 20.41 6.47C21.4815 5.409 22.3145 4.135 22.85 2.73L23 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

const LinkedInIcon = memo(function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});

// ── Corner markers ────────────────────────────────────────────────────────────
const SectionCorners = memo(function SectionCorners() {
  return (
    <>
      <span className="absolute top-6 left-6 w-5 h-5 border-t border-l border-blue-900/20 pointer-events-none z-10" />
      <span className="absolute top-6 right-6 w-5 h-5 border-t border-r border-blue-900/20 pointer-events-none z-10" />
      <span className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-blue-900/20 pointer-events-none z-10" />
      <span className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-blue-900/20 pointer-events-none z-10" />
    </>
  );
});

// ── Input field with focus effect ─────────────────────────────────────────────
function FocusInput({ as: Tag = "input", style: extraStyle = {}, ...props }) {
  const [focused, setFocused] = useState(false);
  const baseStyle = {
    width: "100%",
    background: "rgba(30,58,138,0.04)",
    border: "1px solid rgba(30,58,138,0.18)",
    color: "#1e3a8a",
    fontFamily: "var(--font-inter)",
    fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
    fontWeight: 300,
    letterSpacing: "0.02em",
    padding: "0.85rem 1rem",
    outline: "none",
    transition: "border-color 0.25s ease, background 0.25s ease",
    borderRadius: 0,
  };
  return (
    <Tag
      {...props}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...baseStyle,
        ...extraStyle,
        borderColor: focused ? "rgba(30,58,138,0.5)" : "rgba(30,58,138,0.18)",
        background: focused ? "rgba(30,58,138,0.07)" : "rgba(30,58,138,0.04)",
      }}
    />
  );
}

// ── Main Contact Page Component ───────────────────────────────────────────────
function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const heroInView = useInView(heroRef, { amount: 0.2, once: true });
  const formInView = useInView(formRef, { amount: 0.2, once: true });
  const infoInView = useInView(infoRef, { amount: 0.2, once: true });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter your message.");
      return;
    }
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
   <main id="contact" className="bg-white scroll-mt-24">
   

      {/* ──────────────────────────────────────────────────────────────────────
          CONTACT FORM & INFO SECTION
      ────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT: Contact Form */}
          <motion.div
          
            ref={formRef}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: formInView ? 1 : 0, x: formInView ? 0 : -40 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8">
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
                Send a Message
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 300,
                  color: "#1e3a8a",
                }}
              >
                We'll respond within 24 hours
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: "rgba(30,58,138,0.05)",
                    border: "1px solid rgba(30,58,138,0.15)",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <div className="mb-4">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#1e3a8a" strokeWidth="1.5"/>
                      <path d="M8 12L11 15L16 9" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontSize: "1.5rem",
                      fontWeight: 400,
                      color: "#1e3a8a",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "rgba(30,58,138,0.6)",
                    }}
                  >
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.52rem",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "rgba(30,58,138,0.55)",
                        marginBottom: "0.55rem",
                      }}
                    >
                      Full Name *
                    </label>
                    <FocusInput
                      type="text"
                      name="name"
                      placeholder="Ahmed Khan"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.52rem",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "rgba(30,58,138,0.55)",
                        marginBottom: "0.55rem",
                      }}
                    >
                      Email Address *
                    </label>
                    <FocusInput
                      type="email"
                      name="email"
                      placeholder="ahmed@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.52rem",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "rgba(30,58,138,0.55)",
                        marginBottom: "0.55rem",
                      }}
                    >
                      Subject
                    </label>
                    <FocusInput
                      type="text"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.52rem",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "rgba(30,58,138,0.55)",
                        marginBottom: "0.55rem",
                      }}
                    >
                      Message *
                    </label>
                    <FocusInput
                      as="textarea"
                      name="message"
                      placeholder="Tell us how you'd like to help or ask your question..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      style={{ resize: "vertical", lineHeight: 1.6 }}
                      required
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.65rem",
                        color: "rgba(220,38,38,0.8)",
                        marginTop: "-0.5rem",
                      }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    style={{
                      padding: "1rem",
                      background: "#1e3a8a",
                      color: "white",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.25s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#1e3a8a")}
                  >
                    Send Message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Contact Info */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: infoInView ? 1 : 0, x: infoInView ? 0 : 40 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8">
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
                Contact Information
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 300,
                  color: "#1e3a8a",
                }}
              >
                Connect with us directly
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Address */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <MapPinIcon />
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "#1e3a8a",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Our Office
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "rgba(30,58,138,0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    123 Main Street, Gulberg III
                    <br />
                    Lahore, Punjab, Pakistan
                    <br />
                    Postal Code: 54000
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <PhoneIcon />
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "#1e3a8a",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Phone
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "rgba(30,58,138,0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    +92 42 123 4567
                    <br />
                    +92 300 123 4567 (WhatsApp)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <EmailIcon />
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "#1e3a8a",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Email
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "rgba(30,58,138,0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    info@marhamat.org
                    <br />
                    support@marhamat.org
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <ClockIcon />
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "#1e3a8a",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Working Hours
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "rgba(30,58,138,0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 2:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(30,58,138,0.1)" }}>
              <h4
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "#1e3a8a",
                  marginBottom: "1rem",
                }}
              >
                Follow Us
              </h4>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                {[
                  { Icon: InstagramIcon, href: "#", label: "Instagram" },
                  { Icon: FacebookIcon, href: "#", label: "Facebook" },
                  { Icon: TwitterIcon, href: "#", label: "Twitter" },
                  { Icon: LinkedInIcon, href: "#", label: "LinkedIn" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    style={{
                      color: "rgba(30,58,138,0.5)",
                      transition: "color 0.25s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#1e3a8a")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(30,58,138,0.5)")}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          MAP SECTION (Placeholder)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[400px] overflow-hidden border-t border-blue-900/10">
        <div className="absolute inset-0 bg-gray-100">
          {/* Google Maps iframe placeholder */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217114.41852882318!2d74.17495775!3d31.52181475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Marhamat Office Location Map"
          />
        </div>
        <SectionCorners />
      </section>

     
    </main>
  );
}

export default memo(ContactPage);