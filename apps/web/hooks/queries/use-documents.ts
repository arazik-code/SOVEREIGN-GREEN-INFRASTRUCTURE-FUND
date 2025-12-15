/**
 * Document & Data Room Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dataroomService, type DocumentFilters, type DocumentAccessLevel, type UploadDocumentDTO } from "@sgif/lib";

// Query keys factory
export const documentKeys = {
    all: ['documents'] as const,
    lists: () => [...documentKeys.all, 'list'] as const,
    list: (params?: DocumentFilters) => [...documentKeys.lists(), params] as const,
    details: () => [...documentKeys.all, 'detail'] as const,
    detail: (id: string) => [...documentKeys.details(), id] as const,
    versions: (id: string) => [...documentKeys.all, 'versions', id] as const,
    folders: () => [...documentKeys.all, 'folders'] as const,
    folder: (id: string) => [...documentKeys.folders(), id] as const,
    search: (query: string) => [...documentKeys.all, 'search', query] as const,
    storage: () => [...documentKeys.all, 'storage'] as const,
    activity: (id: string) => [...documentKeys.all, 'activity', id] as const,
};

/**
 * Hook to fetch documents list
 */
export function useDocuments(params?: DocumentFilters) {
    return useQuery({
        queryKey: documentKeys.list(params),
        queryFn: () => dataroomService.getDocuments(params),
    });
}

/**
 * Hook to fetch a single document
 */
export function useDocument(id: string) {
    return useQuery({
        queryKey: documentKeys.detail(id),
        queryFn: () => dataroomService.getDocument(id),
        enabled: !!id,
    });
}

/**
 * Hook to fetch document versions
 */
export function useDocumentVersions(id: string) {
    return useQuery({
        queryKey: documentKeys.versions(id),
        queryFn: () => dataroomService.getVersions(id),
        enabled: !!id,
    });
}

/**
 * Hook to fetch folders
 */
export function useFolders(parentId?: string) {
    return useQuery({
        queryKey: documentKeys.folder(parentId || 'root'),
        queryFn: () => dataroomService.getFolders(parentId),
    });
}

/**
 * Hook to search documents
 */
export function useDocumentSearch(query: string) {
    return useQuery({
        queryKey: documentKeys.search(query),
        queryFn: () => dataroomService.search(query),
        enabled: query.length > 2,
    });
}

/**
 * Hook to fetch storage usage
 */
export function useStorageUsage() {
    return useQuery({
        queryKey: documentKeys.storage(),
        queryFn: () => dataroomService.getStorageUsage(),
    });
}

/**
 * Hook to fetch document activity
 */
export function useDocumentActivity(documentId: string) {
    return useQuery({
        queryKey: documentKeys.activity(documentId),
        queryFn: () => dataroomService.getActivity(documentId),
        enabled: !!documentId,
    });
}

/**
 * Hook to upload a document
 */
export function useUploadDocument() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ file, options }: {
            file: File;
            options?: UploadDocumentDTO;
        }) => dataroomService.upload(file, options),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: documentKeys.storage() });
        },
    });
}

/**
 * Hook to delete a document
 */
export function useDeleteDocument() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => dataroomService.deleteDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: documentKeys.storage() });
        },
    });
}

/**
 * Hook to move document to folder
 */
export function useMoveDocument() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ documentId, folderId }: { documentId: string; folderId: string | null }) => 
            dataroomService.moveDocument(documentId, folderId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: documentKeys.detail(variables.documentId) });
        },
    });
}

/**
 * Hook to share document
 */
export function useShareDocument() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ documentId, options }: {
            documentId: string;
            options: { 
                userIds: string[]; 
                accessLevel: DocumentAccessLevel;
                expiresAt?: string; 
                notifyUsers?: boolean;
                message?: string;
            };
        }) => dataroomService.shareDocument(documentId, options),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: documentKeys.detail(variables.documentId) });
        },
    });
}

/**
 * Hook to create folder
 */
export function useCreateFolder() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: { name: string; parentId?: string; projectId?: string }) =>
            dataroomService.createFolder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: documentKeys.folders() });
        },
    });
}

/**
 * Hook to delete folder
 */
export function useDeleteFolder() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, deleteContents }: { id: string; deleteContents?: boolean }) => 
            dataroomService.deleteFolder(id, deleteContents),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: documentKeys.folders() });
            queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
        },
    });
}
