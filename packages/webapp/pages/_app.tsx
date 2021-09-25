// pages/_app.js
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import React, { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApiProvider } from '../hooks/useApi';
import { INewsSearchResults, INewsSearchResultsRes } from '../Api';

export default function MyApp({ Component, pageProps }) {
  const [
    newsSearchResults,
    setNewsSearchResults,
  ] = useState<INewsSearchResultsRes>(null);
  const saveNewsSearchResults = (newsSearchResults: INewsSearchResultsRes) =>
    setNewsSearchResults(newsSearchResults);
  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <ApiProvider>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component
            {...pageProps}
            newsSearchResults={newsSearchResults}
            saveNewsSearchResults={saveNewsSearchResults}
          />{' '}
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ApiProvider>
  );
}
