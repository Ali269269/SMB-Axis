"use client";

import { useState, useRef, useEffect } from "react";

// ── SVG Icons ────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const BellIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const ChevronDown = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const ArrowUpRight = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const OverviewIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const AnalyticsIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const WorkflowIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const AdminIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const TeamIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ConsultIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const ContentIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);
const EmailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const CareerIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const SettingsIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────
type PeriodKey = "Today" | "Weekly" | "Monthly";

// ── Chart Data ───────────────────────────────────────────────────────────────
const CHART_DATA: Record<PeriodKey, { labels: string[]; subscribers: number[]; leads: number[] }> = {
  Weekly: {
    labels:      ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    subscribers: [56, 64, 76, 78, 70, 37, 89],
    leads:       [39, 80, 15, 17, 65, 15, 22],
  },
  Today: {
    labels:      ["00:00","02:00","04:00","06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00","24:00"],
    subscribers: [56, 64, 76, 78, 70, 37, 89, 89, 89, 89, 89, 89, 89],
    leads:       [39, 80, 15, 17, 65, 15, 22, 22, 22, 22, 22, 22, 22],
  },
  Monthly: {
    labels:      ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    subscribers: [56, 64, 76, 78, 70, 37, 89, 89, 89, 89, 89, 89],
    leads:       [39, 80, 15, 17, 65, 15, 22, 22, 22, 22, 22, 22],
  },
};

const VISIBLE = 7; // bars visible at once

