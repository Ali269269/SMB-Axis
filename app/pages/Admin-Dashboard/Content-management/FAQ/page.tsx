'use client';

import { useState, useRef, useEffect } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.';

const generateFAQs = (): FAQ[] =>
  Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli',
    answer: LOREM,
  }));

// ─── Add / Edit FAQ Modal ─────────────────────────────────────────────────────
function FAQModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: FAQ;
  onSave: (question: string, answer: string) => void;
  onClose: () => void;
}) {
  const [question, setQuestion] = useState(initial?.question ?? '');
  const [answer, setAnswer] = useState(initial?.answer ?? '');
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSave = () => {
    if (!question.trim()) return;
    onSave(question.trim(), answer.trim());
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-xl mx-4 bg-[#13131f] border border-purple-500/40 rounded-2xl shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h5 className="text-lg font-bold text-white">
            {initial ? 'Edit FAQ' : 'Add new FAQ'}
          </h5>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors text-sm"
          >
            ×
          </button>
        </div>

        {/* Question */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Question <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, 150))}
              placeholder="Type Question"
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors pr-14"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              {150 - question.length}
            </span>
          </div>
        </div>

        {/* Answer */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Answer</label>
          <div className="relative">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value.slice(0, 500))}
              placeholder="Type Answer"
              rows={5}
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-[12px] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors resize-none pr-14"
            />
            <span className="absolute right-3 top-3 text-xs text-gray-500">
              {500 - answer.length}
            </span>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={!question.trim()}
            className="flex items-center gap-2 bg-[#090916] border border-purple-900 text-white text-sm px-6 py-2.5 rounded-full hover:bg-purple-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-[0_0_14px_rgba(139,92,246,0.25)]"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Number badge ─────────────────────────────────────────────────────────────
function NumberBadge({ n }: { n: number }) {
  const label =
    n === 1 ? 'NUMBER 1' : n === 2 ? 'NUMBER 2' : n === 3 ? 'NUMBER 3' : `NUMBER ${n}`;
  return (
    <span className="bg-purple-600 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
      {label}
    </span>
  );
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FAQItem({
  faq,
  index,
  onEdit,
}: {
  faq: FAQ;
  index: number;
  onEdit: () => void;
}) {
  const [open, setOpen] = useState(true); // default open, matching Figma

  return (
    <div className="border border-purple-500/30 rounded-2xl bg-[#13131f] overflow-hidden">
      {/* Item header row */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <NumberBadge n={index + 1} />
        <button
          onClick={onEdit}
          className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-colors"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>

      {/* Question accordion trigger */}
      <div className="px-4 pb-2">
        <button
          onClick={() => setOpen((p) => !p)}
          className="w-full flex items-center justify-between bg-[#1e1e30] border border-white/8 rounded-md px-4 py-3 text-left hover:bg-[#252538] transition-colors"
        >
          <span className="text-sm font-semibold text-gray-200 flex-1 pr-4 leading-snug">
            {faq.question}
          </span>
          <svg
            width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Answer */}
      {open && (
        <div className="px-4 pb-4">
          <div className="bg-[#1e1e30] border border-white/8 rounded-md px-4 py-3">
            <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Per-page Select ──────────────────────────────────────────────────────────
function PerPageSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const options = [4, 8, 10, 20];
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
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 bg-[#1a1a2e] border border-white/15 rounded-lg px-3 py-1.5 text-sm text-white hover:border-purple-500/40 transition-colors"
      >
        {String(value).padStart(2, '0')}
        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-full mb-1 left-0 w-20 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${o === value ? 'bg-purple-600/20 text-white' : 'text-gray-300 hover:bg-white/5'}`}
            >
              {String(o).padStart(2, '0')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(generateFAQs());
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  const totalPages = Math.max(1, Math.ceil(faqs.length / perPage));
  const paginated = faqs.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleAddFAQ = (question: string, answer: string) => {
    const newFAQ: FAQ = { id: Date.now(), question, answer };
    setFaqs((prev) => [newFAQ, ...prev]);
    setCurrentPage(1);
  };

  const handleEditFAQ = (question: string, answer: string) => {
    if (!editingFAQ) return;
    setFaqs((prev) =>
      prev.map((f) => (f.id === editingFAQ.id ? { ...f, question, answer } : f))
    );
  };

  const openEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFAQ(null);
  };

  const handlePerPageChange = (v: number) => {
    setPerPage(v);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="content-faqs" />

      <div className="flex-1 flex flex-col overflow-hidden border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Content Management" />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden px-6 py-5">
          {/* Page title + Add button */}
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-xl font-bold text-white">FAQ's</h4>
            <button
              onClick={() => { setEditingFAQ(null); setShowModal(true); }}
              className="flex items-center gap-2 bg-[#0a0a1b] border border-purple-500/60 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.2)]"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Add another FAQ
            </button>
          </div>

          {/* FAQ card container */}
          <div className="flex-1 overflow-y-auto border border-white/8 rounded-2xl bg-[#0f0f1e]">
            {/* "ALL FAQ'S" label */}
            <div className="px-5 py-3">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">All FAQ's</p>
            </div>

            {/* FAQ list */}
            <div className="p-4 space-y-4">
              {paginated.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-3 opacity-30" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">No FAQs yet. Add your first one!</p>
                </div>
              ) : (
                paginated.map((faq, i) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    index={(currentPage - 1) * perPage + i}
                    onEdit={() => openEdit(faq)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Pagination footer */}
          <div className="flex items-center justify-between pt-4 pb-1">
            {/* Showing per page */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>Showing per Page</span>
              <PerPageSelect value={perPage} onChange={handlePerPageChange} />
            </div>

            {/* Page controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
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
                className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <FAQModal
          initial={editingFAQ ?? undefined}
          onSave={editingFAQ ? handleEditFAQ : handleAddFAQ}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
