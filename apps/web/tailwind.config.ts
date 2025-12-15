import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                sgif: {
                    dark: "#050508",
                    gold: "#D4AF37",
                    emerald: "#029A76",
                    charcoal: "#0a0a0f",
                },
                cyber: {
                    cyan: "#00ffff",
                    blue: "#0ea5e9",
                    purple: "#8b5cf6",
                    pink: "#ec4899",
                    green: "#10b981",
                },
                neon: {
                    cyan: "rgb(0, 255, 255)",
                    gold: "rgb(212, 175, 55)",
                    emerald: "rgb(2, 154, 118)",
                    purple: "rgb(139, 92, 246)",
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "shimmer": {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: "1", filter: "brightness(1)" },
                    "50%": { opacity: "0.8", filter: "brightness(1.3)" },
                },
                "border-flow": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "data-stream": {
                    "0%": { transform: "translateY(-100%)", opacity: "0" },
                    "50%": { opacity: "1" },
                    "100%": { transform: "translateY(100%)", opacity: "0" },
                },
                "radar-scan": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                "typing": {
                    "0%": { width: "0" },
                    "100%": { width: "100%" },
                },
                "blink": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "shimmer": "shimmer 2s linear infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "border-flow": "border-flow 3s ease infinite",
                "float": "float 6s ease-in-out infinite",
                "data-stream": "data-stream 2s linear infinite",
                "radar-scan": "radar-scan 4s linear infinite",
                "typing": "typing 2s steps(20) forwards",
                "blink": "blink 1s step-end infinite",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "cyber-grid": "linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)",
                "holographic": "linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(212, 175, 55, 0.1), rgba(139, 92, 246, 0.1))",
                "shimmer-gradient": "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            },
            backgroundSize: {
                "cyber-grid": "50px 50px",
            },
            boxShadow: {
                "neon-cyan": "0 0 5px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2), 0 0 40px rgba(0, 255, 255, 0.1)",
                "neon-gold": "0 0 5px rgba(212, 175, 55, 0.3), 0 0 20px rgba(212, 175, 55, 0.2), 0 0 40px rgba(212, 175, 55, 0.1)",
                "neon-emerald": "0 0 5px rgba(2, 154, 118, 0.3), 0 0 20px rgba(2, 154, 118, 0.2), 0 0 40px rgba(2, 154, 118, 0.1)",
                "inner-glow": "inset 0 0 20px rgba(0, 255, 255, 0.1)",
                "glass": "0 8px 32px rgba(0, 0, 0, 0.3)",
            },
            fontFamily: {
                mono: ["JetBrains Mono", "monospace"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
