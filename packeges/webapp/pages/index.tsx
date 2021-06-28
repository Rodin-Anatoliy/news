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

export default function Index() {
  const api = useApi();
  const router = useRouter();
  const queryClient = useQueryClient();
  const newsQueryMutation = useMutation((query: string) => {
    return api.news.get({ query: query });
  });
  const [newsQuery, setNewsQuery] = useState<string>('');
  const [
    newsSearchResults,
    setNewsSearchResults,
  ] = useState<INewsSearchResultsRes>({
    id: '',
    articles: [],
  });
  const handlePressSearchNews = async () => {
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
      <PageHeader theme="dark" selectedPage="main" />
      <main className="content">
        <section className="results root__section">
          <div className="not-found">
            <img
              className="not-found__image"
              src="<%=require('./images/not-found.svg').default%>"
              alt="not found"
            />
            <div className="not-found__info-block">
              <h3 className="title title_not-found">Ничего не найдено</h3>
              <p className="not-found__text">
                К сожалению по вашему запросу ничего не найдено.
              </p>
            </div>
          </div>

          {/* Прелоудер, отображается пока идет загрузка новостей (сейчас свойство блока display: none) */}
          <div className="loading">
            <i className="loading__circle-preloader"></i>
            <p className="loading__text">Идет поиск новостей...</p>
          </div>

          <div className="error">
            <p className="error__text">
              Во время запроса произошла ошибка. Возможно, проблема с
              соединением или сервер недоступен. Подождите немного и попробуйте
              ещё раз
            </p>
          </div>

          {/* Блок с найденными новостями (в данный момент отображается он) */}
          <div className="founds">
            <div className="founds__head">
              <h3 className="title title_founds">Результаты поиска</h3>
              <a className="founds__link" href="./analytics.html">
                Посмотреть аналитику {`>`}
              </a>
            </div>
            <div className="news-cards">{/* Карточки с новостями */}</div>
            <button className="button button_show-more">Показать еще</button>
          </div>
        </section>

        <Author />
      </main>
      <PageFooter />
    </>
  );
}
