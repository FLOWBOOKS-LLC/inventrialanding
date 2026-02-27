import { ShieldCheck, Lock, Server } from "lucide-react";

export function SecurityStrip() {
  return (
    <section className="bg-slate-900 border-y border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-slate-100 text-xs md:text-sm font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Security &amp; compliance by design</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] md:text-xs text-slate-300">
          <div className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-sky-400" />
            <span>Bank-level encryption &amp; role-based access</span>
          </div>
          <div className="flex items-center gap-1">
            <Server className="w-3.5 h-3.5 text-sky-400" />
            <span>Daily backups and audit-friendly records</span>
          </div>
        </div>
      </div>
    </section>
  );
}

