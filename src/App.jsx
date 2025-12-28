import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// IMPORT YOUR LOGO
import marketMazeLogo from "./assets/marketmaze.svg";

// --- HOOKS & UTILS ---

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

// --- SUB-COMPONENTS ---

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

// --- MAIN APP ---

export default function App() {
    const [theme, setTheme] = useState('light');

    // Cursor Refs
    const dotRef = useRef(null);
    const outlineRef = useRef(null);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [theme]);

    // MOUSE ANIMATION LOGIC
    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            if (dotRef.current && outlineRef.current) {
                dotRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
                outlineRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
            }
        };

        const handleMouseDown = () => document.body.classList.add("cursor-active");
        const handleMouseUp = () => document.body.classList.remove("cursor-active");

        const handleHoverStart = () => document.body.classList.add("cursor-active");
        const handleHoverEnd = () => document.body.classList.remove("cursor-active");

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        // Add hover listeners to all interactive elements
        const interactives = document.querySelectorAll('a, button, .accordion-item, input, .outline-text');
        interactives.forEach((el) => {
            el.addEventListener("mouseenter", handleHoverStart);
            el.addEventListener("mouseleave", handleHoverEnd);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            interactives.forEach((el) => {
                el.removeEventListener("mouseenter", handleHoverStart);
                el.removeEventListener("mouseleave", handleHoverEnd);
            });
        };
    }, []);

    return (
        <>
            {/* Custom Cursor Elements */}
            <div ref={dotRef} className="cursor-dot"></div>
            <div ref={outlineRef} className="cursor-outline"></div>

            <div className="noise"></div>

            <div className="container">
                <nav className="nav-bar">
                    <div className="logo">
                        <img src={marketMazeLogo} alt="MarketMaze" className="nav-logo-img" />
                        MarketMaze
                    </div>
                    <div className="nav-right">
                        <div className="nav-links mono">
                            <a href="#services">Services</a>
                            <a href="#team">Team</a>
                        </div>
                        <a href="#contact" className="nav-cta mono">Book Call</a>
                        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                            {theme === 'light' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            )}
                        </button>
                    </div>
                </nav>

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
                        <BenefitBox icon="01" title="Strategic Depth" text="We don't just execute tasks; we align every action with your long-term business objectives to ensure sustainability." />
                        <BenefitBox icon="02" title="Speed of Execution" text="In the modern economy, speed is currency. We deploy campaigns and technical solutions faster than traditional agencies." />
                        <BenefitBox icon="03" title="Data-First Approach" text="Creativity without data is just art. We use rigorous analytics to validate every decision we make for your brand." />
                        <BenefitBox icon="04" title="Global Standards" text="Based in Hyderabad, building for the world. Our design systems and code quality meet international benchmarks." />
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

                <section id="process" className="pad-x pad-y border-b">
                    <RevealOnScroll>
                        <div className="header-flex" style={{marginBottom: '60px'}}>
                            <h2>Methodology</h2>
                            <span className="mono">OPERATING PROCEDURE</span>
                        </div>
                    </RevealOnScroll>
                    <div className="protocol-grid">
                        <RevealOnScroll><div className="protocol-card"><span className="mono big-num">PHASE I</span><h3>Audit & Insight</h3><p>We analyze market gaps and competitor weaknesses.</p></div></RevealOnScroll>
                        <RevealOnScroll><div className="protocol-card"><span className="mono big-num">PHASE II</span><h3>Deploy & Scale</h3><p>Execution at speed with precision.</p></div></RevealOnScroll>
                        <RevealOnScroll><div className="protocol-card"><span className="mono big-num">PHASE III</span><h3>Optimize</h3><p>Continuous refinement based on real-world feedback.</p></div></RevealOnScroll>
                    </div>
                </section>

                <section id="team">
                    <RevealOnScroll>
                        <div className="pad-x pad-y border-b"><h2>Leadership</h2></div>
                    </RevealOnScroll>
                    <div className="founders-grid">
                        <div className="founder-col"><span className="founder-role mono">DESIGNATED PARTNER</span><h3 className="founder-name">Abhiram Rentala</h3><p className="founder-bio">Leads strategic direction.</p></div>
                        <div className="founder-col"><span className="founder-role mono">MANAGING PARTNER</span><h3 className="founder-name">Sasidhar Bezawada</h3><p className="founder-bio">Oversees operations.</p></div>
                        <div className="founder-col"><span className="founder-role mono">DESIGNATED PARTNER</span><h3 className="founder-name">Aman Gyani</h3><p className="founder-bio">Heads financial structuring.</p></div>
                        <div className="founder-col"><span className="founder-role mono">EXECUTIVE MANAGER</span><h3 className="founder-name">Kalyan Mourya</h3><p className="founder-bio">The operational anchor.</p></div>
                    </div>
                </section>

                <section className="pad-x pad-y border-b faq-section">
                    <RevealOnScroll>
                        <div className="header-flex" style={{marginBottom: '40px'}}>
                            <h2>Common Queries</h2>
                            <span className="mono">FAQ</span>
                        </div>
                        <div className="faq-container">
                            <Accordion num="Q1" title="What industries do you serve?" desc="FinTech, D2C, Real Estate, and SaaS." tags={[]} />
                            <Accordion num="Q2" title="How do you structure engagements?" desc="Retainers and long-term partnerships." tags={[]} />
                            <Accordion num="Q3" title="Do you handle technical development?" desc="Yes, we have full-stack capabilities." tags={[]} />
                        </div>
                    </RevealOnScroll>
                </section>

                <section id="contact" className="pad-x pad-y">
                    <RevealOnScroll>
                        <div className="contact-layout">
                            <div>
                                <h2 style={{ lineHeight: '0.9' }}>Start<br/>The<br/>Work.</h2>
                                <p className="mono contact-details">HYDERABAD HQ<br/>+91 91107 43392<br/>HELLO@MARKETMAZE.IN</p>
                            </div>
                            <form className="contact-form">
                                <div><label className="mono input-label">01. Name</label><input type="text" className="big-input" placeholder="ENTER FULL NAME" /></div>
                                <div><label className="mono input-label">02. Email</label><input type="email" className="big-input" placeholder="ENTER EMAIL ADDRESS" /></div>
                                <div><label className="mono input-label">03. Context</label><input type="text" className="big-input" placeholder="PROJECT DETAILS..." /></div>
                                <button type="submit" className="submit-btn mono">TRANSMIT PROPOSAL -></button>
                            </form>
                        </div>
                    </RevealOnScroll>
                </section>

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
                            <a href="#" className="mono footer-link">Twitter / X</a>
                        </div>
                    </div>
                    <div className="footer-col"><span className="mono">Legal</span><div style={{marginTop:'10px', display:'flex', flexDirection:'column', gap:'5px'}}><a href="#" className="mono footer-link">Privacy Policy</a><a href="#" className="mono footer-link">Terms of Service</a></div></div>
                </footer>
            </div>
        </>
    );
}