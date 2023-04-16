import React from 'react';
import { Article } from '../../types';

interface Props {
  data: Article;
}

export default function NewsCard({
  data,
}: Props) {
  return (
    <article className='news__article'>
      <cite className='news__source'>
        {data.source_id}
      </cite>
      <h3 className='news__title'>
        {data.title}
      </h3>
      {data.image_url && (
        <img
          className='news__img'
          src={data.image_url}
          alt='img'
        />
      )}

      <p className='news__description'>
        {data.content
          ? `${data.content.slice(0, 400)}${
              data.content.length > 400
                ? '...'
                : ''
            }`
          : `${
              data.description
                ? data.description
                : ''
            }`}
      </p>
    </article>
  );
}

// export default function NewsCard({
//   data,
// }: Props) {
//   return (
//     <article className='news__article'>
//       <cite className='news__source'>
//         {data.source.name}
//       </cite>
//       <h3 className='news__title'>
//         {data.title}
//       </h3>
//       {data.urlToImage && (
//         <img
//           className='news__img'
//           src={data.urlToImage}
//           alt='img'
//         />
//       )}

//       <p className='news__description'>
//         {data.description}
//       </p>
//     </article>
//   );
// }
