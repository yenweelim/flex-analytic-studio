
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you with your analytics dashboard today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you want to: "${inputValue}". I can help you analyze your data, create new visualizations, or explain chart insights. What specific aspect would you like me to focus on?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Chat Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 shadow-xl z-50 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      style={{ 
        backgroundColor: 'var(--background-1)', 
        borderLeft: `1px solid var(--outline-1)` 
      }}>
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ 
            borderColor: 'var(--outline-1)',
            backgroundColor: 'var(--mina-background)'
          }}
        >
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" style={{ color: 'var(--purple-primary)' }} />
            <h3 
              className="font-semibold"
              style={{ 
                color: 'var(--purple-primary)',
                fontFamily: 'var(--font-h2)',
                fontWeight: 'var(--font-h2-weight)',
                fontSize: 'var(--font-h1-size)'
              }}
            >
              AI Assistant
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 hover:bg-mina-bg"
          >
            <X className="h-4 w-4" style={{ color: 'var(--purple-primary)' }} />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 h-[calc(100vh-140px)] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === 'bot' && (
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--mina-background)' }}
                  >
                    <Bot className="h-3 w-3" style={{ color: 'var(--purple-primary)' }} />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-lg p-3 text-sm"
                  )}
                  style={{
                    backgroundColor: message.sender === 'user' 
                      ? 'var(--purple-primary)' 
                      : 'var(--mina-background)',
                    color: message.sender === 'user' 
                      ? 'var(--font-alternate)' 
                      : 'var(--font-primary)',
                    fontFamily: 'var(--font-body-1)',
                    fontWeight: 'var(--font-body-1-weight)',
                    fontSize: 'var(--font-body-1-size)'
                  }}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--purple-primary)' }}
                  >
                    <User className="h-3 w-3" style={{ color: 'var(--font-alternate)' }} />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div 
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--mina-background)' }}
                >
                  <Bot className="h-3 w-3" style={{ color: 'var(--purple-primary)' }} />
                </div>
                <div 
                  className="rounded-lg p-3 text-sm"
                  style={{ backgroundColor: 'var(--mina-background)' }}
                >
                  <div className="flex space-x-1">
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: 'var(--purple-primary)' }}
                    ></div>
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce" 
                      style={{ 
                        backgroundColor: 'var(--purple-primary)',
                        animationDelay: '0.1s' 
                      }}
                    ></div>
                    <div 
                      className="w-2 h-2 rounded-full animate-bounce" 
                      style={{ 
                        backgroundColor: 'var(--purple-primary)',
                        animationDelay: '0.2s' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div 
          className="p-4 border-t"
          style={{ borderColor: 'var(--outline-1)' }}
        >
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your dashboard..."
              className="flex-1"
              style={{ 
                borderColor: 'var(--outline-1)',
                backgroundColor: 'var(--background-1)',
                color: 'var(--font-primary)'
              }}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              style={{
                backgroundColor: 'var(--purple-primary)',
                color: 'var(--font-alternate)'
              }}
              className="hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
