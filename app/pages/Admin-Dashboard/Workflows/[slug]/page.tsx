'use client';

import { useState, useRef } from 'react';
import {useRouter} from 'next/navigation';
import { useParams } from 'next/navigation';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ─────────────────────────────────────────────────────────────────────
type ClientType = 'individual' | 'company';
type TaskStatus = 'Completed' | 'In Progress' | 'Not Started' | 'Paused';

interface AssignedTask {
  id: number;
  text: string;
  status: TaskStatus;
}

interface TaskGroup {
  date: string;
  tasks: AssignedTask[];
}

interface Resource {
  id: number;
  name: string;
  role: string;
  initial: string;
  color: string;
  taskGroups: TaskGroup[];
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const SERVICES = [
  'Identity & Presence System',
  'Security & Governance',
  'Demand Generation System',
  'Enablement & Training',
  'FinTech & Blockchain Module',
  'AI & Data Layer',
  'Broker Digital Presence',
  'Paid Lead Engine',
  'Lead Capture & Routing',
  'Broker Trust & Security',
  'AI Follow-Up & Qualification',
];

const ALL_RESOURCES: Resource[] = [
  { id: 1, name: 'Rida Hasan', role: 'Designer', initial: 'R', color: 'bg-purple-600', taskGroups: [] },
  { id: 2, name: 'Suleman Musarrat', role: 'Developer', initial: 'S', color: 'bg-green-600', taskGroups: [] },
  { id: 3, name: 'Laiba Ijaz', role: 'Designer', initial: 'L', color: 'bg-pink-600', taskGroups: [] },
  { id: 4, name: 'Muhammad Arish', role: 'Developer', initial: 'M', color: 'bg-blue-600', taskGroups: [] },
  { id: 5, name: 'Muhaiman Mughal', role: 'Manager', initial: 'M', color: 'bg-orange-600', taskGroups: [] },
  { id: 6, name: 'Mrs. Husna', role: 'Social Media Strategist', initial: 'H', color: 'bg-yellow-500', taskGroups: [] },
];

// ─── Status Pill ───────────────────────────────────────────────────────────────
function statusStyle(status: TaskStatus) {
  switch (status) {
    case 'Completed':   return 'bg-green-500/20 text-green-400 border border-green-500/30';
    case 'In Progress': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
    case 'Not Started': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
    case 'Paused':      return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
  }
}

// ─── Assign Task Modal ─────────────────────────────────────────────────────────
function AssignTaskModal({
  resource,
  onClose,
  onSave,
}: {
  resource: Resource;
  onClose: () => void;
  onSave: (resource: Resource) => void;
}) {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const [inputs, setInputs] = useState<string[]>(['', '', '']);
  const [savedGroups, setSavedGroups] = useState<TaskGroup[]>(resource.taskGroups);

  const addInput = () => setInputs((p) => [...p, '']);
  const updateInput = (i: number, val: string) => {
    setInputs((p) => p.map((v, idx) => (idx === i ? val : v)));
  };

  const handleSave = () => {
    const validTasks = inputs
      .filter((t) => t.trim())
      .map((t, i) => ({ id: Date.now() + i, text: t, status: 'In Progress' as TaskStatus }));

    if (validTasks.length === 0) { onClose(); return; }

    const newGroup: TaskGroup = { date: today, tasks: validTasks };
    const updatedGroups = [...savedGroups, newGroup];
    setSavedGroups(updatedGroups);
    setInputs(['', '', '']);

    const updatedResource: Resource = { ...resource, taskGroups: updatedGroups };
    onSave(updatedResource);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#13131f] border border-white/10 rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-2">Assign Task</p>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${resource.color} flex items-center justify-center font-bold text-sm text-white`}>
                {resource.initial}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{resource.name}</p>
                <p className="text-xs text-gray-400">{resource.role}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#1a1a35] border border-purple-600/50 hover:bg-purple-600/20 text-white text-sm px-4 py-2 rounded-xl transition-colors"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4 max-h-[70vh] overflow-y-auto space-y-5">
          {/* Previously saved groups */}
          {savedGroups.map((group, gi) => (
            <div key={gi}>
              <div className="inline-flex items-center gap-2 bg-[#0e0e1c] border border-white/10 rounded-full px-3 py-1 mb-3">
                <span className="text-xs text-gray-400 font-medium">Date:</span>
                <span className="text-xs text-white">{group.date}</span>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="grid grid-cols-[60px_1fr_120px] gap-2 text-xs text-gray-500 font-medium mb-2 px-1">
                <span>Sr. No.</span><span>Task</span><span>Status</span>
              </div>
              {group.tasks.map((task, ti) => (
                <div key={task.id} className="grid grid-cols-[60px_1fr_120px] gap-2 items-center py-2 border-b border-white/5 px-1">
                  <span className="text-xs text-gray-400">{String(ti + 1).padStart(2, '0')}</span>
                  <span className="text-xs text-gray-200">{task.text}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full text-center ${statusStyle(task.status)}`}>{task.status}</span>
                </div>
              ))}
            </div>
          ))}

          {/* New task input area */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
              <span className="font-medium">Date:</span>
              <span className="text-white">{today}</span>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="space-y-3">
              {inputs.map((val, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-purple-500 font-bold text-sm w-4">{i + 1}</span>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => updateInput(i, e.target.value)}
                    className="flex-1 bg-transparent border border-white/10 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Add more */}
          <div className="flex justify-center pt-1">
            <button
              onClick={addInput}
              className="w-9 h-9 rounded-full border border-white/20 hover:border-purple-500/50 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── View Task Modal ───────────────────────────────────────────────────────────
function ViewTaskModal({
  resource,
  onClose,
  onSave,
}: {
  resource: Resource;
  onClose: () => void;
  onSave: (updated: Resource) => void;
}) {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const [localResource, setLocalResource] = useState<Resource>(resource);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newInputs, setNewInputs] = useState<string[]>(['']);

  const addInput = () => setNewInputs((p) => [...p, '']);
  const updateInput = (i: number, val: string) =>
    setNewInputs((p) => p.map((v, idx) => (idx === i ? val : v)));

  const handleAddTasks = () => {
    const validTasks = newInputs
      .filter((t) => t.trim())
      .map((t, i) => ({ id: Date.now() + i, text: t, status: 'In Progress' as TaskStatus }));

    if (validTasks.length === 0) {
      setShowAddSection(false);
      return;
    }

    const newGroup: TaskGroup = { date: today, tasks: validTasks };
    const updatedGroups = [...localResource.taskGroups, newGroup];
    const updatedResource: Resource = { ...localResource, taskGroups: updatedGroups };

    setLocalResource(updatedResource);
    onSave(updatedResource);
    setNewInputs(['']);
    setShowAddSection(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#13131f] border border-white/10 rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-2">Task Details</p>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${localResource.color} flex items-center justify-center font-bold text-sm text-white`}>
                {localResource.initial}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{localResource.name}</p>
                <p className="text-xs text-gray-400">{localResource.role}</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 max-h-[70vh] overflow-y-auto space-y-5">
          {localResource.taskGroups.length === 0 && !showAddSection ? (
            <p className="text-sm text-gray-400 text-center py-6">No tasks assigned yet.</p>
          ) : (
            localResource.taskGroups.map((group, gi) => (
              <div key={gi}>
                <div className="inline-flex items-center gap-2 bg-[#0e0e1c] border border-white/10 rounded-full px-3 py-1 mb-3">
                  <span className="text-xs text-gray-400 font-medium">Date:</span>
                  <span className="text-xs text-white">{group.date}</span>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="grid grid-cols-[60px_1fr_120px] gap-2 text-xs text-gray-500 font-medium mb-2 px-1">
                  <span>Sr. No.</span><span>Task</span><span>Status</span>
                </div>
                {group.tasks.map((task, ti) => (
                  <div key={task.id} className="grid grid-cols-[60px_1fr_120px] gap-2 items-center py-2 border-b border-white/5 px-1">
                    <span className="text-xs text-gray-400">{String(ti + 1).padStart(2, '0')}</span>
                    <span className="text-xs text-gray-200">{task.text}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full text-center ${statusStyle(task.status)}`}>{task.status}</span>
                  </div>
                ))}
              </div>
            ))
          )}

          {/* Inline Add Task Section */}
          {showAddSection && (
            <div className="border border-purple-500/20 bg-purple-500/5 rounded-[12px] p-4 space-y-3">
              <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                <span className="font-medium">Date:</span>
                <span className="text-white">{today}</span>
              </div>
              <div className="space-y-3">
                {newInputs.map((val, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-purple-500 font-bold text-sm w-4">{i + 1}</span>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => updateInput(i, e.target.value)}
                      placeholder="Enter task..."
                      className="flex-1 bg-transparent border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center pt-1">
                <button
                  onClick={addInput}
                  className="w-8 h-8 rounded-full border border-white/20 hover:border-purple-500/50 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleAddTasks}
                  className="flex-1 flex items-center justify-center border border-purple-950 gap-2 bg-[#090920] hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition-colors"
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Tasks
                </button>
                <button
                  onClick={() => { setShowAddSection(false); setNewInputs(['']); }}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Add Task Button */}
          {!showAddSection && (
            <div className="flex justify-center pt-1">
              <button
                onClick={() => setShowAddSection(true)}
                className="w-9 h-9 rounded-full border border-white/20 hover:border-purple-500/50 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all"
                title="Add new task"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Custom Select ─────────────────────────────────────────────────────────────
function CustomSelect({
  options,
  placeholder,
  value,
  onChange,
}: {
  options: string[];
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-left focus:outline-none focus:border-purple-500/50 transition-colors"
      >
        <span className={value ? 'text-white' : 'text-gray-500'}>{value || placeholder}</span>
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-[#1a1a2e] border border-white/10 rounded-[12px] overflow-hidden shadow-xl">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${opt === value ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Resource Select ───────────────────────────────────────────────────────────
function ResourceSelect({
  options,
  placeholder,
  onChange,
}: {
  options: Resource[];
  placeholder: string;
  onChange: (r: Resource) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      setTimeout(() => {
        dropdownRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 10);
    }
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const handleMouseEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  return (
    <div
      className="relative w-48"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between bg-[#0e0e1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-left focus:outline-none transition-colors"
      >
        <span className={selected ? 'text-white' : 'text-gray-500'}>
          {selected || placeholder}
        </span>
        <svg
          width="14" height="14" fill="none" viewBox="0 0 24 24"
          stroke="currentColor"
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-50 top-full mt-1 w-full bg-[#1a1a2e] border border-white/10 rounded-[12px] shadow-xl overflow-hidden"
        >
          {options.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setSelected(r.name);
                onChange(r);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                r.name === selected
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tasks Assigned Table ──────────────────────────────────────────────────────
type FlatTask = { date: string; task: string; resource: string; status: TaskStatus; resourceObj: Resource };

function TasksAssignedTable({ flatTasks, onView }: { flatTasks: FlatTask[]; onView: (r: Resource) => void }) {
  if (flatTasks.length === 0) return null;

  return (
    <div className="bg-[#0e0e1c] border border-white/5 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-semibold tracking-widest text-purple-500 uppercase">Tasks Assigned</p>
        <div className="flex gap-1">
          <button className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 text-xs">‹</button>
          <button className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 text-xs">›</button>
        </div>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-500 uppercase tracking-wide">
            <th className="text-left pb-2 font-medium">Date</th>
            <th className="text-left pb-2 font-medium">Tasks</th>
            <th className="text-left pb-2 font-medium">Resource</th>
            <th className="text-left pb-2 font-medium">Status</th>
            <th className="text-left pb-2 font-medium">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {flatTasks.map((t, i) => (
            <tr key={i}>
              <td className="py-2.5 text-gray-400">{t.date}</td>
              <td className="py-2.5 text-gray-300">{t.task}</td>
              <td className="py-2.5 text-gray-400">{t.resource}</td>
              <td className="py-2.5">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] ${statusStyle(t.status)}`}>{t.status}</span>
              </td>
              <td className="py-2.5">
                {/* No underline on View button */}
                <button
                  onClick={() => onView(t.resourceObj)}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AddNewProjectPage() {
  const router = useRouter();
  const params = useParams();
  const slug = (params?.slug as string) ?? '';

  const [clientType, setClientType] = useState<ClientType>('company');
  const [companyName, setCompanyName] = useState('PCLD');
  const [clientName, setClientName] = useState('Paz');
  const [service, setService] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedCode, setSelectedCode] = useState('+1');
  const [openCode, setOpenCode] = useState(false);

  const [assignedResources, setAssignedResources] = useState<Resource[]>([]);
  const [assignModal, setAssignModal] = useState<Resource | null>(null);
  const [viewModal, setViewModal] = useState<Resource | null>(null);

  const countryCodes = [
    { code: '+1', label: 'US' },
    { code: '+44', label: 'UK' },
    { code: '+92', label: 'PK' },
    { code: '+91', label: 'IN' },
  ];

  const availableResources = ALL_RESOURCES.filter(
    (r) => !assignedResources.find((ar) => ar.id === r.id)
  );

  const handleAddResource = (r: Resource) => {
    setAssignedResources((prev) => [...prev, r]);
  };

  const handleSaveTask = (updated: Resource) => {
    setAssignedResources((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
    setAssignModal(null);
  };

  // Also handle saves coming from ViewTaskModal
  const handleSaveFromView = (updated: Resource) => {
    setAssignedResources((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
    // Keep modal open so admin can continue viewing; update viewModal state too
    setViewModal(updated);
  };

 const flatTasks: FlatTask[] = assignedResources.reduce((acc, r) => {
  r.taskGroups.forEach((g) => {
    g.tasks.forEach((t) => {
      acc.push({
        date: g.date,
        task: t.text,
        resource: r.name,
        status: t.status,
        resourceObj: r,
      });
    });
  });
  return acc;
}, [] as FlatTask[]);

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="Workflows" />

      <div className="flex-1 flex flex-col overflow-auto border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Workflows" />

        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* Page Title Row */}
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-2xl font-bold">Add new project</h5>
              <p className="text-sm text-gray-400 mt-0.5">Select client type</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 bg-[#1a1a2e] border border-white/10 hover:border-white/20 text-white text-sm px-4 py-2 rounded-xl transition-colors"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Go Back
              </button>
              <button
                onClick={() => router.push('/pages/Admin-Dashboard/Workflows')}
                className="flex items-center gap-2 bg-[#090920] hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-xl transition-all duration-300 shadow-[6px_0_18px_rgba(168,85,247,0.35)] hover:shadow-[8px_0_22px_rgba(168,85,247,0.55)]"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save
              </button>
            </div>
          </div>

          {/* Client Type Cards */}
          <div className="grid grid-cols-1 pr-140 gap-4">
            

            <button
              onClick={() => setClientType('company')}
              className={`flex items-center gap-5 p-6 rounded-2xl border text-left transition-all ${
                clientType === 'company'
                  ? 'border-purple-600 bg-purple-600/10'
                  : 'border-white/10 bg-[#13131f] hover:border-white/20'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-white">
                <svg width="45" height="45" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 9V6.5C5 4.5 6.5 3 8.5 3C9.8 3 10.9 3.7 11.5 4.7" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <rect x="3" y="9" width="7" height="6" rx="1.5" fill="#a78bfa" />
                  <rect x="11.5" y="8" width="6" height="8" rx="1.5" fill="#a78bfa" />
                  <rect x="13" y="10.5" width="3" height="1.2" rx="0.6" fill="#ffffff" />
                  <rect x="13" y="13" width="3" height="1.2" rx="0.6" fill="#ffffff" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Company</p>
                <p className="text-sm text-gray-400 mt-0.5">Small businesses, agency, or team etc.</p>
              </div>
            </button>
          </div>

          {/* Project Form */}
          <div className="p-10 pr-30 space-y-5">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Company Name <span className="text-red-400">*</span></label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Client Name <span className="text-red-400">*</span></label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Services Asked <span className="text-red-400">*</span></label>
                <CustomSelect options={SERVICES} placeholder="Select service" value={service} onChange={setService} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Company Phone <span className="text-red-400">*</span></label>
                <div className="relative">
                  <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
                    <div onClick={() => setOpenCode(!openCode)}
                      className="flex items-center gap-1 px-3 py-2.5 border-r border-white/10 text-sm text-gray-400 bg-white/5 cursor-pointer">
                      <span>📞</span>
                      <span>{selectedCode}</span>
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none" />
                  </div>
                  {openCode && (
                    <div className="absolute left-0 mt-1 w-32 bg-[#1a1a2e] border border-white/10 rounded-lg shadow-lg z-50">
                      {countryCodes.map((c) => (
                        <div key={c.code} onClick={() => { setSelectedCode(c.code); setOpenCode(false); }}
                          className="px-3 py-2 text-sm text-white hover:bg-white/10 cursor-pointer">
                          {c.label} ({c.code})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Email Address <span className="text-red-400">*</span></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com"
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Address (Optional)</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (if any)" rows={5}
                className="w-full bg-transparent border border-white/10 rounded-[20px] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors resize-none" />
            </div>
          </div>

          {/* Assign Work */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold">Assign work</h5>

            <div>
              <label className="block text-xs text-gray-400 mb-2">Assign Resources</label>
              <ResourceSelect options={availableResources} placeholder="Select" onChange={handleAddResource} />
            </div>

            {assignedResources.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {assignedResources.map((r) => (
                  <div key={r.id} className="bg-[#0e0e1c] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-purple-500 uppercase mb-2">Resources</p>
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${r.color} flex items-center justify-center font-bold text-sm text-white`}>
                          {r.initial}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{r.name}</p>
                          <p className="text-xs text-gray-400">{r.role}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setAssignModal(r)}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition-colors"
                    >
                      Assign
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <TasksAssignedTable
              flatTasks={flatTasks}
              onView={(r) => setViewModal(r)}
            />
          </div>
        </main>
      </div>

      {assignModal && (
        <AssignTaskModal
          resource={assignModal}
          onClose={() => setAssignModal(null)}
          onSave={handleSaveTask}
        />
      )}

      {viewModal && (
        <ViewTaskModal
          resource={viewModal}
          onClose={() => setViewModal(null)}
          onSave={handleSaveFromView}
        />
      )}
    </div>
  );
}
