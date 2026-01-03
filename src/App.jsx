import React, { useState, useEffect, useRef, useCallback } from "react";
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

// --- COMPONENT: ADVANCED MAZE GAME ---
const MazeGame = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [status, setStatus] = useState("idle"); // idle, playing, won
    const [stats, setStats] = useState({ moves: 0, time: 0 });

    // Game State Refs (Use refs for animation loop performance)
    const gameState = useRef({
        maze: [],
        cols: 25, // Must be odd
        rows: 25, // Must be odd
        cellSize: 0, // Calculated dynamically
        player: { x: 1, y: 1 }, // Logical Grid Position
        visual: { x: 1, y: 1 }, // Pixel/Lerp Position
        trail: [], // Breadcrumbs
        particles: [], // Explosion effects
        startTime: 0,
        animationId: null,
        visibilityRadius: 5 // Grid cells radius
    });

    // 1. MAZE GENERATION (Recursive Backtracker)
    const generateMaze = useCallback(() => {
        const { cols, rows } = gameState.current;
        const newMaze = Array(rows).fill().map(() => Array(cols).fill(1)); // 1 = Wall

        const stack = [];
        const start = { x: 1, y: 1 };
        newMaze[start.y][start.x] = 0;
        stack.push(start);

        const dirs = [{ x: 0, y: -2 }, { x: 0, y: 2 }, { x: -2, y: 0 }, { x: 2, y: 0 }];

        while (stack.length > 0) {
            const current = stack[stack.length - 1];
            // Shuffle
            const shuffledDirs = dirs.sort(() => Math.random() - 0.5);
            let moved = false;

            for (let dir of shuffledDirs) {
                const nx = current.x + dir.x;
                const ny = current.y + dir.y;

                if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && newMaze[ny][nx] === 1) {
                    newMaze[ny][nx] = 0;
                    newMaze[current.y + (dir.y / 2)][current.x + (dir.x / 2)] = 0;
                    stack.push({ x: nx, y: ny });
                    moved = true;
                    break;
                }
            }
            if (!moved) stack.pop();
        }

        // Set Exit
        newMaze[rows - 2][cols - 2] = 0;
        return newMaze;
    }, []);

    // 2. START GAME
    const startGame = () => {
        if (!containerRef.current) return;

        // Resize logic
        const w = containerRef.current.offsetWidth;
        // Limit max width for gameplay sanity
        const maxW = Math.min(w, 600);
        gameState.current.cellSize = Math.floor(maxW / gameState.current.cols);

        gameState.current.maze = generateMaze();
        gameState.current.player = { x: 1, y: 1 };
        gameState.current.visual = { x: 1, y: 1 };
        gameState.current.trail = [];
        gameState.current.particles = [];
        gameState.current.startTime = Date.now();
        setStats({ moves: 0, time: 0 });
        setStatus("playing");

        // Focus for keyboard
        window.focus();
    };

    // 3. RENDER LOOP (The "High Tech" Visuals)
    useEffect(() => {
        if (status !== "playing" && status !== "won") {
            if (gameState.current.animationId) cancelAnimationFrame(gameState.current.animationId);
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { cols, rows, cellSize } = gameState.current;

        // Set canvas physical size
        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;

        // Get CSS Colors
        const style = getComputedStyle(document.body);
        const ink = style.getPropertyValue('--ink').trim();
        const bg = style.getPropertyValue('--bg').trim();

        // Parse Ink color to RGB for opacity tricks
        // (Simple hack: assume it's hex or simple name, defaults to black if complex)

        const render = () => {
            const now = Date.now();

            // A. Update Time
            if (status === 'playing') {
                setStats(prev => ({ ...prev, time: Math.floor((now - gameState.current.startTime) / 1000) }));
            }

            // B. Smooth Visual Movement (Lerp)
            const speed = 0.2; // Smoothness factor
            gameState.current.visual.x += (gameState.current.player.x - gameState.current.visual.x) * speed;
            gameState.current.visual.y += (gameState.current.player.y - gameState.current.visual.y) * speed;

            // C. Clear Canvas
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // D. Draw Trail (Breadcrumbs)
            ctx.fillStyle = ink;
            gameState.current.trail.forEach((pos, i) => {
                const alpha = (i / gameState.current.trail.length) * 0.3;
                ctx.globalAlpha = alpha;
                ctx.fillRect(
                    pos.x * cellSize + cellSize * 0.35,
                    pos.y * cellSize + cellSize * 0.35,
                    cellSize * 0.3,
                    cellSize * 0.3
                );
            });
            ctx.globalAlpha = 1.0;

            // E. Draw Walls (With Fog of War logic)
            // If won, show everything. If playing, only show radius.
            const playerVisX = gameState.current.visual.x;
            const playerVisY = gameState.current.visual.y;
            const radius = gameState.current.visibilityRadius;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const dist = Math.hypot(x - playerVisX, y - playerVisY);

                    if (status === "won" || dist < radius) {
                        // Calculate opacity based on distance (Fading edge)
                        let opacity = 1;
                        if (status !== "won") {
                            opacity = Math.max(0, 1 - (dist / radius));
                        }

                        if (gameState.current.maze[y][x] === 1) {
                            ctx.fillStyle = ink;
                            ctx.globalAlpha = opacity;
                            ctx.fillRect(x * cellSize, y * cellSize, cellSize + 1, cellSize + 1); // +1 fixes subpixel gaps
                        }
                        // Draw Grid lines for "Floor"
                        else {
                            ctx.strokeStyle = ink;
                            ctx.globalAlpha = opacity * 0.1;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
                        }
                    }
                }
            }
            ctx.globalAlpha = 1.0;

            // F. Draw Goal
            const goalX = cols - 2;
            const goalY = rows - 2;
            // Pulse Effect
            const pulse = 1 + Math.sin(now * 0.01) * 0.2;
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.strokeRect(
                (goalX * cellSize) + (cellSize * 0.1),
                (goalY * cellSize) + (cellSize * 0.1),
                cellSize * 0.8 * pulse,
                cellSize * 0.8 * pulse
            );

            // G. Draw Player
            const px = gameState.current.visual.x * cellSize;
            const py = gameState.current.visual.y * cellSize;

            ctx.fillStyle = '#ff0055';
            ctx.shadowColor = '#ff0055';
            ctx.shadowBlur = 15;
            // Draw circle
            ctx.beginPath();
            ctx.arc(px + cellSize/2, py + cellSize/2, cellSize * 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // H. Particle System (Win State)
            if (status === "won") {
                gameState.current.particles.forEach((p, i) => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.02;
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = Math.max(0, p.life);
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                });
                gameState.current.particles = gameState.current.particles.filter(p => p.life > 0);
            }

            gameState.current.animationId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(gameState.current.animationId);
    }, [status]);

    // 4. INPUT HANDLING
    useEffect(() => {
        const move = (dx, dy) => {
            if (status !== "playing") return;

            const { x, y } = gameState.current.player;
            const nx = x + dx;
            const ny = y + dy;

            // Collision Check
            if (gameState.current.maze[ny][nx] === 0) {
                gameState.current.player = { x: nx, y: ny };
                // Add Trail
                gameState.current.trail.push({ x: nx, y: ny });
                setStats(prev => ({ ...prev, moves: prev.moves + 1 }));

                // Win Check
                if (nx === gameState.current.cols - 2 && ny === gameState.current.rows - 2) {
                    setStatus("won");
                    // Explode Particles
                    const canvas = canvasRef.current;
                    const particles = [];
                    for(let i=0; i<50; i++) {
                        particles.push({
                            x: nx * gameState.current.cellSize + gameState.current.cellSize/2,
                            y: ny * gameState.current.cellSize + gameState.current.cellSize/2,
                            vx: (Math.random() - 0.5) * 10,
                            vy: (Math.random() - 0.5) * 10,
                            life: 1.0,
                            color: Math.random() > 0.5 ? '#00ff00' : '#ff0055',
                            size: Math.random() * 5
                        });
                    }
                    gameState.current.particles = particles;
                }
            }
        };

        const handleKey = (e) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
                if (e.key === "ArrowUp") move(0, -1);
                if (e.key === "ArrowDown") move(0, 1);
                if (e.key === "ArrowLeft") move(-1, 0);
                if (e.key === "ArrowRight") move(1, 0);
            }
        };

        window.addEventListener("keydown", handleKey);

        // Expose move to mobile buttons
        gameState.current.move = move;

        return () => window.removeEventListener("keydown", handleKey);
    }, [status]);

    return (
        <section className="maze-section border-b pad-x pad-y" ref={containerRef}>
            <RevealOnScroll>
                <div className="header-flex" style={{marginBottom: '40px'}}>
                    <h2>Master The Maze</h2>
                    <div className="maze-stats mono">
                        <span>T: {stats.time}s</span>
                        <span style={{marginLeft:'20px'}}>MOVES: {stats.moves}</span>
                    </div>
                </div>

                <div className="maze-wrapper">
                    {/* OVERLAYS */}
                    {status === "idle" && (
                        <div className="maze-overlay">
                            <h3 className="mono glitch-text">MARKET UNCERTAINTY DETECTED</h3>
                            <p className="mono small-text" style={{margin:'20px 0'}}>
                                The market is shrouded in fog. <br/>Navigate the data streams to find clarity.
                            </p>
                            <button className="submit-btn mono" onClick={startGame}>INITIATE PROTOCOL</button>
                        </div>
                    )}

                    {status === "won" && (
                        <div className="maze-overlay glass">
                            <h3 className="mono" style={{color: '#00ff00'}}>CLARITY ACHIEVED</h3>
                            <p className="mono" style={{margin: '20px 0'}}>
                                Optimization Complete.<br/>
                                Performance: {stats.moves} moves in {stats.time}s.
                            </p>
                            <button className="submit-btn mono" onClick={startGame}>RE-RUN SIMULATION</button>
                        </div>
                    )}

                    {/* SCANLINE EFFECT */}
                    <div className="scanlines"></div>

                    <canvas ref={canvasRef} className="maze-canvas" />

                    {/* MOBILE CONTROLS */}
                    <div className="mobile-controls mobile-only">
                        <div className="d-pad">
                            <button onPointerDown={() => gameState.current.move(0, -1)}>▲</button>
                            <div className="d-pad-mid">
                                <button onPointerDown={() => gameState.current.move(-1, 0)}>◀</button>
                                <button onPointerDown={() => gameState.current.move(1, 0)}>▶</button>
                            </div>
                            <button onPointerDown={() => gameState.current.move(0, 1)}>▼</button>
                        </div>
                    </div>

                    <p className="mono desktop-only" style={{marginTop:'20px', textAlign:'center', opacity:0.6}}>
                        [ ARROW KEYS TO NAVIGATE DATA STREAMS ]
                    </p>
                </div>
            </RevealOnScroll>
        </section>
    );
};

