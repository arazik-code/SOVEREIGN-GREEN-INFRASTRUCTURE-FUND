"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider } from "next-intl";
import { useState, type ReactNode } from "react";

/**
 * Global error handler for React Query
 */
function handleQueryError(error: unknown): void {
    console.error("[React Query Error]", error);
    // In production, send to error tracking service
    if (process.env.NODE_ENV === "production") {
        // captureException(error);
    }
}

/**
 * Create a configured QueryClient with optimal defaults
 */
function makeQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Data considered fresh for 1 minute
                staleTime: 60 * 1000,
                // Keep unused data in cache for 5 minutes
                gcTime: 5 * 60 * 1000,
                // Retry failed requests up to 3 times with exponential backoff
                retry: (failureCount, error) => {
                    // Don't retry on 4xx errors
                    if (error instanceof Error && error.message.includes("4")) {
                        return false;
                    }
                    return failureCount < 3;
                },
                retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
                // Refetch on window focus only in production
                refetchOnWindowFocus: process.env.NODE_ENV === "production",
                // Don't refetch on reconnect by default
                refetchOnReconnect: "always",
            },
            mutations: {
                // Retry mutations once
                retry: 1,
                retryDelay: 1000,
                onError: handleQueryError,
            },
        },
    });
}

// Singleton for SSR - prevents creating multiple clients
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(): QueryClient {
    if (typeof window === "undefined") {
        // Server: always create a new client
        return makeQueryClient();
    } else {
        // Browser: reuse client across renders
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }
        return browserQueryClient;
    }
}

interface ProvidersProps {
    children: ReactNode;
    locale: string;
    messages: Record<string, unknown>;
}

export default function Providers({ children, locale, messages }: ProvidersProps) {
    const [queryClient] = useState(getQueryClient);

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <QueryClientProvider client={queryClient}>
                {children}
                {process.env.NODE_ENV === "development" && (
                    <ReactQueryDevtools 
                        initialIsOpen={false} 
                        buttonPosition="bottom-left"
                    />
                )}
            </QueryClientProvider>
        </NextIntlClientProvider>
    );
}
