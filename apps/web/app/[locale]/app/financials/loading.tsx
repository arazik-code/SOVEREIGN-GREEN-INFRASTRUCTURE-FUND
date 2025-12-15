"use client";

import { SkeletonCard, SkeletonChart, Skeleton } from "@/components/ui/skeleton";

export default function FinancialsLoading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-28 rounded-lg" />
                    <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
                <SkeletonChart />
                <SkeletonChart />
            </div>

            {/* Bottom section */}
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <SkeletonChart />
                </div>
                <div className="space-y-4">
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
        </div>
    );
}
