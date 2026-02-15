import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Lakshan Ekanayaka | UI/UX Designer & Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020617', // Deep Slate
          backgroundImage: 'radial-gradient(circle at 10% 10%, #1e1b4b 0%, #020617 40%)', // Subtle corner glow
          position: 'relative',
        }}
      >
        {/* Background Grid Pattern */}
        <div
            style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)', // Fade out edges
            }}
        />

        {/* Ambient Glows */}
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '400px', height: '400px', background: '#7c3aed', filter: 'blur(120px)', opacity: 0.2 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: '400px', height: '400px', background: '#06b6d4', filter: 'blur(120px)', opacity: 0.2 }} />

        {/* Main Content Card */}
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: '32px',
                padding: '60px 80px',
                boxShadow: '0 0 60px rgba(0,0,0,0.5)',
                zIndex: 10,
            }}
        >
            {/* Logo */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90px',
                    height: '90px',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
                    marginBottom: '30px',
                    boxShadow: '0 0 40px rgba(6,182,212,0.4)',
                    border: '2px solid rgba(255,255,255,0.2)',
                }}
            >
                <div style={{ color: 'white', fontSize: '56px', fontWeight: 900, fontFamily: 'sans-serif' }}>L</div>
            </div>

            {/* Name */}
            <div
                style={{
                    fontSize: '72px',
                    fontWeight: 900,
                    color: 'white',
                    lineHeight: 1.1,
                    marginBottom: '16px',
                    letterSpacing: '-2px',
                    textAlign: 'center',
                    textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                }}
            >
                Lakshan Ekanayaka
            </div>

            {/* Role Gradient */}
            <div
                style={{
                    fontSize: '28px',
                    background: 'linear-gradient(to right, #22d3ee, #c084fc)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 700,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    marginBottom: '40px',
                }}
            >
                UI/UX Designer & Developer
            </div>

            {/* Footer / URL Badge */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '10px 24px',
                    borderRadius: '50px',
                }}
            >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22d3ee', boxShadow: '0 0 10px #22d3ee' }} />
                <div style={{ color: '#94a3b8', fontSize: '20px', fontFamily: 'monospace' }}>lakshan-ekanayaka.vercel.app</div>
            </div>
        </div>
      </div>
    ),
    { ...size }
  );
}