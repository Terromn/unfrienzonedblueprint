import { useEffect, useRef, useState, useCallback } from 'react';
import AnimatedBlob from './AnimatedBlob';

// Simple GSAP-like animation function for better compatibility
const gsap = {
  to: (element: HTMLElement, options: any) => {
    if (!element) return;
    
    const { x, y, duration = 1, ease = 'ease-out' } = options;
    
    element.style.transition = `transform ${duration}s ${ease}`;
    element.style.transform = `translate(-50%, -50%) translate(${x || '0'}, ${y || '0'})`;
  }
};

interface MousePosition {
  x: number;
  y: number;
}

interface BlobConfig {
  id: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  color: 'primary' | 'secondary' | 'accent' | 'yellow';
  initialX: number;
  initialY: number;
  animationSpeed: number;
  responsiveness: number;
}

const BLOB_CONFIGS: BlobConfig[] = [
  {
    id: 'blob-1',
    size: 'xl',
    color: 'primary',
    initialX: 20,
    initialY: 20,
    animationSpeed: 0.8,
    responsiveness: 0.02
  },
  {
    id: 'blob-2',
    size: 'lg',
    color: 'yellow',
    initialX: 70,
    initialY: 60,
    animationSpeed: 1.2,
    responsiveness: 0.03
  },
  {
    id: 'blob-3',
    size: 'md',
    color: 'secondary',
    initialX: 10,
    initialY: 80,
    animationSpeed: 0.9,
    responsiveness: 0.025
  },
  {
    id: 'blob-4',
    size: 'lg',
    color: 'accent',
    initialX: 80,
    initialY: 30,
    animationSpeed: 1.1,
    responsiveness: 0.02
  },
  {
    id: 'blob-5',
    size: 'sm',
    color: 'primary',
    initialX: 50,
    initialY: 50,
    animationSpeed: 1.5,
    responsiveness: 0.04
  }
];

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const mousePosition = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrame = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Performance optimized mouse tracking with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mousePosition.current = { x, y };
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse tracking setup
  useEffect(() => {
    if (!isVisible) return;

    let timeoutId: number;
    
    const throttledMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => handleMouseMove(e), 16); // ~60fps
    };

    document.addEventListener('mousemove', throttledMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isVisible, handleMouseMove]);

  // GSAP animation loop
  useEffect(() => {
    if (!isVisible) return;

    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;

      try {
        BLOB_CONFIGS.forEach((config) => {
          const blobElement = blobRefs.current[config.id];
          if (!blobElement) return;

          const mouseInfluenceX = (mousePosition.current.x - 0.5) * 100 * config.responsiveness;
          const mouseInfluenceY = (mousePosition.current.y - 0.5) * 100 * config.responsiveness;

          gsap.to(blobElement, {
            x: `${config.initialX + mouseInfluenceX}%`,
            y: `${config.initialY + mouseInfluenceY}%`,
            duration: 2,
            ease: "power2.out",
            overwrite: "auto"
          });
        });

        animationFrame.current = requestAnimationFrame(animate);
      } catch (error) {
        console.error('Animation error:', error);
        setHasError(true);
      }
    };

    animate();

    return () => {
      isAnimating = false;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isVisible]);

  // Error boundary fallback
  if (hasError) {
    return (
      <div className="absolute inset-0 bg-transparent" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Animated blobs */}
      {isVisible && BLOB_CONFIGS.map((config) => (
        <div
          key={config.id}
          ref={(el) => { blobRefs.current[config.id] = el; }}
          className="absolute pointer-events-none"
          style={{
            left: `${config.initialX}%`,
            top: `${config.initialY}%`,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform'
          }}
        >
          <AnimatedBlob
            size={config.size}
            color={config.color}
            animationSpeed={config.animationSpeed}
            opacity={0.4}
            blurAmount={60}
          />
        </div>
      ))}
    </div>
  );
} 