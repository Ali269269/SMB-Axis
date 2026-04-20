'use client';

import { useEffect, useRef, useState } from 'react';

const DESIGN_W = 1152;

function SystemInner() {
  return (
    <section className="w-full py-10">
      <div className="max-w-6xl mx-auto rounded-2xl glass-border relative overflow-hidden bg-gradient-to-r from-[#B055F71A] to-[#B055F71A]">

        <img
          src="/images/circuit.png"
          alt="circuit-top"
          className="absolute top-[-19px] left-[-35px] w-[44%] scale-x-[-1] pointer-events-none"
        />
        <img
          src="/images/circuit.png"
          alt="circuit-bottom"
          className="absolute bottom-[-20px] right-[-47px] w-[69%] scale-y-[-1] pointer-events-none"
        />

        {/* CONTENT */}
        <div className="relative z-10 grid md:grid-cols-2 gap-10 p-6 md:p-10 items-center">

          {/* LEFT CARD */}
          <div className="relative rounded-2xl w-[440px] h-[340px] mx-5 overflow-hidden glass-border bg-black/30">
            <img
              src="/images/system.png"
              alt="system"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0">
              <span className="absolute text-white font-semibold tracking-wide"
                style={{ bottom:"33%", left:"17%", transform:"rotate(20deg)", fontSize:10, padding:"6px 19px", borderRadius:999, background:"rgba(0,0,0,0)", border:"2.5px solid rgba(255,255,255,0.35)" }}>
                Broker Identity
              </span>
              <span className="absolute text-white font-semibold tracking-wide"
                style={{ bottom:"15%", left:"57%", transform:"rotate(-6deg)", fontSize:10, padding:"6px 16px", borderRadius:999, background:"rgba(0,0,0,0)", border:"1.5px solid rgba(255,255,255,0.35)" }}>
                Automation &amp; Integrations
              </span>
              <span className="absolute text-black bg-white font-semibold tracking-wide"
                style={{ bottom:"10%", left:"1%", transform:"rotate(-19deg)", fontSize:10, padding:"6px 16px", borderRadius:999, border:"1.5px solid rgba(255,255,255,0.35)", backdropFilter:"blur(6px)", whiteSpace:"nowrap" }}>
                Lead Engine
              </span>
              <span className="absolute text-black bg-[#E6E8EB] font-semibold"
                style={{ bottom:"15%", left:"16%", transform:"rotate(-32deg)", fontSize:10, padding:"7px 36px", borderRadius:999 }}>
                Security and Access
              </span>
              <span className="absolute text-black bg-[#E6E8EB] font-semibold tracking-wide"
                style={{ bottom:"26%", left:"48%", transform:"rotate(-24deg)", fontSize:10, padding:"6px 16px", borderRadius:999, border:"1.5px solid rgba(255,255,255,0.35)" }}>
                Automation &amp; Integrations
              </span>
              <span className="absolute text-white font-semibold tracking-wide"
                style={{ bottom:"25%", left:"3%", transform:"rotate(18deg)", fontSize:10, padding:"6px 16px", borderRadius:999, background:"rgba(0,0,0,0)", border:"1.5px solid rgba(255,255,255,0.35)", backdropFilter:"blur(6px)", whiteSpace:"nowrap" }}>
                Lead Nurture
              </span>
              <button className="absolute text-white font-bold tracking-wider"
                style={{ bottom:"2%", left:"30%", fontSize:11, padding:"7px 22px", borderRadius:999, background:"rgba(0,0,0,0.75)", border:"1.5px solid rgba(255,255,255,0.40)", backdropFilter:"blur(6px)", letterSpacing:"0.08em", whiteSpace:"nowrap" }}>
                GET A DEMO
              </button>
              <button className="absolute bg-white text-black font-semibold"
                style={{ bottom:"3%", left:"60%", transform:"rotate(5deg)", fontSize:12, padding:"3px 26px", borderRadius:999, boxShadow:"0 2px 8px rgba(0,0,0,0.3)" }}>
                Deal &amp; Handover
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-center" style={{ width:700, paddingRight:63, marginRight:12 }}>
            <h2 className="font-bold text-white mb-2" style={{ fontSize:30 }}>
              What Each System Includes
            </h2>
            <p className="text-gray-400 mb-4 leading-relaxed" style={{ fontSize:13, maxWidth:420 }}>
              Every SMB AXIS system combines marketing, software, automation,
              and security into one real estate operating setup.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Operations and KPI System","Lead Engine System","Deal & Handover Workflow",
                "Security & Access Control","Broker Identity System","Lead Nurture Sequences",
                "Automation & Integrations",
              ].map((item, i, arr) => (
                <button key={i}
                  className="rounded-full text-white border border-white/10 bg-[#090920]/80 backdrop-blur-md hover:border-purple-500 hover:bg-[#1a1a40] transition flex items-center gap-1"
                  style={{ fontSize:12, padding:"10px 10px" }}>
                  {item}
                  {i === arr.length - 1 && (
                    <span className="inline-flex items-center justify-center ml-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold"
                      style={{ width:24, height:24, fontSize:12, transform:"rotate(-50deg)" }}>→</span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_40px_rgba(255,255,255,0.15)]"></div>
      </div>
    </section>
  );
}

// ── Mobile layout — stacked, fluid, no fixed widths ───────────────────────
function SystemMobile() {
  return (
    <section className="w-full py-6 px-4">
      <div className="rounded-2xl glass-border relative overflow-hidden bg-gradient-to-r from-[#B055F71A] to-[#B055F71A]">

        <img src="/images/circuit.png" alt="" className="absolute top-[-12px] left-[-20px] w-[60%] scale-x-[-1] pointer-events-none" />
        <img src="/images/circuit.png" alt="" className="absolute bottom-[-12px] right-[-28px] w-[70%] scale-y-[-1] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 p-5">

          {/* IMAGE CARD — full width, fixed aspect ratio */}
          <div className="relative w-full rounded-2xl overflow-hidden glass-border bg-black/30" style={{ aspectRatio: '16/10' }}>
            <img
              src="/images/system.png"
              alt="system"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay pills — repositioned for mobile */}
            <div className="absolute inset-0">
              <span className="absolute text-white font-semibold tracking-wide"
                style={{ top:"12%", left:"8%", transform:"rotate(20deg)", fontSize:9, padding:"5px 14px", borderRadius:999, background:"rgba(0,0,0,0)", border:"2px solid rgba(255,255,255,0.35)" }}>
                Broker Identity
              </span>
              <span className="absolute text-white font-semibold tracking-wide"
                style={{ top:"12%", right:"6%", transform:"rotate(-6deg)", fontSize:9, padding:"5px 12px", borderRadius:999, background:"rgba(0,0,0,0)", border:"1.5px solid rgba(255,255,255,0.35)" }}>
                Automation &amp; Integrations
              </span>
              <span className="absolute text-black bg-white font-semibold tracking-wide"
                style={{ top:"42%", left:"4%", transform:"rotate(-15deg)", fontSize:9, padding:"5px 13px", borderRadius:999, whiteSpace:"nowrap" }}>
                Lead Engine
              </span>
              <span className="absolute text-black bg-[#E6E8EB] font-semibold"
                style={{ top:"40%", left:"28%", transform:"rotate(-28deg)", fontSize:9, padding:"6px 18px", borderRadius:999 }}>
                Security and Access
              </span>
              <span className="absolute text-black bg-[#E6E8EB] font-semibold tracking-wide"
                style={{ top:"38%", right:"4%", transform:"rotate(-20deg)", fontSize:9, padding:"5px 12px", borderRadius:999 }}>
                Automation &amp; Integrations
              </span>
              <span className="absolute text-white font-semibold tracking-wide"
                style={{ bottom:"22%", left:"4%", transform:"rotate(14deg)", fontSize:9, padding:"5px 12px", borderRadius:999, background:"rgba(0,0,0,0)", border:"1.5px solid rgba(255,255,255,0.35)", whiteSpace:"nowrap" }}>
                Lead Nurture
              </span>
              <button className="absolute text-white font-bold tracking-wider"
                style={{ bottom:"4%", left:"22%", fontSize:10, padding:"6px 18px", borderRadius:999, background:"rgba(0,0,0,0.75)", border:"1.5px solid rgba(255,255,255,0.40)", backdropFilter:"blur(6px)", whiteSpace:"nowrap" }}>
                GET A DEMO
              </button>
              <button className="absolute bg-white text-black font-semibold"
                style={{ bottom:"5%", right:"4%", transform:"rotate(5deg)", fontSize:11, padding:"4px 20px", borderRadius:999, boxShadow:"0 2px 8px rgba(0,0,0,0.3)" }}>
                Deal &amp; Handover
              </button>
            </div>
          </div>

          {/* TEXT + BUTTONS */}
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-white" style={{ fontSize:22 }}>
              What Each System Includes
            </h2>
            <p className="text-gray-400 leading-relaxed" style={{ fontSize:13 }}>
              Every SMB AXIS system combines marketing, software, automation,
              and security into one real estate operating setup.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {[
                "Operations and KPI System","Lead Engine System","Deal & Handover Workflow",
                "Security & Access Control","Broker Identity System","Lead Nurture Sequences",
                "Automation & Integrations",
              ].map((item, i, arr) => (
                <button key={i}
                  className="rounded-full text-white border border-white/10 bg-[#090920]/80 backdrop-blur-md hover:border-purple-500 hover:bg-[#1a1a40] transition flex items-center gap-1"
                  style={{ fontSize:11, padding:"8px 10px" }}>
                  {item}
                  {i === arr.length - 1 && (
                    <span className="inline-flex items-center justify-center ml-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold"
                      style={{ width:20, height:20, fontSize:11, transform:"rotate(-50deg)" }}>→</span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_40px_rgba(255,255,255,0.15)]"></div>
      </div>
    </section>
  );
}

// ── Responsive scale wrapper ───────────────────────────────────────────────
export default function System() {
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale]       = useState(1);
  const DESIGN_H = 500;

  useEffect(() => {
    function recalc() {
      const vw = window.innerWidth;
      setIsMobile(vw < 768);
      if (vw >= 768) {
        const sidePad  = Math.min(48, vw * 0.04) * 2;
        const available = vw - sidePad;
        setScale(parseFloat(Math.min(1, available / DESIGN_W).toFixed(4)));
      }
    }
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  // Mobile: render fluid layout, no scaling needed
  if (isMobile) return <SystemMobile />;

  // Desktop/tablet: original scaled layout — unchanged
  const scaledH = DESIGN_H * scale;
  return (
    <div style={{ width:'100%', height:`${scaledH}px`, position:'relative', overflow:'hidden' }}>
      <div style={{
        position:'absolute', top:0, left:'50%',
        width:`${DESIGN_W}px`,
        transformOrigin:'top center',
        transform:`translateX(-50%) scale(${scale})`,
      }}>
        <SystemInner />
      </div>
    </div>
  );
}
