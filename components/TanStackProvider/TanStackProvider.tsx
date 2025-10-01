
'use client';
import React, { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider, hydrate, DehydratedState } from '@tanstack/react-query';

interface Props {
  dehydratedState?: DehydratedState;
}

export default function TanStackProvider({ children, dehydratedState }: PropsWithChildren<Props>) {
  const [queryClient] = useState(() => new QueryClient());

  
  if (dehydratedState) {
    hydrate(queryClient, dehydratedState);
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
