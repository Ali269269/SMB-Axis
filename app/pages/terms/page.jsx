'use client';
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

const sections = [
  {
    title: "Use of Website and Services",
    content: (
      <>
        <p>
          SMB Axis provides access to information, systems, and services intended for professional
          and business use. You agree to use the website and services only for lawful purposes and
          in a manner that does not interfere with the operation, security, or integrity of our
          systems.
        </p>
        <p style={{ marginTop: "10px" }}>
          Unauthorized use, misuse, or attempts to disrupt systems are prohibited.
        </p>
      </>
    ),
  },
  {
    title: "User Responsibilities",
    content: (
      <>
        <p>By using SMB Axis services, you agree to:</p>
        <ul style={{ marginTop: "6px", paddingLeft: "20px", lineHeight: "1.9",listStyle:"disc" }}>
          <li>Provide accurate and complete information when required</li>
          <li>Maintain confidentiality of any access credentials</li>
          <li>Use systems and platforms responsibly</li>
          <li>Comply with applicable laws and regulations</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          You are responsible for all activity conducted under your access.
        </p>
      </>
    ),
  },
  {
    title: "Confidentiality",
    content: (
      <p>
        Information shared between you and SMB Axis during consultations, system reviews, or
        service delivery is treated as confidential. Both parties agree to respect the
        confidentiality of proprietary and sensitive information unless disclosure is required by
        law.
      </p>
    ),
  },
  {
    title: "Third-Party Links and Services",
    content: (
      <p>
        The SMB Axis website may contain links to third-party websites or services. SMB Axis is not
        responsible for the content, availability, or practices of external platforms. Accessing
        third-party services is done at your own discretion.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          SMB Axis shall not be liable for any direct, indirect, incidental, or consequential
          damages arising from the use of our website or services, to the extent permitted by law.
        </p>
        <p style={{ marginTop: "10px" }}>Use of systems and information is at your own risk.</p>
      </>
    ),
  },
  {
    title: "Availability and Modifications",
    content: (
      <>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of the website or
          services without prior notice.
        </p>
        <p style={{ marginTop: "10px" }}>
          SMB Axis may update these Terms of Use at any time, and continued use of the website or
          services constitutes acceptance of the revised terms.
        </p>
      </>
    ),
  },
  {
    title: "Termination",
    content: (
      <p>
        SMB Axis may restrict or terminate access to the website or services if these Terms of Use
        are violated or if misuse is detected.
      </p>
    ),
  },
  {
    title: "Governing Law",
    content: (
      <p>
        These Terms of Use are governed by the applicable laws of the jurisdiction in which SMB
        Axis operates, without regard to conflict of law principles.
      </p>
    ),
  },
];

export default function TermsOfUse() {
  return (
    <>
      <Navbar />

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
            backgroundImage: "url('/images/terms.jpg')",
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
            padding: "0 48px 48px 48px",
            paddingTop: "80px",
            width: "100%",
          }}
        >
         
        </div>
      </div>

      {/* ── BREADCRUMB + TITLE ── */}
      <div style={{ padding: "29px 98px 0", backgroundColor: "#0b0e1a" }}>
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
          / Terms of service
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#7c5cfc",
              flexShrink: 0,
            }}
          />
          <h2
            className={spaceGrotesk.className}
            style={{
              fontSize: "clamp(18px, 2vw, 28px)",
              fontWeight: 800,
              letterSpacing: "0.08em",
              margin: 0,
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            Terms of Service
          </h2>
        </div>

        {/* Intro paragraph */}
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.65)",
            lineHeight: "1.75",
            maxWidth: "680px",
            marginBottom: "40px",
            marginLeft: "8px",
          }}
        >
          These Terms of Use govern your access to and use of the SMB Axis website, platforms,
          systems, and services. By accessing or using SMB Axis, you agree to comply with these
          terms. If you do not agree, you should not use our services or website.
        </p>

        {/* ── POLICY SECTIONS ── */}
        <div style={{ marginBottom: "60px" }}>
          {sections.map((section, i) => (
            <div
              key={i}
              style={{
                padding: "28px 8px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3
                className={spaceGrotesk.className}
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: "0 0 12px 0",
                }}
              >
                {section.title}
              </h3>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: "1.75",
                  maxWidth: "780px",
                }}
              >
                {section.content}
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
      </div>

      <Footer />
    </>
  );
}
