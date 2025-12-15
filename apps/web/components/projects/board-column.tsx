"use client";

import { useDroppable } from "@dnd-kit/core";
import { cn } from "@sgif/ui";

interface BoardColumnProps {
    id: string;
    title: string;
    count: number;
    color: string;
    children: React.ReactNode;
}

export function BoardColumn({ id, title, count, color, children }: BoardColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    });

    return (
        <div 
            ref={setNodeRef} 
            className={cn(
                "min-w-[300px] flex flex-col rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-4 h-full transition-all duration-300",
                isOver && "border-sgif-gold/50 bg-sgif-gold/5 shadow-lg shadow-sgif-gold/10"
            )}
        >
            <div className={cn("flex items-center justify-between mb-4 pl-3 rounded-lg py-2", color)}>
                <h3 className="font-semibold text-sm uppercase text-gray-400 tracking-wider">{title}</h3>
                <span className="text-xs font-mono bg-white/5 px-3 py-1 rounded-full text-gray-300 border border-white/10">
                    {count}
                </span>
            </div>
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {children}
            </div>
        </div>
    );
}
