'use client';

import { useState, useRef } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
type PageStatus = 'Active' | 'Inactive';

interface SystemPage {
  id: number;
  solution: string;
  status: PageStatus;
  clicks: string;
  updatedOn: string;
}

interface SubItem { title: string; description: string; }
interface CardItem { title: string; description: string; }
interface FaqItem  { question: string; answer: string; }

interface AddPageForm1 {
  mainHeading: string;
  mainDescription: string;
  heading2: string;
  heading2Description: string;
  subHeadings: SubItem[];
  heading3: string;
  pictureHeadings: (SubItem & { imageUrl: string | null })[];
}

interface AddPageForm2 {
  heading4: string;
  description4: string;
  cardHeadings: CardItem[];
  faqs: FaqItem[];
  textOverImage: string;
  textOverImageDescription: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_PAGES: SystemPage[] = [
  { id: 1,  solution: 'Identity & Presence System',   status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
  { id: 2,  solution: 'Security & Governance',         status: 'Inactive', clicks: '0',      updatedOn: '2024/08/05' },
  { id: 3,  solution: 'Demand Generation System',      status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
  { id: 4,  solution: 'Enablement & Training',         status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
  { id: 5,  solution: 'FinTech & Blockchain Module',   status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
  { id: 6,  solution: 'AI & Data Layer',               status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
  { id: 7,  solution: 'Broker Digital Presence',       status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
  { id: 8,  solution: 'Paid Lead Engine',              status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
  { id: 9,  solution: 'Lead Capture & Routing',        status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
  { id: 10, solution: 'Broker Trust & Security',       status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
  { id: 11, solution: 'AI Follow-Up & Qualification',  status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
  { id: 12, solution: 'Broker Trust & Security',       status: 'Active',   clicks: '1900 k', updatedOn: '2024/08/05' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function CountedInput({
  label, required, max, value, onChange, placeholder, className = '',
}: {
  label?: string; required?: boolean; max: number; value: string;
  onChange: (v: string) => void; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <p className="text-xs text-gray-300 mb-1.5">
          {label} {required && <span className="text-red-400">*</span>}
        </p>
      )}
      <div className="relative">
        <input
          type="text" value={value}
          onChange={e => onChange(e.target.value.slice(0, max))}
          placeholder={placeholder}
          className="w-full bg-[#0c0c1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors pr-12 max-w-md"
        />
        <span className="absolute left-98 top-1/2 -translate-y-1/2 text-xs text-gray-500">{max - value.length}</span>
      </div>
    </div>
  );
}

function CountedTextarea({
  label, required, max, value, onChange, placeholder, rows = 3, className = '',
}: {
  label?: string; required?: boolean; max: number; value: string;
  onChange: (v: string) => void; placeholder?: string; rows?: number; className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <p className="text-xs text-gray-300 mb-1.5">
          {label} {required && <span className="text-red-400">*</span>}
        </p>
      )}
      <div className="relative">
        <textarea
          value={value} onChange={e => onChange(e.target.value.slice(0, max))}
          placeholder={placeholder} rows={rows}
          className="w-full bg-[#0c0c1a] border border-white/10 rounded-[12px] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors resize-none pr-14"
        />
        <span className="absolute right-3 top-3 text-xs text-gray-500">{max - value.length}</span>
      </div>
    </div>
  );
}

// Arrow nav for repeatable sections
function SectionNav({ index, total, onPrev, onNext }: { index: number; total: number; onPrev: () => void; onNext: () => void; }) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={onPrev} disabled={index === 0}
        className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center transition-colors">
        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button onClick={onNext} disabled={index === total - 1}
        className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center transition-colors">
        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
}

// ─── Action Menu ──────────────────────────────────────────────────────────────
function ActionMenu({ onToggle, onDelete }: { onToggle: () => void; onDelete: () => void; }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)} className="text-gray-400 hover:text-white p-1 transition-colors">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-36 bg-[#1a1a2e] border border-white/10 rounded-md shadow-xl overflow-hidden">
            <button onClick={() => { onToggle(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors border-b border-white/5">
              Toggle Status
            </button>
            <button onClick={() => { onDelete(); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Image Upload Box ─────────────────────────────────────────────────────────
function ImageUpload({ imageUrl, onChange }: { imageUrl: string | null; onChange: (url: string) => void; }) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div onClick={() => ref.current?.click()}
      className="w-50 h-48 mt-3 ml-25 bg-[#0c0c1a] border border-white/10 rounded-md flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition-colors overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile}/>
    </div>
  );
}

// ─── Page 1 Form ──────────────────────────────────────────────────────────────
function FormPage1({
  data, onChange, onGoBack, onNext,
}: {
  data: AddPageForm1;
  onChange: (d: AddPageForm1) => void;
  onGoBack: () => void;
  onNext: () => void;
}) {
  const [subIdx, setSubIdx] = useState(0);
  const [picIdx, setPicIdx] = useState(0);

  const set = <K extends keyof AddPageForm1>(k: K, v: AddPageForm1[K]) => onChange({ ...data, [k]: v });

  const updateSub = (i: number, field: keyof SubItem, val: string) => {
    const arr = [...data.subHeadings];
    arr[i] = { ...arr[i], [field]: val };
    set('subHeadings', arr);
  };

  const updatePic = (i: number, field: string, val: string) => {
    const arr = [...data.pictureHeadings];
    arr[i] = { ...arr[i], [field]: val };
    set('pictureHeadings', arr as typeof data.pictureHeadings);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between shrink-0">
        <button onClick={onGoBack}
          className="flex items-center gap-2 bg-[#1a1a2e] border border-white/15 text-white text-sm px-4 py-2 rounded-full hover:border-white/30 transition-colors">
         <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Go Back
        </button>
        <button onClick={onNext}
          className="flex items-center gap-2 bg-[#12121f] border border-purple-950 text-white text-sm px-5 py-2.5 rounded-full hover:border-purple-500/40 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.25)]">
          Page 2
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {/* Form card */}
      <div className="border border-purple-500/30 rounded-2xl bg-[#0f0f1e] p-6 space-y-5 ">
        {/* Main Heading */}
        <CountedInput label="Main Heading" required max={50} value={data.mainHeading}
          onChange={v => set('mainHeading', v)} placeholder="Enter Title"/>
        <CountedTextarea label="Description" max={200} value={data.mainDescription}
          onChange={v => set('mainDescription', v)} placeholder="Enter Description" rows={5}/>

        {/* Heading 2 */}
        <CountedInput label="Heading 2" required max={50} value={data.heading2}
          onChange={v => set('heading2', v)} placeholder="Enter Title"/>
        <CountedTextarea label="Description" max={100} value={data.heading2Description}
          onChange={v => set('heading2Description', v)} placeholder="Enter Description" rows={3}/>

        {/* Sub-Heading section with arrows */}
        <div className="border border-purple-500/20 rounded-md bg-[#0c0c1a] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-300 font-medium">
              Sub-Heading {subIdx + 1} <span className="text-red-400">*</span>
            </p>
            <SectionNav index={subIdx} total={data.subHeadings.length}
              onPrev={() => setSubIdx(i => i - 1)} onNext={() => setSubIdx(i => i + 1)}/>
          </div>
          <CountedInput max={50} value={data.subHeadings[subIdx]?.title ?? ''}
            onChange={v => updateSub(subIdx, 'title', v)} placeholder="Enter Title"/>
          <CountedTextarea label="Description 1" max={100}
            value={data.subHeadings[subIdx]?.description ?? ''}
            onChange={v => updateSub(subIdx, 'description', v)} placeholder="Enter Description" rows={3}/>
        </div>

        {/* Heading 3 */}
        <CountedInput label="Heading 3" required max={50} value={data.heading3}
          onChange={v => set('heading3', v)} placeholder="Enter Title"/>

        {/* Picture Heading section with arrows */}
        <div className="border border-purple-500/20 rounded-md bg-[#0c0c1a] p-4 space-y-3 max-w-md ">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-300 font-medium">
              Picture Heading {picIdx + 1} <span className="text-red-400">*</span>
            </p>
            <SectionNav index={picIdx} total={data.pictureHeadings.length}
              onPrev={() => setPicIdx(i => i - 1)} onNext={() => setPicIdx(i => i + 1)}/>
          </div>
          <CountedInput max={50} value={data.pictureHeadings[picIdx]?.title ?? ''}
            onChange={v => updatePic(picIdx, 'title', v)} placeholder="Enter Title"/>
          <CountedTextarea label="Description 5" max={100}
            value={data.pictureHeadings[picIdx]?.description ?? ''}
            onChange={v => updatePic(picIdx, 'description', v)} placeholder="Enter Description" rows={3}/>
          <ImageUpload imageUrl={data.pictureHeadings[picIdx]?.imageUrl ?? null}
            onChange={url => updatePic(picIdx, 'imageUrl', url)}/>
        </div>
      </div>
    </div>
  );
}

// ─── Page 2 Form ──────────────────────────────────────────────────────────────
function FormPage2({
  data, onChange, onBack, onSave,
}: {
  data: AddPageForm2;
  onChange: (d: AddPageForm2) => void;
  onBack: () => void;
  onSave: () => void;
}) {
  const [cardIdx, setCardIdx] = useState(0);
  const [faqIdx,  setFaqIdx]  = useState(0);

  const set = <K extends keyof AddPageForm2>(k: K, v: AddPageForm2[K]) => onChange({ ...data, [k]: v });

  const updateCard = (i: number, field: keyof CardItem, val: string) => {
    const arr = [...data.cardHeadings]; arr[i] = { ...arr[i], [field]: val }; set('cardHeadings', arr);
  };
  const updateFaq = (i: number, field: keyof FaqItem, val: string) => {
    const arr = [...data.faqs]; arr[i] = { ...arr[i], [field]: val }; set('faqs', arr);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between shrink-0">
        <button onClick={onBack}
          className="flex items-center gap-2 bg-[#1a1a2e] border border-white/15 text-white text-sm px-4 py-2 rounded-full hover:border-white/30 transition-colors">
           <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Go Back to Page 1
        </button>
        <button onClick={onSave}
          className="flex items-center gap-2 bg-[#0c0c1f] border border-purple-500/60 text-white text-sm px-5 py-2.5 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.25)]">
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
          </svg>
          Save
        </button>
      </div>

      {/* Form card */}
      <div className="border border-purple-500/30 rounded-2xl bg-[#0f0f1e] p-6 space-y-5 ">
        {/* Heading 4 */}
        <CountedInput label="Heading 4" required max={50} value={data.heading4}
          onChange={v => set('heading4', v)} placeholder="Enter Title"/>
        <CountedInput label="Description 4" required max={50} value={data.description4}
          onChange={v => set('description4', v)} placeholder="Description"/>

        {/* Card Headings with arrows */}
        <div className="border border-purple-500/20 rounded-md bg-[#0c0c1a] p-4 space-y-3 max-w-md">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-300 font-medium">
              Card Heading {cardIdx + 1} <span className="text-red-400">*</span>
            </p>
            <SectionNav index={cardIdx} total={data.cardHeadings.length}
              onPrev={() => setCardIdx(i => i - 1)} onNext={() => setCardIdx(i => i + 1)}/>
          </div>
          <CountedInput max={50} value={data.cardHeadings[cardIdx]?.title ?? ''}
            onChange={v => updateCard(cardIdx, 'title', v)} placeholder="Enter Title"/>
          <CountedTextarea label="Description 1" max={100}
            value={data.cardHeadings[cardIdx]?.description ?? ''}
            onChange={v => updateCard(cardIdx, 'description', v)} placeholder="Enter Description" rows={3}/>
        </div>

        {/* FAQ section with arrows */}
        <div className="border border-purple-500/20 rounded-md bg-[#0c0c1a] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-300 font-medium">FAQ's <span className="text-red-400">*</span></p>
              <span className="bg-purple-600 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                NUMBER {faqIdx + 1}
              </span>
            </div>
            <SectionNav index={faqIdx} total={data.faqs.length}
              onPrev={() => setFaqIdx(i => i - 1)} onNext={() => setFaqIdx(i => i + 1)}/>
          </div>
          {/* Question accordion look */}
          <div className="bg-[#1a1a2e] border border-purple-500/20 rounded-md px-4 py-2.5 flex items-center justify-between">
            <input type="text" value={data.faqs[faqIdx]?.question ?? ''}
              onChange={e => updateFaq(faqIdx, 'question', e.target.value.slice(0, 150))}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing eli"
              className="flex-1 bg-transparent text-sm text-gray-300 outline-none placeholder-gray-600"/>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400 shrink-0 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/>
            </svg>
          </div>
          {/* Answer */}
          <div className="bg-[#1a1a2e] border-l-2 border-purple-500/40 rounded-r-md px-4 py-3">
            <textarea value={data.faqs[faqIdx]?.answer ?? ''}
              onChange={e => updateFaq(faqIdx, 'answer', e.target.value.slice(0, 500))}
              placeholder="Lorem ipsum dolor sit amet..."
              rows={3}
              className="w-full bg-transparent text-xs text-gray-400 outline-none resize-none placeholder-gray-600"/>
          </div>
        </div>

        {/* Text over Image */}
        <CountedInput label="Text over Image" required max={50} value={data.textOverImage}
          onChange={v => set('textOverImage', v)} placeholder="Enter Title"/>
        <CountedTextarea label="Description" max={100} value={data.textOverImageDescription}
          onChange={v => set('textOverImageDescription', v)} placeholder="Enter Description" rows={3}/>
      </div>
    </div>
  );
}

// ─── Default form state ───────────────────────────────────────────────────────
const emptyForm1 = (): AddPageForm1 => ({
  mainHeading: '', mainDescription: '',
  heading2: '', heading2Description: '',
  subHeadings: Array.from({ length: 3 }, () => ({ title: '', description: '' })),
  heading3: '',
  pictureHeadings: Array.from({ length: 3 }, () => ({ title: '', description: '', imageUrl: null })),
});

const emptyForm2 = (): AddPageForm2 => ({
  heading4: '', description4: '',
  cardHeadings: Array.from({ length: 3 }, () => ({ title: '', description: '' })),
  faqs: Array.from({ length: 5 }, () => ({ question: '', answer: '' })),
  textOverImage: '', textOverImageDescription: '',
});

// ─── Main Page ────────────────────────────────────────────────────────────────
type ViewMode = 'list' | 'form1' | 'form2';

export default function SystemPagesPage() {
  const [pages, setPages] = useState<SystemPage[]>(INITIAL_PAGES);
  const [view, setView] = useState<ViewMode>('list');
  const [form1, setForm1] = useState<AddPageForm1>(emptyForm1());
  const [form2, setForm2] = useState<AddPageForm2>(emptyForm2());

  const handleToggle = (id: number) => {
    setPages(prev => prev.map(p =>
      p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
    ));
  };
  const handleDelete = (id: number) => setPages(prev => prev.filter(p => p.id !== id));

  const handleSave = () => {
    const newPage: SystemPage = {
      id: Date.now(),
      solution: form1.mainHeading || 'New Page',
      status: 'Active',
      clicks: '0',
      updatedOn: new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
    };
    setPages(prev => [newPage, ...prev]);
    setForm1(emptyForm1());
    setForm2(emptyForm2());
    setView('list');
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="content-system" />

      <div className="flex-1 flex flex-col overflow-hidden border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Content Management" />

        {/* ── LIST VIEW ── */}
        {view === 'list' && (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-white">System Pages</h4>
              <button
                onClick={() => setView('form1')}
                className="flex items-center gap-2 bg-[#0b0b1a] border border-purple-500/60 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.2)]"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                Add Page
              </button>
            </div>

            {/* Table */}
            <div className="border border-white/8 rounded-2xl bg-[#0f0f1e] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left py-4 px-5 text-sm text-gray-400 font-medium">Solutions</th>
                    <th className="text-left py-4 px-5 text-sm text-gray-400 font-medium">Status</th>
                    <th className="text-left py-4 px-5 text-sm text-gray-400 font-medium">Clicks</th>
                    <th className="text-left py-4 px-5 text-sm text-gray-400 font-medium">Updated on</th>
                    <th className="text-left py-4 px-5 text-sm text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map(page => (
                    <tr key={page.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-5 text-sm text-gray-300">{page.solution}</td>
                      <td className="py-3.5 px-5">
                        <span className={`text-sm font-medium ${page.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {page.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-sm text-gray-400">{page.clicks}</td>
                      <td className="py-3.5 px-5 text-sm text-gray-400">{page.updatedOn}</td>
                      <td className="py-3.5 px-5">
                        <ActionMenu onToggle={() => handleToggle(page.id)} onDelete={() => handleDelete(page.id)}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ADD PAGE – FORM PAGE 1 ── */}
        {view === 'form1' && (
          <>
            <div className="px-6 pt-5 shrink-0">
              <h4 className="text-xl font-bold text-white mb-4">Add Page</h4>
            </div>
            <FormPage1
              data={form1}
              onChange={setForm1}
              onGoBack={() => setView('list')}
              onNext={() => setView('form2')}
            />
          </>
        )}

        {/* ── ADD PAGE – FORM PAGE 2 ── */}
        {view === 'form2' && (
          <>
            <div className="px-6 pt-5 shrink-0">
              <h2 className="text-xl font-bold text-white mb-4">Add Page</h2>
            </div>
            <FormPage2
              data={form2}
              onChange={setForm2}
              onBack={() => setView('form1')}
              onSave={handleSave}
            />
          </>
        )}
      </div>
    </div>
  );
}
