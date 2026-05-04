'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ──────────────────────────────────────────────────────────────────
type Role = 'Super Admin' | 'Manager' | 'Marketing Manager' | 'Accountant';

interface Member {
  id: number;
  name: string;
  email: string;
  role: Role;
  access: 'Full' | 'Limited';
  avatarColor: string;
}

interface ModulePermission {
  view: boolean;
  edit: boolean;
}

interface Permissions {
  [module: string]: ModulePermission;
}

// ─── Constants ──────────────────────────────────────────────────────────────
const MODULES = [
  'Overview',
  'Analytics',
  'Workflows',
  'Admin Management',
  'Team Consultancy Management',
  'User Management',
  'Email Marketing',
  'Careers',
  'Settings',
];

// Default permission presets per role
const DEFAULT_PERMISSIONS: Record<Role, Permissions> = {
  'Super Admin': Object.fromEntries(MODULES.map((m) => [m, { view: true, edit: true }])),
  'Manager': Object.fromEntries(
    MODULES.map((m) => [
      m,
      {
        view: true,
        edit: !['Admin Management', 'Settings', 'Careers'].includes(m),
      },
    ])
  ),
  'Marketing Manager': Object.fromEntries(
    MODULES.map((m) => [
      m,
      {
        view: ['Overview', 'Analytics', 'Email Marketing', 'Workflows'].includes(m),
        edit: ['Email Marketing', 'Workflows'].includes(m),
      },
    ])
  ),
  'Accountant': Object.fromEntries(
    MODULES.map((m) => [
      m,
      {
        view: ['Overview', 'Analytics'].includes(m),
        edit: false,
      },
    ])
  ),
};

// ─── Data ───────────────────────────────────────────────────────────────────
const initialMembers: Member[] = [
  { id: 1, name: 'Simo', email: 'simo@gmail.com', role: 'Super Admin', access: 'Full', avatarColor: 'bg-orange-400' },
  { id: 2, name: 'Tom', email: 'tom@gmail.com', role: 'Super Admin', access: 'Full', avatarColor: 'bg-blue-400' },
  { id: 3, name: 'Zain', email: 'zain@gmail.com', role: 'Manager', access: 'Limited', avatarColor: 'bg-yellow-400' },
  { id: 4, name: 'Ali', email: 'ali@gmail.com', role: 'Manager', access: 'Limited', avatarColor: 'bg-blue-300' },
  { id: 5, name: 'June', email: 'june@gmail.com', role: 'Marketing Manager', access: 'Limited', avatarColor: 'bg-green-500' },
  { id: 6, name: 'Henry', email: 'henry@gmail.com', role: 'Accountant', access: 'Limited', avatarColor: 'bg-purple-400' },
];

const roleColors: Record<Role, string> = {
  'Super Admin': 'bg-teal-600 text-white',
  'Manager': 'bg-indigo-600 text-white',
  'Marketing Manager': 'bg-purple-600 text-white',
  'Accountant': 'bg-yellow-700 text-white',
};

// ─── Avatar ─────────────────────────────────────────────────────────────────
function Avatar({ name, color }: { name: string; color: string }) {
  return (
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
      {name.charAt(0)}
    </div>
  );
}

