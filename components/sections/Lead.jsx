'use client';

import { useState, useEffect, useRef } from 'react';

// ── Keyframes ──────────────────────────────────────────────────────────────
const KEYFRAMES = `
@keyframes phoneSlideIn {
  from { opacity: 0; transform: translateX(22px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes phoneSlideOut {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(-22px); }
}
`;

function injectStyles() {
  if (typeof document !== 'undefined' && !document.getElementById('lns-kf')) {
    const s = document.createElement('style');
    s.id = 'lns-kf';
    s.textContent = KEYFRAMES;
    document.head.appendChild(s);
  }
}

// ── Data ───────────────────────────────────────────────────────────────────
const features = [
  {
    icon: "/images/sms (1).png",
    title: "Lead Follow-Up",
    description:
      "Instant lead alerts. Brokers reply by WhatsApp, call, or email from one place. Follow-ups are tracked in CRM.",
  },
  {
    icon: "/images/notification.png",
    title: "Buyer Matching Alerts",
    description:
      "Send matching listings based on budget, area, and unit type. Track opens and clicks to find ready buyers.",
  },
  {
    icon: "/images/location.png",
    title: "Area Intelligence Reports",
    description:
      "Automated area reports for buyers and sellers, price shifts, new supply, pending, and off-market signals.",
  },
];

const allListings = [
  {
    id: 1,
    cardTitle: "JW Marriot Residences",
    cardSub: "Al Marjan Island, Dubai",
    cardStats: ["1-3", "1-3", "1199-2079 sqft"],
    paymentPlan: "70/30",
    developer: "WOW Resort",
    handover: "Q4 2027",
    image: "/images/Sheep.png",
    phoneTitle: "Apartment Residences",
    price: "From 580,000 AED",
    tag: "FOR SALE",
    sqft: "680 - 800 sq.ft.",
    beds: "1 Bedrooms",
    baths: "2 Bathrooms",
    name: "1 Bedroom Apartment, Reef 1000, Dubai Residential Complex",
    location: "Reef 1000 – Dubai Residential Complex…",
    badge: "Recently added",
  },
  {
    id: 2,
    cardTitle: "Veda",
    cardSub: "Jumeirah Village...",
    cardStats: ["1-3", "1-3", "900-1400 sqft"],
    paymentPlan: "40/60",
    developer: "AUN Developers",
    handover: "Q4 2026",
    image: "/images/sec.png",
    phoneTitle: "Luxury Villas",
    price: "From 1,200,000 AED",
    tag: "FOR SALE",
    sqft: "1200 - 1800 sq.ft.",
    beds: "3 Bedrooms",
    baths: "4 Bathrooms",
    name: "3 Bedroom Villa, Jumeirah Village Circle, Dubai",
    location: "Jumeirah Village Circle – Dubai…",
    badge: "New listing",
  },
  {
    id: 3,
    cardTitle: "Azure Sky Tower",
    cardSub: "Downtown Dubai",
    cardStats: ["1-4", "1-4", "750-2200 sqft"],
    paymentPlan: "50/50",
    developer: "Emaar",
    handover: "Q2 2028",
    image: "/images/Sheep.png",
    phoneTitle: "Penthouse Suite",
    price: "From 2,400,000 AED",
    tag: "FOR SALE",
    sqft: "750 - 2200 sq.ft.",
    beds: "4 Bedrooms",
    baths: "5 Bathrooms",
    name: "Penthouse, Azure Sky Tower, Downtown Dubai",
    location: "Downtown Dubai – Burj Khalifa District…",
    badge: "Featured",
  },
];

const N = allListings.length;

// ── Layout constants (design-space pixels) ─────────────────────────────────
const CARD_W        = 215;
const CARD_GAP      = 16;
const CARD_STEP     = CARD_W + CARD_GAP; // 231
const TRACK_ORIGIN  = 0;
const PHONE_LEFT    = 300;
const CAROUSEL_W    = PHONE_LEFT + 251; // 551  ← right edge of phone
const DESIGN_CONTENT_W = 1170;          // full desktop row width

