"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Image as ImageIcon, Bot, User, X } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  attachedImage?: string;
}

const Agent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  // We'll track loading state directly in the handleImageUpload function
  // without needing a separate state variable
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    // Using requestAnimationFrame to ensure the DOM has been updated
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '' && !previewImage) return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      attachedImage: previewImage || undefined
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setPreviewImage(null);

    // Simulate AI response (in a real app, this would be an API call)
    const timerId = setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I received your message. How can I assist you further?',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    // Clean up the timeout if the component unmounts
    return () => clearTimeout(timerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Image is loading (we could add a loading indicator here in the future)
    
    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      // Image loading complete
    };
    reader.readAsDataURL(file);
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removePreviewImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex h-[500px] flex-col">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto rounded-lg bg-[#0a1128]/40 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                    : 'bg-[#111c3d] text-gray-200'
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-[#0d1530]">
                    {message.sender === 'user' 
                      ? <User size={12} className="text-blue-400" /> 
                      : <Bot size={12} className="text-indigo-400" />
                    }
                  </div>
                  <span className="text-xs font-medium">
                    {message.sender === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
                
                {/* Display attached image if any */}
                {message.attachedImage && (
                  <div className="mt-2">
                    <Image 
                      src={message.attachedImage} 
                      alt="Attached image" 
                      className="max-h-60 rounded-lg object-contain"
                      width={300}
                      height={200}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Image preview */}
      {previewImage && (
        <div className="mt-2 flex items-center gap-2">
          <div className="relative size-16 overflow-hidden rounded-md">
            <Image 
              src={previewImage} 
              alt="Preview image" 
              className="size-full object-cover"
              width={64}
              height={64}
            />
            <button 
              onClick={removePreviewImage}
              className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <X size={12} />
            </button>
          </div>
          <span className="text-xs text-gray-400">Image attached</span>
        </div>
      )}
      
      {/* Input area */}
      <div className="mt-4 flex items-end gap-2">
        <button
          onClick={handleImageButtonClick}
          className="flex size-10 items-center justify-center rounded-full bg-[#111c3d] text-blue-400 transition-colors hover:bg-[#1a2747]"
        >
          <ImageIcon size={18} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <div className="relative flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="h-auto max-h-32 min-h-[40px] w-full resize-none rounded-2xl bg-[#111c3d] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={1}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={input.trim() === '' && !previewImage}
          className={`flex size-10 items-center justify-center rounded-full transition-colors ${
            input.trim() === '' && !previewImage
              ? 'bg-[#111c3d] text-gray-500'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Agent;
