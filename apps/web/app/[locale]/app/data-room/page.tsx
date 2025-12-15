import { Button, cn } from "@sgif/ui";
import { FileText, Download, Upload, Lock, Database, Shield, Search, FolderOpen, Eye } from "lucide-react";
import { Link } from "@/navigation";

const DOCUMENTS = [
    { id: "1", name: "SGIF_Q3_Report.pdf", size: "2.4 MB", uploaded: "2 days ago", type: "Financial", sensitivity: "High" },
    { id: "2", name: "Al_Dhafra_Technical_Spec.pdf", size: "14 MB", uploaded: "1 week ago", type: "Technical", sensitivity: "Medium" },
    { id: "3", name: "Project_Alpha_MOU.docx", size: "500 KB", uploaded: "2 weeks ago", type: "Legal", sensitivity: "Confidential" },
    { id: "4", name: "Carbon_Audit_2024.pdf", size: "3.1 MB", uploaded: "1 month ago", type: "ESG", sensitivity: "Medium" },
];

export default function DataRoomPage() {
    return (
        <div className="flex flex-col gap-6 relative">
            {/* Background effects */}
            <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-1/4 right-1/3 w-72 h-72 bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-cyber-cyan/80 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20">
                            <Database className="h-8 w-8 text-cyber-cyan" />
                        </div>
                        Virtual Data Room
                    </h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-sgif-emerald" />
                        Quantum-encrypted document management
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/app/data-room/upload">
                        <Button className="bg-gradient-to-r from-cyber-cyan to-blue-500 hover:from-cyber-cyan/90 hover:to-blue-500/90 text-white shadow-lg shadow-cyber-cyan/25 border border-cyber-cyan/30 transition-all duration-300 hover:shadow-cyber-cyan/40 hover:scale-105 group">
                            <Upload className="mr-2 h-4 w-4 group-hover:animate-pulse" /> Upload Document
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Search Bar */}
            <div className="glass-card p-4 flex items-center gap-4">
                <Search className="h-5 w-5 text-gray-400" />
                <input 
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500"
                    placeholder="Search documents by name, type, or content..."
                />
                <div className="flex items-center gap-2">
                    {["All", "Financial", "Technical", "Legal", "ESG"].map((filter, i) => (
                        <button
                            key={filter}
                            className={`px-3 py-1 text-xs rounded-lg transition-all ${
                                i === 0
                                    ? "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30"
                                    : "text-gray-500 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { icon: FolderOpen, label: "Total Files", value: "247", color: "cyber-cyan" },
                    { icon: Shield, label: "Encrypted", value: "100%", color: "sgif-emerald" },
                    { icon: Eye, label: "Active Views", value: "12", color: "sgif-gold" },
                    { icon: Lock, label: "Confidential", value: "34", color: "purple-400" },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-4 flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-${stat.color}/10 border border-${stat.color}/20`}>
                            <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                            <p className="text-lg font-bold text-white font-mono">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Documents Table */}
            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-cyber-cyan to-blue-400 rounded-full" />
                        Recent Files
                    </h3>
                    <span className="text-xs text-gray-500 font-mono">4 documents</span>
                </div>
                <div className="divide-y divide-white/5">
                    {DOCUMENTS.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-all duration-300 group">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyber-cyan/20 to-blue-500/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan group-hover:shadow-lg group-hover:shadow-cyber-cyan/20 transition-all">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-medium text-white flex items-center gap-2 group-hover:text-cyber-cyan transition-colors">
                                        {doc.name}
                                        {doc.sensitivity === "Confidential" && (
                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-sgif-gold/10 border border-sgif-gold/20">
                                                <Lock className="h-3 w-3 text-sgif-gold" />
                                                <span className="text-xs text-sgif-gold">Confidential</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500 flex gap-2 font-mono">
                                        <span>{doc.size}</span>
                                        <span className="text-gray-700">•</span>
                                        <span>{doc.uploaded}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={cn(
                                    "text-xs px-3 py-1 rounded-full border font-medium",
                                    doc.type === "Financial" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                    doc.type === "Technical" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                                    doc.type === "Legal" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                                    "bg-sgif-emerald/10 text-sgif-emerald border-sgif-emerald/20"
                                )}>
                                    {doc.type}
                                </span>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyber-cyan/10 hover:text-cyber-cyan">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
