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
import Image from 'next/image';
const htmlIcon = '/../public/assets/html.svg';
const cssIcon = '/../public/assets/css.svg';
const webpackIcon = '/../public/assets/Webpack.svg';
const jsIcon = '/../public/assets/js.svg';

export default function About() {
  const api = useApi();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>News</title>
        <meta name="description" content="News search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeader theme="light" selectedPage="about" />
      <main className="content">
        <section className="for-clients root__section">
          <h3 className="title title_for-clients">Клиентам</h3>
          <div className="for-clients__text">
            <p className="for-clients__paragraph">
              Этот сайт — дипломный проект студента Яндекс.Практикума. Его цель
              — показать, чему научился студент, какими технологиями владеет.
            </p>
            <p className="for-clients__paragraph">
              Вёрстка сайта выполнена по методологии БЭМ. Это делает сайт гибким
              и масштабируемым. Кроме того, добавлять новые страницы и
              функциональность проще и быстрее, чем в проектах, выполненных по
              другим методологиям. Также сайт проще и дешевле поддерживать.
            </p>
            <p className="for-clients__paragraph">
              Карточки с новостями приходят с сервера и обрабатываются
              асинхронно. То есть сайт продолжает работать, пока от сервера
              приходит ответ. Это повышает удобство использования сервиса.
            </p>
            <p className="for-clients__paragraph">
              При создании проекта была использована сборка технологией Webpack.
              Это современный подход к разработке сайтов. Код оптимизируется, а
              значит, сайт работает быстрее. Также сайт работает в старых
              браузерах. Даже если посетители — пользователи старых операционных
              систем, у них не будет проблем с отображением. А значит,
              потенциальная аудитория возрастает.
            </p>
            <p className="for-clients__paragraph">
              Проект был проверен экспертами Яндекс.Практикума. Если вашему
              бизнесу нужен сайт, мы рекомендуем обратиться к этому студенту.
            </p>
          </div>
        </section>

        <section className="technologies root__section">
          <h3 className="title title_technologies">Используемые технологии</h3>
          <div className="technologies__icons">
            <div className="technologies__block">
              <p className="technologies__name">HTML</p>
              <Image
                className="technologies__picture"
                src={htmlIcon}
                alt="HTML"
                layout="fixed"
                width="100"
                height="100"
              />
            </div>
            <div className="technologies__block">
              <p className="technologies__name">CSS</p>
              <Image
                className="technologies__picture"
                src={cssIcon}
                alt="CSS"
                layout="fixed"
                width="100"
                height="100"
              />
            </div>
            <div className="technologies__block">
              <p className="technologies__name">Java Script</p>
              <Image
                className="technologies__picture"
                src={jsIcon}
                alt="Java Script"
                layout="fixed"
                width="100"
                height="100"
              />
            </div>
            <div className="technologies__block">
              <p className="technologies__name">Webpack</p>
              <Image
                className="technologies__picture"
                src={webpackIcon}
                alt="Webpack"
                layout="fixed"
                width="100"
                height="100"
              />
            </div>
          </div>
        </section>
        <Author />
        <PageFooter />
      </main>
    </>
  );
}
