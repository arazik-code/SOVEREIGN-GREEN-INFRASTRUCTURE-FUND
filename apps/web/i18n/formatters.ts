/**
 * i18n Formatting Utilities
 * Custom hooks and utilities for formatting dates, numbers, and currencies
 */

"use client";

import { useLocale, useFormatter, useNow, useTimeZone } from 'next-intl';
import { useMemo, useCallback } from 'react';
import { getLocaleConfig, isRtlLocale, type Locale } from './request';

/**
 * Hook for formatting utilities with locale awareness
 */
export function useI18nFormatters() {
    const locale = useLocale();
    const format = useFormatter();
    const now = useNow();
    const timeZone = useTimeZone();
    const config = useMemo(() => getLocaleConfig(locale), [locale]);
    const isRtl = useMemo(() => isRtlLocale(locale), [locale]);

    /**
     * Format a number with locale-specific separators
     */
    const formatNumber = useCallback((
        value: number,
        options?: {
            minimumFractionDigits?: number;
            maximumFractionDigits?: number;
            notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
            compactDisplay?: 'short' | 'long';
        }
    ) => {
        return format.number(value, options);
    }, [format]);

    /**
     * Format a number as currency
     */
    const formatCurrency = useCallback((
        value: number,
        currency = 'USD',
        options?: {
            minimumFractionDigits?: number;
            maximumFractionDigits?: number;
            currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
        }
    ) => {
        return format.number(value, {
            style: 'currency',
            currency,
            minimumFractionDigits: options?.minimumFractionDigits ?? 0,
            maximumFractionDigits: options?.maximumFractionDigits ?? 2,
            currencyDisplay: options?.currencyDisplay,
        });
    }, [format]);

    /**
     * Format large numbers with compact notation (e.g., 1.2M, 500K)
     */
    const formatCompact = useCallback((
        value: number,
        options?: {
            minimumFractionDigits?: number;
            maximumFractionDigits?: number;
            compactDisplay?: 'short' | 'long';
        }
    ) => {
        return format.number(value, {
            notation: 'compact',
            compactDisplay: options?.compactDisplay ?? 'short',
            minimumFractionDigits: options?.minimumFractionDigits,
            maximumFractionDigits: options?.maximumFractionDigits,
        });
    }, [format]);

    /**
     * Format as percentage
     */
    const formatPercent = useCallback((
        value: number,
        options?: {
            minimumFractionDigits?: number;
            maximumFractionDigits?: number;
        }
    ) => {
        return format.number(value / 100, {
            style: 'percent',
            minimumFractionDigits: options?.minimumFractionDigits ?? 0,
            maximumFractionDigits: options?.maximumFractionDigits ?? 2,
        });
    }, [format]);

    /**
     * Format a date
     */
    const formatDate = useCallback((
        date: Date | number,
        style: 'short' | 'medium' | 'long' | 'withTime' = 'medium'
    ) => {
        const d = typeof date === 'number' ? new Date(date) : date;
        return format.dateTime(d, style);
    }, [format]);

    /**
     * Format relative time (e.g., "2 hours ago", "in 3 days")
     */
    const formatRelativeTime = useCallback((
        date: Date | number,
        options?: { style?: 'long' | 'short' | 'narrow' }
    ) => {
        const d = typeof date === 'number' ? new Date(date) : date;
        return format.relativeTime(d, { now, ...options });
    }, [format, now]);

    /**
     * Format time only
     */
    const formatTime = useCallback((
        date: Date | number,
        options?: {
            hour?: 'numeric' | '2-digit';
            minute?: 'numeric' | '2-digit';
            second?: 'numeric' | '2-digit';
            hour12?: boolean;
        }
    ) => {
        const d = typeof date === 'number' ? new Date(date) : date;
        return format.dateTime(d, {
            hour: options?.hour ?? 'numeric',
            minute: options?.minute ?? 'numeric',
            second: options?.second,
            hour12: options?.hour12,
        });
    }, [format]);

    /**
     * Format date range
     */
    const formatDateRange = useCallback((
        start: Date | number,
        end: Date | number,
        style: 'short' | 'medium' | 'long' = 'medium'
    ) => {
        const s = typeof start === 'number' ? new Date(start) : start;
        const e = typeof end === 'number' ? new Date(end) : end;
        return format.dateTimeRange(s, e, style);
    }, [format]);

    /**
     * Format a list with proper separators (e.g., "A, B, and C")
     */
    const formatList = useCallback((
        items: string[],
        options?: Intl.ListFormatOptions
    ) => {
        return format.list(items, {
            type: 'conjunction',
            ...options,
        });
    }, [format]);

    /**
     * Format file size
     */
    const formatFileSize = useCallback((bytes: number) => {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let unitIndex = 0;
        let value = bytes;

        while (value >= 1024 && unitIndex < units.length - 1) {
            value /= 1024;
            unitIndex++;
        }

        return `${formatNumber(value, { maximumFractionDigits: 1 })} ${units[unitIndex]}`;
    }, [formatNumber]);

    /**
     * Format duration (e.g., "2h 30m")
     */
    const formatDuration = useCallback((
        seconds: number,
        options?: { style?: 'short' | 'long' }
    ) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        const style = options?.style || 'short';
        const parts: string[] = [];

        if (hours > 0) {
            parts.push(style === 'short' ? `${hours}h` : `${hours} hour${hours !== 1 ? 's' : ''}`);
        }
        if (minutes > 0) {
            parts.push(style === 'short' ? `${minutes}m` : `${minutes} minute${minutes !== 1 ? 's' : ''}`);
        }
        if (secs > 0 && hours === 0) {
            parts.push(style === 'short' ? `${secs}s` : `${secs} second${secs !== 1 ? 's' : ''}`);
        }

        return parts.join(' ');
    }, []);

    /**
     * Format ordinal (e.g., "1st", "2nd", "3rd")
     */
    const formatOrdinal = useCallback((value: number) => {
        const pr = new Intl.PluralRules(locale, { type: 'ordinal' });
        const suffixes: Record<string, string> = {
            one: 'st',
            two: 'nd',
            few: 'rd',
            other: 'th',
        };
        const rule = pr.select(value);
        const suffix = suffixes[rule] || 'th';
        return `${value}${suffix}`;
    }, [locale]);

    return {
        locale: locale as Locale,
        config,
        isRtl,
        timeZone,
        now,
        formatNumber,
        formatCurrency,
        formatCompact,
        formatPercent,
        formatDate,
        formatRelativeTime,
        formatTime,
        formatDateRange,
        formatList,
        formatFileSize,
        formatDuration,
        formatOrdinal,
    };
}

/**
 * Hook for RTL-aware styling
 */
export function useRtl() {
    const locale = useLocale();
    const isRtl = useMemo(() => isRtlLocale(locale), [locale]);

    return {
        isRtl,
        dir: isRtl ? 'rtl' : 'ltr',
        // Utility for margin/padding that flips in RTL
        start: isRtl ? 'right' : 'left',
        end: isRtl ? 'left' : 'right',
        // CSS logical properties helpers
        marginStart: isRtl ? 'marginRight' : 'marginLeft',
        marginEnd: isRtl ? 'marginLeft' : 'marginRight',
        paddingStart: isRtl ? 'paddingRight' : 'paddingLeft',
        paddingEnd: isRtl ? 'paddingLeft' : 'paddingRight',
        // Transform helpers
        flipX: isRtl ? 'scaleX(-1)' : 'scaleX(1)',
    };
}

/**
 * Get the direction attribute value for HTML
 */
export function useDirection() {
    const { dir } = useRtl();
    return dir;
}
