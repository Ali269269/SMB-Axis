'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
type AppStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'No-show';
type AppType = 'Initial Consultation' | 'Follow-up' | 'Strategy Session' | 'Review Meeting';

interface Appointment {
  id: number;
  clientName: string;
  clientEmail: string;
  company: string;
  date: string; // e.g. "Mar 9, 26"
  dateISO: string; // e.g. "2026-03-09"
  time: string; // e.g. "01:00 pm"
  type: AppType;
  duration: string;
  status: AppStatus;
  consultant: string;
  notes: string;
  nextSteps: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 1, clientName: 'Paz', clientEmail: 'paz@gmail.com', company: 'PCLD', date: 'Mar 9, 26', dateISO: '2026-03-09', time: '01:00 pm', type: 'Initial Consultation', duration: '1 hr', status: 'No-show', consultant: 'Zain', notes: 'Tried to contact client', nextSteps: 'Complete the web design' },
  { id: 2, clientName: 'Dr. Ghitta', clientEmail: 'tom@gmail.com', company: 'Atlas Dental Center', date: 'Mar 10, 26', dateISO: '2026-03-10', time: '02:00 pm', type: 'Follow-up', duration: '30 min', status: 'Completed', consultant: 'Ali', notes: 'Discussed ongoing project', nextSteps: 'Send revised proposal' },
  { id: 3, clientName: 'Zain', clientEmail: 'zain@gmail.com', company: 'GreenLeaf Co.', date: 'Mar 11, 26', dateISO: '2026-03-11', time: '03:00 pm', type: 'Strategy Session', duration: '45 min', status: 'Cancelled', consultant: 'Simo', notes: 'Client cancelled last minute', nextSteps: 'Reschedule for next week' },
  { id: 4, clientName: 'Ali', clientEmail: 'ali@gmail.com', company: 'GreenLeaf Co.', date: 'Mar 12, 26', dateISO: '2026-03-12', time: '04:00 pm', type: 'Review Meeting', duration: '1 hr', status: 'Scheduled', consultant: 'Tom', notes: '', nextSteps: '' },
  { id: 5, clientName: 'June', clientEmail: 'june@gmail.com', company: 'GreenLeaf Co.', date: 'Mar 13, 26', dateISO: '2026-03-13', time: '05:00 pm', type: 'Follow-up', duration: '30 min', status: 'Scheduled', consultant: 'Henry', notes: '', nextSteps: '' },
  { id: 6, clientName: 'Henry', clientEmail: 'henry@gmail.com', company: 'GreenLeaf Co.', date: 'Mar 14, 26', dateISO: '2026-03-14', time: '06:00 pm', type: 'Follow-up', duration: '45 min', status: 'Scheduled', consultant: 'June', notes: '', nextSteps: '' },
];

const CLIENTS = ['PCLD', 'Atlas Dental Center', 'GreenLeaf Co.'];
const STATUSES: AppStatus[] = ['Scheduled', 'Completed', 'Cancelled', 'No-show'];

// ─── Status Style ─────────────────────────────────────────────────────────────
function statusColor(status: AppStatus) {
  switch (status) {
    case 'Scheduled': return 'text-blue-400';
    case 'Completed': return 'text-green-400';
    case 'Cancelled': return 'text-red-400';
    case 'No-show': return 'text-yellow-400';
  }
}

function statusBorder(status: AppStatus) {
  switch (status) {
    case 'Scheduled': return 'border-blue-500/60 text-blue-400';
    case 'Completed': return 'border-green-500/60 text-green-400';
    case 'Cancelled': return 'border-red-500/60 text-red-400';
    case 'No-show': return 'border-yellow-500/60 text-yellow-400';
  }
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, count, borderColor }: {
  icon: React.ReactNode;
  label: string;
  count: number;
  borderColor: string;
}) {
  return (
    <div className={`bg-[#13131f] border ${borderColor}  shadow-[inset_4px_4px_10px_rgba(124,58,237,0.3),inset_1px_1px_3px_rgba(124,58,237,0.1),inset_-1px_-1px_2px_rgba(124,58,237,0.1)]  rounded-2xl p-5 flex flex-col gap-3 flex-1`}>
      <div className="flex items-center gap-2 text-sm text-gray-300">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-4xl font-bold text-white">{String(count).padStart(2, '0')}</p>
    </div>
  );
}

