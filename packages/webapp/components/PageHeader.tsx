import React, { FC } from 'react';
import styles from './PageHeader';
import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  theme: string;
  selectedPage: string;
  handleFormSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSearchInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newsQuery?: string;
}

const PageHeader: FC<Props> = ({
  theme,
  selectedPage,
  handleFormSubmit,
  newsQuery,
  handleSearchInput,
}) => {
  return (
    <>
      <header
        className={`header ${
          selectedPage === 'main' ? 'header_main' : 'header_light'
        }`}
      >
        <nav className={`menu menu_${theme} root__section`}>
          <Link href="/">
            <a className={`logo logo_${theme}`}>NewsAnalyzer</a>
          </Link>

          <ul className="menu__list">
            <li
              className={`menu__item ${
                selectedPage === 'main' && 'menu__item_main-page'
              }`}
            >
              <Link href="/">
                <a
                  className={`menu__link menu__link_${theme} ${
                    selectedPage === 'main' && 'menu__link_main-page'
                  }`}
                >
                  Главная
                </a>
              </Link>
            </li>
            <li
              className={`menu__item ${
                selectedPage === 'about' && 'menu__item_about-page'
              }`}
            >
              <Link href="/about">
                <a
                  className={`menu__link menu__link_${theme} ${
                    selectedPage === 'about' && 'menu__link_about-page'
                  }`}
                >
                  О проекте
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        {selectedPage === 'main' && (
          <div className="header__search root__section">
            <h1 className="title title_header">Что в мире творится?</h1>
            <p className="header__subtitle">
              Введите в поиске любую тему и узнайте, насколько популярной она
              была в новостях за прошедшую неделю.
            </p>
            <form className="search" onSubmit={handleFormSubmit}>
              <input
                className="search__input"
                type="search"
                placeholder="Введите тему новости"
                value={newsQuery}
                onChange={handleSearchInput}
              />
              <button className="button button_search" type="submit">
                Искать
              </button>
            </form>
            <p className="search__error">Задан пустой поисковый запрос</p>
          </div>
        )}
      </header>
    </>
  );
};

export default PageHeader;
