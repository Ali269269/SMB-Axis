'use client';

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Similar Articles Data ────────────────────────────────────────────────────
const similarArticles = [
  {
    id: 1,
    slug: "artificial-intelligence-beyond-imaginations-1",
    title: "Artificial Intelligence Beyond Imaginations",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor consuis aute nore.",
    date: "2026/04/18",
    views: "56.2K Viewers",
    image: "/images/c3.jpg",
  },
  {
    id: 2,
    slug: "artificial-intelligence-beyond-imaginations-2",
    title: "Artificial Intelligence Beyond Imaginations",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor consuis aute nore.",
    date: "2026/04/18",
    views: "56.2K Viewers",
    image: "/images/c3.jpg",
  },
  {
    id: 3,
    slug: "artificial-intelligence-beyond-imaginations-3",
    title: "Artificial Intelligence Beyond Imaginations",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor consuis aute nore.",
    date: "2026/04/18",
    views: "56.2K Viewers",
    image: "/images/c3.jpg",
  },
];

// ─── Hero Banner ──────────────────────────────────────────────────────────────
function HeroBanner() {
  return (
    <div style={{ position: "relative", minHeight: "260px", display: "flex", alignItems: "flex-end" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/blog.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(11,14,26,0.75) 0%, rgba(11,14,26,0.9) 60%, #0b0e1a 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "clamp(80px,14vw,160px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.04)",
          letterSpacing: "-0.04em",
          userSelect: "none",
          pointerEvents: "none",
          paddingRight: "32px",
          lineHeight: 1,
        }}
      >
        BLOG
      </div>
      <div style={{ position: "relative", zIndex: 2, padding: "200px 48px 40px" }} />
    </div>
  );
}

