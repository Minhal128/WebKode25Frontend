import Spline from '@splinetool/react-spline';
import React from 'react';

export default function VisaCard() {
    return (
        <main className="App" style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: '#121212' // Added blackish grey background color
        }}>
            <Spline
                scene="https://prod.spline.design/V21nz3ScgkpHjKn0/scene.splinecode" 
                width={1030}
                height={930}
            />
        </main>
    );
}
