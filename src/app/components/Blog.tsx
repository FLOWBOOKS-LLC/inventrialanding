import { motion } from "motion/react";
import { Calendar, Clock, User, ArrowRight, TrendingUp, BookOpen, Search, Tag, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { BlogArticle } from "@/app/components/BlogArticle";
import { blogCategories } from "@/app/constants/blogCategories";
import { supabaseRequest, supabaseUrl, supabaseAnonKey } from "@/app/lib/supabaseClient";

interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  authorImage?: string;
  featured?: boolean;
}

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return blogPosts;
    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [blogPosts, selectedCategory]);

  const categoriesWithCounts = useMemo(() => {
    return blogCategories.map((category) => {
      if (category.name === "All") {
        return { ...category, count: blogPosts.length };
      }
      return {
        ...category,
        count: blogPosts.filter((post) => post.category === category.name).length,
      };
    });
  }, [blogPosts]);

  // Load blog posts from localStorage first (same storage the Admin dashboard writes to)
  useEffect(() => {
    const savedPosts = localStorage.getItem("flowbooks_blog_posts");
    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts) as BlogPost[];
        setBlogPosts(parsed);
        if (parsed.length > 0) {
          setFeaturedPost({ ...parsed[0], featured: true });
        }
      } catch (err) {
        console.warn("Failed to load cached blog posts", err);
      }
    }

    // Ensure loading clears even if only cached data is present
    setLoadingPosts(false);
  }, []);

  // Load blog posts from Supabase
  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase not configured; showing cached blog posts only");
      setLoadingPosts(false);
      return;
    }

    const abort = new AbortController();
    const load = async () => {
      setLoadingPosts(true);
      try {
        const posts = await supabaseRequest<BlogPost[]>(`/rest/v1/blog_posts?select=*`, { signal: abort.signal });
        setBlogPosts(posts || []);
        if (posts && posts.length > 0) {
          setFeaturedPost({ ...posts[0], featured: true });
        }
      } catch (err) {
        console.warn("Failed to load blog posts", err);
      } finally {
        setLoadingPosts(false);
      }
    };
    load();
    return () => abort.abort();
  }, []);

  // If an article is selected, show the full article view
  if (selectedArticle) {
    return <BlogArticle article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  const categories = categoriesWithCounts;

  const trendingTopics = [
    { name: "AI Automation", posts: 24 },
    { name: "Tax Planning", posts: 18 },
    { name: "Financial Reporting", posts: 15 },
    { name: "Cloud Accounting", posts: 12 },
    { name: "Compliance", posts: 10 }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 20%, #1a2942 50%, #4166b2 100%)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 right-10 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{ background: '#1594e3' }}
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(#1594e3 1px, transparent 1px), linear-gradient(90deg, #1594e3 1px, transparent 1px)',
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
            >
              <BookOpen className="w-5 h-5 text-cyan-300" />
              <span className="text-white text-sm font-medium">Latest insights and updates</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl lg:text-3xl mb-8 tracking-tight leading-tight"
              style={{
                background: 'linear-gradient(to bottom, #ffffff 0%, #e0f2fe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              flowbooks Blog
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Insights, tips, and updates from the world of modern accounting
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-2 py-2 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-white/20 focus:border-white focus:outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 lg:h-24" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,50 C360,90 720,10 1080,50 C1260,70 1350,80 1440,90 L1440,100 L0,100 Z" fill="white" fillOpacity="0.1"/>
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1350,90 1440,100 L1440,100 L0,100 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="w-5 h-5" style={{ color: '#1594e3' }} />
                <span className="text-sm font-medium" style={{ color: '#1594e3' }}>Featured Article</span>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-80 lg:h-auto">
                    <img 
                      src={featuredPost?.image}
                      alt={featuredPost?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-4 py-2">
                        <Tag className="w-4 h-4" style={{ color: '#1594e3' }} />
                        <span className="text-sm font-medium" style={{ color: '#1594e3' }}>{featuredPost?.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl lg:text-4xl mb-6 leading-tight" style={{ color: '#0a1929' }}>
                      {featuredPost?.title}
                    </h2>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {featuredPost?.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        {featuredPost?.authorImage && (
                          <img 
                            src={featuredPost?.authorImage}
                            alt={featuredPost?.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <span>{featuredPost?.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost?.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost?.readTime}</span>
                      </div>
                    </div>

                    <Button 
                      size="lg"
                      className="self-start"
                      style={{ background: '#1594e3' }}
                      onClick={() => setSelectedArticle(featuredPost)}
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'border-transparent text-white shadow-lg'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                  style={{
                    background: selectedCategory === category.name ? '#1594e3' : 'white'
                  }}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className={`ml-2 text-sm ${selectedCategory === category.name ? 'text-white/80' : 'text-gray-500'}`}>
                    ({category.count})
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl lg:text-4xl mb-2" style={{ color: '#0a1929' }}>Latest Articles</h2>
              <p className="text-gray-600">Stay updated with our newest content</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-white/95 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium" style={{ color: '#1594e3' }}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl mb-3 leading-tight group-hover:text-current transition-colors" style={{ color: '#0a1929' }}>
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {post.authorImage ? (
                        <img 
                          src={post.authorImage}
                          alt={post.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
                          {post.author
                            .split(" ")
                            .map((p) => p[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      )}
                      <span className="text-xs text-gray-600">{post.author}</span>
                    </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="mt-4">
                      <button className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all" style={{ color: '#1594e3' }} onClick={() => setSelectedArticle(post)}>
                        Read More
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {loadingPosts && (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-600">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p>Loading articles...</p>
              </div>
            )}

            {!loadingPosts && filteredPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-gray-500">
                <BookOpen className="w-8 h-8 text-gray-400" />
                <p>Articles are being curated. Check back soon.</p>
              </div>
            )}

            {/* Load More Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Button 
                size="lg"
                variant="outline"
                className="border-2 px-8"
                style={{ borderColor: '#1594e3', color: '#1594e3' }}
              >
                Load More Articles
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Topics Sidebar Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl mb-4" style={{ color: '#0a1929' }}>Trending Topics</h2>
              <p className="text-gray-600">Explore popular subjects in accounting and finance</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1594e3 0%, #0c7bc4 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '';
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-2xl group-hover:text-white transition-colors" style={{ color: '#1594e3' }}>
                      {topic.posts}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors">
                    {topic.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1929 0%, #1a2942 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(21, 148, 227, 0.2)' }}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl lg:text-3xl text-white mb-6">
              Never Miss an Update
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Subscribe to our newsletter and get the latest insights delivered to your inbox every week
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 focus:border-white focus:outline-none text-white placeholder-white/60"
              />
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 px-8 whitespace-nowrap"
                style={{ color: '#1594e3' }}
              >
                Subscribe Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <p className="text-white/60 text-sm mt-6">
              Join 50,000+ subscribers. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
