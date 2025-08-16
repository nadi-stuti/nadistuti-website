import type { Product } from '../types/shop';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Bhagavad Gita - Sanskrit & Hindi',
    description: 'Complete edition with commentary by Swami Prabhupada',
    price: 299,
    originalPrice: 499,
    category: 'books',
    badge: 'Bestseller',
    rating: 5,
    reviewCount: 248,
    inStock: true,
    createdAt: '2024-01-15',
    icon: (
      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: '2',
    name: 'Handcrafted Brass Diya Set',
    description: 'Set of 5 traditional brass diyas for festivals and daily pooja',
    price: 599,
    originalPrice: 899,
    category: 'pooja',
    rating: 4,
    reviewCount: 156,
    inStock: true,
    createdAt: '2024-01-10',
    icon: (
      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    )
  },
  {
    id: '3',
    name: 'Marble Ganesha Idol',
    description: 'Beautiful handcrafted marble Ganesha statue, 6 inches height',
    price: 1299,
    originalPrice: 1899,
    category: 'idols',
    badge: 'Handmade',
    rating: 5,
    reviewCount: 89,
    inStock: true,
    createdAt: '2024-01-05',
    icon: (
      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: '4',
    name: 'Rudraksha Mala 108 Beads',
    description: 'Authentic 5-mukhi Rudraksha mala for meditation and prayers',
    price: 899,
    originalPrice: 1299,
    category: 'jewelry',
    badge: 'Authentic',
    rating: 4.5,
    reviewCount: 134,
    inStock: true,
    createdAt: '2024-01-12',
    icon: (
      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    )
  },
  {
    id: '5',
    name: 'Silk Dhoti Kurta Set',
    description: 'Traditional white silk dhoti kurta set for religious ceremonies',
    price: 2499,
    originalPrice: 3499,
    category: 'clothing',
    rating: 4,
    reviewCount: 67,
    inStock: true,
    createdAt: '2024-01-08',
    icon: (
      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    id: '6',
    name: 'Wooden Temple for Home',
    description: 'Handcrafted wooden mandir with intricate carvings, perfect for home worship',
    price: 4999,
    originalPrice: 6999,
    category: 'home',
    badge: 'Premium',
    rating: 5,
    reviewCount: 45,
    inStock: true,
    createdAt: '2024-01-03',
    icon: (
      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    id: '7',
    name: 'Ramayana - Illustrated Edition',
    description: 'Complete Ramayana with beautiful illustrations and Hindi translation',
    price: 799,
    originalPrice: 1199,
    category: 'books',
    rating: 4.5,
    reviewCount: 203,
    inStock: true,
    createdAt: '2024-01-14',
    icon: (
      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: '8',
    name: 'Copper Kalash Set',
    description: 'Pure copper kalash with coconut and mango leaves for ceremonies',
    price: 1599,
    originalPrice: 2199,
    category: 'pooja',
    rating: 4,
    reviewCount: 78,
    inStock: false,
    createdAt: '2024-01-06',
    icon: (
      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    )
  }
];