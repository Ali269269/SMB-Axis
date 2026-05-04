'use client';

import { useState, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface NewTeamMemberData {
  name: string;
  designation: string;
  description: string;
  imageUrl: string | null;
  imagePosition: { x: number; y: number };
}

// ─── Add Member Form ──────────────────────────────────────────────────────────
export default function AddMemberForm({
  onSave,
  onBack,
}: {
  onSave: (member: NewTeamMemberData) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImageUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!name.trim() || !designation.trim()) return;
    onSave({
      name: name.trim(),
      designation: designation.trim(),
      description: description.trim(),
      imageUrl,
      imagePosition: { x: 0, y: 0 },
    });
  };

  return (
    <>
      {/* Page title */}
      <h5 className="text-2xl font-bold text-white mb-6 ml-10">Add another member</h5>

      {/* Go Back / Save row */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-[#1a1a2e] border border-white/15 text-white text-sm px-2 py-2 ml-25 rounded-full hover:border-white/30 transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Go Back
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 mr-70 bg-[#0d0d1f] border border-purple-500/60 text-white text-sm px-5 py-2 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)]"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save
        </button>
      </div>

      {/* Form card */}
      <div
        className="rounded-2xl  max-w-2xl"
        style={{
          marginLeft:"100px",
          background: '#13131f',
          border: '1px',
          borderImage: 'linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(139,92,246,0.1) 40%, rgba(139,92,246,0.0) 60%, rgba(139,92,246,0.3) 100%) 1',
          borderRadius: '16px',
          outline: '1px solid rgba(139,92,246,0.25)',
        }}
      >
        {/* Use a wrapper div with rounded border using box trick */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: '#13131f',
            boxShadow: '0 0 0 1px rgba(139,92,246,0.35), inset 0 0 0 1px rgba(139,92,246,0.1)',
          }}
        >
          <h5 className="text-xl font-semibold text-white mb-6">Enter Details</h5>

          {/* Upload Image */}
          <div className="mb-6">
            <p className="text-sm text-gray-300 mb-3">Upload Image</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-full bg-[#1e1e30] border border-white/15 flex items-center justify-center hover:border-purple-500/50 transition-colors overflow-hidden"
            >
              {imageUrl ? (
                <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>

          {/* Name + Designation row */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Add name <span className="text-red-400">*</span>
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#0e0e1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Add Designation <span className="text-red-400">*</span>
              </label>
              <input
                value={designation}
                onChange={e => setDesignation(e.target.value)}
                className="w-full bg-[#0e0e1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter Text"
              rows={5}
              className="w-full bg-[#0e0e1c] border border-white/10 rounded-[14px] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}

