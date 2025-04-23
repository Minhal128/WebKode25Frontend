import Spline from '@splinetool/react-spline';
import React from 'react';

export default function VisaCard() {
  return (
    <main
      className="App"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#050505',
        padding: '2rem 4rem',  // more side padding
        gap: '1rem',           // reduced gap
      }}
    >
      {/* Left Text */}
      <div style={{ flex: 1, color: 'white' }}>
        <h1 className="text-4xl font-extrabold mb-6 text-lime-400">
          Explore the Future
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
          The possibilities unfold dynamically before you, showcasing every facet of our innovative approach. Observe as the presentation evolves, revealing the key features and benefits meticulously crafted to elevate your experience.
        </p>
      </div>

      {/* Right Spline Viewer */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Spline
          scene="https://prod.spline.design/V21nz3ScgkpHjKn0/scene.splinecode"
          width={900}
          height={800}
        />
      </div>
    </main>
  );
}