// ── PhoneListing ───────────────────────────────────────────────────────────
function PhoneListing({ listing, width = "100%" }) {
  return (
    <div style={{ width, flexShrink: 0 }}>
      <div style={{ fontWeight: 700, fontSize: "10px", color: "#111", marginBottom: "6px" }}>
        {listing.phoneTitle}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "#111" }}>{listing.price}</span>
        <span style={{
          fontSize: "7px", fontWeight: 700, color: "#fff",
          background: "#01366F", borderRadius: "4px", padding: "2px 6px", letterSpacing: "0.05em",
        }}>{listing.tag}</span>
      </div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "7px" }}>
        {[["📐", listing.sqft], ["🛏", listing.beds], ["🚿", listing.baths]].map(([e, l], i) => (
          <span key={i} style={{ fontSize: "7.5px", color: "#6b7280", display: "flex", alignItems: "center", gap: "2px" }}>
            <span>{e}</span>{l}
          </span>
        ))}
      </div>
      <div style={{
        borderRadius: "10px", overflow: "hidden",
        border: "1px solid #f0f0f0", background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      }}>
        <div style={{ position: "relative", width: "100%", height: "115px", background: "#e8e8e8" }}>
          <img src={listing.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{
            position: "absolute", bottom: "8px", right: "8px",
            background: "#fff", borderRadius: "20px", padding: "4px 10px",
            fontSize: "8px", fontWeight: 600, color: "#111",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}>View details</div>
          <div style={{ position: "absolute", bottom: "10px", right: "98px", color: "#9ca3af", fontSize: "12px" }}>♡</div>
        </div>
        <div style={{ padding: "8px 10px" }}>
          <p style={{ fontSize: "8.5px", fontWeight: 600, color: "#111", margin: "0 0 3px", lineHeight: 1.4 }}>
            {listing.name}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "2px" }}>
            <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
              <path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5z" fill="#9ca3af"/>
            </svg>
            <span style={{ fontSize: "7.5px", color: "#9ca3af" }}>{listing.location}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="#10b981" strokeWidth="1.5"/>
              <path d="M5 8l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: "7px", color: "#10b981" }}>{listing.badge}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PhoneUI ────────────────────────────────────────────────────────────────
