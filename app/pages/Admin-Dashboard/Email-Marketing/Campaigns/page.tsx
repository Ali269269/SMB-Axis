'use client';

import { useState, useRef, useEffect } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
type CampaignStatus = 'Draft' | 'Scheduled' | 'Sending' | 'Sent';
type CampaignType   = 'Newsletter' | 'Promotional' | 'Drip' | 'Transactional';
type SendTo         = 'Newsletter subscribers' | 'Leads' | 'Custom' | 'Save as Draft';

interface Campaign {
  id: number;
  name: string;
  subject: string;
  type: CampaignType;
  status: CampaignStatus;
  content: string;
  recipients: number;
  dateLabel: string;
  sendingProgress?: number; // 0-100, only for Sending
  clickRate?: number;
  openRate?: number;
  bounceRate?: number;
  unsubscribed?: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    name: 'Year-End Market Report',
    subject: '2025 Real Estate Market Wrap-Up',
    type: 'Newsletter',
    status: 'Scheduled',
    content: 'Hi {{first_name}},\n\nHere is what our company can do to your business.\n\n{{image}}\n\nBest regards,\nThe SMB AxisTeam',
    recipients: 320,
    dateLabel: 'Scheduled 2026-03-25',
    clickRate: 22, openRate: 45, bounceRate: 5.1, unsubscribed: 0.1,
  },
  {
    id: 2,
    name: 'Get Free Consultation',
    subject: 'Today is the day to enjoy free consultaion...',
    type: 'Promotional',
    status: 'Sent',
    content: 'Hi {{first_name}},\n\nHere is what our company can do to your business.\n\n{{image}}\n\nBest regards,\nThe SMB AxisTeam',
    recipients: 30,
    dateLabel: 'Sent 2026-03-25',
    clickRate: 39, openRate: 50, bounceRate: 9.8, unsubscribed: 0.2,
  },
  {
    id: 3,
    name: 'Get Free Consultation',
    subject: 'Today is the day to enjoy free consultaion...',
    type: 'Drip',
    status: 'Sending',
    content: 'Hi {{first_name}},\n\nHere is what our company can do to your business.\n\n{{image}}\n\nBest regards,\nThe SMB AxisTeam',
    recipients: 30,
    dateLabel: '',
    sendingProgress: 68,
    clickRate: 18, openRate: 33, bounceRate: 3.2, unsubscribed: 0.0,
  },
  {
    id: 4,
    name: 'Get Free Consultation',
    subject: 'Today is the day to enjoy free consultaion...',
    type: 'Transactional',
    status: 'Sent',
    content: 'Hi {{first_name}},\n\nHere is what our company can do to your business.\n\n{{image}}\n\nBest regards,\nThe SMB AxisTeam',
    recipients: 30,
    dateLabel: 'Sent 2026-03-25',
    clickRate: 12, openRate: 60, bounceRate: 2.1, unsubscribed: 0.05,
  },
  {
    id: 5,
    name: 'Get Free Consultation',
    subject: 'Today is the day to enjoy free consultaion...',
    type: 'Drip',
    status: 'Draft',
    content: 'Hi {{first_name}},\n\nHere is what our company can do to your business.\n\n{{image}}\n\nBest regards,\nThe SMB AxisTeam',
    recipients: 30,
    dateLabel: 'Saved on 2026-03-14',
    clickRate: 0, openRate: 0, bounceRate: 0, unsubscribed: 0,
  },
  {
    id: 6, name: 'Spring Promo', subject: 'Spring deals await you!', type: 'Promotional', status: 'Draft',
    content: 'Hi {{first_name}},\n\nSpring is here!', recipients: 120, dateLabel: 'Saved on 2026-04-01',
    clickRate: 0, openRate: 0, bounceRate: 0, unsubscribed: 0,
  },
  {
    id: 7, name: 'Weekly Digest', subject: 'Your weekly market digest', type: 'Newsletter', status: 'Scheduled',
    content: 'Hi {{first_name}},\n\nHere is your digest.', recipients: 500, dateLabel: 'Scheduled 2026-04-10',
    clickRate: 0, openRate: 0, bounceRate: 0, unsubscribed: 0,
  },
  {
    id: 8, name: 'Welcome Series', subject: 'Welcome aboard!', type: 'Drip', status: 'Sent',
    content: 'Hi {{first_name}},\n\nWelcome!', recipients: 80, dateLabel: 'Sent 2026-04-05',
    clickRate: 44, openRate: 72, bounceRate: 1.1, unsubscribed: 0.0,
  },
  {
    id: 9, name: 'Invoice Notification', subject: 'Your invoice is ready', type: 'Transactional', status: 'Sent',
    content: 'Hi {{first_name}},\n\nYour invoice is attached.', recipients: 15, dateLabel: 'Sent 2026-04-06',
    clickRate: 5, openRate: 90, bounceRate: 0.5, unsubscribed: 0.0,
  },
  {
    id: 10, name: 'Re-Engagement', subject: 'We miss you!', type: 'Promotional', status: 'Sending',
    content: 'Hi {{first_name}},\n\nCome back!', recipients: 200, dateLabel: '',
    sendingProgress: 35, clickRate: 8, openRate: 20, bounceRate: 6.0, unsubscribed: 0.3,
  },
];

