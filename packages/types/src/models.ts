/**
 * SGIF Domain Models
 * Core business entities and data structures
 */

// ============================================================================
// User & Authentication
// ============================================================================

export type UserRole = 
    | 'Founder'
    | 'GP'
    | 'LP'
    | 'Advisor'
    | 'Admin'
    | 'Auditor'
    | 'Government_Observer';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
    organization?: string;
    permissions?: string[];
    createdAt: string;
    updatedAt: string;
    lastLoginAt?: string;
    isActive: boolean;
    metadata?: Record<string, unknown>;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    tokenType: 'Bearer';
}

// ============================================================================
// Projects
// ============================================================================

export type ProjectStatus = 
    | 'sourcing'
    | 'dd'
    | 'ic'
    | 'construction'
    | 'operational'
    | 'divested';

export type ProjectType = 
    | 'Solar'
    | 'Wind'
    | 'Hydrogen'
    | 'Nuclear'
    | 'Ammonia'
    | 'Hydro'
    | 'Geothermal'
    | 'Battery'
    | 'Grid'
    | 'Other';

export interface Project {
    id: string;
    name: string;
    description?: string;
    location: string;
    country: string;
    region?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    status: ProjectStatus;
    type: ProjectType;
    budget: number;
    budgetCurrency: string;
    irr?: number;
    moic?: number;
    capacity?: string;
    capacityUnit?: string;
    carbonOffset?: number;
    carbonOffsetUnit?: string;
    startDate?: string;
    expectedCompletionDate?: string;
    actualCompletionDate?: string;
    gpId?: string;
    lpIds?: string[];
    documentIds?: string[];
    tags?: string[];
    createdAt: string;
    updatedAt: string;
    metadata?: Record<string, unknown>;
}

export interface ProjectSummary {
    id: string;
    name: string;
    location: string;
    status: ProjectStatus;
    type: ProjectType;
    budget: string;
    irr: string;
}

// ============================================================================
// Financial Data
// ============================================================================

export interface KpiData {
    aum: number;
    aumFormatted: string;
    aumCurrency: string;
    activeProjects: number;
    totalProjects: number;
    carbonOffset: number;
    carbonOffsetUnit: string;
    averageIrr: number;
    totalInvested: number;
    totalReturns: number;
    netAssetValue: number;
    period: string;
    asOfDate: string;
}

export interface FinancialMetric {
    name: string;
    value: number;
    previousValue?: number;
    change?: number;
    changePercent?: number;
    trend: 'up' | 'down' | 'neutral';
    unit?: string;
    period: string;
}

export interface CashFlow {
    id: string;
    date: string;
    type: 'inflow' | 'outflow';
    category: string;
    amount: number;
    currency: string;
    description?: string;
    projectId?: string;
    lpId?: string;
}

// ============================================================================
// Carbon & ESG
// ============================================================================

export interface CarbonForecastPoint {
    date: string;
    actual?: number;
    projected?: number;
    target?: number;
    unit: string;
}

export interface CarbonData {
    totalOffset: number;
    totalOffsetUnit: string;
    yearToDate: number;
    monthlyAverage: number;
    forecast: CarbonForecastPoint[];
    byProject: Array<{
        projectId: string;
        projectName: string;
        offset: number;
        percentage: number;
    }>;
    certifications: Array<{
        id: string;
        name: string;
        issuedAt: string;
        expiresAt: string;
        status: 'active' | 'expired' | 'pending';
    }>;
}

export interface EsgMetric {
    category: 'environmental' | 'social' | 'governance';
    name: string;
    score: number;
    maxScore: number;
    trend: 'up' | 'down' | 'stable';
    details?: string;
}

// ============================================================================
// Data Room
// ============================================================================

export type DocumentType = 
    | 'financial_report'
    | 'due_diligence'
    | 'legal'
    | 'technical'
    | 'presentation'
    | 'contract'
    | 'audit'
    | 'other';

