import { getRequestConfig } from 'next-intl/server';

// Supported locales configuration
export const locales = ['en', 'ar', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// RTL language configuration
export const rtlLocales: Locale[] = ['ar'];
export const isRtlLocale = (locale: string): boolean => rtlLocales.includes(locale as Locale);

// Locale metadata for UI
export const localeConfig: Record<Locale, {
    name: string;
    nativeName: string;
    direction: 'ltr' | 'rtl';
    flag: string;
    dateFormat: string;
    timeFormat: string;
    firstDayOfWeek: 0 | 1 | 6; // 0 = Sunday, 1 = Monday, 6 = Saturday
}> = {
    en: {
        name: 'English',
        nativeName: 'English',
        direction: 'ltr',
        flag: '🇺🇸',
        dateFormat: 'MM/dd/yyyy',
        timeFormat: 'h:mm a',
        firstDayOfWeek: 0,
    },
    ar: {
        name: 'Arabic',
        nativeName: 'العربية',
        direction: 'rtl',
        flag: '🇸🇦',
        dateFormat: 'dd/MM/yyyy',
        timeFormat: 'HH:mm',
        firstDayOfWeek: 6,
    },
    fr: {
        name: 'French',
        nativeName: 'Français',
        direction: 'ltr',
        flag: '🇫🇷',
        dateFormat: 'dd/MM/yyyy',
        timeFormat: 'HH:mm',
        firstDayOfWeek: 1,
    },
};

// Get locale configuration
export function getLocaleConfig(locale: string) {
    return localeConfig[locale as Locale] || localeConfig.en;
}

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) || defaultLocale;
    const config = getLocaleConfig(locale);
    
    // Validate locale
    const validLocale = locales.includes(locale as Locale) ? locale : defaultLocale;
    
    return {
        locale: validLocale,
        messages: (await import(`../messages/${validLocale}.json`)).default,
        // Time zone configuration
        timeZone: 'UTC',
        // Date/Time formatting
        now: new Date(),
        // Custom formatters
        formats: {
            dateTime: {
                short: {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                },
                medium: {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                },
                long: {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    weekday: 'long',
                },
                withTime: {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                },
            },
            number: {
                currency: {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                },
                compact: {
                    notation: 'compact',
                    compactDisplay: 'short',
                },
                percent: {
                    style: 'percent',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                },
                decimal: {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                },
            },
        },
    };
});