// ── CONTROLLED Dropdown for Progress chart ───────────────────────────────────
// value + onChange = fully controlled, no internal state
function ChartDropdown({
  value,
  onChange,
  options = ["Today", "Weekly", "Monthly"] as PeriodKey[],
}: {
  value: PeriodKey;
  onChange: (v: PeriodKey) => void;
  options?: PeriodKey[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-xs text-gray-400 bg-[#1e1e30] border border-[#2a2a3a] rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:bg-[#2a2a40] hover:text-white transition-colors"
      >
        {value}
        <span style={{ display: "inline-flex", transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <ChevronDown size={12} />
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 z-50 mt-1.5 min-w-[110px] rounded-[10px] border border-[#2a2a3a] bg-[#13131f] p-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          style={{ animation: "ddIn .15s ease" }}
        >
          <style>{`@keyframes ddIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);   // ← directly calls parent setter
                setOpen(false);
              }}
              className="block w-full text-left text-xs rounded-[7px] px-3 py-[7px] transition-colors"
              style={{
                background:  value === opt ? "#261341" : "transparent",
                color:       value === opt ? "#fff" : "#9ca3af",
                fontWeight:  value === opt ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (value !== opt) {
                  (e.currentTarget as HTMLElement).style.background = "#261341";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (value !== opt) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#9ca3af";
                }
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── UNCONTROLLED Dropdown (stat cards, activity, scheduled) ──────────────────
function ActionDropdown({
  defaultValue = "Weekly",
  options = ["Today", "Weekly", "Monthly"] as PeriodKey[],
}: {
  defaultValue?: PeriodKey;
  options?: PeriodKey[];
}) {
  const [selected, setSelected] = useState<PeriodKey>(defaultValue);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-xs text-gray-400 bg-[#1e1e30] border border-[#2a2a3a] rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:bg-[#2a2a40] hover:text-white transition-colors"
      >
        {selected}
        <span style={{ display: "inline-flex", transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <ChevronDown size={12} />
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 z-50 mt-1.5 min-w-[110px] rounded-[10px] border border-[#2a2a3a] bg-[#13131f] p-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          style={{ animation: "ddIn .15s ease" }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className="block w-full text-left text-xs rounded-[7px] px-3 py-[7px] transition-colors"
              style={{
                background: selected === opt ? "#261341" : "transparent",
                color:      selected === opt ? "#fff" : "#9ca3af",
                fontWeight: selected === opt ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (selected !== opt) {
                  (e.currentTarget as HTMLElement).style.background = "#261341";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== opt) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#9ca3af";
                }
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sidebar Nav Item ─────────────────────────────────────────────────────────
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";

function NavItem({
  icon,
  label,
  path,
  active = false,
  hasArrow = false,
}: {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
  hasArrow?: boolean;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(path)}
      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active
          ? "bg-[#261341] text-white"
          : "text-gray-400 hover:text-white hover:bg-[#1e1e2e]"
      }`}
    >
      <span className="flex items-center gap-3">
        {icon}
        <span className="whitespace-nowrap">{label}</span>
      </span>
      {hasArrow && <ChevronDown size={13} />}
    </button>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, sub, subColor = "text-gray-400", live = false }: {
  value: string; label: string; sub: string; subColor?: string; live?: boolean;
}) {
  return (
    <div className="bg-[#13131f] rounded-[12px] p-4 flex flex-col gap-1 min-w-0 border border-[#2a2a3a] shadow-[inset_2px_2px_6px_rgba(124,58,237,0.98),inset_-2px_-2px_6px_rgba(124,58,237,0.05),0_0_8px_rgba(124,58,237,0.25)]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-2xl font-bold text-white">{value}</span>
        <ActionDropdown defaultValue="Weekly" />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-gray-300 font-medium">{label}</span>
        {live && <span className="flex items-center gap-1 text-[10px] text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Live</span>}
      </div>
      <span className={`text-xs ${subColor} flex items-center gap-1`}>
        {sub.startsWith("↑") && <span className="text-green-400">↑</span>}
        {sub.startsWith("↑") ? sub.slice(1) : sub}
      </span>
    </div>
  );
}

// ── Bar Chart ────────────────────────────────────────────────────────────────
function BarChart({ period }: { period: PeriodKey }) {
  const data = CHART_DATA[period];
  const scrollRef = useRef<HTMLDivElement>(null);

  const maxVal   = 100;
  const chartH   = 250;
  const barW     = 24;
  const gap      = 5;
  const groupW   = barW * 2 + gap + 20;
  const depth    = 2.5;
  const padL     = 38;
  const chartTop = 16;
  const baseY    = chartTop + chartH;
  const totalH   = chartH + chartTop + 44;
  const svgW     = padL + data.labels.length * groupW + 10;
  const needsScroll = data.labels.length > VISIBLE;

  return (
    <div className="flex-1 min-w-0 flex flex-col">
      <div className="text-[10px] text-gray-400 mb-0.5 pl-1">{period}</div>

      <div style={{ width: "100%", overflow: "hidden" }}>
        <div
          ref={scrollRef}
          style={{
            overflowX: needsScroll ? "auto" : "visible",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`.barscroll::-webkit-scrollbar{display:none}`}</style>
          <div className="barscroll" style={{ width: svgW, minWidth: svgW }}>
            <svg
              viewBox={`0 0 ${svgW} ${totalH}`}
              width={svgW}
              height={totalH}
              style={{ display: "block" }}
              preserveAspectRatio="xMinYMid meet"
            >
              {[0, 20, 40, 60, 80, 100].map((v) => {
                const y = baseY - (v / maxVal) * chartH;
                return (
                  <g key={v}>
                    <line x1="28" y1={y} x2={svgW} y2={y} stroke="#2a2a3a" strokeWidth="0.5" />
                    <text x="22" y={y + 4} fontSize="13" fill="#555" textAnchor="end">{v}</text>
                  </g>
                );
              })}

{data.labels.map((label, i) => {
  const x       = padL - 5 + i * groupW;
  const subH    = (data.subscribers[i] / maxVal) * chartH;
  const leadsH  = (data.leads[i] / maxVal) * chartH;
  const subY    = baseY - subH;
  const leadsY  = baseY - leadsH;
  const leadsX  = x + barW + gap;

  // ── SUBSCRIBERS centered cx ──
  const subCx   = x + barW / 2;
  const subBackL = subCx - barW / 2;
  const subBackR = subCx + barW / 2;
  const subBackTopY      = subY - depth;
  const subShadowBackTopY = chartTop - depth;

  // ── LEADS centered cx ──
  const leadsCx   = leadsX + barW / 2;
  const leadsBackL = leadsCx - barW / 2;
  const leadsBackR = leadsCx + barW / 2;
  const leadsBackTopY      = leadsY - depth;
  const leadsShadowBackTopY = chartTop - depth;

  return (
    <g key={`${period}-${i}`}>

      {/* ════════ SUBSCRIBERS SHADOW ════════ */}
      {/* Shadow Left Face */}
      <polygon
        points={`
          ${subBackL},${subShadowBackTopY}
          ${subCx},${chartTop}
          ${subCx},${baseY}
          ${subBackL},${baseY}
        `}
        fill="#322d43"
      />
      {/* Shadow Right Face */}
      <polygon
        points={`
          ${subCx},${chartTop}
          ${subBackR},${subShadowBackTopY}
          ${subBackR},${baseY}
          ${subCx},${baseY}
        `}
        fill="#2b223f"
      />
      {/* Shadow Top Face (4-edge square) */}
      <polygon
        points={`
          ${subBackL},${subShadowBackTopY}
          ${subCx},${chartTop - depth / 8}
          ${subBackR},${subShadowBackTopY}
          ${subCx},${chartTop - depth * 2}
        `}
        fill="#322d43"
      />

      {/* ════════ SUBSCRIBERS BAR ════════ */}
      {/* Left Face */}
      <polygon
        points={`
          ${subBackL},${subBackTopY}
          ${subCx},${subY}
          ${subCx},${baseY}
          ${subBackL},${baseY}
        `}
        fill="#ad80d4"
      />
      {/* Right Face */}
      <polygon
        points={`
          ${subCx},${subY}
          ${subBackR},${subBackTopY}
          ${subBackR},${baseY}
          ${subCx},${baseY}
        `}
        fill="#8846c0"
      />
      {/* Top Face (4-edge square) */}
      <polygon
        points={`
          ${subBackL},${subBackTopY}
          ${subCx},${subY - depth / 8}
          ${subBackR},${subBackTopY}
          ${subCx},${subY - depth * 2}
        `}
        fill="#c09aff"
      />
      {/* Center Ridge */}
      <line
        x1={subCx} y1={subY}
        x2={subCx} y2={baseY}
        stroke="#a78bfa"
        strokeWidth="0.8"
      />
      {/* Label */}
      <text
        x={subCx}
        y={subY - depth * 2 - 6}
        fontSize="12"
        fill="#ffffff"
        textAnchor="middle"
      >
        {data.subscribers[i]}
      </text>

      {/* ════════ LEADS SHADOW ════════ */}
      {/* Shadow Left Face */}
      <polygon
        points={`
          ${leadsBackL},${leadsShadowBackTopY}
          ${leadsCx},${chartTop}
          ${leadsCx},${baseY}
          ${leadsBackL},${baseY}
        `}
        fill="#3a3e35"
      />
      {/* Shadow Right Face */}
      <polygon
        points={`
          ${leadsCx},${chartTop}
          ${leadsBackR},${leadsShadowBackTopY}
          ${leadsBackR},${baseY}
          ${leadsCx},${baseY}
        `}
        fill="#353a2b"
      />
      {/* Shadow Top Face (4-edge square) */}
      <polygon
        points={`
          ${leadsBackL},${leadsShadowBackTopY}
          ${leadsCx},${chartTop - depth / 8}
          ${leadsBackR},${leadsShadowBackTopY}
          ${leadsCx},${chartTop - depth * 2}
        `}
        fill="#353a2b"
      />

      {/* ════════ LEADS BAR ════════ */}
      {/* Left Face */}
      <polygon
        points={`
          ${leadsBackL},${leadsBackTopY}
          ${leadsCx},${leadsY}
          ${leadsCx},${baseY}
          ${leadsBackL},${baseY}
        `}
        fill="#d4d68b"
      />
      {/* Right Face */}
      <polygon
        points={`
          ${leadsCx},${leadsY}
          ${leadsBackR},${leadsBackTopY}
          ${leadsBackR},${baseY}
          ${leadsCx},${baseY}
        `}
        fill="#c1c457"
      />
      {/* Top Face (4-edge square) */}
      <polygon
        points={`
          ${leadsBackL},${leadsBackTopY}
          ${leadsCx},${leadsY - depth / 10}
          ${leadsBackR},${leadsBackTopY}
          ${leadsCx},${leadsY - depth * 2}
        `}
        fill="#e8f260"
      />
      {/* Center Ridge */}
      <line
        x1={leadsCx} y1={leadsY}
        x2={leadsCx} y2={baseY}
      
      />
      {/* Label */}
      <text
        x={leadsCx}
        y={leadsY - depth * 2 - 6}
        fontSize="12"
        fill="#ffffff"
        textAnchor="middle"
      >
        {data.leads[i]}
      </text>

      {/* ── X Axis Label ── */}
      <text
        x={x + barW + gap / 2}
        y={baseY + 24}
        fontSize="12"
        fill="#666"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
})}

              <line x1="28" y1={baseY} x2={svgW} y2={baseY} stroke="#2a2a3a" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      {needsScroll && (
        <div className="flex items-center gap-1 mt-0.5 pl-8">
          <span className="text-[12px] text-gray-600 italic">swipe to see more</span>
          <svg width="9" height="9" fill="none" stroke="#4b5563" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
        </div>
      )}

      <div className="flex items-center gap-4 mt-1 pl-8">
        <span className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-2.5 h-2.5 rounded-sm bg-[#7c3aed] inline-block" /> Subscribers</span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-2.5 h-2.5 rounded-sm bg-[#c8e04a] inline-block" /> Leads</span>
      </div>
    </div>
  );
}

// ── Donut Chart ──────────────────────────────────────────────────────────────
function DonutChart() {
  return (
    <div className="flex flex-col items-center gap-3 pl-6.5 w-86 shrink-0">
      <div className="flex items-center gap-4 self-start">
        <span className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Visitors</span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Clicks</span>
      </div>
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 260 180" width="260" height="180" className="overflow-visible">
          <circle cx="110" cy="90" r="60" fill="none" stroke="#1f2937" strokeWidth="26" />
          <circle cx="110" cy="90" r="60" fill="none" stroke="#22c55e" strokeWidth="30" strokeDasharray="251 377" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 110 90)" />
          <circle cx="110" cy="90" r="60" fill="none" stroke="#60a5fa" strokeWidth="30" strokeDasharray="126 377" strokeDashoffset="-251" strokeLinecap="round" transform="rotate(-90 110 90)" />
          <text x="110" y="85" textAnchor="middle" fontSize="22" fontWeight="700" fill="white">7%</text>
          <text x="110" y="102" textAnchor="middle" fontSize="9" fill="#9ca3af">more than yesterday</text>
          <line x1="60" y1="70" x2="20" y2="70" stroke="#60a5fa" strokeWidth="1" />
          <text x="18" y="64" fontSize="10" fill="#9ca3af" textAnchor="end">Clicks</text>
          <text x="18" y="78" fontSize="12" fill="#60a5fa" textAnchor="end">41 33.88%</text>
          <line x1="160" y1="115" x2="200" y2="115" stroke="#22c55e" strokeWidth="1" />
          <text x="202" y="110" fontSize="10" fill="#9ca3af">Visitors</text>
          <text x="202" y="125" fontSize="12" fill="#22c55e">80 66.12%</text>
        </svg>
      </div>
      <div className="flex items-center gap-6 w-full">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full border border-[#3a3a4a] flex items-center justify-center"><TeamIcon /></div>
          <div><div className="text-[10px] text-gray-500">Total Visitors</div><div className="text-sm font-bold text-white">1,234</div></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full border border-[#3a3a4a] flex items-center justify-center">
            <svg width="14" height="14" fill="none" stroke="#c8e04a" strokeWidth="2" viewBox="0 0 24 24"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
          </div>
          <div><div className="text-[10px] text-gray-500">Total Clicks</div><div className="text-sm font-bold text-white">786</div></div>
        </div>
      </div>
    </div>
  );
}

// ── Activity / Scheduled Rows ─────────────────────────────────────────────────
function ActivityRow({ time, desc }: { time: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#1e1e2e] last:border-0">
      <span className="text-xs text-gray-500 w-16 shrink-0">{time}</span>
      <span className="text-sm text-white flex-1">{desc}</span>
      <button className="w-7 h-7 rounded-full border border-[#3a3a4a] flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-colors shrink-0"><ArrowUpRight /></button>
    </div>
  );
}
function ScheduledRow({ time, title, status }: { time: string; title: string; status: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#1e1e2e] last:border-0">
      <span className="text-xs text-gray-500 w-16 shrink-0">{time}</span>
      <span className="text-sm text-white flex-1">{title}</span>
      <StatusBadge status={status} />
    </div>
  );
}
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = { "In Progress": "text-blue-400", "Completed": "text-green-400", "Paused": "text-yellow-400" };
  return <span className={`text-xs font-semibold ${map[status] ?? "text-gray-400"}`}>{status}</span>;
}

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function OverviewDashboard() {
  // ✅ single source of truth for the chart period
  const [chartPeriod, setChartPeriod] = useState<PeriodKey>("Weekly");

  const activityItems = [
    { time: "10:45 AM", desc: "Sarah Patel submitted contact form" },
    { time: "10:45 AM", desc: "New Case Study Published" },
    { time: "10:45 AM", desc: "Ahmed applied for the SEO position" },
    { time: "10:45 AM", desc: "New blog uploaded" },
    { time: "10:45 AM", desc: "Sarah Patel submitted contact form" },
    { time: "10:45 AM", desc: "Sarah Patel submitted contact form" },
  ];
  const scheduledItems = [
    { time: "10:45 AM", title: "Meeting with PCLD", status: "In Progress" },
    { time: "10:45 AM", title: "Meeting with PCLD", status: "Completed" },
    { time: "10:45 AM", title: "Meeting with PCLD", status: "Completed" },
    { time: "10:45 AM", title: "Meeting with PCLD", status: "Paused" },
    { time: "10:45 AM", title: "Meeting with PCLD", status: "In Progress" },
    { time: "10:45 AM", title: "Meeting with PCLD", status: "In Progress" },
  ];
  const projects = [
    { client: "Ghita Quazzani", company: "Atlas Dental Center", project: "Website Design", assigned: "Rida Hasan", status: "In Progress", start: "21-02-2026", due: "21-02-2026" },
    { client: "Paz", company: "PCLD", project: "Social Media", assigned: "Rida Hasan", status: "Completed", start: "21-02-2026", due: "21-02-2026" },
    { client: "Nibal", company: "Nibal's Address", project: "Website Design", assigned: "Laiba", status: "Completed", start: "21-02-2026", due: "21-02-2026" },
    { client: "Ghita Quazzani", company: "Atlas Dental Center", project: "Website Design", assigned: "Rida Hasan", status: "Paused", start: "21-02-2026", due: "21-02-2026" },
    { client: "Ghita Quazzani", company: "Atlas Dental Center", project: "Website Design", assigned: "Rida Hasan", status: "In Progress", start: "21-02-2026", due: "21-02-2026" },
    { client: "Ghita Quazzani", company: "Atlas Dental Center", project: "Website Design", assigned: "Rida Hasan", status: "In Progress", start: "21-02-2026", due: "21-02-2026" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sidebar */}
      <AdminSidebar activeTab="overview" />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <AdminHeader title="Dashboard" />

        {/* Content */}
        <main className="flex-1 px-5 py-6 flex flex-col gap-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-5 gap-3">
            <StatCard value="4,320" label="Total Visitors" sub="↑ 8% vs last week" subColor="text-green-400" />
            <StatCard value="12" label="Total Leads" sub="+1 new this week" />
            <StatCard value="520" label="Active Visitors" sub="Currently browsing systems" live />
            <StatCard value="7" label="Meetings Scheduled" sub="This Week" />
            <StatCard value="27.5%" label="Conversion Rate" sub="Visitor → Inquiry" />
          </div>

          {/* Progress Chart */}
          <div className="bg-[#13131f] border border-[#2a2a3a] rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-semibold text-white">Progress</h4>

              {/* ✅ Controlled dropdown — value & onChange wired to chartPeriod state */}
              <ChartDropdown
                value={chartPeriod}
                onChange={(v) => setChartPeriod(v)}
              />
            </div>

            <div className="relative flex items-stretch gap-10 min-h-[200px]">
              {/* ✅ BarChart receives the live chartPeriod value */}
              <BarChart period={chartPeriod} />
              <DonutChart />
              <div className="absolute top-0 bottom-0 left-[64%] w-[1px] bg-[#FFFFFF26]" />
            </div>
          </div>

          {/* Recent Activity + Upcoming Scheduled */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#13131f] border border-[#2a2a3a] rounded-[10px] p-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-semibold text-white">Recent Activity</h4>
                <div className="flex items-center gap-2">
                  <button className="w-6 h-6 rounded border border-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-white"><ChevronLeft /></button>
                  <button className="w-6 h-6 rounded border border-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-white"><ChevronRight /></button>
                  <ActionDropdown defaultValue="Today" />
                </div>
              </div>
              <div>{activityItems.map((item, i) => <ActivityRow key={i} {...item} />)}</div>
            </div>

            <div className="bg-[#13131f] border border-[#2a2a3a] rounded-[10px] p-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-semibold text-white">Upcoming Scheduled</h4>
                <div className="flex items-center gap-2">
                  <button className="w-6 h-6 rounded border border-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-white"><ChevronLeft /></button>
                  <button className="w-6 h-6 rounded border border-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-white"><ChevronRight /></button>
                  <ActionDropdown defaultValue="Today" />
                </div>
              </div>
              <div>{scheduledItems.map((item, i) => <ScheduledRow key={i} {...item} />)}</div>
            </div>
          </div>

          {/* Ongoing Work Progress */}
          <div className="bg-[#13131f] border border-[#2a2a3a] rounded-[10px] p-5 mb-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-semibold text-white">Ongoing Work Progress</h4>
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 rounded border border-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-white"><ChevronLeft /></button>
                <button className="w-6 h-6 rounded border border-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-white"><ChevronRight /></button>
                <button className="text-xs text-white bg-[#1e1e30] border border-[#2a2a3a] rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:bg-[#2a2a40] transition-colors">
                  View All Projects <ArrowRight />
                </button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e2e]">
                  {["Client","Company","Project","Assigned To","Status","Start Date","Due Date"].map((h) => (
                    <th key={h} className="text-left text-xs text-gray-500 font-medium pb-3 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((row, i) => (
                  <tr key={i} className="border-b border-[#1a1a28] hover:bg-[#1a1a28] transition-colors">
                    <td className="py-3 pr-4 text-gray-300 text-xs">{row.client}</td>
                    <td className="py-3 pr-4 text-gray-400 text-xs">{row.company}</td>
                    <td className="py-3 pr-4 text-gray-300 text-xs">{row.project}</td>
                    <td className="py-3 pr-4 text-gray-400 text-xs">{row.assigned}</td>
                    <td className="py-3 pr-4 text-xs"><StatusBadge status={row.status} /></td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{row.start}</td>
                    <td className="py-3 text-gray-500 text-xs">{row.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}

