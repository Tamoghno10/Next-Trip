
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your travel assistant. How can I help you plan your trip today? I can help with flights, hotels, trains, buses, and holiday packages!',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('flight') || lowerMessage.includes('fly')) {
      return 'I can help you find the best flights! What\'s your departure city and destination? Also, when would you like to travel?';
    } else if (lowerMessage.includes('hotel') || lowerMessage.includes('stay')) {
      return 'Great! I can assist with hotel bookings. Which city are you looking to stay in and for how many nights?';
    } else if (lowerMessage.includes('train') || lowerMessage.includes('railway')) {
      return 'Perfect! I can help you find train bookings. Which stations would you like to travel between? I can show you options for different classes like AC, sleeper, and more!';
    } else if (lowerMessage.includes('bus') || lowerMessage.includes('coach')) {
      return 'Excellent! I can help you find bus tickets. Which cities are you traveling between? I can show you AC sleeper, semi-sleeper, and regular bus options!';
    } else if (lowerMessage.includes('package') || lowerMessage.includes('tour')) {
      return 'Holiday packages are perfect for a complete travel experience! Are you interested in beach destinations, hill stations, or cultural tours?';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('cheap')) {
      return 'I understand you\'re looking for the best deals! Our platform compares prices from multiple providers. Would you like me to help you find budget-friendly options for flights, hotels, trains, buses, or packages?';
    } else if (lowerMessage.includes('goa') || lowerMessage.includes('kerala') || lowerMessage.includes('rajasthan')) {
      return `${lowerMessage.charAt(0).toUpperCase() + lowerMessage.slice(1)} is a fantastic destination! We have great packages and deals available. Would you like me to show you flight + hotel combos, train options, bus routes, or complete tour packages?`;
    } else if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
      return 'I can help you with cancellations and refunds. Please provide your booking reference number, and I\'ll check the cancellation policy for your booking.';
    } else if (lowerMessage.includes('ac') || lowerMessage.includes('sleeper') || lowerMessage.includes('class')) {
      return 'Great question about travel classes! For trains, we offer Sleeper, AC 3-Tier, AC 2-Tier, and AC 1st Class. For buses, we have AC Sleeper, AC Semi-Sleeper, Non-AC Sleeper, and Non-AC Seater options. Which type of journey are you planning?';
    } else if (lowerMessage.includes('station') || lowerMessage.includes('platform')) {
      return 'I can help you with train station information! We cover major stations like New Delhi (NDLS), Mumbai Central (MMCT), Bangalore City (SBC), Chennai Central (MAS), and many more. Which route are you looking for?';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! Welcome to TravelEase. I\'m here to help you with flights, hotels, trains, buses, holiday packages, and any travel-related questions. What are you planning today?';
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! I\'m always here to help make your travel planning easier. Is there anything else you\'d like to know about flights, hotels, trains, buses, or packages?';
    } else {
      return 'I\'m here to help with all your travel needs! You can ask me about flights, hotels, trains, buses, holiday packages, destinations, pricing, or any other travel-related questions. What would you like to know?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Travel Assistant
              </CardTitle>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`max-w-[200px] p-3 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about flights, hotels, trains, buses..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIChatBox;
