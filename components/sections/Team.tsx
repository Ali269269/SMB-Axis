"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// ─── Replace with your actual video sources ───────────────────────────────────
const VIDEOS = [
  { id: 1, src: "/videos.maryy.mp4", poster: "/images/poster-1.jpg", logo: "/images/mary.png" },
  { id: 2, src: "/videos/maryy.mp4", poster: "/images/poster-2.jpg", logo: "/images/gulf.png" },
  { id: 3, src: "/videos/maryy.mp4", poster: "/images/poster-3.jpg", logo: "/images/mary.png" },
  { id: 4, src: "/videos/maryy.mp4", poster: "/images/poster-4.jpg", logo: "/images/mary.png" },
  { id: 5, src: "/videos/maryy.mp4", poster: "/images/poster-5.jpg", logo: "/images/mary.png" },
];

// ─── Design constants ─────────────────────────────────────────────────────────
const C = { w: 280, h: 460, r: 22.5 };
const M = { w: 280, h: 350, r: 16.88 };
const F = { w: 200, h: 280, r: 12.66 };

const GAP = 10;

const BOX_W = F.w / 2 + GAP + M.w + GAP + C.w + GAP + M.w + GAP + F.w / 2;
const HEADING_H = 130;
const CAROUSEL_H = C.h + 40;
const NAV_H = 60;
const BOX_H = HEADING_H + CAROUSEL_H + NAV_H;
const BOX_R = 10;
const VCENTER = HEADING_H + CAROUSEL_H / 2;

const SLOT_LEFTS: Record<number, number> = {
  0: -(F.w / 2),
  1: F.w / 2 + GAP,
  2: F.w / 2 + GAP + M.w + GAP,
  3: F.w / 2 + GAP + M.w + GAP + C.w + GAP,
  4: F.w / 2 + GAP + M.w + GAP + C.w + GAP + M.w + GAP,
};

const SLOT_TOPS: Record<number, number> = {
  0: VCENTER - F.h / 2,
  1: VCENTER - M.h / 2,
  2: VCENTER - C.h / 2,
  3: VCENTER - M.h / 2,
  4: VCENTER - F.h / 2,
};

const SLOT_SIZES: Record<number, { w: number; h: number; r: number; z: number }> = {
  0: { w: F.w, h: F.h, r: F.r, z: 10 },
  1: { w: M.w, h: M.h, r: M.r, z: 20 },
  2: { w: C.w, h: C.h, r: C.r, z: 30 },
  3: { w: M.w, h: M.h, r: M.r, z: 20 },
  4: { w: F.w, h: F.h, r: F.r, z: 10 },
};

const FROST = "rgba(255,255,255,0.60)";

function getSlot(vidIdx: number, activeIdx: number, total: number): number {
  const diff = ((vidIdx - activeIdx) % total + total) % total;
  if (diff === 0) return 2;
  if (diff === 1) return 3;
  if (diff === 2) return 4;
  if (diff === total - 1) return 1;
  if (diff === total - 2) return 0;
  return -1;
}

