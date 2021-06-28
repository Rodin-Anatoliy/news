import React, { FC, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { INewsArticle, INewsSearchResultsRes } from '../Api';
import { UseMutationResult } from 'react-query';
import NewsCard from './NewsCard';
const notFoundPic = '/../public/assets/not-found.svg';

interface Props {
  newsQueryMutation: UseMutationResult;
  newsSearchResults: INewsSearchResultsRes;
}

const SearchResults: FC<Props> = ({ newsQueryMutation, newsSearchResults }) => {
  const [articlesDisplayed, setArticlesDisplayed] = useState<number>(3);
  const handlePressShowMore = () => {
    setArticlesDisplayed(articlesDisplayed + 3);
  };
  return (
    <>
      <section className="results root__section">
        {newsQueryMutation.isSuccess && !newsSearchResults?.articles?.length && (
          <div className="not-found">
            <Image
              className="not-found__image"
              alt="not found"
              src={notFoundPic}
              layout="fixed"
              width="100"
              height="100"
            />
            <div className="not-found__info-block">
              <h3 className="title title_not-found">Ничего не найдено</h3>
              <p className="not-found__text">
                К сожалению по вашему запросу ничего не найдено.
              </p>
            </div>
          </div>
        )}

        {newsQueryMutation.isLoading && (
          <div className="loading">
            <i className="loading__circle-preloader"></i>
            <p className="loading__text">Идет поиск новостей...</p>
          </div>
        )}

        {newsQueryMutation.isError && (
          <div className="error">
            <p className="error__text">
              Во время запроса произошла ошибка. Возможно, проблема с
              соединением или сервер недоступен. Подождите немного и попробуйте
              ещё раз
            </p>
          </div>
        )}

        {newsQueryMutation.isSuccess && newsSearchResults?.articles?.length && (
          <div className="founds">
            <div className="founds__head">
              <h3 className="title title_founds">Результаты поиска</h3>
              <a className="founds__link" href="./analytics">
                Посмотреть аналитику {`>`}
              </a>
            </div>
            <div className="news-cards">
              {newsSearchResults?.articles
                .slice(0, articlesDisplayed)
                .map((article, index) => (
                  <NewsCard articleData={article} key={index} />
                ))}
            </div>
            {articlesDisplayed < newsSearchResults?.articles?.length && (
              <button
                onClick={handlePressShowMore}
                className="button button_show-more"
              >
                Показать еще
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default SearchResults;
