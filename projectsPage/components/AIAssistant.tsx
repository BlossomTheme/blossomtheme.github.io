
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, User, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      let themesContext = "a collection of open source themes";
      
      // Attempt to fetch themes context with a clean simple fetch
      try {
        const themesRes = await fetch(`${API_BASE_URL}/themes`);
        if (themesRes.ok) {
          const themesData = await themesRes.json();
          if (Array.isArray(themesData)) {
            themesContext = themesData.map((t: any) => `${t.name} for ${t.software}`).join(', ');
          }
        }
      } catch (apiErr) {
        console.warn('AI context fetch failed, using default description.', apiErr);
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are Blossom Sensei, the AI mascot for BlossomTheme organization. 
          You help users choose themes and answer questions about them.
          Known available themes are: ${themesContext}.
          Always respond in a helpful, friendly, manga-character style. Use terms like 'Bloom bright!', 'Sensei is here!'. 
          Keep responses concise but energetic. If the user asks about themes you don't recognize, explain that Sensei is still learning new patterns!`,
        }
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.text || "Sorry, Sensei got distracted! Try again." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: "An error occurred with my internal circuits! Make sure you're connected to the network." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white border-4 border-black w-80 md:w-96 h-[500px] flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="bg-purple-600 p-4 border-b-4 border-black flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-black">
                <Sparkles size={16} className="text-purple-600" />
              </div>
              <h3 className="manga-font text-white text-xl">BLOSSOM SENSEI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1 rounded transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <p className="font-bold italic">"Ask Sensei about any theme!"</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 border-2 border-black rounded-lg text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                  m.role === 'user' ? 'bg-pink-400 text-white' : 'bg-white text-black'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex gap-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t-4 border-black flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Blossom Sensei..."
              className="flex-grow p-2 border-2 border-black rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-purple-600 p-2 text-white border-2 border-black rounded-md hover:bg-purple-700 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white w-16 h-16 rounded-full border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-1 active:translate-y-0 transition-all group"
        >
          <MessageSquare className="group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 border-2 border-black rounded-full animate-pulse"></div>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
