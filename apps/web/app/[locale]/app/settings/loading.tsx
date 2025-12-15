"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>

            {/* Settings layout */}
            <div className="grid grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="glass-card p-4 space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full rounded-lg" />
                    ))}
                </div>

                {/* Content */}
                <div className="col-span-3 space-y-6">
                    {/* Profile section */}
                    <div className="glass-card p-6 space-y-6">
                        <div className="flex items-center gap-6">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-8 w-28 rounded-lg mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Form fields */}
                    <div className="glass-card p-6 space-y-6">
                        <Skeleton className="h-6 w-40" />
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full rounded-lg" />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <Skeleton className="h-10 w-24 rounded-lg" />
                            <Skeleton className="h-10 w-32 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
