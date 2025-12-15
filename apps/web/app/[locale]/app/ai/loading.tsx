"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AILoading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
            </div>

            {/* Insight cards */}
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="glass-card p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5 rounded" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-3 w-full" />
                    </div>
                ))}
            </div>

            {/* Context prompts */}
            <div className="flex gap-3 overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-48 rounded-full flex-shrink-0" />
                ))}
            </div>

            {/* Main chat area */}
            <div className="glass-card p-6 space-y-4" style={{ height: "calc(100vh - 420px)" }}>
                {/* Messages */}
                <div className="space-y-4 flex-1">
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-20 w-3/4 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <div className="flex-1 space-y-2 flex flex-col items-end">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-12 w-1/2 rounded-lg" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                    </div>
                </div>

                {/* Input */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Skeleton className="h-12 flex-1 rounded-xl" />
                    <Skeleton className="h-12 w-12 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
