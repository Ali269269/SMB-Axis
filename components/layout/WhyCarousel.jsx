"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const whyCards = [
  {
    id: 1,
    title: "Built as Operational Systems",
    desc: "Every platform is designed as a strategic system, with data flow, user roles, access control, and long-term scalability built in from day one.",
    image: "/images/c1 (2).jpg",
  },
  {
    id: 2,
    title: "Security and Control by Design",
    desc: "Security is embedded into the architecture, with role-based access, secure data handling, and infrastructure hardening as core principles.",
    image: "/images/locke.png",
  },
  {
    id: 3,
    title: "Alignment With Real World",
    desc: "Every digital component we build maps to real business processes, ensuring your people and work actually gets done.",
    image: "/images/c3 (2).jpg",
  },
  {
    id: 4,
    title: "Built for Growth at Scale",
    desc: "Systems are architected to scale with your team, your clients, and your revenue — without rebuilding from scratch.",
    image: "/images/growth.png",
  },
];

function WhyCard({ card }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        background: "#12091e",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        userSelect: "none",
        transition: "box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 0 40px 8px rgba(176, 85, 247, 0.30)"
          : "none",
      }}
    >
      <div style={{ padding: "22px 16px 16px" }}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "15px",
            marginBottom: "10px",
            lineHeight: 1.35,
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.50)",
            fontSize: "13px",
            lineHeight: 1.65,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {card.desc}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          minHeight: "180px",
          background: "rgba(255,255,255,0.04)",
          overflow: "hidden",
        }}
      >
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 350px"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

/* Returns how many cards are visible based on viewport width */
function getVisible(vw) {
  if (vw < 640)  return 1.2;  // mobile: show 1 full + peek of next
  if (vw < 1024) return 2.2;  // tablet: show 2 full + peek
  return 4;                    // desktop: original 4
}

export default function WhyCarousel({ cards = whyCards }) {
  const trackRef    = useRef(null);
  const offsetRef   = useRef(0);
  const rafRef      = useRef(null);
  const pausedRef   = useRef(false);
  const manualRef   = useRef(false);
  const manualTimer = useRef(null);
  const wrapperRef  = useRef(null);

  const GAP     = 18;
  const speedPx = 0.6;

  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile,  setIsMobile]  = useState(false);

  useEffect(() => {
    const measure = () => {
      const vw      = window.innerWidth;
      const visible = getVisible(vw);
      const mobile  = vw < 640;
      // On mobile/tablet use full vw minus side padding (24px each side = 48px)
      const availableVw = mobile ? vw - 48 : vw;
      const cw = (availableVw - GAP * (Math.floor(visible) - 1)) / visible;
      setCardWidth(cw);
      setIsMobile(mobile);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const setWidth = cards.length * (cardWidth + GAP);

  useEffect(() => {
    if (cardWidth === 0) return;
    const tick = () => {
      if (!pausedRef.current && !manualRef.current) {
        offsetRef.current += speedPx;
        if (offsetRef.current >= setWidth) offsetRef.current -= setWidth;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cardWidth, setWidth]);

  const jump = useCallback(
    (direction) => {
      if (cardWidth === 0) return;
      offsetRef.current += direction * (cardWidth + GAP);
      if (offsetRef.current < 0)         offsetRef.current += setWidth;
      if (offsetRef.current >= setWidth)  offsetRef.current -= setWidth;
      manualRef.current = true;
      clearTimeout(manualTimer.current);
      manualTimer.current = setTimeout(() => { manualRef.current = false; }, 600);
    },
    [cardWidth, setWidth]
  );

  // Touch swipe support
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) jump(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const repeated = [...cards, ...cards, ...cards];

  return (
    <div>
      {/* Full-bleed scroll shell */}
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          overflow: "hidden",
          /* On mobile add side padding so the first card isn't flush to edge */
          paddingLeft: isMobile ? "24px" : 0,
        }}
        onMouseEnter={() => { pausedRef.current = true;  }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${GAP}px`,
            willChange: "transform",
            width: `${repeated.length * (cardWidth + GAP)}px`,
          }}
        >
          {repeated.map((card, i) => (
            <div
              key={`${card.id}-${i}`}
              style={{
                flex: `0 0 ${cardWidth}px`,
                maxWidth: `${cardWidth}px`,
                height: "360px",
              }}
            >
              <WhyCard card={card} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          marginTop: "20px",
          marginRight: isMobile ? "24px" : "40px",
        }}
      >
        <button
          onClick={() => jump(-1)}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.25)",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#B055F7")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={() => jump(1)}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            background: "#7c3aed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 0 16px rgba(124,58,237,0.5)",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#9333ea")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#7c3aed")}
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
