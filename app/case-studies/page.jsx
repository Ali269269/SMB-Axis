'use client';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

const caseStudies = [
  { id: 1, category: "Google Ads", label: "Case Study", image: "/images/case1.jpg" },
  { id: 2, category: "Google Ads", label: "Case Study", image: "/images/case2 (1).jpg" },
  { id: 3, category: "Google Ads", label: "Case Study", image: "/images/case3.jpg" },
  { id: 4, category: "Google Ads", label: "Case Study", image: "/images/case1.jpg" },
  { id: 5, category: "Google Ads", label: "Case Study", image: "/images/case2 (1).jpg" },
  { id: 6, category: "Google Ads", label: "Case Study", image: "/images/case3.jpg" },
  { id: 7, category: "Google Ads", label: "Case Study", image: "/images/case2 (1).jpg" },
  { id: 8, category: "Google Ads", label: "Case Study", image: "/images/case2 (1).jpg" },
  { id: 9, category: "Google Ads", label: "Case Study", image: "/images/case1.jpg" },
];

export default function CaseStudies() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      {/* Hero image section */}
      <div style={{ position: "relative", width: "100%", height: 400, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 1,
            backgroundImage: "url('/images/casestudy.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(21,26,33,0.9) 190%, rgba(21,26,33,0.5) 180%, #151A21 100%)",
          }}
        />
      </div>

      {/* Breadcrumb */}
      <div style={{ padding: "10px 5%", fontSize: 14, color: "#555a72" }}>
        <span>Home</span>
        <span style={{ margin: "0 4px" }}>/</span>
        <span style={{ color: "#7a7f99" }}>Case Studies</span>
        <div
  style={{
    position: "absolute",
    bottom: "35%", // allow it to go slightly down
    left: "-100%",   // extend beyond edges for smooth curve
    right: "-100%",
    height: "90%",
    pointerEvents: "none",
    background: `
    rgba(11,26,43,0.95) 0%,
  rgba(11,26,43,0.7) 50%,
  rgba(11,26,43,0.4) 55%,
  transparent 80%
    `,
  }}
/>
      </div>

      {/* Section heading */}
      <div style={{ padding: "4px 5% 10px", display: "flex", alignItems: "center", gap: 8 }}>
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
        <span style={{ fontWeight: 700, fontSize: 30 }}>Discover New Articles Here</span>
      </div>

      {/* Case Study Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "40px 28px",
          padding: "20px 5% 60px",
        }}
      >
        {caseStudies.map((item) => {
          const [hover, setHover] = useState(false);

          const arrowStyle = {
            width: 28,
            height: 28,
            borderRadius: "9999px",
            border: hover ? "1px solid rgba(139,92,246,0.6)" : "1px solid rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: hover ? "#090920" : "transparent",
            boxShadow: hover ? "4px 0 8px -3px rgba(139,92,246,0.5)" : "none",
            cursor: "pointer",
            transition: "all 0.3s",
          };

          const svgStroke = hover ? "rgba(139,92,246,0.6)" : "#fff";

          return (
            <div
              key={item.id}
              onClick={() => router.push(`/case-studies/${item.id}`)}
              style={{
                position: "relative",
                borderRadius: 10,
                overflow: "hidden",
                background: "#1a1d2e",
                cursor: "pointer",
                width: "100%",
                aspectRatio: "16/9",
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.category}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#2a2d3e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff40" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10,10,20,0.92) 0%, rgba(10,10,20,0.4) 50%, rgba(10,10,20,0.05) 100%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "14px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  overflow: "visible",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>{item.category}</span>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#fff",
                      opacity: 0.7,
                    }}
                  />
                  <span>{item.label}</span>
                </div>

                <div
                  style={arrowStyle}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    stroke={svgStroke}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="2" y1="11" x2="11" y2="2" />
                    <polyline points="4 2 11 2 11 9" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
}