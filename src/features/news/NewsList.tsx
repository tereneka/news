import React from 'react';
import { Article, NewsData } from '../../types';
import NewsCard from './NewsCard';
import { nanoid } from 'nanoid';

interface Props {
  data: NewsData | undefined;
}

export default function NewsList({
  data,
}: Props) {
  return (
    <section className='news'>
      {data && (
        <ul className='news__list'>
          {data.articles.map((article) => (
            <li
              className='news__list-item'
              key={nanoid()}>
              <NewsCard data={article} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
