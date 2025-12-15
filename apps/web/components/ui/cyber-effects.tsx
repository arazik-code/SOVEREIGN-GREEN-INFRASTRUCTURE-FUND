"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@sgif/ui";

/**
 * CyberGrid - Animated background grid with scan line effect
 */
export function CyberGrid({ 
    className,
    color = "cyan",
    intensity = "low"
}: { 
    className?: string;
    color?: "cyan" | "gold" | "emerald" | "purple";
    intensity?: "low" | "medium" | "high";
}) {
    const opacityMap = { low: 0.02, medium: 0.05, high: 0.1 };
    const colorMap = {
        cyan: "0, 212, 255",
        gold: "212, 175, 55",
        emerald: "2, 154, 118",
        purple: "139, 92, 246"
    };

    return (
        <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
            {/* Grid pattern */}
            <div 
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(${colorMap[color]}, ${opacityMap[intensity]}) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(${colorMap[color]}, ${opacityMap[intensity]}) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />
            {/* Scan line */}
            <motion.div
                className="absolute left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, rgba(${colorMap[color]}, 0.5), transparent)` }}
                animate={{
                    top: ["0%", "100%"],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
}

/**
 * HolographicCard - Card with holographic shimmer effect
 */
export function HolographicCard({
    children,
    className,
    glowColor = "cyan"
}: {
    children: React.ReactNode;
    className?: string;
    glowColor?: "cyan" | "gold" | "emerald" | "purple" | "rainbow";
}) {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        });
    }, []);

    const gradientMap = {
        cyan: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(0, 212, 255, 0.15), transparent 50%)",
        gold: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(212, 175, 55, 0.15), transparent 50%)",
        emerald: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(2, 154, 118, 0.15), transparent 50%)",
        purple: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.15), transparent 50%)",
        rainbow: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(0, 212, 255, 0.1), rgba(139, 92, 246, 0.1), rgba(212, 175, 55, 0.1), transparent 60%)"
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden transition-all duration-300",
                "hover:border-white/20 hover:shadow-2xl",
                className
            )}
            style={{
                "--mouse-x": `${mousePos.x}%`,
                "--mouse-y": `${mousePos.y}%`,
            } as React.CSSProperties}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
            {/* Holographic overlay */}
            <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{ background: gradientMap[glowColor] }}
            />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-2xl" />
            
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

/**
 * NeonBadge - Badge with neon glow effect
 */
export function NeonBadge({
    children,
    variant = "cyan",
    pulse = false,
    className
}: {
    children: React.ReactNode;
    variant?: "cyan" | "gold" | "emerald" | "purple" | "red";
    pulse?: boolean;
    className?: string;
}) {
    const colorClasses = {
        cyan: "bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30 shadow-[0_0_10px_rgba(0,212,255,0.3)]",
        gold: "bg-sgif-gold/10 text-sgif-gold border-sgif-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.3)]",
        emerald: "bg-sgif-emerald/10 text-sgif-emerald border-sgif-emerald/30 shadow-[0_0_10px_rgba(2,154,118,0.3)]",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_10px_rgba(139,92,246,0.3)]",
        red: "bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
    };

    return (
        <span className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border",
            colorClasses[variant],
            pulse && "animate-pulse",
            className
        )}>
            {children}
        </span>
    );
}

/**
 * GlowingOrb - Animated floating orb for decorative purposes
 */
