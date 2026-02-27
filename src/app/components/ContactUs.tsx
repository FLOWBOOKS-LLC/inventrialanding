import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Headphones, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { createContact } from "@/app/lib/contactApi";

export function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult("idle");

    try {
      await createContact(formData);
      setResult("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Failed to submit contact form", error);
      setResult("error");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@flowbooks.com",
      subDetails: "We'll respond within 24 hours",
      color: "#0b3574"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "08067643479",
      subDetails: "Mon-Fri, 9AM-6PM WAT",
      color: "#0b3574"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Floor 1 African Alliance House, Airport Road",
      subDetails: "Kano State, Nigeria",
      color: "#0b3574"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday",
      subDetails: "9:00 AM - 6:00 PM WAT",
      color: "#0b3574"
    }
  ];

  const departments = [
    {
      icon: MessageSquare,
      title: "Sales Inquiries",
      description: "Learn how flowbooks can transform your business",
      email: "sales@flowbooks.com"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Get help with your existing account",
      email: "support@flowbooks.com"
    },
    {
      icon: Globe,
      title: "Partnership",
      description: "Explore partnership opportunities",
      email: "partners@flowbooks.com"
    }
  ];

  return (
    <div className="bg-background text-foreground transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-40" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 20%, #1a2942 50%, #0b3574 100%)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: '#0b3574' }}
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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
            >
              <MessageSquare className="w-5 h-5 text-cyan-300" />
              <span className="text-white text-sm font-medium">Sales, support & partnerships</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl lg:text-3xl mb-8 tracking-tight leading-tight"
              style={{
                background: 'linear-gradient(to bottom, #ffffff 0%, #e0f2fe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Contact Us
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              Questions about invoicing, reconciliation, or reporting? We’re here to help. Send a message and we’ll respond shortly.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 lg:h-32" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,50 C360,90 720,10 1080,50 C1260,70 1350,80 1440,90 L1440,100 L0,100 Z" fill="white" fillOpacity="0.1"/>
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1350,90 1440,100 L1440,100 L0,100 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:items-start">
            {/* Left - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col h-full"
            >
              <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-xl border border-border flex-1 flex flex-col">
                <div>
                  <h2 className="text-2xl lg:text-3xl mb-2 text-foreground">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Reach out via email, phone, or visit—we’re here to help.
                  </p>
                </div>

                <div className="space-y-4 flex-1">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={info.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group bg-muted/30 rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #0b3574 0%, #1a2942 100%)';
                          e.currentTarget.style.borderColor = 'transparent';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '';
                          e.currentTarget.style.borderColor = '';
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: info.color }}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg mb-1 text-foreground group-hover:text-white transition-colors duration-300">{info.title}</h3>
                            <p className="text-muted-foreground mb-1 group-hover:text-white transition-colors duration-300">
                              {info.details}
                            </p>
                            <p className="text-sm text-muted-foreground/80 group-hover:text-white/80 transition-colors duration-300">
                              {info.subDetails}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Extra Info Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6 bg-primary/5 rounded-2xl p-6 border border-primary/20"
                >
                  <h3 className="text-lg mb-2 text-foreground">Need Immediate Assistance?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Our support team is available to help with urgent accounting or platform issues.
                  </p>
                  <Button className="w-full text-white" style={{ background: '#0b3574' }}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Support Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-3xl p-8 lg:p-10 shadow-xl border border-border"
            >
              <h2 className="text-2xl lg:text-3xl mb-2 text-foreground">Send us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we’ll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-[#0b3574] focus:outline-none focus:ring-2 focus:ring-[#0b3574]/20 transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-[#0b3574] focus:outline-none focus:ring-2 focus:ring-[#0b3574]/20 transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-[#0b3574] focus:outline-none focus:ring-2 focus:ring-[#0b3574]/20 transition-colors"
                    placeholder="john.doe@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-[#0b3574] focus:outline-none focus:ring-2 focus:ring-[#0b3574]/20 transition-colors"
                    placeholder="+234 000 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-[#0b3574] focus:outline-none focus:ring-2 focus:ring-[#0b3574]/20 transition-colors"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-[#0b3574] focus:outline-none focus:ring-2 focus:ring-[#0b3574]/20 transition-colors"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-[#0b3574] focus:outline-none focus:ring-2 focus:ring-[#0b3574]/20 transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full text-white"
                  style={{ background: '#0b3574' }}
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-5 w-5" />
                </Button>

                {result === "success" && (
                  <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Message sent! We’ll get back to you shortly.
                  </div>
                )}
                {result === "error" && (
                  <p className="text-sm text-destructive text-center">Something went wrong. Please try again.</p>
                )}

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
