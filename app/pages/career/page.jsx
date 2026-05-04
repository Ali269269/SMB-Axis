'use client';

import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

const jobListings = [
  { id: 1, title: "Senior Mern Stack Developer", tags: ["Remote", "Dubai, UAE", "Full Time"] },
  { id: 2, title: "Senior Ai Developer", tags: ["Remote", "Dubai, UAE", "Full Time"] },
  { id: 3, title: "Senior Front-End Developer", tags: ["Remote", "Dubai, UAE", "Full Time"] },
  { id: 4, title: "Graphic Designer", tags: ["Remote", "Dubai, UAE", "Full Time"] },
  { id: 5, title: "UI/UX Designer", tags: ["Remote", "Dubai, UAE", "Full Time"] },
  { id: 6, title: "SEO", tags: ["Remote", "Dubai, UAE", "Full Time"] },
  { id: 7, title: "Video Editor", tags: ["Remote", "Dubai, UAE", "Full Time"] },
  { id: 8, title: "Senior Mern Stack Developer", tags: ["Remote", "Dubai, UAE", "Full Time"] },
  { id: 9, title: "Senior Mern Stack Developer", tags: ["Remote", "Dubai, UAE", "Full Time"] },
];

/* ─── Upload Zone ─────────────────────────────────── */
function UploadZone({ label }){
 const inputRef = useRef(null);
 const [fileName, setFileName] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file)=> {
    if (file) setFileName(file.name);
  };

  return (
    <div style={{ flex: 1 }}>
      <p style={{ margin: "0 0 8px", fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>{label}</p>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
        style={{
          border: `1.5px dashed ${dragging ? "#B055F7" : "#7C3AED"}`,
          borderRadius: "10px",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          cursor: "pointer",
          background: dragging ? "rgba(176,85,247,0.07)" : "transparent",
          transition: "all 0.2s ease",
          minHeight: "110px",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="17 8 12 3 7 8" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="3" x2="12" y2="15" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {fileName ? (
          <span style={{ fontSize: "12px", color: "#B055F7", textAlign: "center", wordBreak: "break-all" }}>{fileName}</span>
        ) : (
          <>
            <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
              Drag & Drop or{" "}
              <span style={{ color: "#B055F7", textDecoration: "underline" }}>Choose file</span>{" "}
              to upload
            </p>
            <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>PDF Max 3.0mb</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Apply Modal ─────────────────────────────────── */
function ApplyModal({ jobTitle, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

 const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "#18181f",
          border: "1px solid rgba(176,85,247,0.35)",
          borderRadius: "18px",
          padding: "36px 32px 32px",
          width: "100%",
          maxWidth: "600px",
          position: "relative",
          boxShadow: "0 0 60px rgba(176,85,247,0.15)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "20px",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            fontSize: "22px",
            cursor: "pointer",
            lineHeight: 1,
            padding: "4px 8px",
          }}
        >
          ×
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "rgba(176,85,247,0.15)", border: "1.5px solid #B055F7",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#B055F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, margin: "0 0 10px" }}>
              Application Submitted!
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "0 0 28px" }}>
              Thanks for applying. We&apos;ll be in touch soon.
            </p>
            <button
              onClick={onClose}
              style={{
                background: "linear-gradient(135deg, #7C3AED, #B055F7)",
                border: "none",
                borderRadius: "50px",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                padding: "12px 40px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: 700, color: "#ffffff" }}>
              Upload Resume &amp; Portfolio
            </h2>
            <p style={{ margin: "0 0 28px", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
              Apply this job in few clicks, recruiter needs your updated resume and your proof of work.
            </p>

            {/* Full name + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>
                  Full name <span style={{ color: "#B055F7" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    background: "#0f0f17",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    fontSize: "14px",
                    color: "#ffffff",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>
                  Email Address <span style={{ color: "#B055F7" }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter  Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    background: "#0f0f17",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    fontSize: "14px",
                    color: "#ffffff",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Resume + Cover Letter */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
              <UploadZone label="Resume" />
              <UploadZone label="Cover Letter" />
            </div>

            {/* Submit */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                style={{
                  background: "#151515",
                  border: "none",
                  borderRadius: "50px",
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "14px 60px",
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(176,85,247,0.6), 0 0 0 1px rgba(176,85,247,0.3)",
                  transition: "box-shadow 0.2s ease",
                  fontFamily: "inherit",
                }}
              onMouseEnter={(e) => {
  e.currentTarget.style.boxShadow =
    "0 0 45px rgba(176,85,247,0.85), 0 0 0 1px rgba(176,85,247,0.5)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.boxShadow = "none";
}}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      <style jsx global>{`
        input::placeholder { color: rgba(255,255,255,0.25); }
        input:focus { border-color: rgba(176,85,247,0.5) !important; }
      `}</style>
    </div>
  );
}

/* ─── Job Card ────────────────────────────────────── */
function JobCard({ job, onApply }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onApply}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 24px",
        borderRadius: hovered ? "12px" : "0",
        background: hovered
          ? "linear-gradient(180deg, #1A1A1A 0%, #B055F75F 0%)"
          : "transparent",
        borderBottom: hovered ? "none" : "1px solid rgba(255,255,255,0.08)",
        cursor: "pointer",
        transition: "all 0.25s ease",
        marginBottom: hovered ? "2px" : "0",
      }}
    >
      <div>
        <p style={{
          margin: 0, fontSize: "17px", fontWeight: 600,
          color: "#ffffff", marginBottom: "8px", fontFamily: "'Inter', sans-serif",
        }}>
          {job.title}
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          {job.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: "13px", color: "rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", gap: "5px",
            }}>
              <span style={{
                display: "inline-block", width: "5px", height: "5px",
                borderRadius: "50%", background: "rgba(255,255,255,0.4)", flexShrink: 0,
              }} />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        width: "42px", height: "42px", borderRadius: "50%",
        border: `1.5px solid ${hovered ? "#B055F7" : "rgba(255,255,255,0.25)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, transition: "all 0.25s ease", background: "transparent",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{
            transform: hovered ? "rotate(-45deg) translateY(-1px)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
            stroke={hovered ? "#B055F7" : "rgba(255,255,255,0.6)"}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ─── Contact & Social data ───────────────────────── */
const contactItems = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11 19.79 19.79 0 01.04 2.38 2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Hotline:",
    value: "+971 55 91 99 661",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Whatsapp:",
    value: "+971 55 91 99 661",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,6 12,13 2,6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Email:",
    value: "anastasia@smbaxis.com",
  },
];

const socialIcons = [
  {
    name: "Instagram",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="rgba(255,255,255,0.6)"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="4" r="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "Email",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,6 12,13 2,6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ─── Page ────────────────────────────────────────── */
export default function Careers() {
  const [activeJob, setActiveJob] = useState(null);
  return (
    <>
      <Navbar />

      {/* Modal — rendered in-page, no redirect */}
      {activeJob && (
        <ApplyModal
          jobTitle={activeJob.title}
          onClose={() => setActiveJob(null)}
        />
      )}

      {/* HERO */}
      <div style={{ position: "relative", minHeight: "360px", display: "flex", alignItems: "flex-end" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/career.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(11,14,26,0.75) 0%, rgba(11,14,26,0.9) 60%, #0b0e1a 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 48px", paddingTop: "80px", width: "100%" }} />
      </div>

      {/* BREADCRUMB */}
      <div style={{ padding: "29px 72px 0" }}>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "10px", marginLeft: "8px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</Link>{" "}/ Careers
        </p>
        <div style={{ padding: "4px 1% 36px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#B055F7", flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: 30, color: "#ffffff" }}>Begin your career with us</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: "32px",
        padding: "0 72px 80px",
        maxWidth: "1300px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}>
        {/* LEFT: Job listings */}
        <div>
        {jobListings.map((job) => (
  <JobCard
    key={job.id}
    job={job}
    onApply={() => setActiveJob(job)}
  />
))}
        </div>

        {/* RIGHT: Reach Us panel */}
        <div style={{
          background: "#111318", borderRadius: "16px",
          padding: "32px 28px", height: "fit-content",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff", margin: "0 0 24px", letterSpacing: "-0.5px" }}>
            REACH US
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
            {contactItems.map((item) => (
              <div key={item.label} style={{
                display: "flex", alignItems: "center", gap: "14px",
                background: "#1C1F27", borderRadius: "10px", padding: "14px 18px",
              }}>
                <div style={{ flexShrink: 0, opacity: 0.85 }}>{item.icon}</div>
                <div>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>{item.label}</p>
                  <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "20px" }} />
          <p style={{ margin: "0 0 14px", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>Connect with us</p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {socialIcons.map((s) => (
              <a key={s.name} href="#" title={s.name} style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0.8, transition: "opacity 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .careers-grid {
            grid-template-columns: 1fr !important;
            padding: 0 24px 60px !important;
          }
        }
      `}</style>

      <Footer />
    </>
  );
}
