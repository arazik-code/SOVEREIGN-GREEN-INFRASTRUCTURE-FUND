"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button, cn } from "@sgif/ui";
import { MoreHorizontal, Sun, Wind, Droplets, DollarSign } from "lucide-react";

interface BoardTicketProps {
    id: string;
    title: string;
    value: string;
    type: string;
}

const TYPE_CONFIG: Record<string, { icon: typeof Sun; color: string; bgColor: string }> = {
    Solar: { icon: Sun, color: "text-sgif-gold", bgColor: "bg-sgif-gold/10 border-sgif-gold/20" },
    Wind: { icon: Wind, color: "text-cyber-cyan", bgColor: "bg-cyber-cyan/10 border-cyber-cyan/20" },
    Hydrogen: { icon: Droplets, color: "text-sgif-emerald", bgColor: "bg-sgif-emerald/10 border-sgif-emerald/20" },
};

export function BoardTicket({ id, title, value, type }: BoardTicketProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
    });

    const style = transform ? {
        transform: CSS.Translate.toString(transform),
    } : undefined;

    const config = TYPE_CONFIG[type] || TYPE_CONFIG.Solar;
    const Icon = config.icon;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={cn(
                "glass-card p-4 cursor-grab active:cursor-grabbing transition-all duration-300 group",
                "hover:border-sgif-gold/40 hover:shadow-lg hover:shadow-sgif-gold/10",
                isDragging && "opacity-50 scale-105 shadow-xl shadow-sgif-gold/20 border-sgif-gold/50"
            )}
        >
            <div className="flex justify-between items-start mb-3">
                <span className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-lg border flex items-center gap-1.5",
                    config.bgColor,
                    config.color
                )}>
                    <Icon className="h-3 w-3" />
                    {type}
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded-lg transition-all">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </Button>
            </div>
            <h4 className="font-semibold text-white mb-2 group-hover:text-sgif-gold transition-colors">{title}</h4>
            <div className="flex items-center gap-1 text-sm text-gray-400">
                <DollarSign className="h-3.5 w-3.5" />
                <span className="font-mono">{value}</span>
            </div>
        </div>
    );
}
