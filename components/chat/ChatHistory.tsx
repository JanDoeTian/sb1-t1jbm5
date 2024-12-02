"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import type { ChatThread } from '@/types/chat';

export default function ChatHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [threads, setThreads] = useState<ChatThread[]>([]);

  return (
    <div className="w-80 border-r h-[calc(100vh-4rem)]">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-4">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="p-3 rounded-lg hover:bg-muted cursor-pointer"
            >
              <h3 className="font-medium truncate">{thread.title}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {thread.lastMessage}
              </p>
              <time className="text-xs text-muted-foreground">
                {new Date(thread.timestamp).toLocaleDateString()}
              </time>
            </div>
          ))}
          {threads.length === 0 && (
            <div className="text-center text-muted-foreground p-4">
              No conversations yet
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}