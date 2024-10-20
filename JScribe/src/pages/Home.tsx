import React, { useEffect, useState } from 'react';
import './pageStyles/Home.css';

export default function Home() {
  const letters = "JScribe".split("");
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGlow(true);
    }, 1500);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="w-full h-[calc(100dvh-60px)] text-white flex justify-center items-center flex-col gap-3">
      <h1 className="text-6xl font-bold text-center">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`letter ${glow ? 'glow' : ''}`}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </h1>
      <p className="text-gray-500 text-center animated-text">
        Compile HTML, CSS, JavaScript Code on the go and share it with your friends
      </p>
    </div>
  );
}
