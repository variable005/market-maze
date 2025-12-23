import React from 'react';

const Hero = () => {
    return (
        <div style={s.container}>
            {/* 1. Header Navigation */}
            <nav style={s.nav}>
                <div style={s.logo}>MKT.MZE</div>
                <div style={s.navLinks}>
                    <span>INSIGHTS</span>
                    <span>REPORTS</span>
                    <button style={s.ctaSmall}>SUBSCRIBE</button>
                </div>
            </nav>

            {/* 2. Main Grid Layout */}
            <main style={s.grid}>

                {/* Large Brand Box */}
                <div style={{...s.box, gridColumn: 'span 8', gridRow: 'span 2'}}>
                    <p style={s.label}>// PLATFORM ACCESS</p>
                    <h1 style={s.mainTitle}>DECODING THE <br/> COMMERCE MAZE.</h1>
                    <p style={s.desc}>High-fidelity e-commerce intelligence for the 1%.</p>
                </div>

                {/* Small Data Box */}
                <div style={{...s.box, gridColumn: 'span 4'}}>
                    <p style={s.label}>STATUS</p>
                    <div style={s.status}>LIVE UPDATES ACTIVE</div>
                </div>

                {/* Interaction Box */}
                <div style={{...s.box, gridColumn: 'span 4', cursor: 'pointer'}} className="hover-box">
                    <p style={s.label}>ACTION</p>
                    <h2 style={s.linkText}>READ LATEST ↓</h2>
                </div>

            </main>
        </div>
    );
};

const s = {
    container: { padding: '40px', maxWidth: '1400px', margin: '0 auto' },
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' },
    logo: { fontWeight: '900', letterSpacing: '-1px', fontSize: '1.5rem' },
    navLinks: { display: 'flex', gap: '30px', alignItems: 'center', color: '#555', fontSize: '12px', fontWeight: '700' },
    ctaSmall: { background: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '11px', fontWeight: '900', cursor: 'pointer' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoRows: 'minmax(180px, auto)',
        gap: '15px',
    },
    box: {
        border: '1px solid #1f1f1f',
        padding: '30px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0d0d0d',
    },
    label: { fontSize: '10px', color: '#444', letterSpacing: '2px', fontWeight: '800' },
    mainTitle: { fontSize: 'clamp(2rem, 5vw, 4.5rem)', margin: '20px 0', letterSpacing: '-3px', lineHeight: '0.9' },
    desc: { color: '#666', maxWidth: '300px', fontSize: '14px' },
    status: { fontSize: '20px', fontWeight: '700', color: '#fff' },
    linkText: { fontSize: '24px', margin: '10px 0' }
};

export default Hero;