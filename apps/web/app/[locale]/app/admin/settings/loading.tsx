"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AdminSettingsLoading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-44" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <Skeleton className="h-10 w-32 rounded-lg" />
            </div>

            {/* Settings sections */}
            <div className="grid grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="glass-card p-4 space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full rounded-lg" />
                    ))}
                </div>

                {/* Content */}
                <div className="col-span-3 space-y-6">
                    {/* Section 1 */}
                    <div className="glass-card p-6 space-y-4">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-full max-w-xl" />
                        
                        <div className="space-y-4 pt-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5">
                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-3 w-64" />
                                    </div>
                                    <Skeleton className="h-8 w-16 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="glass-card p-6 space-y-4">
                        <Skeleton className="h-6 w-48" />
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full rounded-lg" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
