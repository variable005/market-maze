import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// IMPORT YOUR LOGO
import marketMazeLogo from "./assets/marketmaze.svg";

// --- DATA: SERVICES CONFIGURATION ---
const servicesData = [
    {
        id: "01",
        title: "Market Research",
        desc: "We conduct in-depth market studies and consumer surveys to deliver actionable insights that drive smart, strategic decisions.",
        tags: ["DATA MINING", "SURVEYS", "FORECASTING"]
    },
    {
        id: "02",
        title: "Marketing & Branding",
        desc: "From digital campaigns and social media to billboard ads and brand storytelling, we craft compelling strategies tailored for diverse audiences.",
        tags: ["CAMPAIGNS", "IDENTITY", "SOCIAL"]
    },
    {
        id: "03",
        title: "Ad Shoots & Video",
        desc: "We create high-impact video content and ad shoots that grab attention and boost your brand’s visibility across all platforms.",
        tags: ["PRODUCTION", "DIRECTION", "EDITING"]
    },
    {
        id: "04",
        title: "Logistics Solutions",
        desc: "Our innovative strategies improve efficiency, cut costs, and keep your operations running smoothly through the supply chain.",
        tags: ["SUPPLY CHAIN", "FLEET", "OPTIMIZATION"]
    },
    {
        id: "05",
        title: "Product Management",
        desc: "We help you refine offerings, solve operational challenges, and build effective go-to-market plans for new and existing products.",
        tags: ["LIFECYCLE", "ROADMAP", "LAUNCH"]
    },
    {
        id: "06",
        title: "Business Ops Consulting",
        desc: "From process optimization to long-term planning, we tackle critical issues to ensure sustainable business growth.",
        tags: ["SCALING", "PROCESS", "AUDITS"]
    }
];

// --- DATA: FAQ CONFIGURATION ---
const faqData = [
    {
        q: "What industries do you specialize in?",
        a: "We are industry-agnostic but have deep expertise in Manufacturing, Logistics, FMCG, and Tech Startups. Our data-driven approach adapts to any market sector."
    },
    {
        q: "How does the engagement model work?",
        a: "We offer both project-based retainers and long-term strategic partnerships. We start with a discovery audit to determine the best fit for your goals."
    },
    {
        q: "Do you handle international markets?",
        a: "Yes. While our HQ is in Hyderabad, our research and digital capabilities allow us to execute campaigns and studies for global markets, including the US, UAE, and EU."
    },
    {
        q: "What is your typical project timeline?",
        a: "Timelines vary by scope. A market research report may take 2-4 weeks, while a full branding overhaul or logistics optimization project typically runs 3-6 months."
    },
    {
        q: "How do you measure success?",
        a: "We don't deal in vanity metrics. We define KPIs (Revenue, CAC, ROAS, Efficiency) at the start and report strictly on those numbers."
    }
];

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

