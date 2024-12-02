"use client";

import { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Offer, Message } from '@/types/offer';

interface SellerChatProps {
  offer: Offer;
  onBack: () => void;
}

export default function SellerChat({ offer, onBack }: SellerChatProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(offer.messages);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      senderId: 'buyer', // Hardcoded for demo
      createdAt: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src={offer.sellerAvatar} />
          <AvatarFallback>{offer.sellerName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{offer.sellerName}</h2>
          <p className="text-sm text-muted-foreground">
            ${offer.price.toLocaleString()} offer
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'buyer' ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`p-3 max-w-[80%] ${
                  message.senderId === 'buyer'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <time className="text-xs opacity-70 mt-1 block">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </time>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}