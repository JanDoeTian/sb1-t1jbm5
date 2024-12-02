'use client';

import { useState } from 'react';
import { Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsTyping(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Sending message:', input);
    setInput('');
    setIsTyping(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        console.log('Uploaded file:', file.name);
        setIsUploading(false);
      }, 1000);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary">
              What do you want to buy today?
            </h1>
            <p className="text-lg text-muted-foreground">
              Describe what you're looking for and let our AI help you find the
              perfect match
            </p>
          </div>
          <div className="p-6 border-t bg-background/50 backdrop-blur-sm">
            <div className="max-w-2xl mx-auto">
              <Card className="p-2">
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className={`relative ${isUploading ? 'opacity-50' : ''}`}
                      disabled={isUploading}
                      onClick={() =>
                        document.getElementById('image-upload')?.click()
                      }
                    >
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ImageIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe what you're looking for..."
                    className="flex-1 resize-none"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="shrink-0"
                    disabled={!input.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {isTyping && (
            <Card className="p-4 animate-pulse">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>AI is thinking...</span>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