function PhoneUI({ activeIndex, trackXInside, animTrackInside }) {
  const NL       = allListings.length;
  const P_CARD_W = 211;
  const P_GAP    = 12;
  const P_STEP   = P_CARD_W + P_GAP;
  const baseOffset = -P_STEP;

  return (
    <div style={{
      width: "100%", height: "100%", background: "#ffffff",
      display: "flex", flexDirection: "column",
      fontFamily: "'Segoe UI', sans-serif", overflow: "hidden",
    }}>
      {/* Status bar */}
      <div style={{ padding: "10px 18px 6px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#111" }}>4:00</span>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <svg width="12" height="10" viewBox="0 0 20 14" fill="none">
            <path d="M10 3C13.5 3 16.7 4.4 19 6.8L17.5 8.4C15.6 6.3 12.9 5 10 5s-5.6 1.3-7.5 3.4L1 6.8C3.3 4.4 6.5 3 10 3z" fill="#111"/>
            <path d="M10 7c2.2 0 4.2.9 5.7 2.3l-1.5 1.6c-1.1-1-2.6-1.6-4.2-1.6s-3.1.6-4.2 1.6L4.3 9.3C5.8 7.9 7.8 7 10 7z" fill="#111"/>
            <circle cx="10" cy="13" r="1.5" fill="#111"/>
          </svg>
          <svg width="14" height="10" viewBox="0 0 24 16" fill="none">
            <rect x="0" y="4" width="4" height="12" rx="1" fill="#111"/>
            <rect x="6" y="2" width="4" height="14" rx="1" fill="#111"/>
            <rect x="12" y="0" width="4" height="16" rx="1" fill="#111"/>
            <rect x="18" y="0" width="4" height="16" rx="1" fill="#ccc"/>
          </svg>
          <div style={{ fontSize: "10px", fontWeight: 600, color: "#111" }}>25</div>
        </div>
      </div>
      {/* Nav */}
      <div style={{
        padding: "4px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid #f0f0f0", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
            <path d="M5 5h8l12 12-12 12H5l12-12z" fill="#01366F"/>
          </svg>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#01366F", letterSpacing: "0.1em" }}>MARY</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {[0,1,2].map(i => <div key={i} style={{ width: "16px", height: "2px", background: "#01366F", borderRadius: "1px" }} />)}
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, padding: "14px 14px 0", position: "relative", overflow: "hidden" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#111", margin: "0 0 10px", lineHeight: 1.2 }}>
          Explore Residential Properties
        </h2>
        <div style={{ display: "flex", marginBottom: "10px", borderBottom: "1px solid #e5e7eb" }}>
          {["Residential Properties", "Commercial Properties"].map((tab, i) => (
            <div key={i} style={{
              fontSize: "8px", fontWeight: i === 0 ? 700 : 400,
              color: i === 0 ? "#01366F" : "#9ca3af",
              paddingBottom: "5px", marginRight: "12px",
              borderBottom: i === 0 ? "2px solid #01366F" : "none",
              marginBottom: "-1px",
            }}>{tab}</div>
          ))}
        </div>
        <div style={{ marginBottom: "12px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "4px 10px", border: "1px solid #e5e7eb", borderRadius: "20px",
          }}>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M1 3h14M4 8h8M7 13h2" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: "9px", color: "#374151" }}>Filters</span>
          </div>
        </div>
        <div style={{
          display: "flex", gap: `${P_GAP}px`,
          transform: `translateX(calc(${baseOffset}px + ${trackXInside}px))`,
          transition: animTrackInside ? `transform 0.70s cubic-bezier(0.4,0,0.2,1)` : "none",
          willChange: "transform",
        }}>
          <PhoneListing listing={allListings[(activeIndex - 1 + NL) % NL]} width={`${P_CARD_W}px`} />
          <PhoneListing listing={allListings[activeIndex]}                  width={`${P_CARD_W}px`} />
          <PhoneListing listing={allListings[(activeIndex + 1) % NL]}      width={`${P_CARD_W}px`} />
          <PhoneListing listing={allListings[(activeIndex + 2) % NL]}      width={`${P_CARD_W}px`} />
        </div>
      </div>
    </div>
  );
}

// ── SideCard ───────────────────────────────────────────────────────────────
function SideCard({ listing }) {
  return (
    <div style={{
      width: `${CARD_W}px`, height: "268px", borderRadius: "11px",
      background: "#ffffff", boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
      display: "flex", flexDirection: "column", padding: "10px", gap: "8px",
      overflow: "hidden", flexShrink: 0,
    }}>
      <div style={{ width: "100%", height: "120px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: "#e8e8e8" }}>
        <img src={listing.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {listing.cardStats.map((s, i) => (
          <span key={i} style={{ fontSize: "9px", color: "#6b7280", display: "flex", alignItems: "center", gap: "3px" }}>
            {i === 0 && <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8c-3.33 0-5 1.67-5 2.5V14h10v-1.5c0-.83-1.67-2.5-5-2.5z" fill="#6b7280"/></svg>}
            {i === 1 && <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v7H2zm0 9h12v1H2z" stroke="#6b7280" strokeWidth="1.2" fill="none"/></svg>}
            {i === 2 && <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1" stroke="#6b7280" strokeWidth="1.2"/></svg>}
            {s}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 8 4a1.5 1.5 0 0 1 0 3z" fill="#4F46E5"/>
          </svg>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#01366F" }}>{listing.cardTitle}</span>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M12 21C12 21 3 13.5 3 8a9 9 0 0 1 18 0c0 5.5-9 13-9 13z" stroke="#d1d5db" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
      <span style={{ fontSize: "9px", color: "#9ca3af", marginTop: "-4px" }}>{listing.cardSub}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginTop: "2px" }}>
        {[["Payment Plan:", listing.paymentPlan], ["Developer:", listing.developer], ["Handover Date:", listing.handover]].map(([label, val]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "9px", color: "#9ca3af" }}>{label}</span>
            <span style={{ fontSize: "9px", fontWeight: 700, color: "#111827" }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CarouselBlock ──────────────────────────────────────────────────────────
// The phone + sliding side cards — rendered at design-space pixel sizes.
// The parent scales this block via CSS transform.
function CarouselBlock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackX,    setTrackX]    = useState(0);
  const [trackXIn,  setTrackXIn]  = useState(0);
  const [animTrack, setAnimTrack] = useState(false);
  const timer = useRef(null);
  const P_STEP = 211 + 12;

  useEffect(() => { injectStyles(); }, []);
  useEffect(() => {
    timer.current = setTimeout(advance, 1000);
    return () => clearTimeout(timer.current);
  }, [activeIndex]);

  function advance() {
    setAnimTrack(true);
    setTrackX(-CARD_STEP);
    setTrackXIn(-P_STEP);
  }
  function onTrackTransitionEnd() {
    if (!animTrack) return;
    setAnimTrack(false);
    setTrackX(0);
    setTrackXIn(0);
    setActiveIndex(prev => (prev + 1) % N);
  }

  return (
    // Fixed design-space size; parent scales it
    <div style={{ position: "relative", width: `${CAROUSEL_W}px`, height: "560px", overflow: "hidden", flexShrink: 0 }}>
      {/* Sliding side cards */}
      <div
        style={{
          position: "absolute",
          top: "145px",
          left: `${TRACK_ORIGIN - CARD_STEP}px`,
          display: "flex",
          gap: `${CARD_GAP}px`,
          transform: `translateX(${trackX}px)`,
          transition: animTrack ? `transform 0.70s cubic-bezier(0.4,0,0.2,1)` : "none",
          willChange: "transform",
        }}
        onTransitionEnd={onTrackTransitionEnd}
      >
        <SideCard listing={allListings[(activeIndex - 1 + N) % N]} />
        <SideCard listing={allListings[activeIndex]} />
        <SideCard listing={allListings[(activeIndex + 1) % N]} />
        <SideCard listing={allListings[(activeIndex + 2) % N]} />
      </div>

      {/* Phone frame */}
      <div style={{ position: "absolute", left: `${PHONE_LEFT}px`, top: "0px", width: "251px", height: "526px", zIndex: 10 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "36px", background: "#0a0a0a",
          boxShadow: "0 0 0 2px #2a2a2a, 0 0 0 4px #1a1a1a, 0 24px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }} />
        <div style={{ position: "absolute", left: "-3px", top: "90px",  width: "3px", height: "32px", background: "#1e1e1e", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: "-3px", top: "134px", width: "3px", height: "48px", background: "#1e1e1e", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: "-3px", top: "194px", width: "3px", height: "48px", background: "#1e1e1e", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: "-3px", top: "140px", width: "3px", height: "64px", background: "#1e1e1e", borderRadius: "0 2px 2px 0" }} />
        <div style={{ position: "absolute", inset: "6px", borderRadius: "30px", background: "#ffffff", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)",
            width: "60px", height: "12px", background: "#0a0a0a", borderRadius: "8px", zIndex: 20,
          }} />
          <div style={{ position: "absolute", inset: 0, paddingTop: "26px", overflow: "hidden" }}>
            <PhoneUI activeIndex={activeIndex} trackXInside={trackXIn} animTrackInside={animTrack} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FeaturesPanel ──────────────────────────────────────────────────────────
function FeaturesPanel() {
  return (
    <div style={{
      width: '340px', flexShrink: 0,
      display: 'flex', flexDirection: 'column', gap: '40px',
      paddingTop: '20px', marginRight: '150px', marginTop: '40px',
    }}>
      {features.map((feature, idx) => (
        <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src={feature.icon} alt="" style={{ width: "28px", height: "28px", objectFit: "contain", flexShrink: 0 }} />
            <h3 style={{
              fontFamily: "var(--font-heading)", fontWeight: 700,
              fontSize: "20px", color: "#FFFFFF",
              lineHeight: "1.2", letterSpacing: "-0.02em", margin: 0,
            }}>
              {feature.title}
            </h3>
          </div>
          <p style={{
            fontSize: "13px", color: "var(--color-text-muted)",
            lineHeight: "1.75", margin: 0, paddingLeft: "40px",
          }}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── ScaledSection ──────────────────────────────────────────────────────────
// Renders the IDENTICAL desktop row (CarouselBlock + FeaturesPanel) and scales
// it proportionally to fill `availableWidth` on any screen size.
//
// On mobile (~360px available) scale ≈ 0.31 → animation is small but correct.
// To avoid it being too tiny on mobile we split into two zones:
//   • availableWidth >= 600 → show full row (carousel + features) scaled
//   • availableWidth <  600 → show ONLY the carousel block scaled (wider scale),
//                             then features stacked below at normal readable size
function ScaledSection({ availableWidth }) {
  const isMobileLayout = availableWidth < 600;

  if (isMobileLayout) {
    // Scale only the carousel to fill the mobile width nicely
    const scale    = Math.min(1, availableWidth / CAROUSEL_W);
    const scaledH  = 560 * scale;

    return (
      <div>
        {/* Scaled carousel — identical animation to desktop */}
        <div style={{ width: '100%', height: `${scaledH}px`, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: `${CAROUSEL_W}px`,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
          }}>
            <CarouselBlock />
          </div>
        </div>

        {/* Features stacked below at readable sizes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingTop: '32px' }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img src={feature.icon} alt="" style={{ width: "28px", height: "28px", objectFit: "contain", flexShrink: 0 }} />
                <h3 style={{
                  fontFamily: "var(--font-heading)", fontWeight: 700,
                  fontSize: "18px", color: "#FFFFFF",
                  lineHeight: "1.2", letterSpacing: "-0.02em", margin: 0,
                }}>
                  {feature.title}
                </h3>
              </div>
              <p style={{
                fontSize: "14px", color: "var(--color-text-muted)",
                lineHeight: "1.75", margin: 0, paddingLeft: "40px",
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop / tablet: scale the full row (carousel + features side-by-side)
  const scale   = Math.min(1, availableWidth / DESIGN_CONTENT_W);
  const DESIGN_H = 720; // 560 carousel + 100 top margin + 60 buffer
  const scaledH  = DESIGN_H * scale;

  return (
    <div style={{ width: '100%', height: `${scaledH}px`, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: `${DESIGN_CONTENT_W}px`,
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
      }}>
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
          gap: '88px', width: '100%', marginTop: '100px',
        }}>
          <CarouselBlock />
          <FeaturesPanel />
        </div>
      </div>
    </div>
  );
}

// ── useContainerWidth ──────────────────────────────────────────────────────
function useContainerWidth(ref) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => setWidth(entries[0].contentRect.width));
    ro.observe(ref.current);
    setWidth(ref.current.offsetWidth);
    return () => ro.disconnect();
  }, []);
  return width;
}

// ── Main export ────────────────────────────────────────────────────────────
export default function LeadNurtureSection() {
  const containerRef   = useRef(null);
  const containerWidth = useContainerWidth(containerRef);

  return (
    <section style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', overflowX: 'hidden' }}>

      {/* Heading */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: 'clamp(40px, 6vw, 90px) clamp(16px, 4vw, 110px) 30px',
      }}>
        <h2 style={{
          fontFamily: "var(--font-heading)", fontWeight: 700,
          fontSize: "clamp(22px, 3vw, 38px)",
          color: "#FFFFFF", letterSpacing: "-0.02em",
          lineHeight: "1.2", marginBottom: "12px", textAlign: 'center',
        }}>
          Lead Nurture and Conversion System
        </h2>
        <div style={{
          width: "300px", height: "1px", borderRadius: "2px",
          background: "linear-gradient(70deg, #B055F7, #7B2FBE)",
        }} />
      </div>

      {/* Content — measures its own width then passes to ScaledSection */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          paddingLeft:   'clamp(8px, 15vw, 190px)',
          paddingRight:  'clamp(8px, 3vw, 110px)',
          paddingBottom: 'clamp(32px, 5vw, 64px)',
          boxSizing: 'border-box',
        }}
      >
        {containerWidth > 0 && <ScaledSection availableWidth={containerWidth} />}
      </div>

    </section>
  );
}
