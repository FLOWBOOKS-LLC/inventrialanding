commit 6a3323430575aab679c1226de0a66addcf9d8597
Author: 8790fahad <8790fahadado@gmail.com>
Date:   Sat Jun 20 19:07:37 2026 +0100

    chnages

diff --git a/src/app/components/HeroScenes/HeroSceneManufacturing.tsx b/src/app/components/HeroScenes/HeroSceneManufacturing.tsx
new file mode 100644
index 00000000..07bcebde
--- /dev/null
+++ b/src/app/components/HeroScenes/HeroSceneManufacturing.tsx
@@ -0,0 +1,107 @@
+import { motion } from "motion/react";
+import {
+  Boxes,
+  Factory,
+  Layers,
+  Package,
+  Sparkles,
+  TrendingUp,
+} from "lucide-react";
+
+export function HeroSceneManufacturing() {
+  return (
+    <div className="relative h-full w-full">
+      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/10 rounded-3xl blur-3xl" />
+
+      <motion.div
+        className="absolute top-16 right-6 bg-blue-600 backdrop-blur-xl rounded-xl px-5 py-3 shadow-xl"
+        initial={{ opacity: 0, y: -30 }}
+        animate={{ opacity: 1, y: 0 }}
+        transition={{ delay: 0.3, duration: 0.5 }}
+      >
+        <div className="text-xs text-blue-100 mb-1">✓ BATCH COMPLETE</div>
+        <div className="text-white font-medium">Production costing updated</div>
+      </motion.div>
+
+      <motion.div
+        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-gray-900/85 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl"
+        initial={{ opacity: 0, scale: 0.8 }}
+        animate={{ opacity: 1, scale: 1 }}
+        transition={{ delay: 0.2, duration: 0.5 }}
+      >
+        <div className="flex items-start gap-3">
+          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
+            <Factory className="w-5 h-5 text-orange-400" />
+          </div>
+          <span className="text-white text-sm md:text-base leading-relaxed">
+            Flowbooks tracked raw materials, labour, and overhead for Batch
+            #104—your unit cost and WIP are ready to review.
+          </span>
+          <motion.div
+            initial={{ opacity: 0, scale: 0 }}
+            animate={{ opacity: 1, scale: [1, 1.1, 1] }}
+            transition={{
+              opacity: { delay: 0.4 },
+              scale: { duration: 2.5, repeat: Infinity },
+            }}
+          >
+            <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
+          </motion.div>
+        </div>
+      </motion.div>
+
+      <motion.div
+        className="absolute top-32 left-8 bg-gray-800/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 shadow-xl"
+        initial={{ opacity: 0, x: -30 }}
+        animate={{ opacity: 1, x: 0 }}
+        transition={{ delay: 0.4, duration: 0.5 }}
+      >
+        <div className="text-xs text-gray-400 mb-1">WIP VALUE</div>
+        <div className="flex items-center gap-2">
+          <TrendingUp className="w-5 h-5 text-green-500" />
+          <span className="text-white font-semibold text-lg">₦2.4M</span>
+        </div>
+        <div className="text-xs text-gray-400 mt-1">Open batches</div>
+      </motion.div>
+
+      <motion.div
+        className="absolute bottom-32 left-4 bg-gray-800/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 shadow-xl"
+        initial={{ opacity: 0, y: 30 }}
+        animate={{ opacity: 1, y: 0 }}
+        transition={{ delay: 0.5, duration: 0.4 }}
+      >
+        <div className="flex items-center gap-2">
+          <div className="w-2 h-2 rounded-full bg-orange-500" />
+          <Layers className="w-4 h-4 text-gray-400" />
+          <span className="text-white text-sm">BOM &amp; Raw Materials</span>
+        </div>
+      </motion.div>
+
+      <motion.div
+        className="absolute bottom-16 left-[28%] bg-gray-800/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 shadow-xl"
+        initial={{ opacity: 0, y: 30 }}
+        animate={{ opacity: 1, y: 0 }}
+        transition={{ delay: 0.55, duration: 0.4 }}
+      >
+        <div className="flex items-center gap-2">
+          <div className="w-2 h-2 rounded-full bg-blue-500" />
+          <Package className="w-4 h-4 text-gray-400" />
+          <span className="text-white text-sm">Finished Goods</span>
+        </div>
+      </motion.div>
+
+      <motion.div
+        className="absolute bottom-20 right-6 bg-gray-800/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 shadow-xl"
+        initial={{ opacity: 0, y: 30 }}
+        animate={{ opacity: 1, y: 0 }}
+        transition={{ delay: 0.65, duration: 0.4 }}
+      >
+        <div className="flex items-center gap-2">
+          <div className="w-2 h-2 rounded-full bg-emerald-500" />
+          <Boxes className="w-4 h-4 text-gray-400" />
+          <span className="text-white text-sm">Inventory Control</span>
+        </div>
+      </motion.div>
+    </div>
+  );
+}
