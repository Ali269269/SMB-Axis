'use client';

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

const portfolioItems = [
  {
    id: 1,
    logo: "/images/weeshare.png",
    leftImg: "/images/weeshareport.jpg",
    rightImg: "/images/weeshareportm.jpg",
  },
  {
    id: 2,
    logo: "/images/gulf.png",
    leftImg: "/images/gulfo.jpg",
    rightImg: "/images/gulfo.jpg",
    logoWidth: "60%",
    logoHeight: "80%",
  },
  {
    id: 3,
    logo: "/images/mary.png",
    leftImg: "/images/gulfd.png",
    rightImg: "/images/gulfd.png",
    
  },
  {
    id: 4,
    logo: "/images/Vector (1).png",
    leftImg: "/images/suitport.jpg",
    rightImg: "/images/suitport.jpg",
   
  },
  {
    id: 5,
    logo: "/images/coch.png",
    leftImg: "/images/cutomport.png",
    rightImg: "/images/cutomport.png",
     logoWidth: "60%",
    logoHeight: "80%",
  },
  {
    id: 6,
    logo: "/images/dubai.png",
    leftImg: "/images/dubaii.jpg",
    rightImg: "/images/dubaii.jpg",
  },
  {
    id: 7,
    logo: "/images/lock.png",
    leftImg: "/images/locke.jpg",
    rightImg: "/images/locke.jpg",
  },
  {
    id: 8,
    logo: "/images/pcld.png",
    leftImg: "/images/pcld.jpg",
    rightImg: "/images/pcld.jpg",
  },
];

function PortfolioCard({ item }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/11",
        backgroundColor: "#1f2226",
        borderRadius: "12px",
        overflow: "hidden",
      
        border: "1.5px solid rgba(255,255,255,0.06)",
        boxShadow: "0 6px 40px rgba(0,0,0,0.55)",
      }}
    >
      {/* LEFT image */}
      <div style={{ position: "absolute", left: "3%", bottom: "0%", width: "62%", height: "80%", borderRadius: "8px 8px 0 0", overflow: "hidden", boxShadow: "4px 0 24px rgba(0,0,0,0.6)", zIndex: 1 }}>
        <div style={{ width: "100%", height: "100%", background: item.leftImg ? `url(${item.leftImg}) top center / cover no-repeat` : "linear-gradient(160deg, #1e2340 0%, #0d1020 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,11,26,0.42)" }} />
      </div>

      {/* RIGHT image */}
      <div style={{ position: "absolute", right: "3%", top: "4%", width: "42%", height: "96%", borderRadius: "8px", overflow: "hidden", boxShadow: "-4px 4px 24px rgba(0,0,0,0.55)", zIndex: 2 }}>
        <div style={{ width: "100%", height: "100%", background: item.rightImg ? `url(${item.rightImg}) top center / cover no-repeat` : "linear-gradient(160deg, #16203a 0%, #0a0e22 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,11,26,0.38)" }} />
      </div>

      {/* ── GLOBAL dark blur overlay — sits above images but below logo ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,                                  // above images (1,2), below logo (10)
          background: "#0E1116A1",        // dark tint — adjust opacity to taste
          backdropFilter: "blur(0px)",                // subtle blur — increase for more blur
          WebkitBackdropFilter: "blur(2px)",
          pointerEvents: "none",
        }}
      />

      {/* LOGO — z-index 10 keeps it fully sharp above the blur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {item.logo && (
          <img
             src={item.logo}
      alt="logo"
      style={{
        width: item.logoWidth || "46%",   // use custom width
        height: item.logoHeight || "40%", // use custom height
        objectFit: "contain",
        filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.85))",
        userSelect: "none",
      }}
          />
        )}
      </div>
    </div>
  );
}

export default function OurPortfolio() {
  return (
    <>
      <Navbar />

      {/* Hero banner */}
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
        <span style={{ color: "#7a7f99" }}>Portfolio</span>
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
          Portfolio That Speaks Diversity
        </span>
      </div>

      {/* Portfolio Grid — 4 columns × 2 rows = 8 cards */}
      <div
        style={{
          padding: "0 7% 80px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "40px 20px",
        }}
      >
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>

      <Footer />
    </>
  );
}