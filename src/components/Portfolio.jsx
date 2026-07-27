import React, { useState } from "react";

// --- DATA DEFINITIONS FOR PORTFOLIO ---
const portfolioProjects = [
    {
        id: "proj-02",
        title: "Pyxer.ai",
        subtitle: "US Brand, Stanford University — Feature Engineering",
        category: "Product & Research",
        tags: ["US MARKET", "4 COUNTRIES", "GLOBAL SURVEYS", "ROADMAP"],
        objective: "Identify core product features that resonate across target international markets.",
        action: "Conducted 600+ structured customer surveys across 4 countries.",
        impact: "Cross-border insights across 4 countries led to a sharper feature roadmap and stronger product-market fit for the brand's launch.",
        badge: "pyxer",
        isDarkBadge: true,
        statLabel: "SURVEYS (4 COUNTRIES)",
        statValue: "600+"
    },
    {
        id: "proj-03",
        title: "Nergy Vidya",
        subtitle: "Energy Sector Brand — B2B Lead Generation",
        category: "B2B Lead Gen",
        tags: ["ENERGY SECTOR", "B2B PIPELINE", "OUTREACH"],
        objective: "Capture relevant leads for a niche B2B energy education platform.",
        action: "Generated 100+ qualified leads through low-cost online outreach.",
        impact: "Built a strong top-of-funnel pipeline, setting the stage for conversion-focused efforts.",
        badge: "nergy",
        isBlueBadge: true,
        statLabel: "QUALIFIED LEADS",
        statValue: "100+"
    },
    {
        id: "proj-04",
        title: "Gourmet Chocolate Brand",
        subtitle: "Hyperlocal Performance Marketing Campaign",
        category: "Performance Marketing",
        tags: ["HYPERLOCAL", "ULTRA-LOW CAC", "LEAD OPTIMIZATION"],
        objective: "Achieve industry-leading Customer Acquisition Cost (CAC) using high-precision hyperlocal targeting.",
        action: "Deployed hyper-targeted performance ads, optimizing ad delivery to achieve an ultra-low Cost Per Lead (CPL) of ₹10.",
        impact: "Delivered 10X CAC efficiency compared to industry benchmarks, proving a highly scalable blueprint for consumer lead generation.",
        badge: "PERFORMANCE",
        statLabel: "COST PER LEAD (CPL)",
        statValue: "₹10"
    },
    {
        id: "proj-05",
        title: "Across Brand Handle",
        subtitle: "High-ROI Social & Media Campaign",
        category: "Social & Organic",
        tags: ["VIRAL REACH", "PROFILE VISITS", "HIGH ROI"],
        objective: "Drive high engagement and brand awareness with a lean media footprint.",
        action: "Executed high-retention content strategy, resulting in 105K+ video views and 500+ high-intent profile visits.",
        impact: "Achieved 2X follower growth and high ROI on media execution with measurable brand lift.",
        badge: "INSTAGRAM",
        statLabel: "ORGANIC VIDEO VIEWS",
        statValue: "105K+"
    },
    {
        id: "proj-06",
        title: "MedBeyondBorder",
        subtitle: "Healthcare & Lifestyle — Organic Instagram Scaling",
        category: "Social & Organic",
        tags: ["HEALTHCARE", "ZERO AD SPEND", "2X FOLLOWER GROWTH"],
        objective: "Drive rapid organic brand awareness, engagement velocity, and audience expansion for @medbeyondborder.",
        action: "Executed zero-ad-spend organic content strategy leveraging high-velocity engagement triggers.",
        impact: "Scaled active follower base by 2X, captured 100,000+ organic views, and generated 1,000+ likes within 2 days.",
        badge: "MEDBEYONDBORDER",
        statLabel: "FOLLOWER GROWTH",
        statValue: "2X"
    }
];

