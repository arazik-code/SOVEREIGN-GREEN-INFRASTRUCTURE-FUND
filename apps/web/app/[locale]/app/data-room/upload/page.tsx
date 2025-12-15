import { Button } from "@sgif/ui";
import { ArrowLeft, Upload, Shield, Lock } from "lucide-react";
import { Link } from "@/navigation";
import { FileUpload } from "@/components/data-room/file-upload";

export default function UploadPage() {
    return (
        <div className="flex flex-col gap-6 relative max-w-4xl mx-auto w-full">
            {/* Background effects */}
            <div className="fixed top-1/3 right-1/3 w-72 h-72 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-4">
                <Link href="/app/data-room">
                    <Button variant="ghost" size="icon" className="rounded-xl border border-white/10 hover:border-cyber-cyan/30 hover:bg-cyber-cyan/10 hover:text-cyber-cyan transition-all group">
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-cyber-cyan/80 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                        <Upload className="h-7 w-7 text-cyber-cyan" />
                        Upload Documents
                    </h1>
                    <p className="text-gray-500 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-sgif-emerald" />
                        Securely add files to the Virtual Data Room
                    </p>
                </div>
            </div>

            {/* Security Notice */}
            <div className="glass-card p-4 flex items-center gap-4 border-sgif-emerald/20">
                <div className="p-2 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20">
                    <Lock className="h-5 w-5 text-sgif-emerald" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-white">End-to-End Encryption Active</p>
                    <p className="text-xs text-gray-500">All uploads are encrypted with AES-256 quantum-resistant encryption</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-sgif-emerald/10 border border-sgif-emerald/20">
                    <span className="text-xs text-sgif-emerald font-mono">SECURE</span>
                </div>
            </div>

            <div className="mt-4">
                <FileUpload />
            </div>
        </div>
    );
}
