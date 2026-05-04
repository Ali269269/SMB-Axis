'use client';

// SVG Icons
const SearchIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

interface AdminHeaderProps {
  title?: string;
  userName?: string;
  userImage?: string;
}

export default function AdminHeader({
  title = 'Dashboard',
  userName = 'John Doe',
  userImage = '/images/jhon.jpg',
}: AdminHeaderProps) {
  return (
    <header className="flex items-center justify-between px-15 py-3.5  sticky top-0 z-10">
      <div className="absolute bottom-0 left-0  w-272 h-px bg-[#1e1e2e]" />
      <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
        {title}
      </h3>
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white transition-colors">
          <SearchIcon />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <BellIcon />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <img src={userImage} alt="profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="text-sm font-medium text-white">{userName}</span>
        </div>
      </div>
    </header>
  );
}
