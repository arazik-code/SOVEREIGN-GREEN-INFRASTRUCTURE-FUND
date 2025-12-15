"use client";

import { useState } from "react";
import { cn } from "@sgif/ui";
import { Button } from "@sgif/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
    Vote,
    CheckCircle2,
    XCircle,
    Clock,
    AlertTriangle,
    Users,
    FileText,
    Calendar,
    ChevronRight,
    Filter,
    Plus,
    ThumbsUp,
    ThumbsDown,
    Minus,
    Shield,
    Gavel,
    Scale,
    Eye,
    MessageSquare,
    Bell
} from "lucide-react";

interface Proposal {
    id: string;
    title: string;
    description: string;
    type: "investment" | "governance" | "operational" | "exit";
    status: "active" | "passed" | "rejected" | "pending";
    proposedBy: string;
    proposedDate: string;
    deadline: string;
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
    quorum: number;
    currentQuorum: number;
    threshold: number;
    documents: string[];
}

const proposals: Proposal[] = [
    {
        id: "1",
        title: "NEOM Solar Phase II Investment",
        description: "Approval for $75M additional investment in NEOM Solar Phase II expansion, targeting 500MW additional capacity.",
        type: "investment",
        status: "active",
        proposedBy: "Investment Committee",
        proposedDate: "Dec 5, 2024",
        deadline: "Dec 20, 2024",
        votesFor: 68,
        votesAgainst: 12,
        votesAbstain: 5,
        quorum: 75,
        currentQuorum: 85,
        threshold: 66.67,
        documents: ["Investment Memo", "Due Diligence Report", "Risk Assessment"],
    },
    {
        id: "2",
        title: "Amendment to LP Agreement - Distribution Waterfall",
        description: "Proposed modification to distribution waterfall structure to include ESG performance hurdle.",
        type: "governance",
        status: "active",
        proposedBy: "Legal Committee",
        proposedDate: "Nov 28, 2024",
        deadline: "Dec 28, 2024",
        votesFor: 45,
        votesAgainst: 30,
        votesAbstain: 10,
        quorum: 80,
        currentQuorum: 85,
        threshold: 75,
        documents: ["LPA Amendment Draft", "Impact Analysis"],
    },
    {
        id: "3",
        title: "Qatar Wind Farm - Partial Exit",
        description: "Approval to sell 30% stake in Qatar Wind Farm to strategic partner at 1.8x MOIC.",
        type: "exit",
        status: "passed",
        proposedBy: "Investment Committee",
        proposedDate: "Nov 1, 2024",
        deadline: "Nov 15, 2024",
        votesFor: 92,
        votesAgainst: 5,
        votesAbstain: 3,
        quorum: 75,
        currentQuorum: 100,
        threshold: 66.67,
        documents: ["Exit Memo", "Valuation Report", "Term Sheet"],
    },
    {
        id: "4",
        title: "Annual Budget Approval FY2025",
        description: "Approval of operating budget and management fee structure for fiscal year 2025.",
        type: "operational",
        status: "pending",
        proposedBy: "Management",
        proposedDate: "Dec 10, 2024",
        deadline: "Jan 15, 2025",
        votesFor: 0,
        votesAgainst: 0,
        votesAbstain: 0,
        quorum: 50,
        currentQuorum: 0,
        threshold: 50,
        documents: ["Budget Proposal", "Fee Schedule"],
    },
];

interface Decision {
    id: string;
    title: string;
    type: string;
    decision: "approved" | "rejected";
    date: string;
    votesFor: number;
    votesAgainst: number;
}

const recentDecisions: Decision[] = [
    { id: "1", title: "Qatar Wind Farm Partial Exit", type: "Exit", decision: "approved", date: "Nov 15, 2024", votesFor: 92, votesAgainst: 5 },
    { id: "2", title: "Q3 2024 Capital Call #8", type: "Capital Call", decision: "approved", date: "Sep 1, 2024", votesFor: 100, votesAgainst: 0 },
    { id: "3", title: "ESG Reporting Framework Update", type: "Governance", decision: "approved", date: "Aug 15, 2024", votesFor: 88, votesAgainst: 8 },
];

const typeConfig = {
    investment: { color: "sgif-emerald", label: "Investment", icon: TrendingUp },
    governance: { color: "purple-400", label: "Governance", icon: Scale },
    operational: { color: "cyber-cyan", label: "Operational", icon: Settings },
    exit: { color: "sgif-gold", label: "Exit", icon: ArrowUpRight },
};

const statusConfig = {
    active: { color: "cyber-cyan", label: "Active Voting", icon: Vote },
    passed: { color: "sgif-emerald", label: "Passed", icon: CheckCircle2 },
    rejected: { color: "red-500", label: "Rejected", icon: XCircle },
    pending: { color: "sgif-gold", label: "Pending", icon: Clock },
};

import { TrendingUp, Settings, ArrowUpRight } from "lucide-react";

