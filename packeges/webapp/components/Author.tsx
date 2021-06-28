import React, { FC } from 'react';
import Image from 'next/image';
const authorPic = '/../public/assets/author.jpg';

interface Props {}

const Author: FC<Props> = () => {
  return (
    <>
      <section className="author root__section">
        <div className="author__photo">
          <Image
            className="author__photo"
            src={authorPic}
            alt="Picture of the author"
            layout="responsive"
            width="500"
            height="500"
          />
        </div>

        <div className="author__about">
          <h3 className="title title_author">Об авторе</h3>
          <p className="author__description">
            Это блок с описанием автора проекта. Здесь следует указать, как вас
            зовут, чем вы занимаетесь, какими технологиями разработки владеете.
            Также можно рассказать о процессе обучения в Практикуме, чему вы тут
            научились, и чем можете помочь потенциальным заказчикам.
          </p>
        </div>
      </section>
    </>
  );
};

export default Author;
