import { motion } from "motion/react";
import { Target, Eye, Award, Users, Shield, Zap, CheckCircle, ArrowRight, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface AboutUsProps {
  onNavigate?: (page: string) => void;
}

export function AboutUs({ onNavigate }: AboutUsProps) {
  const values = [
    {
      icon: CheckCircle,
      title: "Simplicity",
      description: "We design solutions that are easy to use and understand."
    },
    {
      icon: Target,
      title: "Accuracy",
      description: "We are committed to reliable, precise financial records."
    },
    {
      icon: Shield,
      title: "Security",
      description: "We protect data with the highest security standards."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously improve to meet evolving business needs."
    }
    // {
    //   icon: Award,
    //   title: "Integrity",
    //   description: "We operate with transparency, honesty, and trust."
    // },
    // {
    //   icon: Users,
    //   title: "Customer-Centricity",
    //   description: "Our users’ success guides everything we build."
    // }
  ];

  const stats = [
    { number: "5+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "$2.5B+", label: "Managed Annually" },
    { number: "150+", label: "Countries Served" }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Emily Thompson",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "David Park",
      role: "Chief Financial Officer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ];

  const milestones = [
  {
    year: "Step 1",
    title: "The Problem We Saw",
    description:
      "Many businesses struggled with poor record-keeping, limited financial visibility, and complex accounting tools that didn’t fit their realities."
  },
  {
    year: "Step 2",
    title: "Building the Solution",
    description:
      "We set out to create a practical, intuitive, and powerful accounting platform designed to simplify financial management."
  },
  {
    year: "Step 3",
    title: "Focused on Small Businesses",
    description:
      "FlowBooks began by helping small businesses automate bookkeeping and gain clearer financial insights."
  },
  {
    year: "Step 4",
    title: "Expanding Our Capabilities",
    description:
      "Through continuous innovation and feedback, we introduced smart invoicing, real-time analytics, secure data protection, and multi-user collaboration."
  },
  {
    year: "Step 5",
    title: "Growing With Our Users",
    description:
      "Today, FlowBooks serves individuals, SMEs, and mid-market organisations—empowering smarter decisions and sustainable growth."
  }
];


  return (
    <div className="bg-background text-foreground transition-colors">
      {/* Hero Section - Dark to Color Gradient */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 20%, #1a2942 50%, #0b3574 100%)' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: '#0b3574' }}
            animate={{
              y: [0, 50, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-96 h-96 rounded-full opacity-15 blur-3xl"
            style={{ background: '#0b3574' }}
            animate={{
              y: [0, -40, 0],
              x: [0, -40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl"
            style={{ background: '#00d4ff' }}
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(#0b3574 1px, transparent 1px), linear-gradient(90deg, #0b3574 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 lg:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
            >
              <div>
                <Award className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="text-white text-sm font-medium">Trusted by 50,000+ businesses worldwide</span>
            </motion.div>
            
            {/* Main heading with gradient text */}
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
              Revolutionizing Accounting for Modern Businesses
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Flowbooks is a modern accounting and financial management platform built to simplify how businesses and individuals manage their finances. We help our users automate bookkeeping, gain real-time financial insights, and make better decisions with confidence. Our focus is on accuracy, security, and ease of use—so finance works for you, not against you.
            </motion.p>

            {/* Floating stats cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto"
            >
              {[
                { value: "50+", label: "Active Users", icon: Users },
                { value: "99.9%", label: "Uptime", icon: Shield },
                { value: "$2.5B+", label: "Managed", icon: TrendingUp },
                { value: "150+", label: "Countries", icon: Globe }
              ].map((stat, index) => {
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
                    <div className="text-3xl lg:text-4xl text-white mb-1">{stat.value}</div>
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

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full opacity-20" style={{ background: '#4166b2' }}></div>
              <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-100">
                <div className="w-14 h-14 rounded-xl flex items_center justify-center mb-6" style={{ background: '#0b3574' }}>
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl mb-4" style={{ color: '#0a1929' }}>Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To empower businesses and individuals with simple, reliable, and intelligent financial tools that improve visibility, control, and long-term success.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20" style={{ background: '#4166b2' }}></div>
              <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-100">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #0b3574 0%, #000000 100%)' }}>
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl mb-4" style={{ color: '#0a1929' }}>Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To become a trusted accounting platform for businesses across Africa and beyond, driving financial clarity, and sustainable growth through technology.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transition Section - Decorative gradient divider */}
      <section className="relative py-20 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 50%, #f9fafb 100%)' }}></div>
        
        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl"
            style={{ background: '#0b3574' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl"
            style={{ background: '#0b3574' }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.05, 0.1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Decorative line with dot */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-3 h-3 rounded-full mx-4 flex-shrink-0"
              style={{ background: '#0b3574' }}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl mb-3" style={{ color: '#0a1929' }}>Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300" style={{ background: '#0b3574' }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl mb-3 transition-colors duration-300" style={{ color: '#0a1929' }}>{value.title}</h3>
                  <p className="text-gray-600 transition-colors duration-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl mb-3" style={{ color: '#0a1929' }}>Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From a small startup to a global leader in accounting automation
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-start gap-8 mb-12 last:mb-0"
              >
                {/* Timeline line */}
                {index !== milestones.length - 1 && (
                  <div className="absolute left-[31px] top-16 w-0.5 h-full bg-gray-200"></div>
                )}
                
                {/* Year badge */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg" style={{ background: 'linear-gradient(135deg, #0b3574 0%, #000000 100%)' }}>
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-5 h-5" style={{ color: '#0b3574' }} />
                    <h3 className="text-2xl" style={{ color: '#0a1929' }}>{milestone.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
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
              Join Thousands of Happy Customers
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Experience the future of accounting with flowbooks. Start your free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white hover:bg-gray-100 px-8 text-base" style={{ color: '#0b3574' }}>
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
                  e.currentTarget.style.color = '#0b3574';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
