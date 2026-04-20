"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import blogs from "@/app/data/blogs";

export default function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const totalCards = sortedBlogs.length;

  // Detect how many cards to show based on screen width
  useEffect(() => {
    function update() {
      const vw = window.innerWidth;
      if (vw < 640)       setVisibleCount(1);
      else if (vw < 1024) setVisibleCount(2);
      else                setVisibleCount(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, totalCards - visibleCount);

  const goTo = (idx) => {
    // clamp and wrap
    const next = idx < 0 ? maxIndex : idx > maxIndex ? 0 : idx;
    setCurrentIndex(next);
  };

  // How wide each card is as a percentage of the track
  const cardPct = 100 / visibleCount;

  return (
    <section className="w-full py-10 px-6 md:px-12 lg:px-45">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white text-3xl font-bold tracking-tight">
          Our Blogs
        </h3>

        {/* Navigation arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goTo(currentIndex - 1)}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center transition-all duration-200 hover:border-white hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={() => goTo(currentIndex + 1)}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 mb-6">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              height: 6,
              width: i === currentIndex ? 20 : 6,
              background: i === currentIndex ? "#9333ea" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>

      {/* Slider track — overflow hidden, cards translate on currentIndex change */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            // Each card is cardPct% of the outer width; gap is 20px
            // translateX moves by (cardPct% + gap equivalent) per step
            transform: `translateX(calc(-${currentIndex * cardPct}% - ${currentIndex * 20 / visibleCount}px))`,
            gap: "20px",
          }}
        >
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} visibleCount={visibleCount} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ blog, visibleCount }) {
  // Card width = (100% / visibleCount) accounting for gaps between cards
  const gapTotal = 20 * (visibleCount - 1);
  const widthCalc = `calc((100% / ${visibleCount}) - ${gapTotal / visibleCount}px)`;

  // But since the track itself is wider than the viewport, we size relative to the
  // outer container. We pass visibleCount and compute flex-basis.
  return (
    <article
      className="group flex-none rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm
                 transition-all duration-300 hover:border-purple-800/60 hover:bg-white/9 hover:-translate-y-1"
      style={{
        // flex-basis = (100vw-equivalent / visibleCount) minus gap share
        // Using min-width so the card never shrinks
        minWidth: `calc((100% / ${visibleCount}) - ${20 * (visibleCount - 1) / visibleCount}px)`,
        maxWidth: `calc((100% / ${visibleCount}) - ${20 * (visibleCount - 1) / visibleCount}px)`,
      }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ height: visibleCount === 1 ? 220 : 192 }}>
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={visibleCount === 1 ? "100vw" : visibleCount === 2 ? "50vw" : "33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-3 left-3 text-xs font-semibold text-white bg-purple-600/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
          <span>{blog.readTime}</span>
          <span>·</span>
          <span>
            {new Date(blog.date).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            })}
          </span>
        </div>

        <h6 className="text-white font-bold text-sm leading-snug mb-1 line-clamp-2 h-[3.5rem]">
          {blog.title}
        </h6>

        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">
          {blog.excerpt}
        </p>

        <Link
          href={`/data/slug/${blog.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200 group/link"
        >
          Read More
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="transition-transform duration-200 group-hover/link:translate-x-1">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
