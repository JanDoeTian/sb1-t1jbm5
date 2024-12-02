"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from "@/components/ui/scroll-area";
import RequestCard from './RequestCard';
import { mockBuyRequests } from '@/lib/mockData';
import type { BuyRequest } from '@/types/buyRequest';

interface RequestsListProps {
  onRequestSelect: (request: BuyRequest) => void;
}

export default function RequestsList({ onRequestSelect }: RequestsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [requests] = useState<BuyRequest[]>(mockBuyRequests);

  const filteredRequests = requests.filter(request =>
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-96 border-r h-screen bg-muted/10">
      <div className="p-4 border-b bg-background/50 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-4">
          {filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onClick={() => onRequestSelect(request)}
            />
          ))}
          {filteredRequests.length === 0 && (
            <div className="text-center text-muted-foreground p-4">
              No requests found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}