export default function GovernancePage() {
    const [selectedFilter, setSelectedFilter] = useState<"all" | "active" | "passed" | "pending">("all");
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

    const filteredProposals = proposals.filter(p => 
        selectedFilter === "all" || p.status === selectedFilter
    );

    const activeCount = proposals.filter(p => p.status === "active").length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Governance</h1>
                    <p className="text-gray-400 mt-1">Votes, approvals, and fund decisions</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black gap-2">
                        <Plus className="h-4 w-4" />
                        New Proposal
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Active Votes", value: activeCount.toString(), color: "cyber-cyan", icon: Vote },
                    { label: "Pending Review", value: "1", color: "sgif-gold", icon: Clock },
                    { label: "Passed (YTD)", value: "12", color: "sgif-emerald", icon: CheckCircle2 },
                    { label: "Participation Rate", value: "94%", color: "purple-400", icon: Users },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-5 relative overflow-hidden"
                    >
                        <div className={cn(
                            "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent",
                            `via-${stat.color}`
                        )} />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                <p className={cn("text-3xl font-bold", `text-${stat.color}`)}>{stat.value}</p>
                            </div>
                            <div className={cn(
                                "p-3 rounded-xl border",
                                `bg-${stat.color}/10 border-${stat.color}/20`
                            )}>
                                <stat.icon className={cn("h-6 w-6", `text-${stat.color}`)} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                    {(["all", "active", "passed", "pending"] as const).map(filter => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-sm font-medium transition-all capitalize",
                                selectedFilter === filter
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Proposals Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                {filteredProposals.map((proposal, i) => {
                    const typeConf = typeConfig[proposal.type];
                    const statusConf = statusConfig[proposal.status];
                    const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
                    const forPercent = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
                    const againstPercent = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;
                    const isPassing = forPercent >= proposal.threshold;

                    return (
                        <motion.div
                            key={proposal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={cn(
                                "glass-card p-6 relative overflow-hidden cursor-pointer hover:border-white/20 transition-all",
                                proposal.status === "active" && "border-cyber-cyan/30"
                            )}
                            onClick={() => setSelectedProposal(proposal)}
                        >
                            <div className={cn(
                                "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent",
                                `via-${statusConf.color}`
                            )} />

                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "text-xs px-2 py-0.5 rounded-full border",
                                        `bg-${typeConf.color}/10 text-${typeConf.color} border-${typeConf.color}/20`
                                    )}>
                                        {typeConf.label}
                                    </span>
                                    <span className={cn(
                                        "text-xs px-2 py-0.5 rounded-full border flex items-center gap-1",
                                        `bg-${statusConf.color}/10 text-${statusConf.color} border-${statusConf.color}/20`
                                    )}>
                                        <statusConf.icon className="h-3 w-3" />
                                        {statusConf.label}
                                    </span>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-600" />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-white mb-2">{proposal.title}</h3>
                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{proposal.description}</p>

                            {/* Voting Progress */}
                            {proposal.status !== "pending" && (
                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                        <span>Voting Progress</span>
                                        <span>{proposal.currentQuorum}% / {proposal.quorum}% quorum</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/5 overflow-hidden flex">
                                        <div 
                                            className="h-full bg-sgif-emerald"
                                            style={{ width: `${forPercent}%` }}
                                        />
                                        <div 
                                            className="h-full bg-red-500"
                                            style={{ width: `${againstPercent}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-2 text-xs">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1 text-sgif-emerald">
                                                <ThumbsUp className="h-3 w-3" /> {proposal.votesFor}%
                                            </span>
                                            <span className="flex items-center gap-1 text-red-400">
                                                <ThumbsDown className="h-3 w-3" /> {proposal.votesAgainst}%
                                            </span>
                                            <span className="flex items-center gap-1 text-gray-500">
                                                <Minus className="h-3 w-3" /> {proposal.votesAbstain}%
                                            </span>
                                        </div>
                                        <span className={cn(
                                            "text-xs",
                                            isPassing ? "text-sgif-emerald" : "text-sgif-gold"
                                        )}>
                                            {proposal.threshold}% required
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                                <span>Proposed by {proposal.proposedBy}</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {proposal.status === "active" ? `Ends ${proposal.deadline}` : proposal.proposedDate}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Recent Decisions */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">Recent Decisions</h2>
                    <Button variant="ghost" size="sm" className="text-gray-400 gap-1">
                        View All <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-white/10">
                                <th className="pb-3 text-sm font-medium text-gray-400">Proposal</th>
                                <th className="pb-3 text-sm font-medium text-gray-400">Type</th>
                                <th className="pb-3 text-sm font-medium text-gray-400">Decision</th>
                                <th className="pb-3 text-sm font-medium text-gray-400">Votes</th>
                                <th className="pb-3 text-sm font-medium text-gray-400 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentDecisions.map(decision => (
                                <tr key={decision.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                    <td className="py-4 text-sm text-white">{decision.title}</td>
                                    <td className="py-4 text-sm text-gray-400">{decision.type}</td>
                                    <td className="py-4">
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded-full",
                                            decision.decision === "approved"
                                                ? "bg-sgif-emerald/10 text-sgif-emerald"
                                                : "bg-red-500/10 text-red-400"
                                        )}>
                                            {decision.decision === "approved" ? "Approved" : "Rejected"}
                                        </span>
                                    </td>
                                    <td className="py-4 text-sm">
                                        <span className="text-sgif-emerald">{decision.votesFor}%</span>
                                        <span className="text-gray-600 mx-1">/</span>
                                        <span className="text-red-400">{decision.votesAgainst}%</span>
                                    </td>
                                    <td className="py-4 text-sm text-gray-500 text-right">{decision.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