const PER_PAGE = 5;

// ─── Status badge colours ─────────────────────────────────────────────────────
function statusBadge(status: CampaignStatus) {
  switch (status) {
    case 'Scheduled':  return 'text-blue-400 bg-blue-500/15 border border-blue-500/30';
    case 'Sent':       return 'text-green-400 bg-green-500/15 border border-green-500/30';
    case 'Sending':    return 'text-yellow-400 bg-yellow-500/15 border border-yellow-500/30';
    case 'Draft':      return 'text-orange-400 bg-orange-500/15 border border-orange-500/30';
  }
}

// Status icon
function StatusIcon({ status }: { status: CampaignStatus }) {
  if (status === 'Sent')      return <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>;
  if (status === 'Scheduled') return <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  if (status === 'Sending')   return <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
  return <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, borderColor }: { label: string; value: string | number; icon: React.ReactNode; borderColor: string }) {
  return (
    <div className={`flex-1 min-w-0 bg-[#13131f] border rounded-2xl p-5 shadow-[inset_4px_4px_10px_rgba(124,58,237,0.5),inset_1px_1px_3px_rgba(124,58,237,0.1),inset_-1px_-1px_2px_rgba(124,58,237,0.1)]`} style={{ borderColor }}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <p className="text-4xl font-bold text-white">{String(value).padStart(2, '0')}</p>
    </div>
  );
}

