export interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
}

export interface Offer {
  id: string;
  requestId: string;
  sellerId: string;
  price: number;
  description: string;
  images?: string[];
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
  sellerName: string;
  sellerRating: number;
  sellerAvatar?: string;
  messages: Message[];
}