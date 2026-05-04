'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ─────────────────────────────────────────────────────────────────────
type TaskStatus = 'Completed' | 'In Progress' | 'Not Started' | 'Paused';

interface Task {
  date: string;
  task: string;
  resource: string;
  status: TaskStatus;
}

interface Project {
  id: number;
  name: string;
  client: string;
  icon: 'person' | 'building';
  pendingTasks: number;
  completedTasks: number;
  startDate: string;
  phone: string;
  email: string;
  systemRequested: string;
  progress: number;
  resources: { name: string; role: string; color: string; initial: string }[];
  tasks: Task[];
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 1, name: 'PCLD', client: 'Paz', icon: 'building',
    pendingTasks: 3, completedTasks: 4, startDate: '2-02-2026', progress: 60,
    phone: '+971 58 005 0000', email: 'pcld@gmail.com', systemRequested: 'Identity & Presence System',
    resources: [
      { name: 'Rida Hasan', role: 'Designer', color: 'bg-purple-600', initial: 'R' },
      { name: 'Suleman Musarrat', role: 'Developer', color: 'bg-green-600', initial: 'S' },
      { name: 'Husna', role: 'Social Media Strategist', color: 'bg-yellow-500', initial: 'H' },
    ],
    tasks: [
      { date: '3 March, 2026', task: 'Design Landing page', resource: 'Rida Hasan', status: 'Completed' },
      { date: '3 March, 2026', task: 'Develop API integrati...', resource: 'Suleman Musarrat', status: 'In Progress' },
      { date: '3 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Not Started' },
      { date: '3 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Paused' },
    ],
  },
  {
    id: 2, name: 'PCLD', client: 'Paz', icon: 'building',
    pendingTasks: 3, completedTasks: 4, startDate: '2-02-2026', progress: 45,
    phone: '+971 58 005 0001', email: 'pcld2@gmail.com', systemRequested: 'CRM System',
    resources: [
      { name: 'Rida Hasan', role: 'Designer', color: 'bg-purple-600', initial: 'R' },
      { name: 'Suleman Musarrat', role: 'Developer', color: 'bg-green-600', initial: 'S' },
      { name: 'Husna', role: 'Social Media Strategist', color: 'bg-yellow-500', initial: 'H' },
    ],
    tasks: [
      { date: '3 March, 2026', task: 'Design Landing page', resource: 'Rida Hasan', status: 'Completed' },
      { date: '3 March, 2026', task: 'Develop API integrati...', resource: 'Suleman Musarrat', status: 'In Progress' },
      { date: '3 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Not Started' },
      { date: '3 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Paused' },
    ],
  },
  {
    id: 3, name: 'Atlas Dental Center', client: 'Dr. Ghita', icon: 'person',
    pendingTasks: 3, completedTasks: 4, startDate: '2-02-2026', progress: 60,
    phone: '+971 58 005 0000', email: 'atlasdental@gmail.com', systemRequested: 'Identity & Presence System',
    resources: [
      { name: 'Rida Hasan', role: 'Designer', color: 'bg-purple-600', initial: 'R' },
      { name: 'Suleman Musarrat', role: 'Developer', color: 'bg-green-600', initial: 'S' },
      { name: 'Husna', role: 'Social Media Strategist', color: 'bg-yellow-500', initial: 'H' },
    ],
    tasks: [
      { date: '3 March, 2026', task: 'Design Landing page', resource: 'Rida Hasan', status: 'Completed' },
      { date: '3 March, 2026', task: 'Develop API integrati...', resource: 'Suleman Musarrat', status: 'In Progress' },
      { date: '3 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Not Started' },
      { date: '3 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Paused' },
    ],
  },
  {
    id: 4, name: 'Funds Verifier', client: 'Tariq', icon: 'person',
    pendingTasks: 3, completedTasks: 4, startDate: '5-03-2026', progress: 30,
    phone: '+971 58 006 0000', email: 'funds@gmail.com', systemRequested: 'Verification System',
    resources: [
      { name: 'Rida Hasan', role: 'Designer', color: 'bg-purple-600', initial: 'R' },
      { name: 'Suleman Musarrat', role: 'Developer', color: 'bg-green-600', initial: 'S' },
      { name: 'Husna', role: 'Social Media Strategist', color: 'bg-yellow-500', initial: 'H' },
    ],
    tasks: [
      { date: '5 March, 2026', task: 'Design Landing page', resource: 'Rida Hasan', status: 'Completed' },
      { date: '5 March, 2026', task: 'Develop API integrati...', resource: 'Suleman Musarrat', status: 'In Progress' },
      { date: '5 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Not Started' },
      { date: '5 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Paused' },
    ],
  },
  {
    id: 5, name: 'Atlas Dental Center', client: 'Andrew', icon: 'building',
    pendingTasks: 3, completedTasks: 4, startDate: '1-02-2026', progress: 75,
    phone: '+971 58 007 0000', email: 'gulf@gmail.com', systemRequested: 'Real Estate Portal',
    resources: [
      { name: 'Rida Hasan', role: 'Designer', color: 'bg-purple-600', initial: 'R' },
      { name: 'Suleman Musarrat', role: 'Developer', color: 'bg-green-600', initial: 'S' },
      { name: 'Husna', role: 'Social Media Strategist', color: 'bg-yellow-500', initial: 'H' },
    ],
    tasks: [
      { date: '1 March, 2026', task: 'Design Landing page', resource: 'Rida Hasan', status: 'Completed' },
      { date: '1 March, 2026', task: 'Develop API integrati...', resource: 'Suleman Musarrat', status: 'In Progress' },
      { date: '1 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Not Started' },
      { date: '1 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Paused' },
    ],
  },
  {
    id: 6, name: 'Mary Homes', client: 'Mary', icon: 'person',
    pendingTasks: 3, completedTasks: 4, startDate: '10-02-2026', progress: 50,
    phone: '+971 58 008 0000', email: 'mary@gmail.com', systemRequested: 'Home Management System',
    resources: [
      { name: 'Rida Hasan', role: 'Designer', color: 'bg-purple-600', initial: 'R' },
      { name: 'Suleman Musarrat', role: 'Developer', color: 'bg-green-600', initial: 'S' },
      { name: 'Husna', role: 'Social Media Strategist', color: 'bg-yellow-500', initial: 'H' },
    ],
    tasks: [
      { date: '10 March, 2026', task: 'Design Landing page', resource: 'Rida Hasan', status: 'Completed' },
      { date: '10 March, 2026', task: 'Develop API integrati...', resource: 'Suleman Musarrat', status: 'In Progress' },
      { date: '10 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Not Started' },
      { date: '10 March, 2026', task: 'Design Process', resource: 'Rida Hasan', status: 'Paused' },
    ],
  },
];

