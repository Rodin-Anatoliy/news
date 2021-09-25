import React, { FC } from 'react';
import { INewsArticle } from '../Api';
import moment from 'moment';
const newsDefaultImg =
  'https://drive.drii.org/wp-content/uploads/sites/2/2016/04/istock_000063784459_medium.jpg';

interface Props {
  articleData: INewsArticle;
}

const NewsCard: FC<Props> = ({ articleData }) => {
  moment.locale('ru');
  const date = moment(articleData.publishedAt).format('DD MMMM, YYYY');
  return (
    <>
      <a
        className="card card_emergence"
        href={articleData.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="card__wrapper">
          <img
            className="card__image"
            src={articleData.urlToImage || newsDefaultImg}
            alt="image"
          />
          <div className="card__news-info">
            <p className="card__date">{date}</p>
            <h3 className="card__title">{articleData.title}</h3>
            <p className="card__description">{articleData.description}</p>
            <p className="card__source">{articleData.source.name}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default NewsCard;
