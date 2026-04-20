'use client';

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    id: 1,
    question: "General Description",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
  },
  {
    id: 2,
    question: "General Description",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    question: "General Description",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: 4,
    question: "General Description",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
  },
];

// ─── Contact Cards Data ───────────────────────────────────────────────────────
const contactCards = [
  {
    id: 1,
    label: "Hotline:",
    value: "+971 56 498 3456",
    icon: <img src="/images/head.png" alt="WhatsApp" width={45} height={46} />,
  },
  {
    id: 2,
    label: "Whatsapp:",
    value: "+971 56 498 3456",
    icon: <img src="/images/whatt.png" alt="WhatsApp" width={45} height={46} />,
  },
  {
    id: 3,
    label: "Email:",
    value: "smbaxis@gmail.com",
    icon: (
      <svg
        width="46"
        height="46"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: "rgba(193, 122, 248, 0.22)",
        border: "1px solid rgba(193, 122, 248, 0.25)",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "background 0.25s ease",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "17px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "16px",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.88)",
            fontSize: "14.5px",
            fontWeight: 600,
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          {faq.question}
        </span>

        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "rgba(100, 80, 180, 0.35)",
            border: "1px solid rgba(139,92,246,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "transform 0.25s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: "0 20px 20px" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.60)",
              fontSize: "13.5px",
              lineHeight: 1.85,
              fontFamily: "'Montserrat', sans-serif",
              margin: 0,
            }}
          >
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div
      style={{
        background: "#0b0d1a",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }

        .contact-card {
          background: rgba(193, 122, 248, 0.18);
          border: 1px solid rgba(193, 122, 248, 0.25);
          border-radius: 12px;
          flex: 1 1 0;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 42px 20px;
          gap: 16px;
          cursor: pointer;
          text-align: center;
          transition: border-color 0.25s, background 0.25s;
        }
        .contact-card:hover {
          border-color: rgba(139, 92, 246, 0.55);
          background: rgba(72, 52, 120, 0.55);
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0b0d1a; }
        ::-webkit-scrollbar-thumb { background: #2d235a; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #7c3aed; }

        /* ✅ MOBILE FIXES */
        .body-content {
          position: relative;
          zIndex: 1;
          max-width: 900px;
          margin-left: 150px;
          padding: 44px 1px 100px;
        }

        .faq-layout {
          display: flex;
          gap: 32px;
          align-items: flex-start;
          margin-bottom: 80px;
          flex-wrap: wrap;
          margin-left: 10px;
        }

        @media (max-width: 768px) {
          /* ✅ FIX: remove left margin that pushes content off-screen */
          .body-content {
            margin-left: 0 !important;
            padding: 32px 20px 80px !important;
            max-width: 100% !important;
          }
          /* ✅ FIX: FAQ heading + accordion stack vertically */
          .faq-layout {
            flex-direction: column;
            gap: 20px;
            margin-left: 0 !important;
          }
          /* ✅ FIX: contact cards go full width on mobile */
          .contact-card {
            min-width: 100%;
            padding: 28px 20px;
          }
        }
      `}</style>

      <Navbar />

      {/* ════════════════════════════════
          HERO SECTION
          ════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          height: "260px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/help center.png')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(11,13,26,0.80) 30%, rgba(11,13,26,0.55) 70%, rgba(11,13,26,0.25) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to bottom, transparent, #0b0d1a)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            left: "52px",
            zIndex: 2,
          }}
        />
      </div>

      {/* ════════════════════════════════
          BODY SECTION
          ════════════════════════════════ */}
      <div style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/help bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.12,
            pointerEvents: "none",
          }}
        />

        {/* ✅ FIX: use className so media query applies */}
        <div
          className="body-content"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "900px",
            marginLeft: "150px",
            padding: "44px 1px 100px",
          }}
        >
          {/* Breadcrumb */}
          <p
            style={{
              fontSize: "12.5px",
              color: "rgba(255,255,255,0.38)",
              marginBottom: "6px",
              fontWeight: 500,
            }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>
              Home
            </Link>
            {" / "}
            <span>Help Center</span>
          </p>

          {/* Section label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
              marginBottom: "50px",
            }}
          >
            <div
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#7c3aed",
                flexShrink: 0,
              }}
            />
            <h2
              style={{
                fontSize: "clamp(18px, 2vw, 21px)",
                fontWeight: 800,
                color: "#fff",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Help Center
            </h2>
          </div>

          {/* ── FAQ SECTION ── */}
          {/* ✅ FIX: use className so media query can stack on mobile */}
          <div className="faq-layout">
            {/* Left heading */}
            <div style={{ flex: "0 0 auto" }}>
              <h3
                style={{
                  fontSize: "clamp(22px, 4vw, 35px)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                <span style={{ display: "block", whiteSpace: "nowrap" }}>
                  Frequently asked
                </span>
                <span style={{ display: "block" }}>questions?</span>
              </h3>
            </div>

            {/* Right accordion */}
            <div
              style={{
                flex: "1 1 280px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaq === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                />
              ))}
            </div>
          </div>

          {/* ── CONTACT SECTION ── */}
          <div>
            <h3
              style={{
                fontSize: "clamp(20px, 2.4vw, 29px)",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "22px",
                letterSpacing: "-0.01em",
              }}
            >
              You still have a question?
            </h3>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              {contactCards.map((card) => (
                <div key={card.id} className="contact-card">
                  <div style={{ color: "rgba(255,255,255,0.80)" }}>{card.icon}</div>
                  <div>
                    <p
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: 700,
                        margin: "0 0 3px",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {card.label}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.60)",
                        fontSize: "13px",
                        fontWeight: 500,
                        margin: 0,
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {card.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}