"use client";

import { Button, cn } from "@sgif/ui";
import { Upload, X, FileText, CheckCircle2, Shield, Zap } from "lucide-react";
import { useState, useCallback } from "react";

export function FileUpload() {
    const [isDragOver, setIsDragOver] = useState(false);
    const [files, setFiles] = useState<{ name: string, size: string, progress: number }[]>([]);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const droppedFiles = Array.from(e.dataTransfer.files).map(f => ({
            name: f.name,
            size: (f.size / 1024 / 1024).toFixed(2) + " MB",
            progress: 0
        }));

        setFiles(prev => [...prev, ...droppedFiles]);

        droppedFiles.forEach((_, idx) => {
            const globalIdx = files.length + idx;
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                if (progress > 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                setFiles(current => {
                    const newFiles = [...current];
                    if (newFiles[globalIdx]) {
                        newFiles[globalIdx].progress = progress;
                    }
                    return newFiles;
                });
            }, 200);
        });

    }, [files.length]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Upload Zone */}
            <div
                className={cn(
                    "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer group overflow-hidden",
                    isDragOver 
                        ? "border-cyber-cyan bg-cyber-cyan/5 shadow-lg shadow-cyber-cyan/20" 
                        : "border-white/10 hover:border-cyber-cyan/40 hover:bg-white/[0.02]"
                )}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                {/* Animated background grid */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyber-cyan/30 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyber-cyan/30 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyber-cyan/30 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyber-cyan/30 rounded-br-xl" />
                
                <div className="relative z-10">
                    <div className={cn(
                        "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300",
                        isDragOver 
                            ? "bg-cyber-cyan/20 border border-cyber-cyan/40 shadow-lg shadow-cyber-cyan/30" 
                            : "bg-gradient-to-br from-cyber-cyan/10 to-blue-500/10 border border-white/10 group-hover:border-cyber-cyan/30"
                    )}>
                        <Upload className={cn(
                            "h-10 w-10 transition-all duration-300",
                            isDragOver ? "text-cyber-cyan animate-bounce" : "text-gray-400 group-hover:text-cyber-cyan"
                        )} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Secure Document Upload</h3>
                    <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
                        Drag and drop your financial reports, technical specs, or contracts. All files are encrypted with quantum-grade security.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Button className="bg-gradient-to-r from-cyber-cyan to-blue-500 hover:from-cyber-cyan/90 hover:to-blue-500/90 text-white shadow-lg shadow-cyber-cyan/25 border border-cyber-cyan/30">
                            <Zap className="mr-2 h-4 w-4" /> Browse Files
                        </Button>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Shield className="h-4 w-4 text-sgif-emerald" />
                            AES-256 Encrypted
                        </div>
                    </div>
                </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="mt-8 space-y-3">
                    <h4 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-cyber-cyan to-blue-400 rounded-full" />
                        Uploading {files.length} files...
                    </h4>
                    {files.map((file, i) => (
                        <div key={i} className="glass-card p-4 flex items-center gap-4 group hover:border-cyber-cyan/30 transition-all">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyber-cyan/20 to-blue-500/10 border border-cyber-cyan/20 flex items-center justify-center text-cyber-cyan">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium text-white truncate">{file.name}</span>
                                    <span className="text-xs text-cyber-cyan font-mono">{file.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyber-cyan to-blue-400 rounded-full transition-all duration-300 shadow-lg shadow-cyber-cyan/50"
                                        style={{ width: `${file.progress}%` }}
                                    />
                                </div>
                            </div>
                            {file.progress === 100 ? (
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sgif-emerald/10 border border-sgif-emerald/20">
                                    <CheckCircle2 className="h-4 w-4 text-sgif-emerald" />
                                    <span className="text-xs text-sgif-emerald font-mono">Complete</span>
                                </div>
                            ) : (
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg">
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
