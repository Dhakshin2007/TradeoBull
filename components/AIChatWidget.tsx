
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';

const AIChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', text: "Hi! I'm Genius, your trading assistant. Ask me anything about stocks, buying, selling, or market trends!", sender: 'ai', timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setLoading(true);

        const aiResponseText = await getChatResponse(inputValue);
        
        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: aiResponseText,
            sender: 'ai',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMsg]);
        setLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-20 md:bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center ${isOpen ? 'bg-gray-800 text-white' : 'bg-[#00d09c] text-white animate-bounce-slow'}`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} fill="currentColor" />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-32 md:bottom-24 right-6 w-[90vw] md:w-[380px] h-[500px] max-h-[60vh] md:max-h-[70vh] bg-white dark:bg-[#0B1121] rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-800 flex flex-col z-50 animate-in slide-in-from-bottom-10 zoom-in-95 overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#00d09c] p-4 flex items-center gap-3 text-white">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <Sparkles size={16} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Genius AI</h3>
                            <p className="text-[10px] opacity-90 font-medium">Always online</p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#020617]">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                                    msg.sender === 'user' 
                                    ? 'bg-[#00d09c] text-white rounded-br-none' 
                                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-slate-700 rounded-bl-none shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-gray-100 dark:border-slate-700 shadow-sm flex gap-1 items-center">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white dark:bg-[#0B1121] border-t border-gray-100 dark:border-slate-800 flex gap-2">
                        <input 
                            type="text" 
                            className="flex-1 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00d09c]"
                            placeholder="Ask about trading..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className="bg-[#00d09c] hover:bg-[#00b386] text-white p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatWidget;
