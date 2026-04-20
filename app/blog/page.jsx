'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ FIX: proper SSR-safe mobile detection with resize support
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filters = ["All", "Automation", "Operations", "Security"];

  const blogs = [
    {
      id: 1,
      slug: "pricing-it-right-how-to-avoid-the-biggest-mistake-sellers-make",
      title: "Artificial Intelligence Beyond Imaginations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor comdo consuls aute irure....",
      date: "2026/04/18",
      views: "56.2K Viewers",
      image: "/images/c1.jpg",
    },
    {
      id: 2,
      slug: "artificial-intelligence-beyond-imaginations-1",
      title: "Artificial Intelligence Beyond Imaginations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor comdo consuls aute irure....",
      date: "2026/04/18",
      views: "56.2K Viewers",
      image: "/images/c2.jpg",
    },
    {
      id: 3,
      slug: "artificial-intelligence-beyond-imaginations-2",
      title: "Artificial Intelligence Beyond Imaginations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor comdo consuls aute irure....",
      date: "2026/04/18",
      views: "56.2K Viewers",
      image: "/images/c3.jpg",
    },
    {
      id: 4,
      slug: "artificial-intelligence-beyond-imaginations-3",
      title: "Artificial Intelligence Beyond Imaginations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor comdo consuls aute irure....",
      date: "2026/04/18",
      views: "56.2K Viewers",
      image: "/images/c2.jpg",
    },
    {
      id: 5,
      slug: "artificial-intelligence-beyond-imaginations-4",
      title: "Artificial Intelligence Beyond Imaginations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor comdo consuls aute irure....",
      date: "2026/04/18",
      views: "56.2K Viewers",
      image: "/images/c1.jpg",
    },
    {
      id: 6,
      slug: "artificial-intelligence-beyond-imaginations-5",
      title: "Artificial Intelligence Beyond Imaginations",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor comdo consuls aute irure....",
      date: "2026/04/18",
      views: "56.2K Viewers",
      image: "/images/c3.jpg",
    },
  ];

  const totalPages = 3;

  return (
    <div
      style={{
        background: "#0b0e1a",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .blog-card {
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: pointer;
        }
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          border-color: rgba(139,92,246,0.35);
        }

        .read-more-btn {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
          padding: 11px 0;
          border-radius: 40px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
          letter-spacing: 0.02em;
          text-align: center;
          display: block;
          text-decoration: none;
        }
        .read-more-btn:hover {
          background: #090920;
          border-color: rgba(139,92,246,0.6);
          box-shadow: 4px 0 8px -3px rgba(139,92,246,0.5);
          transform: translateY(0);
        }

        .filter-btn {
          padding: 7px 22px;
          border-radius: 40px;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .filter-btn.active {
          background: #fff;
          color: #000;
          font-weight: 700;
        }
        .filter-btn.inactive {
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15);
        }
        .filter-btn.inactive:hover {
          background: rgba(255,255,255,0.08);
        }

        .page-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        .page-btn.active {
          background: #5b3fcf;
          color: #fff;
        }
        .page-btn.inactive {
          background: transparent;
          color: rgba(255,255,255,0.6);
        }
        .page-btn.inactive:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }

        .page-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          transition: all 0.2s ease;
          color: rgba(255,255,255,0.7);
        }
        .page-arrow:hover {
          background: rgba(255,255,255,0.14);
          color: #fff;
        }

        .search-input {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          padding: 9px 18px 9px 40px;
          border-radius: 40px;
          width: 220px;
          font-size: 14px;
          font-family: 'Montserrat', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.4); }
        .search-input:focus { border-color: rgba(139,92,246,0.6); }

        .featured-card {
          background: linear-gradient(120deg, rgba(80,40,160,0.55) 0%, rgba(50,20,100,0.45) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          backdrop-filter: blur(16px);
          box-shadow: 0 10px 50px rgba(0,0,0,0.55);
        }

        .dot-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #7c3aed;
          display: inline-block;
          flex-shrink: 0;
        }

        .blog-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        /* ✅ Robot image positioning via CSS */
        .robot-img {
          width: clamp(140px, 20vw, 280px);
          height: clamp(140px, 22vw, 260px);
          object-fit: contain;
          filter: drop-shadow(0 0 30px rgba(139,92,246,0.4));
          position: relative;
          top: 35px;
          left: 95px;
        }

        @media (max-width: 768px) {
          .search-input { width: 100%; }
          .filter-btn { padding: 6px 14px; font-size: 13px; }
          /* ✅ FIX: on mobile, reset robot position so it doesn't overflow */
          .robot-img {
            left: 213px;
            top: 19px;
            width: clamp(100px, 35vw, 160px);
            height: clamp(100px, 35vw, 160px);
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <div
        style={{
          position: "relative",
          minHeight: "360px",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/blog.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(11,14,26,0.75) 0%, rgba(11,14,26,0.9) 60%, #0b0e1a 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 48px 0 48px",
            paddingTop: "80px",
            width: "100%",
          }}
        />
      </div>

      {/* ── BREADCRUMB + TITLE + SEARCH ── */}
      <div style={{ padding: "29px clamp(16px, 5vw, 72px) 0" }}>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "10px",
            marginLeft: "8px",
          }}
        >
          <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
            Home
          </Link>{" "}
          / Blogs
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "22px" }}>
          <span className="dot-bullet" />
          <h2
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 800,
              letterSpacing: "0.08em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Blogs &amp; Insights
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
            <svg
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.4)",
              }}
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input className="search-input" type="text" placeholder="Search" style={{ width: "100%" }} />
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? "active" : "inactive"}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
            <div style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.35)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED BLOG CARD ── */}
      <div style={{ padding: "0 clamp(16px, 5vw, 68px)", marginBottom: "52px" }}>
        <Link href={`/blog/${blogs[0].slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div
            className="featured-card"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "clamp(20px, 4vw, 36px) clamp(16px, 4vw, 40px)",
              gap: "20px",
              background: "#2d2244",
              flexWrap: "wrap",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <div style={{ flex: "1 1 280px", maxWidth: "100%" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,1.0)",
                  borderRadius: "40px",
                  padding: "6px 14px 6px 6px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src="/images/log.jpg"
                  alt="author"
                  style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }}
                />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#333" }}>John Doe</span>
              </div>

              <h3
                style={{
                  fontSize: "clamp(20px, 2.5vw, 30px)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: "14px",
                  letterSpacing: "-0.01em",
                  color: "#fff",
                }}
              >
                Artificial Intelligence Beyond Imaginations
              </h3>

              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  marginBottom: "24px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure....{" "}
                <span style={{ color: "#a78bfa", fontWeight: 600 }}>Read More</span>
              </p>
            </div>

            {/* ✅ FIX: robot uses CSS class for responsive positioning, no inline isMobile logic */}
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/images/robot.png"
                alt="Featured"
                className="robot-img"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* ── BLOG CARDS GRID ── */}
      <div
        style={{
          padding: "0 clamp(16px, 4vw, 55px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          maxWidth: "1300px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`} className="blog-card-link">
            <div className="blog-card">
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  background: "#1a1e30",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "15px",
                }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60px",
                    background: "linear-gradient(to top, rgba(18,22,42,0.8), transparent)",
                  }}
                />
              </div>

              <div style={{ padding: "20px 20px 22px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: 1.35,
                    marginBottom: "10px",
                    letterSpacing: "-0.01em",
                    color: "#fff",
                  }}
                >
                  {blog.title}
                </h3>

                <p
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "13px",
                    lineHeight: 1.65,
                    marginBottom: "16px",
                  }}
                >
                  {blog.description}{" "}
                  <span style={{ color: "#a78bfa", fontWeight: 600 }}>Read More</span>
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {blog.date}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {blog.views}
                  </div>
                </div>

                <span className="read-more-btn">Read More</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── PAGINATION ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "52px 0 60px",
        }}
      >
        <button className="page-arrow" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={`page-btn ${currentPage === p ? "active" : "inactive"}`}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        ))}

        <button className="page-arrow" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <Footer />
    </div>
  );
}