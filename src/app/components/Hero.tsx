import { Button } from "@/app/components/ui/button";
import { motion } from "motion/react";
import { ReactNode, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HeroSceneOne } from "./HeroScenes/HeroSceneOne";
import { HeroSceneTwo } from "./HeroScenes/HeroSceneTwo";

interface HeroProps {
  onNavigate?: (page: string) => void;
}

// export function Hero() {
//   const [currentScene, setCurrentScene] = useState(0);
//   const totalScenes = 3;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentScene((prev) => (prev + 1) % totalScenes);
//     }, 7000); // Change scene every 7 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative overflow-hidden min-h-[600px] flex items-center" style={{ background: 'linear-gradient(135deg, #0a1929 0%, #1a2942 100%)' }}>
//       <div className="container mx-auto px-4 lg:px-6 relative z-10 py-8 lg:py-12">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left side - Text content */}
//           <div className="space-y-4 lg:space-y-5">
//             <motion.h1 
//               className="text-3xl md:text-4xl lg:text-3xl tracking-tight text-white leading-tight"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               Simple Accounting Software for Growing Businesses
//             </motion.h1>
            
//             <motion.p 
//               className="text-base text-white/80 max-w-xl"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               Track income, expenses, payroll, and financial reports in one secure platform—built for business owners.
//             </motion.p>
            
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//             >
//               <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 text-base font-semibold">
//                 Request a demo
//               </Button>
//             </motion.div>
//           </div>

//           {/* Right side - Animated Scenes */}
//           <div className="relative h-[450px] lg:h-[500px] hidden lg:block">
//             <AnimatePresence mode="sync">
//               {/* Scene 1 - Expert Profile Card */}
//               {currentScene === 0 && (
//                 <motion.div
//                   key="scene1"
//                   initial={{ opacity: 0, x: 100 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -100 }}
//                   transition={{ duration: 0.6, ease: "easeInOut" }}
//                   className="absolute inset-0"
//                 >
//                   {/* Decorative glow */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl blur-3xl"></div>

//                   {/* Top left - Hours Saved Badge */}
//                   <motion.div
//                     className="absolute top-8 left-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl px-5 py-3 shadow-2xl border border-blue-400/20"
//                     initial={{ opacity: 0, y: -30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2, duration: 0.5 }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <TrendingUp className="w-5 h-5 text-white" />
//                       <div>
//                         <div className="text-white text-xs font-medium opacity-90">Increased Efficiency</div>
//                         <div className="text-white text-lg font-bold">98%</div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Center - Expert Profile Card */}
//                   <motion.div
//                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.2, duration: 0.5 }}
//                   >
//                     <div className="p-8">
//                       <div className="flex flex-col items-center">
//                         <div className="relative mb-5">
//                           <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-40"></div>
//                           <div className="relative w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-white/10 p-6">
//                             <img src={logo} alt="Flowbooks Logo" className="w-full h-full object-contain" />
//                           </div>
//                           <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
//                             <CheckCircle className="w-5 h-5 text-white" />
//                           </div>
//                         </div>
//                         <h3 className="text-white text-lg font-semibold mb-1">Flowbooks</h3>
//                         <p className="text-gray-400 text-sm mb-6">since 2021</p>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Agent Badges */}
//                   <motion.div
//                     className="absolute top-1/3 left-2 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-blue-500/30 shadow-xl"
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4, duration: 0.4 }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
//                       <span className="text-white text-sm font-medium">Charts of Accounts</span>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     className="absolute top-1/3 right-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-amber-500/30 shadow-xl"
//                     initial={{ opacity: 0, x: 30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.5, duration: 0.4 }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
//                       <span className="text-white text-sm font-medium">Ledger</span>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     className="absolute bottom-1/3 right-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-purple-500/30 shadow-xl"
//                     initial={{ opacity: 0, x: 30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.6, duration: 0.4 }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
//                       <span className="text-white text-sm font-medium">Finance</span>
//                     </div>
//                   </motion.div>

