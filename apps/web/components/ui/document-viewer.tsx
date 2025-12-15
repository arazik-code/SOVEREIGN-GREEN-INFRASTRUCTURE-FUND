"use client";

import * as React from "react";
import { Button, cn } from "@sgif/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ZoomIn,
    ZoomOut,
    Download,
    Printer,
    ChevronLeft,
    ChevronRight,
    Search,
    Maximize2,
    RotateCw,
    FileText,
    Lock,
    Eye,
    Share2,
    Bookmark,
    MoreVertical,
    Shield,
    Clock
} from "lucide-react";

export type DocumentPermission = 'view' | 'download' | 'print' | 'share';

export interface DocumentMeta {
    id: string;
    name: string;
    type: string;
    size: string;
    pages: number;
    uploadedBy: string;
    uploadedAt: Date;
    lastViewedAt?: Date;
    permissions: DocumentPermission[];
    classification: 'public' | 'internal' | 'confidential' | 'restricted';
    watermark?: string;
}

interface DocumentViewerProps {
    document: DocumentMeta;
    pdfUrl: string;
    onClose: () => void;
    onDownload?: () => void;
    className?: string;
}

const classificationColors = {
    public: 'text-sgif-emerald bg-sgif-emerald/10 border-sgif-emerald/30',
    internal: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    confidential: 'text-sgif-gold bg-sgif-gold/10 border-sgif-gold/30',
    restricted: 'text-red-400 bg-red-400/10 border-red-400/30',
};

