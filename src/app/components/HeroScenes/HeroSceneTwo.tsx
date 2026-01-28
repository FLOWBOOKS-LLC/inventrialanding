import { motion } from "motion/react";
import { DollarSign, FileText, Mic, Sparkles, TrendingUp } from "lucide-react";

export function HeroSceneTwo() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/10 rounded-3xl blur-3xl" />

      <motion.div
        className="absolute bottom-32 left-16"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: [1, 1.15, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          opacity: { delay: 0.2 },
          scale: { duration: 3, repeat: Infinity },
          rotate: { duration: 3, repeat: Infinity },
        }}
      >
        <Sparkles className="w-6 h-6 text-cyan-400" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-gray-800/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-white text-lg">
            How can I help with your bookkeeping today?
          </span>
          <button className="ml-auto w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
            <Mic className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-16 right-8 bg-blue-600 backdrop-blur-xl rounded-xl px-5 py-3 shadow-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="text-xs text-blue-100 mb-1">✓ SYNC COMPLETE</div>
        <div className="text-white font-medium">Bank reconciliation updated</div>
      </motion.div>

      <motion.div
        className="absolute top-32 left-8 bg-gray-800/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 shadow-xl"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="text-xs text-gray-400 mb-1">CASH FLOW</div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span className="text-white font-semibold text-lg">+$15.2K</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">This month</div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-4 bg-gray-800/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-white text-sm">Expense Tracking</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-1/3 bg-gray-800/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-white text-sm">Invoice Management</span>
        </div>
      </motion.div>
    </div>
  );
}
