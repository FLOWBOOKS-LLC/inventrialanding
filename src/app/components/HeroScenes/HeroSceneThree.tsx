import { motion } from "motion/react";
import {
  Calculator,
  Clock,
  Mic,
  Monitor,
  Play,
  Users,
  Video,
} from "lucide-react";

export function HeroSceneThree() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-sky-500/10 rounded-3xl blur-3xl" />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] bg-gray-900/90 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950">
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.45), transparent 35%), radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.45), transparent 35%), radial-gradient(circle at 40% 80%, rgba(14, 165, 233, 0.45), transparent 40%)",
            }}
            initial={{ scale: 1.05 }}
            animate={{ scale: [1.05, 1, 1.05] }}
            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          <div className="relative h-full w-full flex flex-col justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Video className="w-4 h-4 text-sky-300" />
              </div>
              <div>
                <p className="text-white font-semibold">AI-assisted close</p>
                <p className="text-sm text-gray-300">
                  Reconcile faster with guided workflows.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-white shadow-lg">
                <p className="text-xs text-gray-300 mb-1">Close cycle</p>
                <p className="text-lg font-semibold">4d faster</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-white shadow-lg">
                <p className="text-xs text-gray-300 mb-1">Anomalies caught</p>
                <p className="text-lg font-semibold">99.4% accuracy</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-white shadow-lg">
                <p className="text-xs text-gray-300 mb-1">Team load</p>
                <p className="text-lg font-semibold">-28% review time</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                className="h-12 px-4 rounded-full bg-white/15 text-white border border-white/20 backdrop-blur shadow-lg flex items-center gap-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Play className="w-4 h-4 fill-white/70" />
                <span className="text-sm font-semibold">Watch demo</span>
              </motion.button>

              <div className="flex items-center gap-2 text-sm text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live systems monitored
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
              <Video className="w-4 h-4 text-blue-300" />
            </div>
            <div>
              <p className="text-white font-semibold">AI-assisted close</p>
              <p className="text-sm text-gray-400">
                Reconcile faster with guided workflows.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-emerald-300">
              <Mic className="w-4 h-4" />
              <span className="text-sm font-semibold">Voice ready</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200">
              <Monitor className="w-4 h-4" />
              <span className="text-sm">Live dashboards</span>
            </div>
            <div className="flex items-center gap-2 text-amber-200">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Closes on time</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-10 left-8 bg-gray-900/80 border border-white/15 rounded-xl px-4 py-3 shadow-xl backdrop-blur"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-center gap-2 text-white">
          <Users className="w-4 h-4 text-blue-300" />
          <span className="text-sm font-semibold">Team online</span>
          <span className="ml-auto text-xs text-emerald-300">4 active</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-16 right-6 bg-gray-900/80 border border-white/15 rounded-xl px-4 py-3 shadow-xl backdrop-blur"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="flex items-center gap-2 text-white">
          <Monitor className="w-4 h-4 text-sky-300" />
          <span className="text-sm font-semibold">Realtime overview</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Revenue +12% this week</p>
      </motion.div>

      <motion.div
        className="absolute bottom-24 left-8 bg-gray-900/80 border border-white/15 rounded-xl px-4 py-3 shadow-xl backdrop-blur"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <div className="flex items-center gap-2 text-white">
          <Calculator className="w-4 h-4 text-amber-300" />
          <span className="text-sm font-semibold">Payroll ready</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">All approvals collected</p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 bg-blue-600/90 rounded-xl px-4 py-3 shadow-2xl border border-white/10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.65 }}
      >
        <div className="text-white text-sm font-semibold">Upcoming call</div>
        <div className="flex items-center gap-2 text-white mt-1">
          <Clock className="w-4 h-4" />
          <span className="text-sm">11:30 AM with CFO</span>
        </div>
      </motion.div>
    </div>
  );
}
