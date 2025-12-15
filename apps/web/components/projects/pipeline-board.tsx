"use client";

import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { BoardColumn } from "./board-column";
import { BoardTicket } from "./board-ticket";
import { Button } from "@sgif/ui";
import { Plus } from "lucide-react";

type Ticket = {
    id: string;
    title: string;
    value: string;
    type: string;
    status: string;
};

const INITIAL_TICKETS: Ticket[] = [
    { id: "1", title: "Egypt Wind Farm", value: "$300M", type: "Wind", status: "sourcing" },
    { id: "2", title: "Jordan Solar Fields", value: "$150M", type: "Solar", status: "sourcing" },
    { id: "3", title: "Oman Green Ammonia", value: "$3.5B", type: "Hydrogen", status: "dd" },
    { id: "4", title: "Saudi Neom Desal", value: "$1.2B", type: "Solar", status: "ic" },
    { id: "5", title: "Al Dhafra PV", value: "$1.2B", type: "Solar", status: "construction" },
    { id: "6", title: "Noor Energy 1", value: "$4.1B", type: "Solar", status: "operational" },
];

const COLUMNS = [
    { id: "sourcing", title: "Sourcing", color: "border-l-4 border-gray-500" },
    { id: "dd", title: "Due Diligence", color: "border-l-4 border-sgif-gold" },
    { id: "ic", title: "Investment Comm.", color: "border-l-4 border-cyber-cyan" },
    { id: "construction", title: "Construction", color: "border-l-4 border-purple-500" },
    { id: "operational", title: "Operational", color: "border-l-4 border-sgif-emerald" },
];

export function PipelineBoard() {
    const [tickets, setTickets] = useState(INITIAL_TICKETS);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const newStatus = over.id as string;

            setTickets((items) =>
                items.map(item =>
                    item.id === active.id ? { ...item, status: newStatus } : item
                )
            );
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex h-full gap-4 overflow-x-auto pb-4">
                {COLUMNS.map((col) => {
                    const colTickets = tickets.filter(t => t.status === col.id);

                    return (
                        <BoardColumn
                            key={col.id}
                            id={col.id}
                            title={col.title}
                            count={colTickets.length}
                            color={col.color}
                        >
                            {colTickets.map(ticket => (
                                <BoardTicket
                                    key={ticket.id}
                                    id={ticket.id}
                                    title={ticket.title}
                                    value={ticket.value}
                                    type={ticket.type}
                                />
                            ))}
                            <Button 
                                variant="ghost" 
                                className="w-full mt-2 border border-dashed border-white/10 text-gray-500 hover:text-white hover:border-sgif-gold/30 hover:bg-sgif-gold/5 rounded-xl transition-all group"
                            >
                                <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" /> Add Deal
                            </Button>
                        </BoardColumn>
                    );
                })}
            </div>
        </DndContext>
    );
}
