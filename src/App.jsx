import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// IMPORT YOUR LOGO
// Make sure this path is correct in your project structure
import marketMazeLogo from "./assets/marketmaze.svg";
import Portfolio from "./components/Portfolio";

// --- DATA: SERVICES CONFIGURATION ---
const servicesData = [
    {
        id: "01",
        title: "Market Research",
        desc: "We conduct in-depth market studies and consumer surveys to deliver actionable insights.",
        tags: ["DATA MINING", "SURVEYS", "FORECASTING"]
    },
    {
        id: "02",
        title: "Marketing & Branding",
        desc: "From digital campaigns to brand storytelling, we craft compelling strategies.",
        tags: ["CAMPAIGNS", "IDENTITY", "SOCIAL"]
    },
    {
        id: "03",
        title: "Ad Shoots & Video",
        desc: "We create high-impact video content that grabs attention.",
        tags: ["PRODUCTION", "DIRECTION", "EDITING"]
    },
    {
        id: "04",
        title: "Logistics Solutions",
        desc: "Innovative strategies to improve efficiency and cut costs.",
        tags: ["SUPPLY CHAIN", "FLEET", "OPTIMIZATION"]
    },
    {
        id: "05",
        title: "Product Management",
        desc: "We help you refine offerings and build effective go-to-market plans.",
        tags: ["LIFECYCLE", "ROADMAP", "LAUNCH"]
    },
    {
        id: "06",
        title: "Business Ops Consulting",
        desc: "Tackling critical issues to ensure sustainable business growth.",
        tags: ["SCALING", "PROCESS", "AUDITS"]
    }
];

// --- DATA: LEADERSHIP TEAM ---
const leadershipData = [
    {
        name: "Abhiram Rentala",
        role: "EXECUTIVE PARTNER",
        linkedin: "https://www.linkedin.com/in/abhiram-rentala-11ab0a1a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    {
        name: "Sasidhar Bezawada",
        role: "MANAGING PARTNER",
        linkedin: "https://www.linkedin.com/in/b-sasidhar-b02b56252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    {
        name: "Aman Gyani",
        role: "DESIGNATED PARTNER",
        linkedin: "https://www.linkedin.com/in/aman-gyani-7495421a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    }
];

// --- DATA: FAQ ---
const faqData = [
    { q: "What industries do you specialize in?", a: "We are industry-agnostic but have deep expertise in Manufacturing, Logistics, FMCG, and Tech Startups." },
    { q: "How does the engagement model work?", a: "We offer both project-based retainers and long-term strategic partnerships." },
    { q: "Do you handle international markets?", a: "Yes. We execute campaigns and studies for global markets, including the US, UAE, and EU." },
    { q: "What is your typical project timeline?", a: "Timelines vary. A research report may take 2-4 weeks, while a branding overhaul takes 3-6 months." },
    { q: "How do you measure success?", a: "We define KPIs (Revenue, CAC, ROAS, Efficiency) at the start and report strictly on those numbers." }
];

// --- UTILS & COMPONENTS ---

const RevealOnScroll = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
            { threshold: 0.1 }
        );
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    return <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>{children}</div>;
};

const LiveClock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    return <span>{time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST</span>;
};

const BenefitBox = ({ icon, title, text }) => (
    <div className="benefit-box border-r border-b">
        <div className="mono" style={{ marginBottom: '20px', fontSize: '1.2rem' }}>{icon}</div>
        <h3 className="benefit-title">{title}</h3>
        <p className="benefit-text">{text}</p>
    </div>
);


