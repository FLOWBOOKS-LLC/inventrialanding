import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Heart, MessageCircle, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useEffect, useMemo, useState } from "react";

interface BlogArticleProps {
  article: {
    id: number | string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: string;
  };
  onBack: () => void;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}

export function BlogArticle({ article, onBack }: BlogArticleProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(142);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const commentsStorageKey = useMemo(() => `flowbooks_comments_${article.id}`, [article.id]);

  useEffect(() => {
    const saved = localStorage.getItem(commentsStorageKey);
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch {
        setComments([]);
      }
    }
  }, [commentsStorageKey]);

  const saveComments = (next: Comment[]) => {
    setComments(next);
    localStorage.setItem(commentsStorageKey, JSON.stringify(next));
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: commentName || "Anonymous",
        avatar: (commentName || "Anonymous").slice(0, 2).toUpperCase(),
        date: "Just now",
        content: newComment,
        likes: 0
      };
      saveComments([comment, ...comments]);
      setNewComment("");
      setCommentName("");
      setCommentEmail("");
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail.trim()) {
      // Handle subscription
      console.log("Subscribe email:", subscribeEmail);
      setSubscribeEmail("");
      alert("Thank you for subscribing!");
    }
  };

  // Full article content sections
  const articleContent = [
    {
      heading: "Understanding the Fundamentals",
      paragraphs: [
        "In today's rapidly evolving business landscape, understanding the core principles of financial management has become more crucial than ever. Modern accounting software has revolutionized how businesses track, analyze, and report their financial data, making it essential for business owners to stay informed about the latest tools and best practices.",
        "The shift towards cloud-based solutions has democratized access to sophisticated financial tools that were once available only to large enterprises. Small and medium-sized businesses can now leverage the same powerful analytics and reporting capabilities to make data-driven decisions and maintain competitive advantages in their respective markets."
      ]
    },
    {
      heading: "Key Strategies for Implementation",
      paragraphs: [
        "Implementing new accounting software requires careful planning and a structured approach. The first step is to conduct a thorough assessment of your current processes and identify areas where automation can provide the most significant impact. This includes evaluating your existing workflows, pain points, and integration requirements with other business systems.",
        "Once you've identified your needs, it's essential to involve key stakeholders from different departments early in the process. Their input will be invaluable in ensuring the chosen solution addresses the unique challenges of your organization. Consider running pilot programs with select teams before rolling out the software company-wide to identify and address any potential issues."
      ]
    },
    {
      heading: "Best Practices and Tips",
      paragraphs: [
        "To maximize the value of your accounting software investment, establish clear protocols for data entry and maintenance. Consistency in how financial information is recorded ensures accuracy in reporting and makes it easier to identify trends and anomalies. Regular training sessions help keep your team updated on new features and best practices.",
        "Don't underestimate the importance of data security and backup procedures. Implement robust access controls to ensure that sensitive financial information is only accessible to authorized personnel. Regular backups and disaster recovery plans provide peace of mind and protect your business from potential data loss."
      ]
    },
    {
      heading: "Measuring Success and ROI",
      paragraphs: [
        "Tracking the return on investment from your accounting software goes beyond simple cost savings. Consider metrics such as time saved on manual processes, reduction in errors, improved financial visibility, and faster decision-making capabilities. Many businesses find that the indirect benefits, such as improved customer satisfaction and employee productivity, are just as valuable as the direct cost savings.",
        "Establish baseline metrics before implementation and regularly review progress against these benchmarks. This data-driven approach helps justify the investment to stakeholders and identifies areas where additional training or process adjustments may be needed to fully realize the software's potential."
      ]
    }
  ];

  const relatedArticles = useMemo(() => {
    const savedPosts = localStorage.getItem("flowbooks_blog_posts");
    if (!savedPosts) return [];
    try {
      const posts = JSON.parse(savedPosts) as BlogArticleProps["article"][];
      return posts
        .filter((p) => p.id?.toString() !== article.id?.toString())
        .slice(0, 3);
    } catch {
      return [];
    }
  }, [article.id]);

  const authorInitials = useMemo(() => {
    return article.author
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [article.author]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch {
      prompt("Copy this link:", url);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header with back button */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Category badge on image */}
        <div className="absolute top-8 left-8">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white backdrop-blur-md border border-white/30" style={{ background: 'rgba(21, 148, 227, 0.9)' }}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-3xl mb-6 leading-tight" style={{ color: '#0a1929' }}>
              {article.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium" style={{ background: '#1594e3' }}>
                  {authorInitials}
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#0a1929' }}>{article.author}</p>
                  <p className="text-sm text-gray-500">Senior Financial Writer</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleLike}
                  variant="outline"
                  className={`flex items-center gap-2 transition-all ${liked ? 'border-red-500 bg-red-50' : 'hover:border-red-500 hover:bg-red-50'}`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className={liked ? 'text-red-500' : ''}>{likeCount}</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{comments.length}</span>
                </Button>

                <Button
                  onClick={() => setBookmarked(!bookmarked)}
                  variant="outline"
                  className={`flex items-center gap-2 transition-all ${bookmarked ? 'border-blue-500 bg-blue-50' : ''}`}
                >
                  <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
                </Button>
              </div>

              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
                Copy link
              </Button>
            </div>

            {/* Article excerpt/introduction */}
            <div className="mb-12 p-6 bg-blue-50 rounded-2xl border-l-4" style={{ borderColor: '#1594e3' }}>
              <p className="text-lg text-gray-700 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            {/* Article body */}
            <div className="prose prose-lg max-w-none">
              {articleContent.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-12"
                >
                  <h2 className="text-3xl mb-6" style={{ color: '#0a1929' }}>
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Call to action box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-16 p-8 rounded-3xl text-white text-center"
              style={{ background: 'linear-gradient(135deg, #1594e3 0%, #0c7bc4 100%)' }}
            >
              <h3 className="text-2xl mb-4">Ready to Transform Your Accounting?</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Experience the power of modern accounting software with flowbooks. Start your free 14-day trial today.
              </p>
              <Button size="lg" className="bg-white hover:bg-gray-100" style={{ color: '#1594e3' }}>
                Start Free Trial
              </Button>
            </motion.div>

            {/* Tags */}
            <div className="mb-12 pb-12 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {['Accounting', 'Finance', 'Business Strategy', 'Software', 'Best Practices'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl mb-6" style={{ color: '#0a1929' }}>Related Articles</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map((related, index) => (
                    <motion.div
                      key={related.id}
                      whileHover={{ y: -4 }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <span className="text-xs font-medium mb-3 inline-block" style={{ color: '#1594e3' }}>
                        {related.category}
                      </span>
                      <h4 className="text-lg mb-3 leading-tight" style={{ color: '#0a1929' }}>
                        {related.title}
                      </h4>
                      <p className="text-sm text-gray-500">{related.readTime}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div id="comments-section" className="scroll-mt-24">
              <h3 className="text-3xl mb-8" style={{ color: '#0a1929' }}>
                Comments ({comments.length})
              </h3>

              {/* Comment form */}
              <div className="mb-12 p-8 bg-gray-50 rounded-3xl border border-gray-200">
                <h4 className="text-xl mb-6" style={{ color: '#0a1929' }}>Leave a Comment</h4>
                <form onSubmit={handleSubmitComment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0a1929' }}>
                      Your Comment *
                    </label>
                    <textarea
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors resize-none bg-white"
                      placeholder="Share your thoughts..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="text-white"
                    style={{ background: '#1594e3' }}
                  >
                    Post Comment
                  </Button>
                </form>

                {/* Optional Subscribe Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    📧 Want more insights like this? Subscribe to our newsletter for weekly updates!
                  </p>
                  <form onSubmit={handleSubscribe} className="flex gap-3">
                    <input
                      type="email"
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                      placeholder="Your email address (optional)"
                    />
                    <Button 
                      type="submit"
                      size="sm"
                      className="text-white whitespace-nowrap"
                      style={{ background: '#1594e3' }}
                    >
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>

              {/* Comments list */}
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0" style={{ background: '#1594e3' }}>
                        {comment.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium" style={{ color: '#0a1929' }}>{comment.author}</p>
                            <p className="text-sm text-gray-500">{comment.date}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {comment.content}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{comment.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-blue-600"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
