const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Transpile monorepo packages
    transpilePackages: ["@sgif/ui", "@sgif/lib"],

    // Enable React strict mode
    reactStrictMode: true,

    // Optimize package imports for better tree-shaking
    experimental: {
        optimizePackageImports: [
            'lucide-react',
            'recharts',
            'framer-motion',
            '@dnd-kit/core',
            '@dnd-kit/sortable',
        ],
    },

    // Image optimization configuration
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.sgif.gov',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Compiler optimizations
    compiler: {
        // Remove console.log in production
        removeConsole: process.env.NODE_ENV === 'production' 
            ? { exclude: ['error', 'warn'] } 
            : false,
    },

    // Webpack configuration
    webpack: (config, { isServer, dev }) => {
        // Optimize bundle splitting
        if (!isServer && !dev) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    // Vendor chunk for node_modules
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                    // Separate chunk for large libraries
                    charts: {
                        test: /[\\/]node_modules[\\/](recharts|d3-.*)[\\/]/,
                        name: 'charts',
                        chunks: 'all',
                        priority: 10,
                    },
                    maps: {
                        test: /[\\/]node_modules[\\/](maplibre-gl|react-map-gl)[\\/]/,
                        name: 'maps',
                        chunks: 'all',
                        priority: 10,
                    },
                    animations: {
                        test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
                        name: 'animations',
                        chunks: 'all',
                        priority: 10,
                    },
                },
            };
        }

        return config;
    },

    // Security headers (additional to middleware)
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                // Cache static assets
                source: '/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },

    // Redirects
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/app/dashboard',
                permanent: true,
            },
            {
                source: '/projects',
                destination: '/app/projects',
                permanent: true,
            },
        ];
    },

    // Powered by header removal for security
    poweredByHeader: false,

    // Compression
    compress: true,

    // Production source maps for error tracking
    productionBrowserSourceMaps: process.env.ENABLE_SOURCE_MAPS === 'true',

    // Logging configuration
    logging: {
        fetches: {
            fullUrl: process.env.NODE_ENV === 'development',
        },
    },
};

module.exports = withNextIntl(nextConfig);
