/**
 * Vitest Setup File
 * This file runs before each test file
 */

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeAll, afterAll } from 'vitest';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock window.matchMedia
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });

    // Mock IntersectionObserver
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;

    // Mock ResizeObserver
    const mockResizeObserver = vi.fn();
    mockResizeObserver.mockReturnValue({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    });
    window.ResizeObserver = mockResizeObserver;

    // Mock scrollTo
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

    // Mock crypto.randomUUID
    Object.defineProperty(window, 'crypto', {
        value: {
            randomUUID: () => 'test-uuid-' + Math.random().toString(36).substr(2, 9),
            getRandomValues: (arr: Uint8Array) => {
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = Math.floor(Math.random() * 256);
                }
                return arr;
            },
        },
    });
});

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock sessionStorage
const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
};
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
        prefetch: vi.fn(),
    }),
    usePathname: () => '/app/dashboard',
    useSearchParams: () => new URLSearchParams(),
    useParams: () => ({}),
}));

// Mock next-intl
vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
    useLocale: () => 'en',
    useFormatter: () => ({
        dateTime: (date: Date) => date.toISOString(),
        number: (num: number) => num.toString(),
        relativeTime: (date: Date) => date.toISOString(),
    }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
        ...actual,
        AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
        motion: {
            div: 'div',
            span: 'span',
            button: 'button',
            ul: 'ul',
            li: 'li',
            nav: 'nav',
            header: 'header',
            main: 'main',
            section: 'section',
            article: 'article',
            aside: 'aside',
            footer: 'footer',
            form: 'form',
            input: 'input',
            label: 'label',
            p: 'p',
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            a: 'a',
            img: 'img',
            svg: 'svg',
            path: 'path',
        },
    };
});

// Suppress console errors during tests (optional)
const originalError = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        if (
            typeof args[0] === 'string' &&
            (args[0].includes('Warning: ReactDOM.render') ||
                args[0].includes('Warning: An update to') ||
                args[0].includes('act(...)'))
        ) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});

// Global test utilities
export const waitFor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockFetch = (data: any, options: { ok?: boolean; status?: number } = {}) => {
    const { ok = true, status = 200 } = options;
    return vi.fn().mockResolvedValue({
        ok,
        status,
        json: () => Promise.resolve(data),
        text: () => Promise.resolve(JSON.stringify(data)),
        headers: new Headers(),
    });
};
