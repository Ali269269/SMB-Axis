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
    <>
      {/* ════════════════════════════════
          DESKTOP CARD — completely unchanged
          ════════════════════════════════ */}
      <div
        className="team-card-desktop"
        style={{ perspective: "1000px", width: 350, height: 420, marginTop: 16 }}
      >
        <div style={{
          width: "100%", height: "100%", position: "relative",
          transformStyle: "preserve-3d", transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          {/* FRONT */}
          <div style={{
            position: "absolute", width: "100%", height: "100%",
            backfaceVisibility: "hidden", background: "#13151f",
            borderRadius: 12, border: "1px solid #1e2133", overflow: "hidden",
            pointerEvents: flipped ? "none" : "auto",
          }}>
            <div style={{ width: "100%", aspectRatio: "3/4", padding: 23, position: "relative", transition: "transform 0.3s ease" }}
              className="group hover:scale-[1.03]">
              <div style={{
                position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
                width: "70%", height: "60%", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124,58,237,0.9), transparent 70%)",
                filter: "blur(30px)", opacity: 0, transition: "opacity 0.4s ease", zIndex: 0,
              }} className="group-hover:opacity-100" />
              <div style={{
                width: "100%", height: "77%", borderRadius: 10, background: "#151a26",
                display: "flex", justifyContent: "center", alignItems: "center",
                overflow: "visible", position: "relative", zIndex: 1,
              }}>
                {member.image && (
                  <div className={member.scale}>
                    <Image src={member.image} alt={member.name} width={400} height={400}
                      style={{ transform: `translate(${member.x || 0}px, ${member.y || 0}px)` }} />
                  </div>
                )}
              </div>
            </div>
            <div style={{ position: "relative", bottom: 90, left: 50 }}>
              <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{member.name}</p>
              <p style={{ fontSize: 13, color: "#6b7194", margin: 0 }}>{member.role}</p>
            </div>
            <div onClick={() => setFlipped(true)} style={{
              width: 30, height: 30, borderRadius: "50%", background: "#7c3aed",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "absolute", right: 40, bottom: 20, zIndex: 50, cursor: "pointer",
            }}>
              <ArrowIcon />
            </div>
          </div>
          {/* BACK */}
          <div style={{
            position: "absolute", width: "100%", height: "100%",
            backfaceVisibility: "hidden", transform: "rotateY(180deg)",
            background: "#13151f", borderRadius: 12, border: "1px solid #1e2133",
            display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", padding: 20, textAlign: "center",
            pointerEvents: flipped ? "auto" : "none",
          }}>
            <h3>{member.name}</h3>
            <p style={{ color: "#7c3aed", fontSize: 14 }}>{member.role}</p>
            <p style={{ color: "#aaa", fontSize: 13 }}>{member.desc}</p>
            <div onClick={() => setFlipped(false)} style={{ marginTop: 20, cursor: "pointer", fontSize: 12, color: "#7c3aed" }}>← Back</div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          MOBILE CARD — rebuilt from scratch
          Fixed layout: image fills top, name+role pinned to bottom bar
          ════════════════════════════════ */}
      <div className="team-card-mobile">
        <div style={{
          width: "100%", height: "100%", position: "relative",
          transformStyle: "preserve-3d", transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>

          {/* MOBILE FRONT */}
          <div style={{
            position: "absolute", width: "100%", height: "100%",
            backfaceVisibility: "hidden", background: "#13151f",
            borderRadius: 16, border: "1px solid #1e2133",
            overflow: "hidden", pointerEvents: flipped ? "none" : "auto",
            display: "flex", flexDirection: "column",
          }}>
            {/* Image area — fills remaining space above the bottom bar */}
            <div style={{
              flex: 1,
              background: "#151a26",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              overflow: "hidden",
            }}>
              {/* Purple glow */}
              <div style={{
                position: "absolute", bottom: "5%", left: "50%",
                transform: "translateX(-50%)", width: "80%", height: "55%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124,58,237,0.65), transparent 70%)",
                filter: "blur(28px)", zIndex: 0,
              }} />
              {member.image && (
                <div style={{
                  position: "relative", zIndex: 1,
                  width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-end",
                }}>
                  {/* We use a plain <img> here so we can naturalise sizing without Next/Image constraints */}
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      maxWidth: "75%",
                      maxHeight: "320px",
                      objectFit: "contain",
                      objectPosition: "bottom",
                      display: "block",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Bottom bar — name, role, flip button */}
            <div style={{
              background: "#13151f",
              borderTop: "1px solid #1e2133",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
                <p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {member.name}
                </p>
                <p style={{ fontSize: 12, color: "#6b7194", margin: "3px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {member.role}
                </p>
              </div>
              <div onClick={() => setFlipped(true)} style={{
                width: 36, height: 36, borderRadius: "50%", background: "#7c3aed",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
              }}>
                <ArrowIcon />
              </div>
            </div>
          </div>

          {/* MOBILE BACK */}
          <div style={{
            position: "absolute", width: "100%", height: "100%",
            backfaceVisibility: "hidden", transform: "rotateY(180deg)",
            background: "#13151f", borderRadius: 16, border: "1px solid #1e2133",
            display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", padding: 28, textAlign: "center",
            pointerEvents: flipped ? "auto" : "none",
          }}>
            <h3 style={{ fontSize: 20, margin: "0 0 8px", color: "#fff" }}>{member.name}</h3>
            <p style={{ color: "#7c3aed", fontSize: 13, margin: "0 0 16px" }}>{member.role}</p>
            <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{member.desc}</p>
            <div onClick={() => setFlipped(false)} style={{ marginTop: 28, cursor: "pointer", fontSize: 14, color: "#7c3aed" }}>
              ← Back
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OurTeam() {
  return (
    <div style={{ background: "#0b0d1a", minHeight: "100vh", color: "#fff", fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar />

      <style>{`
        @keyframes float {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(5px, -10px); }
          50%  { transform: translate(-5px, 5px); }
          75%  { transform: translate(5px, 10px); }
          100% { transform: translate(0px, 0px); }
        }
        .float { animation: float 4s ease-in-out infinite; }

        /* Default: show desktop card, hide mobile card */
        .team-card-desktop { display: block; }
        .team-card-mobile   { display: none; }

        /* ── Mobile ≤ 768px ──────────────────────────────────────────── */
        @media (max-width: 768px) {

          /* Swap which card is visible */
          .team-card-desktop { display: none !important; }
          .team-card-mobile {
            display: block;
            width: calc(100vw - 40px);
            max-width: 400px;
            height: 460px;
            margin: 14px auto 0;
          }

          /* Team grid: single column, centred */
          .team-grid {
            grid-template-columns: 1fr !important;
            padding: 0 0 32px !important;
            justify-items: center;
          }

          /* Hero banner shorter on mobile */
          .hero-banner { height: 200px !important; }

          /* Breadcrumb tighter padding */
          .breadcrumb-row { padding: 10px 16px 4px !important; }

          /* Portfolio heading smaller */
          .portfolio-heading { padding: 4px 16px 10px !important; }
          .portfolio-heading .heading-text { font-size: 20px !important; }

          /* Hide desktop floating avatars */
          .floating-avatar { display: none !important; }

          /* Scrollable avatar strip */
          .mobile-avatar-strip {
            display: flex !important;
            overflow-x: auto;
            gap: 10px;
            padding: 16px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .mobile-avatar-strip::-webkit-scrollbar { display: none; }
          .mobile-avatar-strip .strip-avatar {
            flex-shrink: 0;
            width: 90px;
            height: 120px;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #2a2d40;
            background: #1e2133;
          }
          .mobile-avatar-strip .strip-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          /* Hero section: collapse the huge paddingTop that was for desktop avatars */
          .hero-section {
            padding: 24px 16px 32px !important;
          }
          .hero-text-block {
            padding-top: 0 !important;
            max-width: 100% !important;
          }
          .hero-text-block h2 {
            padding-top: 0 !important;
            font-size: 22px !important;
          }
        }

        /* ── Very small phones ≤ 380px ──────────────────────────────── */
        @media (max-width: 380px) {
          .team-card-mobile {
            height: 420px !important;
            width: calc(100vw - 24px) !important;
          }
        }
      `}</style>

      {/* ── Hero image section ── */}
      <div className="hero-banner" style={{ position: "relative", width: "100%", height: 400, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 1, backgroundImage: "url('/images/teme.png')", backgroundSize: "cover", backgroundPosition: "center top" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(10deg, rgba(81,96,93,0) 120%, rgba(21,26,33,0) 90%, #151A21 100%)` }} />
        <div style={{ position: "relative", zIndex: 10, padding: "200px 80px 0" }} />
      </div>

      <div className="breadcrumb-row" style={{ padding: "10px 20px 6px", fontSize: 14, color: "#555a72" }}>
        <span>Home</span>
        <span style={{ margin: "0 4px" }}>/</span>
        <span style={{ color: "#7a7f99" }}>Portfolio</span>
      </div>

      <div className="portfolio-heading" style={{ padding: "4px 20px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#e63946", flexShrink: 0 }} />
        <span className="heading-text" style={{ fontWeight: 700, fontSize: 30 }}>Portfolio That Speaks Diversity</span>
      </div>

      {/* Mobile avatar strip (hidden on desktop via CSS) */}
      <div className="mobile-avatar-strip" style={{ display: "none" }}>
        {heroAvatars.map((src, i) => (
          <div key={i} className="strip-avatar">
            <img src={src} alt="" />
          </div>
        ))}
      </div>

      {/* ── Hero section with floating avatars ── */}
      <section className="hero-section" style={{ position: "relative", padding: "120px 20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="hero-text-block" style={{ textAlign: "center", maxWidth: 500, zIndex: 2 }}>
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
            <div key={i} className="float floating-avatar" style={{
              position: "absolute", width: 180, height: 240, borderRadius: 12,
              overflow: "hidden", border: "1px solid #2a2d40", background: "#1e2133",
              ...positions[i], animationDelay: `${i * 0.5}s`,
            }}>
              {src && (
                <img src={src} alt="" style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transform: `translate(${control.x}px, ${control.y}px) scale(${control.scale})`,
                  transition: "transform 0.3s ease",
                }} />
              )}
            </div>
          );
        })}
      </section>

      {/* ── Team Grid ── */}
      <section style={{ padding: "0 4px 10px" }}>
        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", justifyItems: "center" }}>
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
