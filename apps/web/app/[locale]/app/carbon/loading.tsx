"use client";

import { SkeletonCard, SkeletonChart, Skeleton } from "@/components/ui/skeleton";

export default function CarbonLoading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-56" />
                    <Skeleton className="h-4 w-80" />
                </div>
                <Skeleton className="h-10 w-36 rounded-lg" />
            </div>

            {/* Carbon metrics */}
            <div className="grid grid-cols-4 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>

            {/* Main chart */}
            <SkeletonChart className="h-80" />

            {/* Bottom grid */}
            <div className="grid grid-cols-3 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    );
}
