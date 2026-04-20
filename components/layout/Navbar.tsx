"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { BarChart3,Smartphone,Settings } from "lucide-react";
import { FaGlobe, FaRobot, FaBullseye, FaLock } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });


export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [subFlip, setSubFlip] = useState<Record<string, boolean>>({});
  const menuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subRefs = useRef<Record<string, HTMLUListElement | null>>({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!openSub) return;
    const el = subRefs.current[openSub];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.right > window.innerWidth - 12) {
      setSubFlip((prev) => ({ ...prev, [openSub]: true }));
    } else {
      setSubFlip((prev) => ({ ...prev, [openSub]: false }));
    }
  }, [openSub]);

  const navLinks = [
    {
      label: "Resources",
      href: "#",
      dropdown: [
        { label: "BLOGS", href: "/blog", subtitle: "Thought Leadership – Market Insight" },
        { label: "HELP CENTRE", href: "/help-centre", subtitle: "Client Success – Support Infrastructure" },
        { label: "CONTACT", href: "/contact", subtitle: "Strategic Partnership – Initiate Growth" },
      ],
    },
    {
      label: "About Us",
      href: "#",
      dropdown: [
        { label: "OUR TEAM", href: "/Our-Team", subtitle: "Expert Synergy – Human Capital" },
        { label: "OUR PORTFOLIO", href: "/portfol", subtitle: "Proven Excellence – Visual Proof" },
        { label: "CASE STUDIES", href: "/case-studies", subtitle: "Data-Driven Results – Social Proof" },
      ],
    },
    {
      label: "Solutions",
      href: "#",
      dropdown: [
        {
          label: "CORE REVENUE SYSTEM (Frontline Offer - Sell First)",
          href: "/core-revenue-system",
          sub: [
            { label: "Lead Generation & Funnel", href: "/leadgen", icon: <BarChart3 className="text-white w-5 h-5" /> },
            { label: "Personal Branding for Agents", href: "/training", icon: <FaUser className="text-white" /> },
            { label: "Conversion & CRM Optimization", href: "/training", icon: <Settings className="w-5 h-5 text-white" /> },
            { label: "Social Media & Content Engine", href: "/training", icon: <Smartphone className="text-white w-5 h-5" /> },
          ],
        },
        {
          label: "GROWTH & TECHNOLOGY LAYERS (Upsell - Authority & Impress)",
          href: "/growth-tech",
          sub: [
            { label: "Websites & Real Estate Portals", href: "/training", icon: <FaGlobe className="w-5 h-5 text-white" /> },
            { label: "AI-Powered Lead Systems", href: "/training", icon: <FaRobot className="w-5 h-5 text-white" /> },
            { label: "Team Training & Process Consulting", href: "/training", icon: <FaBullseye className="w-5 h-5 text-white" /> },
          ],
        },
        {
          label: "ADVANCE & FUTURE TECH (High-End Layer - Impress)",
          href: "/future-tech",
          sub: [
            { label: "Blockchain & Tokenization Solution", href: "/training", icon: <SiBlockchaindotcom className="w-5 h-5 text-white" /> },
            { label: "Cyber Security", href: "/training", icon: <FaLock className="w-4 h-4 text-white" /> },
          ],
        },
        {
          label: "TRAINING AND WEBINAR (Scale & Impact – Empower)",
          href: "/training",
          sub: [],
        },
      ],
    },
  ];

  const handleMenuEnter = (label: string) => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    setOpenMenu(label);
  };

  const handleMenuLeave = () => {
    menuTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      setOpenSub(null);
    }, 150);
  };

  const handleSubEnter = (label: string) => {
    if (subTimerRef.current) clearTimeout(subTimerRef.current);
    setOpenSub(label);
  };

  const handleSubLeave = () => {
    subTimerRef.current = setTimeout(() => setOpenSub(null), 150);
  };

  const dropdownBase: React.CSSProperties = {
    position: "absolute",
    top: "calc(100% + 10px)",
    left: 0,
    width: "max-content",
    maxWidth: "600px",
    background: "#1e1b2e",
    border: "1px solid rgba(168,85,247,0.25)",
    borderRadius: "12px",
    overflow: "visible",
    boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
    zIndex: 9999,
    padding: "4px 0",
  };

  const itemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "11px 18px",
    fontSize: "14px",
    cursor: "pointer",
    borderBottom: "1px solid rgba(168,85,247,0.08)",
    transition: "all 0.15s ease",
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  const linkStyle: React.CSSProperties = {
    display: "block",
    padding: "11px 18px",
    fontSize: "14px",
    color: "rgba(255,255,255,0.8)",
    borderBottom: "1px solid rgba(168,85,247,0.08)",
    textDecoration: "none",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
  };

  return (
    <nav
className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-30 transition-all duration-300 ${
  scrolled
    ? "bg-[#0f121a]/25 backdrop-blur-md "
    : "bg-transparent"
}`}
style={{
  paddingTop: "0px",
}}
    >
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/logosmb.png" width={160} height={50} alt="SMB Axis" />
      </Link>

      {/* DESKTOP NAV */}
      <ul className="hidden md:flex items-center gap-7  font-inter">
        {navLinks.map((link) => (
          <li
            key={link.label}
            className="relative"
            onMouseEnter={() => handleMenuEnter(link.label)}
            onMouseLeave={handleMenuLeave}
          >
            <button className="flex items-center text-white text-[16px] hover:text-[#a855f7]">
              {link.label}
            </button>

            {/* MEGA MENU */}
            {openMenu === link.label && link.dropdown && (
              <div
                style={{
                  position: "fixed",
                  top: "110px",
                  left: 0,
                  right: 0,
                  width: "100%",
                  background: "#442b62",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  zIndex: 9999,
                  borderRadius: "15px",
                  transform: "translateY(-20px)",
                  opacity: 0,
                  animation: "dropdownSlide 0.3s ease forwards",
                }}
              >
                {/* INNER CONTAINER */}
                <div
                  style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "30px 20px",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "0",
                    color: "#ffff",
                  }}
                >
                  {link.dropdown.map((item, index) => {
                    const hasSub = "sub" in item;
                    const isLast = index === link.dropdown.length - 1;

                    return (
                      <div
                        key={item.label}
                        style={{
                          paddingLeft: index === 0 || index === 3 ? "0" : "30px",
                          paddingRight: isLast ? "0" : "30px",
                          borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        {hasSub ? (
                          <>
                            {(() => {
                              const match = item.label.match(/^(.*?)\s*\((.*?)\)$/);
                              const mainTitle = match?.[1] || item.label;
                              const subTitle = match?.[2] || null;
                              return (
                                <div style={{ marginBottom: "12px" }}>
                                  <Link
                                    href={item.href}
                                    style={{
                                      fontWeight: "600",
                                      fontSize: "15px",
                                      color: "#fff",
                                      textDecoration: "none",
                                      display: "block",
                                    }}
                                    className="hover:text-[#a855f7] transition-colors"
                                  >
                                    {mainTitle}
                                  </Link>
                                  {subTitle && (
                                    <div style={{ fontSize: "12px", color: "#c4b5fd", marginTop: "3px" }}>
                                      {subTitle}
                                    </div>
                                  )}
                                </div>
                              );
                            })()}

                            {/* SUB ITEMS */}
                            <ul style={{ listStyle: "none", padding: 10, margin: 0 }}>
                              {item.sub.map((subItem) => (
                                <li key={subItem.label}>
                                  <Link
                                    href={subItem.href}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "20px",
                                    }}
                                    className="py-[10px] text-[14px] text-white/80 hover:text-[#a855f7] transition-colors"
                                  >
                                    <div className="w-7 h-13 rounded-md flex items-center justify-center text-[14px]">
                                      {subItem.icon}
                                    </div>
                                    <span>{subItem.label}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            style={{ fontWeight: "600", fontSize: "15px", textDecoration: "none" }}
                            className="block text-white hover:text-[#a855f7] transition-colors"
                          >
                            {item.label}
                            {"subtitle" in item && item.subtitle && (
                              <span style={{ display: "block", fontSize: "11px", color: "#c4b5fd", fontWeight: "400", marginTop: "3px" }}>
                                {item.subtitle}
                              </span>
                            )}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </li>
        ))}

        <style jsx>{`
          @keyframes dropdownSlide {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
      </ul>

      {/* DESKTOP CTA */}
      <Link
        href="#"
        className="hidden md:inline-flex items-center justify-center text-white font-inter font-medium text-[16px] whitespace-nowrap transition-all duration-200 mr-12"
        style={{
          width: "150.47px",
          height: "50px",
          borderRadius: "41.97px",
          border: "1.45px solid rgba(255,255,255,0.12)",
          padding: "13.03px 34.74px",
          background: "#151A21",
          boxShadow: "10px 0px 14px -3px rgba(168, 85, 247, 1)",
        }}
      >
        <span>GET A DEMO</span>
      </Link>

      {/* MOBILE HAMBURGER */}
      <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#151A21] border-t border-[rgba(168,85,247,0.2)] shadow-xl md:hidden z-40">
          <ul className="flex flex-col gap-1 py-4 px-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  className="flex justify-between w-full text-white text-[16px] font-normal py-2"
                  onClick={() => setOpenMenu(openMenu === link.label ? null : link.label)}
                >
                  {link.label}
                  <svg
                    className={`w-4 h-4 text-[#a855f7] transition-transform duration-200 ${
                      openMenu === link.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openMenu === link.label && (
                  <ul className="pl-4 mt-1 flex flex-col gap-1">
                    {link.dropdown.map((item) => (
                      <li key={item.label}>
                        {"sub" in item && item.sub ? (
                          <>
                            <button
                              className="flex justify-between w-full text-left text-white text-[14px] py-2 hover:text-[#a855f7] transition-colors"
                              onClick={() => setOpenSub(openSub === item.label ? null : item.label)}
                            >
                              <span>{item.label}</span>
                              <svg
                                className={`w-3 h-3 text-[#a855f7] transition-transform duration-200 flex-shrink-0 ml-2 ${
                                  openSub === item.label ? "rotate-90" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>

                            {openSub === item.label && (
                              <ul className="pl-3 mb-1 border-l border-[rgba(168,85,247,0.25)]">
                                {item.sub.map((subItem) => (
                                  <li key={subItem.label}>
                                    <Link
                                      href={subItem.href}
                                      className="block py-1.5 px-2 text-sm text-white/60 hover:text-[#a855f7] transition-colors"
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className="block py-2 text-white/70 text-[14px] hover:text-[#a855f7] transition-colors"
                          >
                            {item.label}
                            {"subtitle" in item && item.subtitle && (
                              <span className="block text-[11px] text-[#c4b5fd] font-normal mt-0.5">
                                {item.subtitle}
                              </span>
                            )}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <Link
              href="#"
              className="mt-4 block text-center text-white font-semibold bg-[#151A21] border border-[rgba(255,255,255,0.12)] rounded-[42px] py-3 shadow-[10px_0px_14px_-3px_rgba(168,85,247,1)]"
            >
              GET A DEMO
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}
