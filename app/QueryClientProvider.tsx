"use client";
import{QueryClient,QueryClientProvider as ReactQueryClientProvider}from '@tanstack/react-query';

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ReactQueryClientProvider client={queryClient}>
        {children}
      </ReactQueryClientProvider>
    </div>
  )
}

export default QueryClientProvider
