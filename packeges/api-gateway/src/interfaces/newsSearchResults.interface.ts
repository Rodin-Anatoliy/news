export interface INewsSearchResults {
  query: string;
  createdAt: string;
  articles: INewsArticle[];
}

interface INewsArticle {
  source: INewsArticleSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface INewsArticleSource {
  id: string;
  name: string;
}

export interface INewsSearchResultsRes {
  id: string;
  articles: INewsArticle[];
}
