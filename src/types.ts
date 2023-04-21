interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsData {
  status: 'ok' | 'error';
  totalResults: number;
  articles: Article[];
}

interface NewsReqParams {
  endPoint: string;
  page: number;
  category?: string;
  country?: string;
  q?: string;
}

export type { Article, NewsData, NewsReqParams };
