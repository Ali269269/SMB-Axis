'use client';

import { useState, useRef, useEffect } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminHeader from '@/components/Admin/AdminHeader';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Blog {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  views: string;
  imageUrl: string | null;
  description: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  schema: string;
  seoImageUrl: string | null;
}

type PageView = 'list' | 'add' | 'detail';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_BLOGS: Blog[] = [
  { id: 1, title: 'Artificial Intelligence Beyond Imaginations', author: 'John Doe', category: 'Technology', date: '2026/04/18', views: '56.2K Viewers', imageUrl: null, description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p><strong>What Makes Reselling Different – The Process</strong></p><p>1. The No Objection Certificate (NOC)</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>', seoTitle: 'AI Beyond Imaginations', seoDescription: 'Explore AI trends', canonicalUrl: 'https://example.com/ai', schema: '{}', seoImageUrl: null },
  { id: 2, title: 'Advancements in Quantum Computing', author: 'Jane Smith', category: 'Science', date: '2025/11/12', views: '42.7K Viewers', imageUrl: null, description: '<p>Quantum computing is transforming the way we process information at an unprecedented scale.</p><p>Recent breakthroughs in qubit stability have brought practical quantum computers closer to reality than ever before.</p>', seoTitle: 'Quantum Computing', seoDescription: 'Quantum computing advances', canonicalUrl: 'https://example.com/quantum', schema: '{}', seoImageUrl: null },
  { id: 3, title: 'The Future of Renewable Energy', author: 'John Doe', category: 'Energy', date: '2026/01/05', views: '37.4K Viewers', imageUrl: null, description: '<p>Renewable energy sources are rapidly becoming the backbone of global power infrastructure.</p><ul><li>Solar capacity doubled in the last 3 years</li><li>Wind energy now powers 20% of Europe</li><li>Battery storage costs dropped 80% since 2015</li></ul>', seoTitle: 'Renewable Energy Future', seoDescription: 'Renewable energy trends', canonicalUrl: 'https://example.com/energy', schema: '{}', seoImageUrl: null },
  { id: 4, title: 'Exploring the Depths of the Ocean', author: 'Alex Lee', category: 'Nature', date: '2025/07/22', views: '29.1K Viewers', imageUrl: null, description: '<p>The deep ocean remains one of the least explored frontiers on Earth.</p><p>Less than <strong>20%</strong> of the ocean floor has been mapped in detail, making it more mysterious than the surface of Mars.</p>', seoTitle: 'Ocean Depths', seoDescription: 'Ocean exploration', canonicalUrl: 'https://example.com/ocean', schema: '{}', seoImageUrl: null },
  { id: 5, title: 'The Rise of Virtual Reality in Education', author: 'John Doe', category: 'Education', date: '2026/03/30', views: '48.3K Viewers', imageUrl: null, description: '<p>Virtual reality is revolutionizing classrooms and how students learn complex subjects.</p><p>From virtual field trips to interactive 3D anatomy lessons, VR is making education more <em>immersive</em> and engaging.</p>', seoTitle: 'VR in Education', seoDescription: 'Virtual reality education', canonicalUrl: 'https://example.com/vr-edu', schema: '{}', seoImageUrl: null },
  { id: 6, title: 'Biotechnology: A New Era', author: 'Sara K', category: 'Biology', date: '2025/09/14', views: '34.8K Viewers', imageUrl: null, description: '<p>Biotechnology breakthroughs are redefining medicine, agriculture, and environmental science.</p><p>CRISPR gene editing, mRNA vaccines, and synthetic biology are among the most transformative developments of our time.</p>', seoTitle: 'Biotech New Era', seoDescription: 'Biotechnology trends', canonicalUrl: 'https://example.com/biotech', schema: '{}', seoImageUrl: null },
  { id: 7, title: 'Cybersecurity in a Connected World', author: 'John Doe', category: 'Security', date: '2026/02/19', views: '53.5K Viewers', imageUrl: null, description: '<p>As our world becomes more connected, cybersecurity threats grow more sophisticated.</p><ol><li>Phishing attacks account for 80% of breaches</li><li>Zero-day vulnerabilities are sold on dark markets</li><li>AI-powered malware can adapt in real time</li></ol>', seoTitle: 'Cybersecurity', seoDescription: 'Cybersecurity guide', canonicalUrl: 'https://example.com/cyber', schema: '{}', seoImageUrl: null },
  { id: 8, title: 'The Impact of 5G Technology', author: 'John Doe', category: 'Technology', date: '2025/10/28', views: '60.1K Viewers', imageUrl: null, description: '<p>5G is not just faster internet — it is the infrastructure for the next industrial revolution.</p><p>With latency under <strong>1ms</strong>, 5G enables real-time autonomous vehicles, remote surgery, and smart city infrastructure at scale.</p>', seoTitle: '5G Impact', seoDescription: '5G technology impact', canonicalUrl: 'https://example.com/5g', schema: '{}', seoImageUrl: null },
];

// ─── Placeholder Image ────────────────────────────────────────────────────────
function BlogThumb({ imageUrl }: { imageUrl: string | null }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-contain bg-[#0d1b2e]"
      />
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0d1b2e]]">
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400 opacity-70" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    </div>
  );
}

