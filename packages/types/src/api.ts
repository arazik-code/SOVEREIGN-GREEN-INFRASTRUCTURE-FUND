/**
 * SGIF API Types
 * Request/Response types for API communication
 */

import type {
    User,
    AuthTokens,
    Project,
    ProjectSummary,
    KpiData,
    CarbonData,
    Document,
    Folder,
    Proposal,
    LimitedPartner,
    CapitalCall,
    Distribution,
    Notification,
    AuditLog,
    UserPreferences,
} from './models';

// ============================================================================
// Common API Types
// ============================================================================

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    timestamp: string;
    requestId?: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string[]>;
    timestamp: string;
    requestId?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

export interface PaginationParams {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
    search?: string;
    status?: string | string[];
    type?: string | string[];
    dateFrom?: string;
    dateTo?: string;
    [key: string]: unknown;
}

// ============================================================================
// Authentication API
// ============================================================================

export interface LoginRequest {
    email: string;
    password: string;
    mfaCode?: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    user: User;
    tokens: AuthTokens;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    organization?: string;
    inviteCode?: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    tokens: AuthTokens;
}

export interface MagicLinkRequest {
    email: string;
}

export interface MagicLinkVerifyRequest {
    token: string;
}

export interface PasswordResetRequest {
    email: string;
}

export interface PasswordResetConfirmRequest {
    token: string;
    newPassword: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

// ============================================================================
// Project API
// ============================================================================

export interface GetProjectsParams extends PaginationParams, FilterParams {
    status?: string | string[];
    type?: string | string[];
    country?: string;
    minBudget?: number;
    maxBudget?: number;
}

export interface GetProjectsResponse extends PaginatedResponse<ProjectSummary> {}

export interface GetProjectResponse {
    project: Project;
    relatedDocuments: Document[];
    teamMembers: User[];
}

export interface CreateProjectRequest {
    name: string;
    description?: string;
    location: string;
    country: string;
    type: string;
    budget: number;
    budgetCurrency?: string;
    capacity?: string;
    expectedCompletionDate?: string;
    tags?: string[];
}

export interface UpdateProjectRequest {
    name?: string;
    description?: string;
    status?: string;
    budget?: number;
    irr?: number;
    moic?: number;
    capacity?: string;
    carbonOffset?: number;
    tags?: string[];
}

// ============================================================================
// Financial API
// ============================================================================

export interface GetKpiResponse {
    kpis: KpiData;
    previousPeriod?: KpiData;
    trend: {
        aumChange: number;
        projectsChange: number;
        carbonChange: number;
        irrChange: number;
    };
}

export interface GetFinancialReportParams {
    startDate: string;
    endDate: string;
    projectIds?: string[];
    reportType: 'summary' | 'detailed' | 'quarterly' | 'annual';
}

export interface FinancialReportResponse {
    period: { start: string; end: string };
    totalInvestments: number;
    totalReturns: number;
    netIncome: number;
    expenses: number;
    irr: number;
    moic: number;
    byProject: Array<{
        projectId: string;
        projectName: string;
        invested: number;
        returns: number;
        irr: number;
    }>;
    charts: {
        monthlyReturns: Array<{ month: string; value: number }>;
        expenseBreakdown: Array<{ category: string; amount: number; percentage: number }>;
    };
}

// ============================================================================
// Carbon API
// ============================================================================

export interface GetCarbonDataParams {
    startDate?: string;
    endDate?: string;
    projectIds?: string[];
    granularity?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface GetCarbonDataResponse {
    carbon: CarbonData;
    comparison?: {
        previousPeriod: number;
        changePercent: number;
    };
}

// ============================================================================
// Data Room API
// ============================================================================

export interface GetDocumentsParams extends PaginationParams {
    folderId?: string;
    projectId?: string;
    type?: string;
    search?: string;
}

export interface GetDocumentsResponse extends PaginatedResponse<Document> {
    folders: Folder[];
    breadcrumbs: Array<{ id: string; name: string }>;
}

export interface UploadDocumentRequest {
    file: File;
    folderId?: string;
    projectId?: string;
    accessLevel?: string;
    tags?: string[];
}

export interface UploadDocumentResponse {
    document: Document;
    uploadUrl?: string;
}

export interface ShareDocumentRequest {
    documentId: string;
    userIds: string[];
    accessLevel: string;
    expiresAt?: string;
    notifyUsers?: boolean;
}

// ============================================================================
// Governance API
// ============================================================================

export interface GetProposalsParams extends PaginationParams {
    status?: string | string[];
    projectId?: string;
}

export interface GetProposalsResponse extends PaginatedResponse<Proposal> {
    activeCount: number;
    pendingVoteCount: number;
}

export interface CreateProposalRequest {
    title: string;
    description: string;
    projectId?: string;
    votingStartsAt: string;
    votingEndsAt: string;
    requiredQuorum: number;
    attachmentIds?: string[];
}

export interface CastVoteRequest {
    proposalId: string;
    vote: 'for' | 'against' | 'abstain';
    comment?: string;
}

// ============================================================================
// LP API
// ============================================================================

export interface GetLPsParams extends PaginationParams {
    type?: string;
    status?: string;
}

export interface GetLPsResponse extends PaginatedResponse<LimitedPartner> {
    totalCommitment: number;
    totalContributed: number;
    totalDistributed: number;
}

export interface GetLPDashboardResponse {
    lp: LimitedPartner;
    investments: Array<{
        project: ProjectSummary;
        invested: number;
        currentValue: number;
        irr: number;
    }>;
    capitalCalls: CapitalCall[];
    distributions: Distribution[];
    performance: {
        tvpi: number;
        dpi: number;
        rvpi: number;
    };
}

// ============================================================================
// Notification API
// ============================================================================

export interface GetNotificationsParams extends PaginationParams {
    isRead?: boolean;
    type?: string;
}

export interface GetNotificationsResponse extends PaginatedResponse<Notification> {
    unreadCount: number;
}

export interface MarkNotificationReadRequest {
    notificationIds: string[];
}

// ============================================================================
// Audit API
// ============================================================================

export interface GetAuditLogsParams extends PaginationParams, FilterParams {
    userId?: string;
    action?: string;
    resourceType?: string;
    startDate?: string;
    endDate?: string;
}

export interface GetAuditLogsResponse extends PaginatedResponse<AuditLog> {}

// ============================================================================
// Settings API
// ============================================================================

export interface UpdatePreferencesRequest extends Partial<Omit<UserPreferences, 'userId'>> {}

export interface UpdatePreferencesResponse {
    preferences: UserPreferences;
}

// ============================================================================
// Export Types
// ============================================================================

export interface ExportRequest {
    format: 'pdf' | 'excel' | 'csv' | 'json';
    type: string;
    filters?: FilterParams;
    columns?: string[];
}

export interface ExportResponse {
    downloadUrl: string;
    expiresAt: string;
    format: string;
    size: number;
}
