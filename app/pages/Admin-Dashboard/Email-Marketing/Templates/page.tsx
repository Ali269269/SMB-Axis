'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
type TemplateCategory = 'Promotional' | 'Newsletter' | 'Transactional' | 'Drip';

interface EmailTemplate {
  id: number;
  title: string;
  category: TemplateCategory;
  subject: string;
  content: string;
  createdAt: string;
  usedTimes: number;
  lastUsed: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────
const ALL_TEMPLATES: EmailTemplate[] = [
  { id: 1,  title: 'Welcome New Subscriber', category: 'Promotional',   subject: 'Welcome to SMB Axis! 🎉', content: 'Hello {{first_name}},\n\nWelcome aboard! We\'re thrilled to have you join the SMB Axis community...', createdAt: '2026-03-25', usedTimes: 28, lastUsed: '2026-03-25' },
  { id: 2,  title: 'Welcome New Subscriber', category: 'Newsletter',     subject: 'Welcome to SMB Axis! 🎉', content: 'Hello {{first_name}},\n\nWelcome aboard! We\'re thrilled to have you join the SMB Axis community...', createdAt: '2026-03-25', usedTimes: 28, lastUsed: '2026-03-25' },
  { id: 3,  title: 'Welcome New Subscriber', category: 'Transactional',  subject: 'Today is the day to enjoy free consultation...', content: 'Hello {{first_name}},\n\nWelcome aboard! We\'re thrilled to have you join the SMB Axis community...', createdAt: '2026-03-25', usedTimes: 28, lastUsed: '2026-03-25' },
  { id: 4,  title: 'Welcome New Subscriber', category: 'Drip',           subject: 'Welcome to SMB Axis! 🎉', content: 'Hello {{first_name}},\n\nWelcome aboard! We\'re thrilled to have you join the SMB Axis community...', createdAt: '2026-03-25', usedTimes: 28, lastUsed: '2026-03-25' },
  { id: 5,  title: 'Summer Sale Promo',      category: 'Promotional',   subject: 'Big summer sale is here!', content: 'Hi {{first_name}},\n\nOur biggest sale of the year is finally here. Don\'t miss out...', createdAt: '2026-03-20', usedTimes: 14, lastUsed: '2026-03-22' },
  { id: 6,  title: 'Monthly Newsletter',     category: 'Newsletter',     subject: 'Your April digest is ready', content: 'Hi {{first_name}},\n\nHere is everything that happened this month at SMB Axis...', createdAt: '2026-03-18', usedTimes: 10, lastUsed: '2026-03-20' },
  { id: 7,  title: 'Order Confirmation',     category: 'Transactional',  subject: 'Your order has been confirmed', content: 'Hi {{first_name}},\n\nThank you for your order! Here are the details...', createdAt: '2026-03-15', usedTimes: 42, lastUsed: '2026-03-25' },
  { id: 8,  title: 'Drip Sequence Day 1',    category: 'Drip',           subject: 'Day 1: Getting started with SMB Axis', content: 'Hi {{first_name}},\n\nWelcome! Here is what you can do on day one...', createdAt: '2026-03-10', usedTimes: 7,  lastUsed: '2026-03-15' },
  { id: 9,  title: 'Re-engagement',          category: 'Promotional',   subject: 'We miss you, {{first_name}}!', content: 'Hi {{first_name}},\n\nWe noticed you haven\'t been around lately...', createdAt: '2026-03-05', usedTimes: 5,  lastUsed: '2026-03-10' },
  { id: 10, title: 'Product Update',         category: 'Newsletter',     subject: 'Exciting new features just dropped', content: 'Hi {{first_name}},\n\nWe\'ve been busy building features you asked for...', createdAt: '2026-03-01', usedTimes: 19, lastUsed: '2026-03-05' },
];

const PER_PAGE = 4;

const CATEGORY_COLORS: Record<TemplateCategory, string> = {
  Promotional:  'border-gray-500 text-gray-300',
  Newsletter:   'border-gray-500 text-gray-300',
  Transactional:'border-gray-500 text-gray-300',
  Drip:         'border-gray-500 text-gray-300',
};

// ─── View Template Modal ──────────────────────────────────────────────────────
function ViewTemplateModal({
  template,
  onClose,
  onUse,
}: {
  template: EmailTemplate;
  onClose: () => void;
  onUse: (t: EmailTemplate) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-[#12121f] border border-white/10 rounded-2xl w-full max-w-md mx-4 p-7">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg leading-none">✕</button>

        <h2 className="text-2xl font-bold text-white mb-3">{template.title}</h2>

        {/* Category badge */}
        <span className={`inline-block text-xs border rounded px-2 py-0.5 mb-4 ${CATEGORY_COLORS[template.category]}`}>
          {template.category}
        </span>

        {/* Subject */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-sm">{template.subject}</p>
          <button className="text-gray-400 hover:text-purple-400 transition-colors">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        {/* Email Content */}
        <p className="text-sm text-white mb-2">Email Content <span className="text-red-400">*</span></p>
        <div className="relative bg-[#0c0c1a] border border-white/10 rounded-xl p-4 min-h-[180px] mb-5">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">{template.content}</pre>
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        {/* Footer meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Created: <span className="text-purple-400">{template.createdAt}</span>
          </span>
          <span>Last Used: <span className="text-purple-400">{template.lastUsed}</span></span>
          <span className="ml-auto">Used {template.usedTimes} times</span>
        </div>

        {/* CTA */}
        <button
          onClick={() => { onUse(template); onClose(); }}
          className="w-full flex items-center justify-center gap-2 bg-[#1a1a3e] border border-purple-500/60 text-white text-sm font-medium py-3 rounded-xl hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.2)]"
        >
          Use this Template
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─── Use Template Confirm Modal ───────────────────────────────────────────────
function UseTemplateModal({
  template,
  onClose,
  onCreateCampaign,
}: {
  template: EmailTemplate;
  onClose: () => void;
  onCreateCampaign: (t: EmailTemplate) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-[#12121f] border border-white/10 rounded-2xl w-full max-w-md mx-4 p-7">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg leading-none">✕</button>

        <h2 className="text-2xl font-bold text-white mb-2">{template.title}</h2>
        <p className="text-gray-400 text-sm mb-6">
          This will create a new campaign using &quot;{template.title}&quot; template. Subject and content will be pre-filled.
        </p>

        {/* Details table */}
        <div className="bg-[#0c0c1a] border border-white/8 rounded-xl divide-y divide-white/5 mb-6">
          {[
            { label: 'Template', value: template.title },
            { label: 'Subject',  value: template.subject },
            { label: 'Category', value: template.category },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center px-5 py-3.5 gap-6">
              <span className="text-sm text-gray-500 w-20 shrink-0">{label}</span>
              <span className="text-sm text-white">{value}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <button
            onClick={() => { onCreateCampaign(template); onClose(); }}
            className="flex items-center gap-2 bg-[#1a1a3e] border border-purple-500/60 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.2)]"
          >
            <span className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">S</span>
            Create Campaign
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Create Campaign Modal ────────────────────────────────────────────────────
function CreateCampaignModal({
  prefill,
  onClose,
}: {
  prefill: EmailTemplate | null;
  onClose: () => void;
}) {
  const [name,     setName]     = useState('');
  const [subject,  setSubject]  = useState(prefill?.subject  ?? '');
  const [type,     setType]     = useState(prefill?.category ?? '');
  const [content,  setContent]  = useState(prefill?.content  ?? '');
  const [sendTo,   setSendTo]   = useState('');
  const [date,     setDate]     = useState('');
  const [time,     setTime]     = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-[#12121f] border border-white/10 rounded-2xl w-full max-w-sm mx-4 p-7 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg leading-none">✕</button>

        <h2 className="text-xl font-bold text-white mb-1">Create new Campaign</h2>
        <p className="text-gray-500 text-xs mb-5">Set up your email campaign details.</p>

        <div className="space-y-4">
          {/* Campaign Name */}
          <div>
            <label className="text-xs text-white mb-1.5 block">Campaign Name <span className="text-red-400">*</span></label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors placeholder-gray-600"
              placeholder=""
            />
          </div>

          {/* Subject */}
          <div>
            <label className="text-xs text-white mb-1.5 block">Subject Line <span className="text-red-400">*</span></label>
            <input
              value={subject} onChange={e => setSubject(e.target.value)}
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors placeholder-gray-600"
            />
          </div>

          {/* Campaign Type */}
          <div>
            <label className="text-xs text-white mb-1.5 block">Campaign Type <span className="text-red-400">*</span></label>
            <div className="relative">
              <select
                value={type} onChange={e => setType(e.target.value)}
                className="w-full appearance-none bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
              >
                <option value="">Select</option>
                <option value="Promotional">Promotional</option>
                <option value="Newsletter">Newsletter</option>
                <option value="Transactional">Transactional</option>
                <option value="Drip">Drip</option>
              </select>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Email Content */}
          <div>
            <label className="text-xs text-white mb-1.5 block">Email Content <span className="text-red-400">*</span></label>
            <textarea
              value={content} onChange={e => setContent(e.target.value)}
              rows={7}
              placeholder="Write your email content here"
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors placeholder-gray-600 resize-none"
            />
          </div>

          {/* Send To */}
          <div>
            <label className="text-xs text-white mb-1.5 block">Send to <span className="text-red-400">*</span></label>
            <div className="relative">
              <select
                value={sendTo} onChange={e => setSendTo(e.target.value)}
                className="w-full appearance-none bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
              >
                <option value="">Select</option>
                <option value="all">All Subscribers</option>
                <option value="active">Active Subscribers</option>
                <option value="segment">Custom Segment</option>
              </select>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Schedule (optional)</p>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-white mb-1.5 block">Date</label>
                <div className="relative">
                  <input
                    type="text" value={date} onChange={e => setDate(e.target.value)}
                    className="w-full bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 pr-8 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
                  />
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs text-white mb-1.5 block">Time</label>
                <div className="relative">
                  <input
                    type="text" value={time} onChange={e => setTime(e.target.value)}
                    className="w-full bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 pr-8 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
                  />
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-[#1a1a3e] border border-purple-500/60 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.2)]"
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Template Card ────────────────────────────────────────────────────────────
function TemplateCard({
  template,
  onView,
  onUse,
}: {
  template: EmailTemplate;
  onView: (t: EmailTemplate) => void;
  onUse: (t: EmailTemplate) => void;
}) {
  return (
    <div className="bg-[#12121f] border border-white/8 rounded-2xl p-5 flex flex-col gap-3 hover:border-white/15 transition-all">
      {/* Title */}
      <h3 className="text-lg font-bold text-white">{template.title}</h3>

      {/* Category badge */}
      <span className="self-start text-xs border border-gray-600 text-gray-300 rounded px-2.5 py-0.5">
        {template.category}
      </span>

      {/* Subject */}
      <p className="text-sm text-gray-400">Subject: {template.subject}</p>

      {/* Email Content label + preview */}
      <div>
        <p className="text-sm text-white mb-2">Email Content <span className="text-red-400">*</span></p>
        <div className="bg-[#0c0c1a] border border-white/8 rounded-xl px-4 py-3 min-h-[80px]">
          <p className="text-sm text-gray-400 whitespace-pre-line line-clamp-3">{template.content}</p>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Created: <span className="text-purple-400 ml-1">{template.createdAt}</span>
        </span>
        <span className="ml-auto">Used {template.usedTimes} times</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={() => onUse(template)}
          className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a3e] border border-purple-500/60 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.15)]"
        >
          Use Template
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>

        {/* Delete */}
        <button className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:border-red-500/40 hover:text-red-400 text-gray-400 transition-colors">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </button>

        {/* View */}
        <button
          onClick={() => onView(template)}
          className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:border-purple-500/40 hover:text-purple-400 text-gray-400 transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── New Template Modal ───────────────────────────────────────────────────────
function NewTemplateModal({ onClose }: { onClose: () => void }) {
  const [title,   setTitle]   = useState('');
  const [subject, setSubject] = useState('');
  const [category,setCategory]= useState('');
  const [content, setContent] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-[#12121f] border border-white/10 rounded-2xl w-full max-w-sm mx-4 p-7">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg leading-none">✕</button>
        <h2 className="text-xl font-bold text-white mb-5">New Template</h2>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-white mb-1.5 block">Template Title <span className="text-red-400">*</span></label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors" />
          </div>
          <div>
            <label className="text-xs text-white mb-1.5 block">Subject <span className="text-red-400">*</span></label>
            <input value={subject} onChange={e => setSubject(e.target.value)}
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors" />
          </div>
          <div>
            <label className="text-xs text-white mb-1.5 block">Category <span className="text-red-400">*</span></label>
            <div className="relative">
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="w-full appearance-none bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors">
                <option value="">Select</option>
                <option>Promotional</option><option>Newsletter</option>
                <option>Transactional</option><option>Drip</option>
              </select>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
          <div>
            <label className="text-xs text-white mb-1.5 block">Email Content <span className="text-red-400">*</span></label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={5}
              placeholder="Write your template content here"
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors placeholder-gray-600 resize-none" />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button onClick={onClose}
            className="flex items-center gap-2 bg-[#1a1a3e] border border-purple-500/60 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.2)]">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function Templates() {
  const [search,       setSearch]       = useState('');
  const [filterType,   setFilterType]   = useState('All Types');
  const [currentPage,  setCurrentPage]  = useState(1);

  // Modal states
  const [viewTemplate,    setViewTemplate]    = useState<EmailTemplate | null>(null);
  const [useTemplate,     setUseTemplate]     = useState<EmailTemplate | null>(null);
  const [createPrefill,   setCreatePrefill]   = useState<EmailTemplate | null>(null);
  const [showCreate,      setShowCreate]      = useState(false);
  const [showNewTemplate, setShowNewTemplate] = useState(false);

  // Filter
  const filtered = ALL_TEMPLATES.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                        t.subject.toLowerCase().includes(search.toLowerCase());
    const matchType   = filterType === 'All Types' || t.category === filterType;
    return matchSearch && matchType;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleUseTemplate = (t: EmailTemplate) => setUseTemplate(t);
  const handleCreateCampaign = (t: EmailTemplate) => {
    setCreatePrefill(t);
    setShowCreate(true);
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="Email-Marketing" />

      <div className="flex-1 flex flex-col overflow-hidden border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Email Marketing" />

        <div className="flex-1 flex flex-col px-6 py-5 min-h-0 overflow-y-auto">
          {/* Page title + New Template btn */}
          <div className="flex items-center justify-between mb-5 shrink-0">
            <h2 className="text-2xl font-bold text-white">Templates</h2>
            <button
              onClick={() => setShowNewTemplate(true)}
              className="flex items-center gap-2 bg-[#1a1a3e] border border-purple-500/60 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.2)]"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              New Template
            </button>
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3 mb-6 shrink-0">
            {/* Search */}
            <div className="flex items-center gap-2 bg-[#0f0f1e] border border-white/10 rounded-full px-4 py-2.5 flex-1">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400 shrink-0">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text" value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search by Campaign name or status"
                className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"
              />
            </div>

            {/* Type filter */}
            <div className="relative">
              <div className="flex items-center gap-2 bg-[#0f0f1e] border border-white/10 rounded-full px-4 py-2.5">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400">
                  <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                </svg>
                <select
                  value={filterType}
                  onChange={e => { setFilterType(e.target.value); setCurrentPage(1); }}
                  className="appearance-none bg-transparent text-sm text-white outline-none pr-5 cursor-pointer"
                >
                  <option>All Types</option>
                  <option>Promotional</option>
                  <option>Newsletter</option>
                  <option>Transactional</option>
                  <option>Drip</option>
                </select>
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="pointer-events-none text-gray-400 -ml-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Template grid — 2 columns */}
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-500 gap-3">
              <svg width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} className="opacity-25">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <p className="text-sm">No templates found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5">
              {paginated.map(t => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  onView={setViewTemplate}
                  onUse={handleUseTemplate}
                />
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* ── Pagination footer ── */}
          <div className="shrink-0 flex items-center justify-end gap-3 pt-5 mt-4 border-t border-white/5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-xl bg-[#1a1a3e] border border-purple-500/60 hover:bg-purple-600/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-purple-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <span className="text-sm text-gray-300 min-w-[60px] text-center">
              {currentPage} of {String(totalPages).padStart(2, '0')}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-xl bg-[#1a1a3e] border border-purple-500/60 hover:bg-purple-600/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-purple-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {viewTemplate && (
        <ViewTemplateModal
          template={viewTemplate}
          onClose={() => setViewTemplate(null)}
          onUse={(t) => { setViewTemplate(null); setUseTemplate(t); }}
        />
      )}

      {useTemplate && (
        <UseTemplateModal
          template={useTemplate}
          onClose={() => setUseTemplate(null)}
          onCreateCampaign={handleCreateCampaign}
        />
      )}

      {showCreate && (
        <CreateCampaignModal
          prefill={createPrefill}
          onClose={() => { setShowCreate(false); setCreatePrefill(null); }}
        />
      )}

      {showNewTemplate && (
        <NewTemplateModal onClose={() => setShowNewTemplate(false)} />
      )}
    </div>
  );
}

export default Templates;