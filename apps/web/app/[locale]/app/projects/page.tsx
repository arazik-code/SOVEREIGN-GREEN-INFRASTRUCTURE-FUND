"use client";

import { Button } from "@sgif/ui";
import { Plus, Briefcase, Zap, ArrowRight, MapPin, TrendingUp, Layers } from "lucide-react";
import { Link } from "@/navigation";
import { useProjects } from "@/hooks/use-data";
import { ProjectFilters } from "@/components/projects/project-filters";
import { useState, useMemo } from "react";

export default function ProjectsListPage() {
    const { data: projects, isLoading } = useProjects();
    const [filters, setFilters] = useState({ query: "", type: "All", stage: "All" });

    const filteredProjects = useMemo(() => {
        if (!projects) return [];
        return projects.filter(p => {
            const matchesQuery = p.name.toLowerCase().includes(filters.query.toLowerCase()) ||
                p.location.toLowerCase().includes(filters.query.toLowerCase());
            const matchesType = filters.type === "All" || p.type === filters.type;
            const matchesStage = filters.stage === "All" || p.stage === filters.stage;
            return matchesQuery && matchesType && matchesStage;
        });
    }, [projects, filters]);

    const stageColors: Record<string, string> = {
        'Active': 'bg-sgif-emerald/10 text-sgif-emerald border-sgif-emerald/30',
        'Due Diligence': 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30',
        'Pipeline': 'bg-sgif-gold/10 text-sgif-gold border-sgif-gold/30',
        'Closed': 'bg-gray-500/10 text-gray-400 border-gray-500/30',
    };

    return (
        <div className="flex flex-col gap-6 relative">
            {/* Background effects */}
            <div className="fixed top-20 right-20 w-80 h-80 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20">
                            <Briefcase className="h-8 w-8 text-cyber-cyan" />
                        </div>
                        Project Registry
                    </h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        {projects?.length || 0} infrastructure assets tracked
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" asChild className="border-white/10 hover:border-cyber-cyan/30">
                        <Link href="/app/projects/pipeline">
                            <Zap className="mr-2 h-4 w-4" /> Pipeline View
                        </Link>
                    </Button>
                    <Button asChild className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold shadow-neon-cyan">
                        <Link href="/app/projects/new">
                            <Plus className="mr-2 h-4 w-4" /> New Project
                        </Link>
                    </Button>
                </div>
            </div>

            <ProjectFilters onFilterChange={setFilters} />

            <div className="glass-card relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyber-cyan via-transparent to-sgif-gold" />
                
                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center gap-3 text-gray-400">
                            <div className="w-5 h-5 border-2 border-cyber-cyan/30 border-t-cyber-cyan rounded-full animate-spin" />
                            Loading project data...
                        </div>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No projects found matching your filters.</div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/[0.02] text-gray-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="p-4 font-medium">Project</th>
                                <th className="p-4 font-medium">Location</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Budget</th>
                                <th className="p-4 font-medium">IRR</th>
                                <th className="p-4 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((project, i) => (
                                <tr 
                                    key={project.id} 
                                    className="border-t border-white/5 hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-cyan/10 to-sgif-gold/10 border border-white/10 flex items-center justify-center">
                                                <Briefcase className="w-4 h-4 text-cyber-cyan" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-white group-hover:text-cyber-cyan transition-colors">{project.name}</div>
                                                {project.type && <div className="text-xs text-gray-500">{project.type}</div>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <MapPin className="w-3 h-3" />
                                            {project.location}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${stageColors[project.stage] || stageColors['Pipeline']}`}>
                                            {project.stage}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-white">{project.budget}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1 text-sgif-gold font-mono">
                                            <TrendingUp className="w-3 h-3" />
                                            {project.irr}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-cyber-cyan group-hover:bg-cyber-cyan/10">
                                            <Link href={`/app/projects/${project.id}`}>
                                                View <ArrowRight className="ml-1 w-3 h-3" />
                                            </Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
