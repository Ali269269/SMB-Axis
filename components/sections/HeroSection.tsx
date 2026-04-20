'use client';
import { Space_Grotesk } from "next/font/google";
import { useEffect, useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

/* ============================================================
   TECH ANIMATION COMPONENTS
   ============================================================ */

function TechBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 3D Floating Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#B055F7]/15 blur-xl animate-pulse"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              transform: `translateZ(${Math.random() * 100}px)`,
            }}
          />
        ))}
      </div>

      {/* Glowing Mesh / Grid Effect */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #B055F7 1px, transparent 5px),
            linear-gradient(to bottom, #B055F7 1px, transparent 8px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at 50% 50%, white, transparent)',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
        }}
      />

      {/* Floating Tech Elements (Code/Binary) */}
      <div className="absolute inset-0 z-0 opacity-90">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#B055F7] font-mono text-[10px] sm:text-xl animate-float-slow select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}
          >
            {['{ }', '0101', '0x1', '&&'][i % 7]}
          </div>
        ))}
      </div>

      {/* Data Connection Nodes */}
      <div className="absolute inset-0 z-0 opacity30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-[#B055F7] rounded-full animate-ping-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          33% { transform: translate(30px, -50px) rotate(5deg); opacity: 0.8; }
          66% { transform: translate(-20px, 20px) rotate(-5deg); opacity: 0.5; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(3); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .animate-float-slow {
          animation: float-slow linear infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   HERO SECTION — SMB AXIS HOME PAGE
   ============================================================ */

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        width: "100%",
        minHeight: "605px",
        backgroundImage: "url('/images/Mask.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0d0d1a",
      }}
    >
      {/* 3D TECH BACKGROUND */}
      <TechBackground />

      {/* GRADIENT OVERLAY */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a]/85 to-[#0d0d1a]/20 z-1"
      />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-50 pb-12 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT COLUMN — HEADLINE + CTA */}
        <div className="flex-1 max-w-xl relative">
<h2
  className={`${spaceGrotesk.className} mb-10`}
  style={{
    fontWeight: "700",
    fontSize: "clamp(31px, 3.5vw, 55px)",
    lineHeight: "1.1",
    letterSpacing: "-0.03em",
  }}
>
  <span className="block">
    <span className="text-white">Powering </span>
    <span className="bg-[linear-gradient(95.78deg,_#FFFFFF_4.6%,_#B055F7_112.89%)] bg-clip-text text-transparent">
      Real Estate
    </span>
  </span>

  <span className="block text-white">
    Through Technology
  </span>

  <span className="block">
    <span className="text-white">With </span>
    <span className="bg-[linear-gradient(95.78deg,_#FFFFFF_4.6%,_#B055F7_112.89%)] bg-clip-text text-transparent">
      SMB Axis
    </span>
  </span>
</h2>
          <p
            className="mb-8 text-white font-medium"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px",
              lineHeight: "1.3",
            }}
          >
            Structured systems that bring clarity, control, and scale to Real Estate operations.
          </p>

    <button
  className="inline-flex items-center justify-center text-white text-sm font-semibold tracking-wide transition-all duration-200 rounded-[42px] px-8 py-3 bg-[#151A21] hover:bg-white/10"
  style={{
    gap: "14px",
    border: "1px solid rgba(176,85,247,0.45)",
    boxShadow: "6px 0 6px rgba(176,85,247,0.35)", // 👈 small, tight glow
  }}
>
  Request a System Review
</button>
        </div>

   {/* RIGHT COLUMN — "Get a Free Quote" FORM CARD */}
<div
  className="w-full max-w-[444px] flex-shrink-0 p-7 rounded-2xl lg:ml-35  mx-auto lg:mx-0 "
  style={{
    background: "rgba(255, 255, 255, 0.10)",
    backdropFilter: "blur(1px)",
    border: "1px solid rgba(255, 255, 255, 0.10)",
    borderRadius: "20px",
  }}
>
  {/* TITLE — "Get a free quote" */}
  <h2
    className="text-white mb-5"
    style={{
      fontFamily: "'spaceGrotesk', sans-serif",
      fontWeight: 700,
      fontSize: "24px",
      letterSpacing: "0px",
      lineHeight: "1.3",
    }}
  >
    Get a free quote
  </h2>

  <div className="flex flex-col gap-[10px]">

    {/* Name */}
    <input
      type="text"
      placeholder="Mickel"
      className="w-full outline-none transition-all duration-200 text-white font-semibold"
      style={{
        background: "#3D404B",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        borderRadius: "10px",
        padding: "12px 16px",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
        fontSize: "14px",
        color: "#ffffff",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.55)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
    />

    {/* Email */}
    <input
      type="email"
      placeholder="Your Email *"
      className="w-full outline-none transition-all duration-200"
      style={{
        background: "#3D404B",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        borderRadius: "10px",
        padding: "12px 16px",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 400,
        fontSize: "13px",
        color: "#ffffff",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.55)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
    />

    {/* Phone */}
    <input
      type="tel"
      placeholder="Phone Number *"
      className="w-full outline-none transition-all duration-200"
      style={{
        background: "#3D404B",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        borderRadius: "10px",
        padding: "12px 16px",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 400,
        fontSize: "13px",
        color: "#ffffff",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.55)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
    />

    {/* Solutions dropdown */}
    <div className="relative">
      <select
        className="w-full appearance-none outline-none cursor-pointer transition-all duration-200"
        defaultValue=""
        style={{
          background: "#3D404B",
          border: "1px solid rgba(255, 255, 255, 0.10)",
          borderRadius: "10px",
          padding: "12px 16px",
          paddingRight: "40px",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 400,
          fontSize: "13px",
          color: "rgba(255,255,255,0.45)",
          width: "100%",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.55)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
      >
        <option value="" disabled style={{ background: "#16122a", color: "rgba(255,255,255,0.45)" }}>
          Solutions*
        </option>
        <option value="property" style={{ background: "#16122a", color: "#fff" }}>Property Management</option>
        <option value="crm" style={{ background: "#16122a", color: "#fff" }}>CRM Tools</option>
        <option value="analytics" style={{ background: "#16122a", color: "#fff" }}>Analytics</option>
      </select>

      {/* Chevron icon */}
      <svg
        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        style={{ color: "rgba(255,255,255,0.45)" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    {/* Question textarea */}
    <textarea
      placeholder="Question *"
      rows={4}
      className="w-full outline-none resize-none transition-all duration-200"
      style={{
        background: "#3D404B",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        borderRadius: "20px",
        padding: "12px 16px",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 400,
        fontSize: "13px",
        color: "#ffffff",
        minHeight: "96px",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.55)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
    />

    {/* Checkbox + Submit */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">

      <label className="flex items-start gap-2 cursor-pointer flex-1">
        <input
          type="checkbox"
          className="mt-0.5 w-[14px] h-[14px] flex-shrink-0 cursor-pointer"
          style={{ accentColor: "#a855f7" }}
        />
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: "11px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: "1.4",
          }}
        >
          Share a few details, a quote will be sent within 24 hours.
        </span>
      </label>

      <button
        type="submit"
        className="mt-2 sm:mt-0"
        style={{
          background: "transparent",
          border: "1px solid #a855f7",
          borderRadius: "999px",
          padding: "8px 20px",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: "13px",
          color: "#ffffff",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.background = "rgba(168,85,247,0.12)";
          btn.style.boxShadow = "0 0 12px rgba(168,85,247,0.25)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.background = "transparent";
          btn.style.boxShadow = "none";
        }}
      >
        Submit
      </button>
    </div>
  </div>
</div>

      </div>
    </section>
  );
}