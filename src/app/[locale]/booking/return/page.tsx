import { redirect } from 'next/navigation';

import { getCheckoutSessionStatus } from '@/actions/stripe/getCheckoutSessionStatus';

interface PageProps {
  searchParams: Promise<{ sessionId: string; productId: string }>;
}
export default async function PaymentReturnPage({ searchParams }: PageProps) {
  const { sessionId, productId } = await searchParams;
  const { status } = await getCheckoutSessionStatus(sessionId);

  if (status === 'complete') {
    return redirect(`/booking/success?productId=${productId}`);
  }

  return redirect(`/booking/failure?productId=${productId}`);
}
