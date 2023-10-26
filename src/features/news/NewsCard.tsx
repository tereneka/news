import React, { useState } from 'react';
import { Article } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  data: Article;
}

export default function NewsCard({
  data,
}: Props) {
  const [isImg, setIsImg] = useState(
    !!data.urlToImage
  );
  const [isSourceImg, setIsSourceImg] =
    useState(true);

  const sourceImgUrl = `${
    data.url?.slice(0, 8) +
    data.url?.slice(8).split('/')[0]
  }/favicon.ico`;

  const articleDate =
    new Date(
      data.publishedAt
    ).toLocaleDateString() +
    ' ' +
    new Date(data.publishedAt)
      .toTimeString()
      .slice(0, 5);

  return (
    <Link
      className='news__link'
      to={data.url}
      target='_blank'>
      <article className='news__article'>
        <h3 className='news__title'>
          {data.title}
        </h3>

        <div className='news__content'>
          {data.urlToImage && isImg ? (
            <img
              className='news__img'
              src={data.urlToImage}
              onError={() => setIsImg(false)}
              alt=''
            />
          ) : (
            <p className='news__description'>
              {data.description}
            </p>
          )}
        </div>

        <cite className='news__source'>
          {isSourceImg && (
            <img
              className='news__source-img'
              src={sourceImgUrl}
              onError={() =>
                setIsSourceImg(false)
              }
              alt=''
            />
          )}

          <p className='news__source-text'>
            {data.source.name}
          </p>

          <p className='news__source-text'>
            {articleDate}
          </p>
        </cite>
      </article>
    </Link>
  );
}
