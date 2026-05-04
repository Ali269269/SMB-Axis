'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

/*
  DATA — each tab now has an `images` array instead of a single `image`.
  Add more image paths to any tab's array and the animation handles them automatically.
  The animation will cycle through ALL images in a tab before moving to the next tab.
*/
const CARDS = [
  {
    id: "core",
    title: "Core Revenue System",
    link: "https://yoursite.com/core-revenue-system",
    tabs: [
      { label: "Lead Generation & Funnels",      images: ["/images/p1.png"] },
      { label: "Personal Branding for Agents",   images: ["/images/p2.png"] },
      { label: "Conversion & CRM Optimization",  images: ["/images/core.png"] },
      { label: "Social Media & Content Engine",  images: ["/images/p17.png"] },
    ],
  },
  {
    id: "growth",
    title: "Growth & Technology Layer",
    link: "https://yoursite.com/growth-tech",
    tabs: [
      {
        label: "Websites & Real Estate Portals",
        images: ["/images/p4.png", "/images/verify.png"],
      },
      { label: "AI-Powered Lead Systems",            images: ["/images/ai.png"] },
      { label: "Team Training & Process Consulting", images: ["/images/p66.png"] },
    ],
  },
  {
    id: "future",
    title: "Advanced & Future Tech",
    link: "https://yoursite.com/future-tech",
    tabs: [
      { label: "Blockchain & Tokenization Solutions", images: ["/images/p8.png"] },
      { label: "Cybersecurity & Data Protection",     images: ["/images/p8.png"] },
    ],
  },
  {
    id: "training",
    title: "Training and Webinar",
    link: "https://yoursite.com/training",
    tabs: [
      { label: "Webinars",           images: ["/images/p14.png"] },
      { label: "Training Programs",  images: ["/images/p14.png"] },
    ],
  },
];

/*
  DESIGN CARD WIDTH (the "design spec" width in px).
  The card was designed at 941px wide. We scale it proportionally
  using a CSS transform so it looks identical on every screen.
*/
const DESIGN_CARD_W = 941;
const DESIGN_CONTAINER_W = 1000; // includes right padding for arrow

