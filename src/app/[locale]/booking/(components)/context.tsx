'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { BookIcon, GlobeIcon, HeartIcon, StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { z } from 'zod';

import { usePathname, useRouter } from '@/i18n/navigation';

import { createCheckoutSession } from '@/actions/stripe/createCheckoutSession';
import { Product } from '@/actions/stripe/getProductPrice';

type PopulatedProduct = Product & {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular: boolean;
  isActive: boolean;
};

const _baseFormSchema = z.object({
  fullName: z.string().optional().nullable(),
  birthday: z.date().optional().nullable(),
  email: z.string().email().optional().nullable(),
  partnerFullName: z.string().optional().nullable(),
  partnerBirthday: z.date().optional().nullable(),
  businessName: z.string().optional().nullable(),
  businessType: z.string().optional().nullable(),
});

type BaseFormSchema = z.infer<typeof _baseFormSchema>;

type BookingContextType = {
  selectedProduct: Product | null;
  handleProductSelection: (service: string) => void;
  handleBack: () => void;
  onSubmit: (data: BaseFormSchema) => void;
  products: PopulatedProduct[];
  step: number;
  isLoading: boolean;
  clientSecret: string | null;
  prefilledData: BaseFormSchema | null;
  isLastStep: boolean;
};

const BookingContext = createContext<BookingContextType>({
  selectedProduct: null,
  handleProductSelection: () => {},
  handleBack: () => {},
  products: [],
  step: 1,
  isLoading: false,
  onSubmit: () => {},
  clientSecret: null,
  prefilledData: null,
  isLastStep: false,
});
export function BookingProvider({
  children,
  products,
}: {
  children: React.ReactNode;
  products: Product[];
}) {
  const t = useTranslations('form');
  const tBooking = useTranslations('booking');
  const tBirthMap = useTranslations('birthMap');
  const tServices = useTranslations('services');

  const pathname = usePathname();
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [prefilledData, setPrefilledData] = useState<BaseFormSchema | null>(
    null
  );

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

    sessionStorage.setItem('bookingData', JSON.stringify(data));

    setIsLoading(true);
    try {
      const { client_secret } = await createCheckoutSession({
        fullName: data.fullName,
        birthday: data.birthday?.toISOString(),
        email: data.email,
        partnerFullName: data.partnerFullName,
        partnerBirthday: data.partnerBirthday?.toISOString(),
        businessName: data.businessName,
        businessType: data.businessType,
        productServerId: selectedProduct.serverId,
        productId: selectedProduct.id,
      });
      setClientSecret(client_secret);
      setStep(3);

      if (pathname !== '/booking') {
        router.push('/booking');
      }
    } catch (error) {
      console.error(error);
      toast.error(t('error.somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  }

  function handleBack() {
    if (step === 2) {
      setSelectedProduct(null);
    }

    if (clientSecret) {
      setClientSecret(null);
    }

    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  }

  const populatedProducts = products
    .map((product) => {
      switch (product.id) {
        case 'birth-map':
          return {
            ...product,
            title: tBooking('birthMap'),
            description: tBooking('birthMapDescription'),
            features: [
              tBirthMap('motivationNumber'),
              tBirthMap('expressionNumber'),
              tBirthMap('birthDayNumber'),
              tBirthMap('hiddenTalent'),
              tBirthMap('conjugalVibration'),
              tBirthMap('hiddenTendency'),
              tBirthMap('destinyNumberTitle'),
              tBirthMap('missionNumber'),
              tBirthMap('karmicLessons'),
              tBirthMap('lifeCycles'),
              tBirthMap('decisiveMoments'),
              tBirthMap('invertedTriangle'),
              tBirthMap('personalYears'),
              tBirthMap('monthlyGuidance'),
              tServices('lifePathNumber'),
              tServices('destinyNumber'),
              tServices('soulUrgeNumber'),
              tServices('personalityNumber'),
              tServices('currentYearForecast'),
            ],
            icon: <BookIcon className="h-6 w-6 text-purple-500" />,
          };
        case 'personal-reading':
          return {
            ...product,
            title: tBooking('personalReading'),
            description: tBooking('personalReadingDescription'),
            features: [
              tServices('allBirthMapFeatures'),
              tServices('ninetyMinuteConsultation'),
            ],
            icon: <StarIcon className="h-6 w-6 text-indigo-500" />,
          };
        case 'relationship-compatibility':
          return {
            ...product,
            title: tBooking('relationshipCompatibility'),
            description: tBooking('relationshipCompatibilityDescription'),
            features: [
              tServices('individualNumberAnalysis'),
              tServices('compatibilityAssessment'),
              tServices('relationshipStrengths'),
              tServices('communicationStyle'),
              tServices('relationshipForecast'),
              tServices('ninetyMinuteJointConsultation'),
            ],
            icon: <HeartIcon className="h-6 w-6 text-pink-500" />,
          };
        case 'business-numerology':
          return {
            ...product,
            title: tBooking('businessNumerology'),
            description: tBooking('businessNumerologyDescription'),
            features: [
              tServices('businessNameAnalysis'),
              tServices('optimalLaunchDate'),
              tServices('teamCompatibility'),
              tServices('strategicTiming'),
              tServices('growthOpportunity'),
              tServices('oneHundredTwentyMinuteConsultation'),
            ],
            icon: <GlobeIcon className="h-6 w-6 text-blue-500" />,
          };
        default:
          return null;
      }
    })
    .filter((product) => product !== null);

  const isLastStep =
    pathname.includes('success') || pathname.includes('failure');

  useEffect(() => {
    const data = sessionStorage.getItem('bookingData');
    if (data) {
      setPrefilledData(JSON.parse(data) as BaseFormSchema);
    }
  }, []);

  useEffect(() => {
    if (isLastStep) {
      sessionStorage.removeItem('bookingData');
      setPrefilledData(null);
    }
  }, [isLastStep]);

  return (
    <BookingContext.Provider
      value={{
        selectedProduct,
        handleProductSelection,
        handleBack,
        products: populatedProducts,
        step,
        clientSecret,
        isLoading,
        onSubmit,
        prefilledData,
        isLastStep,
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