// ─── New Appointment Modal ────────────────────────────────────────────────────
// ─── New Appointment Form (Full Page) ────────────────────────────────────────
function NewAppointmentForm({ onBack, onSave }: {
  onBack: () => void;
  onSave: (a: Appointment) => void;
}) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [consultant, setConsultant] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState<AppType | ''>('');
  const [notes, setNotes] = useState('');

  const types: AppType[] = ['Initial Consultation', 'Follow-up', 'Strategy Session', 'Review Meeting'];

  const handleSave = () => {
    if (!clientName.trim() || !date) return;
    const d = new Date(date);
    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
    onSave({
      id: Date.now(),
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      company: 'PCLD',
      date: formatted,
      dateISO: date,
      time: time || '12:00 pm',
      type: (type || 'Initial Consultation') as AppType,
      duration: duration || '1 hr',
      status: 'Scheduled',
      consultant: consultant.trim(),
      notes: notes.trim(),
      nextSteps: '',
    });
    onBack();
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumb title */}
      <h5 className="text-xl font-bold text-white">
        Appointment Scheduling/<span className="text-gray-400 font-normal text-[13px] ml-1">New Appointment</span>
      </h5>

      {/* Go Back / Save */}
      <div className="flex items-center justify-between">
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
          className="flex items-center gap-2 bg-[#0d0d1f] border border-purple-500/60 text-white text-sm px-5 py-2 rounded-xl hover:bg-purple-600/20 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)]"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save
        </button>
      </div>

      {/* Form card */}
      <div
        className="rounded-2xl p-8"
        style={{ background: '#13131f', boxShadow: '0 0 0 1px rgba(139,92,246,0.35)' }}
      >
        <h4 className="text-lg font-semibold text-white mb-6">New Appointment</h4>

        {/* Row 1: Client Name | Client Email | Consultant */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Client Name <span className="text-red-400">*</span>
            </label>
            <input
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              className="w-full bg-[#0e0e1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Client Email <span className="text-red-400">*</span>
            </label>
            <input
              value={clientEmail}
              onChange={e => setClientEmail(e.target.value)}
              type="email"
              className="w-full bg-[#0e0e1c] border border-white/10 rounded-[12px] px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Consultant <span className="text-red-400">*</span>
            </label>
            <input
              value={consultant}
              onChange={e => setConsultant(e.target.value)}
              className="w-full bg-[#0e0e1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Date | Time | Duration */}
        <div className="grid grid-cols-3 gap-4 mb-4">
 <div>
  <label className="block text-sm text-gray-300 mb-2">
    Date <span className="text-red-400">*</span>
  </label>

  <div className="relative">
    <input
      id="dateInput"
      value={date}
      onChange={e => setDate(e.target.value)}
      type="date"
      className="w-full bg-[#0e0e1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors pr-10
      [&::-webkit-calendar-picker-indicator]:opacity-0"
    />

    {/* Calendar Icon (click to open picker) */}
    <svg
      onClick={() => {
        const input = document.getElementById('dateInput') as HTMLInputElement;
        input?.showPicker?.(); // modern browsers
        input?.focus();
      }}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  </div>
</div>
         <div>
  <label className="block text-sm text-gray-300 mb-2">
    Time <span className="text-red-400">*</span>
  </label>

  <div className="relative">
    <input
      id="timeInput"
      value={time}
      onChange={e => setTime(e.target.value)}
      type="time"
      className="w-full bg-[#0e0e1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors pr-10 appearance-none"
    />

    {/* Watch Icon */}
    <button
      type="button"
      onClick={() => {
        const el = document.getElementById('timeInput') as HTMLInputElement;
        el?.showPicker?.(); // modern browsers
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
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Duration <span className="text-red-400">*</span>
            </label>
            <select
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="w-full bg-[#0e0e1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors appearance-none"
            >
              <option value="">Select...</option>
              {['30 min', '45 min', '1 hr', '1.5 hr', '2 hr'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Type (left-aligned, 1/3 width) */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Type <span className="text-red-400">*</span>
            </label>
            <select
              value={type}
              onChange={e => setType(e.target.value as AppType)}
              className="w-full bg-[#0e0e1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors appearance-none"
            >
              <option value="">Select...</option>
              {(['Initial Consultation', 'Follow-up', 'Strategy Session', 'Review Meeting'] as AppType[]).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes — full width */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Notes (if any)"
            rows={4}
            className="w-full bg-[#0e0e1c] border border-white/10 rounded-[12px] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Edit/View Modal ──────────────────────────────────────────────────────────
function EditViewModal({ appointment, onClose, onUpdate }: {
  appointment: Appointment;
  onClose: () => void;
  onUpdate: (a: Appointment) => void;
}) {
  const [notes, setNotes] = useState(appointment.notes);
  const [nextSteps, setNextSteps] = useState(appointment.nextSteps);
  const [status, setStatus] = useState<AppStatus>(appointment.status);
  const [editingNotes, setEditingNotes] = useState(false);
  const [editingNextSteps, setEditingNextSteps] = useState(false);

  const handleSave = () => {
    onUpdate({ ...appointment, notes, nextSteps, status });
    onClose();
  };

  const statusButtons: AppStatus[] = ['No-show', 'Scheduled', 'Completed', 'Cancelled'];

  const statusButtonStyle = (s: AppStatus) => {
    const isActive = status === s;
    switch (s) {
      case 'No-show': return isActive ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'border-white/20 text-gray-400 hover:border-yellow-500/50';
      case 'Scheduled': return isActive ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'border-white/20 text-gray-400 hover:border-blue-500/50';
      case 'Completed': return isActive ? 'bg-green-500/20 border-green-500 text-green-400' : 'border-white/20 text-gray-400 hover:border-green-500/50';
      case 'Cancelled': return isActive ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-white/20 text-gray-400 hover:border-red-500/50';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#13131f] border border-purple-500/40 rounded-2xl w-full max-w-sm mx-4 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <p className="text-base font-bold text-white">{appointment.company}</p>
            <p className="text-xs text-gray-400">{appointment.type} · {appointment.duration}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 pb-5 space-y-4">
          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Date</p>
              <p className="text-sm text-white font-medium">{appointment.date.replace(', 26', ', 2026')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Time</p>
              <p className="text-sm text-white font-medium">{appointment.time.toUpperCase()}</p>
            </div>
          </div>

          {/* Consultant & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Consultant</p>
              <p className="text-sm text-white font-medium">{appointment.consultant || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p className={`text-sm font-medium ${statusColor(status)}`}>{status}</p>
            </div>
          </div>

          {/* Duration & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Duration</p>
              <p className="text-sm text-white font-medium">{appointment.duration}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Type</p>
              <p className="text-sm text-white font-medium">{appointment.type}</p>
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-sm text-white">{appointment.clientEmail || '—'}</p>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-gray-500">Notes</p>
              <button onClick={() => setEditingNotes(!editingNotes)} className="text-gray-500 hover:text-purple-400 transition-colors">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            {editingNotes ? (
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                onBlur={() => setEditingNotes(false)} autoFocus
                className="w-full bg-[#0e0e1c] border border-purple-500/30 rounded-lg px-3 py-2 text-xs text-white outline-none resize-none" />
            ) : (
              <p className="text-sm text-white">{notes || '—'}</p>
            )}
          </div>

          {/* Next Steps */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-gray-500">Next Steps</p>
              <button onClick={() => setEditingNextSteps(!editingNextSteps)} className="text-gray-500 hover:text-purple-400 transition-colors">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            {editingNextSteps ? (
              <textarea value={nextSteps} onChange={e => setNextSteps(e.target.value)} rows={2}
                onBlur={() => setEditingNextSteps(false)} autoFocus
                className="w-full bg-[#0e0e1c] border border-purple-500/30 rounded-lg px-3 py-2 text-xs text-white outline-none resize-none" />
            ) : (
              <p className="text-sm text-white">{nextSteps || '—'}</p>
            )}
          </div>

          {/* Update Status */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {statusButtons.map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`px-3 py-1 rounded-full text-xs border transition-all  ${statusButtonStyle(s)}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Save button */}
          <button onClick={handleSave}
            className="w-full bg-purple-500/30 hover:bg-purple-700 text-white text-sm py-2.5 rounded-xl transition-colors border border-purple-600 font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Action Dropdown ──────────────────────────────────────────────────────────
function ActionDropdown({ onEditView, onDelete, onAddNotes }: {
  onEditView: () => void;
  onDelete: () => void;
  onAddNotes: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)} className="text-gray-400 hover:text-white transition-colors p-1">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-36 bg-[#1e1e2e] border border-white/10 rounded-[15px] shadow-xl overflow-hidden">
            <button onClick={() => { onEditView(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-white font-semibold bg-purple-600 hover:bg-purple-700 transition-colors">
              Edit/view
            </button>
            <button onClick={() => { onDelete(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-500/30 transition-colors">
              Delete
            </button>
            <button onClick={() => { onAddNotes(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors">
              Add notes
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Custom Dropdown ──────────────────────────────────────────────────────────
function CustomDropdown({ value, options, onChange, placeholder, icon }: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 bg-[#13131f] border border-white/10 rounded-xl px-3 py-2 text-sm text-white hover:border-purple-500/40 transition-colors min-w-[130px]">
        {icon && <span className="text-gray-400">{icon}</span>}
        <span className="flex-1 text-left text-gray-300">{value || placeholder}</span>
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 w-full bg-[#1e1e2e] border border-white/10 rounded-[15px] shadow-xl overflow-hidden z-20">
            <div className="px-3 py-1.5 text-[10px] text-gray-500 border-b border-white/5">{placeholder}</div>
            {options.map(opt => (
              <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${opt === value ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-purple-500/30'}`}>
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Calendar View ────────────────────────────────────────────────────────────
function CalendarView({ appointments }: { appointments: Appointment[] }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const getAppsForDay = (day: number) => {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(a => a.dateISO === iso);
  };

  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );
  while (cells.length % 7 !== 0) cells.push(null);

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-[#13131f] border border-white/8 rounded-2xl overflow-hidden">
      {/* Month nav */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="text-sm font-semibold text-white">{monthName}</p>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-white/8">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => (
          <div key={d} className="py-3 text-center text-xs text-gray-400 font-medium">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          const apps = day ? getAppsForDay(day) : [];
          return (
            <div key={idx}
              className={`min-h-[100px] border-b border-r border-white/5 p-2 ${day ? '' : 'bg-transparent'} ${idx % 7 === 6 ? 'border-r-0' : ''}`}>
              {day && (
                <>
                  <span className={`text-xs font-medium mb-1 inline-flex items-center justify-center w-6 h-6 rounded-full
                    ${isToday(day) ? 'bg-white/20 text-white' : 'text-gray-400'}`}>
                    {day}
                  </span>
                  <div className="space-y-1">
                    {apps.map(a => (
                      <div key={a.id} className="text-[10px] leading-tight">
                        <p className="text-gray-500">{a.time}</p>
                        <p className="text-purple-400 font-medium truncate">{a.company}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── List / Table View ────────────────────────────────────────────────────────
function ListView({ appointments, onEditView, onDelete }: {
  appointments: Appointment[];
  onEditView: (a: Appointment) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-[#13131f] border border-white/8 rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-white/8">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Details</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left py-3 px-5 text-xs text-gray-500 font-medium">Client</th>
            <th className="text-left py-3 px-5 text-xs text-gray-500 font-medium">Compny</th>
            <th className="text-left py-3 px-5 text-xs text-gray-500 font-medium">Date & Time</th>
            <th className="text-left py-3 px-5 text-xs text-gray-500 font-medium">Type</th>
            <th className="text-left py-3 px-5 text-xs text-gray-500 font-medium">Duration</th>
            <th className="text-left py-3 px-5 text-xs text-gray-500 font-medium">Status</th>
            <th className="text-left py-3 px-5 text-xs text-gray-500 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-5">
                <p className="text-sm font-semibold text-white">{a.clientName}</p>
                <p className="text-xs text-gray-400">{a.clientEmail}</p>
              </td>
              <td className="py-3 px-5 text-sm font-semibold text-white">{a.company}</td>
              <td className="py-3 px-5">
                <p className="text-sm text-white">{a.date}</p>
                <p className="text-xs text-gray-400">{a.time}</p>
              </td>
              <td className="py-3 px-5 text-sm text-gray-300">{a.type}</td>
              <td className="py-3 px-5 text-sm text-gray-300">{a.duration}</td>
              <td className="py-3 px-5">
                <span className={`text-sm font-medium ${statusColor(a.status)}`}>{a.status}</span>
              </td>
              <td className="py-3 px-5">
                <ActionDropdown
                  onEditView={() => onEditView(a)}
                  onDelete={() => onDelete(a.id)}
                  onAddNotes={() => onEditView(a)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AppointmentSchedulingPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [showNewForm, setShowNewForm] = useState(false);
  const [editAppointment, setEditAppointment] = useState<Appointment | null>(null);

  const handleDelete = (id: number) => setAppointments(prev => prev.filter(a => a.id !== id));
  const handleUpdate = (updated: Appointment) =>
    setAppointments(prev => prev.map(a => a.id === updated.id ? updated : a));
  const handleAdd = (a: Appointment) => setAppointments(prev => [...prev, a]);

  const filtered = appointments.filter(a => {
    const matchesSearch =
      a.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || a.status === statusFilter;
    const matchesClient = clientFilter === 'All Clients' || a.company === clientFilter;
    return matchesSearch && matchesStatus && matchesClient;
  });

  const counts = {
    Scheduled: appointments.filter(a => a.status === 'Scheduled').length,
    Completed: appointments.filter(a => a.status === 'Completed').length,
    Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
    'No-show': appointments.filter(a => a.status === 'No-show').length,
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="consultancy" />

      <div className="flex-1 flex flex-col overflow-auto border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Consultancy Management" />

        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {showNewForm ? (
            /* ── New Appointment Full-Page Form ── */
            <NewAppointmentForm
              onBack={() => setShowNewForm(false)}
              onSave={(a) => { handleAdd(a); setShowNewForm(false); }}
            />
          ) : (
            <>
              <h5 className="text-xl font-bold text-white">Appointment Scheduling</h5>

              {/* Stat Cards */}
              <div className="flex gap-4">
                <StatCard
                  borderColor="border-purple-300/20"
                  icon={
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  }
                  label="Scheduled"
                  count={counts.Scheduled}
                />
                <StatCard
                borderColor="border-purple-300/20"
                  icon={
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" stroke="#22c55e" />
                      <path stroke="#22c55e" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                    </svg>
                  }
                  label="Completed"
                  count={counts.Completed}
                />
                <StatCard
                   borderColor="border-purple-300/20"
                  icon={
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" stroke="#ef4444" />
                      <path stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                  }
                  label="Cancelled"
                  count={counts.Cancelled}
                />
                <StatCard
                   borderColor="border-purple-300/20"
                  icon={
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" stroke="#eab308" />
                      <path stroke="#eab308" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4M12 16h.01" />
                    </svg>
                  }
                  label="No-show"
                  count={counts['No-show']}
                />
              </div>

              {/* Filters + Toggle + New Appointment */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Search */}
                <div className="relative">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search Appointments"
                    className="bg-[#13131f] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/50 transition-colors w-52"
                  />
                </div>

                {/* Status filter */}
                <CustomDropdown
                  value={statusFilter === 'All Statuses' ? '' : statusFilter}
                  options={['All Statuses', ...STATUSES]}
                  onChange={v => setStatusFilter(v)}
                  placeholder="All Statuses"
                  icon={
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h4" />
                    </svg>
                  }
                />

                {/* Client filter */}
                <CustomDropdown
                  value={clientFilter === 'All Clients' ? '' : clientFilter}
                  options={['All Clients', ...CLIENTS]}
                  onChange={v => setClientFilter(v)}
                  placeholder="All Clients"
                  icon={
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                />

                <div className="ml-auto flex items-center gap-2">
                  {/* Calendar / List toggle */}
                  <div className="flex items-center gap-1 bg-[#13131f] border border-white/10 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('calendar')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </button>
                  </div>

                  {/* New Appointment button — opens full-page form */}
                  <button
                    onClick={() => setShowNewForm(true)}
                    className="flex items-center gap-2 bg-[#0d0d1f] border border-purple-500/60 hover:bg-purple-600/20 text-white text-sm px-4 py-2 rounded-xl transition-colors shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                  >
                   <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
          </svg>
                    New Appointment
                  </button>
                </div>
              </div>

              {/* Calendar or List */}
              {viewMode === 'calendar' ? (
                <CalendarView appointments={filtered} />
              ) : (
                <ListView
                  appointments={filtered}
                  onEditView={a => setEditAppointment(a)}
                  onDelete={handleDelete}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Edit/View Modal */}
      {editAppointment && (
        <EditViewModal
          appointment={editAppointment}
          onClose={() => setEditAppointment(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

