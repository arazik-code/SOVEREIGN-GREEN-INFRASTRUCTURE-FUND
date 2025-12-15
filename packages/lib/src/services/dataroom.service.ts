/**
 * Data Room Service
 * API service for document management
 */

import { api } from '../api';

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
    folderId?: string;
    uploadedBy: string;
    uploadedAt: string;
    updatedAt: string;
    version: number;
    tags?: string[];
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

export interface DocumentFilters {
    folderId?: string;
    projectId?: string;
    type?: DocumentType | DocumentType[];
    accessLevel?: DocumentAccessLevel;
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface UploadDocumentDTO {
    folderId?: string;
    projectId?: string;
    accessLevel?: DocumentAccessLevel;
    tags?: string[];
}

/**
 * Data Room Service
 */
export const dataroomService = {
    /**
     * Get documents with optional filtering
     */
    getDocuments: async (filters?: DocumentFilters): Promise<{
        documents: Document[];
        folders: Folder[];
        breadcrumbs: Array<{ id: string; name: string }>;
        pagination: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
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
        const endpoint = query ? `/api/dataroom/documents?${query}` : '/api/dataroom/documents';
        return api.get(endpoint);
    },

    /**
     * Get a single document by ID
     */
    getDocument: async (id: string): Promise<Document> => {
        return api.get<Document>(`/api/dataroom/documents/${id}`);
    },

    /**
     * Get document download URL
     */
    getDownloadUrl: async (id: string): Promise<{ url: string; expiresAt: string }> => {
        return api.get(`/api/dataroom/documents/${id}/download`);
    },

    /**
     * Upload a document
     */
    upload: async (file: File, options?: UploadDocumentDTO): Promise<Document> => {
        const formData = new FormData();
        formData.append('file', file);
        
        if (options) {
            Object.entries(options).forEach(([key, value]) => {
                if (value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach(v => formData.append(key, v));
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });
        }
        
        const response = await fetch('/api/dataroom/documents', {
            method: 'POST',
            body: formData,
        });
        
        if (!response.ok) {
            throw new Error('Upload failed');
        }
        
        return response.json();
    },

    /**
     * Update document metadata
     */
    updateDocument: async (id: string, updates: {
        name?: string;
        accessLevel?: DocumentAccessLevel;
        tags?: string[];
    }): Promise<Document> => {
        return api.patch<Document>(`/api/dataroom/documents/${id}`, updates);
    },

    /**
     * Delete a document
     */
    deleteDocument: async (id: string): Promise<void> => {
        return api.delete(`/api/dataroom/documents/${id}`);
    },

    /**
     * Move document to folder
     */
    moveDocument: async (documentId: string, folderId: string | null): Promise<Document> => {
        return api.patch<Document>(`/api/dataroom/documents/${documentId}/move`, { folderId });
    },

    /**
     * Get folders
     */
    getFolders: async (parentId?: string): Promise<Folder[]> => {
        const endpoint = parentId 
            ? `/api/dataroom/folders?parentId=${parentId}` 
            : '/api/dataroom/folders';
        return api.get<Folder[]>(endpoint);
    },

    /**
     * Create a folder
     */
    createFolder: async (data: {
        name: string;
        parentId?: string;
        projectId?: string;
        accessLevel?: DocumentAccessLevel;
    }): Promise<Folder> => {
        return api.post<Folder>('/api/dataroom/folders', data);
    },

    /**
     * Update a folder
     */
    updateFolder: async (id: string, updates: {
        name?: string;
        accessLevel?: DocumentAccessLevel;
    }): Promise<Folder> => {
        return api.patch<Folder>(`/api/dataroom/folders/${id}`, updates);
    },

    /**
     * Delete a folder
     */
    deleteFolder: async (id: string, deleteContents?: boolean): Promise<void> => {
        const endpoint = deleteContents 
            ? `/api/dataroom/folders/${id}?deleteContents=true` 
            : `/api/dataroom/folders/${id}`;
        return api.delete(endpoint);
    },

    /**
     * Share document with users
     */
    shareDocument: async (documentId: string, options: {
        userIds: string[];
        accessLevel: DocumentAccessLevel;
        expiresAt?: string;
        notifyUsers?: boolean;
        message?: string;
    }): Promise<{ shareUrl: string }> => {
        return api.post(`/api/dataroom/documents/${documentId}/share`, options);
    },

    /**
     * Get document versions
     */
    getVersions: async (documentId: string): Promise<Array<{
        version: number;
        uploadedBy: string;
        uploadedAt: string;
        size: number;
        url: string;
    }>> => {
        return api.get(`/api/dataroom/documents/${documentId}/versions`);
    },

    /**
     * Get document activity log
     */
    getActivity: async (documentId: string): Promise<Array<{
        action: string;
        userId: string;
        userName: string;
        timestamp: string;
        details?: string;
    }>> => {
        return api.get(`/api/dataroom/documents/${documentId}/activity`);
    },

    /**
     * Search documents
     */
    search: async (query: string, options?: {
        type?: DocumentType[];
        projectId?: string;
        limit?: number;
    }): Promise<Document[]> => {
        const params = new URLSearchParams({ q: query });
        
        if (options) {
            Object.entries(options).forEach(([key, value]) => {
                if (value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach(v => params.append(key, v));
                    } else {
                        params.append(key, String(value));
                    }
                }
            });
        }
        
        return api.get<Document[]>(`/api/dataroom/search?${params.toString()}`);
    },

    /**
     * Get storage usage
     */
    getStorageUsage: async (): Promise<{
        used: number;
        limit: number;
        percentage: number;
        byType: Array<{ type: DocumentType; size: number; count: number }>;
    }> => {
        return api.get('/api/dataroom/storage');
    },
};
