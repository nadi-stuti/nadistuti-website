import React, { useState } from 'react';
import type { Product } from '../../types/shop';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isInWishlist: boolean;
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist 
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product);
    } finally {
      setIsLoading(false);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="text-center text-orange-600">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                {product.icon}
              </div>
              <p className="text-sm font-medium">{product.name}</p>
            </div>
          )}
        </div>
        
        {product.badge && (
          <div className={`absolute top-4 left-4 px-2 py-1 rounded text-sm font-medium text-white ${
            product.badge === 'Bestseller' ? 'bg-orange-600' :
            product.badge === 'Handmade' ? 'bg-purple-600' :
            'bg-green-600'
          }`}>
            {product.badge}
          </div>
        )}
        
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            className={`w-5 h-5 cursor-pointer transition-colors ${
              isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'
            }`}
            fill={isInWishlist ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        {product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-current' : 'text-gray-300 fill-current'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviewCount} reviews)</span>
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {discountPercentage}% off
                </span>
              </>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !product.inStock}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            !product.inStock 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isLoading
              ? 'bg-orange-400 text-white cursor-wait'
              : 'bg-orange-600 text-white hover:bg-orange-700'
          }`}
        >
          {!product.inStock ? 'Out of Stock' : isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}