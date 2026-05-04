'use client';

import { useState, useRef, useEffect } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  solutions: string;
  questions: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ALL_LEADS: Lead[] = [
  { id: 1,  name: 'Simo',  email: 'simo@gmail.com',          phone: '+971 4 123 4567', solutions: 'Identity & Presence System',   questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 2,  name: 'Tom',   email: 'tom@gmail.com',           phone: '+971 4 123 4567', solutions: 'Security & Governance',        questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 3,  name: 'Zain',  email: 'zain@gmail.com',          phone: '+971 4 123 4567', solutions: 'Demand Generation System',     questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 4,  name: 'Ali',   email: 'ali@gmail.com',           phone: '+971 4 123 4567', solutions: 'Enablement & Training',        questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 5,  name: 'June',  email: 'june@gmail.com',          phone: '+971 4 123 4567', solutions: 'FinTech & Blockchain Module',  questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 6,  name: 'Henry', email: 'henry@gmail.com',         phone: '+971 4 123 4567', solutions: 'AI & Data Layer',              questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 7,  name: 'Alice', email: 'alice@example.com',       phone: '+971 4 123 4567', solutions: 'Broker Digital Presence',      questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 8,  name: 'John',  email: 'john.doe@yahoo.com',      phone: '+971 4 123 4567', solutions: 'Paid Lead Engine',             questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 9,  name: 'Zuni',  email: 'zunik@outlook.com',       phone: '+971 4 123 4567', solutions: 'Lead Capture & Routing',       questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 10, name: 'Elmo',  email: 'elmo@outlook.com',        phone: '+971 4 123 4567', solutions: 'Broker Trust & Security',      questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 11, name: 'Beena', email: 'beena@outlook.com',       phone: '+971 4 123 4567', solutions: 'AI Follow-Up & Qualification', questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 12, name: 'Emma',  email: 'emma123@outlook.com',     phone: '+971 4 123 4567', solutions: 'Broker Trust & Security',      questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 13, name: 'Sara',  email: 'sara@gmail.com',          phone: '+971 4 123 4567', solutions: 'Identity & Presence System',   questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 14, name: 'Liam',  email: 'liam@gmail.com',          phone: '+971 4 123 4567', solutions: 'Security & Governance',        questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 15, name: 'Mia',   email: 'mia@outlook.com',         phone: '+971 4 123 4567', solutions: 'Demand Generation System',     questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 16, name: 'Noah',  email: 'noah@example.com',        phone: '+971 4 123 4567', solutions: 'Enablement & Training',        questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 17, name: 'Ella',  email: 'ella@gmail.com',          phone: '+971 4 123 4567', solutions: 'FinTech & Blockchain Module',  questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 18, name: 'Ryan',  email: 'ryan@yahoo.com',          phone: '+971 4 123 4567', solutions: 'AI & Data Layer',              questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 19, name: 'Chloe', email: 'chloe@outlook.com',       phone: '+971 4 123 4567', solutions: 'Broker Digital Presence',      questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
  { id: 20, name: 'Jake',  email: 'jake@gmail.com',          phone: '+971 4 123 4567', solutions: 'Paid Lead Engine',             questions: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.' },
];

// ─── Avatar colour by initial ────────────────────────────────────────────────
const AVATAR_COLORS: Record<string, string> = {
  A: 'bg-purple-500', B: 'bg-blue-500',  C: 'bg-pink-500',
  D: 'bg-teal-500',   E: 'bg-green-500', F: 'bg-orange-500',
  G: 'bg-red-500',    H: 'bg-indigo-500',I: 'bg-yellow-500',
  J: 'bg-cyan-500',   K: 'bg-violet-500',L: 'bg-emerald-500',
  M: 'bg-rose-500',   N: 'bg-sky-500',   O: 'bg-amber-500',
  P: 'bg-lime-500',   Q: 'bg-fuchsia-500',R:'bg-purple-600',
  S: 'bg-blue-600',   T: 'bg-purple-500',U: 'bg-teal-600',
  V: 'bg-green-600',  W: 'bg-pink-600',  X: 'bg-red-600',
  Y: 'bg-orange-600', Z: 'bg-indigo-600',
};
function avatarColor(name: string) {
  return AVATAR_COLORS[name[0].toUpperCase()] ?? 'bg-purple-500';
}

// ─── Lead Detail Modal ────────────────────────────────────────────────────────
function LeadDetailModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  // close on outside click
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="relative w-full max-w-sm mx-4 bg-[#16162a] border border-purple-500/40 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-lg leading-none"
        >
          ✕
        </button>

        <div className="p-6">
          {/* Title */}
          <h5 className="text-white font-bold text-lg leading-tight">Leads Detail</h5>
          <p className="text-gray-400 text-xs mt-0.5 mb-5">Full details and information.</p>

          {/* Divider */}
          <div className="border-t border-white/10 mb-5" />

          {/* Avatar + name + email */}
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-12 h-12 rounded-full ${avatarColor(lead.name)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
              {lead.name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{lead.name}</p>
              <p className="text-gray-400 text-xs">{lead.email}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-5" />

          {/* Phone */}
          <div className="mb-4">
            <p className="text-gray-400 text-xs mb-1">Phone</p>
            <p className="text-white text-sm font-medium">{lead.phone}</p>
          </div>

          {/* Solutions */}
          <div className="mb-4">
            <p className="text-gray-400 text-xs mb-1">Solutions</p>
            <p className="text-white text-sm font-medium">{lead.solutions}</p>
          </div>

          {/* Questions */}
          <div>
            <p className="text-gray-400 text-xs mb-1">Questions</p>
            <p className="text-gray-200 text-sm leading-relaxed">{lead.questions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Action Dropdown ──────────────────────────────────────────────────────────
function ActionDropdown({
  lead,
  onView,
  onDelete,
}: {
  lead: Lead;
  onView: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative flex justify-center">
      <button
        onClick={() => setOpen((p) => !p)}
        className="text-gray-400 hover:text-white transition-colors p-1"
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5"  r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-7 z-30 w-28 bg-[#1a1a30] border border-white/10 rounded-[15px] shadow-xl overflow-hidden">
          <button
            onClick={() => { onView(); setOpen(false); }}
            className="w-full text-left px-4 py-2.5 text-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors font-medium"
          >
            View
          </button>
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-white/5 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LeadsContactsPage() {
  const [leads, setLeads] = useState<Lead[]>(ALL_LEADS);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [viewLead, setViewLead] = useState<Lead | null>(null);

  // Filter
  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.phone.includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id: number) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // reset page on search/perPage change
  useEffect(() => { setPage(1); }, [search, perPage]);

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-40 bg-gradient-to-r from-purple-600/5 via-purple-500/10 to-transparent blur-2xl" />
      <AdminSidebar activeTab="User Management" />

      <div className="flex-1 flex flex-col overflow-auto border border-white/10 ml-2 rounded-[25px]">
        <AdminHeader title="User Management" />

        <main className="flex-1 px-5 py-16 flex flex-col gap-4">

          {/* ── Section title + search + add button ── */}
          <div>
            <h5 className="text-white text-xl font-semibold mb-8">Leads &amp; Contacts</h5>

            <div className="flex items-center justify-between gap-6">
              {/* Search */}
              <div className="relative flex-1 max-w-lg">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                  width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Email, Name or Date"
                  className="w-full bg-[#12121e] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              {/* Add button */}
             
            </div>
          </div>

          {/* ── Table card ── */}
          <div className="border border-white/10 rounded-2xl bg-[#12121e] overflow-hidden flex-1">
            {/* Table header label */}
            <div className="px-5 py-3">
              <span className="text-xs font-bold tracking-widest text-gray-100 uppercase">Details</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left py-3 px-4 text-gray-200 font-medium w-16">Sr. No.</th>
                    <th className="text-left py-3 px-4 text-gray-200 font-medium">Name &amp; Email</th>
                    <th className="text-center py-3 px-4 text-gray-200 font-medium">Phone</th>
                    <th className="text-center py-3 px-4 text-gray-200 font-medium">Solutions</th>
                    <th className="text-left py-3 px-4 text-gray-200 font-medium">Questions</th>
                    <th className="text-center py-3 px-4 text-gray-200 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-gray-500 text-sm">
                        No leads found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((lead, i) => (
                      <tr
                        key={lead.id}
                        className=""
                      >
                        {/* Sr No */}
                        <td className="py-3.5 px-4 text-gray-400 text-center text-xs">
                          {String((page - 1) * perPage + i + 1).padStart(2, '0')}
                        </td>

                        {/* Name & Email */}
                        <td className="py-3.5 px-4">
                          <p className="text-white font-semibold text-sm leading-tight">{lead.name}</p>
                          <p className="text-gray-400 text-xs">{lead.email}</p>
                        </td>

                        {/* Phone */}
                        <td className="py-3.5 px-4 text-gray-300 text-sm text-center whitespace-nowrap">
                          {lead.phone}
                        </td>

                        {/* Solutions */}
                        <td className="py-3.5 px-4 text-gray-300 text-sm text-center max-w-[160px]">
                          <span className="leading-snug">{lead.solutions}</span>
                        </td>

                        {/* Questions — truncated */}
                        <td className="py-3.5 px-4 text-gray-400 text-sm max-w-[240px]">
                          <span className="line-clamp-1">{lead.questions}</span>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-center">
                          <ActionDropdown
                            lead={lead}
                            onView={() => setViewLead(lead)}
                            onDelete={() => handleDelete(lead.id)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Bottom bar: per page + pagination ── */}
          <div className="flex items-center justify-between pt-1">
            {/* Showing per page */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>Showing per Page</span>
              <div className="relative">
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="appearance-none bg-[#1a1a30] border border-white/15 text-white text-sm rounded-lg px-3 py-1.5 pr-7 outline-none cursor-pointer focus:border-purple-500/50 transition-colors"
                >
                  {[6, 12, 24, 48].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                  width="10" height="10" viewBox="0 0 12 12" fill="currentColor"
                >
                  <path d="M6 8L1 3h10z" />
                </svg>
              </div>
            </div>

            {/* Page nav */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <span className="text-sm text-gray-300 min-w-[60px] text-center">
                {page} of {String(totalPages).padStart(2, '0')}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Lead Detail Modal */}
      {viewLead && (
        <LeadDetailModal lead={viewLead} onClose={() => setViewLead(null)} />
      )}
    </div>
  );
}