const campaignAnalytics = [
    {
        id: "analytics-01",
        title: "Social Media & Ad Performance Analytics Overview",
        period: "30-DAY METRICS WINDOW (JUNE 13 – JULY 12)",
        tags: ["PAID ACQUISITION", "CAMPAIGN METRICS", "ENGAGEMENT"],
        metrics: [
            { label: "Accounts Reached", value: "90,640+", detail: "Total accounts reached across campaign" },
            { label: "Total Views", value: "105,884", detail: "85.6% directly driven by optimized ads" },
            { label: "Engagements & Clicks", value: "12,449", detail: "Includes 886 direct link clicks" },
            { label: "Follower Growth", value: "+51.0%", detail: "Sustained active query generation via DMs" }
        ]
    },
    {
        id: "analytics-02",
        title: "B2B Mineral Lead Generation",
        period: "HIGH-TICKET INDUSTRIAL OUTREACH",
        tags: ["BULK MINERALS", "ENTERPRISE B2B", "PIPELINE"],
        objectiveText: "Generate high-value B2B leads in the bulk minerals sector.",
        actionText: "Targeted major industry players including Chameekar Exports, Gold Star Private Limited, and Stone Experts India, along with buyer-side engagement from Hindalco.",
        impactText: "Successfully captured a lead pipeline valued at $5M+, establishing a substantial foundation for high-ticket B2B transactions.",
        highlightStat: "$5M+",
        highlightLabel: "PIPELINE VALUATION"
    },
    {
        id: "analytics-03",
        title: "MedBeyondBorder — Organic Healthcare Instagram Growth",
        period: "TBILISI, GEORGIA // HEALTHCARE & LIFESTYLE",
        tags: ["MEDBEYONDBORDER", "ZERO AD SPEND", "2X FOLLOWER GROWTH", "VIRAL BREAKOUT"],
        objectiveText: "Drive rapid organic brand awareness, engagement velocity, and audience expansion for @medbeyondborder.",
        actionText: "Executed zero-ad-spend organic content strategy leveraging high-velocity engagement triggers and specialized healthcare audience positioning.",
        impactText: "Achieved 100,000+ organic views within 2 days of launch, driving 2X follower growth and securing 1,000+ organic engagements.",
        highlightStat: "2X",
        highlightLabel: "FOLLOWER GROWTH (DOUBLED AUDIENCE)"
    }
];

