"use client";

import { useState } from "react";
import Link from "next/link";

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="w-full px-4 md:px-8 lg:px-14 py-10">
      {/* ── Outer glass card with purple glow border ── */}
      <div
        className="relative w-full rounded-2xl p-px"
        style={{
          background:
            "linear-gradient(180deg, rgba(176,85,220,0.9) 0%, rgba(176,85,220,0.9) 8%, rgba(60,20,120,0.08) 100%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {/* Inner dark glass surface */}
        <div
          className="rounded-2xl px-5 md:px-10 py-8 md:py-13"
          style={{
            background:
              "linear-gradient(160deg, rgba(21,26,33,0.95) 0%, rgba(10,14,20,0.98) 100%)",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* ── Newsletter row ── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-7">
            <h3 className="text-white text-lg md:text-2xl font-bold leading-tight md:max-w-[390px]">
              Subscribe to Our Newsletter
            </h3>

            {/* ✅ FIX: stack input+button on mobile, row on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto md:min-w-[400px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Enter your email"
                className="flex-1 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none transition-colors duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
              <button
                onClick={handleSubscribe}
                className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 whitespace-nowrap"
                style={{
                  background: "#090920",
                  border: "1px solid rgba(139,92,246,0.55)",
                  boxShadow: "0 0 12px rgba(139,92,246,0.25)",
                }}
              >
                {subscribed ? "✓ Done!" : "Subscribe"}
              </button>
            </div>
          </div>

          {/* ── Purple gradient divider ── */}
          <div
            className="w-full mb-8"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.8) 0%, rgba(109,40,217,0.6) 0%, transparent 100%)",
            }}
          />

          {/* ── Main footer grid: Logo col + right content ── */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">

            {/* Col 1 — Logo + Connect (fixed width) */}
            <div className="flex flex-col gap-5 md:w-[200px] shrink-0">
              <div className="w-24 h-13 rounded-xl flex items-center justify-center">
                <img
                  src="/images/smblogo.png"
                  alt="Logo"
                  className="max-h-full max-w-full object-contain mb-5"
                />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-2">Connect</p>
                <p className="text-white/55 text-sm mb-1">+971 025 2541 21</p>
                <p className="text-white/55 text-sm mb-4">smbaxis@gmail.com</p>
                <div className="flex items-center gap-4 text-white/60">
                  <Link href="#" className="hover:text-white transition-colors duration-150"><FacebookIcon /></Link>
                  <Link href="#" className="hover:text-white transition-colors duration-150"><InstagramIcon /></Link>
                  <Link href="#" className="hover:text-white transition-colors duration-150"><XIcon /></Link>
                  <Link href="#" className="hover:text-white transition-colors duration-150"><LinkedInIcon /></Link>
                </div>
              </div>
            </div>

            {/* Right side: all 3 sections */}
            {/* ✅ FIX: 2-col grid on mobile for the link sections, row on desktop */}
            <div className="flex-1 grid grid-cols-2 md:flex md:flex-row gap-8 md:gap-10">

              {/* SOLUTIONS — spans both columns on mobile */}
              <div className="col-span-2 md:flex-[4]">
                <p className="text-white text-sm font-semibold mb-4">SOLUTIONS</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                  {/* Core Revenue System */}
                  <div>
                    <ul className="space-y-2.5">
                      {[
                        "Lead Generation & Funnels",
                        "Personal Branding for Agents",
                        "Conversion & RCM Optimization",
                        "Social Media & Content Engine",
                        "Training and Webinar",
                      ].map((item) => {
                        if (item === "Advance and Future Tech") {
                          return (
                            <li key={item} className="text-white text-sm font-semibold mt-3">
                              {item}
                            </li>
                          );
                        }
                        let link = "#";
                        if (item === "Lead Generation & Funnels") link = "/leadgen";
                        else if (item === "Personal Branding for Agents") link = "/training";
                        else if (item === "Conversion & RCM Optimization") link = "/training";
                        else if (item === "Social Media & Content Engine") link = "/training";
                        else if (item === "Blockchain & Tokenization System") link = "/training";
                        else if (item === "Cyber Security") link = "/training";
                        else if (item === "Training and Webinar") link = "/training";
                        return (
                          <li key={item}>
                            <Link href={link} className="text-white/50 text-sm hover:text-white ml-2">
                              {item}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Growth and Technology Layers */}
                  <div>
                    <ul className="space-y-2.5">
                      {[
                        "Websites and Real Estate Portals",
                        "AI-Powered Lead Systems",
                        "Team Training Process Consulting",
                        "Blockchain & Tokenization System",
                        "Cyber Security",
                      ].map((item) => {
                        let link = "#";
                        if (item === "Websites and Real Estate Portals") link = "/training";
                        else if (item === "AI-Powered Lead Systems") link = "/training";
                        else if (item === "Team Training Process Consulting") link = "/training";
                        else if (item === "Training and Webinar") link = "/training";

                        const isHighlight = item === "Training and Webinar";

                        return (
                          <li key={item}>
                            <Link
                              href={link}
                              className={`ml-2 text-sm hover:text-white ${
                                isHighlight ? "text-white font-semibold" : "text-white/50"
                              }`}
                            >
                              {item}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ABOUT US */}
              <div className="md:flex-1">
                <p className="text-white text-sm font-semibold mb-4">ABOUT US</p>
                <ul className="space-y-2.5">
                  {["Portfolio", "Careers", "Our Team", "Case Studies"].map((item) => {
                    let href = "#";
                    if (item === "Portfolio") href = "/portfol";
                    if (item === "Privacy Policy") href = "/privacy-policy";
                    if (item === "Our Team") href = "/Our-Team";
                    if (item === "Case Studies") href = "/case-studies";
                    if (item === "Careers") href = "/career";
                    return (
                      <li key={item}>
                        <Link href={href} className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                          {item}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* RESOURCES */}
              <div className="md:flex-1">
                <p className="text-white text-sm font-semibold mb-4">RESOURCES</p>
                <ul className="space-y-2.5">
                  {["Contact", "Help Centre", "Blogs", "Privacy Policy", "Terms of Use"].map((item) => (
                    <li key={item}>
                      <Link
                        href={
                          item === "Help Centre" ? "/help-centre"
                          : item === "Contact" ? "/contact"
                          : item === "Privacy Policy" ? "/privacy-policy"
                          : item === "Terms of Use" ? "/terms"
                          : item === "Blogs" ? "/blog"
                          : "#"
                        }
                        className="text-white/50 text-sm hover:text-white transition-colors duration-150"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}