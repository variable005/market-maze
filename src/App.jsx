import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// IMPORT YOUR LOGO
import marketMazeLogo from "./assets/marketmaze.svg";

// --- UTILS & COMPONENTS ---

const RevealOnScroll = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
            {children}
        </div>
    );
};

const LiveClock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <span>
            {time.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })} IST
        </span>
    );
};

const Accordion = ({ num, title, desc, tags }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`accordion-item ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="accordion-header">
                <div className="accordion-title">
                    <span className="accordion-num">({num})</span>
                    {title}
                </div>
                <div className="accordion-arrow">▼</div>
            </div>
            <div className="accordion-body">
                <p className="accordion-desc">{desc}</p>
                <div className="tag-container">
                    {tags && tags.map(tag => (
                        <span key={tag} className="tag mono">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const BenefitBox = ({ icon, title, text }) => (
    <div className="benefit-box border-r border-b">
        <div className="mono" style={{marginBottom: '20px', fontSize: '1.5rem'}}>{icon}</div>
        <h3 className="benefit-title">{title}</h3>
        <p className="benefit-text">{text}</p>
    </div>
);

// --- LEGAL COMPONENTS ---

const LegalPage = ({ title, lastUpdated, children }) => (
    <div className="legal-container">
        <header className="pad-x pad-y border-b">
            <div className="hero-meta mono" style={{ color: '#ff4444', fontWeight: '800' }}>
                [!] DRAFT VERSION: TESTING PURPOSES ONLY
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>{title}</h1>
            <p className="mono" style={{ marginTop: '20px', opacity: 0.6 }}>Last Updated: {lastUpdated}</p>
        </header>
        <div className="pad-x pad-y legal-body">
            {children}
            <div className="legal-warning-box">
                <p><strong>LEGAL DISCLAIMER:</strong> This document is a placeholder generated for UI testing for MarketMaze LLP. It is not a legally binding agreement. Please replace this with professional legal documentation before final deployment.</p>
            </div>
        </div>
    </div>
);

// --- MAIN APP ---

export default function App() {
    const [theme, setTheme] = useState('light');
    const [currentView, setCurrentView] = useState('home'); // 'home', 'privacy', 'terms'

    const dotRef = useRef(null);
    const outlineRef = useRef(null);

    const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    const navigateTo = (view) => {
        setCurrentView(view);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (theme === 'dark') document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
    }, [theme]);

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            if (dotRef.current && outlineRef.current) {
                dotRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
                outlineRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
            }
        };
        const handleInteraction = () => document.body.classList.add("cursor-active");
        const handleReset = () => document.body.classList.remove("cursor-active");

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleInteraction);
        window.addEventListener("mouseup", handleReset);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleInteraction);
            window.removeEventListener("mouseup", handleReset);
        };
    }, [currentView]); // Re-run cursor logic on view change to re-bind elements

    return (
        <>
            <div ref={dotRef} className="cursor-dot"></div>
            <div ref={outlineRef} className="cursor-outline"></div>
            <div className="noise"></div>

            <div className="container">
                <nav className="nav-bar">
                    <div className="logo" onClick={() => navigateTo('home')} style={{cursor: 'pointer'}}>
                        <img src={marketMazeLogo} alt="MarketMaze" className="nav-logo-img" />
                        MarketMaze
                    </div>
                    <div className="nav-right">
                        <div className="nav-links mono">
                            {currentView === 'home' ? (
                                <>
                                    <a href="#services">Services</a>
                                    <a href="#team">Team</a>
                                </>
                            ) : (
                                <button onClick={() => navigateTo('home')} className="mono" style={{background: 'none', border: 'none', cursor: 'pointer', color: 'inherit'}}>← Return</button>
                            )}
                        </div>
                        <a href="#contact" className="nav-cta mono">Book Call</a>
                        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                            {theme === 'light' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            )}
                        </button>
                    </div>
                </nav>

                {currentView === 'home' && (
                    <main>
                        <header className="hero-section pad-x border-b">
                            <RevealOnScroll>
                                <div className="hero-meta mono">
                                    <span>/// EST. 2025</span>
                                    <span style={{color: 'var(--ink)', fontWeight: 'bold'}}><LiveClock /></span>
                                    <span>AGENCY PORTAL</span>
                                </div>
                                <h1>Build.<br/><span className="outline-text">Scale.</span><br/>Dominate.</h1>
                                <div className="hero-footer">
                                    <p className="hero-sub">We are the strategic partner for ambitious founders. Turning uncertainty into measurable leverage.</p>
                                    <div className="scroll-indicator">↓</div>
                                </div>
                            </RevealOnScroll>
                        </header>

                        <div className="marquee-container border-b">
                            <div className="marquee-content mono">
                                // STRATEGIC CONSULTING // DIGITAL TRANSFORMATION // BRAND AUTHORITY // MARKET EXPANSION // REVENUE OPTIMIZATION //
                            </div>
                        </div>

                        <section className="border-b">
                            <RevealOnScroll>
                                <div className="pad-x pad-y-sm border-b header-flex">
                                    <h2>The Advantage</h2>
                                    <span className="mono">WHY MarketMaze</span>
                                </div>
                            </RevealOnScroll>
                            <div className="benefits-grid">
                                <BenefitBox icon="01" title="Strategic Depth" text="We don't just execute tasks; we align every action with your long-term business objectives." />
                                <BenefitBox icon="02" title="Speed of Execution" text="In the modern economy, speed is currency. We deploy solutions faster than traditional agencies." />
                                <BenefitBox icon="03" title="Data-First Approach" text="Creativity without data is just art. We use analytics to validate every decision." />
                                <BenefitBox icon="04" title="Global Standards" text="Based in Hyderabad, building for the world. Our code quality meets international benchmarks." />
                            </div>
                        </section>

                        <section id="services">
                            <RevealOnScroll>
                                <div className="pad-x pad-y border-b header-flex">
                                    <h2>Capabilities</h2>
                                    <span className="mono">CORE OFFERINGS</span>
                                </div>
                            </RevealOnScroll>
                            <Accordion num="01" title="Brand Strategy" desc="Comprehensive identity systems that position you as a market leader." tags={['IDENTITY', 'POSITIONING', 'UI/UX']} />
                            <Accordion num="02" title="Growth Engines" desc="Performance marketing designed to generate revenue." tags={['SEO', 'PERFORMANCE ADS', 'ANALYTICS']} />
                            <Accordion num="03" title="Media Production" desc="High-fidelity corporate content." tags={['VIDEO', 'PHOTOGRAPHY', 'MOTION']} />
                        </section>

                        <section id="team">
                            <RevealOnScroll>
                                <div className="pad-x pad-y border-b"><h2>Leadership</h2></div>
                            </RevealOnScroll>
                            <div className="founders-grid">
                                <div className="founder-col"><span className="founder-role mono">DESIGNATED PARTNER</span><h3 className="founder-name">Abhiram Rentala</h3></div>
                                <div className="founder-col"><span className="founder-role mono">MANAGING PARTNER</span><h3 className="founder-name">Sasidhar Bezawada</h3></div>
                                <div className="founder-col"><span className="founder-role mono">DESIGNATED PARTNER</span><h3 className="founder-name">Aman Gyani</h3></div>
                                <div className="founder-col"><span className="founder-role mono">EXECUTIVE MANAGER</span><h3 className="founder-name">Kalyan Mourya</h3></div>
                            </div>
                        </section>

                        <section id="contact" className="pad-x pad-y">
                            <RevealOnScroll>
                                <div className="contact-layout">
                                    <div>
                                        <h2 style={{ lineHeight: '0.9' }}>Start<br/>The<br/>Work.</h2>
                                        <p className="mono contact-details">HYDERABAD HQ<br/>+91 91107 43392<br/>HELLO@MARKETMAZE.IN</p>
                                    </div>
                                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                                        <div><label className="mono input-label">01. Name</label><input type="text" className="big-input" placeholder="ENTER FULL NAME" /></div>
                                        <div><label className="mono input-label">02. Email</label><input type="email" className="big-input" placeholder="ENTER EMAIL ADDRESS" /></div>
                                        <button type="submit" className="submit-btn mono">TRANSMIT PROPOSAL -></button>
                                    </form>
                                </div>
                            </RevealOnScroll>
                        </section>
                    </main>
                )}

                {currentView === 'privacy' && (
                    <LegalPage title="Privacy Policy" lastUpdated="Dec 2025">
                        <h3 className="mono">01. Information Collection</h3>
                        <p>We collect information you provide directly to us via our contact forms. This may include your name, email address, and project details.</p>
                        <h3 className="mono" style={{marginTop: '40px'}}>02. Usage of Data</h3>
                        <p>Data is used exclusively to contact you regarding your inquiries. We do not sell or share your data with third-party marketing entities.</p>
                        <h3 className="mono" style={{marginTop: '40px'}}>03. Cookies</h3>
                        <p>We use session-based cookies to maintain your theme preferences and optimize site performance.</p>
                    </LegalPage>
                )}

                {currentView === 'terms' && (
                    <LegalPage title="Terms of Service" lastUpdated="Dec 2025">
                        <h3 className="mono">01. Services</h3>
                        <p>MarketMaze LLP provides strategic consulting and digital transformation services. Engagement terms are defined on a per-project basis.</p>
                        <h3 className="mono" style={{marginTop: '40px'}}>02. Intellectual Property</h3>
                        <p>All content on this site, including the design systems and branding, is the property of MarketMaze LLP and protected by Indian copyright laws.</p>
                        <h3 className="mono" style={{marginTop: '40px'}}>03. Limitation of Liability</h3>
                        <p>We are not liable for any indirect or consequential losses arising from the use of our digital assets or consulting services.</p>
                    </LegalPage>
                )}

                <footer className="border-t pad-x footer-flex">
                    <div className="footer-col">
                        <span className="mono" style={{fontWeight:'700'}}>MARKETMAZE LLP</span>
                        <p className="mono" style={{marginTop:'10px', fontSize:'0.7rem', opacity:'0.6'}}>Registered in India.<br/>All Rights Reserved.</p>
                    </div>
                    <div className="footer-col">
                        <span className="mono">Socials</span>
                        <div style={{marginTop:'10px', display:'flex', flexDirection:'column', gap:'5px'}}>
                            <a href="https://www.linkedin.com/company/106402840" target="_blank" rel="noopener noreferrer" className="mono footer-link">LinkedIn</a>
                            <a href="https://www.instagram.com/marketmazein/" target="_blank" rel="noopener noreferrer" className="mono footer-link">Instagram</a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <span className="mono">Legal</span>
                        <div style={{marginTop:'10px', display:'flex', flexDirection:'column', gap:'5px'}}>
                            <button onClick={() => navigateTo('privacy')} className="mono footer-link" style={{background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer'}}>Privacy Policy</button>
                            <button onClick={() => navigateTo('terms')} className="mono footer-link" style={{background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer'}}>Terms of Service</button>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}