// --- COMPONENT: SERVICES DECK ---
const ServicesDeck = () => {
    const [activeService, setActiveService] = useState(0);
    return (
        <section id="services" className="border-b">
            <RevealOnScroll>
                <div className="pad-x pad-y-sm border-b header-flex">
                    <h2>Services</h2>
                    <span className="mono">CORE MODULES</span>
                </div>
            </RevealOnScroll>

            {/* DESKTOP VIEW */}
            <div className="deck-container desktop-only">
                <div className="deck-menu border-r">
                    {servicesData.map((service, index) => (
                        <div key={service.id} className={`deck-item ${activeService === index ? 'active' : ''}`} onMouseEnter={() => setActiveService(index)}>
                            <span className="mono deck-num">{service.id}</span>
                            <span className="deck-title">{service.title}</span>
                            <div className="deck-indicator">→</div>
                        </div>
                    ))}
                </div>
                <div className="deck-display">
                    <div className="display-content" key={activeService}>
                        <div className="mono display-header">
                            <span>// MODULE: {servicesData[activeService].title}</span>
                            <span className="status-blink">● ACTIVE</span>
                        </div>
                        <h3 className="display-big-title">
                            {servicesData[activeService].title.split(" ")[0]}
                            <br />
                            <span className="outline-text">{servicesData[activeService].title.split(" ").slice(1).join(" ")}</span>
                        </h3>
                        <p className="display-desc">{servicesData[activeService].desc}</p>
                        <div className="display-tags">{servicesData[activeService].tags.map(tag => (<span key={tag} className="tag mono">{tag}</span>))}</div>
                    </div>
                    <div className="bg-huge-num">{servicesData[activeService].id}</div>
                </div>
            </div>

            {/* MOBILE VIEW - OPTIMIZED HORIZONTAL CAROUSEL */}
            <div className="mobile-services-container mobile-only">
                <p className="mono swipe-hint text-center opacity-50" style={{ marginBottom: '30px', textAlign: 'center' }}>&lt;&lt; SWIPE TO EXPLORE &gt;&gt;</p>

                <div className="mobile-carousel">
                    {servicesData.map((service) => (
                        <div key={service.id} className="mobile-service-card">
                            <div className="card-top-row">
                                <span className="mono card-id">{service.id}</span>
                                <span className="mono card-dots">●●●</span>
                            </div>
                            <h3 className="card-title">{service.title}</h3>
                            <p className="card-desc">{service.desc}</p>
                            <div className="tag-container mt-auto">
                                {service.tags.map(tag => (<span key={tag} className="tag mono">{tag}</span>))}
                            </div>
                        </div>
                    ))}
                    {/* SPACER FOR END OF SCROLL */}
                    <div style={{ minWidth: '20px' }}></div>
                </div>
            </div>
        </section>
    );
};

