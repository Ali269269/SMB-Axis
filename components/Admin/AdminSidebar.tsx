'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';

// Icons
const OverviewIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const AnalyticsIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const WorkflowIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const AdminIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const TeamIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ConsultIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const ContentIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);
const EmailIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const CareerIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const SettingsIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
);
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// ─── Sub-items with animated dot ──────────────────────────────────────────────
function DropdownSubItems({
  items,
  currentPath,
}: {
  items: { label: string; path: string }[];
  currentPath: string;
}) {
  const router = useRouter();
  const activeIndex = items.findIndex((item) => currentPath.startsWith(item.path));

  // dot top offset: each item is ~36px tall
  const dotTop = activeIndex >= 0 ? activeIndex * 36 + 10 : -999;

  return (
    <div className="relative ml-4 mt-1 mb-1">
      {/* Vertical line */}
      <div className="absolute left-2 top-0 bottom-0 w-px bg-purple-700/50" />

      {/* Animated dot */}
      {activeIndex >= 0 && (
        <div
          className="absolute left-[5px] w-2 h-2 rounded-full bg-purple-500 transition-all duration-300 z-10"
          style={{ top: `${dotTop}px` }}
        />
      )}

      {/* Sub-items */}
      <div className="flex flex-col">
        {items.map((item, i) => {
          const isActive = currentPath.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`text-left pl-7 pr-3 py-2.5 text-sm rounded-lg transition-colors h-9 flex items-center ${
                isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Nav Item with optional dropdown ──────────────────────────────────────────
function NavItem({
  icon,
  label,
  path,
  active = false,
  subItems,
  currentPath,
}: {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
  subItems?: { label: string; path: string }[];
  currentPath: string;
}) {
  const router = useRouter();
  const hasDropdown = subItems && subItems.length > 0;

  // Auto-open if any sub-item matches current path
  const isSubActive = hasDropdown
    ? subItems.some((s) => currentPath.startsWith(s.path))
    : false;

  const [open, setOpen] = useState(isSubActive);

  const handleClick = () => {
    if (hasDropdown) {
      setOpen((p) => !p);
    } else {
      router.push(path);
    }
  };

  return (
    <div>
    <button
  onClick={handleClick}
  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
    active || isSubActive
      ? 'bg-[#261341] text-white'
      : 'text-gray-400 hover:text-white hover:bg-[#1e1e2e]'
  }`}
>
  {/* LEFT SIDE */}
  <span className="flex items-center gap-3 flex-1 min-w-0">
    {icon}
    <span className="truncate">{label}</span>
  </span>

  {/* RIGHT ARROW */}
  {hasDropdown && <ChevronDown open={open} />}
</button>

      {hasDropdown && open && (
        <DropdownSubItems items={subItems} currentPath={currentPath} />
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
interface AdminSidebarProps {
  activeTab?: string;
}

export default function AdminSidebar({ activeTab = 'overview' }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      icon: <OverviewIcon />,
      label: 'Overview',
      path: '/pages/Admin-Dashboard',
      active: activeTab === 'overview',
    },
    {
      icon: <AnalyticsIcon />,
      label: 'Analytics',
      path: '/pages/Admin-Dashboard/Analytics',
      active: activeTab === 'analytics',
    },
    {
      icon: <WorkflowIcon />,
      label: 'Workflows',
      path: '/pages/Admin-Dashboard/Workflows',
      active: activeTab === 'Workflows',
    },
    {
      icon: <AdminIcon />,
      label: 'Admin Management',
      path: '/pages/Admin-Dashboard/Admin-management',
      active: activeTab === 'Admin Management',
    },
    {
      icon: <TeamIcon />,
      label: 'Team',
      path: '/pages/Admin-Dashboard/Admin-management/Team/manage-team',
      active: activeTab === 'team',
      subItems: [
        { label: 'Manage Team', path: '/pages/Admin-Dashboard/Admin-management/Team/manage-team' },
        { label: 'Our Team', path: '/pages/Admin-Dashboard/Admin-management/Team/our-team' },
      ],
    },
    {
      icon: <ConsultIcon />,
      label: 'Consultancy Management',
      path: '/pages/Admin-Dashboard/consultancy',
      active: activeTab === 'consultancy',
      subItems: [
        { label: 'Appointment Scheduling', path: '/pages/Admin-Dashboard/Consultancy-management/Appointment-scheduling' },
        { label: 'Minutes of Meeting', path: '/pages/Admin-Dashboard/Consultancy-management/Meetings' },
      ],
    },
    {
      icon: <UserIcon />,
      label: 'User Management',
      path: '/pages/Admin-Dashboard/users',
      active: activeTab === 'users',
      subItems: [
        { label: 'Lead & Contacts', path: '/pages/Admin-Dashboard/User-management/Leads' },
        { label: 'Newsletter', path: '/pages/Admin-Dashboard/User-management/Newsletter' },
      ],
    },
    {
      icon: <ContentIcon />,
      label: 'Content Management',
      path: '/pages/Admin-Dashboard/content',
      active: activeTab === 'content',
      subItems: [
        { label: 'Blogs', path: '/pages/Admin-Dashboard/Content-management/Blogs' },
        { label: 'FAQ', path: '/pages/Admin-Dashboard/Content-management/FAQ' },
        { label: 'Case Study', path: '/pages/Admin-Dashboard/Content-management/Case-Study' },
        { label: 'Portfolio', path: '/pages/Admin-Dashboard/Content-management/Portfolio' },
        { label: 'System Pages', path: '/pages/Admin-Dashboard/Content-management/System-Pages' },
      ],
    },
    {
      icon: <EmailIcon />,
      label: 'Email Marketing',
      path: '/pages/Admin-Dashboard/Email-Marketing',
      active: activeTab === 'email',
      subItems: [
        { label: 'Campaigns', path: '/pages/Admin-Dashboard/Email-Marketing/Campaigns' },
        { label: 'Templates', path: '/pages/Admin-Dashboard/Email-Marketing/Templates' },
      ],
    },
    {
      icon: <CareerIcon />,
      label: 'Careers',
      path: '/pages/Admin-Dashboard/careers',
      active: activeTab === 'careers',
      subItems: [
        { label: 'Job Listings', path: '/pages/Admin-Dashboard/careers/listings' },
        { label: 'Applications', path: '/pages/Admin-Dashboard/careers/applications' },
      ],
    },
    {
      icon: <SettingsIcon />,
      label: 'Settings',
      path: '/pages/Admin-Dashboard/settings',
      active: activeTab === 'settings',
    },
  ];

  return (
    <aside className="w-69 shrink-0 bg-[#0c0c18] flex flex-col py-18 px-1 gap-1">
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          {...item}
          currentPath={pathname ?? ''}
        />
      ))}
    </aside>
  );
}