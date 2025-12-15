import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react() as any],
    test: {
        // Test environment
        environment: 'jsdom',
        
        // Setup files to run before each test file
        setupFiles: ['./test/setup.ts'],
        
        // Enable globals (describe, it, expect)
        globals: true,
        
        // Test file patterns
        include: [
            '**/*.test.{ts,tsx}',
            '**/*.spec.{ts,tsx}',
        ],
        exclude: [
            'node_modules',
            'dist',
            '.next',
            'e2e/**/*',
        ],
        
        // Coverage configuration
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov', 'json'],
            reportsDirectory: './coverage',
            exclude: [
                'node_modules/',
                'test/',
                '**/*.d.ts',
                '**/*.config.*',
                '**/types/**',
                '.next/',
                'e2e/',
            ],
            thresholds: {
                lines: 70,
                functions: 70,
                branches: 70,
                statements: 70,
            },
        },
        
        // Timeout for tests
        testTimeout: 10000,
        hookTimeout: 10000,
        
        // Watch mode configuration
        watch: false,
        
        // Reporter configuration
        reporters: ['verbose'],
        
        // Retry failed tests
        retry: process.env.CI ? 2 : 0,
        
        // Pool configuration for parallel execution
        pool: 'forks',
        poolOptions: {
            forks: {
                singleFork: false,
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './'),
            '@/components': resolve(__dirname, './components'),
            '@/hooks': resolve(__dirname, './hooks'),
            '@/navigation': resolve(__dirname, './navigation'),
            '@sgif/lib': resolve(__dirname, '../../packages/lib/src'),
            '@sgif/ui': resolve(__dirname, '../../packages/ui/src'),
        },
    },
})
