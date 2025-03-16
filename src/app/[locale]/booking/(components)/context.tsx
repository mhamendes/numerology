'use client';

import { createContext, useContext, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { z } from 'zod';

import { createCheckoutSession } from '@/actions/stripe/createCheckoutSession';
import { Product } from '@/actions/stripe/getProductPrice';

const _baseFormSchema = z.object({
  fullName: z.string().optional(),
  birthday: z.date().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  partnerFullName: z.string().optional(),
  partnerBirthday: z.date().optional(),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  specificQuestions: z.string().optional(),
});

type BaseFormSchema = z.infer<typeof _baseFormSchema>;

type BookingContextType = {
  selectedProduct: Product | null;
  handleProductSelection: (service: string) => void;
  handleBack: () => void;
  onSubmit: (data: BaseFormSchema) => void;
  products: Product[];
  step: number;
  isLoading: boolean;
  clientSecret?: string;
};

const BookingContext = createContext<BookingContextType>({
  selectedProduct: null,
  handleProductSelection: () => {},
  handleBack: () => {},
  products: [],
  step: 1,
  isLoading: false,
  onSubmit: () => {},
});

export function BookingProvider({
  children,
  products,
}: {
  children: React.ReactNode;
  products: Product[];
}) {
  const t = useTranslations('form');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  function handleProductSelection(productId: string) {
    const product = products.find((product) => product.id === productId);

    if (!product) {
      toast.error('Product not found');
      return;
    }

    setSelectedProduct(product);
    setStep(2);
  }

  async function onSubmit(data: BaseFormSchema) {
    'server-only';
    if (isLoading || !selectedProduct) return;

    setIsLoading(true);
    try {
      const { client_secret } = await createCheckoutSession({
        fullName: data.fullName,
        birthday: data.birthday?.toISOString(),
        email: data.email,
        phone: data.phone,
        partnerFullName: data.partnerFullName,
        partnerBirthday: data.partnerBirthday?.toISOString(),
        businessName: data.businessName,
        businessType: data.businessType,
        productServerId: selectedProduct.serverId,
        productId: selectedProduct.id,
      });
      setClientSecret(client_secret);
    } catch (error) {
      console.error(error);
      toast.error(t('error.somethingWentWrong'));
    } finally {
      setStep(3);
      setIsLoading(false);
    }
  }

  function handleBack() {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  }

  return (
    <BookingContext.Provider
      value={{
        selectedProduct,
        handleProductSelection,
        handleBack,
        products,
        step,
        clientSecret,
        isLoading,
        onSubmit,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }

  return context;
}

export default BookingContext;
