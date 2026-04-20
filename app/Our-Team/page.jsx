'use client';
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

// ─── Team Data ────────────────────────────────────────────────────────────────
const teamMembers = [
 { name: "Simo Berrada", role: "CEO & Founder of the SMB Axis.", desc:"Visionary leader driving strategy, growth, and innovation.", image:"/images/founder.png",scale:"scale-[1.20]",y:-16},
  { name: "Arooj Saqib", role: "Product Engineering Lead", desc:"Leads product architecture and ensures scalable engineering solutions.", image: "/images/aroj.png",scale:"scale-[0.82]", x:34, y:-69 },
  { name: "Rida Hasan", role: "Creativity & Design Lead", desc:"Heads creative direction with a focus on modern, user-centric design.", image: "/images/reda.png",scale:"scale-[0.86]",y:-22 },
  { name: "Suleman", role: "Mern Stack Developer", desc:"Builds robust full-stack applications using MERN technologies.", image: "/images/suliman.png",scale:"scale-[0.85]",y:-35 },
  { name: "Arish", role: "AI Developer", desc:"Contributes to development with clean and efficient coding practices and AI expertice.", image: "/images/Arish.png",scale:"scale-[0.81]",y:-15 },
  { name: "Qurban Ali", role: "Cyber Security Expert", desc:"Specializes in building security of web application.", image: "/images/Ali.png",scale:"scale-[1.14]",y:-10,x:-12 },
  { name: "Mohaiman", role: "Video Editor & Media Production", desc:"Crafts engaging visuals and handles professional video production.", image: "/images/moo.png",scale:"scale-[0.67]",y:-30 },
  { name: "Laiba Ijaz", role: "Graphic Designer & UI/UX", desc:"Designs intuitive interfaces with strong visual storytelling.", image: "/images/liaba.png",scale:"scale-[0.78]",x:37,y:-70 },
  { name: "Husna", role: "Digital Marketing Expert", desc:"Focuses on creative layouts and enhancing visual experiences.", image: "/images/husnaa.png",scale:"scale-[0.84]",y:-17 },
 

 
];

// Avatar images for the hero banner strip — replace nulls with real paths
const heroAvatars = ["/images/liaba.png", "/images/suliman.png","/images/Ali.png","/images/aroj.png","/images/husnaa.png", "/images/mohaiman.png","/images/Arish.png","/images/reda.png","/images/founder.png"];
const avatarControls = [
  { x: 1, y: 10, scale: 1 },
  { x: 1, y: 10, scale: 1 },
  { x: -18, y: 20, scale: 1.2 },
  { x: 0, y: -13, scale: 1.1 },
  { x: 2, y: 12, scale: 1.1 },
  { x: -10, y: 1, scale: 1 },
  { x: 0, y: 0, scale: 1 },
  { x: 5, y: 15, scale: 1.2 },
  { x: -5, y: 17, scale: 1.3 },
];
// ─── Arrow Icon ───────────────────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg width="83" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Team Card ────────────────────────────────────────────────────────────────
function TeamCard({ member }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        perspective: "1000px",
        width: 350,
        height: 420,
        marginTop: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >

        {/* FRONT */}
       <div
  style={{
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    background: "#13151f",
    borderRadius: 12,
    border: "1px solid #1e2133",
    overflow: "hidden",
    pointerEvents: flipped ? "none" : "auto", // ✅ FIX
  }}
>
          {/* IMAGE */}
          {/* IMAGE */}
<div
  style={{
    width: "100%",
    aspectRatio: "3/4",
    padding: 23,
    position: "relative",
    transition: "transform 0.3s ease",
  }}
  className="group hover:scale-[1.03]" // ✅ CARD zoom (not image)
>
  {/* 🔥 Purple Glow BEHIND image */}
  <div
    style={{
      position: "absolute",
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "70%",
      height: "60%",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(124,58,237,0.9), transparent 70%)",
      filter: "blur(30px)",
      opacity: 0,
      transition: "opacity 0.4s ease",
      zIndex: 0,
    }}
    className="group-hover:opacity-100"
  />

  <div
    style={{
      width: "100%",
      height: "77%",
      borderRadius: 10,
      background: "#151a26",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "visible",
      position: "relative",
      zIndex: 1, // ✅ image stays above glow
    }}
  >
    {member.image && (
      <div className={member.scale}>
        <Image
          src={member.image}
          alt={member.name}
          width={400}
          height={400}
          style={{
            transform: `translate(${member.x || 0}px, ${member.y || 0}px)`,
          }} // ❌ NO zoom here
        />
      </div>
    )}
  </div>
