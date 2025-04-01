'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { useBooking } from './context';

export default function ServiceSelection() {
  const { selectedProduct, handleProductSelection, products } = useBooking();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {products.map((product, index) => (
        <Card
          key={product.id}
          className={cn(
            'cursor-pointer transition-all hover:shadow-md',
            selectedProduct?.id === product.id
              ? 'ring-opacity-50 border-indigo-500 ring-2 ring-indigo-500'
              : 'border-gray-200 dark:border-gray-700'
          )}
          onClick={() => handleProductSelection(product.id)}
          id={`nzi12j_${index}`}
        >
          <CardHeader className="pb-2" id={`wl3b9m_${index}`}>
            <CardTitle
              className="flex items-center justify-between"
              id={`yeps0e_${index}`}
            >
              <span id={`sbhdks_${index}`}>{product.title}</span>
              <span
                className="text-indigo-600 dark:text-indigo-400"
                id={`zm60j3_${index}`}
              >
                {product.price}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent id={`2sac82_${index}`}>
            <p
              className="text-gray-600 dark:text-gray-300"
              id={`qht1gy_${index}`}
            >
              {product.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
