'use client';

import { useState, useRef, useEffect } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Subscriber {
  id: number;
  email: string;
  subscribed: string;
  source: 'Website' | 'Social Media' | 'Landing Page';
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ALL_SUBSCRIBERS: Subscriber[] = [
  { id: 1,  email: 'simo@gmail.com',        subscribed: '15-12-2025', source: 'Website'      },
  { id: 2,  email: 'tom@gmail.com',         subscribed: '15-12-2025', source: 'Social Media'  },
  { id: 3,  email: 'zain@gmail.com',        subscribed: '15-12-2025', source: 'Landing Page'  },
  { id: 4,  email: 'ali@gmail.com',         subscribed: '15-12-2025', source: 'Website'       },
  { id: 5,  email: 'june@gmail.com',        subscribed: '15-12-2025', source: 'Website'       },
  { id: 6,  email: 'henry@gmail.com',       subscribed: '15-12-2025', source: 'Website'       },
  { id: 7,  email: 'alice@example.com',     subscribed: '15-12-2025', source: 'Website'       },
  { id: 8,  email: 'john.doe@yahoo.com',    subscribed: '15-12-2025', source: 'Website'       },
  { id: 9,  email: 'zunik@outlook.com',     subscribed: '15-12-2025', source: 'Website'       },
  { id: 10, email: 'elmo@outlook.com',      subscribed: '15-12-2025', source: 'Landing Page'  },
  { id: 11, email: 'beena@outlook.com',     subscribed: '15-12-2025', source: 'Social Media'  },
  { id: 12, email: 'emma123@outlook.com',   subscribed: '15-12-2025', source: 'Social Media'  },
  { id: 13, email: 'sara@gmail.com',        subscribed: '16-12-2025', source: 'Website'       },
  { id: 14, email: 'liam@gmail.com',        subscribed: '16-12-2025', source: 'Landing Page'  },
  { id: 15, email: 'mia@outlook.com',       subscribed: '16-12-2025', source: 'Social Media'  },
  { id: 16, email: 'noah@example.com',      subscribed: '17-12-2025', source: 'Website'       },
  { id: 17, email: 'ella@gmail.com',        subscribed: '17-12-2025', source: 'Landing Page'  },
  { id: 18, email: 'ryan@yahoo.com',        subscribed: '17-12-2025', source: 'Website'       },
  { id: 19, email: 'chloe@outlook.com',     subscribed: '18-12-2025', source: 'Social Media'  },
  { id: 20, email: 'jake@gmail.com',        subscribed: '18-12-2025', source: 'Website'       },
  { id: 21, email: 'olivia@gmail.com',      subscribed: '18-12-2025', source: 'Landing Page'  },
  { id: 22, email: 'ethan@outlook.com',     subscribed: '19-12-2025', source: 'Website'       },
  { id: 23, email: 'ava@example.com',       subscribed: '19-12-2025', source: 'Social Media'  },
  { id: 24, email: 'mason@gmail.com',       subscribed: '19-12-2025', source: 'Website'       },
  { id: 25, email: 'sophia@yahoo.com',      subscribed: '20-12-2025', source: 'Landing Page'  },
  { id: 26, email: 'james@gmail.com',       subscribed: '20-12-2025', source: 'Website'       },
  { id: 27, email: 'isabella@outlook.com',  subscribed: '20-12-2025', source: 'Social Media'  },
  { id: 28, email: 'logan@gmail.com',       subscribed: '21-12-2025', source: 'Website'       },
  { id: 29, email: 'amelia@example.com',    subscribed: '21-12-2025', source: 'Landing Page'  },
  { id: 30, email: 'lucas@gmail.com',       subscribed: '21-12-2025', source: 'Website'       },
];

// ─── Avatar initial from email ────────────────────────────────────────────────
function getInitial(email: string) {
  return email[0].toUpperCase();
}

// ─── Subscriber Detail Modal ──────────────────────────────────────────────────
function SubscriberModal({
  subscriber,
  onClose,
}: {
  subscriber: Subscriber;
  onClose: () => void;
}) {
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
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-base leading-none"
        >
          ✕
        </button>

        <div className="p-6">
          {/* Title */}
          <h5 className="text-white font-bold text-lg leading-tight">Email Subscribers Details</h5>
          <p className="text-gray-400 text-xs mt-0.5 mb-5">Full details and information.</p>

          {/* Avatar + email */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {getInitial(subscriber.email)}
            </div>
            <p className="text-gray-200 text-sm">{subscriber.email}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-5" />

          {/* Subscribed */}
          <div className="mb-4">
            <p className="text-gray-400 text-xs mb-1">Subscribed</p>
            <p className="text-white text-sm font-medium">{subscriber.subscribed}</p>
          </div>

          {/* Source */}
          <div>
            <p className="text-gray-400 text-xs mb-1">Source</p>
            <p className="text-white text-sm font-medium">{subscriber.source}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Action Dropdown ──────────────────────────────────────────────────────────
function ActionDropdown({
  onView,
  onDelete,
}: {
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
export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(ALL_SUBSCRIBERS);
  const [search, setSearch]           = useState('');
  const [perPage, setPerPage]         = useState(12);
  const [page, setPage]               = useState(1);
  const [viewSub, setViewSub]         = useState<Subscriber | null>(null);

  // Filter by email, source or date
  const filtered = subscribers.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.email.toLowerCase().includes(q) ||
      s.source.toLowerCase().includes(q) ||
      s.subscribed.includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id: number) =>
    setSubscribers((prev) => prev.filter((s) => s.id !== id));

  // reset page when search / perPage changes
  useEffect(() => { setPage(1); }, [search, perPage]);

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-40 bg-gradient-to-r from-purple-600/5 via-purple-500/10 to-transparent blur-2xl" />
      <AdminSidebar activeTab="User Management" />

      <div className="flex-1 flex flex-col overflow-auto border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="User Management" />

        <main className="flex-1 px-5 py-16 flex flex-col gap-4">

          {/* ── Section title ── */}
          <h4 className="text-white text-xl font-semibold">Newsletter</h4>

          {/* ── Search + Add button ── */}
          <div className="flex items-center justify-between gap-4">
            {/* Search bar */}
            <div className="relative flex-1 max-w-lg mt-4">
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
                className="w-full bg-[#12121e] border border-white/10 rounded-full  pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            {/* Add button */}
            
          </div>

          {/* ── Table card ── */}
          <div className="border border-white/10 rounded-2xl bg-[#12121e] overflow-hidden flex-1">
            {/* Details label */}
            <div className="px-5 py-3">
              <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">Details</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left py-3 px-5 text-gray-200 font-medium w-24">Sr. No.</th>
                    <th className="text-left py-3 px-5 text-gray-200 font-medium">Name &amp; Email</th>
                    <th className="text-center py-3 px-5 text-gray-200 font-medium">Subscribed</th>
                    <th className="text-center py-3 px-5 text-gray-200 font-medium">Source</th>
                    <th className="text-center py-3 px-5 text-gray-200 font-medium w-24">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-16 text-center text-gray-500 text-sm">
                        No subscribers found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((sub, i) => (
                      <tr
                        key={sub.id}
                        className=""
                      >
                        {/* Sr No */}
                        <td className="py-4 px-5 text-gray-400 text-sm text-center">
                          {String((page - 1) * perPage + i + 1).padStart(2, '0')}
                        </td>

                        {/* Email (Figma shows only email in this column, no separate name) */}
                        <td className="py-4 px-5 text-gray-300 text-sm">
                          {sub.email}
                        </td>

                        {/* Subscribed date */}
                        <td className="py-4 px-5 text-gray-300 text-sm text-center whitespace-nowrap">
                          {sub.subscribed}
                        </td>

                        {/* Source */}
                        <td className="py-4 px-5 text-gray-300 text-sm text-center">
                          {sub.source}
                        </td>

                        {/* Action */}
                        <td className="py-4 px-5 text-center">
                          <ActionDropdown
                            onView={() => setViewSub(sub)}
                            onDelete={() => handleDelete(sub.id)}
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

            {/* Page navigation */}
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

      {/* Subscriber Detail Modal */}
      {viewSub && (
        <SubscriberModal subscriber={viewSub} onClose={() => setViewSub(null)} />
      )}
    </div>
  );
}
