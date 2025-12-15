/**
 * SGIF Type Guards
 * Runtime type checking utilities
 */

import type {
    User,
    UserRole,
    Project,
    ProjectStatus,
    ProjectType,
    Document,
    Notification,
    Proposal,
} from './models';

// ============================================================================
// Primitive Guards
// ============================================================================

export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}

export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isArray<T>(value: unknown, itemGuard?: (item: unknown) => item is T): value is T[] {
    if (!Array.isArray(value)) return false;
    if (itemGuard) {
        return value.every(itemGuard);
    }
    return true;
}

export function isNonEmptyString(value: unknown): value is string {
    return isString(value) && value.trim().length > 0;
}

export function isValidEmail(value: unknown): value is string {
    if (!isString(value)) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

export function isValidUUID(value: unknown): value is string {
    if (!isString(value)) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
}

export function isValidDate(value: unknown): value is string {
    if (!isString(value)) return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
}

// ============================================================================
// Enum Guards
// ============================================================================

const USER_ROLES: UserRole[] = [
    'Founder',
    'GP',
    'LP',
    'Advisor',
    'Admin',
    'Auditor',
    'Government_Observer',
];

export function isUserRole(value: unknown): value is UserRole {
    return isString(value) && (USER_ROLES as readonly string[]).indexOf(value) !== -1;
}

const PROJECT_STATUSES: ProjectStatus[] = [
    'sourcing',
    'dd',
    'ic',
    'construction',
    'operational',
    'divested',
];

export function isProjectStatus(value: unknown): value is ProjectStatus {
    return isString(value) && (PROJECT_STATUSES as readonly string[]).indexOf(value) !== -1;
}

const PROJECT_TYPES: ProjectType[] = [
    'Solar',
    'Wind',
    'Hydrogen',
    'Nuclear',
    'Ammonia',
    'Hydro',
    'Geothermal',
    'Battery',
    'Grid',
    'Other',
];

export function isProjectType(value: unknown): value is ProjectType {
    return isString(value) && (PROJECT_TYPES as readonly string[]).indexOf(value) !== -1;
}

// ============================================================================
// Model Guards
// ============================================================================

export function isUser(value: unknown): value is User {
    if (!isObject(value)) return false;
    
    return (
        isNonEmptyString(value.id) &&
        isNonEmptyString(value.name) &&
        isValidEmail(value.email) &&
        isUserRole(value.role) &&
        isBoolean(value.isActive) &&
        isValidDate(value.createdAt) &&
        isValidDate(value.updatedAt)
    );
}

export function isProject(value: unknown): value is Project {
    if (!isObject(value)) return false;
    
    return (
        isNonEmptyString(value.id) &&
        isNonEmptyString(value.name) &&
        isNonEmptyString(value.location) &&
        isNonEmptyString(value.country) &&
        isProjectStatus(value.status) &&
        isProjectType(value.type) &&
        isNumber(value.budget) &&
        isNonEmptyString(value.budgetCurrency) &&
        isValidDate(value.createdAt) &&
        isValidDate(value.updatedAt)
    );
}

export function isDocument(value: unknown): value is Document {
    if (!isObject(value)) return false;
    
    return (
        isNonEmptyString(value.id) &&
        isNonEmptyString(value.name) &&
        isNonEmptyString(value.mimeType) &&
        isNumber(value.size) &&
        isNonEmptyString(value.url) &&
        isNonEmptyString(value.uploadedBy) &&
        isValidDate(value.uploadedAt)
    );
}

export function isNotification(value: unknown): value is Notification {
    if (!isObject(value)) return false;
    
    return (
        isNonEmptyString(value.id) &&
        isNonEmptyString(value.userId) &&
        isNonEmptyString(value.type) &&
        isNonEmptyString(value.title) &&
        isNonEmptyString(value.message) &&
        isBoolean(value.isRead) &&
        isValidDate(value.createdAt)
    );
}

export function isProposal(value: unknown): value is Proposal {
    if (!isObject(value)) return false;
    
    return (
        isNonEmptyString(value.id) &&
        isNonEmptyString(value.title) &&
        isNonEmptyString(value.description) &&
        isNonEmptyString(value.status) &&
        isNonEmptyString(value.proposedBy) &&
        isValidDate(value.votingStartsAt) &&
        isValidDate(value.votingEndsAt)
    );
}

// ============================================================================
// Utility Guards
// ============================================================================

/**
 * Assert that a value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

/**
 * Assert that a value is null or undefined
 */
export function isNullish(value: unknown): value is null | undefined {
    return value === null || value === undefined;
}

/**
 * Create a type guard for a specific set of string values
 */
export function createEnumGuard<T extends string>(values: readonly T[]): (value: unknown) => value is T {
    return (value: unknown): value is T => {
        return isString(value) && (values as readonly string[]).indexOf(value) !== -1;
    };
}

/**
 * Assert helper - throws if condition is false
 */
export function assert(condition: unknown, message?: string): asserts condition {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

/**
 * Assert that a value matches a type guard
 */
export function assertType<T>(
    value: unknown,
    guard: (value: unknown) => value is T,
    message?: string
): asserts value is T {
    if (!guard(value)) {
        throw new Error(message || 'Type assertion failed');
    }
}

/**
 * Safely parse JSON with type guard
 */
export function safeJsonParse<T>(
    json: string,
    guard: (value: unknown) => value is T
): T | null {
    try {
        const parsed = JSON.parse(json);
        if (guard(parsed)) {
            return parsed;
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Pick non-nullish values from an object
 */
export function pickDefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
    const result: Partial<T> = {};
    for (const key in obj) {
        if (isDefined(obj[key])) {
            result[key] = obj[key];
        }
    }
    return result;
}

/**
 * Check if object has a specific property
 */
export function hasProperty<K extends PropertyKey>(
    obj: unknown,
    key: K
): obj is Record<K, unknown> {
    return isObject(obj) && key in obj;
}
