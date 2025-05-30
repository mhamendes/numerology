'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UTCDate } from '@date-fns/utc';
import { BookIcon, GlobeIcon, HeartIcon, StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { z } from 'zod';

import { usePathname } from '@/i18n/navigation';

import { Product } from '@/actions/eduzz/getProducts';
import { useFacebookPixel } from '@/app/(components)/facebookPixel';
import { createSale } from '@/db/migrations';

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
  updateCheckoutSession: () => void;
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
  updateCheckoutSession: () => {},
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
  const tLifeMap = useTranslations('lifeMap');
  const tServices = useTranslations('services');

  const pathname = usePathname();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [prefilledData, setPrefilledData] = useState<BaseFormSchema | null>(
    null
  );
  const { trackEvent, isLoaded } = useFacebookPixel();

  const handleProductSelection = useCallback(
    (productId: string) => {
      const product = products.find((product) => product.id === productId);

      if (!product) {
        toast.error('Product not found');
        return;
      }

      setSelectedProduct(product);
      setStep(2);
    },
    [products]
  );

  const buildPaymentUrl = useCallback(
    ({ trackerCode }: { trackerCode: string }) => {
      const { paymentUrl, currency } = selectedProduct ?? {};

      if (!paymentUrl) {
        throw new Error('Payment URL not found');
      }

      if (!trackerCode) {
        throw new Error('Missing required parameters');
      }

      const queryParams = new URLSearchParams({
        currency: currency ?? 'BRL',
        trk: trackerCode,
      });

      const url = new URL(paymentUrl);
      url.search = queryParams.toString();

      return url.toString();
    },
    [selectedProduct]
  );

  const onSubmit = useCallback(
    async (data: BaseFormSchema) => {
      if (isLoading || !selectedProduct) return;

      if (isLoaded) {
        trackEvent('AddToCart', {
          content_ids: [selectedProduct.id],
          value: selectedProduct.rawPrice,
          currency: selectedProduct.currency,
        });
      }

      sessionStorage.setItem('bookingData', JSON.stringify(data));

      setIsLoading(true);
      try {
        if (!data.birthday) {
          throw new Error('Birthday is required');
        }
        if (!data.fullName) {
          throw new Error('Full name is required');
        }
        if (!data.email) {
          throw new Error('Email is required');
        }

        const trackerCode = await createSale({
          birthDay: data.birthday.toISOString(),
          fullName: data.fullName,
          email: data.email,
          productId: selectedProduct.id,
        });

        const paymentUrl = buildPaymentUrl({ trackerCode });
        window.open(paymentUrl, '_self');
      } catch (error) {
        console.error(error);
        toast.error(t('error.somethingWentWrong'));
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, selectedProduct, t, trackEvent, isLoaded, buildPaymentUrl]
  );

  const handleBack = useCallback(() => {
    if (step === 2) {
      setSelectedProduct(null);
    }
    if (clientSecret) {
      setClientSecret(null);
    }

    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, [clientSecret, step]);

  const updateCheckoutSession = useCallback(() => {
    if (clientSecret && prefilledData) {
      setClientSecret(null);
      onSubmit(prefilledData as BaseFormSchema);
    }
  }, [clientSecret, onSubmit, prefilledData]);

  const isLastStep =
    pathname.includes('success') || pathname.includes('failure');

  useEffect(() => {
    const data = sessionStorage.getItem('bookingData');
    if (data && !prefilledData) {
      const parsedData = JSON.parse(data);
      setPrefilledData({
        ...parsedData,
        birthday: parsedData.birthday
          ? new UTCDate(parsedData.birthday)
          : undefined,
        partnerBirthday: parsedData.partnerBirthday
          ? new UTCDate(parsedData.partnerBirthday)
          : undefined,
      } as BaseFormSchema);
    }
  }, [pathname, prefilledData]);

  useEffect(() => {
    if (isLastStep) {
      sessionStorage.removeItem('bookingData');
      setPrefilledData(null);
    }
  }, [isLastStep]);

  useEffect(() => {
    if (pathname !== '/booking') {
      setClientSecret(null);
      setStep(1);
    }
  }, [pathname]);

  const populatedProducts = useMemo(
    () =>
      products
        .map((product) => {
          switch (product.id) {
            case 'life-map':
              return {
                ...product,
                title: tBooking('lifeMap'),
                description: tBooking('lifeMapDescription'),
                features: [
                  tLifeMap('motivationNumber'),
                  tLifeMap('expressionNumber'),
                  tLifeMap('birthDayNumber'),
                  tLifeMap('hiddenTalent'),
                  tLifeMap('conjugalVibration'),
                  tLifeMap('hiddenTendency'),
                  tLifeMap('destinyNumberTitle'),
                  tLifeMap('missionNumber'),
                  tLifeMap('karmicLessons'),
                  tLifeMap('lifeCycles'),
                  tLifeMap('decisiveMoments'),
                  tLifeMap('invertedTriangle'),
                  tLifeMap('personalYears'),
                  tLifeMap('monthlyGuidance'),
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
                  tServices('allLifeMapFeatures'),
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
        .filter((product) => product !== null),
    [products, tBooking, tLifeMap, tServices]
  );

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
        updateCheckoutSession,
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
