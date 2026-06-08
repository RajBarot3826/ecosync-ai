import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { generateSustainabilityTip } from '../lib/gemini';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function AICoach() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hi! I am your EcoSync AI Coach. I noticed you logged a lot of driving yesterday. How can I help you reduce your footprint today?', sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const context = messages.map(m => `${m.sender}: ${m.text}`).join('\n') + `\nuser: ${input}`;
    const aiResponse = await generateSustainabilityTip(context);

    const aiMsg: Message = { id: (Date.now() + 1).toString(), text: aiResponse, sender: 'ai' };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="container mt-2">
      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '50%' }}>
             <Bot color="var(--primary)" size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Gemini AI Coach</h3>
            <p style={{ color: 'var(--primary)', fontSize: '0.85rem', margin: 0 }}>Online • Ready to help</p>
          </div>
        </div>

        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="message ai" style={{ opacity: 0.7 }}>
                Thinking...
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ask about reducing emissions, eco-friendly alternatives..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn-primary" onClick={handleSend} disabled={loading} style={{ padding: '0.8rem 1.5rem', borderRadius: '12px' }}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
