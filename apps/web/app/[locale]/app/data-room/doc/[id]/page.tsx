"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { cn } from "@sgif/ui";
import { Button } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ZoomIn,
    ZoomOut,
    RotateCw,
    Download,
    Share2,
    Printer,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Search,
    FileText,
    Lock,
    Eye,
    Clock,
    User,
    MessageSquare,
    Bookmark,
    MoreVertical,
    CheckCircle2,
    AlertTriangle,
    Shield
} from "lucide-react";
import { Link } from "@/navigation";

interface DocumentMeta {
    id: string;
    name: string;
    type: string;
    size: string;
    pages: number;
    uploadedBy: string;
    uploadedAt: string;
    lastViewed: string;
    classification: "public" | "confidential" | "restricted";
    version: string;
    status: "approved" | "pending" | "draft";
}

const documentMeta: DocumentMeta = {
    id: "doc-001",
    name: "Q3 2024 LP Quarterly Report",
    type: "PDF",
    size: "4.2 MB",
    pages: 42,
    uploadedBy: "Sarah Chen",
    uploadedAt: "Oct 15, 2024",
    lastViewed: "Dec 10, 2024",
    classification: "confidential",
    version: "v2.1",
    status: "approved",
};

interface AuditEntry {
    id: string;
    action: string;
    user: string;
    timestamp: string;
}

const auditLog: AuditEntry[] = [
    { id: "1", action: "Viewed document", user: "You", timestamp: "Just now" },
    { id: "2", action: "Downloaded", user: "James Williams", timestamp: "Dec 8, 2024" },
    { id: "3", action: "Approved", user: "Dr. Ahmed Hassan", timestamp: "Oct 15, 2024" },
    { id: "4", action: "Uploaded", user: "Sarah Chen", timestamp: "Oct 14, 2024" },
];

const classificationConfig = {
    public: { color: "sgif-emerald", label: "Public" },
    confidential: { color: "sgif-gold", label: "Confidential" },
    restricted: { color: "red-500", label: "Restricted" },
};

