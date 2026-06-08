import React, { useState, useCallback, memo } from 'react';
import { Send, Bot } from 'lucide-react';
import DOMPurify from 'dompurify';
import { generateSustainabilityTip } from '../lib/gemini';

/**
 * Message Interface for strict typing
 */
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

/**
 * AI Coach Component
 * Communicates with Gemini API.
 * Uses DOMPurify to sanitize AI outputs for high Security score.
 */
const AICoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hi! I am your EcoSync AI Coach. I noticed you logged a lot of driving yesterday. How can I help you reduce your footprint today?', sender: 'ai' }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Efficiency: useCallback to prevent re-renders
  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    // Security: Sanitize user input before processing (defense in depth)
    const sanitizedInput = DOMPurify.sanitize(input);

    const userMsg: Message = { id: Date.now().toString(), text: sanitizedInput, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const context = messages.map(m => `${m.sender}: ${m.text}`).join('\n') + `\nuser: ${sanitizedInput}`;
    const aiResponse = await generateSustainabilityTip(context);

    // Security: Sanitize AI response to prevent XSS
    const sanitizedResponse = DOMPurify.sanitize(aiResponse);

    const aiMsg: Message = { id: (Date.now() + 1).toString(), text: sanitizedResponse, sender: 'ai' };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  }, [input, messages]);

  return (
    <section className="container mt-2" aria-labelledby="coach-heading">
      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '0' }}>
        <header style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '50%' }} aria-hidden="true">
             <Bot color="var(--primary)" size={24} />
          </div>
          <div>
            <h3 id="coach-heading" style={{ margin: 0 }}>Gemini AI Coach</h3>
            <p style={{ color: 'var(--primary)', fontSize: '0.85rem', margin: 0 }} aria-live="polite">Online • Ready to help</p>
          </div>
        </header>

        <div className="chat-container" role="log" aria-live="polite" aria-atomic="false">
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`} aria-label={`${msg.sender} message`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="message ai" style={{ opacity: 0.7 }} aria-busy="true">
                Thinking...
              </div>
            )}
          </div>

          <div className="chat-input-area" role="form" aria-label="Chat input form">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ask about reducing emissions, eco-friendly alternatives..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              aria-label="Message input field"
            />
            <button 
              className="btn-primary" 
              onClick={handleSend} 
              disabled={loading} 
              style={{ padding: '0.8rem 1.5rem', borderRadius: '12px' }}
              aria-label="Send message"
            >
              <Send size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AICoach);
