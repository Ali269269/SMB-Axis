import Image from "next/image";

export default function BlogPage() {
  return (
    <div className="bg-[#0b0f1a] text-white min-h-screen">

      {/* HERO SECTION */}
      <div className="relative h-[420px] w-full flex items-center">

        {/* Background Image (Replace later) */}
        <div className="absolute inset-0 bg-[url('/images/blog.jpg')] bg-cover bg-center"></div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0b0f1a]"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Blogs & Insight
          </h1>

          <p className="text-gray-300 mb-6">
            Home / Blogs
          </p>

          {/* SEARCH + FILTER */}
          <div className="flex flex-wrap items-center gap-4">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search"
              className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full w-[260px] focus:outline-none"
            />

            {/* FILTERS */}
            <div className="flex gap-3">
              <button className="px-4 py-1 rounded-full bg-white text-black text-sm font-medium">
                All
              </button>
              <button className="px-4 py-1 rounded-full bg-white/10 text-gray-300 text-sm">
                Automation
              </button>
              <button className="px-4 py-1 rounded-full bg-white/10 text-gray-300 text-sm">
                Operations
              </button>
              <button className="px-4 py-1 rounded-full bg-white/10 text-gray-300 text-sm">
                Security
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* FEATURED BLOG CARD */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-purple-700/40 to-purple-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <span className="text-sm text-gray-300">John Doe</span>
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              Artificial Intelligence Beyond Imaginations
            </h2>

            <p className="text-gray-300 text-sm mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <button className="text-purple-300 hover:underline text-sm">
              Read More →
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="mt-6 md:mt-0">
            <div className="w-[180px] h-[180px] bg-gray-500 rounded-xl"></div>
          </div>

        </div>
      </div>

      {/* BLOG CARDS GRID */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pb-20 grid md:grid-cols-3 gap-6">

        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:shadow-xl transition"
          >
            <div className="h-40 bg-gray-600 rounded-lg mb-4"></div>

            <h3 className="text-lg font-semibold mb-2">
              Blog Title {item}
            </h3>

            <p className="text-gray-400 text-sm mb-3">
              Short description of the blog post goes here...
            </p>

            <button className="text-purple-400 text-sm hover:underline">
              Read More →
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}