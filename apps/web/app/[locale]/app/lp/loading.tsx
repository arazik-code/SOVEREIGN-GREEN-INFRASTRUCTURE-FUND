"use client";

import { SkeletonCard, SkeletonChart, Skeleton } from "@/components/ui/skeleton";

export default function LPLoading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-52" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-36 rounded-lg" />
                    <Skeleton className="h-10 w-28 rounded-lg" />
                </div>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-4 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
                <SkeletonChart />
                <SkeletonChart />
            </div>

            {/* Distributions and documents */}
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 glass-card p-6 space-y-4">
                    <Skeleton className="h-5 w-40" />
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-8 w-8 rounded" />
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                            <Skeleton className="h-5 w-24" />
                        </div>
                    ))}
                </div>
                <div className="glass-card p-6 space-y-4">
                    <Skeleton className="h-5 w-32" />
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 py-2">
                            <Skeleton className="h-8 w-8 rounded" />
                            <div className="flex-1 space-y-1">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-2 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