export default function TrustedByTeams() {
  const total = VIDEOS.length;
  const [active, setActive] = useState(2);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [scale, setScale] = useState(1);

  // Responsive scale
  useEffect(() => {
    const update = () => {
      const available = window.innerWidth - 32;
      setScale(Math.min(1, available / BOX_W));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (!vid) return;
      const seek = () => {
        if (vid.paused && vid.readyState >= 1 && vid.currentTime === 0) {
          vid.currentTime = 0.01;
        }
      };
      if (vid.readyState >= 1) {
        seek();
      } else {
        vid.addEventListener("loadedmetadata", seek, { once: true });
      }
    });
  }, []);

  const stopAll = useCallback(() => {
    videoRefs.current.forEach((v) => {
      if (v) { v.pause(); v.currentTime = 0.01; }
    });
    setPlayingId(null);
  }, []);

  const navigate = useCallback((dir: "prev" | "next") => {
    if (isNavigating) return;
    setIsNavigating(true);
    stopAll();
    setActive((a) => (dir === "next" ? (a + 1) % total : (a - 1 + total) % total));
    setTimeout(() => setIsNavigating(false), 600);
  }, [isNavigating, stopAll, total]);

  const handleCenterClick = (vidIdx: number) => {
    const vid = videoRefs.current[vidIdx];
    if (!vid) return;
    if (playingId === VIDEOS[vidIdx].id) {
      vid.pause();
      setPlayingId(null);
    } else {
      stopAll();
      vid.currentTime = 0;
      vid.play().catch(() => {});
      setPlayingId(VIDEOS[vidIdx].id);
    }
  };

  return (
    // ✅ FIX: py-20 on desktop, py-8 on mobile; overflow-x hidden to prevent horizontal scroll
    <section className="w-full py-8 sm:py-20 px-4 flex justify-center overflow-x-hidden">
      {/* ✅ FIX: height accounts for scale so the wrapper never clips the scaled content */}
      <div style={{ width: BOX_W * scale, height: BOX_H * scale }}>
        <div
          className="relative overflow-hidden"
          style={{
            width:                BOX_W,
            height:               BOX_H,
            borderRadius:         BOX_R,
            background:           "rgba(255,255,255,0.09)",
            backdropFilter:       "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border:               "1px solid rgba(255,255,255,0.12)",
            transformOrigin:      "top left",
            transform:            `scale(${scale})`,
          }}
        >

          {/* ── Heading ── */}
          <div
            className="absolute left-0 right-0 flex flex-col items-center justify-center text-center px-8"
            style={{ top: 0, height: HEADING_H }}
          >
            <h2
              className="text-white font-bold tracking-tight leading-tight"
              style={{ fontSize: 38 }}
            >
              Trusted by Teams
            </h2>
            <p
              className="text-white/50 leading-relaxed mt-3 max-w-[420px]"
              style={{ fontSize: 15 }}
            >
              What brokers and real estate organizations say after working within
              structured, system-driven infrastructure.
            </p>
          </div>

          {/* ── Video Cards ── */}
          {VIDEOS.map((video, vidIdx) => {
            const slot = getSlot(vidIdx, active, total);
            if (slot < 0) return null;

            const sz = SLOT_SIZES[slot];
            const isCenter = slot === 2;
            const isPlaying = playingId === video.id;

            const leftPx = SLOT_LEFTS[slot];
            const topPx  = SLOT_TOPS[slot];

            return (
              <div
                key={video.id}
                onClick={() => (isCenter ? handleCenterClick(vidIdx) : undefined)}
                className={`absolute overflow-hidden ${isCenter ? "cursor-pointer" : "cursor-default"}`}
                style={{
                  width:        sz.w,
                  height:       sz.h,
                  left:         leftPx,
                  top:          topPx,
                  borderRadius: sz.r,
                  zIndex:       sz.z,
                  transition:   "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow:    isCenter
                    ? "0 32px 72px rgba(0,0,0,0.55)"
                    : "0 8px 20px rgba(0,0,0,0.2)",
                }}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[vidIdx] = el;
                    if (el && el.readyState >= 1 && el.paused && el.currentTime === 0) {
                      el.currentTime = 0.01;
                    }
                  }}
                  src={video.src}
                  poster={video.poster}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(e) => {
                    const vid = e.currentTarget;
                    if (vid.paused && vid.currentTime === 0) {
                      vid.currentTime = 0.01;
                    }
                  }}
                  onPlay={() => setPlayingId(video.id)}
                  onPause={() => setPlayingId((p) => (p === video.id ? null : p))}
                />

                {/* Frost overlay on non-center */}
                {!isCenter && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: FROST, borderRadius: sz.r }}
                  />
                )}

                {/* Center: Play / Pause button */}
                {isCenter && (
                  <button
                    className="absolute inset-0 flex items-center justify-center group"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    <div
                      className={[
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        "border border-white/40 backdrop-blur-sm transition-all duration-200",
                        isPlaying
                          ? "bg-white/10 opacity-0 group-hover:opacity-100"
                          : "bg-white/25 hover:bg-white/35",
                      ].join(" ")}
                    >
                      {isPlaying ? (
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                  </button>
                )}

                {/* Mid cards: play icon (decorative only) */}
                {(slot === 1 || slot === 3) && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Logo — center only */}
                {isCenter && (
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
                    <img
                      src={video.logo}
                      alt="logo"
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* ── Nav buttons ── */}
          <div
            className="absolute left-0 right-0 flex items-center justify-center gap-4"
            style={{ top: HEADING_H + CAROUSEL_H, height: NAV_H, zIndex: 50 }}
          >
            <button
              onClick={() => navigate("prev")}
              disabled={isNavigating}
              aria-label="Previous"
              className="w-7 h-7 rounded-full flex items-center justify-center bg-[#484d54] border border-white/25 hover:bg-purple-700 text-white transition-colors duration-200 shadow-md shadow-purple-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-white text-lg">←</span>
            </button>

            <button
              onClick={() => navigate("next")}
              disabled={isNavigating}
              aria-label="Next"
              className="w-7 h-7 rounded-full flex items-center justify-center bg-[#B055F766] border border-white/25 hover:bg-purple-700 text-white transition-colors duration-200 shadow-md shadow-purple-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-white text-lg">→</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}