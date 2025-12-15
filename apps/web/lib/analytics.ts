/**
 * Web Vitals & Analytics Instrumentation
 * Performance monitoring for the SGIF platform
 */

import type { Metric } from 'web-vitals';

// Analytics endpoint
const ANALYTICS_ENDPOINT = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || '/api/analytics';

// Metric thresholds for alerts
const THRESHOLDS = {
    LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
    FID: { good: 100, needsImprovement: 300 },   // First Input Delay
    CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
    FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
    TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
    INP: { good: 200, needsImprovement: 500 },   // Interaction to Next Paint
};

type MetricName = keyof typeof THRESHOLDS;

// Metric rating based on thresholds
function getMetricRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
    const threshold = THRESHOLDS[name];
    if (!threshold) return 'needs-improvement';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
}

// Queue for batching metrics
let metricsQueue: Metric[] = [];
let flushTimeout: NodeJS.Timeout | null = null;

/**
 * Send metrics to analytics endpoint
 */
async function sendMetrics(metrics: Metric[]): Promise<void> {
    if (metrics.length === 0) return;
    
    try {
        // Use sendBeacon for reliability when page is unloading
        const data = JSON.stringify({
            metrics: metrics.map(m => ({
                name: m.name,
                value: m.value,
                rating: getMetricRating(m.name as MetricName, m.value),
                delta: m.delta,
                id: m.id,
                navigationType: m.navigationType,
                timestamp: Date.now(),
                url: typeof window !== 'undefined' ? window.location.href : '',
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
            })),
        });

        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
            navigator.sendBeacon(ANALYTICS_ENDPOINT, data);
        } else {
            await fetch(ANALYTICS_ENDPOINT, {
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
                keepalive: true,
            });
        }
    } catch (error) {
        // Silent fail for analytics
        if (process.env.NODE_ENV === 'development') {
            console.error('[Analytics] Failed to send metrics:', error);
        }
    }
}

/**
 * Flush queued metrics
 */
function flushMetrics(): void {
    if (flushTimeout) {
        clearTimeout(flushTimeout);
        flushTimeout = null;
    }
    
    const metricsToSend = [...metricsQueue];
    metricsQueue = [];
    
    sendMetrics(metricsToSend);
}

/**
 * Queue a metric for sending
 */
function queueMetric(metric: Metric): void {
    metricsQueue.push(metric);
    
    // Batch metrics and send after 5 seconds or when queue reaches 10
    if (metricsQueue.length >= 10) {
        flushMetrics();
    } else if (!flushTimeout) {
        flushTimeout = setTimeout(flushMetrics, 5000);
    }
}

/**
 * Report web vital metric
 */
export function reportWebVital(metric: Metric): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        const rating = getMetricRating(metric.name as MetricName, metric.value);
        const color = rating === 'good' ? '#10B981' : rating === 'needs-improvement' ? '#F59E0B' : '#EF4444';
        console.log(
            `%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${rating})`,
            `color: ${color}; font-weight: bold;`
        );
    }
    
    // Queue for sending
    queueMetric(metric);
}

/**
 * Initialize web vitals reporting
 * Call this in your app's entry point
 */
export async function initWebVitals(): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
    
    // Report all core web vitals
    onCLS(reportWebVital);
    onFID(reportWebVital);
    onFCP(reportWebVital);
    onLCP(reportWebVital);
    onTTFB(reportWebVital);
    onINP(reportWebVital);
    
    // Flush metrics on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            flushMetrics();
        }
    });
    
    // Flush on pagehide (for iOS Safari)
    window.addEventListener('pagehide', flushMetrics);
}

/**
 * Custom performance mark
 */
export function markPerformance(name: string, detail?: Record<string, unknown>): void {
    if (typeof performance !== 'undefined' && performance.mark) {
        performance.mark(name, { detail });
    }
}

/**
 * Custom performance measure
 */
export function measurePerformance(
    name: string,
    startMark: string,
    endMark?: string
): PerformanceMeasure | null {
    if (typeof performance !== 'undefined' && performance.measure) {
        try {
            return performance.measure(name, startMark, endMark);
        } catch {
            return null;
        }
    }
    return null;
}

/**
 * Track a custom event
 */
export function trackEvent(
    category: string,
    action: string,
    label?: string,
    value?: number
): void {
    const event = {
        category,
        action,
        label,
        value,
        timestamp: Date.now(),
        url: typeof window !== 'undefined' ? window.location.href : '',
    };
    
    if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics] Event:', event);
    }
    
    // Send to analytics
    try {
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
            navigator.sendBeacon(ANALYTICS_ENDPOINT, JSON.stringify({ event }));
        }
    } catch {
        // Silent fail
    }
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string): void {
    trackEvent('page', 'view', title || url);
}

/**
 * Track user timing
 */
export function trackTiming(
    category: string,
    variable: string,
    value: number,
    label?: string
): void {
    const timing = {
        category,
        variable,
        value,
        label,
        timestamp: Date.now(),
    };
    
    if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics] Timing:', timing);
    }
}

/**
 * Performance observer for long tasks
 */
export function observeLongTasks(callback?: (entry: PerformanceEntry) => void): void {
    if (typeof PerformanceObserver === 'undefined') return;
    
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn('[Performance] Long Task detected:', {
                        duration: entry.duration,
                        startTime: entry.startTime,
                        name: entry.name,
                    });
                }
                callback?.(entry);
            }
        });
        
        observer.observe({ entryTypes: ['longtask'] });
    } catch {
        // Long task API not supported
    }
}

/**
 * Performance observer for resource loading
 */
export function observeResources(callback?: (entry: PerformanceResourceTiming) => void): void {
    if (typeof PerformanceObserver === 'undefined') return;
    
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                const resourceEntry = entry as PerformanceResourceTiming;
                
                // Log slow resources in development
                if (process.env.NODE_ENV === 'development' && resourceEntry.duration > 1000) {
                    console.warn('[Performance] Slow resource:', {
                        name: resourceEntry.name,
                        duration: resourceEntry.duration,
                        transferSize: resourceEntry.transferSize,
                    });
                }
                
                callback?.(resourceEntry);
            }
        });
        
        observer.observe({ entryTypes: ['resource'] });
    } catch {
        // Resource timing API not supported
    }
}