export function GlowingOrb({
    size = "md",
    color = "cyan",
    className,
    animate = true
}: {
    size?: "sm" | "md" | "lg" | "xl";
    color?: "cyan" | "gold" | "emerald" | "purple";
    className?: string;
    animate?: boolean;
}) {
    const sizeClasses = {
        sm: "w-24 h-24",
        md: "w-48 h-48",
        lg: "w-72 h-72",
        xl: "w-96 h-96"
    };

    const colorClasses = {
        cyan: "bg-cyber-cyan/20",
        gold: "bg-sgif-gold/20",
        emerald: "bg-sgif-emerald/20",
        purple: "bg-purple-500/20"
    };

    return (
        <motion.div
            className={cn(
                "rounded-full blur-3xl pointer-events-none",
                sizeClasses[size],
                colorClasses[color],
                className
            )}
            animate={animate ? {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
            } : undefined}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
}

/**
 * DataStream - Animated data stream lines
 */
export function DataStream({
    direction = "horizontal",
    speed = "normal",
    color = "cyan",
    className
}: {
    direction?: "horizontal" | "vertical";
    speed?: "slow" | "normal" | "fast";
    color?: "cyan" | "gold" | "emerald";
    className?: string;
}) {
    const speedMap = { slow: 6, normal: 3, fast: 1.5 };
    const colorMap = {
        cyan: "#00d4ff",
        gold: "#D4AF37",
        emerald: "#029A76"
    };

    const particles = React.useMemo(() => 
        Array.from({ length: 8 }, (_, i) => ({
            id: i,
            delay: i * 0.3,
            size: Math.random() * 40 + 20
        })), 
    []);

    return (
        <div className={cn(
            "absolute overflow-hidden pointer-events-none",
            direction === "horizontal" ? "left-0 right-0 h-px" : "top-0 bottom-0 w-px",
            className
        )}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute"
                    style={{
                        width: direction === "horizontal" ? particle.size : 2,
                        height: direction === "horizontal" ? 2 : particle.size,
                        background: `linear-gradient(${direction === "horizontal" ? "90deg" : "180deg"}, transparent, ${colorMap[color]}, transparent)`,
                        boxShadow: `0 0 10px ${colorMap[color]}`,
                    }}
                    animate={{
                        [direction === "horizontal" ? "x" : "y"]: ["0%", "100vw"],
                    }}
                    transition={{
                        duration: speedMap[speed],
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
}

/**
 * HexagonPattern - Decorative hexagon pattern background
 */
export function HexagonPattern({
    className,
    opacity = 0.05
}: {
    className?: string;
    opacity?: number;
}) {
    return (
        <svg 
            className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
            style={{ opacity }}
        >
            <defs>
                <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                    <polygon 
                        points="25,0 50,14.4 50,43.4 25,43.4 0,43.4 0,14.4" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="0.5"
                        className="text-cyber-cyan"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
    );
}

/**
 * CircuitLines - Animated circuit board pattern
 */
export function CircuitLines({
    className
}: {
    className?: string;
}) {
    return (
        <svg 
            className={cn("absolute inset-0 w-full h-full pointer-events-none opacity-10", className)}
            viewBox="0 0 400 400"
        >
            <defs>
                <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#00d4ff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                </linearGradient>
            </defs>
            <g stroke="url(#circuit-gradient)" strokeWidth="1" fill="none">
                <motion.path
                    d="M0,100 H100 V200 H200 V100 H300 V300 H400"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
                />
                <motion.path
                    d="M0,300 H50 V150 H150 V350 H250 V250 H350 V400"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "loop", delay: 1 }}
                />
            </g>
            {/* Junction dots */}
            {[
                [100, 100], [100, 200], [200, 200], [200, 100], [300, 100], [300, 300],
                [50, 300], [50, 150], [150, 150], [150, 350], [250, 350], [250, 250], [350, 250]
            ].map(([cx, cy], i) => (
                <motion.circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="#00d4ff"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
            ))}
        </svg>
    );
}

/**
 * ParticleField - Floating particle animation
 */
export function ParticleField({
    count = 30,
    color = "cyan",
    className
}: {
    count?: number;
    color?: "cyan" | "gold" | "emerald" | "mixed";
    className?: string;
}) {
    const colorMap = {
        cyan: "#00d4ff",
        gold: "#D4AF37",
        emerald: "#029A76",
        mixed: null
    };

    const particles = React.useMemo(() => 
        Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            color: color === "mixed" 
                ? ["#00d4ff", "#D4AF37", "#029A76"][Math.floor(Math.random() * 3)]
                : colorMap[color]
        })),
    [count, color]);

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        width: particle.size,
                        height: particle.size,
                        background: particle.color,
                        boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`
                    }}
                    animate={{
                        y: [particle.y + "%", (particle.y - 20) + "%", particle.y + "%"],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}

/**
 * GlitchText - Text with glitch animation effect
 */
export function GlitchText({
    children,
    className
}: {
    children: string;
    className?: string;
}) {
    const [isGlitching, setIsGlitching] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className={cn("relative inline-block", className)}>
            <span className="relative z-10">{children}</span>
            {isGlitching && (
                <>
                    <span 
                        className="absolute top-0 left-0 text-cyber-cyan opacity-70"
                        style={{ clipPath: "inset(0 0 50% 0)", transform: "translateX(-2px)" }}
                    >
                        {children}
                    </span>
                    <span 
                        className="absolute top-0 left-0 text-red-500 opacity-70"
                        style={{ clipPath: "inset(50% 0 0 0)", transform: "translateX(2px)" }}
                    >
                        {children}
                    </span>
                </>
            )}
        </span>
    );
}

/**
 * ProgressRing - Circular progress indicator
 */
export function ProgressRing({
    progress,
    size = 100,
    strokeWidth = 8,
    color = "cyan",
    showLabel = true,
    label,
    className
}: {
    progress: number;
    size?: number;
    strokeWidth?: number;
    color?: "cyan" | "gold" | "emerald" | "purple";
    showLabel?: boolean;
    label?: string;
    className?: string;
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    const colorMap = {
        cyan: { stroke: "#00d4ff", shadow: "0 0 20px rgba(0,212,255,0.5)" },
        gold: { stroke: "#D4AF37", shadow: "0 0 20px rgba(212,175,55,0.5)" },
        emerald: { stroke: "#029A76", shadow: "0 0 20px rgba(2,154,118,0.5)" },
        purple: { stroke: "#8B5CF6", shadow: "0 0 20px rgba(139,92,246,0.5)" }
    };

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={colorMap[color].stroke}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ filter: `drop-shadow(${colorMap[color].shadow})` }}
                />
            </svg>
            {showLabel && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold font-mono text-white">{Math.round(progress)}%</span>
                    {label && <span className="text-xs text-gray-500">{label}</span>}
                </div>
            )}
        </div>
    );
}

/**
 * StatusIndicator - Animated status dot with label
 */
export function StatusIndicator({
    status,
    label,
    showPulse = true,
    size = "md",
    className
}: {
    status: "online" | "offline" | "warning" | "processing";
    label?: string;
    showPulse?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
}) {
    const statusConfig = {
        online: { color: "bg-sgif-emerald", text: "text-sgif-emerald", label: "Online" },
        offline: { color: "bg-red-500", text: "text-red-400", label: "Offline" },
        warning: { color: "bg-sgif-gold", text: "text-sgif-gold", label: "Warning" },
        processing: { color: "bg-cyber-cyan", text: "text-cyber-cyan", label: "Processing" }
    };

    const sizeConfig = {
        sm: { dot: "w-1.5 h-1.5", text: "text-[10px]" },
        md: { dot: "w-2 h-2", text: "text-xs" },
        lg: { dot: "w-3 h-3", text: "text-sm" }
    };

    const config = statusConfig[status];
    const sizeStyles = sizeConfig[size];

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <span className="relative flex">
                {showPulse && status !== "offline" && (
                    <span className={cn(
                        "absolute inline-flex h-full w-full rounded-full opacity-75",
                        config.color,
                        status === "processing" ? "animate-ping" : "animate-pulse"
                    )} />
                )}
                <span className={cn("relative inline-flex rounded-full", sizeStyles.dot, config.color)} />
            </span>
            {label !== undefined && (
                <span className={cn("font-mono", sizeStyles.text, config.text)}>
                    {label || config.label}
                </span>
            )}
        </div>
    );
}

/**
 * TypewriterText - Text that types itself
 */
export function TypewriterText({
    text,
    speed = 50,
    className,
    onComplete
}: {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}) {
    const [displayText, setDisplayText] = React.useState("");
    const [isComplete, setIsComplete] = React.useState(false);

    React.useEffect(() => {
        let i = 0;
        setDisplayText("");
        setIsComplete(false);
        
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setIsComplete(true);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onComplete]);

    return (
        <span className={cn("font-mono", className)}>
            {displayText}
            {!isComplete && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-cyber-cyan ml-0.5 align-middle"
                />
            )}
        </span>
    );
}

/**
 * CountUp - Animated number counter
 */
export function CountUp({
    end,
    start = 0,
    duration = 2,
    prefix = "",
    suffix = "",
    decimals = 0,
    className
}: {
    end: number;
    start?: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    className?: string;
}) {
    const [count, setCount] = React.useState(start);

    React.useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            const currentValue = start + (end - start) * easeOutExpo;
            
            setCount(currentValue);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [start, end, duration]);

    return (
        <span className={cn("font-mono tabular-nums", className)}>
            {prefix}{count.toFixed(decimals)}{suffix}
        </span>
    );
}
