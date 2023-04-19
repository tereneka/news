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
      {data &&
        data.articles.map((article) => (
          <NewsCard
            data={article}
            key={nanoid()}
          />
        ))}
    </section>
  );
}
