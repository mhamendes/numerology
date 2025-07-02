'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { useBooking } from './context';

export default function ServiceSelection() {
  const tServices = useTranslations('services');
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
              className="flex items-start justify-between"
              id={`yeps0e_${index}`}
            >
              <span id={`sbhdks_${index}`} className="w-1/2">
                {product.title}
              </span>
              <div className="flex flex-col items-end">
                {product.maxInstallments && product.installmentsPrice ? (
                  <div className="flex flex-col">
                    <span className="items-baseline text-end text-sm font-normal text-gray-500 dark:text-gray-400">
                      {tServices.rich('installmentPrice', {
                        installmentsPrice: product.installmentsPrice,
                        maxInstallments: product.maxInstallments,
                        big: (chunks) => (
                          <span className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                            {chunks}
                          </span>
                        ),
                      })}
                    </span>
                    <span className="text-end text-sm font-normal text-gray-500 dark:text-gray-400">
                      {tServices('fullPrice', {
                        price: product.price,
                      })}
                    </span>
                  </div>
                ) : (
                  <span className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                    {product.price}
                  </span>
                )}
              </div>
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
