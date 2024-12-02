"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Star, ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BuyRequest } from '@/types/buyRequest';
import { Offer } from '@/types/offer';
import { mockOffers } from '@/lib/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RequestDetailProps {
  request: BuyRequest;
  onBack: () => void;
  onMessageClick: (offer: Offer) => void;
}

export default function RequestDetail({ request, onBack, onMessageClick }: RequestDetailProps) {
  const [offers] = useState<Offer[]>(mockOffers.filter(o => o.requestId === request.id));

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="font-semibold">{request.title}</h2>
          <p className="text-sm text-muted-foreground">{request.offerCount} offers available</p>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <Card className="p-4 bg-muted/50">
            <p className="text-sm">{request.description}</p>
          </Card>

          {offers.map((offer) => (
            <Card key={offer.id} className="p-4">
              <div className="flex items-start gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={offer.sellerAvatar} />
                  <AvatarFallback>{offer.sellerName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{offer.sellerName}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{offer.sellerRating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">
                        ${offer.price.toLocaleString()}
                      </div>
                      <time className="text-xs text-muted-foreground">
                        {new Date(offer.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm mb-4">{offer.description}</p>

              {offer.images && offer.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {offer.images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {offer.messages.length > 0 && (
                <Card className="p-3 mb-4 bg-muted/50">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {offer.messages[offer.messages.length - 1].content}
                  </p>
                </Card>
              )}

              <div className="flex gap-2">
                <Button className="flex-1" variant="default">
                  Accept Offer
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onMessageClick(offer)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}