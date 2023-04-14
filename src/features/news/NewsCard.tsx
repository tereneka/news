import React from 'react';
import { Article } from '../../types';

interface Props {
  data: Article;
}

export default function NewsCard({
  data,
}: Props) {
  return (
    <article>
      <cite>{data.source.name}</cite>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
    </article>
  );
}
