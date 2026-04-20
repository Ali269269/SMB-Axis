'use client';

import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Space_Grotesk } from "next/font/google";
import { useState, useEffect } from "react";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

const funnelStages = [
  {
    number: "01",
    title: "Awareness",
    desc: "Capture attention through targeted ads, SEO content, and social media campaigns that bring the right audience to your brand.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Interest & Capture",
    desc: "Convert visitors into leads with high-converting landing pages, lead magnets, and irresistible opt-in offers.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.8 19.8 0 01.04 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Nurture",
    desc: "Build trust through automated email sequences, retargeting campaigns, and personalised content journeys.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Convert",
    desc: "Close deals with precision — optimised checkout flows, urgency triggers, and frictionless conversion paths.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
];

const services = [
  {
    title: "Landing Page Design",
    desc: "Conversion-optimised pages built with persuasive copy, social proof, and clear CTAs that turn visitors into leads.",
    tag: "Design",
    tagColor: "#7c3aed",
  },
  {
    title: "Lead Magnet Creation",
    desc: "Irresistible free resources — ebooks, checklists, webinars — crafted to attract and qualify your ideal customers.",
    tag: "Content",
    tagColor: "#0891b2",
  },
  {
    title: "Email Automation",
    desc: "Multi-step drip campaigns that nurture cold leads into warm prospects automatically, 24/7.",
    tag: "Automation",
    tagColor: "#059669",
  },
  {
    title: "Paid Ad Funnels",
    desc: "Full-funnel paid media strategies on Meta, Google, and LinkedIn — from scroll-stopping creatives to retargeting.",
    tag: "Paid Media",
    tagColor: "#d97706",
  },
  {
    title: "CRM Pipeline Setup",
    desc: "Custom CRM workflows that track every lead, score prospects, and alert your team at the perfect moment.",
    tag: "CRM",
    tagColor: "#dc2626",
  },
  {
    title: "Analytics & Optimisation",
    desc: "Continuous A/B testing, heatmaps, and conversion reporting to systematically grow your funnel performance.",
    tag: "Analytics",
    tagColor: "#7c3aed",
  },
];

const stats = [
  { value: "3.8x", label: "Average ROI on funnel spend" },
  { value: "67%", label: "Reduction in cost per lead" },
  { value: "12K+", label: "Leads generated monthly" },
  { value: "94%", label: "Client retention rate" },
];

const faqs = [
  {
    q: "How long does it take to see results?",
    a: "Most clients begin seeing qualified leads within 2–4 weeks of launch. Full funnel optimisation typically reaches peak performance at the 60-day mark.",
  },
  {
    q: "Do you work with specific industries?",
    a: "We specialise in real estate, B2B services, and professional services. Our funnels are tailored to your industry's buyer journey and compliance requirements.",
  },
  {
    q: "What makes your funnels different?",
    a: "We combine data-driven copywriting, behavioural psychology, and automation to create funnels that don't just attract leads — they attract the right leads.",
  },
  {
    q: "Can you integrate with our existing CRM?",
    a: "Yes. We integrate with HubSpot, Salesforce, GoHighLevel, Pipedrive, and most major CRM platforms via native integrations or Zapier.",
  },
];

export default function LeadGeneration() {
  const [openFaq, setOpenFaq] = useState(null);
  const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 700;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

  return (
    <>
      <style>{`
       

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 100px;
          border: 1px solid rgba(168,85,247,0.35);
          background: rgba(168,85,247,0.08);
          font-size: 12px; font-weight: 500; letter-spacing: 1.5px;
          text-transform: uppercase; color: #c084fc; margin-bottom: 24px;
        }

        .hero-title {
         
          font-size: clamp(38px, 6vw, 60px);
          font-weight: 800; line-height: 1.08;
          color: #fff; margin: 0 0 24px;
        }
        .hero-title span { color: #a855f7; }

        .section-label {
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #a855f7; margin-bottom: 12px;
        }
        .section-title {
         
          font-size: clamp(20px, 3vw, 30px); font-weight: 400;
          color: #fff; line-height: 1.2; margin: 0 0 16px;
        }

        .stat-card {
          background: rgba(168,85,247,0.06);
          border: 1px solid rgba(168,85,247,0.18);
          border-radius: 16px; padding: 32px 24px; text-align: center;
          transition: border-color 0.2s, transform 0.2s;
        }
        .stat-card:hover { border-color: rgba(168,85,247,0.5); transform: translateY(-4px); }
        .stat-value {
          
          font-size: 52px; font-weight: 800; color: #a855f7; line-height: 1;
        }
        .stat-label { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 8px; }

        .funnel-step {
          display: flex; gap: 24px; align-items: flex-start;
          padding: 28px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.2s, background 0.2s;
        }
        .funnel-step:hover {
          border-color: rgba(168,85,247,0.3);
          background: rgba(168,85,247,0.04);
        }
        .funnel-number {
         
          font-size: 48px; font-weight: 800;
          color: rgba(168,85,247,0.2); line-height: 1; flex-shrink: 0;
          min-width: 60px;
        }

        .service-card {
          background: #13181f; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; padding: 28px;
          transition: border-color 0.2s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: linear-gradient(90deg, #7c3aed, #a855f7, transparent);
          opacity: 0; transition: opacity 0.2s;
        }
        .service-card:hover { border-color: rgba(168,85,247,0.3); transform: translateY(-4px); }
        .service-card:hover::before { opacity: 1; }

        .service-tag {
          display: inline-block; font-size: 10px; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px; margin-bottom: 14px;
        }

        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 32px; border-radius: 100px;
          background: #a855f7; color: #fff;
          font-size: 15px; font-weight: 500;
          text-decoration: none; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 24px rgba(168,85,247,0.35);
        }
        .cta-btn:hover { background: #9333ea; transform: translateY(-2px); box-shadow: 0 0 36px rgba(168,85,247,0.5); }

        .cta-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 32px; border-radius: 100px;
          background: transparent; color: #fff;
          font-size: 15px; font-weight: 500;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.18);
          transition: border-color 0.2s, background 0.2s;
        }
        .cta-btn-outline:hover { border-color: rgba(168,85,247,0.5); background: rgba(168,85,247,0.08); }

        .faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .faq-btn {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          padding: 22px 0; background: none; border: none; cursor: pointer;
          color: #fff; font-size: 16px; 
          font-weight: 500; text-align: left; gap: 16px;
        }
        .faq-answer { padding: 0 0 20px; color: rgba(255,255,255,0.55); font-size: 15px; line-height: 1.7; }

        .grid-dots {
          background-image: radial-gradient(circle, rgba(168,85,247,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }
      `}</style>

      <div className="lg-page">
        <Navbar />

    <div
        style={{
          position: "relative",
          minHeight: "360px",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/fuu.jpg')",
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
            position: "relative",
            zIndex: 2,
            padding: "0 48px 0 48px",
            paddingTop: "80px",
            width: "100%",
          }}
        />
      </div>

      {/* Breadcrumb */}
      <div style={{ padding: "10px 5%", fontSize: 14, color: "#555a72" }}>
        <span>Home</span>
        <span style={{ margin: "0 4px" }}>/</span>
        <span style={{ color: "#7a7f99" }}>Leads & Funnels</span>
      </div>

      {/* Section heading */}
      <div
        style={{
          padding: "4px 5% 36px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#B055F7",
            flexShrink: 0,
          }}
        />
        <span style={{ fontWeight: 700, fontSize: 30 }}>
          Leads & Funnels That Drive Growth 
        </span>
      </div>



        {/* ── STATS BAR ── */}
      
        <div
  style={{
    position: "relative",
    width: "100%",
    padding: "26px 10% 100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 40,
    flexWrap: "wrap",
  }}
>
  {/* ── LEFT CONTENT ── */}
  <div style={{ maxWidth: 560 }}>
    <div className="hero-badge">Core Revenue System</div>

    <h1 className="hero-title">
      Turn Traffic Into <br />
      <span>Qualified Leads</span>
    </h1>

    <p
      style={{
        fontSize: 17,
        color: "rgba(255,255,255,0.55)",
        lineHeight: 1.7,
        marginBottom: 30,
      }}
    >
      We design high-converting lead generation funnels that attract,
      nurture, and convert your ideal customers — consistently and
      predictably.
    </p>

    {/* Mini bullets */}
    <div style={{ marginBottom: 30 }}>
      {[
        "High-converting landing pages",
        "Automated email nurturing",
        "Data-driven funnel optimisation",
      ].map((item) => (
        <div
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
            color: "rgba(255,255,255,0.7)",
            fontSize: 14,
          }}
        >
          <span style={{ color: "#a855f7" }}>✔</span>
          {item}
        </div>
      ))}
    </div>

    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      <Link href="/contact" className="cta-btn">
        Get More Leads
      </Link>

      <Link href="#how-it-works" className="cta-btn-outline">
        View Funnel System
      </Link>
    </div>
  </div>

  {/* ── RIGHT FLOATING CHIPS ── */}
  <div
    style={{
      position: "relative",
      minWidth: 260,
    }}
  >
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {[
        {
          label: "Leads Generated",
          value: "12,847",
          change: "+32%",
          up: true,
        },
        {
          label: "Conversion Rate",
          value: "8.4%",
          change: "+1.8%",
          up: true,
        },
        {
          label: "Cost Per Lead",
          value: "$6.20",
          change: "-23%",
          up: false,
        },
      ].map((chip) => (
        <div
          key={chip.label}
          style={{
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(13,17,23,0.9))",
            border: "1px solid rgba(168,85,247,0.35)",
            borderRadius: 16,
            padding: "16px 22px",
            backdropFilter: "blur(14px)",
            boxShadow: "0 0 30px rgba(168,85,247,0.15)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            {chip.label}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#fff",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {chip.value}
            </span>

            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: chip.up ? "#4ade80" : "#f87171",
                background: chip.up
                  ? "rgba(74,222,128,0.12)"
                  : "rgba(248,113,113,0.12)",
                padding: "4px 10px",
                borderRadius: 100,
              }}
            >
              {chip.up ? "↑" : "↓"} {chip.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

 <section
  style={{
    padding: "60px 6%",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: 20,
    }}
  >
    {stats.map((s) => (
      <div key={s.label} className="stat-card">
        <div className="stat-value">
          <Counter value={parseFloat(s.value)} />
        </div>
        <div className="stat-label">{s.label}</div>
      </div>
    ))}
  </div>
</section>
        {/* ── HOW THE FUNNEL WORKS ── */}
        <section id="how-it-works" style={{ padding: "100px 6%" }}>
          <div style={{ maxWidth: 640, marginBottom: 60 }}>
            <div className="section-label">The Framework</div>
            <h6 className="section-title fontsize:30">Your 4-Stage Funnel System</h6>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7 }}>
              Every lead goes through a proven journey — from first touch to signed deal. We engineer each stage for maximum conversion and minimum waste.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {funnelStages.map((stage, i) => (
              <div key={stage.title} className="funnel-step" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="funnel-number">{stage.number}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {stage.icon}
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, color: "#fff", margin: 0 }}>{stage.title}</h3>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.65, margin: 0 }}>{stage.desc}</p>
                </div>
                {/* Connector line */}
                {i < funnelStages.length - 1 && (
                  <div style={{
                    position: "absolute", left: 52, bottom: -16,
                    width: 1, height: 16,
                    background: "linear-gradient(180deg, rgba(168,85,247,0.4), transparent)",
                  }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section style={{ padding: "80px 6%", background: "rgba(255,255,255,0.015)" }}>
          <div style={{ maxWidth: 640, marginBottom: 60 }}>
            <div className="section-label">Our Services</div>
            <h2 className="section-title">Everything You Need to Fill Your Pipeline</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {services.map((svc) => (
              <div key={svc.title} className="service-card">
                <span
                  className="service-tag"
                  style={{
                    background: `${svc.tagColor}20`,
                    color: svc.tagColor,
                    border: `1px solid ${svc.tagColor}40`,
                  }}
                >
                  {svc.tag}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: "0 0 10px" }}>{svc.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROCESS STRIP ── */}
        <section style={{ padding: "80px 6%" }}>
          <div style={{ maxWidth: 640, marginBottom: 56 }}>
            <div className="section-label">Our Process</div>
            <h2 className="section-title">From Strategy to Scale in 30 Days</h2>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 0, position: "relative" }}>
            {["Audit & Strategy", "Build & Launch", "Test & Optimise", "Scale & Automate"].map((step, i) => (
              <div
                key={step}
                style={{
                  flex: "1 1 200px",
                  padding: "32px 28px",
                  borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(168,85,247,0.15)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#a855f7",
                  marginBottom: 16,
                }}>
                  {i + 1}
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>{step}</h4>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6 }}>
                  {["Deep-dive into your current pipeline and define your ideal customer profile.", "Deploy landing pages, automations, and ad campaigns.", "A/B test copy, visuals, and flows to boost conversion rates.", "Increase budget and expand to new channels confidently."][i]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: "80px 6%", background: "rgba(255,255,255,0.015)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <div className="section-label">FAQ</div>
              <h2 className="section-title">Questions We Hear Often</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1.7 }}>
                Not sure if this is right for you? Here are the most common questions from clients before they started.
              </p>
              <div style={{ marginTop: 32 }}>
                <Link href="/contact" className="cta-btn">Talk to an Expert</Link>
              </div>
            </div>

            <div>
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button
                    className="faq-btn"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <svg
                      width="18" height="18" fill="none" stroke="#a855f7" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                      style={{ transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none", flexShrink: 0 }}
                    >
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                  {openFaq === i && <div className="faq-answer">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA BANNER ── */}
        <section
          style={{
            margin: "0 6% 80px",
            borderRadius: 24,
            padding: "72px 60px",
            position: "relative", overflow: "hidden",
            background: "#0f0a1e",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          {/* Orb */}
          <div style={{
            position: "absolute", top: "-30%", right: "-5%",
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div className="grid-dots" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />

          <div style={{ position: "relative", maxWidth: 600 }}>
            <div className="section-label">Ready to grow?</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#fff", margin: "0 0 18px", lineHeight: 1.15 }}>
              Build a funnel that works while you sleep
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
              Book a free strategy call and we'll map out a custom lead generation system for your business in 30 minutes.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <Link href="/contact" className="cta-btn">Book Free Strategy Call</Link>
              <Link href="/our-portfolio" className="cta-btn-outline">View Case Studies</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
