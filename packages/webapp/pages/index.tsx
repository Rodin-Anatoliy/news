import Head from 'next/head';
import styles from './index.module.css';
import React, { FC, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useApi } from '../hooks/useApi';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Api, INewsSearchResults, INewsSearchResultsRes } from '../Api';
import PageHeader from '../components/PageHeader';
import Author from '../components/Author';
import PageFooter from '../components/PageFooter';
import SearchResults from '../components/SearchResults';

export default function Index({
  newsSearchResults,
  saveNewsSearchResults,
}: {
  newsSearchResults: INewsSearchResultsRes;
  saveNewsSearchResults: (newsSearchResults: INewsSearchResultsRes) => void;
}) {
  const api = useApi();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { searchId } = router.query as any;

  const prefetchedData = queryClient.getQueryState<INewsSearchResultsRes>([
    'cachedNewsSearch',
    searchId,
  ]);
  const prefetchedNewsSearchResults = prefetchedData?.data
    ? prefetchedData.data
    : null;

  const newsQueryMutation = useMutation((query: string) => {
    return api.news.get({ query: query });
  });
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changes = { ...newsSearchResults };
    changes.query = event.target.value;
    saveNewsSearchResults(changes);
  };
  const handleSubmitSearchNews = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const res = await newsQueryMutation.mutateAsync(
      newsSearchResults?.query ? newsSearchResults.query : '',
    );
    router.push(
      {
        pathname: '',
        query: {
          searchId: res.data.id,
        },
      },
      '',
      { shallow: true },
    );
    saveNewsSearchResults(res?.data);
  };
  useEffect(() => {
    if (newsSearchResults) {
      router.push(
        {
          pathname: '',
          query: {
            searchId: newsSearchResults.id,
          },
        },
        '',
        { shallow: true },
      );
    }
  }, []);

  useEffect(() => {
    if (prefetchedNewsSearchResults) {
      saveNewsSearchResults(prefetchedNewsSearchResults);
    }
  }, []);

  return (
    <>
      <Head>
        <title>News</title>
        <meta name="description" content="News search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader
        theme="dark"
        selectedPage="main"
        newsQuery={newsSearchResults?.query ? newsSearchResults.query : ''}
        handleFormSubmit={handleSubmitSearchNews}
        handleSearchInput={handleSearchInput}
      />
      <main className="content">
        {(newsQueryMutation.isSuccess ||
          newsQueryMutation.isLoading ||
          newsQueryMutation.isError ||
          newsSearchResults) && (
          <SearchResults
            newsQueryMutation={newsQueryMutation}
            newsSearchResults={newsSearchResults}
          />
        )}

        <Author />
      </main>
      <PageFooter />
    </>
  );
}

export async function getServerSideProps({ query: { searchId } }) {
  const queryClient = new QueryClient();
  const apiUrl =
    typeof window === 'undefined' && process.env.NODE_ENV === 'production'
      ? 'http://news-api:3002'
      : 'http://localhost:3002';
  const api = new Api<string>({
    baseUrl: apiUrl,
  });
  await queryClient.prefetchQuery(['cachedNewsSearch', searchId], async () => {
    const res = await api.news.getById({
      searchId,
    });
    return res.data;
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
