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
      <cite className='news__source'>
        <img
          className='news__source-img'
          src={
            `${data.link?.slice(0, 8)}${
              data.link?.slice(8).split('/')[0]
            }/favicon.ico` || ''
          }
          alt=''
        />
        {data.source_id}
      </cite>
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
