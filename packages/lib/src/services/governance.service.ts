/**
 * Governance Service
 * API service for governance and voting
 */

import { api } from '../api';

export type ProposalStatus = 'draft' | 'voting' | 'approved' | 'rejected' | 'executed';

export interface Proposal {
    id: string;
    title: string;
    description: string;
    status: ProposalStatus;
    proposedBy: string;
    proposedByName: string;
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
    projectName?: string;
    executedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Vote {
    id: string;
    proposalId: string;
    userId: string;
    userName: string;
    vote: 'for' | 'against' | 'abstain';
    weight: number;
    comment?: string;
    votedAt: string;
}

export interface ProposalFilters {
    status?: ProposalStatus | ProposalStatus[];
    projectId?: string;
    proposedBy?: string;
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface CreateProposalDTO {
    title: string;
    description: string;
    projectId?: string;
    votingStartsAt: string;
    votingEndsAt: string;
    requiredQuorum: number;
    attachmentIds?: string[];
}

/**
 * Governance Service
 */
export const governanceService = {
    /**
     * Get proposals with optional filtering
     */
    getProposals: async (filters?: ProposalFilters): Promise<{
        proposals: Proposal[];
        pagination: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
        activeCount: number;
        pendingVoteCount: number;
    }> => {
        const params = new URLSearchParams();
        
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach(v => params.append(key, v));
                    } else {
                        params.append(key, String(value));
                    }
                }
            });
        }
        
        const query = params.toString();
        const endpoint = query ? `/api/governance/proposals?${query}` : '/api/governance/proposals';
        return api.get(endpoint);
    },

    /**
     * Get a single proposal
     */
    getProposal: async (id: string): Promise<{
        proposal: Proposal;
        votes: Vote[];
        userVote?: Vote;
        canVote: boolean;
    }> => {
        return api.get(`/api/governance/proposals/${id}`);
    },

    /**
     * Create a new proposal
     */
    createProposal: async (data: CreateProposalDTO): Promise<Proposal> => {
        return api.post<Proposal>('/api/governance/proposals', data);
    },

    /**
     * Update a proposal (only drafts)
     */
    updateProposal: async (id: string, updates: Partial<CreateProposalDTO>): Promise<Proposal> => {
        return api.patch<Proposal>(`/api/governance/proposals/${id}`, updates);
    },

    /**
     * Delete a proposal (only drafts)
     */
    deleteProposal: async (id: string): Promise<void> => {
        return api.delete(`/api/governance/proposals/${id}`);
    },

    /**
     * Submit a proposal for voting
     */
    submitProposal: async (id: string): Promise<Proposal> => {
        return api.post<Proposal>(`/api/governance/proposals/${id}/submit`);
    },

    /**
     * Cast a vote
     */
    castVote: async (proposalId: string, data: {
        vote: 'for' | 'against' | 'abstain';
        comment?: string;
    }): Promise<Vote> => {
        return api.post<Vote>(`/api/governance/proposals/${proposalId}/vote`, data);
    },

    /**
     * Change a vote (if allowed)
     */
    changeVote: async (proposalId: string, data: {
        vote: 'for' | 'against' | 'abstain';
        comment?: string;
    }): Promise<Vote> => {
        return api.patch<Vote>(`/api/governance/proposals/${proposalId}/vote`, data);
    },

    /**
     * Get votes for a proposal
     */
    getVotes: async (proposalId: string): Promise<Vote[]> => {
        return api.get<Vote[]>(`/api/governance/proposals/${proposalId}/votes`);
    },

    /**
     * Execute an approved proposal
     */
    executeProposal: async (id: string): Promise<Proposal> => {
        return api.post<Proposal>(`/api/governance/proposals/${id}/execute`);
    },

    /**
     * Get voting statistics
     */
    getStats: async (): Promise<{
        totalProposals: number;
        activeProposals: number;
        approvalRate: number;
        averageQuorum: number;
        participationRate: number;
        byMonth: Array<{
            month: string;
            proposed: number;
            approved: number;
            rejected: number;
        }>;
    }> => {
        return api.get('/api/governance/stats');
    },

    /**
     * Get user's voting history
     */
    getMyVotes: async (): Promise<Array<{
        proposal: Proposal;
        vote: Vote;
    }>> => {
        return api.get('/api/governance/my-votes');
    },

    /**
     * Get pending votes for current user
     */
    getPendingVotes: async (): Promise<Proposal[]> => {
        return api.get<Proposal[]>('/api/governance/pending');
    },

    /**
     * Get governance activity log
     */
    getActivityLog: async (limit?: number): Promise<Array<{
        type: 'proposed' | 'voted' | 'approved' | 'rejected' | 'executed';
        proposalId: string;
        proposalTitle: string;
        userId: string;
        userName: string;
        timestamp: string;
        details?: string;
    }>> => {
        const endpoint = limit 
            ? `/api/governance/activity?limit=${limit}` 
            : '/api/governance/activity';
        return api.get(endpoint);
    },
};
