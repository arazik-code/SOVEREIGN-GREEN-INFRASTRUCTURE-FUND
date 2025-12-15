/**
 * Notifications Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService, type NotificationFilters, type NotificationPreferences } from "@sgif/lib";

// Query keys factory
export const notificationKeys = {
    all: ['notifications'] as const,
    lists: () => [...notificationKeys.all, 'list'] as const,
    list: (params?: NotificationFilters) => [...notificationKeys.lists(), params] as const,
    unreadCount: () => [...notificationKeys.all, 'unread-count'] as const,
    preferences: () => [...notificationKeys.all, 'preferences'] as const,
    pushSubscription: () => [...notificationKeys.all, 'push-subscription'] as const,
};

/**
 * Hook to fetch notifications
 */
export function useNotifications(params?: NotificationFilters) {
    return useQuery({
        queryKey: notificationKeys.list(params),
        queryFn: () => notificationsService.getNotifications(params),
    });
}

/**
 * Hook to fetch unread notification count
 */
export function useUnreadCount() {
    return useQuery({
        queryKey: notificationKeys.unreadCount(),
        queryFn: () => notificationsService.getUnreadCount(),
        refetchInterval: 30000, // Poll every 30 seconds
    });
}

/**
 * Hook to fetch notification preferences
 */
export function useNotificationPreferences() {
    return useQuery({
        queryKey: notificationKeys.preferences(),
        queryFn: () => notificationsService.getPreferences(),
    });
}

/**
 * Hook to mark notification as read
 */
export function useMarkAsRead() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => notificationsService.markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
            queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
        },
        // Optimistic update
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: notificationKeys.lists() });
            
            const previousData = queryClient.getQueriesData({ queryKey: notificationKeys.lists() });
            
            // Update the notification in all cached lists
            queryClient.setQueriesData(
                { queryKey: notificationKeys.lists() },
                (old: unknown) => {
                    if (!old || typeof old !== 'object') return old;
                    if ('notifications' in old && Array.isArray(old.notifications)) {
                        return {
                            ...old,
                            notifications: old.notifications.map((n: { id: string; isRead?: boolean }) =>
                                n.id === id ? { ...n, isRead: true } : n
                            ),
                        };
                    }
                    return old;
                }
            );
            
            return { previousData };
        },
        onError: (_, __, context) => {
            if (context?.previousData) {
                context.previousData.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },
    });
}

/**
 * Hook to mark multiple notifications as read
 */
export function useMarkManyAsRead() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (ids: string[]) => notificationsService.markManyAsRead(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
            queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
        },
    });
}

/**
 * Hook to mark all notifications as read
 */
export function useMarkAllAsRead() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: () => notificationsService.markAllAsRead(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
            queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
        },
    });
}

/**
 * Hook to delete a notification
 */
export function useDeleteNotification() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => notificationsService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
            queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
        },
    });
}

/**
 * Hook to delete multiple notifications
 */
export function useDeleteManyNotifications() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (ids: string[]) => notificationsService.deleteMany(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
            queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
        },
    });
}

/**
 * Hook to clear all notifications
 */
export function useClearAllNotifications() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: () => notificationsService.clearAll(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
            queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
        },
    });
}

/**
 * Hook to update notification preferences
 */
export function useUpdatePreferences() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (preferences: Partial<NotificationPreferences>) => 
            notificationsService.updatePreferences(preferences),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.preferences() });
        },
    });
}

/**
 * Hook to subscribe to push notifications
 */
export function useSubscribeToPush() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (subscription: PushSubscription) => 
            notificationsService.subscribeToPush(subscription),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.pushSubscription() });
        },
    });
}

/**
 * Hook to unsubscribe from push notifications
 */
export function useUnsubscribeFromPush() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: () => notificationsService.unsubscribeFromPush(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.pushSubscription() });
        },
    });
}
