/**
 * SGIF Tailwind Preset
 * Sovereign-grade design system for the entire platform
 * 
 * Usage in tailwind.config.ts:
 * import sgifPreset from '@sgif/config/tailwind-preset';
 * export default { presets: [sgifPreset], ... }
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    theme: {
        extend: {
            // SGIF Brand Colors
            colors: {
                // Primary - Sovereign Gold
                gold: {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',
                    500: '#D4AF37', // Primary gold
                    600: '#B8860B',
                    700: '#A16207',
                    800: '#854D0E',
                    900: '#713F12',
                    950: '#422006',
                },
                // Accent - Cyber Cyan
                'cyber-cyan': {
                    DEFAULT: '#00E5FF',
                    50: '#E0FCFF',
                    100: '#BEF8FD',
                    200: '#87EAF2',
                    300: '#54D1DB',
                    400: '#38BDF8',
                    500: '#00E5FF',
                    600: '#0891B2',
                    700: '#0E7490',
                    800: '#155E75',
                    900: '#164E63',
                    950: '#083344',
                },
                // Success - Emerald
                'sgif-emerald': {
                    DEFAULT: '#10B981',
                    50: '#ECFDF5',
                    100: '#D1FAE5',
                    200: '#A7F3D0',
                    300: '#6EE7B7',
                    400: '#34D399',
                    500: '#10B981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065F46',
                    900: '#064E3B',
                    950: '#022C22',
                },
                // Background - Deep Space
                'deep-space': {
                    DEFAULT: '#0A0A0F',
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                    950: '#0A0A0F',
                },
                // Semantic colors
                success: '#10B981',
                warning: '#F59E0B',
                error: '#EF4444',
                info: '#3B82F6',
            },
            // Typography
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
                display: ['Cal Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
                xs: ['0.75rem', { lineHeight: '1rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['1rem', { lineHeight: '1.5rem' }],
                lg: ['1.125rem', { lineHeight: '1.75rem' }],
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                '6xl': ['3.75rem', { lineHeight: '1' }],
                '7xl': ['4.5rem', { lineHeight: '1' }],
            },
            // Spacing
            spacing: {
                '4.5': '1.125rem',
                '13': '3.25rem',
                '15': '3.75rem',
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
            },
            // Border Radius
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            // Box Shadow
            boxShadow: {
                'glow-gold': '0 0 20px rgba(212, 175, 55, 0.3)',
                'glow-cyan': '0 0 20px rgba(0, 229, 255, 0.3)',
                'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.3)',
                'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            },
            // Background Images & Gradients
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                'gradient-cyber': 'linear-gradient(135deg, #00E5FF 0%, #0891B2 100%)',
                'gradient-dark': 'linear-gradient(180deg, #0F172A 0%, #0A0A0F 100%)',
                'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            },
            // Animations
            animation: {
                'fade-in': 'fade-in 0.3s ease-out',
                'fade-out': 'fade-out 0.3s ease-in',
                'slide-in': 'slide-in 0.3s ease-out',
                'slide-out': 'slide-out 0.3s ease-in',
                'scale-in': 'scale-in 0.2s ease-out',
                'scale-out': 'scale-out 0.2s ease-in',
                'spin-slow': 'spin 3s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'shimmer': 'shimmer 2s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                'slide-in': {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-out': {
                    '0%': { transform: 'translateY(0)', opacity: '1' },
                    '100%': { transform: 'translateY(10px)', opacity: '0' },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'scale-out': {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '100%': { transform: 'scale(0.95)', opacity: '0' },
                },
                'glow': {
                    '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'bounce-subtle': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
            },
            // Transitions
            transitionDuration: {
                '400': '400ms',
            },
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            // Z-index
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
            // Backdrop blur
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [
        // Custom plugin for glass morphism utilities
        function ({ addUtilities, addComponents, theme }) {
            // Glass morphism utilities
            addUtilities({
                '.glass': {
                    '@apply bg-white/5 backdrop-blur-xl border border-white/10': {},
                },
                '.glass-card': {
                    '@apply bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl': {},
                },
                '.glass-button': {
                    '@apply bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors': {},
                },
            });

            // Text utilities
            addUtilities({
                '.text-gradient-gold': {
                    '@apply bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent': {},
                },
                '.text-gradient-cyber': {
                    '@apply bg-gradient-to-r from-cyber-cyan-400 to-cyber-cyan-600 bg-clip-text text-transparent': {},
                },
                '.text-balance': {
                    'text-wrap': 'balance',
                },
            });

            // Layout utilities
            addUtilities({
                '.safe-top': {
                    'padding-top': 'env(safe-area-inset-top)',
                },
                '.safe-bottom': {
                    'padding-bottom': 'env(safe-area-inset-bottom)',
                },
                '.safe-left': {
                    'padding-left': 'env(safe-area-inset-left)',
                },
                '.safe-right': {
                    'padding-right': 'env(safe-area-inset-right)',
                },
            });

            // Card components
            addComponents({
                '.card-sovereign': {
                    '@apply glass-card p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300': {},
                },
                '.card-elevated': {
                    '@apply bg-deep-space-900 border border-white/10 rounded-2xl p-6 shadow-elevated': {},
                },
            });

            // Button components
            addComponents({
                '.btn-primary': {
                    '@apply bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold px-6 py-3 rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-glow-gold hover:shadow-glow-gold/50': {},
                },
                '.btn-secondary': {
                    '@apply glass-button px-6 py-3 rounded-xl font-medium': {},
                },
                '.btn-cyber': {
                    '@apply bg-gradient-to-r from-cyber-cyan-500 to-cyber-cyan-600 text-black font-semibold px-6 py-3 rounded-xl hover:from-cyber-cyan-400 hover:to-cyber-cyan-500 transition-all duration-300 shadow-glow-cyan hover:shadow-glow-cyan/50': {},
                },
            });

            // Input components
            addComponents({
                '.input-sovereign': {
                    '@apply w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all duration-300': {},
                },
            });

            // Badge components
            addComponents({
                '.badge': {
                    '@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium': {},
                },
                '.badge-gold': {
                    '@apply bg-gold-500/10 text-gold-400 border border-gold-500/20': {},
                },
                '.badge-cyan': {
                    '@apply bg-cyber-cyan-500/10 text-cyber-cyan-400 border border-cyber-cyan-500/20': {},
                },
                '.badge-success': {
                    '@apply bg-sgif-emerald-500/10 text-sgif-emerald-400 border border-sgif-emerald-500/20': {},
                },
                '.badge-error': {
                    '@apply bg-red-500/10 text-red-400 border border-red-500/20': {},
                },
                '.badge-warning': {
                    '@apply bg-amber-500/10 text-amber-400 border border-amber-500/20': {},
                },
            });
        },
    ],
};