function PortfolioCard({ card, scale }) {
  const [activeTab,   setActiveTab]   = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [animating,   setAnimating]   = useState(false);
  const [visible,     setVisible]     = useState(false);
  const cardRef    = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef  = useRef(null);

  const stateRef = useRef({ tab: 0, image: 0 });
  useEffect(() => {
    stateRef.current = { tab: activeTab, image: activeImage };
  }, [activeTab, activeImage]);

  /* Intersection observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [visible]);

  const stepForward = () => {
    setAnimating(true);
    timeoutRef.current = setTimeout(() => {
      const { tab, image } = stateRef.current;
      const tabImages = card.tabs[tab].images;

      if (image < tabImages.length - 1) {
        setActiveImage(image + 1);
      } else {
        setActiveTab((tab + 1) % card.tabs.length);
        setActiveImage(0);
      }

      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (!visible) return;
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);

    intervalRef.current = setInterval(stepForward, 2800);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [visible]);

  const handleTabClick = (idx) => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(idx);
      setActiveImage(0);
      setAnimating(false);
    }, 200);
    intervalRef.current = setInterval(stepForward, 2800);
  };

  const handleImageDotClick = (imgIdx) => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    setAnimating(true);
    setTimeout(() => {
      setActiveImage(imgIdx);
      setAnimating(false);
    }, 200);
    intervalRef.current = setInterval(stepForward, 2800);
  };

  const ARROW_SIZE = 59;
  const NOTCH = ARROW_SIZE / 2;
  const CURVE_SPREAD = 1;
  const cardW = DESIGN_CARD_W;
  const R = 20;
  const H = 500;
  const clipId = "notch-" + card.id;

  const pathD =
    "M " + R + " 0 " +
    "L " + (cardW - R) + " 0 " +
    "Q " + cardW + " 0 " + cardW + " " + R + " " +
    "L " + cardW + " " + (H - NOTCH * 2) + " " +
    "A " + (NOTCH + CURVE_SPREAD) + " " + (NOTCH + CURVE_SPREAD) + " 0 0 0 " +
    (cardW - (NOTCH * 2 + CURVE_SPREAD)) + " " + H + " " +
    "L " + R + " " + H + " " +
    "Q 0 " + H + " 0 " + (H - R) + " " +
    "L 0 " + R + " " +
    "Q 0 0 " + R + " 0 Z";

  /*
    The card is rendered at its original design dimensions (DESIGN_CONTAINER_W × auto)
    and then scaled down via CSS transform + transform-origin: top left.
    The wrapper div is shrunk to the scaled visual size so layout flow is correct.
  */
  const scaledW = DESIGN_CONTAINER_W * scale;
  // Original card height at design scale: roughly 500px image + ~120px header = ~620px
  // We can't know exact height so we use a wrapper that matches the scaled visual height.
  // We'll use a padding-bottom trick driven by the scale value.

  return (
    /*
      Outer wrapper: shrinks to the scaled visual dimensions so the page
      doesn't leave a giant empty gap below the transformed card.
    */
    <div
      style={{
        width: scaledW + "px",
        // The card inner height is H (500) + header (~115px) + top notch = ~620px
        // After scale that becomes ~620 * scale px visible height.
        // We add a little extra for the arrow overhang.
        height: (620 + 58) * scale + "px",
        position: "relative",
        marginBottom: "0px",
      }}
    >
      {/* Scaled inner card — rendered at design size, scaled visually */}
      <div
        ref={cardRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: DESIGN_CONTAINER_W + "px",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease, transform 0.7s ease",
          /* translateY animation on top of the scale */
          ...(visible ? {} : { marginTop: "48px" }),
        }}
      >
        <div
          style={{
            position: "relative",
            marginBottom: "58px",
            width: DESIGN_CONTAINER_W + "px",
            paddingRight: (ARROW_SIZE - 4) + "px",
            boxSizing: "border-box",
          }}
        >
          <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
            <defs>
              <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                <path d={pathD} />
              </clipPath>
            </defs>
          </svg>

          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              background: "#1a1025",
              position: "relative",
              clipPath: "url(#" + clipId + ")",
              WebkitClipPath: "url(#" + clipId + ")",
            }}
          >
            {/* Header */}
            <div style={{ padding: "28px 1px 20px", background: "#1a1025" }}>
              <h2
                style={{
                  margin: "0 0 16px",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#ffffff",
                  textAlign: "center",
                  letterSpacing: "-0.3px",
                }}
              >
                {card.title}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "0",
                }}
              >
                {card.tabs.map((tab, idx) => (
                  <div key={tab.label} style={{ display: "flex", alignItems: "center" }}>
                    <button
                      onClick={() => handleTabClick(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px 0",
                        fontSize: "13.5px",
                        fontWeight: activeTab === idx ? 600 : 400,
                        color: activeTab === idx ? "#B055F7" : "rgba(255,255,255,0.7)",
                        transition: "color 0.3s ease",
                        whiteSpace: "nowrap",
                        fontFamily: "inherit",
                      }}
                    >
                      {tab.label}
                    </button>
                    {idx < card.tabs.length - 1 && (
                      <span
                        style={{
                          margin: "0 12px",
                          color: "rgba(255,255,255,0.2)",
                          fontSize: "14px",
                          userSelect: "none",
                        }}
                      >
                        |
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative bars */}
            <div
              style={{
                position: "relative",
                top: 0,
                right: 0,
                width: "850px",
                marginLeft: "50px",
                height: "12px",
                background: "#aaa9a9",
                borderRadius: "12px 12px 0 0px",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "relative",
                top: 0,
                right: 0,
                width: "900px",
                marginLeft: "23px",
                height: "16px",
                background: "#aaa9a9",
                borderRadius: "12px 12px 0 0px",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />

            {/* Image area */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/5.5",
                background: "#0d0a18",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              {card.tabs.map((tab, tabIdx) =>
                tab.images.map((src, imgIdx) => (
                  <div
                    key={`${tab.label}-img-${imgIdx}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity:
                        tabIdx === activeTab && imgIdx === activeImage
                          ? animating ? 0 : 1
                          : 0,
                      transition: "opacity 0.35s ease",
                      pointerEvents:
                        tabIdx === activeTab && imgIdx === activeImage ? "auto" : "none",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${tab.label} ${imgIdx + 1}`}
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 1000px"
                      placeholder="empty"
                      style={{ objectFit: "cover" }}
                      priority={tabIdx === 0 && imgIdx === 0}
                    />
                  </div>
                ))
              )}

              {/* Dot indicators */}
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "6px",
                  zIndex: 20,
                }}
              >
                {card.tabs[activeTab].images.map((_, imgIdx) => (
                  <button
                    key={imgIdx}
                    onClick={() => handleImageDotClick(imgIdx)}
                    style={{
                      width: imgIdx === activeImage ? "20px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background:
                        imgIdx === activeImage ? "#B055F7" : "rgba(255,255,255,0.3)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "width 0.3s ease, background 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              bottom: "3px",
              right: "62px",
              zIndex: 30,
              width: ARROW_SIZE + "px",
              height: ARROW_SIZE + "px",
              borderRadius: "50%",
              background: "#5b21b6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(91,33,182,0.5)",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#7c3aed";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#5b21b6";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 14L14 4M14 4H7M14 4V11"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OurPortfolio() {
  /*
    scale = (availableWidth) / DESIGN_CONTAINER_W
    availableWidth = viewport width minus the horizontal padding of the outer container.
    
    We keep a 32px side padding on each side as the minimum breathing room on mobile.
    On large screens the design fits naturally (scale = 1 when viewport ≥ ~1200px).
  */
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    function recalc() {
      const vw = window.innerWidth;
      // On very large screens: fixed 180px left+right padding (original design)
      // On smaller screens: 32px left+right minimum padding
      const sidePad = vw >= 1260 ? 180 * 2 : 32 * 2;
      const available = vw - sidePad;
      const s = Math.min(1, available / DESIGN_CONTAINER_W);
      setScale(parseFloat(s.toFixed(4)));
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  // Horizontal padding mirrors the original 180px on desktop, collapses on mobile
  const sidePadding = `clamp(16px, 4vw, 180px)`;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ position: "relative", minHeight: "360px", display: "flex", alignItems: "flex-end" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/career.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(11,14,26,0.75) 0%, rgba(11,14,26,0.9) 60%, #0b0e1a 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 48px",
            paddingTop: "80px",
            width: "100%",
          }}
        />
      </div>

      {/* Breadcrumb + title */}
      <div style={{ padding: `29px ${sidePadding} 0` }}>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "10px",
            marginLeft: "8px",
          }}
        >
          <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
            Home
          </Link>
          {" "}/ Our Portfolio
        </p>
        <div style={{ padding: "4px 1% 36px", display: "flex", alignItems: "center", gap: 8 }}>
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
          <span style={{ fontWeight: 700, fontSize: 30, color: "#ffffff" }}>
            Portfolio That Speaks Diversity
          </span>
        </div>
      </div>

{/* Cards container */}
<div
  ref={containerRef}
  style={{
    // Fixed: sidePadding now correctly applies without the '20px' syntax error
    padding: `0 ${sidePadding}px`, 
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    // Gap must be 0 or positive; we use margin on the children instead
    gap: "0px", 
  }}
>
  {CARDS.map((card) => {
    // Detect screen size (standard mobile breakpoint is 768px)
    const isLargeScreen = typeof window !== 'undefined' && window.innerWidth > 768;

    return (
      <div 
        key={card.id} 
        style={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "center",
          // Only pull cards closer on large screens; mobile stays at 0
          marginBottom: isLargeScreen ? "-100px" : "0px" 
        }}
      >
        <PortfolioCard card={card} scale={scale} />
      </div>
    );
  })}
</div>

      <style jsx global>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      <Footer />
    </>
  );
}