export function DocumentViewer({
    document: doc,
    pdfUrl,
    onClose,
    onDownload,
    className,
}: DocumentViewerProps) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [zoom, setZoom] = React.useState(100);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [rotation, setRotation] = React.useState(0);
    const [showSearch, setShowSearch] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [showInfo, setShowInfo] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const canDownload = doc.permissions.includes('download');
    const canPrint = doc.permissions.includes('print');
    const canShare = doc.permissions.includes('share');

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
    const handleRotate = () => setRotation(prev => (prev + 90) % 360);

    const handleFullscreen = async () => {
        if (!containerRef.current) return;
        
        if (!isFullscreen) {
            await containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await window.document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, doc.pages));

    const handleDownload = () => {
        if (!canDownload) return;
        onDownload?.();
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef}
            className={cn(
                "fixed inset-0 z-50 flex flex-col bg-black/95",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/60 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                            <FileText className="h-5 w-5 text-cyber-cyan" />
                        </div>
                        <div>
                            <h2 className="text-white font-medium">{doc.name}</h2>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{doc.type}</span>
                                <span>•</span>
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span className={cn(
                                    "px-1.5 py-0.5 rounded border font-medium capitalize",
                                    classificationColors[doc.classification]
                                )}>
                                    {doc.classification}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <AnimatePresence>
                        {showSearch && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 200, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                            >
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search in document..."
                                    className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className={cn(
                            "p-2 rounded-lg transition-colors",
                            showSearch 
                                ? "bg-cyber-cyan/10 text-cyber-cyan" 
                                : "hover:bg-white/5 text-gray-400 hover:text-white"
                        )}
                    >
                        <Search className="h-5 w-5" />
                    </button>

                    <div className="w-px h-6 bg-white/10 mx-1" />

                    {/* Zoom controls */}
                    <button
                        onClick={handleZoomOut}
                        disabled={zoom <= 50}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <ZoomOut className="h-5 w-5" />
                    </button>
                    <span className="text-sm text-gray-400 font-mono min-w-[4rem] text-center">
                        {zoom}%
                    </span>
                    <button
                        onClick={handleZoomIn}
                        disabled={zoom >= 200}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <ZoomIn className="h-5 w-5" />
                    </button>

                    <div className="w-px h-6 bg-white/10 mx-1" />

                    {/* Page navigation */}
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage <= 1}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="text-sm text-gray-400 font-mono min-w-[5rem] text-center">
                        {currentPage} / {doc.pages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage >= doc.pages}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    <div className="w-px h-6 bg-white/10 mx-1" />

                    {/* Tools */}
                    <button
                        onClick={handleRotate}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <RotateCw className="h-5 w-5" />
                    </button>
                    <button
                        onClick={handleFullscreen}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <Maximize2 className="h-5 w-5" />
                    </button>

                    <div className="w-px h-6 bg-white/10 mx-1" />

                    {/* Actions */}
                    {canPrint && (
                        <button
                            onClick={() => window.print()}
                            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                            title="Print"
                        >
                            <Printer className="h-5 w-5" />
                        </button>
                    )}
                    
                    {canDownload ? (
                        <button
                            onClick={handleDownload}
                            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                            title="Download"
                        >
                            <Download className="h-5 w-5" />
                        </button>
                    ) : (
                        <button
                            className="p-2 rounded-lg text-gray-600 cursor-not-allowed"
                            title="Download restricted"
                        >
                            <Lock className="h-5 w-5" />
                        </button>
                    )}

                    {canShare && (
                        <button
                            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                            title="Share"
                        >
                            <Share2 className="h-5 w-5" />
                        </button>
                    )}

                    <button
                        onClick={() => setShowInfo(!showInfo)}
                        className={cn(
                            "p-2 rounded-lg transition-colors",
                            showInfo 
                                ? "bg-cyber-cyan/10 text-cyber-cyan" 
                                : "hover:bg-white/5 text-gray-400 hover:text-white"
                        )}
                    >
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Document viewer */}
                <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                    <div 
                        className="relative bg-white shadow-2xl"
                        style={{ 
                            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                            transformOrigin: 'center center',
                            transition: 'transform 0.2s ease-out'
                        }}
                    >
                        {/* Simulated PDF page */}
                        <div className="w-[612px] h-[792px] bg-white relative">
                            {/* Placeholder content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-gray-400">
                                    <FileText className="h-24 w-24 mx-auto mb-4 text-gray-300" />
                                    <p className="text-lg">Document Preview</p>
                                    <p className="text-sm mt-2">Page {currentPage} of {doc.pages}</p>
                                </div>
                            </div>

                            {/* Watermark overlay */}
                            {doc.watermark && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span 
                                        className="text-6xl font-bold text-gray-200 rotate-[-30deg] select-none opacity-30"
                                        style={{ 
                                            fontFamily: 'system-ui',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em'
                                        }}
                                    >
                                        {doc.watermark}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info sidebar */}
                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 320, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="border-l border-white/5 bg-black/40 overflow-hidden"
                        >
                            <div className="p-6 space-y-6 w-80">
                                <h3 className="text-lg font-semibold text-white">Document Info</h3>

                                <div className="space-y-4">
                                    <InfoRow label="File Name" value={doc.name} />
                                    <InfoRow label="Type" value={doc.type} />
                                    <InfoRow label="Size" value={doc.size} />
                                    <InfoRow label="Pages" value={doc.pages.toString()} />
                                    <InfoRow label="Uploaded By" value={doc.uploadedBy} />
                                    <InfoRow label="Uploaded At" value={formatDate(doc.uploadedAt)} />
                                    {doc.lastViewedAt && (
                                        <InfoRow label="Last Viewed" value={formatDate(doc.lastViewedAt)} />
                                    )}
                                </div>

                                <div className="border-t border-white/5 pt-4">
                                    <h4 className="text-sm font-medium text-gray-400 mb-3">Access Permissions</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(['view', 'download', 'print', 'share'] as DocumentPermission[]).map(perm => (
                                            <span
                                                key={perm}
                                                className={cn(
                                                    "text-xs px-2 py-1 rounded border capitalize",
                                                    doc.permissions.includes(perm)
                                                        ? "text-sgif-emerald bg-sgif-emerald/10 border-sgif-emerald/30"
                                                        : "text-gray-500 bg-white/5 border-white/10"
                                                )}
                                            >
                                                {doc.permissions.includes(perm) ? (
                                                    <Eye className="h-3 w-3 inline mr-1" />
                                                ) : (
                                                    <Lock className="h-3 w-3 inline mr-1" />
                                                )}
                                                {perm}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-4">
                                    <h4 className="text-sm font-medium text-gray-400 mb-3">Classification</h4>
                                    <div className={cn(
                                        "inline-flex items-center gap-2 px-3 py-2 rounded-lg border",
                                        classificationColors[doc.classification]
                                    )}>
                                        <Shield className="h-4 w-4" />
                                        <span className="text-sm font-medium capitalize">
                                            {doc.classification}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-4">
                                    <h4 className="text-sm font-medium text-gray-400 mb-3">Activity Log</h4>
                                    <div className="space-y-2">
                                        {[
                                            { action: 'Viewed', time: 'Just now', user: 'You' },
                                            { action: 'Downloaded', time: '2 hours ago', user: 'John D.' },
                                            { action: 'Shared', time: '1 day ago', user: 'Sarah M.' },
                                        ].map((log, i) => (
                                            <div key={i} className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-3 w-3 text-gray-500" />
                                                    <span className="text-gray-400">{log.action}</span>
                                                </div>
                                                <span className="text-gray-600">{log.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-3 border-t border-white/5 bg-black/60 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="h-3 w-3" />
                    <span>Viewing logged for compliance</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Document ID: {doc.id}</span>
                </div>
            </div>
        </motion.div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm text-gray-300 text-right max-w-[180px] break-words">{value}</span>
        </div>
    );
}
