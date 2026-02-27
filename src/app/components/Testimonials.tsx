import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";

const categories = [
  {
    id: "small-business",
    label: "Small Businesses",
    stories: [
      {
        image: "https://images.unsplash.com/photo-1752650732081-8f61e81813ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBvZmZpY2V8ZW58MXx8fHwxNzY4OTE3NjA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "FlowBooks simplifies daily finances",
        description: "So small business owners can focus on growing their business instead of paperwork."
      },
      {
        image: "https://images.unsplash.com/photo-1553484771-6e117b648d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc2ODkxNzYwOHww&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Automated bookkeeping",
        description: "Reduce manual work and keep your records accurate without the stress."
      }
    ]
  },
  {
    id: "individuals",
    label: "Individuals",
    stories: [
      {
        image: "https://images.unsplash.com/photo-1728281144091-b743062a9bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlbGFuY2UlMjBwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY4ODI1OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Take control of your finances",
        description: "FlowBooks helps you manage money with clarity and confidence."
      },
      {
        image: "https://images.unsplash.com/photo-1570717173024-ec8081c8f8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JraW5nJTIwbGFwdG9wfGVufDF8fHx8MTc2ODkxNzYwOXww&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Track income and expenses effortlessly",
        description: "Know exactly where your money comes from and where it goes."
      }
    ]
  },
  {
    id: "mid-market",
    label: "Mid-Market Businesses",
    stories: [
      {
        image: "https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2ODgyMzkzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Built for growing organisations",
        description: "FlowBooks scales with your business — without added complexity."
      },
      {
        image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzY4ODA2MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Manufacturing Firm",
        description: "Secure multi-user access keeps teams aligned and accountable."
      }
    ]
  }
];

export function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState(1); // Default to "Individuals"

  const handleCategoryChange = (index: number) => {
    setSelectedCategory(index);
  };

  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden bg-slate-950"
      style={{
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#0b3574] uppercase mb-3">
            Customer Stories
          </p>
          <h2 className="text-3xl lg:text-3xl text-white mb-2">
            How Flowbooks supports different teams
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            From individuals to mid-market businesses, Flowbooks helps keep books accurate,
            cash flow visible, and teams aligned.
          </p>
          
          {/* Category Navigation */}
          <div className="relative flex items-center justify-center overflow-hidden">
            <motion.div 
              className="flex items-center gap-4 lg:gap-8"
              animate={{
                x: selectedCategory === 0 ? '25%' : selectedCategory === 2 ? '-25%' : '0%'
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(index)}
                  className="relative px-6 lg:px-8 py-3 lg:py-3.5 rounded-full text-sm lg:text-base font-medium whitespace-nowrap"
                  animate={{
                    backgroundColor:
                      selectedCategory === index ? "#ffffff" : "rgba(15,23,42,0.5)",
                    color: selectedCategory === index ? "#020617" : "#e5e7eb",
                    scale: selectedCategory === index ? 1.05 : 1,
                  }}
                  whileHover={{ 
                    scale: selectedCategory === index ? 1.08 : 1.1,
                    boxShadow: selectedCategory === index 
                      ? '0 10px 30px rgba(0, 0, 0, 0.15)' 
                      : '0 8px 25px rgba(21, 148, 227, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                  style={{
                    boxShadow: selectedCategory === index
                      ? "0 10px 40px rgba(15,23,42,0.55)"
                      : "0 0 0 rgba(0,0,0,0)",
                  }}
                >
                  {/* Navigation arrows for selected category */}
                  <AnimatePresence>
                    {selectedCategory === index && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-2 top-1/2 -translate-y-1/2"
                        >
                          <ChevronLeft 
                            className="w-5 h-5"
                            style={{ color: '#6b7280' }}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                        >
                          <ChevronRight 
                            className="w-5 h-5"
                            style={{ color: '#6b7280' }}
                          />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                  {category.label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Story Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto mt-12">
          <AnimatePresence mode="wait">
            {categories[selectedCategory].stories.map((story, index) => (
              <motion.div
                key={`${selectedCategory}-${index}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <h3 className="text-white text-xl lg:text-2xl font-semibold mb-2">
                      {story.title}
                    </h3>
                    <p className="text-white/90 text-sm lg:text-base">
                      {story.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Optional: See all stories link */}
        <div className="text-center mt-12">
          <button 
            className="text-gray-900 font-medium hover:underline transition-all duration-200"
            style={{ color: '#4166b2' }}
          >
            See all success stories →
          </button>
        </div>
      </div>

      {/* CSS Animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </section>
  );
}