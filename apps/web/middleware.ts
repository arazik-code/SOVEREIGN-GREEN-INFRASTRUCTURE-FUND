import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { locales } from './navigation';

// Routes that require authentication
const protectedRoutes = [
    '/app',
    '/app/dashboard',
    '/app/projects',
    '/app/carbon',
    '/app/financials',
    '/app/data-room',
    '/app/governance',
    '/app/reports',
    '/app/lp',
    '/app/admin',
    '/app/ai',
    '/app/insights',
    '/app/maps',
    '/app/settings',
];

// Routes that should redirect authenticated users
const authRoutes = ['/login', '/signup', '/magic-link'];

// Create intl middleware
const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: 'en',
});

/**
 * Check if path matches any protected route
 */
function isProtectedRoute(pathname: string): boolean {
    // Remove locale prefix for checking
    const cleanPath = pathname.replace(/^\/(en|ar|fr)/, '');
    return protectedRoutes.some(route => cleanPath.startsWith(route));
}

/**
 * Check if path is an auth route
 */
function isAuthRoute(pathname: string): boolean {
    const cleanPath = pathname.replace(/^\/(en|ar|fr)/, '');
    return authRoutes.some(route => cleanPath.startsWith(route));
}

/**
 * Get the locale from pathname
 */
function getLocaleFromPath(pathname: string): string {
    const match = pathname.match(/^\/(en|ar|fr)/);
    return match ? match[1] : 'en';
}

/**
 * Enhanced middleware with auth protection
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Check for auth token in cookies or headers
    const token = request.cookies.get('sgif_token')?.value 
        || request.headers.get('Authorization')?.replace('Bearer ', '');
    
    const isAuthenticated = !!token;
    const locale = getLocaleFromPath(pathname);

    // Handle protected routes
    if (isProtectedRoute(pathname)) {
        if (!isAuthenticated) {
            // Redirect to login with return URL (strip locale from returnTo)
            const loginUrl = new URL(`/${locale}/login`, request.url);
            const returnPath = pathname.replace(/^\/(en|ar|fr)/, '');
            loginUrl.searchParams.set('returnTo', returnPath);
            return NextResponse.redirect(loginUrl);
        }
        
        // Optional: Verify token validity with API
        // try {
        //     const response = await fetch(`${process.env.API_URL}/auth/verify`, {
        //         headers: { Authorization: `Bearer ${token}` }
        //     });
        //     if (!response.ok) {
        //         return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
        //     }
        // } catch {
        //     return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
        // }
    }

    // Redirect authenticated users away from auth pages
    if (isAuthRoute(pathname) && isAuthenticated) {
        return NextResponse.redirect(new URL(`/${locale}/app/dashboard`, request.url));
    }

    // Apply security headers
    const response = intlMiddleware(request);
    
    if (response) {
        // Security headers
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        response.headers.set('X-XSS-Protection', '1; mode=block');
        response.headers.set(
            'Permissions-Policy', 
            'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
        );
        
        // HSTS header for production
        if (process.env.NODE_ENV === 'production') {
            response.headers.set(
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload'
            );
        }
        
        // CSP header
        response.headers.set(
            'Content-Security-Policy',
            [
                "default-src 'self'",
                "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                "img-src 'self' data: https: blob:",
                "font-src 'self' data: https://fonts.gstatic.com",
                "connect-src 'self' http://localhost:4000 https://*.sgif.gov https://*.cartocdn.com https://*.basemaps.cartocdn.com https://api.maptiler.com https://*.maptiler.com wss:",
                "worker-src 'self' blob:",
                "frame-ancestors 'none'",
            ].join('; ')
        );
    }

    return response;
}

export const config = {
    // Match internationalized pathnames and protected routes
    matcher: [
        '/', 
        '/(ar|en|fr)/:path*',
        // Skip internal paths
        '/((?!api|_next|_vercel|.*\\..*).*)',
    ],
};
