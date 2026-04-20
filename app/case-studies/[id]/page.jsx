'use client';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

const sections = [
  {
    title: "Understanding the context",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. were identified:`,
    bullets: [
      "No defined brand system, making visual and verbal communication inconsistent",
      "Social media activity lacked structure, limiting clarity and continuity",
      "Website visibility was affected by underdeveloped on-page and technical SEO",
      "Digital reach was constrained by the absence of a structured search and content foundation",
      "The brand needed to balance corporate and lifestyle event work within a single, coherent identity",
    ],
    closing: "The objective was to bring clarity and consistency across brand, content, and digital channels while maintaining a professional and credible presence.",
  },
  {
    title: "Understanding the context",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. were identified:`,
    bullets: [
      "No defined brand system, making visual and verbal communication inconsistent",
      "Social media activity lacked structure, limiting clarity and continuity",
      "Website visibility was affected by underdeveloped on-page and technical SEO",
      "Digital reach was constrained by the absence of a structured search and content foundation",
      "The brand needed to balance corporate and lifestyle event work within a single, coherent identity",
    ],
    closing: "The objective was to bring clarity and consistency across brand, content, and digital channels while maintaining a professional and credible presence.",
  },
  {
    title: "Understanding the context",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. were identified:`,
    bullets: [
      "No defined brand system, making visual and verbal communication inconsistent",
      "Social media activity lacked structure, limiting clarity and continuity",
      "Website visibility was affected by underdeveloped on-page and technical SEO",
      "Digital reach was constrained by the absence of a structured search and content foundation",
      "The brand needed to balance corporate and lifestyle event work within a single, coherent identity",
    ],
    closing: "The objective was to bring clarity and consistency across brand, content, and digital channels while maintaining a professional and credible presence.",
  },
  {
    title: "Understanding the context",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. were identified:`,
    bullets: [
      "No defined brand system, making visual and verbal communication inconsistent",
      "Social media activity lacked structure, limiting clarity and continuity",
      "Website visibility was affected by underdeveloped on-page and technical SEO",
      "Digital reach was constrained by the absence of a structured search and content foundation",
      "The brand needed to balance corporate and lifestyle event work within a single, coherent identity",
    ],
    closing: "The objective was to bring clarity and consistency across brand, content, and digital channels while maintaining a professional and credible presence.",
  },
  {
    title: "Understanding the context",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. were identified:`,
    bullets: [
      "Digital reach was constrained by the absence of a structured search and content foundation",
      "The brand needed to balance corporate and lifestyle event work within a single, coherent identity",
    ],
    closing: "The objective was to bring clarity and consistency across brand, content, and digital channels while maintaining a professional and credible presence.",
  },
];

export default function CaseStudyPage({ params }) {
  return (
    <>
      <Navbar />

      {/* Hero */}
      {/* Hero image section */}
     <div style={{ position: "relative", width: "100%", height: 400, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 1,
            backgroundImage: "url('/images/casestudy.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(21,26,33,0.9) 190%, rgba(21,26,33,0.5) 180%, #151A21 100%)",
          }}
        />
      </div>


      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 5px 60px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "#555a72", marginBottom: 16 }}>
          <span>Home</span>
          <span style={{ margin: "0 4px" }}>/</span>
          <span style={{ color: "#7a7f99" }}>Case Studies</span>

        </div>

        {/* Article title */}
        <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
          Lorem ipsum dolor sit amеter consectetur
        </h2>
        <p style={{ fontSize: 14, color: "#8a8fa8", margin: "0 0 32px", lineHeight: 1.6 }}>
          Brand identity, content, social media management, SEO,<br />and digital support
        </p>

        {/* Top section: image left + first content block right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 48, alignItems: "start" }}>

          {/* Image placeholder */}
         
         <div
  style={{
   width: "100%",
    aspectRatio: "16/9",
    background: "#1e2235",
    borderRadius: 10,
    border: "1.5px solid #2e3250",
    overflow: "hidden", // important to crop the image
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop:"20px"
  }}
>
  <img
    src="/images/casestudy.jpg"
    alt="Case Study"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover", // fills the div while keeping aspect ratio
      display: "block",
      
    }}
  />
</div>

          {/* First content block — right side */}
          <div>
            {/* Purple dot + heading */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 1 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#7c5cbf", marginTop: 20, flexShrink: 0 }} />
              <h3 style={{ fontSize: 25, fontWeight: 700, color: "#fff", margin: 0 }}>
                Understanding the context
              </h3>
            </div>

            <p style={{ fontSize: 13, color: "#9ca3b8", lineHeight: 1.75, margin: "0 0 12px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. were identified:
            </p>

            <ul style={{ margin: "0 0 12px", paddingLeft: 18, color: "#9ca3b8", fontSize: 13, lineHeight: 1.9,listStyleType: "disc"}}>
              <li>No defined brand system, making visual and verbal communication inconsistent</li>
              <li>Social media activity lacked structure, limiting clarity and continuity</li>
              <li>Website visibility was affected by underdeveloped on-page and technical SEO</li>
              <li>Digital reach was constrained by the absence of a structured search and content foundation</li>
              <li>The brand needed to balance corporate and lifestyle event work within a single, coherent identity</li>
            </ul>

            <p style={{ fontSize: 13, color: "#9ca3b8", lineHeight: 1.75, margin: 0 }}>
              The objective was to bring clarity and consistency across brand, content, and digital
              channels while maintaining a professional and credible presence.
            </p>
          </div>
        </div>

        {/* Remaining sections — full width */}
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#7c5cbf", marginTop: 20, flexShrink: 0, }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>
                {section.title}
              </h3>
            </div>

            <p style={{ fontSize: 14, color: "#9ca3b8", lineHeight: 1.8, margin: "0 0 12px" }}>
              {section.body}
            </p>

            <ul style={{ margin: "0 0 12px", paddingLeft: 20, color: "#9ca3b8", fontSize: 14, lineHeight: 1.9,listStyleType: "disc" }}>
              {section.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>

            <p style={{ fontSize: 14, color: "#9ca3b8", lineHeight: 1.8, margin: 0 }}>
              {section.closing}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}