// --- COMPONENT: FAQ SECTION ---
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);
    return (
        <section id="faq" className="border-b">
            <RevealOnScroll>
                <div className="pad-x pad-y-sm border-b header-flex">
                    <h2>Inquiries</h2>
                    <span className="mono">F.A.Q.</span>
                </div>
            </RevealOnScroll>
            <div className="faq-container">
                {faqData.map((item, index) => (
                    <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`} onClick={() => toggleFAQ(index)}>
                        <div className="faq-question">
                            <span className="faq-q-text">{item.q}</span>
                            <span className="faq-toggle mono">{openIndex === index ? '[-]' : '[+]'}</span>
                        </div>
                        <div className="faq-answer"><div className="faq-answer-inner">{item.a}</div></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- COMPONENT: LIQUID POPUP MENU ---
const MenuPopup = ({ isOpen, onClose, onSelectView }) => {
    const links = [
        { name: "Services", href: "#services", id: "01", view: "home" },
        { name: "Portfolio", href: "#portfolio", id: "02", view: "portfolio" },
        { name: "Leadership", href: "#team", id: "03", view: "home" },
        { name: "FAQ", href: "#faq", id: "04", view: "home" },
    ];

    return (
        <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
            <div className="menu-backdrop" onClick={onClose}></div>
            <div className="menu-card">
                <div className="menu-header mono">
                    <span>// SYSTEM NAVIGATION</span>
                    <button onClick={onClose} className="menu-close-btn">ESC</button>
                </div>

                <div className="menu-links">
                    {links.map((link, index) => (
                        <a
                            href={link.href}
                            key={link.id}
                            className="menu-link-item"
                            onClick={() => {
                                onClose();
                                if (onSelectView) onSelectView(link.view);
                            }}
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            <span className="menu-link-text">{link.name}</span>
                            <span className="menu-dots desktop-only-hide"></span>
                            <span className="menu-link-num mono">{link.id}</span>
                        </a>
                    ))}

                    <a
                        href="#contact"
                        className="menu-link-item highlight"
                        onClick={() => {
                            onClose();
                            if (onSelectView) onSelectView("home");
                        }}
                        style={{ transitionDelay: `${links.length * 0.1}s` }}
                    >
                        <span className="menu-link-text">INITIATE PROJECT -&gt;</span>
                    </a>
                </div>

                <div className="menu-footer mono">
                    <div className="menu-stat-row">
                        <span>STATUS: ONLINE</span>
                        <span>V.2.0.4</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENT: PRELOADER (PATHFINDING MAZE) ---
const Preloader = ({ onComplete }) => {
    const [phase, setPhase] = useState("drawing"); // drawing, fade

    useEffect(() => {
        // Animation timing: 2.8s for path to draw, then fade out directly
        const timer1 = setTimeout(() => {
            setPhase("fade");
            setTimeout(onComplete, 600); // Wait for fade out
        }, 3000);

        return () => clearTimeout(timer1);
    }, [onComplete]);

    // Generate a 10x10 grid (100 cells)
    const gridSize = 10;
    const gridItems = Array.from({ length: gridSize * gridSize }, (_, i) => i);

    // Hardcode a stylized "solved path" weaving through the 10x10 block
    // These indices light up sequentially
    const solutionPath = [
        0, 10, 20, 21, 22, 12, 2, 3, 4, 14, 24, 34, 35, 45, 55, 65, 64, 63,
        73, 83, 84, 85, 86, 76, 66, 56, 46, 36, 37, 38, 48, 58, 68, 78, 88, 98, 99
    ];

    return (
        <div className={`preloader-overlay ${phase === 'fade' ? 'fade-out' : ''}`}>
            <div className="preloader-maze-container">
                <div className="preloader-grid-10">
                    {gridItems.map(i => {
                        const isPath = solutionPath.includes(i);
                        const pathIndex = solutionPath.indexOf(i);
                        // Delay drawing based on position in the solved path
                        const delay = isPath ? `${pathIndex * 0.05}s` : '0s';

                        return (
                            <div
                                key={i}
                                className={`preloader-cell-10 ${isPath ? 'is-path' : ''}`}
                                style={{
                                    animationDelay: delay,
                                    // Add a slight random opacity to non-path walls to make it look like a complex maze
                                    opacity: isPath ? 1 : 0.1 + Math.random() * 0.3
                                }}
                            >
                                <div className="wall-top"></div>
                                <div className="wall-left"></div>
                            </div>
                        );
                    })}
                </div>
                <div className="preloader-text mono">NAVIGATING MAZE...</div>
            </div>
            <div className="scanlines"></div>
            <div className="noise"></div>
        </div>
    );
};

// --- MAIN APP ---
export default function App() {
    const [theme, setTheme] = useState('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPreloading, setIsPreloading] = useState(true);
    const [currentView, setCurrentView] = useState(() => {
        return window.location.hash === '#portfolio' ? 'portfolio' : 'home';
    });
    const outlineRef = useRef(null);

    const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    useEffect(() => {
        if (theme === 'dark') document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
    }, [theme]);

    useEffect(() => {
        if (isMenuOpen || isPreloading) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [isMenuOpen, isPreloading]);

    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === '#portfolio') {
                setCurrentView('portfolio');
                window.scrollTo(0, 0);
            } else if (['#services', '#team', '#faq', '#contact', ''].includes(window.location.hash)) {
                setCurrentView('home');
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            if (outlineRef.current) {
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
    }, []);

    const handleScrollDown = () => {
        const nextSection = document.getElementById('explore-target');
        if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
            <div ref={outlineRef} className="cursor-outline"></div>
            <div className="noise"></div>

            <MenuPopup
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onSelectView={(view) => {
                    setCurrentView(view);
                    if (view === 'portfolio') window.scrollTo(0, 0);
                }}
            />

            {/* --- MOBILE DOCK --- */}
            <div className="mobile-dock mobile-only">
                <button
                    className={`dock-btn mono ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{ fontSize: '1.5rem', fontWeight: '500', display: 'grid', placeItems: 'center' }}
                >
                    {isMenuOpen ? '×' : '+'}
                </button>
                <div className="dock-divider"></div>
                <a
                    href="#contact"
                    className="dock-cta mono"
                    onClick={() => {
                        if (currentView !== 'home') setCurrentView('home');
                    }}
                >
                    <span className="status-dot"></span> Contact
                </a>
            </div>

            <div className="container">
                <nav className="nav-bar">
                    <div
                        className="logo"
                        onClick={() => {
                            setCurrentView('home');
                            window.location.hash = '';
                            window.scrollTo(0, 0);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={marketMazeLogo} alt="MarketMaze" className="nav-logo-img" />
                        MarketMaze
                    </div>
                    <div className="nav-right">

                        {/* --- DESKTOP NAVIGATION LINKS --- */}
                        <div className="desktop-only" style={{ display: 'flex', gap: '30px', marginRight: '20px' }}>
                            <a
                                href="#services"
                                className="nav-link mono"
                                onClick={() => setCurrentView('home')}
                            >
                                Services
                            </a>
                            <a
                                href="#portfolio"
                                className={`nav-link mono ${currentView === 'portfolio' ? 'active' : ''}`}
                                onClick={() => {
                                    setCurrentView('portfolio');
                                    window.scrollTo(0, 0);
                                }}
                            >
                                Portfolio
                            </a>
                            <a
                                href="#team"
                                className="nav-link mono"
                                onClick={() => setCurrentView('home')}
                            >
                                Leadership
                            </a>
                            <a
                                href="#faq"
                                className="nav-link mono"
                                onClick={() => setCurrentView('home')}
                            >
                                FAQ
                            </a>
                        </div>

                        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                            {theme === 'light' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                            )}
                        </button>
                    </div>
                </nav>

                <main>
                    {currentView === 'portfolio' ? (
                        <Portfolio
                            onBackToHome={() => {
                                setCurrentView('home');
                                window.location.hash = '';
                                window.scrollTo(0, 0);
                            }}
                            onOpenContact={() => {
                                setCurrentView('home');
                                window.location.hash = '#contact';
                                setTimeout(() => {
                                    const contactEl = document.getElementById('contact');
                                    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                        />
                    ) : (
                        <>
                            <header className="hero-section pad-x border-b">
                                <RevealOnScroll>
                                    <div className="hero-meta mono">
                                        <span style={{ color: 'var(--ink)', fontWeight: 'bold' }}><LiveClock /></span>
                                    </div>
                                    <h1 className="hero-title">
                                        navigate the Market<br />
                                        <span className="outline-text">Master the Maze</span>
                                    </h1>
                                    <div className="hero-footer">
                                        <p className="hero-sub">We are the strategic partner for ambitious founders. Turning uncertainty into measurable leverage.</p>
                                        <div className="scroll-indicator" onClick={handleScrollDown}>↓</div>
                                    </div>
                                </RevealOnScroll>
                            </header>

                            <div id="explore-target" className="marquee-container border-b">
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

                            <ServicesDeck />

                            <section id="team" className="border-b">
                                <RevealOnScroll>
                                    <div className="pad-x pad-y border-b"><h2>Leadership</h2></div>
                                </RevealOnScroll>
                                <div className="founders-grid">
                                    {leadershipData.map((leader, index) => (
                                        <div className="founder-col" key={index}>
                                            <span className="founder-role mono">{leader.role}</span>
                                            <h3 className="founder-name">{leader.name}</h3>
                                            <a
                                                href={leader.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="connect-btn"
                                            >
                                                CONNECT <span>↗</span>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <FAQSection />

                            <section id="contact" className="pad-x pad-y">
                                <RevealOnScroll>
                                    <div className="contact-layout">
                                        <div>
                                            <h2 style={{ lineHeight: '0.9' }}>Start<br />The<br />Work.</h2>
                                            <p className="mono contact-details">HYDERABAD HQ<br />+91 91771 06693<br />BUSINESS@MARKETMAZE.IN</p>
                                        </div>
                                        <form
                                            className="contact-form"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const name = e.target.name.value;
                                                const email = e.target.email.value;
                                                const phone = e.target.phone.value;
                                                const message = e.target.message.value;
                                                const subject = `New Project Inquiry: ${name}`;
                                                const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AProject Details:%0D%0A${message}`;
                                                window.location.href = `mailto:business@marketmaze.in?subject=${subject}&body=${body}`;
                                            }}
                                        >
                                            <div><label className="mono input-label">01. Name</label><input type="text" name="name" className="big-input" placeholder="ENTER FULL NAME" required /></div>
                                            <div><label className="mono input-label">02. Email</label><input type="email" name="email" className="big-input" placeholder="ENTER EMAIL ADDRESS" required /></div>
                                            <div><label className="mono input-label">03. Phone Number</label><input type="tel" name="phone" className="big-input" placeholder="ENTER PHONE (OPTIONAL)" /></div>
                                            <div><label className="mono input-label">04. Project Details</label><textarea name="message" className="big-input" placeholder="TELL US ABOUT YOUR GOALS..." rows="3" style={{ resize: 'vertical', minHeight: '100px' }} required></textarea></div>
                                            <button type="submit" className="submit-btn mono">TRANSMIT PROPOSAL -&gt;</button>
                                        </form>
                                    </div>
                                </RevealOnScroll>
                            </section>
                        </>
                    )}
                </main>

                <footer className="border-t pad-x footer-flex" style={{ marginBottom: '80px' }}>
                    <div className="footer-col">
                        <span className="mono" style={{ fontWeight: '700' }}>MARKETMAZE LLP</span>
                        <p className="mono" style={{ marginTop: '10px', fontSize: '0.7rem', opacity: '0.6' }}>Registered in India.<br />All Rights Reserved.</p>
                    </div>
                    <div className="footer-col">
                        <span className="mono">Navigation</span>
                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <a
                                href="#portfolio"
                                className="mono footer-link"
                                onClick={() => {
                                    setCurrentView('portfolio');
                                    window.scrollTo(0, 0);
                                }}
                            >
                                Portfolio Highlights
                            </a>
                            <a href="#services" onClick={() => setCurrentView('home')} className="mono footer-link">Services Deck</a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <span className="mono">Socials</span>
                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <a href="https://www.linkedin.com/company/106402840" target="_blank" rel="noopener noreferrer" className="mono footer-link">LinkedIn</a>
                            <a href="https://www.instagram.com/marketmazein/" target="_blank" rel="noopener noreferrer" className="mono footer-link">Instagram</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}