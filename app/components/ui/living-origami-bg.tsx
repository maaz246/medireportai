"use client";
import React, { useState, useEffect } from 'react';

// This is a self-contained React component that creates a "Living Origami" effect.
// An evolution of procedural animation, this simulates a flock of glowing origami
// birds flying across the screen. The effect is achieved with CSS 3D transforms
// and a procedurally generated set of layered animations.

// Generate a random number within a range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

interface DrifterConfig {
  yStart: number;
  yEnd: number;
  rStart: number;
  rEnd: number;
  duration: number;
  delay: number;
  scale: number;
  wingDelay: number;
}

export const Component = () => {
    const [drifters, setDrifters] = useState<DrifterConfig[]>([]);

    useEffect(() => {
        // Only generate random values on the client to prevent hydration mismatch
        setDrifters(
            [...Array(18)].map(() => ({
                yStart: random(-30, 30),
                yEnd: random(-30, 30),
                rStart: random(-30, 30),
                rEnd: random(-30, 30),
                duration: random(8, 16),
                delay: random(-16, 0),
                scale: random(0.3, 0.95),
                wingDelay: random(-4, 0),
            }))
        );
    }, []);

    return (
        <div className="hero-section absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {/* Procedurally generate multiple drifters — only rendered client-side */}
            {drifters.map((d, i) => (
                <div key={i} className="drifter-container" style={{
                    '--y-start': `${d.yStart}vh`,
                    '--y-end': `${d.yEnd}vh`,
                    '--r-start': `${d.rStart}deg`,
                    '--r-end': `${d.rEnd}deg`,
                    animationDuration: `${d.duration}s`,
                    animationDelay: `${d.delay}s`,
                } as React.CSSProperties}>
                    <div className="origami-crane" style={{
                        transform: `scale(${d.scale})`,
                        animationDelay: `${d.wingDelay}s`,
                    }}>
                        <div className="crane-part body"></div>
                        <div className="crane-part wing-left"></div>
                        <div className="crane-part wing-right"></div>
                        <div className="crane-part tail"></div>
                    </div>
                </div>
            ))}

            {/* The content container is empty */}
            <div className="relative z-10 text-center p-8 max-w-2xl">
            </div>
        </div>
    );
};

export default Component;
