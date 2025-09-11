import React from 'react';

interface BackgroundPathsProps {
  title?: string;
  className?: string;
  pathOpacity?: number;
  animationSpeed?: string;
}

export const BackgroundPaths: React.FC<BackgroundPathsProps> = ({
  title,
  className = "",
  pathOpacity = 0.6,
  animationSpeed = "20s"
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pathGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={pathOpacity} />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={pathOpacity * 0.7} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={pathOpacity * 0.3} />
          </linearGradient>
          
          <linearGradient id="pathGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={pathOpacity * 0.8} />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={pathOpacity * 0.5} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={pathOpacity * 0.2} />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Animated flowing paths */}
        <g className="animate-pulse" style={{ animationDuration: '4s' }}>
          {/* Main diagonal path */}
          <path
            d="M-100,400 Q200,100 600,300 T1300,200"
            stroke="url(#pathGradient1)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            className="animate-pulse"
            style={{ animationDelay: '0s', animationDuration: '6s' }}
          />
          
          {/* Secondary curved path */}
          <path
            d="M1300,600 Q800,300 400,500 T-100,400"
            stroke="url(#pathGradient2)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow)"
            className="animate-pulse"
            style={{ animationDelay: '2s', animationDuration: '8s' }}
          />
          
          {/* Vertical connection paths */}
          <path
            d="M300,0 Q350,200 400,400 Q450,600 500,800"
            stroke="url(#pathGradient1)"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
            className="animate-pulse"
            style={{ animationDelay: '1s', animationDuration: '7s' }}
          />
          
          <path
            d="M700,0 Q750,150 800,300 Q850,450 900,800"
            stroke="url(#pathGradient2)"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: '3s', animationDuration: '9s' }}
          />
          
          {/* Network connection nodes */}
          <circle cx="300" cy="200" r="4" fill="hsl(var(--primary))" opacity="0.8" className="animate-glow" />
          <circle cx="600" cy="300" r="3" fill="hsl(var(--primary))" opacity="0.6" className="animate-glow" style={{ animationDelay: '1s' }} />
          <circle cx="800" cy="150" r="5" fill="hsl(var(--primary))" opacity="0.7" className="animate-glow" style={{ animationDelay: '2s' }} />
          <circle cx="400" cy="500" r="3" fill="hsl(var(--primary))" opacity="0.5" className="animate-glow" style={{ animationDelay: '0.5s' }} />
        </g>

        {/* Subtle grid pattern overlay */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating particles for extra depth */}
      <div className="absolute inset-0">
        <div
          className="absolute w-1 h-1 bg-primary rounded-full animate-float"
          style={{
            top: '20%',
            left: '15%',
            animationDelay: '0s',
            animationDuration: '5s'
          }}
        />
        <div
          className="absolute w-2 h-2 bg-primary rounded-full animate-float opacity-60"
          style={{
            top: '60%',
            right: '20%',
            animationDelay: '2s',
            animationDuration: '7s'
          }}
        />
        <div
          className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-float opacity-40"
          style={{
            bottom: '30%',
            left: '70%',
            animationDelay: '4s',
            animationDuration: '6s'
          }}
        />
      </div>

      {title && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-4xl font-bold text-white/10">{title}</h2>
        </div>
      )}
    </div>
  );
};