"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function MapsLoading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-28 rounded-lg" />
                    <Skeleton className="h-10 w-28 rounded-lg" />
                </div>
            </div>

            {/* Map container */}
            <div className="grid grid-cols-4 gap-4">
                {/* Sidebar */}
                <div className="glass-card p-4 space-y-4 max-h-[calc(100vh-220px)] overflow-hidden">
                    <Skeleton className="h-10 w-full rounded-lg" />
                    
                    {/* Project list */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="p-3 border border-white/5 rounded-lg space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-3 w-3 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-3 w-24" />
                        </div>
                    ))}
                </div>

                {/* Map area */}
                <div className="col-span-3 glass-card p-0 overflow-hidden" style={{ height: "calc(100vh - 220px)" }}>
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sgif-dark-900 to-sgif-dark-950">
                        <div className="text-center">
                            <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                            <Skeleton className="h-4 w-32 mx-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
