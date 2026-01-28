import { motion } from "motion/react";
import { CheckCircle, TrendingUp } from "lucide-react";
import logo from "@/assets/374538f42b0e0847d9f305d8e590b6dc3aeeea09.png";

export function HeroSceneOne() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl blur-3xl" />

      <motion.div
        className="absolute top-8 left-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl px-5 py-3 shadow-2xl border border-blue-400/20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-white" />
          <div>
            <div className="text-white text-xs font-medium opacity-90">
              Increased Efficiency
            </div>
            <div className="text-white text-lg font-bold">98%</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="p-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-40"></div>
              <div className="relative w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-white/10 p-6">
                <img
                  src={logo}
                  alt="Flowbooks Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-1">
              Flowbooks
            </h3>
            <p className="text-gray-400 text-sm mb-6">since 2021</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-2 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-blue-500/30 shadow-xl"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-white text-sm font-medium">
            Charts of Accounts
          </span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-amber-500/30 shadow-xl"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="text-white text-sm font-medium">Ledger</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-purple-500/30 shadow-xl"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          <span className="text-white text-sm font-medium">Finance</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl px-5 py-4 border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <div className="text-xs text-gray-400 mb-2 font-medium">
          Business Cost Saved
        </div>
        <div className="flex items-baseline gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span className="text-white font-bold text-2xl">50%</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 right-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl px-6 py-4 shadow-2xl border border-blue-400/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <div className="text-center">
          <div className="text-white text-3xl font-bold">5+</div>
          <div className="text-xs text-blue-100 font-medium mt-1">Clients</div>
        </div>
      </motion.div>
    </div>
  );
}