// ─── Similar Article Card ─────────────────────────────────────────────────────
function SimilarCard({ article }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        overflow: "hidden",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.45)" : "none",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: "10px", background: "#1a1e30", overflow: "hidden" }}>
        <img
          src={article.image}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(18,22,42,0.75) 0%, transparent 50%)",
          }}
        />
      </div>

      <div style={{ padding: "16px 18px 18px" }}>
        <h3
          style={{
            color: hovered ? "#a78bfa" : "#fff",
            fontSize: "15px",
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: "8px",
            transition: "color 0.2s",
          }}
        >
          {article.title}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12.5px", lineHeight: 1.65, marginBottom: "12px" }}>
          {article.excerpt}{" "}
          <span style={{ color: "#a78bfa", fontWeight: 600, cursor: "pointer" }}>Read More</span>
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "12px",
            marginBottom: "14px",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {article.date}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {article.views}
          </span>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "10px 0",
            borderRadius: "40px",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "'Montserrat', sans-serif",
            textDecoration: "none",
            transition: "background 0.2s, border-color 0.2s",
            background: hovered ? "#090920" : "transparent",
            boxShadow: hovered ? "4px 0 8px -3px rgba(139, 92, 246, 0.9)" : "none",
          }}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BlogDetailPage() {
  return (
    <div
      style={{
        background: "#0b0e1a",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }

        .article-body p {
          color: rgba(255,255,255,0.72);
          font-size: 14.5px;
          line-height: 1.85;
          margin-bottom: 18px;
        }
        .article-body h2 {
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          margin: 28px 0 10px;
          letter-spacing: 0.01em;
        }
        .article-body .section-heading {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          margin: 22px 0 8px;
          display: block;
        }
        .article-body ul {
          color: rgba(255,255,255,0.72);
          font-size: 14px;
          line-height: 1.9;
          padding-left: 22px;
          margin-bottom: 18px;
        }
        .article-body ul li {
          list-style: disc;
          margin-bottom: 4px;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111827; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #7c3aed; }

        /* ✅ MOBILE: hero image full width */
        .hero-img-wrapper {
          width: 740px;
          aspect-ratio: 16/9;
          background: #12162a;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 30px;
          overflow: hidden;
        }
        .hero-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.12) translate(-5%, -23%);
          display: block;
        }

        /* ✅ MOBILE: two-column → single column */
        .content-layout {
          display: flex;
          gap: 52px;
          align-items: flex-start;
        }
        .similar-sidebar {
          width: 320px;
          flex-shrink: 0;
          margin-top: 65px;
        }

        @media (max-width: 768px) {
          .content-layout {
            flex-direction: column;
            gap: 40px;
          }
          .hero-img-wrapper {
            width: 100%;
          }
          .hero-img-wrapper img {
            transform: none;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .similar-sidebar {
            width: 100%;
            margin-top: 0;
          }
          /* Unstick sidebar on mobile */
          .similar-sidebar > div {
            position: static !important;
          }
        }
      `}</style>

      <Navbar />
      <HeroBanner />

      {/* ── Main content area ── */}
      {/* ✅ FIX: clamp padding so it doesn't overflow on mobile */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "66px clamp(16px, 4vw, 48px) 0",
        }}
      >
        {/* Breadcrumb */}
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
            Home
          </Link>{" "}
          /{" "}
          <Link href="/blog" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
            Blogs
          </Link>
        </p>

        {/* ✅ FIX: use className so media query can target it */}
        <div className="content-layout">

          {/* ── LEFT: Article ── */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>

            <h6
              style={{
                fontSize: "clamp(22px, 3.4vw, 28px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#fff",
                marginBottom: "18px",
                letterSpacing: "-0.01em",
              }}
            >
              Pricing It Right? How to Avoid the Biggest{" "}
              <br className="desktop-only" /> Mistake Sellers Make.
            </h6>

            {/* Author row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "26px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <img src="/images/log.jpg" alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              </div>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 600 }}>John Doe</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>•</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>Social Media</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>•</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>March 20, 2026</span>
            </div>

            {/* ✅ FIX: hero image uses className, goes full-width on mobile */}
            <div className="hero-img-wrapper">
              <img src="/images/c3.jpg" alt="Blog hero" />
            </div>

            {/* Article body */}
            <div className="article-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori.
              </p>

              <h2>What Makes Selling Different – The Process</h2>

              <span className="section-heading">1. The No Objection Certificate (NOC)</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori.
              </p>

              <span className="section-heading">2. Transfer Fees: Who Pays What?</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori typically
                4% of the property's value, and any additional administrative charges.
              </p>
              <p>
                The good news? Usually, the buyer pays this fee in full, but sometimes the buyer and seller may
                agree to split the fee. This is where your negotiation skills come in handy.
              </p>

              <span className="section-heading">3. The Mortgage "Situationship"</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori before
                the transfer can be completed.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori.
              </p>

              <span className="section-heading">4. Selling Off-Plan Properties: A Different Story</span>
              <p>Bought off-plan and want to exit before completion? You're not alone.</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.
              </p>
              <p>
                Both buyer and seller must sign a transfer form, and the buyer pays the outstanding installments to
                the developer as per the payment plan. The original sale and purchase agreement (SPA) must also be
                presented at the time of resale.
              </p>
              <p>
                Selling off-plan can actually be lucrative if the market has appreciated since your purchase, but it
                requires developer approval and clear documentation of your payment history.
              </p>

              <span className="section-heading">The Agent Factor: To Hire or Not to Hire?</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori property?
                You might be wondering, do you really need one when it's time to sell?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori if you're
                unfamiliar with the documentation requirements or if you're selling while living abroad.
              </p>

              <span className="section-heading">Hidden Costs You Should Know</span>
              <p>Beyond the NOC fee and potential agent commissions, sellers should budget for:</p>
              <ul>
                <li>Outstanding service charges (must be cleared before sale)</li>
                <li>Early settlement fees if you have a mortgage</li>
                <li>Utility account closures and final bills</li>
                <li>Potentially minor repairs or touch-ups to make the property market-ready</li>
                <li>Photography and marketing materials (optional but can definitely help)</li>
              </ul>

              <span className="section-heading">Real Numbers (Examples)</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori 9.3% in
                volume and 25.3% in value, according to the Dubai Land Department.
              </p>

              <span className="section-heading">So, Is Reselling as Simple as Buying?</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Similar Articles ── */}
          <div className="similar-sidebar">
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "9px",
                letterSpacing: "0.01em",
              }}
            >
              Similar Articles
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                position: "sticky",
                top: "80px",
              }}
            >
              {similarArticles.map((article) => (
                <SimilarCard key={article.id} article={article} />
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}