export type DocumentAccessLevel = 'public' | 'lp' | 'gp' | 'admin' | 'confidential';

export interface Document {
    id: string;
    name: string;
    type: DocumentType;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl?: string;
    accessLevel: DocumentAccessLevel;
    projectId?: string;
    uploadedBy: string;
    uploadedAt: string;
    updatedAt: string;
    version: number;
    previousVersionId?: string;
    tags?: string[];
    metadata?: Record<string, unknown>;
}

export interface Folder {
    id: string;
    name: string;
    parentId?: string;
    projectId?: string;
    accessLevel: DocumentAccessLevel;
    documentCount: number;
    createdAt: string;
    updatedAt: string;
}

// ============================================================================
// Governance
// ============================================================================

export type ProposalStatus = 'draft' | 'voting' | 'approved' | 'rejected' | 'executed';

export interface Proposal {
    id: string;
    title: string;
    description: string;
    status: ProposalStatus;
    proposedBy: string;
    proposedAt: string;
    votingStartsAt: string;
    votingEndsAt: string;
    requiredQuorum: number;
    currentQuorum: number;
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
    attachmentIds?: string[];
    projectId?: string;
    executedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Vote {
    id: string;
    proposalId: string;
    userId: string;
    vote: 'for' | 'against' | 'abstain';
    weight: number;
    comment?: string;
    votedAt: string;
}

// ============================================================================
// LP (Limited Partner)
// ============================================================================

export interface LimitedPartner {
    id: string;
    name: string;
    type: 'institution' | 'sovereign' | 'family_office' | 'individual';
    email: string;
    contactPerson?: string;
    commitment: number;
    contributedCapital: number;
    distributions: number;
    unfundedCommitment: number;
    ownership: number;
    joinedAt: string;
    status: 'active' | 'inactive';
    metadata?: Record<string, unknown>;
}

export interface CapitalCall {
    id: string;
    lpId: string;
    amount: number;
    currency: string;
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue' | 'cancelled';
    paidAt?: string;
    purpose?: string;
    projectId?: string;
}

export interface Distribution {
    id: string;
    lpId: string;
    amount: number;
    currency: string;
    type: 'dividend' | 'return_of_capital' | 'carry';
    distributedAt: string;
    projectId?: string;
}

// ============================================================================
// Notifications
// ============================================================================

export type NotificationType = 
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'project_update'
    | 'document_shared'
    | 'vote_required'
    | 'capital_call';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    isRead: boolean;
    actionUrl?: string;
    metadata?: Record<string, unknown>;
    createdAt: string;
    expiresAt?: string;
}

// ============================================================================
// Audit & Logs
// ============================================================================

export type AuditAction = 
    | 'create'
    | 'read'
    | 'update'
    | 'delete'
    | 'login'
    | 'logout'
    | 'export'
    | 'share'
    | 'approve'
    | 'reject';

export interface AuditLog {
    id: string;
    userId: string;
    action: AuditAction;
    resourceType: string;
    resourceId: string;
    changes?: Record<string, { old: unknown; new: unknown }>;
    ipAddress?: string;
    userAgent?: string;
    timestamp: string;
    metadata?: Record<string, unknown>;
}

// ============================================================================
// Settings & Preferences
// ============================================================================

export interface UserPreferences {
    userId: string;
    theme: 'light' | 'dark' | 'system';
    language: 'en' | 'ar' | 'fr';
    timezone: string;
    dateFormat: string;
    numberFormat: string;
    currency: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    dashboardLayout?: Record<string, unknown>;
}

export interface SystemSettings {
    maintenanceMode: boolean;
    allowRegistration: boolean;
    requireMfa: boolean;
    sessionTimeout: number;
    passwordPolicy: {
        minLength: number;
        requireUppercase: boolean;
        requireNumbers: boolean;
        requireSpecialChars: boolean;
    };
    allowedDomains: string[];
}
