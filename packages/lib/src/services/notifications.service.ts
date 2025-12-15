/**
 * Notifications Service
 * API service for notification management
 */

import { api } from '../api';

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

export interface NotificationFilters {
    isRead?: boolean;
    type?: NotificationType | NotificationType[];
    page?: number;
    pageSize?: number;
}

export interface NotificationPreferences {
    email: {
        enabled: boolean;
        projectUpdates: boolean;
        documentShared: boolean;
        voteRequired: boolean;
        capitalCall: boolean;
        marketing: boolean;
    };
    push: {
        enabled: boolean;
        projectUpdates: boolean;
        documentShared: boolean;
        voteRequired: boolean;
        capitalCall: boolean;
    };
    inApp: {
        enabled: boolean;
        playSound: boolean;
    };
}

/**
 * Notifications Service
 */
export const notificationsService = {
    /**
     * Get notifications with optional filtering
     */
    getNotifications: async (filters?: NotificationFilters): Promise<{
        notifications: Notification[];
        pagination: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
        unreadCount: number;
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
        const endpoint = query ? `/api/notifications?${query}` : '/api/notifications';
        return api.get(endpoint);
    },

    /**
     * Get unread count
     */
    getUnreadCount: async (): Promise<{ count: number }> => {
        return api.get('/api/notifications/unread-count');
    },

    /**
     * Mark notification as read
     */
    markAsRead: async (id: string): Promise<Notification> => {
        return api.patch<Notification>(`/api/notifications/${id}/read`);
    },

    /**
     * Mark multiple notifications as read
     */
    markManyAsRead: async (ids: string[]): Promise<{ updatedCount: number }> => {
        return api.post('/api/notifications/mark-read', { ids });
    },

    /**
     * Mark all notifications as read
     */
    markAllAsRead: async (): Promise<{ updatedCount: number }> => {
        return api.post('/api/notifications/mark-all-read');
    },

    /**
     * Delete a notification
     */
    delete: async (id: string): Promise<void> => {
        return api.delete(`/api/notifications/${id}`);
    },

    /**
     * Delete multiple notifications
     */
    deleteMany: async (ids: string[]): Promise<{ deletedCount: number }> => {
        return api.post('/api/notifications/delete-many', { ids });
    },

    /**
     * Clear all notifications
     */
    clearAll: async (): Promise<{ deletedCount: number }> => {
        return api.delete('/api/notifications/clear-all');
    },

    /**
     * Get notification preferences
     */
    getPreferences: async (): Promise<NotificationPreferences> => {
        return api.get<NotificationPreferences>('/api/notifications/preferences');
    },

    /**
     * Update notification preferences
     */
    updatePreferences: async (preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> => {
        return api.patch<NotificationPreferences>('/api/notifications/preferences', preferences);
    },

    /**
     * Subscribe to push notifications
     */
    subscribeToPush: async (subscription: PushSubscription): Promise<{ subscribed: boolean }> => {
        return api.post('/api/notifications/push/subscribe', subscription);
    },

    /**
     * Unsubscribe from push notifications
     */
    unsubscribeFromPush: async (): Promise<{ unsubscribed: boolean }> => {
        return api.post('/api/notifications/push/unsubscribe');
    },

    /**
     * Test notification (development only)
     */
    sendTest: async (type: NotificationType): Promise<Notification> => {
        return api.post<Notification>('/api/notifications/test', { type });
    },
};
