import Head from 'next/head';
import styles from './index.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useApi } from '../hooks/useApi';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Api, INewsSearchResults, INewsSearchResultsRes } from '../Api';

export default function Index() {
  const api = useApi();
  const router = useRouter();
  const queryClient = useQueryClient();
  const newsQueryMutation = useMutation((query: string) => {
    return api.news.get({ query: query });
  });
  const [nwesQuery, setNewsQuery] = useState<string>('');
  const [newsSearchResults, setNewsSearchResults] = useState<string>('');
  const handlePressSearchNews = async () => {
    const res = await newsQueryMutation.mutateAsync(nwesQuery);
    setNewsSearchResults(res?.data);
  };
  return (
    <>
      <Head>
        <title>News</title>
        <meta name="description" content="News search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">News search app</span>
      </nav>
      <div className={classNames(['container'])}></div>
    </>
  );
}