// ─── Role Card ───────────────────────────────────────────────────────────────
function RoleCard({ title, members }: { title: string; members: Member[] }) {
  return (
    <div className="flex-1 min-w-[200px] border border-purple-500 rounded-[12px] bg-[#12121e] p-5">
      <h6 className="text-white font-semibold text-base mb-4 text-center whitespace-nowrap">{title}</h6>
     <div className="w-full h-px bg-purple-500/30 my-3"></div>
      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-3">
            <Avatar name={m.name} color={m.avatarColor} />
           
        
            <div>
              <p className="text-white text-sm font-medium leading-tight">{m.name}</p>
              <p className="text-gray-400 text-xs">{m.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        checked ? 'bg-purple-900' : 'bg-[#1e2a35]'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

// ─── Permissions Panel ────────────────────────────────────────────────────────
function PermissionsPanel({
  role,
  permissions,
  onChange,
}: {
  role: Role;
  permissions: Permissions;
  onChange: (module: string, type: 'view' | 'edit', val: boolean) => void;
}) {
  return (
    <div className="mt-8 border border-white/10 rounded-[12px] bg-[#0d0d1a] overflow-hidden">
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold tracking-widest text-white-400 uppercase">Roles & Permissions</span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#090920] text-white-300 border border-purple-500/25">
            {role}
          </span>
        </div>
       
      </div>

      {/* Scrollable table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-10 whitespace-nowrap  text-white-400 font-medium w-48">User Role</th>
              {MODULES.map((mod) => (
                <th key={mod} className="py-4 px-8 text-center">
                  <span className="text-gray-300 font-medium text-[13px] whitespace-break-spaces leading-tight block">{mod}</span>
                </th>
              ))}
            </tr>
            {/* View / Edit icons row */}
            <tr className="border-b border-white/5 bg-[#0c0c18]">
              <td className="py-3.5 px-8 text-gray-500 text-[12px] whitespace-pre">View / Edit access</td>
              {MODULES.map((mod) => (
                <td key={mod} className="py-2.5 px-3">
                  <div className="flex items-center justify-center gap-3">
                    {/* Eye icon */}
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {/* Edit icon */}
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-white/5 hover:bg-white/[0.015] transition-colors">
              <td className="py-4 px-8 whitespace-nowrap">
                <span className="text-white font-semibold text-sm">{role}</span>
              </td>
              {MODULES.map((mod) => (
                <td key={mod} className="py-4 px-3">
                  <div className="flex items-center justify-center gap-3">
                    <Toggle
                      checked={permissions[mod]?.view ?? false}
                      onChange={() => onChange(mod, 'view', !(permissions[mod]?.view ?? false))}
                    />
                    <Toggle
                      checked={permissions[mod]?.edit ?? false}
                      onChange={() => onChange(mod, 'edit', !(permissions[mod]?.edit ?? false))}
                    />
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AdminManagementPage() {
  const [view, setView] = useState<'list' | 'add'>('list');
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<Role | ''>('');
  const [permissions, setPermissions] = useState<Permissions>({});

  const avatarColors = [
    'bg-orange-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-500',
    'bg-purple-400', 'bg-pink-400', 'bg-red-400', 'bg-teal-500',
  ];

  function handleRoleChange(role: Role | '') {
    setNewRole(role);
    if (role) {
      setPermissions(
        JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS[role as Role]))
      );
    } else {
      setPermissions({});
    }
  }

  function handlePermissionChange(module: string, type: 'view' | 'edit', val: boolean) {
    setPermissions((prev) => ({
      ...prev,
      [module]: { ...prev[module], [type]: val },
    }));
  }

  function handleSave() {
    if (!newName || !newEmail || !newRole) return;
    const access: 'Full' | 'Limited' = newRole === 'Super Admin' ? 'Full' : 'Limited';
    const color = avatarColors[members.length % avatarColors.length];
    setMembers((prev) => [
      ...prev,
      { id: prev.length + 1, name: newName, email: newEmail, role: newRole as Role, access, avatarColor: color },
    ]);
    setNewName('');
    setNewEmail('');
    setNewRole('');
    setPermissions({});
    setView('list');
  }

  const grouped = (role: Role) => members.filter((m) => m.role === role);

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-60 top-0 h-150 w-40 bg-gradient-to-r from-purple-600/5 via-purple-500/10 to-transparent blur-2xl" />
      <AdminSidebar activeTab="Admin Management" />

      <div className="flex-1 flex flex-col overflow-auto border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Admin Management" />

        <div className="flex-1 px-6 py-5">
          {view === 'list' ? (
            <ListView
              members={members}
              grouped={grouped}
              onAddMember={() => setView('add')}
            />
          ) : (
            <AddMemberView
              newName={newName}
              newEmail={newEmail}
              newRole={newRole}
              permissions={permissions}
              setNewName={setNewName}
              setNewEmail={setNewEmail}
              onRoleChange={handleRoleChange}
              onPermissionChange={handlePermissionChange}
              onGoBack={() => { setView('list'); setPermissions({}); setNewRole(''); }}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── List View ───────────────────────────────────────────────────────────────
function ListView({
  members,
  grouped,
  onAddMember,
}: {
  members: Member[];
  grouped: (role: Role) => Member[];
  onAddMember: () => void;
}) {
  return (
    <>
      <div className="flex justify-end mb-5">
        <button
          onClick={onAddMember}
          className="flex items-center gap-2 border border-purple-600 rounded-full px-4 py-2 text-sm text-white hover:bg-purple-600/20 transition-colors shadow-[0_0_12px_rgba(139,92,246,0.3)]"
        >
         <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Add Member
        </button>
      </div>

      <div className="flex gap-4 mb-6 ">
        <RoleCard title="Super Admin" members={grouped('Super Admin')} />
        <RoleCard title="Manager" members={grouped('Manager')} />
        <RoleCard title="Marketing Manager" members={grouped('Marketing Manager')} />
        <RoleCard title="Accountant" members={grouped('Accountant')} />
      </div>

      <div className="border border-white/10 rounded-[15px] bg-[#12121e] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">Details</span>
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 text-sm transition-colors">‹</button>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 text-sm transition-colors">›</button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="text-left py-3 px-5 font-medium">Sr. No.</th>
              <th className="text-left py-3 px-5 font-medium">Name</th>
              <th className="text-left py-3 px-5 font-medium">Email</th>
              <th className="text-left py-3 px-5 font-medium">Role</th>
              <th className="text-left py-3 px-5 font-medium">Access</th>
              <th className="text-left py-3 px-5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={m.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-5 text-gray-400 text-center">{String(i + 1).padStart(2, '0')}</td>
                <td className="py-3 px-5 text-gray-200">{m.name}</td>
                <td className="py-3 px-5 text-gray-400">{m.email}</td>
                <td className="py-3 px-5">
                  <span className={`px-3 py-1 rounded-md text-xs font-medium ${roleColors[m.role]}`}>
                    {m.role}
                  </span>
                </td>
                <td className="py-3 px-5 text-gray-400">{m.access}</td>
                <td className="py-3 px-5">
                  <button className="text-gray-400 hover:text-white transition-colors text-lg leading-none">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ─── Add Member View ─────────────────────────────────────────────────────────
function AddMemberView({
  newName,
  newEmail,
  newRole,
  permissions,
  setNewName,
  setNewEmail,
  onRoleChange,
  onPermissionChange,
  onGoBack,
  onSave,
}: {
  newName: string;
  newEmail: string;
  newRole: Role | '';
  permissions: Permissions;
  setNewName: (v: string) => void;
  setNewEmail: (v: string) => void;
  onRoleChange: (v: Role | '') => void;
  onPermissionChange: (module: string, type: 'view' | 'edit', val: boolean) => void;
  onGoBack: () => void;
  onSave: () => void;
}) {
  const roles: Role[] = ['Super Admin', 'Manager', 'Marketing Manager', 'Accountant'];
const [openRole, setOpenRole] = useState(false);
  return (
    <>
      {/* Top Bar */}
  {/* Top Bar */}
  <div className="flex items-center justify-between">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 bg-[#1a1a2e] border border-white/15 text-white text-sm px-3 py-2 rounded-full hover:border-white/30 transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Go Back
        </button>
       <button
  onClick={onSave}
   className="flex items-center gap-2 bg-[#0d0d1f] border border-purple-500/60 text-white text-sm px-5 py-2 rounded-full hover:bg-purple-600/20 transition-colors"
>
   <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
  Save
</button>
      </div>

      {/* Form Card */}
      <div className="border border-purple-500/30 rounded-[15px] bg-[#12121e] mt-10 p-8">
        <h5 className="text-white text-xl font-semibold mb-6">Add Member</h5>

        <div className="flex gap-5">
          {/* Name */}
          <div className="flex-1">
            <label className="block text-sm text-gray-300 mb-2">
              Add Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-[#0c0c18] border border-white/10 rounded-full px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/60 transition-colors placeholder-gray-600"
            />
          </div>

          {/* Email */}
          <div className="flex-1">
            <label className="block text-sm text-gray-300 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full bg-[#0c0c18] border border-white/10 rounded-full px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/60 transition-colors placeholder-gray-600"
            />
          </div>

          {/* Role — custom styled select */}
          <div className="flex-1 relative">
            <label className="block text-sm text-gray-300 mb-2">
              Select Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
  <button
    type="button"
    onClick={() => setOpenRole(!openRole)}
    className="w-full flex items-center justify-between bg-[#0c0c18] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white"
  >
    {newRole || 'Select a role'}

    <svg
      width="12"
      height="12"
      className={`transition-transform ${openRole ? 'rotate-180' : ''}`}
    >
      <path d="M6 8L1 3h10z" fill="#888" />
    </svg>
  </button>

  {openRole && (
    <div className="absolute top-full mt-2 w-full bg-[#12121e] border border-white/10 rounded-[12px] shadow-lg z-50 overflow-hidden">
      {roles.map((r) => (
        <div
          key={r}
          onClick={() => {
            onRoleChange(r);
            setOpenRole(false);
          }}
          className={`px-4 py-2 text-sm cursor-pointer transition-colors
            ${
              newRole === r
                ? 'bg-purple-600/20 text-white'
                : 'text-gray-300 hover:bg-purple-600/20'
            }`}
        >
          {r}
        </div>
      ))}
    </div>
  )}
</div>
          </div>
        </div>

        {/* ── Permissions Panel (renders when role is selected) ── */}
        {newRole && (
          <PermissionsPanel
            role={newRole as Role}
            permissions={permissions}
            onChange={onPermissionChange}
          />
        )}
      </div>
    </>
  );
}
