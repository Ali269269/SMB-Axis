'use client';

import { useState, useRef } from 'react';
import {useRouter} from 'next/navigation';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';
import AddMemberForm, { NewTeamMemberData } from '@/components/Admin/AddMemberForm';
import { useSearchParams } from 'next/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────
interface TeamMember {
  id: number;
  name: string;
  designation: string;
  description: string;
  imageUrl: string | null;
  imagePosition: { x: number; y: number };
}

// ─── Mock Data (initial members matching the Figma) ───────────────────────────
const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Simo Berrada',
    designation: 'CEO & Founder of the SMB Axis.',
    description: 'Simo defines strategy, shapes product decisions, and guides the team inside your digital genie universe.',
    imageUrl: null,
    imagePosition: { x: 0, y: 0 },
  },
  {
    id: 2,
    name: 'Rida Hasan',
    designation: 'Creativity & Design Lead',
    description: 'Rida designs with celestial intuition, blending form and feeling into every pixel. Her visuals don\'t just guide, they glow.',
    imageUrl: null,
    imagePosition: { x: 0, y: 0 },
  },
  {
    id: 3,
    name: 'Suleman Musarrat',
    designation: 'Mern Stack Developer',
    description: 'Suleman builds Node and TypeScript backend, maintains stable PostgreSQL systems, and delivers reliable API work within your digital genie universe.',
    imageUrl: null,
    imagePosition: { x: 0, y: 0 },
  },
];

// ─── Image Frame (drag to reposition) ────────────────────────────────────────
function MemberCard({
  member,
  onEdit,
  onImageChange,
  onPositionChange,
}: {
  member: TeamMember;
  onEdit: (id: number, field: 'name' | 'designation' | 'description', value: string) => void;
  onImageChange: (id: number, url: string) => void;
  onPositionChange: (id: number, pos: { x: number; y: number }) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [editingField, setEditingField] = useState<'name' | 'designation' | 'description' | null>(null);
  const [editValue, setEditValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // Drag to reposition image inside frame
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!member.imageUrl) return;
    setDragging(true);
    setDragStart({ x: e.clientX - member.imagePosition.x, y: e.clientY - member.imagePosition.y });
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    // Clamp so image doesn't leave frame too far
    const clamped = {
      x: Math.max(-80, Math.min(80, newX)),
      y: Math.max(-80, Math.min(80, newY)),
    };
    onPositionChange(member.id, clamped);
  };

  const handleMouseUp = () => setDragging(false);

  const startEdit = (field: 'name' | 'designation' | 'description') => {
    setEditingField(field);
    setEditValue(member[field]);
  };

  const commitEdit = () => {
    if (editingField) {
      onEdit(member.id, editingField, editValue);
      setEditingField(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onImageChange(member.id, ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[#13131f] border border-purple-500/30 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all">
      {/* Image frame */}
      <div
        ref={frameRef}
        className="relative w-full h-64 bg-[#0e0e1c] overflow-hidden cursor-move select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            draggable={false}
           className="absolute w-full h-full object-contain pointer-events-none"
            style={{
              transform: `translate(${member.imagePosition.x}px, ${member.imagePosition.y}px)`,
              transition: dragging ? 'none' : 'transform 0.1s',
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}

        {/* Move icon top-left */}
        <div className="absolute top-3 left-3 w-7 h-7 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4M8 15l4 4 4-4M9 8l-4 4 4 4M15 8l4 4-4 4" />
          </svg>
        </div>

        {/* Edit image button top-right */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute top-3 right-3 w-7 h-7 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-purple-600/60 transition-colors"
        >
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Name */}
        <div className="flex items-center justify-between gap-2">
          {editingField === 'name' ? (
            <input
              autoFocus
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={e => e.key === 'Enter' && commitEdit()}
              className="flex-1 bg-transparent border-b border-purple-500/50 text-white text-base font-bold outline-none pb-0.5"
            />
          ) : (
            <p className="text-base font-bold text-white flex-1">{member.name}</p>
          )}
          <button onClick={() => startEdit('name')} className="text-gray-500 hover:text-purple-400 transition-colors shrink-0">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        {/* Designation */}
        <div className="flex items-center justify-between gap-2">
          {editingField === 'designation' ? (
            <input
              autoFocus
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={e => e.key === 'Enter' && commitEdit()}
              className="flex-1 bg-transparent border-b border-purple-500/50 text-gray-400 text-xs outline-none pb-0.5"
            />
          ) : (
            <p className="text-xs text-gray-400 flex-1">{member.designation}</p>
          )}
          <button onClick={() => startEdit('designation')} className="text-gray-500 hover:text-purple-400 transition-colors shrink-0">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <div className="flex items-start justify-between gap-2">
          {editingField === 'description' ? (
            <textarea
              autoFocus
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={commitEdit}
              rows={3}
              className="flex-1 bg-transparent border border-purple-500/30 rounded-lg text-gray-300 text-xs outline-none p-1.5 resize-none"
            />
          ) : (
            <p className="text-xs text-gray-300 leading-relaxed flex-1">{member.description}</p>
          )}
          <button onClick={() => startEdit('description')} className="text-gray-500 hover:text-purple-400 transition-colors shrink-0 mt-0.5">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OurTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);

  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
const [showAddForm, setShowAddForm] = useState(searchParams.get('addMember') === 'true');

  const CARDS_PER_PAGE = 3;
  const totalPages = Math.ceil(members.length / CARDS_PER_PAGE);
  const paginatedMembers = members.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  const handleAddMember = (data: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = { id: Date.now(), ...data };
    setMembers(prev => [...prev, newMember]);
    setCurrentPage(Math.ceil((members.length + 1) / CARDS_PER_PAGE));
    setShowAddForm(false);
  };

  const handleEdit = (id: number, field: 'name' | 'designation' | 'description', value: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleImageChange = (id: number, url: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, imageUrl: url, imagePosition: { x: 0, y: 0 } } : m));
  };

  const handlePositionChange = (id: number, pos: { x: number; y: number }) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, imagePosition: pos } : m));
  };

 const router=useRouter();

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="team" />

      <div className="flex-1 flex flex-col overflow-auto border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Our Team" />

        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {showAddForm ? (
            <AddMemberForm onSave={handleAddMember} onBack={() => setShowAddForm(false)} />
          ) : (
            <>
              {/* Top bar: Tabs + Add Member */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 bg-[#13131f] border border-white/10 rounded-xl p-1 w-fit">
                  <button
                    onClick={() => router.push('/pages/Admin-Dashboard/Admin-management/Team/manage-team')}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-gray-400 hover:text-white"
                  >
                    Manage Team
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-purple-600 text-white"
                  >
                    Our Team
                  </button>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 bg-[#0d0d1f] border border-purple-500 hover:border-purple-500 text-white text-sm px-4 py-2.5 rounded-xl transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
          </svg>
                  Add Member
                </button>
              </div>

              {/* Member Cards Grid */}
              {members.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 opacity-30">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <p className="text-sm">No team members yet. Add your first member!</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-5">
                  {paginatedMembers.map(member => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      onEdit={handleEdit}
                      onImageChange={handleImageChange}
                      onPositionChange={handlePositionChange}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-sm text-gray-400">
                    {currentPage} of {String(totalPages).padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
