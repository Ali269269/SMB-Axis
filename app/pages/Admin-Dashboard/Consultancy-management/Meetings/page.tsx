'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
interface MeetingNote {
  id: number;
  title: string;
  client: string;
  company: string;
  date: string;
  time: string;
  attendees: number;
  notes: string;
}

interface NoteFormData {
  client: string;
  subject: string;
  date: string;
  time: string;
  attendees: string;
  agenda: string;
  discussionNotes: string;
  nextSteps: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_NOTES: MeetingNote[] = [
  {
    id: 1,
    title: 'SEO Strategy Review',
    client: 'Paz',
    company: 'PCLD',
    date: 'Mar 11,26',
    time: '2:00 pm',
    attendees: 3,
    notes: 'Organic traffic up 22% from last quarter. Need to focus on local SEO. Blog content performing well. Discussed Google Business Profile optimization.',
  },
  {
    id: 2,
    title: 'SEO Strategy Review',
    client: 'Paz',
    company: 'PCLD',
    date: 'Mar 11,26',
    time: '2:00 pm',
    attendees: 3,
    notes: 'Organic traffic up 22% from last quarter. Need to focus on local SEO. Blog content performing well. Discussed Google Business Profile optimization.',
  },
  {
    id: 3,
    title: 'SEO Strategy Review',
    client: 'Paz',
    company: 'PCLD',
    date: 'Mar 11,26',
    time: '2:00 pm',
    attendees: 3,
    notes: 'Organic traffic up 22% from last quarter. Need to focus on local SEO. Blog content performing well. Discussed Google Business Profile optimization.',
  },
  {
    id: 4,
    title: 'Brand Identity Workshop',
    client: 'Alex',
    company: 'PCLD',
    date: 'Apr 02,26',
    time: '10:00 am',
    attendees: 5,
    notes: 'Reviewed mood boards and typography choices. Client prefers minimalist approach. Finalized primary colour palette. Next: logo variations by Friday.',
  },
  {
    id: 5,
    title: 'Brand Identity Workshop',
    client: 'Alex',
    company: 'PCLD',
    date: 'Apr 02,26',
    time: '10:00 am',
    attendees: 5,
    notes: 'Reviewed mood boards and typography choices. Client prefers minimalist approach. Finalized primary colour palette. Next: logo variations by Friday.',
  },
  {
    id: 6,
    title: 'Brand Identity Workshop',
    client: 'Alex',
    company: 'PCLD',
    date: 'Apr 02,26',
    time: '10:00 am',
    attendees: 5,
    notes: 'Reviewed mood boards and typography choices. Client prefers minimalist approach. Finalized primary colour palette. Next: logo variations by Friday.',
  },
];

const CLIENTS = ['All Clients', 'Paz', 'Alex', 'Jordan', 'Taylor'];
const NOTES_PER_PAGE = 3;

// ─── Icons ────────────────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-purple-400">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-purple-400">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const AttendeesIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-purple-400">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-white">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UsersIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-gray-400">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-white">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

// ─── Meeting Note Card ────────────────────────────────────────────────────────
function NoteCard({ note }: { note: MeetingNote }) {
  return (
    <div className="relative bg-[#13131f] border border-purple-600/40 rounded-2xl p-5 hover:border-purple-500/60 transition-all">
      {/* Arrow button */}
      <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
        <ArrowUpRightIcon />
      </button>

      {/* Title + company badge */}
      <div className="flex items-center gap-3 mb-1 pr-10">
        <h5 className="text-1xl font-bold text-white">{note.title}</h5>
        <span className="bg-[#2a2a3d] text-gray-300 text-xs font-medium px-3 py-1 rounded-full">
          {note.company}
        </span>
      </div>

      {/* Client */}
      <p className="text-sm text-gray-400 mb-3">Client: {note.client}</p>

      {/* Meta row */}
      <div className="flex items-center gap-5 mb-4">
        <div className="flex items-center gap-1.5">
          <CalendarIcon />
          <span className="text-sm text-gray-300">{note.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <span className="text-sm text-gray-300">{note.time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <AttendeesIcon />
          <span className="text-sm text-gray-300">{note.attendees} Atendees</span>
        </div>
      </div>

      {/* Notes text */}
      <div className="bg-[#0e0e11] rounded-xl px-4 py-3">
        <p className="text-sm text-gray-300 leading-relaxed">{note.notes}</p>
      </div>
    </div>
  );
}

// ─── Add Notes Form ───────────────────────────────────────────────────────────
function AddNotesForm({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: (data: NoteFormData) => void;
}) {
  const [form, setForm] = useState<NoteFormData>({
    client: '',
    subject: '',
    date: '',
    time: '',
    attendees: '',
    agenda: '',
    discussionNotes: '',
    nextSteps: '',
  });

  const [clientOpen, setClientOpen] = useState(false);
  const clients = ['Paz', 'Alex', 'Jordan', 'Taylor'];

  const set = (key: keyof NoteFormData, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = () => {
    if (!form.client || !form.subject || !form.date || !form.time) return;
    onSave(form);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* ── Top bar ── */}
     <h4 className="ml-10 mt-10">Minute of Meeting</h4>
      <div className="flex items-center justify-between px-18 py-4 ">
        
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-[#1a1a2e] border border-white/15 text-white text-sm px-4 py-2 rounded-full hover:border-white/30 transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Go Back
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#090911] border border-purple-500/50 text-white text-sm px-5 py-2 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.25)]"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save
        </button>
      </div>

      {/* ── Form card ── */}
      <div className="flex-1 overflow-y-auto px-18 py-0">
        <div className="border border-purple-500/30 rounded-2xl bg-[#0f0f1e] p-7 space-y-6">
          <h4 className="text-xl font-bold text-white">New meeting notes</h4>

          {/* Row 1: Select Clients | Subject | Date */}
          <div className="grid grid-cols-3 gap-4">
            {/* Select Clients */}
            <div className="relative">
              <label className="block text-xs text-gray-300 mb-2">
                Select Clients <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => setClientOpen((p) => !p)}
                className="w-full flex items-center justify-between bg-[#0c0c1a] border border-white/10 rounded-full px-4 py-2.5 text-sm text-left focus:outline-none hover:border-white/20 transition-colors"
              >
                <span className={form.client ? 'text-white' : 'text-gray-500'}>
                  {form.client || ''}
                </span>
                <ChevronDownIcon />
              </button>
              {clientOpen && (
                <div className="absolute z-20 mt-1 w-full bg-[#1a1a2e] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                  {clients.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => { set('client', c); setClientOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${form.client === c ? 'bg-purple-600/20 text-white' : 'text-gray-300 hover:bg-white/5'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs text-gray-300 mb-2">
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => set('subject', e.target.value)}
                className="w-full bg-[#0c0c1a] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs text-gray-300 mb-2">
                Date <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                  className="w-full bg-[#0c0c1a] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors appearance-none [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Time | Attendees */}
        <div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block text-xs text-gray-300 mb-2">
      Time <span className="text-red-400">*</span>
    </label>

    <div className="relative">
      <input
        id="timeInput"
        type="time"
        value={form.time}
        onChange={(e) => set('time', e.target.value)}
        className="w-full bg-[#0c0c1a] border border-white/10 rounded-full pl-4 pr-10 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors [color-scheme:dark] appearance-none"
      />

      <button
        type="button"
        onClick={() => {
  const el = document.getElementById('timeInput');
  if (el && 'showPicker' in el) {
    // @ts-ignore
    el.showPicker();
  }
  el?.focus();
}}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      </button>
    </div>
  </div>

  
            {/* Attendees */}
            <div>
              <label className="block text-xs text-gray-300 mb-2">
                Attendees <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.attendees}
                onChange={(e) => set('attendees', e.target.value)}
                placeholder="Comma Separated names"
                className="w-full bg-[#0c0c1a] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Agenda */}
          <div>
            <label className="block text-xs text-gray-300 mb-2">Agenda</label>
            <input
              type="text"
              value={form.agenda}
              onChange={(e) => set('agenda', e.target.value)}
              placeholder="Meeting agenda items"
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          {/* Discussion Notes */}
          <div>
            <label className="block text-xs text-gray-300 mb-2">Discussion Notes</label>
            <textarea
              value={form.discussionNotes}
              onChange={(e) => set('discussionNotes', e.target.value)}
              placeholder="Key Discussion Points"
              rows={5}
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors resize-none"
            />
          </div>

          {/* Next Steps */}
          <div>
            <label className="block text-xs text-gray-300 mb-2">Next Steps</label>
            <input
              type="text"
              value={form.nextSteps}
              onChange={(e) => set('nextSteps', e.target.value)}
              placeholder="Follow-up Plans"
              className="w-[600px] bg-[#0c0c1a] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MeetingsPage() {
  const [notes, setNotes] = useState<MeetingNote[]>(INITIAL_NOTES);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [clientDropOpen, setClientDropOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
  const filtered = notes.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.client.toLowerCase().includes(search.toLowerCase());
    const matchClient = clientFilter === 'All Clients' || n.client === clientFilter;
    return matchSearch && matchClient;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / NOTES_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * NOTES_PER_PAGE,
    currentPage * NOTES_PER_PAGE,
  );

  const handleSave = (data: NoteFormData) => {
    const attendeeCount = data.attendees.split(',').filter(Boolean).length || 1;
    const newNote: MeetingNote = {
      id: Date.now(),
      title: data.subject,
      client: data.client,
      company: 'PCLD',
      date: data.date,
      time: data.time,
      attendees: attendeeCount,
      notes: data.discussionNotes || data.agenda || data.nextSteps || '',
    };
    setNotes((prev) => [newNote, ...prev]);
    setCurrentPage(1);
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="consultancy-minutes" />

      <div className="flex-1 flex flex-col overflow-auto border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Consultancy Management" />

        {showForm ? (
          <AddNotesForm onBack={() => setShowForm(false)} onSave={handleSave} />
        ) : (
          <main className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

            {/* ── Page title ── */}
            <h5 className="text-xl font-bold text-white">Minutes of Meeting</h5>

            {/* ── Filters + Add Notes ── */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex items-center gap-2 bg-transparent border border-white/15 rounded-full px-4 py-2.5 w-56">
                <SearchIcon />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  placeholder="Search Appointments"
                  className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"
                />
              </div>

              {/* Client filter dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setClientDropOpen((p) => !p)}
                  className="flex items-center gap-2 bg-transparent border border-white/15 rounded-full px-4 py-2.5 text-sm text-gray-300 hover:border-white/25 transition-colors"
                >
                  <UsersIcon />
                  <span>{clientFilter}</span>
                  <ChevronDownIcon />
                </button>
                {clientDropOpen && (
                  <div className="absolute z-20 mt-1 w-44 bg-[#1a1a2e] border border-white/10 rounded-[15px] shadow-xl overflow-hidden">
                    {CLIENTS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => { setClientFilter(c); setClientDropOpen(false); setCurrentPage(1); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${clientFilter === c ? 'bg-purple-600/20 text-white' : 'text-gray-300 hover:bg-purple-500/5'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Add Notes button */}
              <button
                onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 border border-purple-600 rounded-full px-4 py-2 text-sm text-white hover:bg-purple-600/20 transition-colors shadow-[0_0_12px_rgba(139,92,246,0.3)] "
              >
                <PlusCircleIcon />
                Add Notes
              </button>
            </div>

            {/* ── Cards list ── */}
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 opacity-30" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm">No meeting notes found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {paginated.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-5 pt-4 pb-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full bg-[#1e1e35] hover:bg-purple-600/40 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm text-gray-300">
                  {currentPage} of {String(totalPages).padStart(2, '0')}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-full bg-[#1e1e35] hover:bg-purple-600/40 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
