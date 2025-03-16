import { redirect } from 'next/navigation';

import { getCheckoutSessionStatus } from '@/actions/stripe/getCheckoutSessionStatus';

interface PageProps {
  searchParams: Promise<{ sessionId: string }>;
}
export default async function PaymentReturnPage({ searchParams }: PageProps) {
  const { sessionId } = await searchParams;
  const { status } = await getCheckoutSessionStatus(sessionId);

  if (status === 'complete') {
    return redirect('/booking/success');
  }

  return redirect('/booking/failure');
}
