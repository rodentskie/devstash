import { CheckEmailCard } from '@/components/auth/CheckEmailCard';
import { Suspense } from 'react';

export default function CheckEmailPage() {
  return (
    <Suspense>
      <CheckEmailCard />
    </Suspense>
  );
}
