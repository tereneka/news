interface Article {
  title: string | null;
  link: string | null;
  keywords: string[];
  creator: string[] | null;
  video_url: string | null;
  description: string | null;
  content: string | null;
  pubDate: string;
  image_url: string | null;
  source_id: string | null;
  category: string[];
  country: string[];
  language: string;
}

interface NewsData {
  status: 'success' | 'error';
  totalResults: number;
  results: Article[];
  nextPage: string;
}
// interface Article {
//   source: {
//     id: string | null;
//     name: string;
//   };
//   author: string;
//   title: string;
//   description: string | null;
//   url: string;
//   urlToImage: string | null;
//   publishedAt: string;
//   content: string | null;
// }

// interface NewsData {
//   status: 'ok' | 'error';
//   totalResults: number;
//   articles: Article[];
// }

export type { Article, NewsData };
