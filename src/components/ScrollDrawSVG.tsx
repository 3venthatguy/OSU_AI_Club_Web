import React, { useEffect, useRef, useState } from 'react';

interface ScrollDrawSVGProps {
  progress?: number;
  onNodeClick?: (index: number) => void;
  className?: string;
}

interface NodeCoord {
  x: number;
  y: number;
  progress: number;
  label: string;
}

export const ScrollDrawSVG: React.FC<ScrollDrawSVGProps> = ({ progress, onNodeClick, className }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const requestRef = useRef<number>(0);
  const [pathLength, setPathLength] = useState<number>(0);
  const [nodeCoords, setNodeCoords] = useState<NodeCoord[]>([]);
  const [animatedProgress, setAnimatedProgress] = useState<number>(0);

  // Variables for smooth lerp interpolation (smoothing out jerky scrollwheel steps)
  const targetProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      // Initialize styling immediately to keep it invisible before scroll
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;

      // Calculate 5 equidistant points coordinate along the path to map to presenting panels
      const coords: NodeCoord[] = [];
      const numPoints = 5;
      for (let i = 0; i < numPoints; i++) {
        // Position targets matching: (i + 0.5) / 5 -> 0.1, 0.3, 0.5, 0.7, 0.9
        const targetFraction = (i + 0.5) / numPoints;
        const pt = pathRef.current.getPointAtLength(targetFraction * length);
        coords.push({
          x: pt.x,
          y: pt.y,
          progress: targetFraction,
          label: (i + 1).toString(),
        });
      }
      setNodeCoords(coords);
    }
  }, []);

  // Synchronize parent progress prop with lerp target
  useEffect(() => {
    if (progress !== undefined) {
      targetProgress.current = progress;
    }
  }, [progress]);

  useEffect(() => {
    if (pathLength === 0) return;

    const handleScroll = () => {
      // If parent is controlling progress, skip local scroll listening
      if (progress !== undefined) return;
      if (!svgRef.current) return;
      
      const rect = svgRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Bounding calculation: 
      // 0 = progress starts when top of SVG hits bottom of viewport
      // 1 = progress completes when bottom of SVG leaves top of viewport
      const totalRange = rect.height + viewportHeight;
      const progressFraction = (viewportHeight - rect.top) / totalRange;
      
      // Clamp between 0 and 1 inclusive
      targetProgress.current = Math.max(0, Math.min(1, progressFraction));
    };

    // Smooth transition loop leveraging lerped parameters
    const updatePathOffset = () => {
      // Linear interpolation (lerp Coefficient of 0.08 ensures ultra buttery tracking effect)
      const diff = targetProgress.current - currentProgress.current;
      currentProgress.current += diff * 0.08;

      if (pathRef.current) {
        const offset = pathLength * (1 - currentProgress.current);
        pathRef.current.style.strokeDashoffset = `${offset}`;
      }

      // Sync state so React can re-render nodes with accuracy matching the line head
      setAnimatedProgress(currentProgress.current);

      requestRef.current = requestAnimationFrame(updatePathOffset);
    };

    // Add high-performance passive event listener
    if (progress === undefined) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    // Start fluid calculation loop
    requestRef.current = requestAnimationFrame(updatePathOffset);

    return () => {
      if (progress === undefined) {
        window.removeEventListener('scroll', handleScroll);
      }
      cancelAnimationFrame(requestRef.current);
    };
  }, [pathLength, progress]);

  // Symmetric continuous curve spanning exactly 1500px in height
  const svgPath = `
    M 60,0 
    C 60,120 100,150 100,250
    C 100,350 20,400 20,500
    C 20,600 110,650 110,750
    C 110,850 10,900 10,1000
    C 10,1100 100,1150 100,1250
    C 100,1350 60,1400 60,1500
  `;

  return (
    <div className={className || "absolute top-[13vh] bottom-[13vh] left-[2.5%] xl:left-[4%] w-[90px] h-[74vh] pointer-events-none z-0 hidden lg:block overflow-visible"}>
      <svg
        ref={svgRef}
        viewBox="0 0 120 1500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full pointer-events-auto"
        style={{ willChange: 'transform' }}
      >
        <defs>
          <linearGradient id="scroll-draw-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B5BFF" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#00A878" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#3B5BFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00A878" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Subtle background static guide line */}
        <path
          d={svgPath}
          stroke="#E5E8EB"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dark:stroke-border-subtle/30 opacity-20"
          fill="none"
        />

        {/* Dynamic scroll-powered drawing indicator line (with GPU will-change state setup) */}
        <path
          ref={pathRef}
          d={svgPath}
          stroke="url(#scroll-draw-gradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ willChange: 'stroke-dashoffset' }}
        />

        {/* Dynamic step node indicators placed along the curve */}
        {nodeCoords.map((coord, index) => {
          // Check if this node is activated as the scroll passes its coordinate
          const isActive = animatedProgress >= coord.progress - 0.05; // 5% buffer for snappy responsive triggers

          return (
            <g
              key={index}
              className={`transition-transform duration-350 select-none ${
                onNodeClick ? 'cursor-pointer pointer-events-auto' : ''
              } hover:scale-125`}
              onClick={() => onNodeClick && onNodeClick(index)}
              style={{ transformOrigin: `${coord.x}px ${coord.y}px` }}
            >
              {/* Outer pulsing ring for active nodes */}
              {isActive ? (
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={38}
                  className="fill-none stroke-accent-primary animate-pulse opacity-40 stroke-2"
                />
              ) : (
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={34}
                  className="fill-none stroke-transparent hover:stroke-[#3B5BFF]/40 transition-all duration-300 stroke-[2]"
                />
              )}

              {/* Underlying background shield */}
              <circle
                cx={coord.x}
                cy={coord.y}
                r={30}
                className="fill-white dark:fill-[#0E1B2E] transition-colors duration-300"
              />

              {/* Circle core layer */}
              <circle
                cx={coord.x}
                cy={coord.y}
                r={28}
                className={`transition-all duration-300 stroke-[2.5] ${
                  isActive
                    ? 'fill-accent-primary stroke-accent-primary'
                    : 'fill-none stroke-[#9CA3AF] dark:stroke-border-subtle hover:stroke-[#3B5BFF]'
                }`}
              />

              {/* Step label index centered within the circle */}
              <text
                x={coord.x}
                y={coord.y}
                textAnchor="middle"
                dominantBaseline="central"
                className={`font-mono text-[18px] font-extrabold select-none transition-colors duration-300 ${
                  isActive
                    ? 'fill-white font-extrabold'
                    : 'fill-text-secondary dark:fill-text-primary hover:fill-accent-primary'
                }`}
              >
                {coord.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

