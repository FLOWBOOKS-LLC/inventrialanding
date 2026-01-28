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
import expertImage from "@/assets/f26a2d16dceafbdbdf6928a5158f0befd8343cec.png";

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
        <div className="relative aspect-video">
          <img
            src={expertImage}
            alt="Flowbooks expert"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/10 to-transparent" />
          <motion.button
            className="absolute left-4 bottom-4 h-12 px-4 rounded-full bg-white/15 text-white border border-white/20 backdrop-blur shadow-lg flex items-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Play className="w-4 h-4 fill-white/70" />
            <span className="text-sm font-semibold">Watch demo</span>
          </motion.button>
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
