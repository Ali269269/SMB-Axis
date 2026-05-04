'use client';

import { useState, useRef, useEffect } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';
import Image from 'next/image';


// ─── Reusable Dropdown ─────────────────────────────────────────────────────────
type DropdownOption = 'Today' | 'Weekly' | 'Monthly';

function PeriodDropdown({
  value,
  options,
  onChange,
}: {
  value: DropdownOption;
  options: DropdownOption[];
  onChange: (v: DropdownOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative" style={{ zIndex: 100 }}>
      {/* Trigger button — matches Figma: dark bg, text + chevron */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-xs text-gray-300 transition-colors"
        style={{
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 8,
          padding: '5px 12px',
          minWidth: 90,
          justifyContent: 'space-between',
        }}
      >
        <span>{value}</span>
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          style={{
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        >
          <path d="M1 1L5 5L9 1" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown panel — exact Figma style: very dark bg, rounded, tight padding */}
      {open && (
        <div
          className="absolute right-0 overflow-hidden"
          style={{
            top: 'calc(100% + 6px)',
            background: '#111120',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10,
            minWidth: 110,
            boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
            padding: '4px 0',
          }}
        >
          {options.map(opt => (
            <DropdownItem
              key={opt}
              label={opt}
              active={opt === value}
              onClick={() => { onChange(opt); setOpen(false); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DropdownItem({
  label, active, onClick,
}: {
  label: string; active: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const highlighted = active || hovered;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left transition-colors duration-100"
      style={{
        background: highlighted ? '#261341' : 'transparent',
        color: highlighted ? '#ffffff' : '#888899',
        fontSize: 12,
        padding: '7px 14px',
        display: 'block',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        borderRadius:'7px'
      }}
    >
      {label}
    </button>
  );
}

// ─── Stat Cards ────────────────────────────────────────────────────────────────
function StatCards() {
  const stats = [
    {
      value: '4,320',
      label: 'Total Visitors',
      sub: '+ 8% vs last week',
    },
    {
      value: '12',
      label: 'Total Active Users',
      sub: '+1 new this week',
    },
    {
      value: '520',
      label: 'Active Visitors',
      subHighlight: 'Live',
      sub: 'Currently browsing systems',
    },
    {
      value: '27.5%',
      label: 'Conversion Rate',
      sub: 'Visitor → Inquiry',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 ">
      {stats.map((s, i) => (
        <div
          key={i}
          className="
            bg-[#13131f]
            border border-[#2a2a3a]
            rounded-[12px]
            px-8 py-4

            shadow-[inset_4px_4px_10px_rgba(124,58,237,0.55),inset_1px_1px_3px_rgba(124,58,237,0.1),inset_-1px_-1px_2px_rgba(124,58,237,0.1)]
          "
        >
          <div className="text-2xl font-bold text-white tracking-tight">
            {s.value}
          </div>

          <div className="text-sm text-gray-300 mt-0.5 font-medium">
            {s.label}
            {s.subHighlight && (
              <span className="ml-1.5 text-xs text-green-400 font-semibold">
                · {s.subHighlight}
              </span>
            )}
          </div>

          <div className="text-xs text-gray-500 mt-1">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Total Visitors Chart ──────────────────────────────────────────────────────
// ─── Total Visitors Chart ──────────────────────────────────────────────────────
const visitorsData: Record<DropdownOption, { t: string; v: number }[]> = {
  Today: [
    { t: '00:00', v: 68 }, { t: '01:00', v: 20 }, { t: '03:00', v: 35 },
    { t: '05:00', v: 20 }, { t: '07:00', v: 42 }, { t: '09:00', v: 10 },
    { t: '11:00', v: 58 }, { t: '13:00', v: 18 }, { t: '16:00', v: 60 },
    { t: '18:00', v: 50 }, { t: '21:00', v: 90 }, { t: '24:00', v: 42 },
  ],
  Weekly: [
    { t: 'Mon', v: 55 }, { t: 'Tue', v: 72 }, { t: 'Wed', v: 48 },
    { t: 'Thu', v: 80 }, { t: 'Fri', v: 65 }, { t: 'Sat', v: 30 }, { t: 'Sun', v: 50 },
  ],
  Monthly: [
    { t: 'Jan', v: 40 }, { t: 'Feb', v: 55 }, { t: 'Mar', v: 70 },
    { t: 'Apr', v: 60 }, { t: 'May', v: 80 }, { t: 'Jun', v: 75 },
    { t: 'Jul', v: 90 }, { t: 'Aug', v: 85 }, { t: 'Sep', v: 65 },
    { t: 'Oct', v: 72 }, { t: 'Nov', v: 58 }, { t: 'Dec', v: 78 },
  ],
};

// Catmull-Rom → cubic bezier smooth curve
function smoothCurvePath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  const tension = 0.4;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function TotalVisitorsChart() {
  const [period, setPeriod] = useState<DropdownOption>('Today');
  const points = visitorsData[period];

  const W = 680, H = 210, padL = 34, padR = 6, padT = 14, padB = 30;
  const maxV = 100;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const baseY = padT + chartH;

  const toX = (i: number) => padL + (i / (points.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - (v / maxV) * chartH;

  const pts = points.map((p, i) => ({ x: toX(i), y: toY(p.v) }));
  const linePath = smoothCurvePath(pts);
  const areaPath = linePath
    + ` L ${toX(points.length - 1)} ${baseY}`
    + ` L ${toX(0)} ${baseY} Z`;

  return (
    <div className="bg-[#0f0f1a] rounded-[12px] p-5 border border-[#1a1a2e]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-base font-bold text-white">Total Visitors</h4>
        <PeriodDropdown value={period} options={['Today', 'Weekly', 'Monthly']} onChange={setPeriod} />
      </div>

      {/* Chart */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#34264c" stopOpacity="0.55" />
            <stop offset="60%"  stopColor="#7c3aed" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.00" />
          </linearGradient>
          <clipPath id="visitorClip">
            <rect x={padL} y={padT} width={chartW} height={chartH + 1} />
          </clipPath>
        </defs>

        {/* Dashed horizontal grid lines + y-axis labels */}
        {[0, 20, 40, 60, 80, 100].map(v => {
          const y = toY(v);
          return (
            <g key={v}>
              <line
                x1={padL} y1={y} x2={W - padR} y2={y}
                stroke="#1e1e32" strokeWidth="1" strokeDasharray="4 5"
              />
              <text
                x={padL - 6} y={y + 4}
                fontSize="9" fill="#3a3a54" textAnchor="end"
              >{v}</text>
            </g>
          );
        })}

        {/* Subtle vertical grid lines at each data point */}
        {pts.map((p, i) => (
          <line
            key={i}
            x1={p.x} y1={padT} x2={p.x} y2={baseY}
            stroke="#18182a" strokeWidth="1"
          />
        ))}

        {/* Gradient area fill (clipped) */}
        <path d={areaPath} fill="url(#visitorGrad)" clipPath="url(#visitorClip)" />

        {/* Smooth line */}
        <path
          d={linePath}
          fill="none"
          stroke="#b055f7"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots — filled purple with dark outline ring */}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="6" fill="#7c3aed" fillOpacity="0.15" />
            <circle cx={p.x} cy={p.y} r="3.5" fill="#7c3aed" stroke="#0f0f1a" strokeWidth="1.8" />
          </g>
        ))}

        {/* X-axis labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={toX(i)} y={H - 8}
            fontSize="9" fill="#3a3a54" textAnchor="middle"
          >{p.t}</text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-1 pl-8">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <circle cx="6" cy="6" r="4.5" stroke="#7c3aed" strokeWidth="1.5" fill="none" />
          <circle cx="6" cy="6" r="2" fill="#7c3aed" />
        </svg>
        <span className="text-xs text-gray-500">Visitors</span>
      </div>
    </div>
  );
}

// ─── Overall Progress ──────────────────────────────────────────────────────────
const progressData: Record<DropdownOption, { label: string; v: number }[]> = {
  Today: [
    { label: '6am',  v: 30 }, { label: '9am',  v: 55 }, { label: '12pm', v: 70 },
    { label: '3pm',  v: 45 }, { label: '6pm',  v: 60 }, { label: '9pm',  v: 38 }, { label: '12am', v: 25 },
  ],
  Weekly: [
    { label: 'Mon', v: 56 }, { label: 'Tues', v: 64 }, { label: 'Wed',   v: 76 },
    { label: 'Thurs', v: 78 }, { label: 'Fri', v: 70 }, { label: 'Sat',  v: 37 }, { label: 'Sun',  v: 37 },
  ],
  Monthly: [
    { label: 'Jan', v: 45 }, { label: 'Feb', v: 60 }, { label: 'Mar', v: 55 },
    { label: 'Apr', v: 70 }, { label: 'May', v: 80 }, { label: 'Jun', v: 65 },
    { label: 'Jul', v: 75 }, { label: 'Aug', v: 85 }, { label: 'Sep', v: 60 },
    { label: 'Oct', v: 70 }, { label: 'Nov', v: 50 }, { label: 'Dec', v: 65 },
  ],
};

function OverallProgress({ period }: { period: DropdownOption }) {
  const data = progressData[period];
  const maxVal = 100;
  const chartH = 180;
  const barW = 24;
  const depth = 2;
  const groupGap = data.length > 7 ? 4 : 28;
  const groupW = barW + groupGap;
  const padL = 36;
  const chartTop = 16;
  const baseY = chartTop + chartH;
  const totalW = padL + data.length * groupW + depth + 10;
  const totalH = chartH + chartTop + 36;

  return (
    <div className="flex items-stretch w-full">
      <div className="flex-[2] min-w-0">
        <div>
          
        </div>
        <svg viewBox={`0 0 ${totalW} ${totalH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          {[0, 20, 40, 60, 80, 100].map(v => {
            const y = baseY - (v / maxVal) * chartH;
            return (
              <g key={v}>
                <line x1={padL} y1={y} x2={totalW} y2={y} stroke="#1e1e32" strokeWidth="0.8" strokeDasharray="3 3" />
                <text x={padL - 6} y={y + 4} fontSize="8.5" fill="#444" textAnchor="end">{v}</text>
              </g>
            );
          })}
{data.map((d, i) => {
  const cx = padL + i * groupW + barW / 2; // center front edge
  const halfW = barW / 2;

  const bH = (d.v / maxVal) * chartH;
  const bY = baseY - bH;

  const chartTop = baseY - chartH;

  // Front edge is CENTER (cx)
  // Left face goes from cx LEFT to cx - halfW (back-left, shifted up by depth)
  // Right face goes from cx RIGHT to cx + halfW (back-right, shifted up by depth)

  const backL = cx - halfW;          // back-left x
  const backR = cx + halfW;          // back-right x
  const backTopY = bY - depth;       // back top y (both sides same height)
  const backShadowTopY = chartTop - depth;

  return (
    <g key={d.label}>

{/* ── SHADOW: RIGHT BACK FACE ── */}
<polygon
  points={`
    ${cx},${chartTop}
    ${backR},${backShadowTopY}
    ${backR},${baseY}
    ${cx},${baseY}
  `}
  fill="#221f33"
/>
{/* ── SHADOW: LEFT BACK FACE ── */}
<polygon
  points={`
    ${backL},${backShadowTopY}
    ${cx},${chartTop}
    ${cx},${baseY}
    ${backL},${baseY}
  `}
  fill="#2c2b3b"
/>
{/* ── SHADOW: TOP FACE (4-edge square, same as bar top) ── */}
<polygon
  points={`
    ${backL},${backShadowTopY}
    ${cx},${chartTop - depth / 8}
    ${backR},${backShadowTopY}
    ${cx},${chartTop - depth * 2}
  `}
  fill="#221f33"
/>


      {/* ── LEFT FACE (front-center edge to back-left) ── */}
      <polygon
        points={`
          ${backL},${backTopY}
          ${cx},${bY}
          ${cx},${baseY}
          ${backL},${baseY}
        `}
        fill="#8b5cc8"
      />

      {/* ── RIGHT FACE (front-center edge to back-right) ── */}
      <polygon
        points={`
          ${cx},${bY}
          ${backR},${backTopY}
          ${backR},${baseY}
          ${cx},${baseY}
        `}
        fill="#5e3685"
      />

      {/* ── TOP FACE (4-edge parallelogram, front point at cx) ── */}
      <polygon
  points={`
    ${backL},${backTopY}
    ${cx},${bY - depth / 8}
    ${backR},${backTopY}
    ${cx},${bY - depth * 2}
  `}
  fill="#9277ad"
/>

      {/* ── FRONT CENTER EDGE (ridge line) ── */}
      <line
        x1={cx} y1={bY}
        x2={cx} y2={baseY}
        
        strokeWidth="1"
      />

      {/* ── VALUE LABEL ── */}
      <text
        x={cx}
        y={bY - depth * 2 - 8}
        fontSize="13"
        fill="#ffffff"
        textAnchor="middle"
        fontWeight="bold"
      >
        {d.v}
      </text>
    </g>
  );
})}
          {/* ✅ X-AXIS LABELS (FIX ADDED HERE) */}
          {data.map((d, i) => {
            const cx = padL + i * groupW + barW / 2;

            return (
              <text
                key={`label-${d.label}`}
                x={cx}
                y={baseY + 16}
                fontSize={data.length > 10 ? "7" : "9"}
                fill="#9ca3af"
                textAnchor="middle"
              >
                {d.label}
              </text>
            );
          })}

          <line x1={padL} y1={baseY} x2={totalW} y2={baseY} stroke="#2a2a3d" strokeWidth="1" />
        </svg>
        <div className="flex items-center gap-2 mt-1 pl-8">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#7c3aed] inline-block" />
          <span className="text-xs text-gray-500">
            Total Users This {period === 'Today' ? 'Day' : period === 'Weekly' ? 'Week' : 'Month'}
          </span>
        </div>
      </div>

      {/* Donut + stats */}
      {/* Vertical divider */}
      <div className="w-px bg-white/10 mx-10" />

      {/* Donut + stats */}
      <div className="flex-[1] min-w-0">
        {/* Legend */}
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Visitors
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-yellow-300 inline-block" /> Clicks
          </span>
        </div>

        {/* Donut SVG with outside labels + pointer lines */}
        <div className="flex-1 flex items-center justify-center">
          <svg viewBox="0 0 220 200"  className="w-full h-[200px]"
  preserveAspectRatio="xMidYMid meet">
            {/* ── arcs ── */}
            {/* Visitors: 66.12% green, starts at -90deg */}
            <circle
              cx="110" cy="100" r="55"
              fill="none" stroke="#22c55e" strokeWidth="35"
              strokeDasharray={`${0.6612 * 2 * Math.PI * 55} ${2 * Math.PI * 55}`}
              strokeDashoffset="0"
              transform="rotate(-90 110 100)"
            />
            {/* Clicks: 33.88% yellow, follows visitors */}
            <circle
              cx="110" cy="100" r="55"
              fill="none" stroke="#d4e015" strokeWidth="35"
              strokeDasharray={`${0.3388 * 2 * Math.PI * 55} ${2 * Math.PI * 55}`}
              strokeDashoffset={`-${0.6612 * 2 * Math.PI * 55}`}
              transform="rotate(-90 110 100)"
            />

            {/* ── center text ── */}
            <text x="110" y="94" fontSize="18" fill="#fff" textAnchor="middle" fontWeight="bold">7%</text>
            <text x="110" y="108" fontSize="7.5" fill="#888" textAnchor="middle">more than yesterday</text>

            {/* ── Clicks label (left side) ~33.88% midpoint → ~240deg from top ── */}
            {/* midpoint of clicks arc: -90 + 66.12%*360 + 33.88%*360/2 = ~177deg */}
            {/* pointer from arc edge outward to left */}
            <line x1="68" y1="108" x2="12" y2="130" stroke="#888" strokeWidth="0.8"/>
            <text x="10" y="126" fontSize="11" fill="#aaa" textAnchor="end">Clicks</text>
            <text x="10" y="138" fontSize="11" textAnchor="end">
              <tspan fill="#d4e015" fontWeight="bold">41</tspan>
              <tspan fill="#22c55e" dx="3">33.88%</tspan>
            </text>

            {/* ── Visitors label (right side) ~66.12% midpoint → ~57deg from top ── */}
            <line x1="150" y1="92" x2="205" y2="100" stroke="#888" strokeWidth="0.8"/>
            <text x="210" y="104" fontSize="11" fill="#aaa" textAnchor="start">Visitors</text>
            <text x="210" y="116" fontSize="11" textAnchor="start">
              <tspan fill="#22c55e" fontWeight="bold">80</tspan>
              <tspan fill="#22c55e" dx="3">66.12%</tspan>
            </text>
          </svg>
        </div>

        {/* Total Users / Total Clicks */}
        <div className="flex gap-6 pt-3  mt-1">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7" cy="6" r="3" stroke="#888" strokeWidth="1.2"/>
              <path d="M1 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="13" cy="6" r="2.5" stroke="#888" strokeWidth="1.2"/>
            </svg>
            <div>
              <div className="text-xs text-gray-400 font-semibold">Total Users</div>
              <div className="text-sm font-bold text-white">1,234</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 font-semibold">Total Clicks</div>
            <div className="text-sm font-bold text-white">786</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Traffic Sources ───────────────────────────────────────────────────────────
const trafficSeriesBase = [
  { name: 'Facebook',  color: '#3b82f6' },
  { name: 'Google',    color: '#eab308' },
  { name: 'LinkedIn',  color: '#22c55e' },
  { name: 'Website',   color: '#a855f7' },
  { name: 'Instagram', color: '#f97316' },
];

const trafficLabels: Record<DropdownOption, string[]> = {
  Today:   ['6am','9am','12pm','3pm','6pm','9pm','12am'],
  Weekly:  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  Monthly: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
};

const trafficData: Record<DropdownOption, number[][]> = {
  Today: [
    [60, 130, 130, 130, 140, 130, 130],
    [130, 130, 65, 130, 125, 65, 175],
    [50, 130, 100, 120, 130, 55, 130],
    [180, 175, 175, 185, 290, 240, 245],
    [160, 160, 165, 165, 185, 170, 180],
  ],
  Weekly: [
    [60, 130, 130, 130, 140, 130, 130],
    [130, 130, 65, 130, 125, 65, 175],
    [50, 130, 100, 120, 130, 55, 130],
    [180, 175, 175, 185, 290, 240, 245],
    [160, 160, 165, 165, 185, 170, 180],
  ],
  Monthly: [
    [60, 130, 130, 130, 140, 130, 130, 100, 130, 70,  170, 130],
    [130, 130, 65,  130, 125, 65,  175, 170, 170, 170, 180, 130],
    [50,  130, 100, 120, 130, 55,  130, 130, 145, 130, 175, 55],
    [180, 175, 175, 185, 290, 240, 245, 235, 230, 65,  300, 230],
    [160, 160, 165, 165, 185, 170, 180, 250, 240, 245, 185, 130],
  ],
};

function TrafficSources({ period }: { period: DropdownOption }) {
  const labels = trafficLabels[period];
  const series = trafficSeriesBase.map((s, i) => ({ ...s, data: trafficData[period][i] }));

  const W = 500, H = 220, padL = 33, padB = 28, padT = 14;
  const maxV = 300;
  const chartW = W - padL - 8;
  const chartH = H - padB - padT;
  const toX = (i: number) => padL + (i / (labels.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - (v / maxV) * chartH;

  const rightPanel = [
    { name: 'Instagram', pct: 67, color: '#f97316', icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig)" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4" stroke="url(#ig)" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#f97316"/>
        <defs>
          <linearGradient id="ig" x1="0" y1="24" x2="24" y2="0">
            <stop offset="0%" stopColor="#f9ce34"/>
            <stop offset="50%" stopColor="#ee2a7b"/>
            <stop offset="100%" stopColor="#6228d7"/>
          </linearGradient>
        </defs>
      </svg>
    )},
    { name: 'Facebook',  pct: 73, color: '#3b82f6', icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877f2">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    )},
    { name: 'Linkedin',  pct: 41, color: '#0ea5e9', icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="#0077b5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )},
    { name: 'Google',    pct: 87, color: '#eab308', icon: (
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    )},
    { name: 'Website',   pct: 64, color: '#a855f7', icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#a855f7" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    )},
  ];

  return (
    <div className="flex gap-5">
       
      <div className="flex-1 min-w-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            {series.map(s => (
              <linearGradient key={s.name} id={`tg-${s.name}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={s.color} stopOpacity="0.35" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.02" />
              </linearGradient>
            ))}
          </defs>

          {/* Grid lines */}
          {[0,60,120,180,240,300].map(v => (
            <g key={v}>
              <line
                x1={padL} y1={toY(v)} x2={W - 8} y2={toY(v)}
                stroke="#1e1e32" strokeWidth="0.8" strokeDasharray="3 3"
              />
              <text x={padL - 10} y={toY(v) + 3} fontSize="9" fill="#555" textAnchor="end">{v}</text>
            </g>
          ))}

          {/* Area + Line + Dots */}
          {series.map(s => {
            const areaPath =
              `M${toX(0)},${toY(s.data[0])} ` +
              s.data.slice(1).map((v, i) => `L${toX(i+1)},${toY(v)}`).join(' ') +
              ` L${toX(s.data.length - 1)},${H - padB} L${toX(0)},${H - padB} Z`;
            const linePath = s.data.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ');
            return (
              <g key={s.name}>
                <path d={areaPath} fill={`url(#tg-${s.name})`} />
                <path d={linePath} fill="none" stroke={s.color} strokeWidth="1.8" strokeLinejoin="miter" />
                {s.data.map((v, i) => (
  <g key={i}>
    {/* 3rd outer ring — transparent line color */}
    <circle
      cx={toX(i)} cy={toY(v)}
      r="6"
      fill="none"
      stroke={s.color}
      strokeWidth="1.5"
      strokeOpacity="0.25"
    />
    {/* 2nd middle ring — white */}
    <circle
      cx={toX(i)} cy={toY(v)}
      r="4"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeOpacity="0.9"
    />
    {/* 1st inner dot — solid line color */}
    <circle
      cx={toX(i)} cy={toY(v)}
      r="2"
      fill={s.color}
    />
  </g>
))}
              </g>
            );
          })}

          {/* X axis labels */}
          {labels.map((m, i) => (
            <text key={m} x={toX(i)} y={H - 8} fontSize="9" fill="#555" textAnchor="middle">{m}</text>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-1 pl-8 flex-wrap">
          {series.map(s => (
            <span key={s.name} className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      </div>
      <div className="w-px bg-white/10 mx-2 flex-shrink-0"></div>
      {/* Right Panel */}
      <div className="w-66 flex flex-col justify-center">
        <div className="text-sm font-bold text-white mb-3">Traffic by Source</div>
        <div className="flex flex-col divide-y divide-white/5">
          {rightPanel.map(s => (
            <div key={s.name} className="py-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10">
                    {s.icon}
                  </span>
                  <span className="text-sm font-semibold text-white">{s.name}</span>
                </div>
                <span className="text-sm text-gray-400 font-medium">{s.pct}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/10">
                <div
                  className="h-1 rounded-full"
                  style={{ width: `${s.pct}%`, background: s.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const mapCountries: Record<
  DropdownOption,
  { name: string; visitors: string; flag: string }[]
> = {
  Today: [
    { name: 'UAE',      visitors: '240', flag: '/images/UE.png' },
    { name: 'USA',      visitors: '175', flag: '/images/US.png' },
    { name: 'Pakistan', visitors: '383', flag: '/images/PA.png' },
    { name: 'China',    visitors: '446', flag: '/images/CH.png' },
    { name: 'India',    visitors: '127', flag: '/images/IN.png' },
  ],
  Weekly: [
    { name: 'UAE',      visitors: '1,240', flag: '/images/UE.png' },
    { name: 'USA',      visitors: '875',   flag: '/images/US.png' },
    { name: 'Pakistan', visitors: '1,783', flag: '/images/PA.png' },
    { name: 'China',    visitors: '1,846', flag: '/images/CH.png' },
    { name: 'India',    visitors: '827',   flag: '/images/IN.png' },
  ],
  Monthly: [
    { name: 'UAE',      visitors: '5,240', flag: '/images/UE.png' },
    { name: 'USA',      visitors: '3,875', flag: '/images/US.png' },
    { name: 'Pakistan', visitors: '7,183', flag: '/images/PA.png' },
    { name: 'China',    visitors: '8,046', flag: '/images/CH.png' },
    { name: 'India',    visitors: '3,827', flag: '/images/IN.png' },
  ],
};
function MapView({ period }: { period: DropdownOption }) {
  const countries = mapCountries[period];

  return (
    <div className="flex gap-6">
      
      {/* ── MAP ── */}
      <div className="flex-1 min-w-0 mx-10 mt-10">
      <div className="flex-1 min-w-0">
      <Image
  src="/images/earth.png"
  alt="map"
  width={500}
  height={430}
  
/>
</div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="w-60 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-8">
          <span className="text-base font-bold text-white">Top Countries</span>
          <div className="flex gap-1 ">
            <button className="w-6 h-6 flex items-center justify-center text-gray-500 text-xs hover:text-white transition-colors rounded">◀</button>
            <button className="w-6 h-6 flex items-center justify-center text-gray-500 text-xs hover:text-white transition-colors rounded">▶</button>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-white/5  ">
          {countries.map(c => (
            <div key={c.name} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
              <img
  src={c.flag}
  alt={c.name}
  className="w-6 h-4 object-cover rounded-sm"
/>
                <span className="text-sm font-semibold text-white">{c.name}</span>
              </div>
              <span className="text-sm text-gray-400">{c.visitors} visitors</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [progressPeriod, setProgressPeriod] = useState<DropdownOption>('Weekly');
  const [trafficPeriod,  setTrafficPeriod]  = useState<DropdownOption>('Monthly');
  const [mapPeriod,      setMapPeriod]      = useState<DropdownOption>('Weekly');

  return (
    <div className="flex min-h-screen bg-[#0c0c18]  text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-500 w-15 bg-gradient-to-r from-purple-600/5 via-purple-500/10 to-transparent blur-2xl" />
      <AdminSidebar activeTab="analytics" />

      <div className="flex-1 flex flex-col overflow-auto border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Analytics" />

        <main className="flex-1 px-5 py-5 flex flex-col gap-5">

          <StatCards />

          <TotalVisitorsChart />

          <div className="bg-[#13131f] rounded-[12px] p-5 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-semibold text-white">Overall Progress</h4>
              <PeriodDropdown value={progressPeriod} options={['Today','Weekly','Monthly']} onChange={setProgressPeriod} />
            </div>
            <OverallProgress period={progressPeriod} />
          </div>

          <div className="bg-[#13131f] rounded-[12px] p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-semibold text-white">Traffic Sources Overview</h4>
              <PeriodDropdown value={trafficPeriod} options={['Today','Weekly','Monthly']} onChange={setTrafficPeriod} />
            </div>
            <TrafficSources period={trafficPeriod} />
          </div>

          <div className="bg-[#13131f] rounded-[12px] p-5 border border-white/5">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-white">Map View</h4>
              <PeriodDropdown value={mapPeriod} options={['Today','Weekly','Monthly']} onChange={setMapPeriod} />
            </div>
            <MapView period={mapPeriod} />
          </div>

        </main>
      </div>
    </div>
  );
}
