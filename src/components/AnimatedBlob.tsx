import { useEffect, useRef } from 'react';

interface AnimatedBlobProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent' | 'yellow';
  opacity?: number;
  className?: string;
  animationSpeed?: number;
  blurAmount?: number;
}

const sizeClasses = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
  xl: 'w-80 h-80'
};

const colorClasses = {
  primary: 'fill-primary-500/30 dark:fill-primary-400/20',
  secondary: 'fill-secondary-500/30 dark:fill-secondary-400/20',
  accent: 'fill-accent-light/30 dark:fill-accent-dark/20',
  yellow: 'fill-yellow/30 dark:fill-yellow/20'
};

export default function AnimatedBlob({
  size = 'md',
  color = 'primary',
  opacity = 0.3,
  className = '',
  animationSpeed = 1,
  blurAmount = 40
}: AnimatedBlobProps) {
  const blobRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!blobRef.current || !pathRef.current) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01 * animationSpeed;
      
      if (pathRef.current) {
        // Generate organic blob path using mathematical functions
        const points = [];
        const radius = 50;
        const segments = 8;
        
        for (let i = 0; i < segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const variation = 15 * Math.sin(time + i) + 10 * Math.cos(time * 1.5 + i * 0.5);
          const r = radius + variation;
          const x = 100 + r * Math.cos(angle);
          const y = 100 + r * Math.sin(angle);
          points.push(`${x},${y}`);
        }
        
        // Create smooth path using spline interpolation
        let path = `M ${points[0]}`;
        for (let i = 0; i < points.length; i++) {
          const next = points[(i + 1) % points.length];
          const nextNext = points[(i + 2) % points.length];
          path += ` Q ${next} ${nextNext}`;
        }
        path += ' Z';
        
        pathRef.current.setAttribute('d', path);
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [animationSpeed]);

  return (
    <svg
      ref={blobRef}
      className={`${sizeClasses[size]} ${className} transition-opacity duration-500`}
      style={{ 
        opacity,
        filter: `blur(${blurAmount}px)`,
        willChange: 'transform'
      }}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        className={colorClasses[color]}
        fill={`url(#gradient-${color})`}
        d="M100,50 Q150,50 150,100 Q150,150 100,150 Q50,150 50,100 Q50,50 100,50 Z"
      />
    </svg>
  );
} 