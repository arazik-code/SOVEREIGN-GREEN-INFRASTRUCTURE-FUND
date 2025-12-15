/**
 * i18n Index
 * Centralized exports for internationalization
 */

export { 
    locales, 
    defaultLocale, 
    rtlLocales, 
    isRtlLocale, 
    localeConfig, 
    getLocaleConfig,
    type Locale,
} from './request';

export { 
    useI18nFormatters, 
    useRtl, 
    useDirection,
} from './formatters';
