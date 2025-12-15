"use client";

import { SkeletonCard, SkeletonChart, Skeleton } from "@/components/ui/skeleton";

export default function ReportsLoading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-44" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-32 rounded-lg" />
                    <Skeleton className="h-10 w-36 rounded-lg" />
                </div>
            </div>

            {/* Report type tabs */}
            <div className="flex gap-4">
                <Skeleton className="h-10 w-36 rounded-lg" />
                <Skeleton className="h-10 w-36 rounded-lg" />
                <Skeleton className="h-10 w-36 rounded-lg" />
                <Skeleton className="h-10 w-36 rounded-lg" />
            </div>

            {/* Report builder */}
            <div className="grid grid-cols-4 gap-4">
                {/* Sidebar */}
                <div className="glass-card p-4 space-y-4">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-8 w-full rounded" />
                    <Skeleton className="h-8 w-full rounded" />
                    <Skeleton className="h-8 w-full rounded" />
                    <Skeleton className="h-8 w-full rounded" />
                    <Skeleton className="h-8 w-full rounded" />
                </div>

                {/* Preview area */}
                <div className="col-span-3 space-y-4">
                    <SkeletonChart />
                    <div className="grid grid-cols-2 gap-4">
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
