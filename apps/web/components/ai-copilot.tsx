"use client";

import { useState } from "react";
import { Button, cn } from "@sgif/ui";
import { Send, Bot, User, Sparkles, Cpu, Zap, Brain, CircuitBoard } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
}

export function AiCopilot() {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "bot", content: "NEURAL INTERFACE ACTIVE. I am the SGIF Quantum AI Assistant. How can I assist with your infrastructure analysis today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        // Simulate RAG response
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: "I've analyzed the latest spectral data from the Al Dhafra site. Output efficiency is up 4.2% due to recent cleaning schedules. Thermal variance is within optimal parameters. Would you like a detailed quantum analysis report?"
            };
            setMessages(prev => [...prev, botMsg]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full glass-card overflow-hidden relative">
            {/* Animated border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-gold to-transparent" />
            
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-black/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-cyan/20 to-purple-500/20 border border-cyber-cyan/30 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-cyber-cyan" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-sgif-emerald rounded-full border-2 border-black animate-pulse" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            Quantum Neural Interface
                            <Sparkles className="h-3 w-3 text-sgif-gold" />
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <CircuitBoard className="h-3 w-3" />
                            GPT-4 Turbo • RAG Enabled
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sgif-emerald opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sgif-emerald"></span>
                    </span>
                    <span className="text-xs text-sgif-emerald font-mono">ONLINE</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scan-line">
                {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex gap-3 max-w-[85%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}>
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 border",
                            msg.role === "bot" 
                                ? "bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan" 
                                : "bg-sgif-gold/10 border-sgif-gold/30 text-sgif-gold"
                        )}>
                            {msg.role === "bot" ? <Cpu className="h-5 w-5" /> : <User className="h-5 w-5" />}
                        </div>
                        <div className={cn(
                            "p-4 rounded-2xl text-sm relative overflow-hidden",
                            msg.role === "bot" 
                                ? "bg-white/[0.02] border border-white/10 rounded-tl-none text-gray-300" 
                                : "bg-gradient-to-r from-cyber-cyan/20 to-sgif-gold/20 border border-cyber-cyan/30 rounded-tr-none text-white"
                        )}>
                            {msg.role === "bot" && (
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyber-cyan/50 to-transparent" />
                            )}
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan flex items-center justify-center">
                            <Cpu className="h-5 w-5 animate-pulse" />
                        </div>
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-mono">PROCESSING</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-black/40">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex gap-3"
                >
                    <div className="flex-1 relative">
                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                        <input
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
                            placeholder="Query the neural network..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <Button 
                        size="icon" 
                        className="h-12 w-12 rounded-xl bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black shadow-neon-cyan hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all" 
                        type="submit" 
                        disabled={isLoading}
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Quantum Processing</span>
                    <span className="flex items-center gap-1"><CircuitBoard className="h-3 w-3" /> RAG Pipeline</span>
                    <span className="flex items-center gap-1"><Brain className="h-3 w-3" /> 175B Parameters</span>
                </div>
            </div>
        </div>
    );
}
