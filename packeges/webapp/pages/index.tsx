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

export default function Index() {
  const api = useApi();
  const router = useRouter();
  const queryClient = useQueryClient();
  const newsQueryMutation = useMutation((query: string) => {
    return api.news.get({ query: query });
  });
  const [newsQuery, setNewsQuery] = useState<string>('');
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewsQuery(event.target.value);
  };
  const [
    newsSearchResults,
    setNewsSearchResults,
  ] = useState<INewsSearchResultsRes>({
    id: '',
    articles: [],
  });
  const handleSubmitSearchNews = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const res = await newsQueryMutation.mutateAsync(newsQuery);
    setNewsSearchResults(res?.data);
  };
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
        newsQuery={newsQuery}
        handleFormSubmit={handleSubmitSearchNews}
        handleSearchInput={handleSearchInput}
      />
      <main className="content">
        {(newsQueryMutation.isSuccess ||
          newsQueryMutation.isLoading ||
          newsQueryMutation.isError) && (
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