// ─── Task Sheet Modal ──────────────────────────────────────────────────────────
const statusOptions: TaskStatus[] = ['Completed', 'In Progress', 'Not Started', 'Paused'];

function statusStyle(status: TaskStatus) {
  switch (status) {
    case 'Completed': return 'bg-green-500/20 text-green-400 border border-green-500/30';
    case 'In Progress': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
    case 'Not Started': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
    case 'Paused': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
  }
}

function TaskSheetModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [tasks, setTasks] = useState<Task[]>(project.tasks);
  const [editingRow, setEditingRow] = useState<number | null>(null);

  const updateStatus = (idx: number, status: TaskStatus) => {
    setTasks((prev) => prev.map((t, i) => (i === idx ? { ...t, status } : t)));
    setEditingRow(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#13131f] border border-white/10 rounded-2xl w-full max-w-4xl mx-4 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-semibold text-white">Task Sheet</h2>
            <p className="text-xs text-gray-400 mt-0.5">{project.name} — Resources can update status daily</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-6 py-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wide">
                <th className="text-left pb-3 font-medium">Date</th>
                <th className="text-left pb-3 font-medium">Tasks</th>
                <th className="text-left pb-3 font-medium">Resource</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-left pb-3 font-medium">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tasks.map((t, idx) => (
                <tr key={idx} className="group">
                  <td className="py-3 text-gray-400">{t.date}</td>
                  <td className="py-3 text-gray-200">{t.task}</td>
                  <td className="py-3 text-gray-400">{t.resource}</td>
                  <td className="py-3">
                    {editingRow === idx ? (
                      <div className="flex flex-wrap gap-1">
                        {statusOptions.map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(idx, s)}
                            className={`px-2 py-1 rounded-full text-xs cursor-pointer transition-all ${statusStyle(s)} ${
                              s === t.status ? 'ring-1 ring-white/30' : 'opacity-60 hover:opacity-100'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs ${statusStyle(t.status)}`}>
                        {t.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => setEditingRow(editingRow === idx ? null : idx)}
                      className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {editingRow === idx ? 'Done' : 'Edit'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
          <p className="text-xs text-gray-500">Click Edit on any row to update the status</p>
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-xl transition-colors"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  isActive,
  onClick,
}: {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon =
  project.icon === 'building' ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Open shackle — rises from left body, curves right, end is free floating */}
      <path
        d="M5 8.5V6C5 4.067 6.567 2.5 8.5 2.5C10.433 2.5 12 4.067 12 6V5"
        stroke="#a78bfa"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left lock body (square) */}
      <rect x="2.5" y="9" width="8" height="6.5" rx="1.5" fill="#b055f7" />
      {/* Right card/document body (taller) */}
      <rect x="11" y="7.5" width="6.5" height="8.5" rx="1.5" fill="#b055f7" />
      {/* Two horizontal lines on the right card */}
      <rect x="12.5" y="10.2" width="3.5" height="1.3" rx="0.65" fill="#13131f" />
      <rect x="12.5" y="12.8" width="3.5" height="1.3" rx="0.65" fill="#13131f" />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="text-purple-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full text-left rounded-2xl border p-4
        transition-all duration-300 ease-out overflow-hidden

        ${
          isActive
            ? 'border-white/10'
            : 'border-white/10'
        }

        bg-[#13131f]
        hover:border-purple-500
      `}
    >
      {/* Hover Background Overlay */}
      <div
        className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-br from-purple-600/20 to-purple-900/20
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="
              w-9 h-9 rounded-lg flex items-center justify-center
              bg-purple-500/10
              border border-purple-500/20
              group-hover:bg-purple-500/20
              transition-all duration-300
            "
          >
            {Icon}
          </div>

          <div>
            <p className="text-sm font-semibold text-white leading-tight">
              {project.name}
            </p>
            <p className="text-xs text-gray-400 italic">
              {project.client}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="text-orange-400 ">⚠</span>
            {project.pendingTasks} Pending tasks
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="text-green-400">✓</span>
            {project.completedTasks} Tasks Completed
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span>ℹ</span> Showing today's progress
        </p>
      </div>
    </button>
  );
}

// ─── Project Detail ────────────────────────────────────────────────────────────
function ProjectDetail({
  project,
  onTaskSheet,
}: {
  project: Project;
  onTaskSheet: () => void;
}) {
  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-base font-semibold">{project.name}</span>
        </div>
        <button
          onClick={onTaskSheet}
          className="flex items-center gap-2 border border-purple-600 rounded-full px-4 py-1.5 text-sm text-white hover:bg-purple-600/20 transition-colors"
        >
          Task Sheet
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>

      {/* Project Info + Progress */}
      <div className="grid grid-cols-2 gap-4">
        {/* Project Info */}
        <div className="bg-[#0e0e1c] border border-white/5 rounded-2xl p-4">
          <p className="text-[12px] font-semibold tracking-widest text-[#9AA1AC] uppercase mb-3">Project Info</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-500 mt-0.5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <p className="text-[10px] text-gray-500">Client name</p>
                <p className="text-sm text-gray-200">Dr. Ghita Ouazzani Tnacheri</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-500 mt-0.5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-[10px] text-gray-500">Project Start Date</p>
                <p className="text-sm text-gray-200">{project.startDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Progress */}
      <div className="bg-[#0e0e1c] border border-white/5 rounded-2xl p-4">
  {/* Header */}
  <p className="text-[11px] font-bold tracking-widest text-[#9AA1AC] uppercase mb-4">
    Today's Progress
  </p>

  {/* Main row: left = % + bar, right = badges */}
  <div className="flex items-center gap-4">
    
    {/* Left: percentage + progress bar */}
    <div className="flex-1">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold text-purple-400">{project.progress}%</span>
        <span className="text-xs text-gray-500 italic">Completed</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full">
        <div
          className="h-full bg-purple-500 rounded-full transition-all"
          style={{ width: `${project.progress}%` }}
        />
      </div>
    </div>

    {/* Right: stacked badges */}
    <div className="flex flex-col gap-2 shrink-0">
      {/* Pending tasks — orange border box */}
      <div className="flex items-center gap-2 border border-orange-500/60 rounded-lg px-3 py-1.5 bg-transparent">
        {/* Orange filled circle with ! */}
        <span className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
          <span className="text-white font-black leading-none" style={{ fontSize: '9px' }}>!</span>
        </span>
        <span className="text-xs text-gray-300 whitespace-nowrap">
          {project.pendingTasks} Pending tasks
        </span>
      </div>

      {/* Tasks completed — green border box */}
      <div className="flex items-center gap-2 border border-green-500/60 rounded-lg px-3 py-1.5 bg-transparent">
        {/* Green checkbox */}
        <span className="w-4 h-4 rounded border border-green-500 flex items-center justify-center shrink-0">
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5l2.5 2.5 4.5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="text-xs text-gray-300 whitespace-nowrap">
          {project.completedTasks} Tasks Completed
        </span>
      </div>
    </div>

  </div>
</div>
      </div>

      {/* Further Client Info */}
      <div className="bg-[#0e0e1c] border border-white/5 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] font-semibold tracking-widest text-[#9AA1AC] uppercase">Further Client Information</p>
          <button className="text-gray-500 hover:text-gray-300 transition-colors">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-start gap-2">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-500 shrink-0 mt-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Phone</p>
              <p className="text-sm text-gray-200">{project.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-500 shrink-0 mt-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Email</p>
              <p className="text-sm text-gray-200">{project.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-500 shrink-0 mt-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">System requested</p>
              <p className="text-sm text-gray-200">{project.systemRequested}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-[#0e0e1c] border border-white/5 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] font-semibold tracking-widest text-[#9AA1AC] uppercase">Resources</p>
          <button className="text-gray-500 hover:text-gray-300 transition-colors">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {project.resources.map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${r.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                {r.initial}
              </div>
              <div>
                <p className="text-sm text-gray-200 leading-tight">{r.name}</p>
                <p className="text-xs text-gray-500">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Assigned */}
      <div className="bg-[#0e0e1c] border border-white/5 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] font-semibold tracking-widest text-[#9AA1AC] uppercase">Tasks Assigned</p>
          <div className="flex gap-1">
            <button className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 text-xs">‹</button>
            <button className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 text-xs">›</button>
          </div>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-gray-200 uppercase tracking-wide">
              <th className="text-left pb-2 font-medium">Date</th>
              <th className="text-left pb-2 font-medium">Tasks</th>
              <th className="text-left pb-2 font-medium">Resource</th>
              <th className="text-left pb-2 font-medium">Status</th>
              <th className="text-left pb-2 font-medium">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {project.tasks.map((t, idx) => (
              <tr key={idx}>
                <td className="py-2.5 text-gray-400">{t.date}</td>
                <td className="py-2.5 text-gray-300">{t.task}</td>
                <td className="py-2.5 text-gray-400">{t.resource}</td>
                <td className="py-2.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] ${statusStyle(t.status)}`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-2.5">
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function WorkflowsPage() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project>(projects[2]);
  const [showTaskSheet, setShowTaskSheet] = useState(false);
  

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-300 w-15 bg-gradient-to-r from-purple-600/5 via-purple-500/10 to-transparent blur-2xl" />
      <AdminSidebar activeTab="Workflows" />

      <div className="flex-1 flex flex-col overflow-auto border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Workflows" />
        

        {/* ── Main Content ── */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* Section: Select Projects */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-normal font-bold">Select Projects to Continue</h4>
              <button
                onClick={() => router.push('/pages/Admin-Dashboard/Workflows/new')}
                className="flex items-center gap-2 border border-purple-600 rounded-full px-4 py-2 text-sm text-white hover:bg-purple-600/20 transition-colors shadow-[0_0_12px_rgba(139,92,246,0.3)] "
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
          </svg>
                Add new project
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-5">
              Select the project to see the overall progress and upcoming tasks.
            </p>

            {/* Project Grid */}
            <div className="grid grid-cols-3 gap-3">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  isActive={selectedProject.id === p.id}
                  onClick={() => setSelectedProject(p)}
                />
              ))}
            </div>
          </div>

          {/* Section: Project Detail */}
          <ProjectDetail
            project={selectedProject}
            onTaskSheet={() => setShowTaskSheet(true)}
          />
        </main>
      </div>

      {/* Task Sheet Modal */}
      {showTaskSheet && (
        <TaskSheetModal
          project={selectedProject}
          onClose={() => setShowTaskSheet(false)}
        />
      )}
    </div>
  );
}