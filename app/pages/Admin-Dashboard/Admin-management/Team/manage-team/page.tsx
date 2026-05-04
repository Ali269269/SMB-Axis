'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = 'Designer' | 'Developer' | 'Marketing Manager' | 'Marketing Intern';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  initial: string;
  color: string;
  role: Role;
  hoursThisWeek: number;
  taskProgress: number;
  tasksCompleted: number;
  totalTasks: number;
  activeProjects: string[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_MEMBERS: TeamMember[] = [
  { id: 1, name: 'Simo', email: 'simo@gmail.com', initial: 'S', color: 'bg-purple-600', role: 'Designer', hoursThisWeek: 45, taskProgress: 60, tasksCompleted: 6, totalTasks: 10, activeProjects: ['Atlas Dental Center', 'Bloom Field'] },
  { id: 2, name: 'Tom', email: 'tom@gmail.com', initial: 'T', color: 'bg-purple-500', role: 'Designer', hoursThisWeek: 36, taskProgress: 50, tasksCompleted: 5, totalTasks: 10, activeProjects: ['Atlas Dental Center', 'Bloom Field'] },
  { id: 3, name: 'Zain', email: 'zain@gmail.com', initial: 'Z', color: 'bg-blue-600', role: 'Developer', hoursThisWeek: 45, taskProgress: 20, tasksCompleted: 2, totalTasks: 10, activeProjects: ['Atlas Dental Center', 'Bloom Field'] },
  { id: 4, name: 'Ali', email: 'ali@gmail.com', initial: 'A', color: 'bg-blue-500', role: 'Developer', hoursThisWeek: 45, taskProgress: 50, tasksCompleted: 5, totalTasks: 10, activeProjects: ['Atlas Dental Center', 'Bloom Field'] },
  { id: 5, name: 'June', email: 'june@gmail.com', initial: 'J', color: 'bg-yellow-500', role: 'Marketing Manager', hoursThisWeek: 45, taskProgress: 30, tasksCompleted: 3, totalTasks: 10, activeProjects: ['Atlas Dental Center', 'Bloom Field'] },
  { id: 6, name: 'Henry', email: 'henry@gmail.com', initial: 'H', color: 'bg-orange-500', role: 'Marketing Intern', hoursThisWeek: 45, taskProgress: 60, tasksCompleted: 6, totalTasks: 10, activeProjects: ['Atlas Dental Center', 'Bloom Field'] },
];

// ─── Role Badge ───────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: Role }) {
  const styles: Record<Role, string> = {
    'Designer': 'bg-purple-600 text-white',
    'Developer': 'bg-blue-600 text-white',
    'Marketing Manager': 'bg-yellow-500 text-black',
    'Marketing Intern': 'bg-orange-500 text-white',
  };
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${styles[role]}`}>
      {role}
    </span>
  );
}

// ─── Add Member Form ──────────────────────────────────────────────────────────
function AddMemberForm({
  onSave,
  onBack,
}: {
  onSave: (data: { name: string; email: string; role: Role; hoursThisWeek: number }) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('Designer');
  const [hours, setHours] = useState('');
  const roles: Role[] = ['Designer', 'Developer', 'Marketing Manager', 'Marketing Intern'];

  const handleSave = () => {
    if (!name.trim() || !email.trim()) return;
    onSave({ name: name.trim(), email: email.trim(), role, hoursThisWeek: parseInt(hours) || 0 });
  };

  return (
    <div className="space-y-6">
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
          className="flex items-center gap-2 bg-[#0d0d1f] border border-purple-500/60 text-white text-sm px-5 py-2 rounded-full hover:bg-purple-600/20 transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save
        </button>
      </div>

      <div className="bg-[#13131f] border border-purple-500/30 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Add Member</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Name <span className="text-red-400">*</span></label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Email <span className="text-red-400">*</span></label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as Role)}
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Hours This Week</label>
            <input
              value={hours}
              onChange={e => setHours(e.target.value)}
              type="number"
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Assign Task Modal ────────────────────────────────────────────────────────
function AssignTaskModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const [inputs, setInputs] = useState<string[]>(['', '', '']);

  const addInput = () => setInputs(p => [...p, '']);
  const updateInput = (i: number, val: string) =>
    setInputs(p => p.map((v, idx) => idx === i ? val : v));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#13131f] border border-purple-500/40 rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${member.color} flex items-center justify-center font-bold text-sm text-white`}>
              {member.initial}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{member.name}</p>
              <p className="text-xs text-gray-400">{member.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#0d0d1f] border border-white/10 text-white text-sm px-4 py-2 rounded-xl hover:border-purple-500/50 transition-colors">
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

        {/* Title */}
        <div className="px-6 py-3 border-b border-white/5">
          <p className="text-xs font-bold tracking-widest text-white/50 uppercase">Assign Task</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
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
          <div className="flex justify-center pt-2">
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

// ─── Edit Member Modal ────────────────────────────────────────────────────────
function EditMemberModal({
  member,
  onClose,
  onSave,
}: {
  member: TeamMember;
  onClose: () => void;
  onSave: (m: TeamMember) => void;
}) {
  const [hours, setHours] = useState(String(member.hoursThisWeek));
  const [role, setRole] = useState<Role>(member.role);
  const [projects, setProjects] = useState<string[]>(member.activeProjects);
  const [newProject, setNewProject] = useState('');
  const roles: Role[] = ['Designer', 'Developer', 'Marketing Manager', 'Marketing Intern'];

  const addProject = () => {
    if (newProject.trim()) {
      setProjects(p => [...p, newProject.trim()]);
      setNewProject('');
    }
  };

  const handleSave = () => {
    onSave({ ...member, hoursThisWeek: parseInt(hours) || 0, role, activeProjects: projects });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#13131f] border border-purple-500/40 rounded-2xl w-full max-w-md mx-4 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
          <div>
            <p className="text-base font-bold text-white">{member.name}</p>
            <p className="text-xs text-gray-400">{member.email}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-gray-400">Hours this week</p>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <input
              value={hours}
              onChange={e => setHours(e.target.value)}
              type="number"
              className="bg-transparent text-white text-sm outline-none border-b border-white/10 focus:border-purple-500/50 w-20 pb-1 transition-colors"
            />
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Task Progress</p>
            <p className="text-sm text-white font-medium">{member.taskProgress}%</p>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">Role</p>
            <select
              value={role}
              onChange={e => setRole(e.target.value as Role)}
              className="bg-[#262639] text-white text-xs px-3 py-1.5 rounded-full outline-none border-0 cursor-pointer"
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs text-gray-400">Active Projects</p>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <div className="flex flex-wrap gap-2">
              {projects.map((p, i) => (
                <span key={i} className="flex items-center gap-1 text-xs border border-white/20 rounded-full px-3 py-1 text-gray-300">
                  {p}
                  <button
                    onClick={() => setProjects(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-gray-500 hover:text-red-400 transition-colors ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
              <div className="flex items-center gap-1">
                <input
                  value={newProject}
                  onChange={e => setNewProject(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addProject()}
                  placeholder="Add..."
                  className="bg-transparent border border-white/10 rounded-full px-2 py-1 text-xs text-white outline-none w-20 focus:border-purple-500/50 transition-colors"
                />
                <button
                  onClick={addProject}
                  className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#0d0d1f] border border-white/20 hover:border-purple-500/50 text-white text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Action Dropdown ──────────────────────────────────────────────────────────
function ActionDropdown({ member, onAssign, onEdit, onDelete }: {
  member: TeamMember;
  onAssign: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className="text-gray-400 hover:text-white transition-colors p-1"
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-36 bg-[#1a1a2e] border border-white/10 rounded-[12px] shadow-xl overflow-hidden">
            <button
              onClick={() => { onAssign(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-purple-400 font-semibold hover:bg-purple-600/20 transition-colors border-b border-white/5"
            >
              Assign Task
            </button>
            <button
              onClick={() => { onEdit(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors border-b border-white/5"
            >
              Edit
            </button>
            <button
              onClick={() => { onDelete(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Grid Card ────────────────────────────────────────────────────────────────
function GridCard({ member, onAssign, onEdit, onDelete }: {
  member: TeamMember;
  onAssign: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-[#13131f] border border-white/8 rounded-2xl p-4 relative hover:border-purple-500/30 transition-all">
      <div className="absolute top-4 right-4">
        <RoleBadge role={member.role} />
      </div>

      <div className="flex items-center gap-3 mb-4 pr-24">
        <div className={`w-9 h-9 rounded-full ${member.color} flex items-center justify-center font-bold text-sm text-white shrink-0`}>
          {member.initial}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{member.name}</p>
          <p className="text-xs text-gray-400">{member.email}</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-gray-400">Task Progress</p>
          <span className="text-xs text-purple-400">{member.taskProgress}% Completed</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full">
          <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${member.taskProgress}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-1">{member.tasksCompleted} out of {member.totalTasks} Tasks completed</p>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
            <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
          </svg>
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Active Projects</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {member.activeProjects.map((p, i) => (
            <span key={i} className="text-xs border border-white/15 rounded-full px-2.5 py-0.5 text-gray-300">{p}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-purple-600/20 border border-purple-600/30 rounded-full px-3 py-1">
          <span className="text-sm font-bold text-white">{member.hoursThisWeek}h</span>
          <span className="text-xs text-gray-400">This week</span>
        </div>
        <ActionDropdown member={member} onAssign={onAssign} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}

// ─── List Row ────────────────────────────────────────────────────────────────
function ListRow({ member, index, onAssign, onEdit, onDelete }: {
  member: TeamMember;
  index: number;
  onAssign: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      <td className="py-3 px-4 text-xs text-gray-400">{String(index + 1).padStart(2, '0')}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full ${member.color} flex items-center justify-center font-bold text-xs text-white shrink-0`}>
            {member.initial}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{member.name}</p>
            <p className="text-xs text-gray-400">{member.email}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-white">{member.hoursThisWeek}</td>
      <td className="py-3 px-4 text-sm text-white">{member.taskProgress}%</td>
      <td className="py-3 px-4"><RoleBadge role={member.role} /></td>
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1">
          {member.activeProjects.map((p, i) => (
            <span key={i} className="text-xs border border-white/15 rounded-full px-2 py-0.5 text-gray-300">{p}</span>
          ))}
        </div>
      </td>
      <td className="py-3 px-4">
        <ActionDropdown member={member} onAssign={onAssign} onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub }: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="bg-[#13131f] border border-white/8 rounded-2xl p-5 flex flex-col gap-3 shadow-[inset_4px_4px_10px_rgba(124,58,237,0.3),inset_1px_1px_3px_rgba(124,58,237,0.1),inset_-1px_-1px_2px_rgba(124,58,237,0.1)]">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {sub && <span className="text-xs text-gray-500">{sub}</span>}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ManageTeamPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddForm, setShowAddForm] = useState(false);
  const [assignMember, setAssignMember] = useState<TeamMember | null>(null);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);

  const handleDelete = (id: number) => setMembers(prev => prev.filter(m => m.id !== id));
  const handleEdit = (updated: TeamMember) => setMembers(prev => prev.map(m => m.id === updated.id ? updated : m));

  const colors = ['bg-purple-600', 'bg-blue-600', 'bg-pink-600', 'bg-green-600', 'bg-orange-500', 'bg-yellow-500'];

  const handleAddFormSave = (data: { name: string; email: string; role: Role; hoursThisWeek: number }) => {
    const newMember: TeamMember = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      initial: data.name.trim()[0].toUpperCase(),
      color: colors[members.length % colors.length],
      role: data.role,
      hoursThisWeek: data.hoursThisWeek,
      taskProgress: 0,
      tasksCompleted: 0,
      totalTasks: 10,
      activeProjects: [],
    };
    setMembers(prev => [...prev, newMember]);
    setShowAddForm(false);
  };

  const totalTasks = members.reduce((a, m) => a + m.totalTasks, 0);
  const completedTasks = members.reduce((a, m) => a + m.tasksCompleted, 0);
  const avgCompletion = members.length
    ? Math.round(members.reduce((a, m) => a + m.taskProgress, 0) / members.length)
    : 0;
  

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="team" />

      <div className="flex-1 flex flex-col overflow-auto border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Manage Team" />

        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {showAddForm ? (
            <AddMemberForm onSave={handleAddFormSave} onBack={() => setShowAddForm(false)} />
          ) : (
            <>
              {/* Tab toggle — Manage Team (active) | Our Team */}
              <div className="flex items-center gap-1 bg-[#13131f] border border-white/10 rounded-[10px] p-1 w-fit">
                <button className="px-3 py-2 rounded-lg text-sm font-medium bg-purple-600 text-white transition-all">
                  Manage Team
                </button>
                <button
                  onClick={() => router.push('/pages/Admin-Dashboard/Admin-management/Team/our-team')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-all"
                >
                  Our Team
                </button>
              </div>

              {/* View toggle + Add Member */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 bg-[#13131f] border border-white/10 rounded-[12px] p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </button>
                </div>

              <button
  onClick={() => router.push('/pages/Admin-Dashboard/Admin-management/Team/our-team?addMember=true')}
  className="flex items-center gap-2 border border-purple-600 rounded-full px-4 py-2 text-sm text-white hover:bg-purple-600/20 transition-colors shadow-[0_0_12px_rgba(139,92,246,0.3)]"
>
<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
          </svg>
  Add Member
</button>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-4">
                <StatCard
                  icon={
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                  }
                  label="Total Members"
                  value={String(members.length).padStart(2, '0')}
                />
                <StatCard
                  icon={
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                  }
                  label="Tasks Completed"
                  value={
                    <>
                      <span>{String(completedTasks).padStart(2, '0')}</span>
                      <span className="text-lg text-gray-500">/{totalTasks}</span>
                    </>
                  }
                  sub="Today"
                />
                <StatCard
                  icon={
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                  }
                  label="Completion Rate"
                  value={`${avgCompletion}%`}
                  sub="Today"
                />
              </div>

              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-3 gap-4">
                  {members.map(m => (
                    <GridCard
                      key={m.id}
                      member={m}
                      onAssign={() => setAssignMember(m)}
                      onEdit={() => setEditMember(m)}
                      onDelete={() => handleDelete(m.id)}
                    />
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="bg-[#13131f] border border-white/8 rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/8">
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Details</p>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Sr. No.</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Name & Email</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Hours this week</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Task Progress</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Role</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Active Projects</th>
                        <th className="text-left py-3 px-4 text-xs text-gray-500 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((m, i) => (
                        <ListRow
                          key={m.id}
                          member={m}
                          index={i}
                          onAssign={() => setAssignMember(m)}
                          onEdit={() => setEditMember(m)}
                          onDelete={() => handleDelete(m.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      {assignMember && (
        <AssignTaskModal member={assignMember} onClose={() => setAssignMember(null)} />
      )}
      {editMember && (
        <EditMemberModal
          member={editMember}
          onClose={() => setEditMember(null)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
}
