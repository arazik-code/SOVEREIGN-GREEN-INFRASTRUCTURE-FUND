"use client";

import * as React from "react";
import { Button, cn } from "@sgif/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
    Download,
    FileText,
    FileSpreadsheet,
    File,
    X,
    Check,
    Loader2,
    Lock,
    Eye,
    Calendar,
    Filter,
    ChevronDown,
    AlertCircle,
    Shield
} from "lucide-react";

export type ExportFormat = 'pdf' | 'csv' | 'xlsx' | 'json';

export interface ExportColumn {
    key: string;
    label: string;
    selected: boolean;
}

export interface ExportOptions {
    format: ExportFormat;
    dateRange?: { start: Date; end: Date };
    columns: ExportColumn[];
    includeWatermark: boolean;
    includeMetadata: boolean;
    confidentialityLevel: 'public' | 'internal' | 'confidential' | 'restricted';
}

interface DataExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExport: (options: ExportOptions) => Promise<void>;
    title: string;
    description?: string;
    availableColumns: { key: string; label: string }[];
    defaultFormat?: ExportFormat;
    className?: string;
}

const formatConfig: Record<ExportFormat, { icon: React.ElementType; label: string; description: string }> = {
    pdf: { icon: FileText, label: 'PDF', description: 'Formatted report with charts' },
    csv: { icon: FileSpreadsheet, label: 'CSV', description: 'Raw data for analysis' },
    xlsx: { icon: FileSpreadsheet, label: 'Excel', description: 'Spreadsheet with formatting' },
    json: { icon: File, label: 'JSON', description: 'Structured data format' },
};

const confidentialityColors = {
    public: 'text-sgif-emerald border-sgif-emerald/30 bg-sgif-emerald/10',
    internal: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    confidential: 'text-sgif-gold border-sgif-gold/30 bg-sgif-gold/10',
    restricted: 'text-red-400 border-red-400/30 bg-red-400/10',
};

export function DataExportModal({
    isOpen,
    onClose,
    onExport,
    title,
    description,
    availableColumns,
    defaultFormat = 'pdf',
    className,
}: DataExportModalProps) {
    const [isExporting, setIsExporting] = React.useState(false);
    const [exportComplete, setExportComplete] = React.useState(false);
    const [options, setOptions] = React.useState<ExportOptions>({
        format: defaultFormat,
        columns: availableColumns.map(col => ({ ...col, selected: true })),
        includeWatermark: true,
        includeMetadata: true,
        confidentialityLevel: 'confidential',
    });

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await onExport(options);
            setExportComplete(true);
            setTimeout(() => {
                setExportComplete(false);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const toggleColumn = (key: string) => {
        setOptions(prev => ({
            ...prev,
            columns: prev.columns.map(col => 
                col.key === key ? { ...col, selected: !col.selected } : col
            ),
        }));
    };

    const toggleAllColumns = (selected: boolean) => {
        setOptions(prev => ({
            ...prev,
            columns: prev.columns.map(col => ({ ...col, selected })),
        }));
    };

    const selectedCount = options.columns.filter(c => c.selected).length;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className={cn(
                            "glass-card w-full max-w-lg max-h-[90vh] overflow-hidden relative",
                            className
                        )}>
                            {/* Top accent */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />

                            {/* Header */}
                            <div className="p-6 border-b border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                                            <Download className="h-5 w-5 text-cyber-cyan" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">{title}</h2>
                                            {description && (
                                                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
                                {/* Format selection */}
                                <div>
                                    <label className="text-sm font-medium text-gray-400 block mb-3">
                                        Export Format
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {(Object.keys(formatConfig) as ExportFormat[]).map(format => {
                                            const config = formatConfig[format];
                                            const Icon = config.icon;
                                            const isSelected = options.format === format;
                                            
                                            return (
                                                <button
                                                    key={format}
                                                    onClick={() => setOptions(prev => ({ ...prev, format }))}
                                                    className={cn(
                                                        "p-3 rounded-lg border transition-all text-center",
                                                        isSelected
                                                            ? "bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan"
                                                            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                                                    )}
                                                >
                                                    <Icon className="h-5 w-5 mx-auto mb-1" />
                                                    <span className="text-xs font-medium">{config.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Column selection */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium text-gray-400">
                                            Data Columns ({selectedCount}/{options.columns.length})
                                        </label>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => toggleAllColumns(true)}
                                                className="text-xs text-cyber-cyan hover:underline"
                                            >
                                                Select All
                                            </button>
                                            <button
                                                onClick={() => toggleAllColumns(false)}
                                                className="text-xs text-gray-500 hover:underline"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1 max-h-40 overflow-y-auto p-2 rounded-lg bg-white/[0.02] border border-white/5">
                                        {options.columns.map(column => (
                                            <label
                                                key={column.key}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={column.selected}
                                                    onChange={() => toggleColumn(column.key)}
                                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyber-cyan focus:ring-cyber-cyan/50"
                                                />
                                                <span className="text-sm text-gray-300">{column.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Confidentiality level */}
                                <div>
                                    <label className="text-sm font-medium text-gray-400 block mb-3">
                                        Confidentiality Level
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(['public', 'internal', 'confidential', 'restricted'] as const).map(level => (
                                            <button
                                                key={level}
                                                onClick={() => setOptions(prev => ({ 
                                                    ...prev, 
                                                    confidentialityLevel: level 
                                                }))}
                                                className={cn(
                                                    "p-3 rounded-lg border transition-all text-left",
                                                    options.confidentialityLevel === level
                                                        ? confidentialityColors[level]
                                                        : "bg-white/5 border-white/10 text-gray-400"
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Shield className="h-4 w-4" />
                                                    <span className="text-sm font-medium capitalize">{level}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional options */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={options.includeWatermark}
                                            onChange={(e) => setOptions(prev => ({ 
                                                ...prev, 
                                                includeWatermark: e.target.checked 
                                            }))}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyber-cyan focus:ring-cyber-cyan/50"
                                        />
                                        <div>
                                            <span className="text-sm text-white block">Include Watermark</span>
                                            <span className="text-xs text-gray-500">Add SGIF watermark to document</span>
                                        </div>
                                    </label>
                                    
                                    <label className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={options.includeMetadata}
                                            onChange={(e) => setOptions(prev => ({ 
                                                ...prev, 
                                                includeMetadata: e.target.checked 
                                            }))}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyber-cyan focus:ring-cyber-cyan/50"
                                        />
                                        <div>
                                            <span className="text-sm text-white block">Include Metadata</span>
                                            <span className="text-xs text-gray-500">Export timestamp, user info, and audit trail</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Lock className="h-3 w-3" />
                                    Exports are logged for compliance
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={onClose}
                                        disabled={isExporting}
                                        className="border-white/10"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleExport}
                                        disabled={isExporting || selectedCount === 0}
                                        className={cn(
                                            "gap-2",
                                            exportComplete
                                                ? "bg-sgif-emerald text-white"
                                                : "bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black"
                                        )}
                                    >
                                        {isExporting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Exporting...
                                            </>
                                        ) : exportComplete ? (
                                            <>
                                                <Check className="h-4 w-4" />
                                                Complete
                                            </>
                                        ) : (
                                            <>
                                                <Download className="h-4 w-4" />
                                                Export
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
