"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhyCarousel from "@/components/layout/WhyCarousel";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

const faqs = [
  "Is this only for new systems?",
  "Is training generic or customized?",
  "Does this replace internal training teams?",
  "How long does training take?",
  "Is documentation included?",
];

const steps = [
  {
    num: "01",
    side: "right",
    tilt: 2,
    title: "Enablement Assessment",
    desc: "At every team we assess system complexity, training needs, adoption challenges, and the future potential.",
  },
  {
    num: "02",
    side: "left",
    tilt: -3,
    title: "Training Structure Design",
    desc: "Training plans are mapped to your team's structure and learning requirements for your platforms.",
  },
  {
    num: "03",
    side: "right",
    tilt: 2,
    title: "Delivery & Walkthroughs",
    desc: "Structured workshops and practical walkthroughs — learning by doing, not just observing.",
  },
  {
    num: "04",
    side: "left",
    tilt: -3,
    title: "Documentation & Support Materials",
    desc: "Clear, reusable reference documentation and support materials for your operational independence.",
  },
  {
    num: "05",
    side: "right",
    tilt: 2,
    title: "Review & Optimization",
    desc: "Usage and adoption metrics are reviewed and improvements are made iteratively to enhance effectiveness.",
  },
];

const serviceItems = [
  {
    title: "System Orientation & Onboarding",
    desc: "Your team understands the system from day one — purpose, process, workflow, and expected outcomes. Users learn the system the way they will use it — step by step, through business scenarios, ensuring fast adoption and consistent workflows.",
  },
  {
    title: "Role-Based Training",
    desc: "Each role gets guidance relevant to their function, ensuring teams can contain guidance relevant to their function. This enables confident, effective engagement and maintains operational efficiency.",
  },
  {
    title: "Operational Workflow Enablement",
    desc: "Teams go beyond clicking through their systems. We ensure the operational platform design matches real-life day-to-day tasks including team management, and fully operational workflows.",
  },
  {
    title: "Documentation & Reference Materials",
    desc: "Every training is paired with structured, reusable documentation so your team can navigate their systems and references independently, and your team can operate confidently without external support.",
  },
  {
    title: "Change & Adoption Support",
    desc: "Change management is built into every engagement. We support the behavioural integration, adoption strategies, and new features are integrated smoothly. This stabilises ongoing support, improves the dynamics, and strengthens the system's impact over time.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Shared heading: purple dot perfectly baseline-aligned with text
───────────────────────────────────────────────────────────────*/
function SectionHeading({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
      {/*
        30px font-size, lineHeight 1.25 → line box = 37.5px
        Cap-height ≈ 70% of font-size = 21px
        Leading above cap = (37.5 - 21) / 2 = 8.25px
        To centre 9px dot on cap: marginTop = 8.25 + (21/2) - (9/2) = 8.25 + 10.5 - 4.5 = 14.25 ≈ 6px
        (browsers add ~8px of internal leading before the first baseline)
        Empirically: marginTop 6 sits the dot on the cap-height centre.
      */}
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: "#B055F7",
          flexShrink: 0,
          marginTop: 12,
          display: "block",
        }}
      />
      <h2
        style={{
          fontWeight: 700,
          fontSize: 30,
          color: "#ffffff",
          lineHeight: 1.25,
          margin: 0,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function StepCard({ step }) {
  const outerTilt = step.tilt;
  const innerTilt = -outerTilt * 0.6;
  return (
    <div style={{ position: "relative", width: 240, height: 200, flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #d8d8d8 0%, #b8b8b8 100%)", borderRadius: 24, transform: `rotate(${outerTilt}deg)`, boxShadow: "0 8px 32px rgba(0,0,0,0.45)" }} />
      <div style={{ position: "absolute", top: outerTilt > 0 ? -10 : -12, left: "50%", transform: "translateX(-50%)", width: 20, height: 20, borderRadius: "50%", background: "#1a1a1a", border: "3px solid #3a3a3a", zIndex: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.6)" }} />
      <div style={{ position: "absolute", top: 14, left: 14, right: 14, bottom: 10, background: "linear-gradient(150deg, #c8c8c8 0%, #a8a8a8 100%)", borderRadius: 18, transform: `rotate(${innerTilt}deg)`, padding: "20px 18px 16px", display: "flex", flexDirection: "column", justifyContent: "flex-start", zIndex: 5, boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.2)" }}>
        <span style={{ fontSize: 26, fontWeight: 900, color: "#2a2a2a", lineHeight: 1, marginBottom: 8, fontFamily: "inherit" }}>{step.num}</span>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a", margin: "0 0 8px", lineHeight: 1.3 }}>{step.title}</h3>
        <p style={{ fontSize: 12, color: "#3a3a3a", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
      </div>
    </div>
  );
}

function Connector({ fromSide }) {
  const W = 700, H = 100;
  let x1, y1, x2, y2, cx1, cy1, cx2, cy2;
  if (fromSide === "right") { x1=510; y1=10; x2=190; y2=H-10; cx1=420; cy1=20; cx2=280; cy2=H-20; }
  else                       { x1=190; y1=10; x2=510; y2=H-10; cx1=280; cy1=20; cx2=420; cy2=H-20; }
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display:"block", margin:"0 auto", overflow:"visible", flexShrink:0 }}>
      <path d={`M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`} stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="8 7" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MobileConnector() {
  return (
    <div style={{ display:"flex", justifyContent:"center", margin:"8px 0" }}>
      <svg width="2" height="40" viewBox="0 0 2 40">
        <line x1="1" y1="0" x2="1" y2="40" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function EnablementTraining() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════════
           RESPONSIVE SYSTEM
           .mob  = mobile-only  (hidden on md+)
           .dsk  = desktop-only (hidden on mobile)
        ═══════════════════════════════════════ */
        .mob { display: none !important; }
        .dsk { display: block !important; }

        @media (max-width: 767px) {
          /* Show/hide */
          .mob { display: flex !important; }
          .dsk { display: none !important; }

          /* Hero */
          .hero-inner      { padding: 80px 20px 0 20px !important; }
          .hero-breadcrumb { margin-left: 0 !important; font-size: 12px !important; }
          .hero-dot        { margin-left: 0 !important; }
          .hero-title      { font-size: 20px !important; line-height: 1.3 !important; }
          .hero-desc       { margin-left: 0 !important; max-width: 100% !important; font-size: 13px !important; }

          /* Steps mobile */
          .steps-mobile    { display: flex !important; flex-direction: column; align-items: center; }

          /* Stats */
          .stats-text-left  { margin-left: 0 !important; }
          .stats-mob-grid   { display: grid !important; }

          /* FAQ */
          .faq-list { margin-left: 0 !important; max-width: 100% !important; }
          .faq-item { margin-right: 0 !important; }

          /* Quote */
          .quote-left { margin-top: 0 !important; }

          /* Service placeholder gone */
          .service-placeholder { display: none !important; }

          /* Why carousel scroll */
          .why-outer { overflow-x: auto !important; -webkit-overflow-scrolling: touch; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-inner      { padding: 90px 32px 0 32px !important; }
          .hero-dot        { margin-left: 0 !important; }
          .hero-breadcrumb { margin-left: 0 !important; }
          .hero-desc       { margin-left: 0 !important; }
          .steps-dsk-wrap  { max-width: 90% !important; margin-left: auto !important; margin-right: auto !important; }
          .stats-text-left { margin-left: 0 !important; }
        }
      `}</style>

      <Navbar />

      <main className="bg-[#0a0d14] text-white min-h-screen overflow-x-hidden">

        {/* ── HERO ── */}
        <div style={{ position:"relative", minHeight:"360px", display:"flex", alignItems:"flex-end" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"url('/images/jali.jpg')", backgroundSize:"cover", backgroundPosition:"center" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(15, 8, 25, 0.96) 0%, rgba(8, 8, 18, 1) 100%)" }} />
          <div className="hero-inner" style={{ position:"absolute", zIndex:2, padding:"0 48px 0 48px", paddingTop:"90px", width:"100%", marginBottom:"10px" }}>
            <p className="hero-breadcrumb" style={{ fontSize:"13px", color:"rgba(255,255,255,0.45)", marginBottom:"1px", marginLeft:"58px" }}>
              <Link href="/" style={{ color:"rgba(255,255,255,0.45)", textDecoration:"none" }}>Home</Link> / Portfolio
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:"15px", marginBottom:"2px" }}>
              <span className="hero-dot" style={{ display:"inline-block", width:10, height:10, borderRadius:"50%", background:"#B055F7", flexShrink:0, marginLeft:"50px" }} />
              <span className="hero-title" style={{ fontWeight:700, fontSize:30 }}>Enablement & Training, SMB Axis</span>
            </div>
            <p className="hero-desc" style={{ maxWidth:"600px", lineHeight:"1.6", color:"GrayText", marginLeft:"50px" }}>
              At SMB Axis, Enablement & Training go beyond one-time instruction. We focus on operational readiness, ensuring your teams can confidently navigate and use the systems built for them. Instead of generic sessions or documentation, we provide role-specific, workflow-aligned enablement that reduces errors, friction, and dependency on ongoing support.
            </p>
          </div>
        </div>

        <div style={{ padding:0, margin:0 }}>

          {/* ════ BG BLOCK 1 ════ */}
          <div style={{ position:"relative", width:"100vw", overflow:"hidden", background:`linear-gradient(rgba(5,0,15,0.97),rgba(5,0,15,0.96)),radial-gradient(ellipse 10% 60% at 70% 40%,rgba(130,50,220,0.18) 0%,transparent 70%),url('/images/bgo.png') center/contain no-repeat`, backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"contain" }}>

            {/* glows */}
            <div style={{ position:"absolute", right:"-80px", top:0, width:"920px", height:"10%", background:"linear-gradient(180deg,#151A21 10%,rgba(21,26,33,0.5) 50%,rgba(21,26,33,0) 100%)", filter:"blur(90px)", opacity:0.7, pointerEvents:"none" }} />
            <div style={{ position:"absolute", left:"-300px", top:"-290px", width:"880px", height:"1680px", background:"radial-gradient(circle,#B055F7 0%,transparent 50%)", filter:"blur(90px)", opacity:0.35, pointerEvents:"none" }} />

            {/* ── WHAT THIS SERVICE COVERS ── */}
            <section className="px-6 md:px-14 lg:px-24 py-16">
              <div className="max-w-6xl mx-auto">
                <SectionHeading>What This Service Covers</SectionHeading>
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="service-placeholder flex-1 min-h-[340px]" style={{ display:"flex" }} />
                  <div className="flex-1 flex flex-col gap-7">
                    {serviceItems.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <span className="text-white font-semibold text-normal w-8 mt-[4px]">{index + 1}.</span>
                        <div>
                          <h5 className="text-white font-semibold text-sm mb-1">{item.title}</h5>
                          <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── WHY SMB AXIS IS DIFFERENT ── */}
            <section className="px-6 md:px-14 lg:px-24 pb-4">
              <div className="max-w-6xl mx-auto">
                <SectionHeading>
                  Why SMB Axis Enablement &amp; Training<br />Is Different
                </SectionHeading>
              </div>
            </section>

            {/* Carousel — full-width container, scrollable on mobile */}
            <div className="why-outer" style={{ width:"100%", overflowX:"hidden" }}>
              <style>{`
                @media (max-width: 767px) {
                  /* Force WhyCarousel cards to fit within viewport */
                  .why-outer > * { width: 100% !important; min-width: 0 !important; }
                  .why-outer [class*="card"],
                  .why-outer [class*="Card"],
                  .why-outer [class*="slide"],
                  .why-outer [class*="Slide"],
                  .why-outer [class*="item"],
                  .why-outer [class*="Item"] {
                    width: calc(100vw - 48px) !important;
                    min-width: 0 !important;
                    max-width: 100% !important;
                    flex-shrink: 0 !important;
                    box-sizing: border-box !important;
                  }
                  /* If carousel uses a track/inner wrapper */
                  .why-outer [class*="track"],
                  .why-outer [class*="Track"],
                  .why-outer [class*="inner"],
                  .why-outer [class*="Inner"],
                  .why-outer [class*="wrapper"],
                  .why-outer [class*="Wrapper"] {
                    width: max-content !important;
                    display: flex !important;
                    flex-direction: row !important;
                  }
                  /* Outer scroll container inside carousel */
                  .why-outer [class*="container"],
                  .why-outer [class*="Container"] {
                    overflow-x: auto !important;
                    -webkit-overflow-scrolling: touch;
                    width: 100% !important;
                  }
                }
              `}</style>
              <WhyCarousel />
            </div>

            <div style={{ position:"absolute", left:"800px", top:"990px", width:"980px", height:"1880px", background:"radial-gradient(circle,#B055F7 0%,transparent 50%)", filter:"blur(90px)", opacity:0.35, pointerEvents:"none" }} />

            {/* ── HOW WE GUIDE YOU ── */}
            <section className="px-6 md:px-14 lg:px-24 py-16">

              {/* Desktop zigzag */}
              <div className="steps-dsk-wrap dsk" style={{ maxWidth:"65%", marginLeft:"180px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:19 }}>
                  <span style={{ width:9, height:9, borderRadius:"50%", background:"#B055F7", flexShrink:0, marginLeft:"-180px", marginTop:12, display:"inline-block" }} />
                  <h2 style={{ fontWeight:800, fontSize:30, color:"#ffffff", lineHeight:1.25 }}>
                    How We Guide You Through<br />Enablement
                  </h2>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
                  {steps.map((step, i) => (
                    <div key={step.num} style={{ width:"100%" }}>
                      <div style={{ display:"flex", justifyContent: step.side==="right"?"flex-end":"flex-start", paddingLeft: step.side==="left"?"5%":0, paddingRight: step.side==="right"?"5%":0 }}>
                        <StepCard step={step} />
                      </div>
                      {i < steps.length - 1 && (
                        <div style={{ marginTop:-10, marginBottom:-150 }}>
                          <Connector fromSide={step.side} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile vertical stack */}
              <div className="steps-mobile mob" style={{ display:"none", flexDirection:"column", alignItems:"center" }}>
                <div style={{ width:"100%", marginBottom:28 }}>
                  <SectionHeading>How We Guide You Through Enablement</SectionHeading>
                </div>
                {steps.map((step, i) => (
                  <div key={step.num} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <StepCard step={step} />
                    {i < steps.length - 1 && <MobileConnector />}
                  </div>
                ))}
              </div>

            </section>
          </div>
          {/* ════ END BG BLOCK 1 ════ */}

          {/* ════ BG BLOCK 2 ════ */}
          <div style={{ position:"relative", width:"100vw", overflow:"hidden", background:`linear-gradient(rgba(5,0,15,0.97),rgba(5,0,15,0.96)),radial-gradient(ellipse 10% 60% at 70% 40%,rgba(130,50,220,0.18) 0%,transparent 70%),url('/images/bgo.png') center/contain no-repeat`, backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"contain" }}>
            <div style={{ position:"absolute", left:"-800px", top:"200px", width:"1600px", height:"380px", background:"radial-gradient(circle,#B055F7 0%,transparent 50%)", filter:"blur(140px)", opacity:0.35, pointerEvents:"none" }} />

            {/* ── FAQ ── */}
            <section className="px-6 md:px-14 lg:px-24 py-16">
              <div className="max-w-6xl mx-auto">
                <SectionHeading>Frequently Asked Questions</SectionHeading>
                <p className="text-white/40 text-sm mb-10 ml-5">All Your Queries in One Place</p>
                <div className="faq-list flex flex-col gap-3 max-w-2xl ml-auto">
                  {faqs.map((faq, i) => (
                    <div key={i} className="faq-item rounded-[10px] overflow-hidden transition-all duration-200"
                      style={{ padding:"10px", marginRight:"20px", background:"#000000", borderTop:"1px solid rgba(255,255,255,0.06)", borderRight:"1px solid rgba(255,255,255,0.06)", borderBottom: openFaq===i ? "1px solid #a855f7" : "1px solid rgba(255,255,255,0.06)", borderLeft: openFaq===i ? "3px solid #a855f1" : "2px solid rgba(139,92,246,0.98)" }}>
                      <button className="w-full flex items-center justify-between px-6 py-4 text-left text-sm text-white transition-colors" onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                        <span className="text-white/90 text-[16px]">{faq}</span>
                        <span className="text-white text-xl leading-none flex-shrink-0 ml-4 font-light">{openFaq===i ? "−" : "+"}</span>
                      </button>
                      {openFaq===i && (
                        <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed border-t border-white/10 pt-4">
                          Our team provides tailored answers and solutions. Please get in touch with us for a detailed consultation specific to your needs.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── STATS BANNER ── */}
            <section style={{ position:"relative", overflow:"hidden", backgroundImage:`url('/images/jalee.png')`, backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat", minHeight:"320px" }}
              className="px-6 md:px-14 lg:px-24 py-16">
              <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 90% 90% at 30% 40%,rgba(10,10,10,0.95) 0%,rgba(0,0,0,0.6) 10%,transparent 90%),linear-gradient(to right,rgba(8,8,18,0.95) 0%,rgba(8,8,18,0.75) 40%,rgba(10,10,15,0.94) 90%)`, pointerEvents:"none" }} />
              <div className="max-w-6xl mx-auto" style={{ position:"relative", zIndex:1 }}>
                <div className="flex flex-col md:flex-row gap-10 items-center">

                  {/* Text left — desktop keeps original ml-39 offset via wrapper */}
                  <div className="flex-1 stats-text-left">

                    {/* Desktop version: big heading, original margin */}
                    <div className="dsk" style={{ marginLeft:"156px" }}>
                      <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                        Enablement<br />That Actually<br />Sticks
                      </h2>
                      <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                        Our enablement and training systems are designed to improve adoption, reduce operational friction, and ensure teams operate systems with confidence and consistency.
                      </p>
                    </div>

                    {/* Mobile version: balanced heading via SectionHeading */}
                    <div className="mob" style={{ display:"none", flexDirection:"column" }}>
                      <SectionHeading>Enablement That Actually Sticks</SectionHeading>
                      <p className="text-white/50 text-sm leading-relaxed mt-2">
                        Our enablement and training systems are designed to improve adoption, reduce operational friction, and ensure teams operate systems with confidence and consistency.
                      </p>
                    </div>
                  </div>

                  {/* Desktop tilted cards */}
                  <div className="dsk flex-1" style={{ position:"relative", height:"270px", minWidth:"100px" }}>
                    {[
                      { value:"50%",        label:"Reduction in Usage Errors. Clear workflows and practical training minimize misconfiguration and incorrect system use.", rotate:"38deg", top:"-62px",  right:"-90px",  left:"454px", zIndex:1 },
                      { value:"60%+",       label:"Faster System Adoption. Structured onboarding and role-based training reduces ramp-up time across teams.",             rotate:"38deg", top:"120px",  right:"50px",               zIndex:2 },
                      { value:"Ente\nReady",label:"Security, access control, and scalability built into every platform from day one.",                                    rotate:"38deg", top:"189px",  right:"-170px",              zIndex:3 },
                      { value:"Ente\nReady",label:"Security, access control, and scalability built into every platform from day one.",                                    rotate:"38deg", top:"5px",    right:"-320px",              zIndex:3 },
                      { value:"100%",       label:"Teams Enabled across industries with consistent results.",                                                             rotate:"38deg", top:"300px",  right:"193px",               zIndex:2 },
                    ].map((card, i) => (
                      <div key={i} style={{ position:"absolute", top:card.top, right:card.right, left:card.left, width:"200px", minHeight:"220px", background:"#000000", border:"1px solid #9FA0A2", borderRadius:"16px", padding:"16px", transform:`rotate(${card.rotate})`, zIndex:card.zIndex, display:"flex", flexDirection:"column", gap:"20px" }}>
                        <span style={{ fontSize:"26px", fontWeight:900, color:"#ffffff", lineHeight:1, whiteSpace:"pre-line" }}>{card.value}</span>
                        <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)", lineHeight:1.5, margin:0 }}>{card.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mobile flat stat cards */}
                  <div className="stats-mob-grid w-full mob"
                    style={{ display:"none", gridTemplateColumns:"1fr 1fr", gap:"12px", marginTop:"16px" }}>
                    {[
                      { value:"50%",             label:"Reduction in Usage Errors" },
                      { value:"60%+",            label:"Faster System Adoption" },
                      { value:"Enterprise Ready", label:"Security & Access Control Built-In" },
                      { value:"100%",            label:"Teams Enabled Across Industries" },
                    ].map((card, i) => (
                      <div key={i} style={{ background:"#000", border:"1px solid #9FA0A2", borderRadius:"12px", padding:"16px", display:"flex", flexDirection:"column", gap:"10px" }}>
                        <span style={{ fontSize:"22px", fontWeight:900, color:"#fff", lineHeight:1 }}>{card.value}</span>
                        <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)", lineHeight:1.5, margin:0 }}>{card.label}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </section>

            {/* ── QUOTE FORM + AGENCY ── */}
            <section className="px-6 md:px-12 lg:px-20 py-16">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">

                <div className="quote-left flex-1 mt-0 md:mt-20">
                  <SectionHeading>
                    We're the best Web design<br />agency in City
                  </SectionHeading>
                  <ul className="flex flex-col gap-3 mt-6">
                    {["Lorem ipsum","Supra infusior scriptis leo","Etiam sollicitudin dignissim posuere"].map(item => (
                      <li key={item} className="flex items-start gap-3 text-white/60 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 rounded-2xl p-4" style={{ background:"linear-gradient(135deg,rgba(30,27,46,0.95) 0%,rgba(10,13,20,0.98) 100%)", border:"1px solid rgba(168,85,247,0.2)" }}>
                  <h3 className="!text-[33px] font-bold mb-6">Get a free quote</h3>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Name</label>
                      <input type="text" placeholder="Your Name *" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Email</label>
                      <input type="email" placeholder="Your Email *" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Phone</label>
                      <input type="tel" placeholder="Your Phone" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Question</label>
                      <textarea placeholder="Question *" rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors resize-none" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-between">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="consent" className="mt-1 accent-purple-500" />
                        <label htmlFor="consent" className="text-white/40 text-xs leading-relaxed">
                          I accept that you can store and process my data<br />and contact us at fields
                        </label>
                      </div>
                      <button className="w-[100px] py-1 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:brightness-110" style={{ boxShadow:"0 0 20px rgba(139,92,246,0.3)" }}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>
          {/* ════ END BG BLOCK 2 ════ */}

        </div>
      </main>

      <Footer />
    </>
  );
}
