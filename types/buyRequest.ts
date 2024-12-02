export interface BuyRequest {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'matched' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  offerCount: number;
  lowestOffer: number;
}