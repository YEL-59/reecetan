import React, { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import aiChatIcon from '@/assets/aichat.png';

const AIChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'incoming',
            text: "Hello! I'm here to help you with your questions. How can I assist you today?",
            timestamp: 'Just now'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            type: 'outgoing',
            text: inputMessage,
            timestamp: 'Just now'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');

        // Simulate AI response (you can replace this with actual API call)
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                type: 'incoming',
                text: "Thank you for your message! I'm here to help. This is a demo response - you can integrate with your actual AI service here.",
                timestamp: 'Just now'
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Open AI Chat"
            >
                <img src={aiChatIcon} alt="AI Chat" className="w-8 h-8" />
            </button>

            {/* Floating Chat Modal */}
            {isOpen && (
                <div className="fixed bottom-20 right-4 sm:right-6 z-50">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Chat Window */}
                    <div className="relative w-72 sm:w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col animate-in slide-in-from-bottom-2 duration-300">
                        {/* Header */}
                        <div className="bg-blue-600 text-white p-4 flex items-center justify-between flex-shrink-0 rounded-t-xl">
                            <div className="flex items-center gap-2">
                                <Bot className="w-5 h-5" />
                                <div>
                                    <h3 className="font-semibold">AI Tutor Chat</h3>
                                    <p className="text-xs text-blue-100">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-blue-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs px-4 py-2 rounded-lg ${message.type === 'outgoing'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        <p className={`text-xs mt-1 ${message.type === 'outgoing' ? 'text-blue-100' : 'text-gray-500'
                                            }`}>
                                            {message.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t bg-white flex-shrink-0 rounded-b-xl">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Arrow pointing to chat button */}
                        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatBot;
