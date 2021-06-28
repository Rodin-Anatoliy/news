import React, { FC } from 'react';
import styles from './PageHeader';
import classNames from 'classnames';
const githubIcon = '/../public/assets/github.svg';
const facebookIcon = '/../public/assets/facebook.svg';
import Image from 'next/image';
import Link from 'next/link';

interface Props {}

const PageFooter: FC<Props> = () => {
  return (
    <>
      <footer className="footer root__section">
        <p className="footer__copyright">© 2020 Rodin Anatoly</p>
        <nav className="footer__menu">
          <ul className="footer__menu-list">
            <li className="footer__menu-item">
              <Link href="/">
                <a className="footer__link">Главная</a>
              </Link>
            </li>
            <li className="footer__menu-item">
              <Link href="/about">
                <a className="footer__link">О проекте</a>
              </Link>
            </li>
            <li className="footer__menu-item">
              <a
                className="footer__link"
                href="https://praktikum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
          </ul>
        </nav>
        <ul className="footer__social">
          <li className="footer__social-item">
            <a
              className="footer__link"
              href="https://github.com/Rodin-Anatoliy/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="footer__social-icons"
                alt="github"
                src={githubIcon}
                layout="fixed"
                width="20"
                height="20"
              />
            </a>
          </li>
          <li className="footer__social-item">
            <a
              className="footer__link"
              href="https://www.facebook.com/rodin.tolya/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="footer__social-icons"
                src={facebookIcon}
                alt="facebook"
                layout="fixed"
                width="20"
                height="20"
              />
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default PageFooter;
