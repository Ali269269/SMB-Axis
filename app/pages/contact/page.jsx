'use client'
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });


export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Broker Growth Systems",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <style jsx global>{`
       

        body {
          background-color: #0d0d14;
          color: #fff;
       
          
          
        }

        .contact-page {
          background-color: #0d0d14;
          min-height: 10;
          
        }

        /* ── Hero Section ── */
       .hero-section {
  position: relative;
  background: linear-gradient(0deg, rgba(13, 13,13, 0.90) 0%, rgba(12, 12, 12, 0.85) 50%, #191e2b 100%),
              url('/images/contactpic.png') center/cover no-repeat;
  padding: 80px 60px 60px;
  overflow: hidden;
  min-height: 400px; /* adjust height as needed */
  display: flex;
  align-items: center;
  justify-content: flex-start;
    box-shadow: 20 40px -95px rgba(0, 0, 0, 0.20);
   
  
}


        .hero-title {
           font-family: Space Grotesk;
  font-size: 52px;

  font-weight: 800;
  line-height: 1.1;
  position: relative;
  z-index: 1;
  color: #fff;
  text-shadow: 0 4px 12px rgba(0,0,0,0.6);
        }

        .hero-title span {
          color: #fff;
        }

       

    

      

       

        /* ── Breadcrumb & Section Title ── */
        .section-header {
          padding: 36px 60px 0;
          
        }

        .breadcrumb {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 10px;
        
        }

        .breadcrumb a {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
        }

        .breadcrumb a:hover { color: #a855f7; }

        .section-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .section-dot {
          width: 10px;
          height: 10px;
          background: #a855f7;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .section-title {
          // font-family: 'Syne', sans-serif;
          // font-size: 28px;
          // font-weight: 700;
          // letter-spacing: 0.04em;
          // text-transform: uppercase;
          
        }

        /* ── Main Card ── */
        .contact-card {
          margin: 50 196px 10px;
          background: #242036;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 4px 80px 38px;
        
        }

        .card-top {
          margin-bottom: 12px;
        }

        .card-top h2 {
         
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .card-top p {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          max-width: 360px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.8fr 1fr;
          gap: 28px;
          align-items: center;
        }

        /* ── Form ── */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
          .form-textarea 
          {
          box-size:40px;
          }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          background: #3d404b;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 8px;
         
          color: #fff;
         
          font-size: 14px;

          outline: none;
          transition: border-color 0.2s;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255,255,255,0.19);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(168, 85, 247, 0.5);
        }

        .form-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 6px center;
          cursor: pointer;
          color: rgba(255,255,255,0.35);
        }

        .form-select option {
          background: #1e1b2a;
          color: #fff;
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .form-submit-row {
          display: flex;
          justify-content: center;
          margin-top: 4px;
         ;
        }

        .btn-send {
          background: transparent;
          border: 1px solid #a855f7;
          color: #fff;
          border-radius: 30px;
          padding: 10px 28px;
        
         
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .btn-send:hover {
          background: #a855f7;
          color: #fff;
        }

       .info-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 0.5px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  height: 450px;
  padding: 20px;

  background: rgba(230, 220, 255, 0.1);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1 px);

  box-shadow: 0 2px 2px rgba(0,0,0,0.2);
}

        .info-panel h3 {
        
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 18px;
          line-height: 1.4;
        }

        .info-item {
          
          background: #3d404b;
          border-radius: 10px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 10px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .info-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.7);
        }

        .info-icon svg {
          width: 22px;
          height: 22px;
        }

        .info-text {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 2px;
        }

        .info-value {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
        }

        .divider {
          border: none;
  height: 1px;
  background-color: white;
  margin-top:4px;

        }

        .connect-label {
       
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .social-icons {
          display: flex;
          gap: 18px;
          align-items: center;
        }

        .social-icon {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }

        .social-icon:hover { color: #a855f7; }

        .social-icon svg {
          width: 20px;
          height: 20px;
        }

        /* ── Map Section ── */
        .map-section {
          margin: 32px 100px 0;
          border-radius: 16px;
          overflow: hidden;
          height: 260px;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .map-section iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
          filter: grayscale(20%) brightness(0.85);
        }
.dividere {
  height: 20px;
background: linear-gradient(180deg, rgba(21, 26, 33, 0) 0%, rgba(21, 26, 33, 0.5) 50%, #151A21 100%);
}

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .hero-icons { display: none; }
          .hero-phone-bg { display: none; }
          .hero-section, .section-header, .contact-card { padding-left: 24px; padding-right: 24px; }
          .contact-card { margin: 0 24px; }
          .map-section { margin: 24px 24px 0; }
        }
      `}</style>

      <div className="contact-page">
        <Navbar />

        {/* ── Hero ── */}
        <section className="hero-section">
          <div className="hero-title mt-29">
            
          </div>
            <div className="dividere"></div>
            <h2 style={{
                  fontFamily: "var(--font-heading)", fontWeight: 700,
                  fontSize: "20px", color: "#FFFFFF",
                  lineHeight: "1.2", letterSpacing: "-0.02em", margin: 0,
                }}></h2>
               

          <div className="hero-phone-bg" />
        </section>
        

        {/* ── Breadcrumb + Title ── */}
        <div className="section-header">
          <p className="breadcrumb">
            <Link href="/">Home</Link> / Contact us
          </p>
          <div className="section-title-row">
            <div className="section-dot" />
            <h2 className="section-title">Contact Us</h2>
          </div>
        </div>

        {/* ── Main Card ── */}
        <div className="contact-card">
          <div className="card-top">
            <h2>Send us a message</h2>
            <p>Do you have a question? A complaint? Or need any assistance for choosing the right service for you?</p>
          </div>

          <div className="contact-grid">
            {/* Left: Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Mickel"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className="form-input"
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
              />
              <select
                className="form-select"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="Broker Growth Systems">Broker Growth Systems*</option>
                <option value="Broker Digital Presence">Broker Digital Presence</option>
                <option value="Lead Capture and Routing">Lead Capture and Routing</option>
                <option value="Paid Lead Engine">Paid Lead Engine</option>
                <option value="AI and Data Layer">AI and Data Layer</option>
                <option value="Platform and Portal Build">Platform and Portal Build</option>
                <option value="Brand and Digital Identity">Brand and Digital Identity</option>
              </select>
              <textarea
                className="form-textarea"
                name="message"
                placeholder="Type your message here"
                value={formData.message}
                onChange={handleChange}
              />
              <div className="form-submit-row">
                <button type="submit" className="btn-send">Send Message</button>
              </div>
            </form>

            {/* Right: Info Panel */}
            <div className="info-panel">
              <h3>We are always here to<br />help you.</h3>

              {/* Hotline */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="info-text">
                  <span className="info-label">Hotline:</span>
                  <span className="info-value">+971 55 91 99 661</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="info-item">
                <div className="info-icon">
  <img
    src="/images/whatt.png"
    alt="WhatsApp"
    width="24"
    height="24"
  />
</div>
                <div className="info-text">
                  <span className="info-label">Whatsapp:</span>
                  <span className="info-value">+971 55 91 99 661</span>
                </div>
              </div>

              {/* Email */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="info-text">
                  <span className="info-label">Email:</span>
                  <span className="info-value">anastasia@smbaxis.com</span>
                </div>
              </div>

              <div className="divider" />

              <p className="connect-label pt-4 ">Connect with us</p>
              <div className="social-icons">
                {/* Instagram */}
                <a href="#" className="social-icon" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" className="social-icon" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="social-icon" aria-label="LinkedIn">
                   <img
    src="/images/Vector.png"
    alt="WhatsApp"
    width="20"
    height="20"
  />
                </a>
                {/* Email */}
                <a href="mailto:smbaxis@gmail.com" className="social-icon" aria-label="Email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="#" className="social-icon" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                    <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Map Section ── */}
        <div className="map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.254473782988!2d55.273933811096754!3d25.194639377619595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f694e9635ebcb%3A0x10ad9570738f2a7d!2sSMB%20DigitalZone!5e0!3m2!1sen!2s!4v1775540618229!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SMB Axis Location"
          />
        </div>

        {/* Bottom spacing before footer */}
        <div style={{ height: 48 }} />

        <Footer />
      </div>
    </>
  );
}