//                   {/* Bottom Stats */}
//                   <motion.div
//                     className="absolute bottom-8 left-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl px-5 py-4 border border-white/10 shadow-2xl"
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.7, duration: 0.4 }}
//                   >
//                     <div className="text-xs text-gray-400 mb-2 font-medium">Business Cost Saved</div>
//                     <div className="flex items-baseline gap-2">
//                       <TrendingUp className="w-5 h-5 text-green-500" />
//                       <span className="text-white font-bold text-2xl">50%</span>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     className="absolute bottom-12 right-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl px-6 py-4 shadow-2xl border border-blue-400/30"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.8, duration: 0.4 }}
//                   >
//                     <div className="text-center">
//                       <div className="text-white text-3xl font-bold">5+</div>
//                       <div className="text-xs text-blue-100 font-medium mt-1">Clients</div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {/* Scene 2 - AI Conversation */}
//               {currentScene === 1 && (
//                 <motion.div
//                   key="scene2"
//                   initial={{ opacity: 0, x: 100 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -100 }}
//                   transition={{ duration: 0.6, ease: "easeInOut" }}
//                   className="absolute inset-0"
//                 >
//                   {/* Sparkle decorations */}
//                   <motion.div
//                     className="absolute bottom-32 left-16"
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={{ 
//                       opacity: 1,
//                       scale: [1, 1.2, 1],
//                       rotate: [0, -90, 0]
//                     }}
//                     transition={{ 
//                       opacity: { delay: 0.2 },
//                       scale: { duration: 3, repeat: Infinity },
//                       rotate: { duration: 3, repeat: Infinity }
//                     }}
//                   >
//                     <Sparkles className="w-6 h-6 text-cyan-400" />
//                   </motion.div>

//                   {/* Main conversation card */}
//                   <motion.div
//                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-gray-800/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.2, duration: 0.5 }}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
//                         <Sparkles className="w-5 h-5 text-blue-400" />
//                       </div>
//                       <span className="text-white text-lg">How can I help with your bookkeeping today?</span>
//                       <button className="ml-auto w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                         <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
//                           <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
//                           <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
//                         </svg>
//                       </button>
//                     </div>
//                   </motion.div>

//                   {/* Top right card - Automation */}
//                   <motion.div
//                     className="absolute top-16 right-8 bg-blue-600 backdrop-blur-xl rounded-xl px-5 py-3 shadow-xl"
//                     initial={{ opacity: 0, y: -30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.5 }}
//                   >
//                     <div className="text-xs text-blue-100 mb-1">✓ SYNC COMPLETE</div>
//                     <div className="text-white font-medium">Bank reconciliation updated</div>
//                   </motion.div>

//                   {/* Top left card - Cash Flow */}
//                   <motion.div
//                     className="absolute top-32 left-8 bg-gray-800/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 shadow-xl"
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4, duration: 0.5 }}
//                   >
//                     <div className="text-xs text-gray-400 mb-1">CASH FLOW</div>
//                     <div className="flex items-center gap-2">
//                       <TrendingUp className="w-5 h-5 text-green-500" />
//                       <span className="text-white font-semibold text-lg">+$15.2K</span>
//                     </div>
//                     <div className="text-xs text-gray-400 mt-1">This month</div>
//                   </motion.div>

//                   {/* Bottom left card - Expense Tracking */}
//                   <motion.div
//                     className="absolute bottom-32 left-4 bg-gray-800/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 shadow-xl"
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5, duration: 0.4 }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                       <DollarSign className="w-4 h-4 text-gray-400" />
//                       <span className="text-white text-sm">Expense Tracking</span>
//                     </div>
//                   </motion.div>

//                   {/* Bottom center - Invoice Management */}
//                   <motion.div
//                     className="absolute bottom-16 left-1/3 bg-gray-800/80 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 shadow-xl"
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.6, duration: 0.4 }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//                       <FileText className="w-4 h-4 text-gray-400" />
//                       <span className="text-white text-sm">Invoice Management</span>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}

//               {/* Scene 3 - Expert Profile Card (Duplicate of Scene 1) */}
//               {currentScene === 2 && (
//                 <motion.div
//                   key="scene3"
//                   initial={{ opacity: 0, x: 100 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -100 }}
//                   transition={{ duration: 0.6, ease: "easeInOut" }}
//                   className="absolute inset-0"
//                 >
//                   {/* Decorative glow */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl blur-3xl"></div>

//                   {/* Top left - Hours Saved Badge */}
//                   <motion.div
//                     className="absolute top-8 left-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl px-5 py-3 shadow-2xl border border-blue-400/20"
//                     initial={{ opacity: 0, y: -30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2, duration: 0.5 }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <TrendingUp className="w-5 h-5 text-white" />
//                       <div>
//                         <div className="text-white text-xs font-medium opacity-90">Increased Efficiency</div>
//                         <div className="text-white text-lg font-bold">98%</div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Center - Expert Profile Card */}
//                   <motion.div
//                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.2, duration: 0.5 }}
//                   >
//                     <div className="p-8">
//                       <div className="flex flex-col items-center">
//                         <div className="relative mb-5">
//                           <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-40"></div>
//                           <div className="relative w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-white/10 p-6">
//                             <img src={logo} alt="Flowbooks Logo" className="w-full h-full object-contain" />
//                           </div>
//                           <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
//                             <CheckCircle className="w-5 h-5 text-white" />
//                           </div>
//                         </div>
//                         <h3 className="text-white text-lg font-semibold mb-1">Flowbooks</h3>
//                         <p className="text-gray-400 text-sm mb-6">since 2021</p>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Agent Badges */}
//                   <motion.div
//                     className="absolute top-1/3 left-2 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-blue-500/30 shadow-xl"
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4, duration: 0.4 }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
//                       <span className="text-white text-sm font-medium">Charts of Accounts</span>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     className="absolute top-1/3 right-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-amber-500/30 shadow-xl"
//                     initial={{ opacity: 0, x: 30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.5, duration: 0.4 }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
//                       <span className="text-white text-sm font-medium">Ledger</span>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     className="absolute bottom-1/3 right-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-purple-500/30 shadow-xl"
//                     initial={{ opacity: 0, x: 30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.6, duration: 0.4 }}
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
//                       <span className="text-white text-sm font-medium">Finance</span>
//                     </div>
//                   </motion.div>

