'use client';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-[#0c0c18]">
      <div className="w-24 h-24 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.464-1.333-3.232 0L4.082 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Team page not found</h1>
      <p className="text-gray-400 mb-8 max-w-md">The team management page you&apos;re looking for doesn&apos;t exist.</p>
      <a href="/pages/Admin-Dashboard/Admin-management/Team/manage-team" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors">
        Go to Manage Team
      </a>
    </div>
  );
}