const BenefitBox = ({ icon, title, text }) => (
    <div className="benefit-box border-r border-b">
        <div className="mono" style={{marginBottom: '20px', fontSize: '1.5rem'}}>{icon}</div>
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

            {/* DESKTOP VIEW: INTERACTIVE DECK */}
            <div className="deck-container desktop-only">
                {/* LEFT: MENU */}
                <div className="deck-menu border-r">
                    {servicesData.map((service, index) => (
                        <div
                            key={service.id}
                            className={`deck-item ${activeService === index ? 'active' : ''}`}
                            onMouseEnter={() => setActiveService(index)}
                        >
                            <span className="mono deck-num">{service.id}</span>
                            <span className="deck-title">{service.title}</span>
                            <div className="deck-indicator">→</div>
                        </div>
                    ))}
                </div>

                {/* RIGHT: DISPLAY */}
                <div className="deck-display">
                    <div className="display-content" key={activeService}>
                        <div className="mono display-header">
                            <span>// MODULE: {servicesData[activeService].title}</span>
                            <span className="status-blink">● ACTIVE</span>
                        </div>

                        <h3 className="display-big-title">
                            {servicesData[activeService].title.split(" ")[0]}
                            <br />
                            <span className="outline-text">
                                {servicesData[activeService].title.split(" ").slice(1).join(" ")}
                            </span>
                        </h3>

                        <p className="display-desc">{servicesData[activeService].desc}</p>

                        <div className="display-tags">
                            {servicesData[activeService].tags.map(tag => (
                                <span key={tag} className="tag mono">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Decorative Background Number */}
                    <div className="bg-huge-num">{servicesData[activeService].id}</div>
                </div>
            </div>

            {/* MOBILE VIEW: STACKED LIST */}
            <div className="mobile-services mobile-only">
                {servicesData.map((service) => (
                    <div key={service.id} className="mobile-service-card border-b pad-x pad-y-sm">
                        <div className="mono" style={{marginBottom: '10px', opacity:0.5}}>{service.id}</div>
                        <h3 style={{fontSize: '2rem', marginBottom: '15px'}}>{service.title}</h3>
                        <p style={{marginBottom: '20px', opacity: 0.8}}>{service.desc}</p>
                        <div className="tag-container">
                            {service.tags.map(tag => (
                                <span key={tag} className="tag mono">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- NEW COMPONENT: FAQ SECTION ---
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="border-b">
            <RevealOnScroll>
                <div className="pad-x pad-y-sm border-b header-flex">
                    <h2>Inquiries</h2>
                    <span className="mono">F.A.Q. PROTOCOL</span>
                </div>
            </RevealOnScroll>

            <div className="faq-container">
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className={`faq-item ${openIndex === index ? 'open' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            <span className="faq-q-text">{item.q}</span>
                            <span className="faq-toggle mono">
                                {openIndex === index ? '[-]' : '[+]'}
                            </span>
                        </div>
                        <div className="faq-answer">
                            <div className="faq-answer-inner">
                                {item.a}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};


// --- MAIN APP ---

export default function App() {
    const [theme, setTheme] = useState('light');

    // Cursor Refs
    const dotRef = useRef(null);
    const outlineRef = useRef(null);

    const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    useEffect(() => {
        if (theme === 'dark') document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
    }, [theme]);

    // Custom Cursor Logic
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
    }, []);

    // --- SCROLL FUNCTION ---
    const handleScrollDown = () => {
        const nextSection = document.getElementById('explore-target');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div ref={dotRef} className="cursor-dot"></div>
            <div ref={outlineRef} className="cursor-outline"></div>
            <div className="noise"></div>

            <div className="container">
                <nav className="nav-bar">
                    <div className="logo" onClick={() => window.scrollTo(0,0)} style={{cursor: 'pointer'}}>
                        <img src={marketMazeLogo} alt="MarketMaze" className="nav-logo-img" />
                        MarketMaze
                    </div>
                    <div className="nav-right">
                        <div className="nav-links mono">
                            <a href="#services">Services</a>
                            <a href="#team">Team</a>
                            <a href="#faq">FAQ</a>
                        </div>
                        <a href="#contact" className="nav-cta mono">Contact</a>
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
                    <header className="hero-section pad-x border-b">
                        <RevealOnScroll>
                            <div className="hero-meta mono">
                                <span style={{color: 'var(--ink)', fontWeight: 'bold'}}><LiveClock /></span>
                                <span>AGENCY FIRM</span>
                            </div>

                            <h1 className="hero-title">
                                navigate the Market<br/>
                                <span className="outline-text">master the maze</span>
                            </h1>

                            <div className="hero-footer">
                                <p className="hero-sub">We are the strategic partner for ambitious founders. Turning uncertainty into measurable leverage.</p>
                                {/* CLICKABLE ARROW */}
                                <div className="scroll-indicator" onClick={handleScrollDown}>↓</div>
                            </div>
                        </RevealOnScroll>
                    </header>

                    {/* ADDED ID FOR SCROLL TARGET */}
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
                            <div className="founder-col"><span className="founder-role mono">EXECUTIVE PARTNER</span><h3 className="founder-name">Abhiram Rentala</h3></div>
                            <div className="founder-col"><span className="founder-role mono">MANAGING PARTNER</span><h3 className="founder-name">Sasidhar Bezawada</h3></div>
                            <div className="founder-col"><span className="founder-role mono">DESIGNATED PARTNER</span><h3 className="founder-name">Aman Gyani</h3></div>
                            <div className="founder-col"><span className="founder-role mono">EXECUTIVE MANAGER</span><h3 className="founder-name">Kalyan Mourya</h3></div>
                        </div>
                    </section>

                    {/* NEW FAQ SECTION */}
                    <FAQSection />

                    <section id="contact" className="pad-x pad-y">
                        <RevealOnScroll>
                            <div className="contact-layout">
                                <div>
                                    <h2 style={{ lineHeight: '0.9' }}>Start<br/>The<br/>Work.</h2>
                                    <p className="mono contact-details">HYDERABAD HQ<br/>+91 91771 06693<br/>BUSINESS@MARKETMAZE.IN</p>
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
                                    <div>
                                        <label className="mono input-label">01. Name</label>
                                        <input type="text" name="name" className="big-input" placeholder="ENTER FULL NAME" required />
                                    </div>
                                    <div>
                                        <label className="mono input-label">02. Email</label>
                                        <input type="email" name="email" className="big-input" placeholder="ENTER EMAIL ADDRESS" required />
                                    </div>
                                    <div>
                                        <label className="mono input-label">03. Phone Number</label>
                                        <input type="tel" name="phone" className="big-input" placeholder="ENTER PHONE (OPTIONAL)" />
                                    </div>
                                    <div>
                                        <label className="mono input-label">04. Project Details</label>
                                        <textarea
                                            name="message"
                                            className="big-input"
                                            placeholder="TELL US ABOUT YOUR GOALS..."
                                            rows="3"
                                            style={{resize: 'vertical', minHeight: '100px'}}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="submit-btn mono">TRANSMIT PROPOSAL -></button>
                                </form>
                            </div>
                        </RevealOnScroll>
                    </section>
                </main>

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
                </footer>
            </div>
        </>
    );
}