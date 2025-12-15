/**
 * Governance Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { governanceService, type ProposalFilters, type CreateProposalDTO } from "@sgif/lib";

// Query keys factory
export const governanceKeys = {
    all: ['governance'] as const,
    proposals: () => [...governanceKeys.all, 'proposals'] as const,
    proposalList: (params?: ProposalFilters) => [...governanceKeys.proposals(), 'list', params] as const,
    proposal: (id: string) => [...governanceKeys.proposals(), id] as const,
    votes: (proposalId: string) => [...governanceKeys.proposals(), proposalId, 'votes'] as const,
    stats: () => [...governanceKeys.all, 'stats'] as const,
    activity: (limit?: number) => [...governanceKeys.all, 'activity', limit] as const,
    myVotes: () => [...governanceKeys.all, 'my-votes'] as const,
    pendingVotes: () => [...governanceKeys.all, 'pending'] as const,
};

/**
 * Hook to fetch proposals list
 */
export function useProposals(params?: ProposalFilters) {
    return useQuery({
        queryKey: governanceKeys.proposalList(params),
        queryFn: () => governanceService.getProposals(params),
    });
}

/**
 * Hook to fetch a single proposal
 */
export function useProposal(id: string) {
    return useQuery({
        queryKey: governanceKeys.proposal(id),
        queryFn: () => governanceService.getProposal(id),
        enabled: !!id,
    });
}

/**
 * Hook to fetch votes for a proposal
 */
export function useProposalVotes(proposalId: string) {
    return useQuery({
        queryKey: governanceKeys.votes(proposalId),
        queryFn: () => governanceService.getVotes(proposalId),
        enabled: !!proposalId,
    });
}

/**
 * Hook to fetch governance stats
 */
export function useGovernanceStats() {
    return useQuery({
        queryKey: governanceKeys.stats(),
        queryFn: () => governanceService.getStats(),
    });
}

/**
 * Hook to fetch governance activity log
 */
export function useGovernanceActivity(limit?: number) {
    return useQuery({
        queryKey: governanceKeys.activity(limit),
        queryFn: () => governanceService.getActivityLog(limit),
    });
}

/**
 * Hook to fetch user's voting history
 */
export function useMyVotes() {
    return useQuery({
        queryKey: governanceKeys.myVotes(),
        queryFn: () => governanceService.getMyVotes(),
    });
}

/**
 * Hook to fetch pending votes for current user
 */
export function usePendingVotes() {
    return useQuery({
        queryKey: governanceKeys.pendingVotes(),
        queryFn: () => governanceService.getPendingVotes(),
    });
}

/**
 * Hook to create a proposal
 */
export function useCreateProposal() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: CreateProposalDTO) => governanceService.createProposal(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: governanceKeys.proposals() });
            queryClient.invalidateQueries({ queryKey: governanceKeys.stats() });
        },
    });
}

/**
 * Hook to update a proposal
 */
export function useUpdateProposal() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: {
            id: string;
            data: Partial<CreateProposalDTO>;
        }) => governanceService.updateProposal(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: governanceKeys.proposal(variables.id) });
            queryClient.invalidateQueries({ queryKey: governanceKeys.proposals() });
        },
    });
}

/**
 * Hook to cast a vote
 */
export function useCastVote() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ proposalId, vote, comment }: {
            proposalId: string;
            vote: 'for' | 'against' | 'abstain';
            comment?: string;
        }) => governanceService.castVote(proposalId, { vote, comment }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: governanceKeys.proposal(variables.proposalId) });
            queryClient.invalidateQueries({ queryKey: governanceKeys.votes(variables.proposalId) });
            queryClient.invalidateQueries({ queryKey: governanceKeys.stats() });
        },
    });
}

/**
 * Hook to change a vote
 */
export function useChangeVote() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ proposalId, vote, comment }: {
            proposalId: string;
            vote: 'for' | 'against' | 'abstain';
            comment?: string;
        }) => governanceService.changeVote(proposalId, { vote, comment }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: governanceKeys.proposal(variables.proposalId) });
            queryClient.invalidateQueries({ queryKey: governanceKeys.votes(variables.proposalId) });
        },
    });
}

/**
 * Hook to execute an approved proposal
 */
export function useExecuteProposal() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => governanceService.executeProposal(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: governanceKeys.proposal(id) });
            queryClient.invalidateQueries({ queryKey: governanceKeys.proposals() });
            queryClient.invalidateQueries({ queryKey: governanceKeys.activity() });
        },
    });
}

/**
 * Hook to delete a proposal
 */
export function useDeleteProposal() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => governanceService.deleteProposal(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: governanceKeys.proposals() });
            queryClient.invalidateQueries({ queryKey: governanceKeys.stats() });
        },
    });
}
