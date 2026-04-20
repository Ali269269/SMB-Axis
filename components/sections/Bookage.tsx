'use client';

import { useEffect, useRef, useState, useCallback } from "react";

type SystemCardProps = {
  image: string;
  title: string;
  tags: string[];
  circuitImage: string;
  extraButton?: string;
};

// Reusable card component
function SystemCard({ image, title, tags, circuitImage, extraButton }: SystemCardProps) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full max-w-[1100px] mx-auto px-2 sm:px-0 flex items-stretch 
      rounded-[16px] sm:rounded-[30px] overflow-hidden
      bg-[#151A21] shadow-[inset_0px_5px_15px_0px_rgba(176,85,220,0.4)] mb-1
      transition-all duration-700 ease-out
      h-auto sm:h-100 flex-col sm:flex-row
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      <div className="absolute inset-0 rounded-[16px] sm:rounded-[32px] border border-white/5 pointer-events-none" />

      {/* Image */}
      <div className="w-full sm:w-[42%] p-3 sm:p-5 shrink-0">
        <div className="relative w-full h-[170px] sm:h-full min-h-[150px] sm:min-h-[340px] rounded-2xl overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/40 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-3 sm:px-8 py-4 sm:py-12 relative z-10">
        <h4 className="text-white font-bold text-[11px] sm:text-[10px] leading-tight mb-2 sm:mb-4 tracking-tight">
          {title}
        </h4>

        <p className="text-[11.5px] sm:text-[12.5px] text-[#949494] leading-relaxed mb-4 sm:mb-8 max-w-full sm:max-w-[520px] whitespace-normal sm:whitespace-nowrap">
          Marketing and software systems built for real estate companies
          <br />
          to generate leads, control operations, and scale teams.
        </p>

        <div className="flex flex-col gap-2 sm:gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              className="group flex items-center justify-between w-full sm:w-fit min-w-0 sm:min-w-[250px]
              px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#B055F7]/80 
              text-[#E0E0E0] text-[11.5px] sm:text-[12px] font-semibold transition-all duration-300
              hover:border-[#B055F7] hover:bg-[#1A1A1E] hover:translate-x-1"
            >
              <span>{tag}</span>
              <span className="ml-2 sm:ml-3 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full
                bg-gray-600 border border-[#B055F7]/40
                group-hover:bg-[#B055F7] group-hover:border-[#B055F7] transition-all duration-300">
                <svg width="10" height="14" viewBox="0 0 12 12" fill="none"
                  className="group-hover:rotate-45 transition-transform duration-300">
                  <path
                    d="M3 9L9 3M9 3H4.5M9 3V7.5"
                    stroke="currentColor"
                    className="text-white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          ))}

          {extraButton && (
            <button
              className="group flex items-center justify-between w-full sm:w-fit min-w-0 sm:min-w-[100px]
              px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#B055F7]/80 
              text-[#E0E0E0] text-[10px] sm:text-[12px] font-semibold transition-all duration-300
              hover:border-[#B055F7] hover:bg-[#1A1A1E] hover:translate-x-1"
            >
              <span>{extraButton}</span>
              <span className="ml-2 sm:ml-3 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full
                bg-gray-600 border border-[#B055F7]/40
                group-hover:bg-[#B055F7] group-hover:border-[#B055F7] transition-all duration-300">
                <svg width="10" height="14" viewBox="0 0 12 12" fill="none"
                  className="group-hover:rotate-45 transition-transform duration-300">
                  <path
                    d="M3 9L9 3M9 3H4.5M9 3V7.5"
                    stroke="currentColor"
                    className="text-white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Circuit (desktop only) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        <div className="absolute top-0 mt-3 right-0 w-[51%] h-[51%]">
          <img src={circuitImage} alt="" className="w-full h-full object-contain object-right-top" />
        </div>
        <div className="absolute bottom-0 right-0 w-[51%] h-[51%] scale-y-[-1]">
          <img src={circuitImage} alt="" className="w-full h-full object-contain object-right-top" />
        </div>
      </div>
    </div>
  );
}

export default function AllSystems() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [card1Entered, setCard1Entered] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const swapTimerRef = useRef(null);

  const SLOW_RISE = "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)";
  const FAST_SWAP = "transform 0.45s cubic-bezier(0.77, 0, 0.18, 1)";
  const SWAP_DURATION = 500;
  const GAP = 8; // px

  // Detect mobile and measure card heights to set wrapper height precisely
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Measure and update wrapper height whenever content or viewport changes
  useEffect(() => {
    const updateHeight = () => {
      if (!card1Ref.current || !card2Ref.current) return;
      const h1 = card1Ref.current.offsetHeight;
      const h2 = card2Ref.current.offsetHeight;
      // wrapper holds both cards + gap between them
      setWrapperHeight(h1 + h2 + GAP);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    // Use ResizeObserver for dynamic height changes (e.g. font load, images)
    const ro = new ResizeObserver(updateHeight);
    if (card1Ref.current) ro.observe(card1Ref.current);
    if (card2Ref.current) ro.observe(card2Ref.current);

    return () => {
      window.removeEventListener("resize", updateHeight);
      ro.disconnect();
    };
  }, [card1Entered]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && !card1Entered) {
      const t = setTimeout(() => setCard1Entered(true), 80);
      return () => clearTimeout(t);
    }
  }, [inView, card1Entered]);

  const doSwap = useCallback(() => {
    setAnimating(true);
    setSwapped((s) => !s);
    setTimeout(() => setAnimating(false), SWAP_DURATION);
  }, []);

  useEffect(() => {
    if (!inView || !card1Entered) return;
    swapTimerRef.current = setTimeout(doSwap, 2000);
    return () => clearTimeout(swapTimerRef.current);
  }, [inView, card1Entered, swapped, doSwap]);

  // Calculate card heights for translate offsets
  const card1Height = card1Ref.current?.offsetHeight ?? 0;
  const card2Height = card2Ref.current?.offsetHeight ?? 0;

  // Card 1 (top card initially)
  let card1Transform, card1Transition, card1ZIndex;
  if (!card1Entered) {
    card1Transform = "translateY(170%)";
    card1Transition = "none";
    card1ZIndex = 2;
  } else if (!swapped) {
    card1Transform = "translateY(0px)";
    card1Transition = animating ? FAST_SWAP : SLOW_RISE;
    card1ZIndex = 2;
  } else {
    // Move card1 down by card2's height + gap
    card1Transform = `translateY(${card2Height + GAP}px)`;
    card1Transition = animating ? FAST_SWAP : "none";
    card1ZIndex = 1;
  }

  // Card 2 (bottom card initially)
  let card2Transform, card2Transition, card2ZIndex;
  if (!swapped) {
    // Start below card1
    card2Transform = `translateY(${card1Height + GAP}px)`;
    card2Transition = "none";
    card2ZIndex = 1;
  } else {
    card2Transform = "translateY(0px)";
    card2Transition = animating ? FAST_SWAP : "none";
    card2ZIndex = 2;
  }

  return (
    <div ref={containerRef} className="flex flex-col px-2 sm:px-0 overflow-hidden">
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          // On mobile, set explicit height so the container doesn't collapse
          // On desktop (sm+), height is driven by the hidden ghost div as before
          height: isMobile && wrapperHeight > 0 ? `${wrapperHeight}px` : undefined,
          overflow: "hidden",
        }}
      >
        {/* Ghost/sizer div — desktop only (hidden on mobile, we use measured height) */}
        <div
          className="sm:block"
          style={{
            visibility: "hidden",
            pointerEvents: "none",
            display: isMobile ? "none" : undefined,
          }}
        >
          <SystemCard
            image="/images/dubi.png"
            circuitImage="/images/circuit.png"
            title="Brokerage Growth Systems"
            tags={["Email Campaign System", "Social Media Automation"]}
            extraButton="Operations and KPI System"
          />
          <SystemCard
            image="/images/cyber.png"
            circuitImage="/images/circuit.png"
            title="Broker Growth Systems"
            tags={["Identity and Presence System", "Lead Capture and Nurture System"]}
          />
        </div>

        {/* Card 1 */}
        <div
          ref={card1Ref}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            transform: card1Transform,
            transition: card1Transition,
            zIndex: card1ZIndex,
          }}
        >
          <SystemCard
            image="/images/dubi.png"
            circuitImage="/images/circuit.png"
            title="Brokerage Growth Systems"
            tags={["Email Campaign System", "Social Media Automation"]}
            extraButton="Operations and KPI System"
          />
        </div>

        {/* Card 2 */}
        <div
          ref={card2Ref}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            transform: card2Transform,
            transition: card2Transition,
            zIndex: card2ZIndex,
          }}
        >
          <SystemCard 
          
            image="/images/cyber.png"
            circuitImage="/images/circuit.png"
            title="Broker Growth Systems"
            tags={["Identity and Presence System", "Lead Capture and Nurture System"]}
          />
        </div>
      </div>
    </div>
  );
}
