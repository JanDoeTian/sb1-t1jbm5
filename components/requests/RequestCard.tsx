"use client";

import { BuyRequest } from '@/types/buyRequest';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface RequestCardProps {
  request: BuyRequest;
  onClick: (request: BuyRequest) => void;
}

export default function RequestCard({ request, onClick }: RequestCardProps) {
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(request)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sm line-clamp-1 flex-1 mr-2">
          {request.title}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {request.description}
      </p>
      <div className="flex justify-between items-end">
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(request.createdAt)} ago
        </span>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="outline" className="bg-primary/5 text-primary font-normal">
            {request.offerCount} offers
          </Badge>
          <span className="text-xs font-medium text-emerald-600">
            From ${request.lowestOffer.toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  );
}