//                   {/* Bottom Stats */}
//                   <motion.div
//                     className="absolute bottom-8 left-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl px-5 py-4 border border-white/10 shadow-2xl"
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.7, duration: 0.4 }}
//                   >
//                     <div className="text-xs text-gray-400 mb-2 font-medium">Business Cost Saved</div>
//                     <div className="flex items-baseline gap-2">
//                       <TrendingUp className="w-5 h-5 text-green-500" />
//                       <span className="text-white font-bold text-2xl">50%</span>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     className="absolute bottom-12 right-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl px-6 py-4 shadow-2xl border border-blue-400/30"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.8, duration: 0.4 }}
//                   >
//                     <div className="text-center">
//                       <div className="text-white text-3xl font-bold">5+</div>
//                       <div className="text-xs text-blue-100 font-medium mt-1">Clients</div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Progress dots */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
//               {[...Array(totalScenes)].map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentScene(index)}
//                   className="w-2 h-2 rounded-full transition-all"
//                   style={{
//                     backgroundColor: currentScene === index ? '#4166b2' : 'rgba(255, 255, 255, 0.3)',
//                     width: currentScene === index ? '24px' : '8px',
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
type SceneProps = {
  active: boolean;
  children: ReactNode;
};

function Scene({ active, children }: SceneProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0"
      animate={
        reduceMotion
          ? { opacity: active ? 1 : 0 }
          : { opacity: active ? 1 : 0, scale: active ? 1 : 0.96 }
      }
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}


export function Hero({ onNavigate }: HeroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const totalScenes = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % totalScenes);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative overflow-hidden flex items-center min-h-[100svh]"
      style={{
        background: "linear-gradient(135deg, #0a1929 0%, #1a2942 100%)",
      }}
    >
      {/* Vertical padding accounts for navbar */}
      <div className="container mx-auto px-4 lg:px-6 w-full pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text */}
          <div className="space-y-4 lg:space-y-6 max-w-xl">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-4xl text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Smart Accounting Software for Growing Businesses
            </motion.h1>

            <motion.p
              className="text-base text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Track income, expenses, payroll, and financial reports in one secure platform—built for business owners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 font-semibold"
                onClick={() => onNavigate?.('contact')}
              >
                Request a demo
              </Button>
            </motion.div>
          </div>

          {/* RIGHT: Animated Scenes */}
          <div
            className="
              relative hidden lg:block
              h-[60vh]
              min-h-[420px]
              max-h-[620px]
            "
          >
            {/* <AnimatePresence mode="wait">
              <motion.div
                key={currentScene}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
               
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl blur-3xl" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[340px] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 text-center">
                    <img
                      src={logo}
                      alt="Flowbooks Logo"
                      className="w-24 h-24 mx-auto mb-4 object-contain"
                    />
                    <h3 className="text-white text-lg font-semibold">Flowbooks</h3>
                    <p className="text-gray-400 text-sm">Since 2021</p>
                  </div>
                </div>

               
                <div className="absolute top-6 left-6 bg-blue-600 rounded-xl px-4 py-2 shadow-xl">
                  <span className="text-white text-sm font-medium">98% Efficiency</span>
                </div>

                <div className="absolute bottom-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl px-5 py-3 shadow-xl">
                  <div className="text-white text-2xl font-bold">5+</div>
                  <div className="text-xs text-blue-100">Clients</div>
                </div>
              </motion.div>
            </AnimatePresence> */}

              <div className="absolute inset-0">
                <Scene active={currentScene === 0}>
                  <HeroSceneOne />
                </Scene>

                <Scene active={currentScene === 1}>
                  <HeroSceneTwo />
                </Scene>

                <Scene active={currentScene === 2}>
                  <HeroSceneOne />
                </Scene>
              </div>

     
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
              {[...Array(totalScenes)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScene(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentScene === index
                      ? "w-6 bg-blue-500"
                      : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
