export interface INewsSearchResults {
  query: string;
  createdAt: string;
  articles: INewsArticles[];
}

interface INewsArticles {
  source: INewsArticlesSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface INewsArticlesSource {
  id: string;
  name: string;
}

export interface INewsSearchResultsRes {
  id: string;
  articles: INewsArticles[];
}
