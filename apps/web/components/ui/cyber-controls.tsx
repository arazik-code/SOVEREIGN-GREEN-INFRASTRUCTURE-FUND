"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@sgif/ui";
import { Sparkles, Zap, Check, AlertTriangle, Info, ChevronRight, X } from "lucide-react";

/**
 * NeonButton - Button with animated neon glow effect
 */
interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "cyan" | "gold" | "emerald" | "purple" | "gradient";
    size?: "sm" | "md" | "lg";
    glow?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
    ({ 
        className, 
        variant = "cyan", 
        size = "md", 
        glow = true,
        loading = false,
        icon,
        children,
        disabled,
        onClick,
        type = "button",
        ...props 
    }, ref) => {
        const colorConfig = {
            cyan: {
                bg: "bg-cyber-cyan",
                text: "text-black",
                border: "border-cyber-cyan",
                shadow: "shadow-[0_0_20px_rgba(0,212,255,0.4)]",
                hoverShadow: "hover:shadow-[0_0_30px_rgba(0,212,255,0.6)]"
            },
            gold: {
                bg: "bg-sgif-gold",
                text: "text-black",
                border: "border-sgif-gold",
                shadow: "shadow-[0_0_20px_rgba(212,175,55,0.4)]",
                hoverShadow: "hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
            },
            emerald: {
                bg: "bg-sgif-emerald",
                text: "text-black",
                border: "border-sgif-emerald",
                shadow: "shadow-[0_0_20px_rgba(2,154,118,0.4)]",
                hoverShadow: "hover:shadow-[0_0_30px_rgba(2,154,118,0.6)]"
            },
            purple: {
                bg: "bg-purple-500",
                text: "text-white",
                border: "border-purple-500",
                shadow: "shadow-[0_0_20px_rgba(139,92,246,0.4)]",
                hoverShadow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]"
            },
            gradient: {
                bg: "bg-gradient-to-r from-cyber-cyan via-sgif-emerald to-sgif-gold",
                text: "text-black",
                border: "border-transparent",
                shadow: "shadow-[0_0_20px_rgba(0,212,255,0.3)]",
                hoverShadow: "hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
            }
        };

        const sizeConfig = {
            sm: "px-3 py-1.5 text-xs",
            md: "px-5 py-2.5 text-sm",
            lg: "px-7 py-3.5 text-base"
        };

        const config = colorConfig[variant];

        return (
            <motion.button
                ref={ref}
                type={type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300",
                    "border-2 overflow-hidden",
                    config.bg,
                    config.text,
                    config.border,
                    glow && config.shadow,
                    glow && config.hoverShadow,
                    sizeConfig[size],
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
                disabled={disabled || loading}
                onClick={onClick}
            >
                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                
                {loading ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <Zap className="w-4 h-4" />
                    </motion.div>
                ) : icon}
                
                <span className="relative z-10">{children}</span>
            </motion.button>
        );
    }
);
NeonButton.displayName = "NeonButton";

/**
 * GlassInput - Frosted glass style input with glow focus
 */
interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    error?: string;
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
    ({ className, icon, error, ...props }, ref) => {
        const [focused, setFocused] = React.useState(false);

        return (
            <div className="relative">
                <div className={cn(
                    "relative flex items-center rounded-xl transition-all duration-300",
                    "bg-white/5 border backdrop-blur-xl",
                    focused 
                        ? "border-cyber-cyan/50 shadow-[0_0_20px_rgba(0,212,255,0.2)]" 
                        : "border-white/10",
                    error && "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                )}>
                    {icon && (
                        <div className={cn(
                            "pl-4 transition-colors",
                            focused ? "text-cyber-cyan" : "text-gray-500"
                        )}>
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className={cn(
                            "w-full bg-transparent px-4 py-3 text-white placeholder:text-gray-600",
                            "focus:outline-none font-mono text-sm",
                            icon && "pl-2",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                    >
                        <AlertTriangle className="w-3 h-3" />
                        {error}
                    </motion.p>
                )}
            </div>
        );
    }
);
GlassInput.displayName = "GlassInput";

/**
 * CyberSlider - Futuristic range slider
 */
interface CyberSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    showValue?: boolean;
    color?: "cyan" | "gold" | "emerald";
    className?: string;
}

export function CyberSlider({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    showValue = true,
    color = "cyan",
    className
}: CyberSliderProps) {
    const percentage = ((value - min) / (max - min)) * 100;

    const colorConfig = {
        cyan: { bg: "bg-cyber-cyan", shadow: "shadow-[0_0_10px_rgba(0,212,255,0.5)]", text: "text-cyber-cyan" },
        gold: { bg: "bg-sgif-gold", shadow: "shadow-[0_0_10px_rgba(212,175,55,0.5)]", text: "text-sgif-gold" },
        emerald: { bg: "bg-sgif-emerald", shadow: "shadow-[0_0_10px_rgba(2,154,118,0.5)]", text: "text-sgif-emerald" }
    };

    const config = colorConfig[color];

    return (
        <div className={cn("space-y-2", className)}>
            {(label || showValue) && (
                <div className="flex items-center justify-between text-sm">
                    {label && <span className="text-gray-400">{label}</span>}
                    {showValue && <span className={cn("font-mono", config.text)}>{value}</span>}
                </div>
            )}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className={cn("absolute inset-y-0 left-0 rounded-full", config.bg, config.shadow)}
                    animate={{ width: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
}

/**
 * CyberToggle - Animated toggle switch
 */
interface CyberToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    color?: "cyan" | "gold" | "emerald";
    className?: string;
}

export function CyberToggle({
    checked,
    onChange,
    label,
    disabled = false,
    color = "cyan",
    className
}: CyberToggleProps) {
    const colorConfig = {
        cyan: { bg: "bg-cyber-cyan", shadow: "0 0 15px rgba(0,212,255,0.5)" },
        gold: { bg: "bg-sgif-gold", shadow: "0 0 15px rgba(212,175,55,0.5)" },
        emerald: { bg: "bg-sgif-emerald", shadow: "0 0 15px rgba(2,154,118,0.5)" }
    };

    const config = colorConfig[color];

    return (
        <label className={cn(
            "inline-flex items-center gap-3 cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed",
            className
        )}>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={cn(
                    "relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300",
                    "border-2",
                    checked ? cn(config.bg, "border-transparent") : "bg-white/10 border-white/20"
                )}
                style={checked ? { boxShadow: config.shadow } : undefined}
            >
                <motion.span
                    className={cn(
                        "inline-block h-5 w-5 rounded-full bg-white shadow-lg",
                        "flex items-center justify-center"
                    )}
                    animate={{ x: checked ? 28 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                    <AnimatePresence mode="wait">
                        {checked && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Check className="w-3 h-3 text-black" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.span>
            </button>
            {label && <span className="text-sm text-gray-400">{label}</span>}
        </label>
    );
}

/**
 * CyberToast - Animated toast notification
 */
interface ToastProps {
    id: string;
    type: "success" | "error" | "warning" | "info";
    title: string;
    message?: string;
    duration?: number;
    onDismiss: (id: string) => void;
}

export function CyberToast({ id, type, title, message, onDismiss }: ToastProps) {
    const config = {
        success: { 
            bg: "bg-sgif-emerald/10", 
            border: "border-sgif-emerald/30", 
            icon: Check,
            iconColor: "text-sgif-emerald"
        },
        error: { 
            bg: "bg-red-500/10", 
            border: "border-red-500/30", 
            icon: X,
            iconColor: "text-red-400"
        },
        warning: { 
            bg: "bg-sgif-gold/10", 
            border: "border-sgif-gold/30", 
            icon: AlertTriangle,
            iconColor: "text-sgif-gold"
        },
        info: { 
            bg: "bg-cyber-cyan/10", 
            border: "border-cyber-cyan/30", 
            icon: Info,
            iconColor: "text-cyber-cyan"
        }
    };

    const { bg, border, icon: Icon, iconColor } = config[type];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={cn(
                "flex items-start gap-3 p-4 rounded-xl backdrop-blur-xl border min-w-[320px]",
                bg, border
            )}
        >
            <div className={cn("p-1.5 rounded-lg", bg)}>
                <Icon className={cn("w-4 h-4", iconColor)} />
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-white">{title}</p>
                {message && <p className="text-xs text-gray-400 mt-0.5">{message}</p>}
            </div>
            <button
                onClick={() => onDismiss(id)}
                className="text-gray-500 hover:text-white transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}

/**
 * CyberTabs - Animated tab navigation
 */
interface Tab {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface CyberTabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
    className?: string;
}

export function CyberTabs({ tabs, activeTab, onChange, className }: CyberTabsProps) {
    return (
        <div className={cn(
            "inline-flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10",
            className
        )}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-300"
                    )}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-cyber-cyan/20 border border-cyber-cyan/30 rounded-lg"
                            style={{ boxShadow: "0 0 15px rgba(0,212,255,0.2)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        {tab.icon}
                        {tab.label}
                    </span>
                </button>
            ))}
        </div>
    );
}

/**
 * CyberSelect - Futuristic dropdown select
 */
interface SelectOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface CyberSelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function CyberSelect({ 
    options, 
    value, 
    onChange, 
    placeholder = "Select option",
    className 
}: CyberSelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectedOption = options.find(o => o.value === value);

    return (
        <div className={cn("relative", className)}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl",
                    "bg-white/5 border border-white/10 backdrop-blur-xl",
                    "text-sm transition-all duration-300",
                    isOpen && "border-cyber-cyan/50 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
                )}
            >
                <span className={selectedOption ? "text-white" : "text-gray-500"}>
                    {selectedOption?.label || placeholder}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className={cn(
                                "absolute z-50 w-full mt-2 py-2 rounded-xl",
                                "bg-gray-900/95 border border-white/10 backdrop-blur-xl",
                                "shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                            )}
                        >
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors",
                                        option.value === value 
                                            ? "text-cyber-cyan bg-cyber-cyan/10"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {option.icon}
                                    {option.label}
                                    {option.value === value && (
                                        <Check className="w-4 h-4 ml-auto" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * CyberCard3D - Card with 3D tilt effect
 */
export function CyberCard3D({
    children,
    className,
    intensity = 10
}: {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}) {
    const ref = React.useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPos);
        y.set(yPos);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className={cn(
                "relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl",
                "transition-shadow duration-300 hover:shadow-2xl",
                className
            )}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
}

/**
 * SparkleButton - Button with sparkle effects
 */
interface SparkleButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

export function SparkleButton({
    children,
    className,
    onClick,
    disabled
}: SparkleButtonProps) {
    const [sparkles, setSparkles] = React.useState<{ id: number; x: number; y: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const newSparkles = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }));
        setSparkles(prev => [...prev, ...newSparkles]);
        setTimeout(() => {
            setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
        }, 600);
        onClick?.(e);
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            disabled={disabled}
            className={cn(
                "relative inline-flex items-center gap-2 px-6 py-3",
                "bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold",
                "rounded-xl overflow-hidden",
                "shadow-[0_0_20px_rgba(0,212,255,0.3)]",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <Sparkles className="w-4 h-4" />
            <span className="relative z-10">{children}</span>
            
            {/* Sparkle effects */}
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.span
                        key={sparkle.id}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ 
                            scale: [0, 1, 0],
                            opacity: [1, 1, 0],
                            x: (Math.random() - 0.5) * 100,
                            y: (Math.random() - 0.5) * 100
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute w-2 h-2 bg-white rounded-full pointer-events-none"
                        style={{ left: sparkle.x, top: sparkle.y }}
                    />
                ))}
            </AnimatePresence>
        </motion.button>
    );
}
