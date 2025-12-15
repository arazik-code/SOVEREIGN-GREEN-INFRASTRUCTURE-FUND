"use client";

import { Button } from "@sgif/ui";
import { Search, Filter, X } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectFiltersProps {
    onFilterChange: (filters: { query: string; type: string; stage: string }) => void;
}

export function ProjectFilters({ onFilterChange }: ProjectFiltersProps) {
    const [query, setQuery] = useState("");
    const [type, setType] = useState("All");
    const [stage, setStage] = useState("All");

    // Debounce query
    useEffect(() => {
        const timeout = setTimeout(() => {
            onFilterChange({ query, type, stage });
        }, 300);
        return () => clearTimeout(timeout);
    }, [query, type, stage, onFilterChange]);

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-card p-4 rounded-lg border">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    className="w-full bg-background border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sgif-gold"
                    placeholder="Search projects..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className="flex gap-2">
                <select
                    className="h-9 rounded-md border text-sm px-3 bg-background focus:outline-none focus:ring-1 focus:ring-sgif-gold"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="All">All Types</option>
                    <option value="Solar">Solar</option>
                    <option value="Wind">Wind</option>
                    <option value="Hydrogen">Hydrogen</option>
                    <option value="Nuclear">Nuclear</option>
                </select>
                <select
                    className="h-9 rounded-md border text-sm px-3 bg-background focus:outline-none focus:ring-1 focus:ring-sgif-gold"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                >
                    <option value="All">All Stages</option>
                    <option value="Sourcing">Sourcing</option>
                    <option value="Development">Development</option>
                    <option value="Construction">Construction</option>
                    <option value="Operational">Operational</option>
                </select>
                {(query || type !== "All" || stage !== "All") && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setQuery("");
                            setType("All");
                            setStage("All");
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
