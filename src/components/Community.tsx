import { useState, useEffect, memo } from 'react';
import { Heart, MessageSquare, Send, Share2, Award, User } from 'lucide-react';
import { getPosts, updatePosts } from '../lib/state';
import type { Post } from '../lib/state';

/**
 * Community Module Component
 * Fulfills the hackathon requirement: "Community Module"
 */
const Community = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostText, setNewPostText] = useState<string>('');
  const [newPostSavings, setNewPostSavings] = useState<string>('');
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const savings = parseFloat(newPostSavings) || 0;
    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: 'You (Eco Warrior)',
      avatar: '', // Empty means show placeholder icon
      role: 'Local Champion',
      content: newPostText,
      emissionsSaved: savings,
      likes: 0,
      liked: false,
      comments: [],
      timestamp: 'Just now'
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    updatePosts(updated);
    setNewPostText('');
    setNewPostSavings('');
  };

  const handleLike = (id: string) => {
    const updated = posts.map(post => {
      if (post.id === id) {
        const liked = !post.liked;
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    });
    setPosts(updated);
    updatePosts(updated);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId] || '';
    if (!text.trim()) return;

    const updated = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, `You: ${text}`]
        };
      }
      return post;
    });

    setPosts(updated);
    updatePosts(updated);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <section className="container mt-2" aria-labelledby="community-heading">
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        <header className="glass-panel text-center" style={{ marginBottom: '2rem' }}>
          <h1 id="community-heading" style={{ fontSize: '3rem' }}>Community Hub</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Connect with other climate heroes, share your daily impact, and inspire collective action.
          </p>
        </header>

        {/* Share Impact Form */}
        <article className="glass-panel" style={{ marginBottom: '2rem' }}>
          <h3>Share Your Impact</h3>
          <form onSubmit={handleCreatePost} style={{ marginTop: '1rem' }} aria-label="Share post form">
            <div className="form-group">
              <textarea
                className="form-control"
                style={{ resize: 'vertical', minHeight: '80px', fontFamily: 'inherit' }}
                placeholder="What eco-friendly action did you take today? Let the community know!"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                required
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="form-group" style={{ margin: 0, flex: 1 }}>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className="form-control"
                  placeholder="CO2 saved (in kg) - optional"
                  value={newPostSavings}
                  onChange={(e) => setNewPostSavings(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '1rem 2rem' }}>
                Post Feed
              </button>
            </div>
          </form>
        </article>

        {/* Feed Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {posts.map(post => (
            <article key={post.id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {post.avatar ? (
                    <img 
                      src={post.avatar} 
                      alt={post.author} 
                      style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                    />
                  ) : (
                    <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--primary-glow)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={20} color="var(--primary)" />
                    </div>
                  )}
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{post.author}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.role} • {post.timestamp}</span>
                  </div>
                </div>
                {post.emissionsSaved > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.2)', padding: '0.3rem 0.6rem', borderRadius: '12px', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <Award size={14} /> -{post.emissionsSaved} kg CO2
                  </div>
                )}
              </header>

              <p style={{ fontSize: '0.98rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{post.content}</p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '0.75rem 0', marginTop: '1.5rem', marginBottom: '1rem' }}>
                <button 
                  onClick={() => handleLike(post.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: post.liked ? 'var(--danger)' : 'var(--text-muted)', transition: 'color 0.2s' }}
                >
                  <Heart size={18} fill={post.liked ? 'var(--danger)' : 'none'} />
                  <span>{post.likes} Likes</span>
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <MessageSquare size={18} />
                  <span>{post.comments.length} Comments</span>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.15)', borderRadius: '10px', padding: post.comments.length > 0 ? '1rem' : '0' }}>
                {post.comments.map((comment, index) => (
                  <div key={index} style={{ fontSize: '0.88rem', borderBottom: index < post.comments.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', paddingBottom: index < post.comments.length - 1 ? '0.5rem' : '0', paddingTop: index > 0 ? '0.5rem' : '0' }}>
                    {comment}
                  </div>
                ))}

                {/* Add Comment Input */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', padding: post.comments.length === 0 ? '0.5rem' : '0' }}>
                  <input
                    type="text"
                    className="form-control"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: '8px' }}
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                  />
                  <button 
                    onClick={() => handleCommentSubmit(post.id)}
                    className="btn-primary" 
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Community);