// --- COMPONENT: SERVICES DECK (UNCHANGED) ---
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
            <div className="deck-container desktop-only">
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
                    <div className="bg-huge-num">{servicesData[activeService].id}</div>
                </div>
            </div>
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

// --- COMPONENT: FAQ SECTION (UNCHANGED) ---
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);
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
    const dotRef = useRef(null);
    const outlineRef = useRef(null);
    const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

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
    }, []);

    const handleScrollDown = () => {
        const nextSection = document.getElementById('explore-target');
        if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
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
                            <div className="founder-col"><span className="founder-role mono">EXECUTIVE PARTNER</span><h3 className="founder-name">Abhiram Rentala</h3></div>
                            <div className="founder-col"><span className="founder-role mono">MANAGING PARTNER</span><h3 className="founder-name">Sasidhar Bezawada</h3></div>
                            <div className="founder-col"><span className="founder-role mono">DESIGNATED PARTNER</span><h3 className="founder-name">Aman Gyani</h3></div>
                            <div className="founder-col"><span className="founder-role mono">EXECUTIVE MANAGER</span><h3 className="founder-name">Kalyan Mourya</h3></div>
                        </div>
                    </section>

                    {/* NEW: MASTER THE MAZE GAME */}
                    <MazeGame />

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
                                    <div><label className="mono input-label">01. Name</label><input type="text" name="name" className="big-input" placeholder="ENTER FULL NAME" required /></div>
                                    <div><label className="mono input-label">02. Email</label><input type="email" name="email" className="big-input" placeholder="ENTER EMAIL ADDRESS" required /></div>
                                    <div><label className="mono input-label">03. Phone Number</label><input type="tel" name="phone" className="big-input" placeholder="ENTER PHONE (OPTIONAL)" /></div>
                                    <div><label className="mono input-label">04. Project Details</label><textarea name="message" className="big-input" placeholder="TELL US ABOUT YOUR GOALS..." rows="3" style={{resize: 'vertical', minHeight: '100px'}} required></textarea></div>
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