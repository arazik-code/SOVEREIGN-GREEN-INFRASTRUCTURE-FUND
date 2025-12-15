/**
 * SGIF API Client
 * Sovereign-grade HTTP client with interceptors, retry logic, and timeout handling
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Request timeout in milliseconds
const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 3;
const RETRY_DELAY_BASE = 1000;

/**
 * Custom API Error with enhanced information
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public statusText: string,
        public data?: unknown,
        public requestId?: string
    ) {
        super(message);
        this.name = "ApiError";
    }

    get isClientError(): boolean {
        return this.status >= 400 && this.status < 500;
    }

    get isServerError(): boolean {
        return this.status >= 500;
    }

    get isNetworkError(): boolean {
        return this.status === 0;
    }

    get isUnauthorized(): boolean {
        return this.status === 401;
    }

    get isForbidden(): boolean {
        return this.status === 403;
    }

    get isNotFound(): boolean {
        return this.status === 404;
    }

    get isRateLimited(): boolean {
        return this.status === 429;
    }
}

/**
 * Request interceptor type
 */
type RequestInterceptor = (config: RequestInit) => RequestInit | Promise<RequestInit>;

/**
 * Response interceptor type
 */
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

/**
 * Error interceptor type
 */
type ErrorInterceptor = (error: ApiError) => ApiError | Promise<ApiError>;

// Interceptor storage
const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];
const errorInterceptors: ErrorInterceptor[] = [];

/**
 * Add a request interceptor
 */
export function addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    requestInterceptors.push(interceptor);
    return () => {
        const index = requestInterceptors.indexOf(interceptor);
        if (index > -1) requestInterceptors.splice(index, 1);
    };
}

/**
 * Add a response interceptor
 */
export function addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    responseInterceptors.push(interceptor);
    return () => {
        const index = responseInterceptors.indexOf(interceptor);
        if (index > -1) responseInterceptors.splice(index, 1);
    };
}

/**
 * Add an error interceptor
 */
export function addErrorInterceptor(interceptor: ErrorInterceptor): () => void {
    errorInterceptors.push(interceptor);
    return () => {
        const index = errorInterceptors.indexOf(interceptor);
        if (index > -1) errorInterceptors.splice(index, 1);
    };
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculate exponential backoff delay
 */
function getRetryDelay(attempt: number): number {
    return Math.min(RETRY_DELAY_BASE * Math.pow(2, attempt), 30000);
}

/**
 * Check if an error is retryable
 */
function isRetryableError(status: number): boolean {
    // Retry on network errors (0), server errors (5xx), and rate limiting (429)
    return status === 0 || status === 429 || (status >= 500 && status < 600);
}

/**
 * Create an AbortController with timeout
 */
function createTimeoutController(timeout: number): { controller: AbortController; timeoutId: NodeJS.Timeout } {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    return { controller, timeoutId };
}

/**
 * Request configuration options
 */
export interface ApiClientOptions extends Omit<RequestInit, "signal"> {
    timeout?: number;
    retries?: number;
    retryOn?: (status: number) => boolean;
    signal?: AbortSignal;
}

/**
 * Enhanced API client with interceptors, retry logic, and timeout handling
 */
export async function apiClient<T>(
    endpoint: string,
    options: ApiClientOptions = {}
): Promise<T> {
    const {
        timeout = DEFAULT_TIMEOUT,
        retries = MAX_RETRIES,
        retryOn = isRetryableError,
        signal: externalSignal,
        ...fetchOptions
    } = options;

    // Apply request interceptors
    let config: RequestInit = {
        ...fetchOptions,
        headers: {
            "Content-Type": "application/json",
            "X-Request-ID": crypto.randomUUID(),
            ...fetchOptions.headers,
        },
    };

    for (const interceptor of requestInterceptors) {
        config = await interceptor(config);
    }

    let lastError: ApiError | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        const { controller, timeoutId } = createTimeoutController(timeout);
        
        // Combine external signal with timeout signal
        const combinedSignal = externalSignal
            ? new AbortController().signal // In real implementation, combine signals
            : controller.signal;

        try {
            let response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...config,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            // Apply response interceptors
            for (const interceptor of responseInterceptors) {
                response = await interceptor(response);
            }

            if (!response.ok) {
                const requestId = response.headers.get("X-Request-ID") || undefined;
                let errorData: unknown;
                
                try {
                    errorData = await response.json();
                } catch {
                    errorData = await response.text();
                }

                throw new ApiError(
                    `API Error: ${response.statusText}`,
                    response.status,
                    response.statusText,
                    errorData,
                    requestId
                );
            }

            // Handle empty responses
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                return {} as T;
            }

            return response.json();
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError) {
                // Apply error interceptors
                let processedError = error;
                for (const interceptor of errorInterceptors) {
                    processedError = await interceptor(processedError);
                }

                // Check if we should retry
                if (attempt < retries && retryOn(processedError.status)) {
                    lastError = processedError;
                    await sleep(getRetryDelay(attempt));
                    continue;
                }

                throw processedError;
            }

            // Handle abort errors
            if (error instanceof DOMException && error.name === "AbortError") {
                throw new ApiError("Request timeout", 0, "Timeout", undefined, undefined);
            }

            // Handle network errors
            if (error instanceof TypeError) {
                const networkError = new ApiError(
                    "Network error",
                    0,
                    "Network Error",
                    undefined,
                    undefined
                );

                if (attempt < retries && retryOn(0)) {
                    lastError = networkError;
                    await sleep(getRetryDelay(attempt));
                    continue;
                }

                throw networkError;
            }

            throw error;
        }
    }

    // If we've exhausted all retries
    throw lastError || new ApiError("Request failed after retries", 0, "Retry Failed");
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
    get: <T>(endpoint: string, options?: ApiClientOptions) =>
        apiClient<T>(endpoint, { ...options, method: "GET" }),

    post: <T>(endpoint: string, data?: unknown, options?: ApiClientOptions) =>
        apiClient<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(data) }),

    put: <T>(endpoint: string, data?: unknown, options?: ApiClientOptions) =>
        apiClient<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(data) }),

    patch: <T>(endpoint: string, data?: unknown, options?: ApiClientOptions) =>
        apiClient<T>(endpoint, { ...options, method: "PATCH", body: JSON.stringify(data) }),

    delete: <T>(endpoint: string, options?: ApiClientOptions) =>
        apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};

// Default auth interceptor - adds Authorization header if token exists
addRequestInterceptor((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("sgif_token");
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
    }
    return config;
});

// Default error interceptor - handle 401 errors
addErrorInterceptor((error) => {
    if (error.isUnauthorized && typeof window !== "undefined") {
        // Clear token and redirect to login
        localStorage.removeItem("sgif_token");
        window.location.href = "/login";
    }
    return error;
});