export default function Portfolio({ onBackToHome, onOpenContact }) {
    const [selectedCategory, setSelectedCategory] = useState("ALL");

    const categories = [
        "ALL",
        "Product & Research",
        "B2B Lead Gen",
        "Performance Marketing",
        "Social & Organic"
    ];

    const filteredProjects = selectedCategory === "ALL"
        ? portfolioProjects
        : portfolioProjects.filter(p => p.category === selectedCategory);

    return (
        <div className="portfolio-page">
            {/* PORTFOLIO HERO HEADER */}
            <header className="portfolio-hero pad-x pad-y-sm border-b">
                <div className="portfolio-nav-breadcrumbs mono">
                    <button onClick={onBackToHome} className="back-link-btn">
                        ← HOME
                    </button>
                    <span>/ PORTFOLIO HIGHLIGHTS</span>
                </div>

                <h1 className="portfolio-title mt-md">
                    Work Portfolio<br />
                    <span className="outline-text">& Campaign Metrics</span>
                </h1>

                <p className="portfolio-sub">
                    Empirical data, high-ticket B2B lead generation, supply chain optimization, and organic viral growth strategies executed by MarketMaze.
                </p>

                {/* KPI METRIC BANNER */}
                <div className="portfolio-stats-grid">
                    <div className="stat-card">
                        <span className="stat-val mono">$5M+</span>
                        <span className="stat-desc mono">B2B PIPELINE GENERATED</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-val mono">105,884</span>
                        <span className="stat-desc mono">30-DAY AD VIEWS</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-val mono">2X</span>
                        <span className="stat-desc mono">FOLLOWER GROWTH (48 HRS)</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-val mono">600+</span>
                        <span className="stat-desc mono">STANFORD/PYXER (4 COUNTRIES)</span>
                    </div>
                </div>
            </header>

            {/* PROJECTS & CAMPAIGNS SECTION */}
            <section className="border-b pad-y-sm">
                <div className="pad-x header-flex border-b pad-y-sm">
                    <div>
                        <h2>Projects & Campaigns</h2>
                        <p className="mono sub-text">// FEATURED CASE STUDIES</p>
                    </div>

                    {/* FILTER TABS */}
                    <div className="filter-tabs mono">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="projects-grid pad-x">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="project-card border">
                            <div className="card-top">
                                <div className="card-badge-row">
                                    {project.isDarkBadge ? (
                                        <div className="badge-logo dark-logo">
                                            <span className="pyxer-badge">pyxer</span>
                                        </div>
                                    ) : project.isBlueBadge ? (
                                        <div className="badge-logo blue-logo">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="24" height="24" rx="4" fill="#0066CC" />
                                                <path d="M7 6V18L13 14V6L7 6Z" fill="white" />
                                                <path d="M14 6V14L17 12V6L14 6Z" fill="white" opacity="0.8" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <span className="tag mono">{project.badge}</span>
                                    )}
                                    <span className="mono card-category-tag">{project.category}</span>
                                </div>

                                <div className="card-heading-group">
                                    <h3 className="project-title">{project.title}</h3>
                                    <h4 className="project-subtitle mono">{project.subtitle}</h4>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="detail-item">
                                    <span className="detail-label mono">// OBJECTIVE:</span>
                                    <p className="detail-text">{project.objective}</p>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label mono">// ACTION:</span>
                                    <p className="detail-text">{project.action}</p>
                                </div>
                                <div className="detail-item highlight-box">
                                    <span className="detail-label mono">// IMPACT:</span>
                                    <p className="detail-text strong">{project.impact}</p>
                                </div>
                            </div>

                            <div className="card-footer border-t">
                                <div className="tag-container">
                                    {project.tags.map(t => (
                                        <span key={t} className="tag mono">{t}</span>
                                    ))}
                                </div>
                                <div className="card-stat-pill mono">
                                    <span className="pill-num">{project.statValue}</span>
                                    <span className="pill-lbl">{project.statLabel}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CAMPAIGN INSIGHTS & METRICS SECTION */}
            <section className="border-b pad-y-sm">
                <div className="pad-x header-flex border-b pad-y-sm">
                    <div>
                        <h2>Campaign Insights & Metrics</h2>
                        <p className="mono sub-text">// DATA ANALYTICS & REVENUE PIPELINES</p>
                    </div>
                </div>

                <div className="analytics-list pad-x pad-y-sm">
                    {campaignAnalytics.map((item) => (
                        <div key={item.id} className="analytics-card border mb-lg">
                            <div className="analytics-header border-b pad-x pad-y-sm">
                                <div>
                                    <span className="mono period-badge">{item.period}</span>
                                    <h3 className="analytics-title mt-xs">{item.title}</h3>
                                </div>
                                <div className="tag-container mt-xs">
                                    {item.tags.map(t => <span key={t} className="tag mono">{t}</span>)}
                                </div>
                            </div>

                            {item.metrics ? (
                                <div className="metrics-quad-grid pad-x pad-y-sm">
                                    {item.metrics.map((m, idx) => (
                                        <div key={idx} className="quad-item border-r border-b">
                                            <span className="quad-val mono">{m.value}</span>
                                            <span className="quad-lbl">{m.label}</span>
                                            <span className="quad-detail mono">{m.detail}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="analytics-detail-grid pad-x pad-y-sm">
                                    <div className="analytics-text-col">
                                        <div className="detail-item">
                                            <span className="detail-label mono">// OBJECTIVE:</span>
                                            <p className="detail-text">{item.objectiveText}</p>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label mono">// ACTION:</span>
                                            <p className="detail-text">{item.actionText}</p>
                                        </div>
                                        <div className="detail-item highlight-box">
                                            <span className="detail-label mono">// IMPACT & RESULTS:</span>
                                            <p className="detail-text strong">{item.impactText}</p>
                                        </div>
                                    </div>

                                    <div className="analytics-stat-col border-l pad-x grid-center">
                                        <div className="big-stat-wrapper">
                                            <span className="big-stat-val mono">{item.highlightStat}</span>
                                            <span className="big-stat-lbl mono">{item.highlightLabel}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* PORTFOLIO BOTTOM CTA */}
            <section className="border-b">
                <div className="cta-box">
                    <span className="mono status-blink">● READY TO SCALE YOUR BRAND?</span>
                    <h2>Turn Uncertainty Into<br />Measurable Leverage</h2>
                    <p>
                        Whether you need high-ticket B2B pipelines, supply chain optimization, or viral growth campaigns, MarketMaze delivers empirical results.
                    </p>
                    <div className="cta-actions">
                        <a href="#contact" onClick={onOpenContact} className="submit-btn mono">
                            INITIATE PROJECT -&gt;
                        </a>
                        <button onClick={onBackToHome} className="mono-btn">
                            ← RETURN TO HOME
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
