import { Button } from "@sgif/ui";
import { PipelineBoard } from "@/components/projects/pipeline-board";
import { Link } from "@/navigation";
import { Plus, List, Kanban, Filter, Zap } from "lucide-react";

export default function PipelinePage() {
    return (
        <div className="flex flex-col h-full gap-6 relative">
            {/* Background effects */}
            <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-1/3 left-1/4 w-72 h-72 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-gold/80 to-orange-400 bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sgif-gold/10 border border-sgif-gold/20">
                            <Kanban className="h-8 w-8 text-sgif-gold" />
                        </div>
                        Project Pipeline
                    </h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-sgif-gold" />
                        Drag and drop deals through investment stages
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-white/10 hover:border-white/20 transition-all">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Link href="/app/projects">
                        <Button variant="outline" className="border-white/10 hover:border-cyber-cyan/30 hover:bg-cyber-cyan/10 hover:text-cyber-cyan transition-all">
                            <List className="mr-2 h-4 w-4" /> List View
                        </Button>
                    </Link>
                    <Button className="bg-gradient-to-r from-sgif-gold to-orange-500 hover:from-sgif-gold/90 hover:to-orange-500/90 text-black font-semibold shadow-lg shadow-sgif-gold/25 border border-sgif-gold/30 transition-all duration-300 group">
                        <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" /> New Deal
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <PipelineBoard />
            </div>
        </div>
    );
}