export default function DocumentViewerPage() {
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [zoom, setZoom] = useState(100);
    const [showSidebar, setShowSidebar] = useState(true);
    const [activeTab, setActiveTab] = useState<"info" | "audit" | "comments">("info");
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, documentMeta.pages));

    const classConfig = classificationConfig[documentMeta.classification];

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/app/data-room"
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-400" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                            <FileText className="h-5 w-5 text-cyber-cyan" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-semibold text-white">{documentMeta.name}</h1>
                                <span className={cn(
                                    "text-xs px-2 py-0.5 rounded-full border flex items-center gap-1",
                                    `bg-${classConfig.color}/10 text-${classConfig.color} border-${classConfig.color}/20`
                                )}>
                                    <Lock className="h-3 w-3" />
                                    {classConfig.label}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">
                                {documentMeta.type} • {documentMeta.size} • {documentMeta.pages} pages
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <Printer className="h-4 w-4" />
                        Print
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Document Viewer */}
                <div className="flex-1 flex flex-col">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-black/10">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleZoomOut}
                                className="p-1.5 rounded hover:bg-white/5 transition-colors"
                                disabled={zoom <= 50}
                            >
                                <ZoomOut className="h-4 w-4 text-gray-400" />
                            </button>
                            <span className="text-sm text-gray-400 w-12 text-center">{zoom}%</span>
                            <button
                                onClick={handleZoomIn}
                                className="p-1.5 rounded hover:bg-white/5 transition-colors"
                                disabled={zoom >= 200}
                            >
                                <ZoomIn className="h-4 w-4 text-gray-400" />
                            </button>
                            <div className="w-px h-5 bg-white/10 mx-2" />
                            <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
                                <RotateCw className="h-4 w-4 text-gray-400" />
                            </button>
                            <button 
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="p-1.5 rounded hover:bg-white/5 transition-colors"
                            >
                                <Maximize2 className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage <= 1}
                                className="p-1.5 rounded hover:bg-white/5 transition-colors disabled:opacity-50"
                            >
                                <ChevronLeft className="h-4 w-4 text-gray-400" />
                            </button>
                            <div className="flex items-center gap-1">
                                <input
                                    type="text"
                                    value={currentPage}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (val >= 1 && val <= documentMeta.pages) {
                                            setCurrentPage(val);
                                        }
                                    }}
                                    className="w-10 h-7 text-center text-sm bg-white/5 border border-white/10 rounded text-white focus:outline-none focus:border-cyber-cyan/50"
                                />
                                <span className="text-sm text-gray-500">of {documentMeta.pages}</span>
                            </div>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage >= documentMeta.pages}
                                className="p-1.5 rounded hover:bg-white/5 transition-colors disabled:opacity-50"
                            >
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search in document..."
                                    className="h-8 pl-8 pr-3 w-48 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50"
                                />
                            </div>
                            <button 
                                onClick={() => setShowSidebar(!showSidebar)}
                                className={cn(
                                    "p-1.5 rounded transition-colors",
                                    showSidebar ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400"
                                )}
                            >
                                <MessageSquare className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Document Preview */}
                    <div className="flex-1 overflow-auto bg-black/20 p-8">
                        <div 
                            className="mx-auto bg-white shadow-2xl"
                            style={{ 
                                width: `${8.5 * zoom * 0.72}px`,
                                minHeight: `${11 * zoom * 0.72}px`,
                                transform: `scale(${zoom / 100})`,
                                transformOrigin: "top center"
                            }}
                        >
                            {/* Simulated PDF Content */}
                            <div className="p-12 space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">SG</span>
                                        </div>
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-900">SGIF</h1>
                                            <p className="text-sm text-gray-500">Sovereign Green Infrastructure Fund</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">Q3 2024</p>
                                        <p className="text-sm text-gray-500">Quarterly LP Report</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        The third quarter of 2024 marked a significant milestone for SGIF, with the 
                                        successful deployment of capital into three new sustainable infrastructure 
                                        projects across the GCC region. Total NAV increased by 8.2% quarter-over-quarter, 
                                        driven by strong operational performance across our portfolio.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Key highlights include the completion of Phase I construction at NEOM Solar, 
                                        which is now generating electricity at full capacity, and the signing of a 
                                        landmark PPA for the Dubai Green Hydrogen facility.
                                    </p>
                                </div>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-3 gap-4 py-6">
                                    <div className="p-4 bg-emerald-50 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">NAV</p>
                                        <p className="text-2xl font-bold text-emerald-600">$127.4M</p>
                                    </div>
                                    <div className="p-4 bg-cyan-50 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">Net IRR</p>
                                        <p className="text-2xl font-bold text-cyan-600">14.2%</p>
                                    </div>
                                    <div className="p-4 bg-amber-50 rounded-lg">
                                        <p className="text-sm text-gray-500 mb-1">TVPI</p>
                                        <p className="text-2xl font-bold text-amber-600">1.32x</p>
                                    </div>
                                </div>

                                {/* Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                                    <span className="text-8xl font-bold text-gray-900 rotate-[-30deg]">CONFIDENTIAL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                {showSidebar && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 320, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="border-l border-white/10 bg-black/20 overflow-hidden"
                    >
                        <div className="w-80">
                            {/* Tabs */}
                            <div className="flex border-b border-white/10">
                                {[
                                    { id: "info", label: "Info", icon: FileText },
                                    { id: "audit", label: "Audit", icon: Shield },
                                    { id: "comments", label: "Comments", icon: MessageSquare },
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2",
                                            activeTab === tab.id
                                                ? "text-white border-cyber-cyan"
                                                : "text-gray-500 border-transparent hover:text-gray-300"
                                        )}
                                    >
                                        <tab.icon className="h-4 w-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="p-4 overflow-y-auto h-[calc(100vh-16rem)]">
                                {activeTab === "info" && (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Document Details</p>
                                            <div className="space-y-3">
                                                {[
                                                    { label: "Uploaded by", value: documentMeta.uploadedBy, icon: User },
                                                    { label: "Upload date", value: documentMeta.uploadedAt, icon: Clock },
                                                    { label: "Last viewed", value: documentMeta.lastViewed, icon: Eye },
                                                    { label: "Version", value: documentMeta.version, icon: FileText },
                                                ].map(item => (
                                                    <div key={item.label} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-gray-400">
                                                            <item.icon className="h-4 w-4" />
                                                            <span className="text-sm">{item.label}</span>
                                                        </div>
                                                        <span className="text-sm text-white">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/10">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Status</p>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-sgif-emerald" />
                                                <span className="text-sm text-sgif-emerald">Approved</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/10">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Permissions</p>
                                            <div className="space-y-2">
                                                {["View", "Download", "Print", "Share"].map(perm => (
                                                    <div key={perm} className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-3 w-3 text-sgif-emerald" />
                                                        <span className="text-sm text-gray-300">{perm}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "audit" && (
                                    <div className="space-y-3">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Activity Log</p>
                                        {auditLog.map((entry, i) => (
                                            <div 
                                                key={entry.id}
                                                className="p-3 rounded-lg bg-white/[0.02] border border-white/5"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="text-sm text-white">{entry.action}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{entry.user}</p>
                                                    </div>
                                                    <span className="text-xs text-gray-600">{entry.timestamp}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === "comments" && (
                                    <div className="space-y-4">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Comments</p>
                                        <div className="text-center py-8">
                                            <MessageSquare className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">No comments yet</p>
                                            <p className="text-xs text-gray-600 mt-1">Be the first to add a comment</p>
                                        </div>
                                        <textarea
                                            placeholder="Add a comment..."
                                            rows={3}
                                            className="w-full p-3 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50 resize-none"
                                        />
                                        <Button size="sm" className="w-full bg-cyber-cyan/20 text-cyber-cyan hover:bg-cyber-cyan/30">
                                            Add Comment
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
