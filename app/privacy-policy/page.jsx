'use client';
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";   // ✅ fixed: swapped imports
import Footer from "@/components/layout/Footer";   // ✅ fixed: swapped imports
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

const sections = [
  {
    title: "Information We Collect",
    content: (
      <>
        <p>We collect information to provide, improve, and secure our systems and services.</p>
        <p style={{ marginTop: "10px", fontWeight: 600 }}>Information You Provide</p>
        <p>This may include:</p>
        <ul style={{ marginTop: "6px", paddingLeft: "20px", lineHeight: "1.9",listStyle: "disc", }}>
          <li>Name, email address, phone number</li>
          <li>Company or organization details</li>
          <li>Information shared through contact forms, system reviews, or consultations</li>
          <li>Communications sent to us directly</li>
        </ul>
        <p style={{ marginTop: "10px", fontWeight: 700 }}>Automatically Collected Information</p>
        <p>When you visit our website, we may collect:</p>
        <ul style={{ marginTop: "6px", paddingLeft: "20px", lineHeight: "1.9",listStyle: "disc" }}>
          <li>IP address</li>
          <li>Browser type and device information</li>
          <li>Pages visited and interactions</li>
          <li>Date and time of access</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          This data helps us understand usage patterns and improve system performance.
        </p>
      </>
    )
  },
  {
    title: "How We Use Information",
    content: (
      <>
        <p>We use collected information to:</p>
        <ul style={{ marginTop: "6px", paddingLeft: "20px", lineHeight: "1.9",listStyle: "disc" }}>
          <li>Respond to inquiries and requests</li>
          <li>Provide and improve our services</li>
          <li>Conduct system reviews and consultations</li>
          <li>Maintain platform security and integrity</li>
          <li>Communicate relevant updates or service-related information</li>
        </ul>
        <p style={{ marginTop: "10px" }}>We do not sell, rent, or trade personal data.</p>
      </>
    ),
  },
  {
    title: "Data Ownership & Control",
    content: (
      <>
        <p>
          Information shared with SMB Axis remains under your ownership. Where systems or platforms
          are built or managed by us, data handling follows structured access control and governance
          principles to ensure confidentiality and integrity.
        </p>
        <p style={{ marginTop: "10px" }}>
          Clients retain ownership of their data and system assets.
        </p>
      </>
    ),
  },
  {
    title: "Data Sharing & Disclosure",
    content: (
      <>
        <p>We may share information only:</p>
        <ul style={{ marginTop: "6px", paddingLeft: "20px", lineHeight: "1.9",listStyle: "disc" }}>
          <li>When required to deliver requested services</li>
          <li>With trusted service providers operating under confidentiality obligations</li>
          <li>To comply with legal or regulatory requirements</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          We do not share information for advertising or unrelated third-party purposes.
        </p>
      </>
    ),
  },
  {
    title: "Security Measures",
    content: (
      <>
        <p>
          SMB Axis implements reasonable technical and organizational safeguards to protect data from
          unauthorized access, misuse, or disclosure. Security practices include access control,
          system monitoring, and data protection measures aligned with our governance frameworks.
        </p>
        <p style={{ marginTop: "10px" }}>
          While no system is completely secure, we design our infrastructure to minimize risk and
          exposure.
        </p>
      </>
    ),
  },
  {
    title: "Cookies & Tracking",
    content: (
      <>
        <p>Our website may use cookies or similar technologies to:</p>
        <ul style={{ marginTop: "6px", paddingLeft: "20px", lineHeight: "1.9",listStyle: "disc" }}>
          <li>Improve functionality and user experience</li>
          <li>Understand website usage</li>
          <li>Support performance and analytics</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          You can control cookie preferences through your browser settings.
        </p>
      </>
    ),
  },
  {
    title: "Third-Party Links",
    content: (
      <p>
        Our website may contain links to third-party websites or platforms. SMB Axis is not
        responsible for the privacy practices or content of external sites. We encourage reviewing
        their privacy policies independently.
      </p>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <>
        <p>We retain information only for as long as necessary to:</p>
        <ul style={{ marginTop: "6px", paddingLeft: "20px", lineHeight: "1.9",listStyle: "disc" }}>
          <li>Fulfill service obligations</li>
          <li>Meet legal or regulatory requirements</li>
          <li>Maintain system integrity</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          When information is no longer required, it is securely removed or anonymized.
        </p>
      </>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <>
        <p>Depending on your location, you may have the right to:</p>
        <ul style={{ marginTop: "6px", paddingLeft: "20px", lineHeight: "1.9",listStyle: "disc" }}>
          <li>Request access to your information</li>
          <li>Request correction or deletion</li>
          <li>Withdraw consent where applicable</li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          Requests can be made by contacting us directly.
        </p>
      </>
    ),
  },
  {
    title: "Policy Updates",
    content: (
      <p>
        This Privacy Policy may be updated periodically to reflect changes in services, systems, or
        legal requirements. Updates will be posted on this page with a revised effective date.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
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
            backgroundImage: "url('/images/policy.jpg')",
           
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
            paddingTop: "10px",
            width: "100%",
          }}
        >
          {/* Hero title shown over image — matches Figma "Privacy Policy" overlay */}
          
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
          / Privacy Policy
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "22px",
          }}
        >
          {/* Purple dot bullet */}
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
            Privacy Policy
          </h2>
        </div>

        {/* Intro paragraph */}
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.65)",
            lineHeight: "1.75",
            maxWidth: "600px",
            marginBottom: "40px",
            marginLeft: "8px",
          }}
        >
          SMB Axis respects your privacy and is committed to protecting the personal and business
          information you share with us. This Privacy Policy explains how we collect, use, store,
          and safeguard information when you interact with our website, platforms, systems, and
          services.
        </p>

        {/* ── POLICY SECTIONS TABLE ── */}
        <div style={{ marginBottom: "60px" }}>
          {sections.map((section, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: "46px",
                padding: "24px 8px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Left: section title */}
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: "1.5",
                  }}
                >
                  {section.title}
                </p>
              </div>

              {/* Right: content */}
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: "1.75",
                   
                }}
              >
                {section.content}
              </div>
            </div>
          ))}

          {/* Bottom border after last row */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
      </div>

      <Footer />
    </>
  );
}
