"use client";

import { useState } from 'react';
import RequestsList from '@/components/requests/RequestsList';
import ChatInterface from '@/components/chat/ChatInterface';
import RequestDetail from '@/components/requests/RequestDetail';
import SellerChat from '@/components/chat/SellerChat';
import type { BuyRequest } from '@/types/buyRequest';
import type { Offer } from '@/types/offer';

type View = 'chat' | 'detail' | 'seller-chat';

interface ViewState {
  type: View;
  request?: BuyRequest;
  offer?: Offer;
}

export default function Home() {
  const [viewStack, setViewStack] = useState<ViewState[]>([{ type: 'chat' }]);

  const currentView = viewStack[viewStack.length - 1];

  const navigateTo = (newView: ViewState) => {
    if (newView.type === 'detail') {
      // Replace the entire stack with just the new detail view
      setViewStack([newView]);
    } else {
      // For other views (like seller-chat), add to the stack
      setViewStack(prev => [...prev, newView]);
    }
  };

  const navigateBack = () => {
    setViewStack(prev => prev.slice(0, -1));
  };

  return (
    <div className="flex min-h-screen">
      <RequestsList onRequestSelect={(request) => navigateTo({ type: 'detail', request })} />
      <main className="flex-1">
        {currentView.type === 'chat' && <ChatInterface />}
        {currentView.type === 'detail' && currentView.request && (
          <RequestDetail 
            request={currentView.request}
            onBack={() => setViewStack([{ type: 'chat' }])}
            onMessageClick={(offer) => navigateTo({ type: 'seller-chat', offer, request: currentView.request })}
          />
        )}
        {currentView.type === 'seller-chat' && currentView.offer && (
          <SellerChat
            offer={currentView.offer}
            onBack={navigateBack}
          />
        )}
      </main>
    </div>
  );
}