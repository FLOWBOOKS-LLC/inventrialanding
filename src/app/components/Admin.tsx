import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  LogOut, 
  Users, 
  FileText, 
  TrendingUp,
  Image as ImageIcon,
  Calendar,
  Tag,
  Briefcase
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { blogCategories } from "@/app/constants/blogCategories";
import { supabaseRequest } from "@/app/lib/supabaseClient";

interface SuccessStory {
  id: string;
  company: string;
  industry: string;
  logo: string;
  image: string;
  challenge: string;
  result: string;
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

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"stories" | "blog">("stories");
  
  // Success Stories State
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [showStoryForm, setShowStoryForm] = useState(false);

  // Blog Posts State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);

  // Load data from Supabase on mount
  useEffect(() => {
    const abort = new AbortController();
    const loadData = async () => {
      try {
        const stories = await supabaseRequest<SuccessStory[]>(`/rest/v1/success_stories?select=*`, { signal: abort.signal });
        setSuccessStories(stories || []);
      } catch (err) {
        console.warn("Failed to load success stories", err);
      }

      try {
        const posts = await supabaseRequest<BlogPost[]>(`/rest/v1/blog_posts?select=*`, { signal: abort.signal });
        setBlogPosts(posts || []);
      } catch (err) {
        console.warn("Failed to load blog posts", err);
      }
    };
    loadData();
    return () => abort.abort();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, this would be server-side)
    if (password === "admin123") {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Success Story Handlers
  const handleSaveStory = (story: SuccessStory) => {
    const upsert = async () => {
      const payload = { ...story, id: story.id || Date.now().toString() };
      await supabaseRequest("/rest/v1/success_stories", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { Prefer: "return=representation,resolution=merge-duplicates" }
      });
      const stories = await supabaseRequest<SuccessStory[]>(`/rest/v1/success_stories?select=*`);
      setSuccessStories(stories || []);
    };
    upsert().catch((err) => alert(`Error saving story: ${err instanceof Error ? err.message : err}`));
    setShowStoryForm(false);
    setEditingStory(null);
  };

  const handleDeleteStory = (id: string) => {
    if (confirm("Are you sure you want to delete this success story?")) {
      const remove = async () => {
        await supabaseRequest(`/rest/v1/success_stories?id=eq.${id}`, { method: "DELETE" });
        setSuccessStories(prev => prev.filter(s => s.id !== id));
      };
      remove().catch((err) => alert(`Error deleting story: ${err instanceof Error ? err.message : err}`));
    }
  };

  // Blog Post Handlers
  const handleSavePost = (post: BlogPost) => {
    const upsert = async () => {
      const payload = { ...post, id: post.id || Date.now().toString() };
      await supabaseRequest("/rest/v1/blog_posts", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { Prefer: "return=representation,resolution=merge-duplicates" }
      });
      const posts = await supabaseRequest<BlogPost[]>(`/rest/v1/blog_posts?select=*`);
      setBlogPosts(posts || []);
    };
    upsert().catch((err) => alert(`Error saving post: ${err instanceof Error ? err.message : err}`));
    setShowPostForm(false);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const remove = async () => {
        await supabaseRequest(`/rest/v1/blog_posts?id=eq.${id}`, { method: "DELETE" });
        setBlogPosts(prev => prev.filter(p => p.id !== id));
      };
      remove().catch((err) => alert(`Error deleting post: ${err instanceof Error ? err.message : err}`));
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #4166b2 0%, #000000 100%)' }}>
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl mb-2" style={{ color: '#0a1929' }}>Admin Panel</h1>
            <p className="text-gray-600">Sign in to manage content</p>
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

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#4166b2' }}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold" style={{ color: '#0a1929' }}>Flowbooks Admin</h1>
                <p className="text-sm text-gray-500">Content Management</p>
              </div>
            </div>
            
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("stories")}
            className={`px-6 py-3 font-medium transition-all flex items-center gap-2 ${
              activeTab === "stories"
                ? "border-b-2 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            style={activeTab === "stories" ? { borderColor: '#4166b2', color: '#4166b2' } : {}}
          >
            <TrendingUp className="w-5 h-5" />
            Success Stories ({successStories.length})
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`px-6 py-3 font-medium transition-all flex items-center gap-2 ${
              activeTab === "blog"
                ? "border-b-2 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            style={activeTab === "blog" ? { borderColor: '#4166b2', color: '#4166b2' } : {}}
          >
            <FileText className="w-5 h-5" />
            Blog Posts ({blogPosts.length})
          </button>
        </div>

        {/* Success Stories Tab */}
        {activeTab === "stories" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl" style={{ color: '#0a1929' }}>Success Stories</h2>
              <Button
                onClick={() => {
                  setEditingStory(null);
                  setShowStoryForm(true);
                }}
                className="text-white flex items-center gap-2"
                style={{ background: '#4166b2' }}
              >
                <Plus className="w-5 h-5" />
                Add Success Story
              </Button>
            </div>

            {/* Stories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story) => (
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

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setEditingStory(story);
                          setShowStoryForm(true);
                        }}
                        variant="outline"
                        className="flex-1 flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteStory(story.id)}
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

            {successStories.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No success stories yet. Add your first one!</p>
              </div>
            )}
          </div>
        )}

        {/* Blog Posts Tab */}
        {activeTab === "blog" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl" style={{ color: '#0a1929' }}>Blog Posts</h2>
              <Button
                onClick={() => {
                  setEditingPost(null);
                  setShowPostForm(true);
                }}
                className="text-white flex items-center gap-2"
                style={{ background: '#4166b2' }}
              >
                <Plus className="w-5 h-5" />
                Add Blog Post
              </Button>
            </div>

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
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
                        onClick={() => {
                          setEditingPost(post);
                          setShowPostForm(true);
                        }}
                        variant="outline"
                        className="flex-1 flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeletePost(post.id)}
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

            {blogPosts.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No blog posts yet. Create your first one!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Success Story Form Modal */}
      <AnimatePresence>
        {showStoryForm && (
          <StoryFormModal
            story={editingStory}
            onSave={handleSaveStory}
            onClose={() => {
              setShowStoryForm(false);
              setEditingStory(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Blog Post Form Modal */}
      <AnimatePresence>
        {showPostForm && (
          <BlogFormModal
            post={editingPost}
            onSave={handleSavePost}
            onClose={() => {
              setShowPostForm(false);
              setEditingPost(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Success Story Form Modal Component
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
      result: ""
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

// Blog Post Form Modal Component
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
          <div>
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

          <div className="grid md:grid-cols-2 gap-4">
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
                Read Time *
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 5 min read"
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
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Brief summary of the post"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={10}
              placeholder="Full article content (supports markdown)"
              required
            />
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
