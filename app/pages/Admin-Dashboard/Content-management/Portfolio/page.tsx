'use client';

import { useState, useRef } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
interface PortfolioProject {
  id: number;
  logoUrl: string | null;
  projectName: string;
  image1Url: string | null;
  image2Url: string | null;
}

// ─── Mock seed data ───────────────────────────────────────────────────────────
const INITIAL_PROJECTS: PortfolioProject[] = [
  { id: 1, logoUrl: null, projectName: 'WeeShare',     image1Url: null, image2Url: null },
  { id: 2, logoUrl: null, projectName: 'Gulf Estates', image1Url: null, image2Url: null },
];

// ─── Raw upload box (fixed frame, image never breaks out) ─────────────────────
function UploadBoxRaw({
  imageUrl,
  onChange,
  style,
}: {
  imageUrl: string | null;
  onChange: (url: string) => void;
  style: React.CSSProperties;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div
        onClick={() => ref.current?.click()}
        className="bg-[#1a1a2e] border border-white/10 rounded-[12px] flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition-colors overflow-hidden shrink-0 relative"
        style={style}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center z-10">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </>
  );
}

// ─── Portfolio Card ───────────────────────────────────────────────────────────
function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <div className="border border-purple-500/40 rounded-2xl bg-[#0f0f1e] p-5 mt-10 ml-30 mr-30 hover:border-purple-500/60 transition-all">
      <div className="flex gap-6 items-start">

        {/* Logo + name */}
        <div className="flex flex-col items-center justify-center gap-3 shrink-0" style={{ width: 170 }}>
          {project.logoUrl ? (
            <img src={project.logoUrl} alt={project.projectName} className="w-32 h-32 object-contain" />
          ) : (
            <div className="w-32 h-32 rounded-[12px] bg-[#1a1a2e] border border-white/8 flex items-center justify-center text-gray-600">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
         
        </div>

        {/* Image 1 — portrait, shorter */}
        <div className="shrink-0 rounded-[12px] overflow-hidden relative" style={{ width: 240, height: 290 }}>
          {project.image1Url ? (
            <img
              src={project.image1Url}
              alt="Image 1"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full bg-[#1a1a2e] border border-white/8 rounded-[12px]" />
          )}
        </div>

        {/* Image 2 — portrait, taller */}
        <div className="shrink-0 rounded-[12px] overflow-hidden relative" style={{ width: 220, height: 440 }}>
          {project.image2Url ? (
            <img
              src={project.image2Url}
              alt="Image 2"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full bg-[#1a1a2e] border border-white/8 rounded-[12px]" />
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Add Portfolio Form ───────────────────────────────────────────────────────
function AddPortfolioForm({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: (project: Omit<PortfolioProject, 'id'>) => void;
}) {
  const [logoUrl,      setLogoUrl]      = useState<string | null>(null);
  const [projectName,  setProjectName]  = useState('');
  const [image1Url,    setImage1Url]    = useState<string | null>(null);
  const [image2Url,    setImage2Url]    = useState<string | null>(null);

  const handleSave = () => {
    onSave({ logoUrl, projectName, image1Url, image2Url });
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
    <h4>Portfolio</h4>
      {/* Top bar */}
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
          className="flex items-center gap-2 bg-[#0d0d1f] border border-purple-500/60 text-white text-sm px-6 py-2.5 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.25)]"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save
        </button>
      </div>

      {/* Form card */}
      <div className="border border-purple-500/30 rounded-2xl bg-[#0f0f1e] p-7 space-y-6">
        <h4 className="text-md font-bold text-white">Add new Portfolio Project</h4>

        {/* Three upload boxes */}
        <div className="flex gap-5 items-start">

          {/* Logo — square */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300">Upload Logo <span className="text-red-400">*</span></p>
            <UploadBoxRaw imageUrl={logoUrl} onChange={setLogoUrl} style={{ width: 140, height: 140 }} />
          </div>

          {/* Image 1 — wider, portrait */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300">Image 1 <span className="text-red-400">*</span></p>
            <UploadBoxRaw imageUrl={image1Url} onChange={setImage1Url} style={{ width: 140, height: 140 }} />
          </div>

          {/* Image 2 — wider, taller */}
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300">Image 2 <span className="text-red-400">*</span></p>
            <UploadBoxRaw imageUrl={image2Url} onChange={setImage2Url} style={{ width: 140, height: 140 }} />
          </div>
        </div>

        {/* Project name */}
        
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [projects,     setProjects]     = useState<PortfolioProject[]>(INITIAL_PROJECTS);
  const [view,         setView]         = useState<'list' | 'add'>('list');
  const [search,       setSearch]       = useState('');
  const [currentPage,  setCurrentPage]  = useState(1);
  const [perPage,      setPerPage]      = useState(2);

  const filtered = projects.filter((p) =>
    p.projectName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSave = (data: Omit<PortfolioProject, 'id'>) => {
    setProjects((prev) => [{ id: Date.now(), ...data }, ...prev]);
    setCurrentPage(1);
    setView('list');
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="content-portfolio" />

      <div className="flex-1 flex flex-col overflow-hidden border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Content Management" />

        {view === 'list' ? (
          /* ── LIST VIEW ── */
          <div className="flex-1 flex flex-col px-6 py-5 min-h-0">
            <h3 className="text-xl font-bold text-white mb-4">Portfolio</h3>

            {/* Search + Add */}
            <div className="flex items-center gap-4 mb-5 shrink-0">
              <div className="flex items-center gap-2 bg-[#0f0f1e] border border-white/10 rounded-full px-4 py-2.5 flex-1 max-w-md">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400 shrink-0">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  placeholder="Search by Name or Date"
                  className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"
                />
              </div>
              <div className="flex-1" />
              <button
                onClick={() => setView('add')}
                className="flex items-center gap-2 bg-[#0b0b1b] border border-purple-500/60 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.2)]"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add Portfolio
              </button>
            </div>

            {/* Cards */}
            <div className="shrink-0 space-y-5">
              {paginated.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 opacity-30" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">No portfolio projects found.</p>
                </div>
              ) : (
                paginated.map((project) => (
                  <PortfolioCard key={project.id} project={project} />
                ))
              )}
            </div>

            <div className="flex-1" />

            {/* ── Pagination footer ── */}
            <div className="shrink-0 flex items-center justify-between pt-5 pb-1">

              {/* Showing per page — FUNCTIONAL select */}
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>Showing per Page</span>
                <div className="relative">
                  <select
  value={perPage}
  onChange={handlePerPageChange}
  className="appearance-none bg-purple-700 border border-purple-500/50 rounded-lg pl-3 pr-7 py-1.5 text-sm text-white cursor-pointer outline-none focus:border-purple-500"
>
  <option value={1} className="bg-purple-700 text-white">01</option>
  <option value={2} className="bg-purple-700 text-white">02</option>
  <option value={3} className="bg-purple-700 text-white">03</option>
  <option value={5} className="bg-purple-700 text-white">05</option>
</select>
                  {/* Custom chevron */}
                  <svg
                    width="11" height="11" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2}
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-200"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Arrow pagination */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full bg-[#1a1a3e] border border-purple-500/60 hover:bg-purple-600/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-purple-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <span className="text-sm text-gray-300 min-w-[60px] text-center">
                  {currentPage} of {String(totalPages).padStart(2, '0')}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-full bg-[#1a1a3e] border border-purple-500/60 hover:bg-purple-600/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-purple-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── ADD FORM ── */
          <AddPortfolioForm
            onBack={() => setView('list')}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}