// ─── Custom Dropdown ──────────────────────────────────────────────────────────
function Dropdown<T extends string>({
  options, value, onChange, placeholder = 'Select',
}: { options: T[]; value: T | ''; onChange: (v: T) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between bg-[#0c0c1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-left hover:border-purple-500/40 transition-colors">
        <span className={value ? 'text-white' : 'text-gray-500'}>{value || placeholder}</span>
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-[#1a1a2e] border border-white/10 rounded-md shadow-2xl overflow-hidden">
          {options.map(opt => (
            <button key={opt} type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${opt === value ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Create Campaign Modal ────────────────────────────────────────────────────
function CreateCampaignModal({ onClose, onSave }: { onClose: () => void; onSave: (c: Campaign) => void }) {
  const [name, setName]       = useState('');
  const [subject, setSubject] = useState('');
  const [type, setType]       = useState<CampaignType | ''>('');
  const [content, setContent] = useState('');
  const [sendTo, setSendTo]   = useState<SendTo | ''>('');
  const [date, setDate]       = useState('');
  const [time, setTime]       = useState('');

  const campaignTypes: CampaignType[] = ['Newsletter', 'Promotional', 'Drip', 'Transactional'];
  const sendToOpts: SendTo[]          = ['Newsletter subscribers', 'Leads', 'Custom', 'Save as Draft'];

  const handleCreate = () => {
    if (!name.trim() || !subject.trim() || !type) return;
    const isDraft = sendTo === 'Save as Draft';
    const isScheduled = !!date;
    const status: CampaignStatus = isDraft ? 'Draft' : isScheduled ? 'Scheduled' : 'Sending';
    const dateLabel = isDraft
      ? `Saved on ${new Date().toISOString().slice(0, 10)}`
      : isScheduled
      ? `Scheduled ${date}`
      : '';
    const recipientMap: Record<string, number> = {
      'Newsletter subscribers': 320,
      'Leads': 80,
      'Custom': 50,
      'Save as Draft': 0,
    };
    const newCampaign: Campaign = {
      id: Date.now(),
      name, subject, type: type as CampaignType, status, content,
      recipients: recipientMap[sendTo] ?? 0,
      dateLabel,
      sendingProgress: status === 'Sending' ? 0 : undefined,
      clickRate: 0, openRate: 0, bounceRate: 0, unsubscribed: 0,
    };
    onSave(newCampaign);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#13131f] border border-purple-500/30 rounded-2xl w-full max-w-md mx-4 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h4 className="text-lg font-bold text-white">Create new Campaign</h4>
            <p className="text-xs text-gray-400 mt-0.5">Set up your email campaign details.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl leading-none">×</button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Campaign Name */}
          <div>
            <label className="block text-xs text-gray-300 mb-1.5">Campaign Name <span className="text-red-400">*</span></label>
            <input value={name} onChange={e => setName(e.target.value)} type="text"
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"/>
          </div>

          {/* Subject Line */}
          <div>
            <label className="block text-xs text-gray-300 mb-1.5">Subject Line <span className="text-red-400">*</span></label>
            <input value={subject} onChange={e => setSubject(e.target.value)} type="text"
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"/>
          </div>

          {/* Campaign Type */}
          <div>
            <label className="block text-xs text-gray-300 mb-1.5">Campaign Type <span className="text-red-400">*</span></label>
            <Dropdown options={campaignTypes} value={type} onChange={v => setType(v)} placeholder="Select"/>
          </div>

          {/* Email Content */}
          <div>
            <label className="block text-xs text-gray-300 mb-1.5">Email Content <span className="text-red-400">*</span></label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={7}
              placeholder="Write your email content here"
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors resize-none"/>
          </div>

          {/* Send To */}
          <div>
            <label className="block text-xs text-gray-300 mb-1.5">Send to <span className="text-red-400">*</span></label>
            <Dropdown options={sendToOpts} value={sendTo} onChange={v => setSendTo(v)} placeholder="Select"/>
          </div>

          {/* Schedule */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">SCHEDULE (optional)</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-300 mb-1.5">Date</label>
                <div className="relative">
                  <input type="date" value={date} onChange={e => setDate(e.target.value)}
                    className="w-full bg-[#0c0c1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors [color-scheme:dark]"/>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1.5">Time</label>
                <div className="relative">
                  <input type="time" value={time} onChange={e => setTime(e.target.value)}
                    className="w-full bg-[#0c0c1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors [color-scheme:dark]"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-end">
          <button onClick={handleCreate} disabled={!name.trim() || !subject.trim() || !type}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── View Email Modal ─────────────────────────────────────────────────────────
function ViewEmailModal({ campaign, onClose }: { campaign: Campaign; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#13131f] border border-white/10 rounded-2xl w-full max-w-md mx-4 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h4 className="text-lg font-bold text-white">{campaign.name}</h4>
            <p className="text-xs text-gray-400 mt-1">{campaign.subject}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full ${statusBadge(campaign.status)}`}>
                <StatusIcon status={campaign.status} />{campaign.status}
              </span>
              <span className="text-xs border border-white/20 rounded-full px-2.5 py-0.5 text-gray-400">{campaign.type}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl leading-none">×</button>
        </div>

        {/* Email content area */}
        <div className="px-6 pb-4">
          <label className="block text-xs text-gray-300 mb-1.5">Email Content <span className="text-red-400">*</span></label>
          <div className="bg-[#0c0c1a] border border-white/10 rounded-md px-4 py-3 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap min-h-[140px]">
            {campaign.content}
          </div>
        </div>

        {/* Meta */}
        <div className="px-6 pb-4 flex items-center gap-5 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-purple-400">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            {campaign.recipients} recipients
          </span>
          {campaign.dateLabel && (
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-purple-400">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {campaign.dateLabel}
            </span>
          )}
        </div>

        {/* Stats grid */}
        <div className="px-6 pb-6 grid grid-cols-2 gap-3">
          {[
            { label: 'Click Rate',    value: `${campaign.clickRate ?? 0}%`,    icon: '✦', color: 'text-purple-400' },
            { label: 'Open Rate',     value: `${campaign.openRate ?? 0}%`,     icon: '◎', color: 'text-blue-400'   },
            { label: 'Bounce Rate',   value: `${campaign.bounceRate ?? 0}%`,   icon: '⊗', color: 'text-orange-400' },
            { label: 'Unsubscribed',  value: `${campaign.unsubscribed ?? 0}%`, icon: '⊠', color: 'text-red-400'   },
          ].map(s => (
            <div key={s.label} className="bg-[#0c0c1a] border border-white/8 rounded-md px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`text-xs ${s.color}`}>{s.icon}</span>
                <span className="text-xs text-gray-400">{s.label}</span>
              </div>
              <p className="text-xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Campaign Row ─────────────────────────────────────────────────────────────
function CampaignRow({
  campaign, onDelete, onView,
}: {
  campaign: Campaign;
  onDelete: () => void;
  onView: () => void;
}) {
  return (
    <div className="bg-[#13131f] border border-white/8 rounded-2xl px-5 py-4 hover:border-purple-500/30 transition-all">
      {/* Row 1: name + badges + actions */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-semibold text-white">{campaign.name}</span>
          {/* Status badge */}
          <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full ${statusBadge(campaign.status)}`}>
            <StatusIcon status={campaign.status}/>{campaign.status}
          </span>
          {/* Type badge */}
          <span className="text-xs border border-white/20 rounded-full px-2.5 py-0.5 text-gray-400">{campaign.type}</span>
        </div>
        {/* Action icons */}
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={onDelete}
            className="text-gray-500 hover:text-red-400 transition-colors">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
          </button>
          <button onClick={onView}
            className="text-gray-500 hover:text-purple-400 transition-colors">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Row 2: subject */}
      <p className="text-sm text-gray-400 mb-2">{campaign.subject}</p>

      {/* Row 3: recipients + date */}
      <div className="flex items-center gap-5 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-purple-400">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          {campaign.recipients} recipients
        </span>
        {campaign.dateLabel && (
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-purple-400">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {campaign.dateLabel}
          </span>
        )}
      </div>

      {/* Sending progress bar */}
      {campaign.status === 'Sending' && campaign.sendingProgress !== undefined && (
        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all"
            style={{ width: `${campaign.sendingProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EmailMarketing() {
  const [campaigns, setCampaigns]   = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [showCreate, setShowCreate] = useState(false);
  const [viewCampaign, setViewCampaign] = useState<Campaign | null>(null);

  // Filters
  const [search, setSearch]         = useState('');
  const [typeFilter, setTypeFilter] = useState<'All Types' | CampaignType>('All Types');
  const [statusFilter, setStatusFilter] = useState<'All' | CampaignStatus>('All');

  // Pagination
  const [page, setPage] = useState(1);

  // Types dropdown
  const [typeDropOpen, setTypeDropOpen] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (typeRef.current && !typeRef.current.contains(e.target as Node)) setTypeDropOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const typeOptions: ('All Types' | CampaignType)[] = ['All Types', 'Newsletter', 'Promotional', 'Drip', 'Transactional'];
  const statusTabs: ('All' | CampaignStatus)[]       = ['All', 'Draft', 'Scheduled', 'Sending', 'Sent'];

  const filtered = campaigns.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                        c.status.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter === 'All Types' || c.type === typeFilter;
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Stats
  const totalCampaigns = campaigns.length;
  const emailsSent     = campaigns.filter(c => c.status === 'Sent').length;
  const avgOpenRate    = campaigns.filter(c => c.openRate).length
    ? Math.round(campaigns.filter(c => c.openRate).reduce((s, c) => s + (c.openRate ?? 0), 0) / campaigns.filter(c => c.openRate).length)
    : 0;
  const avgClickRate   = campaigns.filter(c => c.clickRate).length
    ? Math.round(campaigns.filter(c => c.clickRate).reduce((s, c) => s + (c.clickRate ?? 0), 0) / campaigns.filter(c => c.clickRate).length)
    : 0;

  const handleSave = (c: Campaign) => {
    setCampaigns(prev => [c, ...prev]);
    setPage(1);
  };

  const handleDelete = (id: number) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    setPage(1);
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="email" />

      <div className="flex-1 flex flex-col overflow-hidden border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Email Marketing" />

        <div className="flex-1 flex flex-col overflow-hidden px-6 py-5">
          {/* New Campaign button */}
          <div className="flex justify-end mb-5 shrink-0">
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 bg-[#0e0e22] border border-purple-500/60 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.2)]">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              New Campaign
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4 mb-5 shrink-0">
            <StatCard label="Total Campaigns" value={totalCampaigns} borderColor="#7c3aed"
              icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={1.8}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}/>
            <StatCard label="Emails sent" value={emailsSent} borderColor="#7c3aed"
              icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth={1.8}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}/>
            <StatCard label="Avg. Open Rate" value={avgOpenRate} borderColor="#7c3aed"
              icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth={1.8}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}/>
            <StatCard label="Avg. Click Rate" value={avgClickRate} borderColor="#7c3aed"
              icon={<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth={1.8}><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}/>
          </div>

          {/* Search + Type dropdown */}
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <div className="flex items-center gap-2 bg-[#0f0f1e] border border-white/10 rounded-full px-4 py-2.5 flex-1 max-w-md">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400 shrink-0">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by Campaign name or status"
                className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"/>
            </div>

            {/* Types dropdown */}
            <div className="relative" ref={typeRef}>
              <button type="button" onClick={() => setTypeDropOpen(p => !p)}
                className="flex items-center gap-2 bg-[#0f0f1e] border border-white/10 rounded-full px-4 py-2.5 text-sm text-gray-300 hover:border-purple-500/40 transition-colors min-w-[130px]">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-gray-400">
                  <line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/>
                </svg>
                <span>{typeFilter}</span>
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  className={`text-gray-400 ml-auto transition-transform ${typeDropOpen ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {typeDropOpen && (
                <div className="absolute z-30 top-full mt-1 left-0 w-48 bg-[#1a1a2e] border border-white/10 rounded-md shadow-2xl overflow-hidden">
                  {typeOptions.map(opt => (
                    <button key={opt} type="button"
                      onClick={() => { setTypeFilter(opt); setTypeDropOpen(false); setPage(1); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${opt === typeFilter ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status tabs */}
          <div className="flex items-center gap-1 bg-[#13131f] border border-white/8 rounded-xl p-1 w-fit mb-4 shrink-0">
            {statusTabs.map(s => (
              <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  statusFilter === s ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}>
                {s}
              </button>
            ))}
          </div>

          {/* Campaign list */}
          <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-3 opacity-30" strokeWidth={1}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <p className="text-sm">No campaigns found.</p>
              </div>
            ) : (
              paginated.map(c => (
                <CampaignRow key={c.id} campaign={c}
                  onDelete={() => handleDelete(c.id)}
                  onView={() => setViewCampaign(c)}/>
              ))
            )}
          </div>

          {/* Pagination footer */}
          <div className="shrink-0 flex items-center justify-end gap-3 pt-4 border-t border-white/5">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-9 h-9 rounded-full bg-[#1a1a3e] border border-purple-500/60 hover:bg-purple-600/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-purple-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <span className="text-sm text-gray-300 min-w-[60px] text-center">
              {page} of {String(totalPages).padStart(2, '0')}
            </span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-9 h-9 rounded-full bg-[#1a1a3e] border border-purple-500/60 hover:bg-purple-600/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-purple-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreate && <CreateCampaignModal onClose={() => setShowCreate(false)} onSave={handleSave}/>}
      {viewCampaign && <ViewEmailModal campaign={viewCampaign} onClose={() => setViewCampaign(null)}/>}
    </div>
  );
}
