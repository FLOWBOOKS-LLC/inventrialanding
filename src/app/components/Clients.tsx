import { motion } from "motion/react";
import { Building2, Users, Award, CheckCircle, ArrowRight, Briefcase, Globe } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { supabaseRequest, supabaseUrl, supabaseAnonKey } from "@/app/lib/supabaseClient";

interface ClientsProps {
  onNavigate?: (page: string) => void;
}

interface SuccessStory {
  id: string;
  company: string;
  industry: string;
  logo: string;
  image: string;
  challenge: string;
  result: string;
}

export function Clients({ onNavigate }: ClientsProps) {
  const [caseStudies, setCaseStudies] = useState<SuccessStory[]>([]);

  // Load success stories from localStorage for fast render
  useEffect(() => {
    const savedStories = localStorage.getItem("flowbooks_success_stories");
    if (savedStories) {
      setCaseStudies(JSON.parse(savedStories));
    }
  }, []);

  // Load success stories from Supabase so all visitors see the shared data
  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase env vars missing; showing cached success stories only");
      return;
    }

    const abort = new AbortController();
    const load = async () => {
      try {
        const stories = await supabaseRequest<SuccessStory[]>(
          `/rest/v1/success_stories?select=*`,
          { signal: abort.signal }
        );
        setCaseStudies(stories || []);
        localStorage.setItem("flowbooks_success_stories", JSON.stringify(stories || []));
      } catch (err) {
        console.warn("Failed to load success stories from Supabase", err);
      }
    };

    load();
    return () => abort.abort();
  }, []);

  const industries = [
    {
      icon: Building2,
      name: "Real Estate",
      count: "2,500+",
      color: "#4166b2"
    },
    {
      icon: Briefcase,
      name: "Professional Services",
      count: "3,200+",
      color: "#000000"
    },
    {
      icon: Users,
      name: "Retail & E-commerce",
      count: "4,100+",
      color: "#4166b2"
    },
    {
      icon: Globe,
      name: "Technology",
      count: "1,800+",
      color: "#000000"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Clients", icon: Users },
    { number: "150+", label: "Countries", icon: Globe },
    { number: "99.9%", label: "Satisfaction Rate", icon: Award },
    { number: "24/7", label: "Support", icon: CheckCircle }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 20%, #1a2942 50%, #4166b2 100%)' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: '#4166b2' }}
            animate={{
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ background: '#00d4ff' }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(#4166b2 1px, transparent 1px), linear-gradient(90deg, #4166b2 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
            >
              <Award className="w-5 h-5 text-cyan-300" />
              <span className="text-white text-sm font-medium">Trusted by Industry Leaders</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl lg:text-3xl mb-6 tracking-tight leading-tight"
              style={{
                background: 'linear-gradient(to bottom, #ffffff 0%, #e0f2fe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Powering Success for Businesses Worldwide
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Discover how leading companies across industries are transforming their accounting operations with flowbooks
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.05 } }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-cyan-300 mx-auto mb-3" />
                    <div className="text-3xl lg:text-4xl text-white mb-1">{stat.number}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 lg:h-32" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,50 C360,90 720,10 1080,50 C1260,70 1350,80 1440,90 L1440,100 L0,100 Z" fill="white" fillOpacity="0.1"/>
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1350,90 1440,100 L1440,100 L0,100 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl mb-3" style={{ color: '#0a1929' }}>Industries We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From startups to enterprises, we're trusted across diverse sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300" style={{ background: industry.color }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl mb-2 transition-colors duration-300" style={{ color: '#0a1929' }}>
                    {industry.count}
                  </div>
                  <h3 className="text-xl mb-2 transition-colors duration-300" style={{ color: '#0a1929' }}>
                    {industry.name}
                  </h3>
                  <p className="text-gray-600 transition-colors duration-300">
                    Trusted clients
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl mb-3" style={{ color: '#0a1929' }}>Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real results from real businesses that transformed their accounting operations
            </p>
          </motion.div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <div className={`relative h-80 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <img 
                      src={study.image}
                      alt={study.company}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Logo Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #4166b2 0%, #000000 100%)' }}>
                        {study.logo}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 text-sm mb-4" style={{ color: '#4166b2' }}>
                      <Briefcase className="w-4 h-4" />
                      <span>{study.industry}</span>
                    </div>
                    
                    <h3 className="text-3xl mb-6" style={{ color: '#0a1929' }}>{study.company}</h3>
                    
                    <div className="space-y-4 mb-8">
                      <div>
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#fee2e2' }}>
                            <span className="text-xs" style={{ color: '#dc2626' }}>!</span>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Challenge</div>
                            <p className="text-gray-700 leading-relaxed">{study.challenge}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#dcfce7' }}>
                            <CheckCircle className="w-4 h-4" style={{ color: '#16a34a' }} />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Result</div>
                            <p className="text-gray-700 leading-relaxed">{study.result}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}

            {caseStudies.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p>No success stories yet. Add one in the Admin panel.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1929 0%, #1a2942 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl lg:text-3xl text-white mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              See how flowbooks can transform your accounting operations. Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 px-8 text-base" 
                style={{ color: '#4166b2' }}
                onClick={() => onNavigate?.('contact')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                className="border-2 border-white bg-transparent text-white hover:bg-white px-8 text-base"
                style={{ backgroundColor: 'transparent' }}
                onClick={() => onNavigate?.('contact')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#4166b2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
