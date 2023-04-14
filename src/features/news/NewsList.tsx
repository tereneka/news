import React from 'react';
import { NewsData } from '../../types';
import NewsCard from './NewsCard';
import { nanoid } from 'nanoid';

interface Props {
  data: NewsData | undefined;
}

export default function NewsList({
  data,
}: Props) {
  return (
    <section>
      {data && (
        <ul>
          {data.articles.map((article) => (
            <li key={nanoid()}>
              <NewsCard data={article} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
