'use client';
import React, { useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

interface ReactQueryProps extends React.PropsWithChildren {}

export function ReactQuery(props: ReactQueryProps) {
  const { children } = props;

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
