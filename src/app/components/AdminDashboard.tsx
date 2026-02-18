import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard,
  TrendingUp,
  FileText,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Eye,
  Calendar,
  Tag,
  Briefcase,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  TrendingDown
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { blogCategories } from "@/app/constants/blogCategories";
import { fetchContacts, updateContactStatus, deleteContact } from "@/app/lib/contactApi";
import { supabaseRequest, supabaseUrl, supabaseAnonKey } from "@/app/lib/supabaseClient";

interface SuccessStory {
  id: string;
  company: string;
  industry: string;
  logo: string;
  image: string;
  challenge: string;
  result: string;
  metrics: { value: string; label: string }[];
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState<"overview" | "stories" | "blog" | "testimonials" | "contacts" | "settings">("overview");
  
  // Data states
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  
  // Form states
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);

  // Load data from localStorage on mount (legacy)
  useEffect(() => {
    const savedStories = localStorage.getItem("flowbooks_success_stories");
    const savedPosts = localStorage.getItem("flowbooks_blog_posts");
    const savedTestimonials = localStorage.getItem("flowbooks_testimonials");
    
    if (savedStories) setSuccessStories(JSON.parse(savedStories));
    if (savedPosts) setBlogPosts(JSON.parse(savedPosts));
    if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
  }, []);

  // Load success stories from Supabase
  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase env vars missing; using cached success stories only");
      return;
    }

    const abort = new AbortController();
    const load = async () => {
      try {
        const stories = await supabaseRequest<SuccessStory[]>(
          `/rest/v1/success_stories?select=*`,
          { signal: abort.signal }
        );
        setSuccessStories(stories || []);
        localStorage.setItem("flowbooks_success_stories", JSON.stringify(stories || []));
      } catch (err) {
        console.warn("Failed to load success stories from Supabase", err);
      }
    };

    load();
    return () => abort.abort();
  }, []);

  // Load blog posts from Supabase
  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase env vars missing; using cached blog posts only");
      return;
    }

    const abort = new AbortController();
    const load = async () => {
      try {
        const posts = await supabaseRequest<BlogPost[]>(`/rest/v1/blog_posts?select=*`, { signal: abort.signal });
        setBlogPosts(posts || []);
        localStorage.setItem("flowbooks_blog_posts", JSON.stringify(posts || []));
      } catch (err) {
        console.warn("Failed to load blog posts from Supabase", err);
      }
    };

    load();
    return () => abort.abort();
  }, []);

  // Load contacts from Supabase
  useEffect(() => {
    let active = true;
    fetchContacts()
      .then((data) => {
        if (active) setContacts(data);
      })
      .catch((err) => console.error("Failed to load contacts", err));
    return () => {
      active = false;
    };
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (successStories.length > 0) {
      localStorage.setItem("flowbooks_success_stories", JSON.stringify(successStories));
    }
  }, [successStories]);

  useEffect(() => {
    // Keep localStorage in sync for quick client rendering and offline cache
    localStorage.setItem("flowbooks_blog_posts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    if (testimonials.length > 0) {
      localStorage.setItem("flowbooks_testimonials", JSON.stringify(testimonials));
    }
  }, [testimonials]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveSection("overview");
  };

  // Calculate analytics
  const analytics = {
    totalStories: successStories.length,
    totalPosts: blogPosts.length,
    totalTestimonials: testimonials.length,
    newContacts: contacts.filter(c => c.status === 'new').length,
    totalContacts: contacts.length,
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a1929 0%, #4166b2 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #4166b2 0%, #000000 100%)' }}>
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl mb-2" style={{ color: '#0a1929' }}>Flowbooks Admin</h1>
            <p className="text-gray-600">Dashboard Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full text-white" 
              style={{ background: '#4166b2' }}
            >
              Sign In
            </Button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Demo password: admin123
          </p>
        </motion.div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#4166b2' }}>
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold" style={{ color: '#0a1929' }}>Flowbooks</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem
            icon={LayoutDashboard}
            label="Overview"
            active={activeSection === "overview"}
            onClick={() => setActiveSection("overview")}
          />
          <NavItem
            icon={TrendingUp}
            label="Success Stories"
            active={activeSection === "stories"}
            onClick={() => setActiveSection("stories")}
            badge={analytics.totalStories}
          />
          <NavItem
            icon={FileText}
            label="Blog Posts"
            active={activeSection === "blog"}
            onClick={() => setActiveSection("blog")}
            badge={analytics.totalPosts}
          />
          <NavItem
            icon={MessageSquare}
            label="Testimonials"
            active={activeSection === "testimonials"}
            onClick={() => setActiveSection("testimonials")}
            badge={analytics.totalTestimonials}
          />
          <NavItem
            icon={Mail}
            label="Contact Submissions"
            active={activeSection === "contacts"}
            onClick={() => setActiveSection("contacts")}
            badge={analytics.newContacts}
            badgeColor="bg-red-500"
          />
          <NavItem
            icon={Settings}
            label="Settings"
            active={activeSection === "settings"}
            onClick={() => setActiveSection("settings")}
          />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-6">
            <h2 className="text-2xl" style={{ color: '#0a1929' }}>
              {activeSection === "overview" && "Dashboard Overview"}
              {activeSection === "stories" && "Success Stories"}
              {activeSection === "blog" && "Blog Posts"}
              {activeSection === "testimonials" && "Testimonials"}
              {activeSection === "contacts" && "Contact Submissions"}
              {activeSection === "settings" && "Settings"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {activeSection === "overview" && "Welcome back! Here's what's happening with your site."}
              {activeSection === "stories" && "Manage your client success stories and case studies"}
              {activeSection === "blog" && "Create and manage blog posts for your audience"}
              {activeSection === "testimonials" && "Manage customer testimonials and reviews"}
              {activeSection === "contacts" && "View and respond to contact form submissions"}
              {activeSection === "settings" && "Configure your admin panel settings"}
            </p>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {activeSection === "overview" && (
            <OverviewSection 
              analytics={analytics} 
              recentContacts={contacts.slice(0, 5)}
              onViewContacts={() => setActiveSection("contacts")}
            />
          )}
          
          {activeSection === "stories" && (
            <StoriesSection
              stories={successStories}
              onAdd={() => {
                setEditingStory(null);
                setShowStoryForm(true);
              }}
              onEdit={(story) => {
                setEditingStory(story);
                setShowStoryForm(true);
              }}
              onDelete={async (id) => {
                if (!confirm("Are you sure you want to delete this success story?")) return;

                // Optimistic UI update
                setSuccessStories(prev => {
                  const next = prev.filter(s => s.id !== id);
                  localStorage.setItem("flowbooks_success_stories", JSON.stringify(next));
                  return next;
                });

                if (!supabaseUrl || !supabaseAnonKey) {
                  alert("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to delete success stories.");
                  return;
                }

                try {
                  await supabaseRequest(`/rest/v1/success_stories?id=eq.${id}`, { method: "DELETE" });
                } catch (err) {
                  console.error("Failed to delete success story", err);
                  alert("Could not delete story on the server. It may reappear on refresh.");
                }
              }}
            />
          )}
          
          {activeSection === "blog" && (
            <BlogSection
              posts={blogPosts}
              onAdd={() => {
                setEditingPost(null);
                setShowPostForm(true);
              }}
              onEdit={(post) => {
                setEditingPost(post);
                setShowPostForm(true);
              }}
              onDelete={async (id) => {
                if (!confirm("Are you sure you want to delete this blog post?")) return;

                // Optimistic UI update with captured new list
                setBlogPosts(prev => {
                  const next = prev.filter(p => p.id !== id);
                  localStorage.setItem("flowbooks_blog_posts", JSON.stringify(next));
                  return next;
                });

                // Persist to Supabase
                if (!supabaseUrl || !supabaseAnonKey) {
                  alert("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to delete blog posts.");
                  return;
                }

                try {
                  await supabaseRequest(`/rest/v1/blog_posts?id=eq.${id}`, { method: "DELETE" });
                } catch (err) {
                  console.error("Failed to delete blog post", err);
                  alert("Could not delete post on the server. It may reappear on refresh.");
                }
              }}
            />
          )}
          
          {activeSection === "testimonials" && (
            <TestimonialsSection
              testimonials={testimonials}
              onAdd={() => {
                setEditingTestimonial(null);
                setShowTestimonialForm(true);
              }}
              onEdit={(testimonial) => {
                setEditingTestimonial(testimonial);
                setShowTestimonialForm(true);
              }}
              onDelete={(id) => {
                if (confirm("Are you sure you want to delete this testimonial?")) {
                  setTestimonials(prev => prev.filter(t => t.id !== id));
                }
              }}
            />
          )}
          
          {activeSection === "contacts" && (
            <ContactsSection
              contacts={contacts}
              onUpdateStatus={async (id, status) => {
                try {
                  await updateContactStatus(id, status);
                  setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
                } catch (err) {
                  console.error("Failed to update contact status", err);
                  alert("Could not update status. Please try again.");
                }
              }}
              onDelete={async (id) => {
                if (!confirm("Are you sure you want to delete this contact submission?")) return;
                try {
                  await deleteContact(id);
                  setContacts(prev => prev.filter(c => c.id !== id));
                } catch (err) {
                  console.error("Failed to delete contact", err);
                  alert("Could not delete contact. Please try again.");
                }
              }}
            />
          )}
          
          {activeSection === "settings" && <SettingsSection />}
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showStoryForm && (
          <StoryFormModal
            story={editingStory}
            onSave={async (story) => {
              if (!supabaseUrl || !supabaseAnonKey) {
                alert("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to save success stories.");
                return;
              }

              const payload: any = { ...story };
              if (!story.id) {
                delete payload.id; // let Supabase generate primary key
              }

              try {
                await supabaseRequest("/rest/v1/success_stories", {
                  method: "POST",
                  body: JSON.stringify(payload),
                  headers: { Prefer: "return=representation,resolution=merge-duplicates" }
                });

                const stories = await supabaseRequest<SuccessStory[]>(
                  "/rest/v1/success_stories?select=*"
                );
                setSuccessStories(stories || []);
                localStorage.setItem("flowbooks_success_stories", JSON.stringify(stories || []));
              } catch (err) {
                console.error("Failed to save success story", err);
                alert("Could not save success story. Please try again.");
                return;
              }

              setShowStoryForm(false);
              setEditingStory(null);
            }}
            onClose={() => {
              setShowStoryForm(false);
              setEditingStory(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPostForm && (
          <BlogFormModal
            post={editingPost}
            onSave={async (post) => {
              // Ensure Supabase config exists
              if (!supabaseUrl || !supabaseAnonKey) {
                alert("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to save blog posts.");
                return;
              }

              const payload: any = { ...post };
              if (!post.id) {
                delete payload.id; // let Supabase generate primary key
              }

              try {
                await supabaseRequest("/rest/v1/blog_posts", {
                  method: "POST",
                  body: JSON.stringify(payload),
                  headers: { Prefer: "return=representation,resolution=merge-duplicates" }
                });

                const posts = await supabaseRequest<BlogPost[]>("/rest/v1/blog_posts?select=*");
                setBlogPosts(posts || []);
                localStorage.setItem("flowbooks_blog_posts", JSON.stringify(posts || []));
              } catch (err) {
                console.error("Failed to save blog post", err);
                alert("Could not save blog post. Please try again.");
                return;
              }

              setShowPostForm(false);
              setEditingPost(null);
            }}
            onClose={() => {
              setShowPostForm(false);
              setEditingPost(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTestimonialForm && (
          <TestimonialFormModal
            testimonial={editingTestimonial}
            onSave={(testimonial) => {
              if (editingTestimonial) {
                setTestimonials(prev => prev.map(t => t.id === testimonial.id ? testimonial : t));
              } else {
                setTestimonials(prev => [...prev, { ...testimonial, id: Date.now().toString() }]);
              }
              setShowTestimonialForm(false);
              setEditingTestimonial(null);
            }}
            onClose={() => {
              setShowTestimonialForm(false);
              setEditingTestimonial(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Navigation Item Component
function NavItem({ 
  icon: Icon, 
  label, 
  active, 
  onClick, 
  badge,
  badgeColor = "bg-blue-500"
}: { 
  icon: any; 
  label: string; 
  active: boolean; 
  onClick: () => void; 
  badge?: number;
  badgeColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active
          ? "text-white"
          : "text-gray-600 hover:bg-gray-50"
      }`}
      style={active ? { background: '#4166b2' } : {}}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left text-sm font-medium">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`${badgeColor} text-white text-xs font-semibold px-2 py-0.5 rounded-full`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// Overview Section
function OverviewSection({ 
  analytics, 
  recentContacts,
  onViewContacts 
}: { 
  analytics: any; 
  recentContacts: ContactSubmission[];
  onViewContacts: () => void;
}) {
  const stats = [
    {
      label: "Success Stories",
      value: analytics.totalStories,
      icon: TrendingUp,
      color: "#4166b2",
      bgColor: "#eff6ff"
    },
    {
      label: "Blog Posts",
      value: analytics.totalPosts,
      icon: FileText,
      color: "#059669",
      bgColor: "#d1fae5"
    },
    {
      label: "Testimonials",
      value: analytics.totalTestimonials,
      icon: MessageSquare,
      color: "#dc2626",
      bgColor: "#fee2e2"
    },
    {
      label: "New Contacts",
      value: analytics.newContacts,
      icon: Mail,
      color: "#f59e0b",
      bgColor: "#fef3c7"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: stat.bgColor }}>
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: '#0a1929' }}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Contacts */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold" style={{ color: '#0a1929' }}>Recent Contact Submissions</h3>
          <Button
            onClick={onViewContacts}
            variant="outline"
            className="text-sm"
          >
            View All
          </Button>
        </div>
        <div className="divide-y divide-gray-200">
          {recentContacts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No contact submissions yet</p>
            </div>
          ) : (
            recentContacts.map((contact) => (
              <div key={contact.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium" style={{ color: '#0a1929' }}>{contact.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        contact.status === 'new' ? 'bg-red-100 text-red-700' :
                        contact.status === 'read' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{contact.email} • {contact.company}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{contact.message}</p>
                  </div>
                  <div className="text-xs text-gray-400 ml-4">{contact.date}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#0a1929' }}>Quick Stats</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold mb-1" style={{ color: '#4166b2' }}>{analytics.totalContacts}</div>
            <div className="text-sm text-gray-600">Total Contacts</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold mb-1" style={{ color: '#4166b2' }}>
              {analytics.totalStories + analytics.totalPosts}
            </div>
            <div className="text-sm text-gray-600">Total Content</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold mb-1" style={{ color: '#4166b2' }}>
              {Math.round((analytics.totalTestimonials / Math.max(analytics.totalStories, 1)) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Testimonial Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stories Section
function StoriesSection({ 
  stories, 
  onAdd, 
  onEdit, 
  onDelete 
}: { 
  stories: SuccessStory[]; 
  onAdd: () => void; 
  onEdit: (story: SuccessStory) => void; 
  onDelete: (id: string) => void; 
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-600">{stories.length} success stories published</p>
        </div>
        <Button
          onClick={onAdd}
          className="text-white flex items-center gap-2"
          style={{ background: '#4166b2' }}
        >
          <Plus className="w-5 h-5" />
          Add Success Story
        </Button>
      </div>

      {stories.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-gray-500 mb-4">No success stories yet</p>
          <Button onClick={onAdd} style={{ background: '#4166b2' }} className="text-white">
            Create Your First Story
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img src={story.image} alt={story.company} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold shadow-lg" style={{ background: 'linear-gradient(135deg, #4166b2 0%, #000000 100%)' }}>
                    {story.logo}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{story.industry}</span>
                </div>
                <h3 className="text-xl mb-3" style={{ color: '#0a1929' }}>{story.company}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{story.challenge}</p>
                
                <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-gray-200">
                  {story.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg font-semibold" style={{ color: '#4166b2' }}>{metric.value}</div>
                      <div className="text-xs text-gray-500">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onEdit(story)}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(story.id)}
                    variant="outline"
                    className="flex items-center justify-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Blog Section
function BlogSection({ 
  posts, 
  onAdd, 
  onEdit, 
  onDelete 
}: { 
  posts: BlogPost[]; 
  onAdd: () => void; 
  onEdit: (post: BlogPost) => void; 
  onDelete: (id: string) => void; 
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-600">{posts.length} blog posts published</p>
        </div>
        <Button
          onClick={onAdd}
          className="text-white flex items-center gap-2"
          style={{ background: '#4166b2' }}
        >
          <Plus className="w-5 h-5" />
          Add Blog Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-gray-500 mb-4">No blog posts yet</p>
          <Button onClick={onAdd} style={{ background: '#4166b2' }} className="text-white">
            Create Your First Post
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-white/95 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium" style={{ color: '#4166b2' }}>
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl mb-2 line-clamp-2" style={{ color: '#0a1929' }}>{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div>{post.readTime}</div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onEdit(post)}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(post.id)}
                    variant="outline"
                    className="flex items-center justify-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Testimonials Section
function TestimonialsSection({ 
  testimonials, 
  onAdd, 
  onEdit, 
  onDelete 
}: { 
  testimonials: Testimonial[]; 
  onAdd: () => void; 
  onEdit: (testimonial: Testimonial) => void; 
  onDelete: (id: string) => void; 
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-600">{testimonials.length} testimonials published</p>
        </div>
        <Button
          onClick={onAdd}
          className="text-white flex items-center gap-2"
          style={{ background: '#4166b2' }}
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-gray-500 mb-4">No testimonials yet</p>
          <Button onClick={onAdd} style={{ background: '#4166b2' }} className="text-white">
            Add Your First Testimonial
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar || testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: '#0a1929' }}>{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{testimonial.content}</p>

              <div className="flex gap-2">
                <Button
                  onClick={() => onEdit(testimonial)}
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(testimonial.id)}
                  variant="outline"
                  className="flex items-center justify-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Contacts Section
function ContactsSection({ 
  contacts, 
  onUpdateStatus, 
  onDelete 
}: { 
  contacts: ContactSubmission[]; 
  onUpdateStatus: (id: string, status: 'new' | 'read' | 'replied') => void; 
  onDelete: (id: string) => void; 
}) {
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  
  const filteredContacts = contacts.filter(c => 
    filter === 'all' || c.status === filter
  );

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <Button
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'default' : 'outline'}
          className={filter === 'all' ? 'text-white' : ''}
          style={filter === 'all' ? { background: '#4166b2' } : {}}
        >
          All ({contacts.length})
        </Button>
        <Button
          onClick={() => setFilter('new')}
          variant={filter === 'new' ? 'default' : 'outline'}
          className={filter === 'new' ? 'text-white' : ''}
          style={filter === 'new' ? { background: '#4166b2' } : {}}
        >
          New ({contacts.filter(c => c.status === 'new').length})
        </Button>
        <Button
          onClick={() => setFilter('read')}
          variant={filter === 'read' ? 'default' : 'outline'}
          className={filter === 'read' ? 'text-white' : ''}
          style={filter === 'read' ? { background: '#4166b2' } : {}}
        >
          Read ({contacts.filter(c => c.status === 'read').length})
        </Button>
        <Button
          onClick={() => setFilter('replied')}
          variant={filter === 'replied' ? 'default' : 'outline'}
          className={filter === 'replied' ? 'text-white' : ''}
          style={filter === 'replied' ? { background: '#4166b2' } : {}}
        >
          Replied ({contacts.filter(c => c.status === 'replied').length})
        </Button>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Mail className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-gray-500">No contact submissions found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: '#0a1929' }}>{contact.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      contact.status === 'new' ? 'bg-red-100 text-red-700' :
                      contact.status === 'read' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {contact.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {contact.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {contact.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {contact.date}
                    </div>
                  </div>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{contact.message}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {contact.status === 'new' && (
                  <Button
                    onClick={() => onUpdateStatus(contact.id, 'read')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Mark as Read
                  </Button>
                )}
                {contact.status !== 'replied' && (
                  <Button
                    onClick={() => onUpdateStatus(contact.id, 'replied')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Replied
                  </Button>
                )}
                <Button
                  onClick={() => onDelete(contact.id)}
                  variant="outline"
                  className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Settings Section
function SettingsSection() {
  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#0a1929' }}>Admin Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Current: admin123"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Password change functionality coming soon</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#0a1929' }}>Data Management</h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              const data = {
                stories: localStorage.getItem("flowbooks_success_stories"),
                posts: localStorage.getItem("flowbooks_blog_posts"),
                testimonials: localStorage.getItem("flowbooks_testimonials"),
                contacts: localStorage.getItem("flowbooks_contacts")
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'flowbooks-backup.json';
              a.click();
            }}
          >
            Export All Data
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50"
            onClick={() => {
              if (confirm("Are you sure you want to clear all data? This cannot be undone!")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Clear All Data
          </Button>
        </div>
      </div>
    </div>
  );
}

// Form Modals (reusing from original Admin component)
function StoryFormModal({ 
  story, 
  onSave, 
  onClose 
}: { 
  story: SuccessStory | null; 
  onSave: (story: SuccessStory) => void; 
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<SuccessStory>(
    story || {
      id: "",
      company: "",
      industry: "",
      logo: "",
      image: "",
      challenge: "",
      result: "",
      metrics: [
        { value: "", label: "" },
        { value: "", label: "" },
        { value: "", label: "" }
      ]
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl" style={{ color: '#0a1929' }}>
            {story ? "Edit Success Story" : "Add Success Story"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo (2 letters) *
              </label>
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={2}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Challenge *
            </label>
            <textarea
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Result *
            </label>
            <textarea
              value={formData.result}
              onChange={(e) => setFormData({ ...formData, result: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Metrics (3 required) *
            </label>
            <div className="space-y-3">
              {formData.metrics.map((metric, index) => (
                <div key={index} className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) => {
                      const newMetrics = [...formData.metrics];
                      newMetrics[index].value = e.target.value;
                      setFormData({ ...formData, metrics: newMetrics });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Value (e.g., 75%)"
                    required
                  />
                  <input
                    type="text"
                    value={metric.label}
                    onChange={(e) => {
                      const newMetrics = [...formData.metrics];
                      newMetrics[index].label = e.target.value;
                      setFormData({ ...formData, metrics: newMetrics });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Label (e.g., Time Saved)"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 text-white"
              style={{ background: '#4166b2' }}
            >
              <Save className="w-4 h-4 mr-2" />
              {story ? "Update Story" : "Create Story"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function BlogFormModal({ 
  post, 
  onSave, 
  onClose 
}: { 
  post: BlogPost | null; 
  onSave: (post: BlogPost) => void; 
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<BlogPost>(
    post || {
      id: "",
      title: "",
      excerpt: "",
      content: "",
      category: "",
      image: "",
      author: "",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: "5 min read"
    }
  );

  const categoryOptions = blogCategories.filter((cat) => cat.name !== "All");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl" style={{ color: '#0a1929' }}>
            {post ? "Edit Blog Post" : "Add Blog Post"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              >
                <option value="" disabled>Select a category</option>
                {categoryOptions.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5 min read"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={6}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 text-white"
              style={{ background: '#4166b2' }}
            >
              <Save className="w-4 h-4 mr-2" />
              {post ? "Update Post" : "Create Post"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function TestimonialFormModal({ 
  testimonial, 
  onSave, 
  onClose 
}: { 
  testimonial: Testimonial | null; 
  onSave: (testimonial: Testimonial) => void; 
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Testimonial>(
    testimonial || {
      id: "",
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
      avatar: ""
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl" style={{ color: '#0a1929' }}>
            {testimonial ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar (1 letter or emoji)
              </label>
              <input
                type="text"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={2}
                placeholder="Leave empty to use first letter of name"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 text-white"
              style={{ background: '#4166b2' }}
            >
              <Save className="w-4 h-4 mr-2" />
              {testimonial ? "Update Testimonial" : "Create Testimonial"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
