import React, { useState } from 'react';
import { Article } from '../../types';

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

  return (
    <article className='news__article'>
      <h3 className='news__title'>
        {data.title}
      </h3>

      <div className='news__contant'>
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
            src={
              `${data.url?.slice(0, 8)}${
                data.url?.slice(8).split('/')[0]
              }/favicon.ico` || ''
            }
            onError={() => setIsSourceImg(false)}
            alt=''
          />
        )}

        <p className='news__source-text'>
          {data.source.name}
        </p>
        <p className='news__source-text'>
          {new Date(
            data.publishedAt
          ).toLocaleDateString() +
            ' ' +
            new Date(data.publishedAt)
              .toTimeString()
              .slice(0, 5)}
        </p>
      </cite>
    </article>
  );
}
