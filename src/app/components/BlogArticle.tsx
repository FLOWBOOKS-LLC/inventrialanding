import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Heart, MessageCircle, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { supabaseRequest } from "@/app/lib/supabaseClient";

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
    content?: string;
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
  post_id?: string | number;
}

export function BlogArticle({ article, onBack }: BlogArticleProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const normalizeComments = (rows: any[] | null | undefined): Comment[] => {
    if (!rows) return [];
    return rows.map((row) => ({
      ...row,
      date: row.date ?? (row.created_at ? new Date(row.created_at).toLocaleDateString("en-US") : "Just now"),
      likes: row.likes ?? 0,
      id: row.id ?? row.created_at ?? Math.random()
    }));
  };

  useEffect(() => {
    const abort = new AbortController();
    const loadComments = async () => {
      try {
        const data = await supabaseRequest<Comment[]>(
          `/rest/v1/comments?select=*&post_id=eq.${article.id}`,
          { signal: abort.signal }
        );
        setComments(normalizeComments(data));
      } catch (err) {
        console.warn("Failed to load comments", err);
        setComments([]);
      }
    };
    loadComments();
    return () => abort.abort();
  }, [article.id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: commentName || "Anonymous",
      avatar: (commentName || "Anonymous").slice(0, 2).toUpperCase(),
      date: "Just now",
      content: newComment,
      likes: 0
    };

    const save = async () => {
      const payload: any = {
        author: comment.author,
        avatar: comment.avatar,
        content: comment.content,
        likes: comment.likes,
        post_id: article.id,
        email: commentEmail || null
      };

      await supabaseRequest("/rest/v1/comments", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { Prefer: "return=representation" }
      });

      const data = await supabaseRequest<Comment[]>(`/rest/v1/comments?select=*&post_id=eq.${article.id}`);
      setComments(normalizeComments(data));
    };

    save().catch((err) => alert(`Error saving comment: ${err instanceof Error ? err.message : err}`));
    setNewComment("");
    setCommentName("");
    setCommentEmail("");
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

  const contentBlocks = useMemo(() => {
    const body = article.content ?? "";
    if (!body.trim()) return [];
    return body
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);
  }, [article.content]);

  const [relatedArticles, setRelatedArticles] = useState<BlogArticleProps["article"][]>([]);

  useEffect(() => {
    const abort = new AbortController();
    const loadRelated = async () => {
      try {
        const posts = await supabaseRequest<BlogArticleProps["article"][]>(
          `/rest/v1/blog_posts?select=*&id=neq.${article.id}`,
          { signal: abort.signal }
        );
        setRelatedArticles((posts || []).slice(0, 3));
      } catch (err) {
        console.warn("Failed to load related articles", err);
        setRelatedArticles([]);
      }
    };
    loadRelated();
    return () => abort.abort();
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
              {contentBlocks.length > 0 ? (
                contentBlocks.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="text-gray-700 leading-relaxed mb-6 text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))
              ) : (
                <p className="text-gray-500">No content yet.</p>
              )}
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

            <div className="mb-12 pb-12 border-b border-gray-200"></div>

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