</div>

          {/* INFO */}
          <div style={{ position: "relative", bottom: 90, left: 50 }}>
            <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
              {member.name}
            </p>
            <p style={{ fontSize: 13, color: "#6b7194", margin: 0 }}>
              {member.role}
            </p>
          </div>

          {/* BUTTON */}
        {/* BUTTON */}
<div
  onClick={() => setFlipped(true)}
  style={{
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#7c3aed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute", // ✅ IMPORTANT (back to original)
    right: 40,            // ✅ same as before
    bottom: 20,           // ✅ same as before
    zIndex: 50,           // ✅ stays above everything
    cursor: "pointer",
  }}
>
  <ArrowIcon />
</div>
        </div>

        {/* BACK (DESCRIPTION) */}
        <div
          style={{
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    background: "#13151f",
    borderRadius: 12,
    border: "1px solid #1e2133",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    textAlign: "center",
    pointerEvents: flipped ? "auto" : "none", // ✅ FIX
  }}

        >
          <h3>{member.name}</h3>
          <p style={{ color: "#7c3aed", fontSize: 14 }}>{member.role}</p>
          <p style={{ color: "#aaa", fontSize: 13 }}>{member.desc}</p>

          {/* BACK BUTTON */}
          <div
            onClick={() => setFlipped(false)}
            style={{
              marginTop: 20,
              cursor: "pointer",
              fontSize: 12,
              color: "#7c3aed",
            }}
          >
            ← Back
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OurTeam() {
  return (
    <div style={{ background: "#0b0d1a", minHeight: "100vh", color: "#fff", fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />

      {/* Floating Animation Keyframes */}
      <style>
        {`
          @keyframes float {
            0% { transform: translate(0px, 0px); }
            25% { transform: translate(5px, -10px); }
            50% { transform: translate(-5px, 5px); }
            75% { transform: translate(5px, 10px); }
            100% { transform: translate(0px, 0px); }
          }

          .float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* ── Hero image section */}
      <div style={{ position: "relative", width: "100%", height: 400, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 1,
            backgroundImage: "url('/images/teme.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(10deg, rgba(81, 96, 93,0) 120%, rgba(21, 26, 33,0) 90%, #151A21 100%)`,
          }}
        />
        <div style={{ position: "relative", zIndex: 10, padding: "200px 80px 0" }}>
         
        </div>
      </div>   <div style={{ padding: "10px 20px 6px", fontSize: 14, color: "#555a72" }}>
        <span>Home</span>
        <span style={{ margin: "0 4px" }}>/</span>
        <span style={{ color: "#7a7f99" }}>Portfolio</span>
      </div>

      {/* ── "Portfolio That Speaks Diversity" — ABOVE hero banner, matches Figma ── */}
      <div style={{ padding: "4px 20px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#e63946", flexShrink: 0 }} />
        <span style={{ fontWeight: 700, fontSize: 30 }}>Portfolio That Speaks Diversity</span>
      </div> 

      {/* Hero Avatars with floating animation */}
      <section style={{ position: "relative", padding: "120px 20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 500, zIndex: 2 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 700, lineHeight: 1.3, paddingTop: 350 }}>
            Built By Teams Shaping Real <br /> Estate Systems
          </h2>
          <p style={{ fontSize: 14, color: "#7a7f99", lineHeight: 1.6 }}>
            Meet the people designing, building, and securing the infrastructure behind SMB Axis focused on structure, scale, and long-term reliability.
          </p>
        </div>

    {heroAvatars.map((src, i) => {
  const control = avatarControls[i];

  const positions = [
    { top: "28%", left: "15.9%" },
    { top: "7%", left: "1.7%" },
    { top: "42%", left: "1.7%" },
    { top: "5%", right: "28.8%" },
    { top: "20%", right: "15.1%" },
    { top: "4.8%", right: "1%" },
    { top: "40%", right: "1%" },
    { top: "6%", left: "30%" },
    { top: "20%", right: "42.8%" },
  ];

  return (
    <div
      key={i}
      style={{
        position: "absolute",
        width: 180,
        height: 240,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #2a2d40",
        background: "#1e2133",
        ...positions[i],
        animationDelay: `${i * 0.5}s`,
      }}
      className="float"
    >
      {src && (
        <img
          src={src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",

            // ✅ APPLY TRANSFORM HERE (CORRECT)
            transform: `translate(${control.x}px, ${control.y}px) scale(${control.scale})`,
            transition: "transform 0.3s ease",
          }}
        />
      )}
    </div>
  );
})}
      </section>

      {/* Team Grid */}
      <section style={{ padding: "0 4px 10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", justifyItems: "center" }}>
          {teamMembers.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}