// ─── Action Dropdown ──────────────────────────────────────────────────────────
function ActionMenu({
  onView,
  onDelete,
}: {
  onView: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="text-gray-400 hover:text-white transition-colors p-1"
      >
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-1 w-28 bg-[#1a1a2e] border border-white/10 rounded-[12px] shadow-2xl overflow-hidden">
          <button
            onClick={() => { onView(); setOpen(false); }}
            className="w-full text-left px-4 py-2.5 text-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors font-medium"
          >
            View
          </button>
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-white/5 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Image Upload Box ─────────────────────────────────────────────────────────
function ImageUploadBox({
  label,
  imageUrl,
  onChange,
}: {
  label?: string;
  imageUrl: string | null;
  onChange: (url: string) => void;
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
    <div>
      {label && <p className="text-xs text-gray-300 mb-2">{label} <span className="text-red-400">*</span></p>}
      <div
        onClick={() => ref.current?.click()}
        className="w-26 h-29 rounded-[12px] bg-[#0c0c1a] border border-white/10 flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition-colors overflow-hidden"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── Character Count Input ────────────────────────────────────────────────────
function CountedInput({
  label,
  required,
  max,
  value,
  onChange,
  placeholder,
  className = '',
}: {
  label: string;
  required?: boolean;
  max: number;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs text-gray-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </p>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, max))}
          placeholder={placeholder}
          className="w-full bg-[#0c0c1a] border  border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors pr-12"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{max - value.length}</span>
      </div>
    </div>
  );
}

// ─── Rich Text Editor (contentEditable + execCommand) ────────────────────────
function RichTextEditor({
  value,
  onChange,
  maxLength = 1000,
  placeholder = 'Enter Description',
}: {
  value: string;
  onChange: (html: string) => void;
  maxLength?: number;
  placeholder?: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const isComposing = useRef(false);

  // Sync external value into editor only on mount
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      setCharCount(editorRef.current.innerText.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg ?? undefined);
    syncContent();
  };

  const syncContent = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText;
    if (text.length > maxLength) {
      // Trim to max — crude but reliable
      const html = editorRef.current.innerHTML;
      editorRef.current.innerHTML = html.slice(0, html.length - (text.length - maxLength));
      // Move cursor to end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    setCharCount(Math.min(editorRef.current.innerText.length, maxLength));
    onChange(editorRef.current.innerHTML);
  };

  const handleLink = () => {
    const url = window.prompt('Enter URL:', 'https://');
    if (url) exec('createLink', url);
  };

  type ToolDef = { label: React.ReactNode; title: string; action: () => void; isText?: boolean };

  const tools: ToolDef[] = [
    { label: <strong>B</strong>,  title: 'Bold',            action: () => exec('bold') },
    { label: <em>I</em>,          title: 'Italic',          action: () => exec('italic') },
    { label: <u>U</u>,            title: 'Underline',       action: () => exec('underline') },
    {
      label: (
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/>
          <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/>
        </svg>
      ),
      title: 'Unordered List', action: () => exec('insertUnorderedList'),
    },
    {
      label: (
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/>
          <text x="2" y="8" fontSize="7" fill="currentColor" stroke="none">1.</text>
          <text x="2" y="14" fontSize="7" fill="currentColor" stroke="none">2.</text>
          <text x="2" y="20" fontSize="7" fill="currentColor" stroke="none">3.</text>
        </svg>
      ),
      title: 'Ordered List', action: () => exec('insertOrderedList'),
    },
    {
      label: (
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      ),
      title: 'Align Left', action: () => exec('justifyLeft'),
    },
    {
      label: (
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      ),
      title: 'Align Center', action: () => exec('justifyCenter'),
    },
    {
      label: (
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="9" y1="18" x2="21" y2="18"/>
        </svg>
      ),
      title: 'Align Right', action: () => exec('justifyRight'),
    },
    {
      label: (
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: 'Insert Link', action: handleLink,
    },
    {
      label: <span className="text-base leading-none">—</span>,
      title: 'Horizontal Rule', action: () => exec('insertHorizontalRule'),
    },
  ];

  const showPlaceholder = charCount === 0 && !isFocused;

  return (
    <div>
      {/* Editor area */}
      <div className="relative border border-white/10 rounded-[12px] bg-[#0c0c1a] focus-within:border-purple-500/50 transition-colors">
        {/* Placeholder */}
        {showPlaceholder && (
          <div
            className="absolute top-3 left-4 text-sm text-gray-600 pointer-events-none select-none"
            aria-hidden
          >
            {placeholder}
          </div>
        )}

        {/* contentEditable */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onInput={() => { if (!isComposing.current) syncContent(); }}
          onCompositionStart={() => { isComposing.current = true; }}
          onCompositionEnd={() => { isComposing.current = false; syncContent(); }}
          className="min-h-[220px] max-h-[400px] overflow-y-auto px-4 py-3 text-sm text-white outline-none leading-relaxed
            [&_strong]:font-bold [&_em]:italic [&_u]:underline
            [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
            [&_li]:mb-0.5 [&_a]:text-purple-400 [&_a]:underline
            [&_hr]:border-white/20 [&_hr]:my-2"
          style={{ wordBreak: 'break-word' }}
        />

        {/* Char counter */}
        <div className="absolute top-2 right-3 text-xs text-gray-500 pointer-events-none">
          {maxLength - charCount}
        </div>
      </div>

      {/* Toolbar — below the editor, matching Figma */}
      <div className="mt-2 flex items-center gap-1 flex-wrap p-1.5 bg-[#0c0c1a] border border-white/10 rounded-xl w-fit">
        {tools.map((tool, i) => (
          <button
            key={i}
            type="button"
            title={tool.title}
            onMouseDown={(e) => {
              e.preventDefault(); // keep editor focused
              tool.action();
            }}
            className="w-8 h-8 rounded flex items-center justify-center text-gray-200 hover:bg-white/10 hover:text-white transition-colors text-xs font-bold "
          >
            {tool.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Add Blog Form ────────────────────────────────────────────────────────────
function AddBlogForm({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: (blog: Omit<Blog, 'id' | 'views'>) => void;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoImageUrl, setSeoImageUrl] = useState<string | null>(null);
  const [schema, setSchema] = useState('');

  const handleSave = () => {
    if (!title.trim() || !author.trim()) return;
    // description is now stored as HTML from the rich editor
    onSave({
      title,
      author,
      category,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
      imageUrl,
      description,   // HTML string
      seoTitle,
      seoDescription,
      canonicalUrl,
      schema,
      seoImageUrl,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
    <h4 className="text-lg font-bold text-white">Blogs</h4>
      {/* Top bar */}
      <div className="flex items-center justify-between mt-10">
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
          className="flex items-center gap-2 bg-[#101027] border border-purple-500/60 text-white text-sm px-5 py-2 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.25)]"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save
        </button>
      </div>

      {/* ── Main blog card ── */}
      <div className="border border-purple-500/30 rounded-2xl bg-[#0f0f1e] p-6 space-y-5">
        <h5 className="text-lg font-normal text-white">Add new blog</h5>

        {/* Image + Author + Category row */}
        <div className="flex gap-6 pr-110">
          <ImageUploadBox label="Upload Image" imageUrl={imageUrl} onChange={setImageUrl} />
          <div className="flex-1 flex flex-col gap-4 justify-center">
            <CountedInput label="Author" required max={30} value={author} onChange={setAuthor} placeholder="Enter Name" />
            <CountedInput label="Category" required max={30} value={category} onChange={setCategory} placeholder="Enter Category" />
          </div>
        </div>

        {/* Title */}
       <div className="max-w-xl">
  <CountedInput
    label="Title"
    required
    max={150}
    value={title}
    onChange={setTitle}
    placeholder="Enter Title"
  />
</div>

        {/* Description */}
        <div>
          <p className="text-xs text-gray-300  mb-2">Description</p>
          <RichTextEditor
            value={description}
            onChange={setDescription}
            maxLength={1000}
            placeholder="Enter Description"
          />
        </div>
      </div>

      {/* ── SEO card ── */}
      <div className="border border-purple-500/30 rounded-2xl bg-[#0f0f1e] p-6 space-y-5">
        <h5 className="text-lg font-bold text-white">SEO</h5>

        {/* SEO Title + Canonical URL */}
        <div className="grid grid-cols-2 gap-30">
          <CountedInput label="SEO Title" required max={150} value={seoTitle} onChange={setSeoTitle} placeholder="Enter Title" />
          <CountedInput label="Canonical URL" required max={150} value={canonicalUrl} onChange={setCanonicalUrl} placeholder="Type" />
        </div>

        {/* SEO Description */}
        <div>
          <p className="text-xs text-gray-300 mb-2">SEO Description <span className="text-red-400">*</span></p>
          <div className="relative">
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value.slice(0, 100))}
              placeholder="Enter Description"
              rows={3}
              className="w-full bg-[#0c0c1a] border border-white/10 rounded-[12px] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors resize-none pr-12"
            />
            <span className="absolute right-3 top-3 text-xs text-gray-500">{100 - seoDescription.length}</span>
          </div>
        </div>

        {/* SEO Image Upload */}
        <ImageUploadBox label="Upload Image" imageUrl={seoImageUrl} onChange={setSeoImageUrl} />

        {/* Schema */}
        <div className="w-xl"><CountedInput label="Schema" required max={100} value={schema} onChange={setSchema} placeholder="Type" /></div>
      </div>
    </div>
  );
}

// ─── Blog Detail View ─────────────────────────────────────────────────────────
function BlogDetailView({
  blog,
  onBack,
  onAddBlog,
}: {
  blog: Blog;
  onBack: () => void;
  onAddBlog: () => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
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
          onClick={onAddBlog}
          className="flex items-center gap-2 bg-[#0a0a18] border border-purple-500/60 text-white text-sm px-5 py-2 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.25)]"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Add Blogs
        </button>
      </div>

      {/* Article content */}
      <div className="max-w-3xl space-y-4">
        {/* Title */}
        <h5 className="text-2xl font-bold text-white leading-snug">{blog.title}</h5>

        {/* Author meta */}
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {blog.author.charAt(0)}
          </div>
          <span className="text-gray-300">{blog.author}</span>
          <span>•</span>
          <span>{blog.category}</span>
          <span>•</span>
          <span>{blog.date.replace(/\//g, ' ').replace(/(\d{4}) (\d{2}) (\d{2})/, 'March $3, $1')}</span>
        </div>

        {/* Hero image */}
<div className="w-full max-w-[450px] h-[260px] rounded-2xl overflow-hidden bg-[#1a1a2e] border border-white/5">
  {blog.imageUrl ? (
    <img
      src={blog.imageUrl}
      alt={blog.title}
      className="w-full h-full object-contain bg-[#1a1a2e]"
    />
  ) : (
    <div className="w-full h-full bg-[#1a1a2e]" />
  )}
</div>

        {/* Body text — rendered as rich HTML from the editor */}
        <div
          className="text-sm text-gray-300 leading-relaxed
            [&_strong]:font-bold [&_em]:italic [&_u]:underline
            [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
            [&_li]:mb-1 [&_a]:text-purple-400 [&_a]:underline
            [&_hr]:border-white/20 [&_hr]:my-3
            [&_p]:mb-3 space-y-1"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
    </div>
  );
}

// ─── Blog List View ───────────────────────────────────────────────────────────
function BlogListView({
  blogs,
  onAddBlog,
  onView,
  onDelete,
}: {
  blogs: Blog[];
  onAddBlog: () => void;
  onView: (blog: Blog) => void;
  onDelete: (id: number) => void;
}) {
  const [search, setSearch] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.date.includes(search),
  );

  const featured = filtered[featuredIndex] ?? filtered[0];

  const prevFeatured = () => setFeaturedIndex((p) => (p === 0 ? filtered.length - 1 : p - 1));
  const nextFeatured = () => setFeaturedIndex((p) => (p === filtered.length - 1 ? 0 : p + 1));

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 space-y-5">
      {/* Page title */}
      <h4 className="text-xl font-bold text-white">Blogs</h4>

      {/* Search + Add */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#0f0f1e] border border-white/10 rounded-full px-4 py-2.5 flex-1 max-w-md">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-400 shrink-0">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Title or Date"
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"
          />
        </div>
        <div className="flex-1" />
        <button
          onClick={onAddBlog}
          className="flex items-center gap-2 bg-[#12232] border border-purple-500/60 text-white text-sm font-medium px-7 py-2 rounded-full hover:bg-purple-600/20 transition-colors shadow-[0_0_14px_rgba(139,92,246,0.2)]"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Add Blogs
        </button>
      </div>

      {/* Featured card */}
      {featured && (
        <div className="border border-purple-500/40 rounded-2xl bg-[#0f0f1e] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase">
              Featured
            </span>
            <div className="flex gap-1">
              <button
                onClick={prevFeatured}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextFeatured}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-md overflow-hidden shrink-0">
              <BlogThumb imageUrl={featured.imageUrl} />
            </div>
            <p className="text-sm text-gray-200 font-medium">{featured.title}</p>
          </div>
        </div>
      )}

      {/* Details table */}
      <div className="border border-white/8 rounded-2xl bg-[#0f0f1e] overflow-hidden">
        <div className="px-5 py-3">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Details</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left py-3 px-5 text-sm text-gray-400 font-medium">Image</th>
              <th className="text-left py-3 px-5 text-sm text-gray-400 font-medium">Title</th>
              <th className="text-left py-3 px-5 text-sm text-gray-400 font-medium">Date</th>
              <th className="text-left py-3 px-5 text-sm text-gray-400 font-medium">Views</th>
              <th className="text-left py-3 px-5 text-sm text-gray-400 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-gray-500">No blogs found.</td>
              </tr>
            ) : (
              filtered.map((blog) => (
                <tr key={blog.id} className=" hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-5">
                    <div className="w-13 h-13 rounded-md overflow-hidden">
                      <BlogThumb imageUrl={blog.imageUrl} />
                    </div>
                  </td>
                  <td className="py-3 px-5 text-sm text-gray-300">{blog.title}</td>
                  <td className="py-3 px-5 text-sm text-gray-400">{blog.date}</td>
                  <td className="py-3 px-5 text-sm text-gray-400">{blog.views}</td>
                  <td className="py-3 px-5">
                    <ActionMenu
                      onView={() => onView(blog)}
                      onDelete={() => onDelete(blog.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(INITIAL_BLOGS);
  const [pageView, setPageView] = useState<PageView>('list');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleAddBlog = (data: Omit<Blog, 'id' | 'views'>) => {
    const newBlog: Blog = { id: Date.now(), views: '0 Viewers', ...data };
    setBlogs((prev) => [newBlog, ...prev]);
    setPageView('list');
  };

  const handleDelete = (id: number) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const handleView = (blog: Blog) => {
    setSelectedBlog(blog);
    setPageView('detail');
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c18] text-white">
      <div className="pointer-events-none absolute left-72 top-0 h-96 w-96 bg-purple-600/5 blur-3xl rounded-full" />
      <AdminSidebar activeTab="content-blogs" />

      <div className="flex-1 flex flex-col overflow-hidden border border-white/10 ml-10 rounded-[25px]">
        <AdminHeader title="Content Management" />

        
        

        {pageView === 'list' && (
          <BlogListView
            blogs={blogs}
            onAddBlog={() => setPageView('add')}
            onView={handleView}
            onDelete={handleDelete}
          />
        )}

        {pageView === 'add' && (
          <AddBlogForm
            onBack={() => setPageView('list')}
            onSave={handleAddBlog}
          />
        )}

        {pageView === 'detail' && selectedBlog && (
          <BlogDetailView
            blog={selectedBlog}
            onBack={() => setPageView('list')}
            onAddBlog={() => setPageView('add')}
          />
        )}
      </div>
    </div>
  );
}
