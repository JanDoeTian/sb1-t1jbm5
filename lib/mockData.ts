import { BuyRequest } from '@/types/buyRequest';
import { Offer } from '@/types/offer';

export const mockBuyRequests: BuyRequest[] = [
  {
    id: '1',
    title: 'Gaming Laptop Under $2000',
    description: 'Looking for a high-performance gaming laptop with RTX 3070 or better, 32GB RAM, and at least 1TB SSD.',
    status: 'pending',
    createdAt: new Date('2024-03-20T10:00:00'),
    updatedAt: new Date('2024-03-20T10:00:00'),
    offerCount: 3,
    lowestOffer: 1650
  },
  {
    id: '2',
    title: 'Professional Camera Setup',
    description: 'Need a mirrorless camera with 2 prime lenses for professional photography. Prefer Sony or Canon.',
    status: 'matched',
    createdAt: new Date('2024-03-19T15:30:00'),
    updatedAt: new Date('2024-03-19T16:45:00'),
    offerCount: 5,
    lowestOffer: 2800
  },
  {
    id: '3',
    title: 'Smart Home Security System',
    description: 'Looking for a comprehensive smart home security system with cameras, doorbell, and mobile app integration.',
    status: 'pending',
    createdAt: new Date('2024-03-18T09:15:00'),
    updatedAt: new Date('2024-03-18T09:15:00'),
    offerCount: 7,
    lowestOffer: 599
  },
  {
    id: '4',
    title: 'Electric Standing Desk',
    description: 'Seeking a sturdy electric standing desk with memory settings and cable management.',
    status: 'completed',
    createdAt: new Date('2024-03-17T14:20:00'),
    updatedAt: new Date('2024-03-18T11:30:00'),
    offerCount: 4,
    lowestOffer: 449
  }
];

export const mockOffers: Offer[] = [
  {
    id: '1',
    requestId: '1',
    sellerId: 's1',
    price: 1650,
    description: 'ASUS ROG Strix G15 with RTX 3070, 32GB RAM, 1TB NVMe SSD. Includes 2-year warranty and gaming bundle.',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
      'https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=800&q=80'
    ],
    createdAt: new Date('2024-03-20T11:00:00'),
    status: 'pending',
    sellerName: 'Tech Haven',
    sellerRating: 4.8,
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    messages: [
      {
        id: 'm1',
        content: 'Hi! I have the perfect gaming laptop for you. This ASUS ROG Strix comes with all the specs you need plus a 2-year warranty.',
        senderId: 's1',
        createdAt: new Date('2024-03-20T11:05:00')
      }
    ]
  },
  {
    id: '2',
    requestId: '1',
    sellerId: 's2',
    price: 1799,
    description: 'MSI Raider GE76 with RTX 3070 Ti, 32GB RAM, 1TB SSD + 1TB HDD. Premium gaming laptop with advanced cooling.',
    images: [
      'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?w=800&q=80'
    ],
    createdAt: new Date('2024-03-20T12:30:00'),
    status: 'pending',
    sellerName: 'Gaming Gear Pro',
    sellerRating: 4.6,
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    messages: [
      {
        id: 'm2',
        content: 'Check out this MSI Raider - it has everything you need plus extra storage and superior cooling for intense gaming sessions.',
        senderId: 's2',
        createdAt: new Date('2024-03-20T12:35:00')
      }
    ]
  }
];