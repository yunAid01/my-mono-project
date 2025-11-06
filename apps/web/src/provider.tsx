// apps/web/src/app/providers.tsx
'use client'; // 👈 클라이언트 컴포넌트로 선언

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { rootStore } from './store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  // RQ 클라이언트 인스턴스 생성 (한 번만)
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReduxProvider store={rootStore}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
