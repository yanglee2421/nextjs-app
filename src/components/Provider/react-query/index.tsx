import {
  QueryClient,
  QueryClientProvider,
  DefaultOptions,
} from "@tanstack/react-query";
import React from "react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

const queryClient = getClient();
const persister = createSyncStoragePersister({
  storage: globalThis.sessionStorage,
});
persistQueryClient({ queryClient, persister });

export const ReactClient = (props: React.PropsWithChildren) => {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// QueryClient config
function getClient() {
  return new QueryClient({
    defaultOptions: {
      queries: queries(),
      mutations: mutations(),
    },
  });
}

function queries(): DefaultOptions["queries"] {
  return {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retryDelay(attemptIndex) {
      return Math.min(1000 * 2 ** attemptIndex, 30000);
    },
  };
}

function mutations(): DefaultOptions["mutations"] {
  return {};
}
