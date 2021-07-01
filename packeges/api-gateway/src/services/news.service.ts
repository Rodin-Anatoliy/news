import axios from 'axios';
import moment from 'moment';
import HttpException from '@exceptions/HttpException';
import newsSearchResultsModel from '@models/news-search-results.model';
import {
  INewsSearchResults,
  INewsSearchResultsRes,
} from '@interfaces/newsSearchResults.interface';

export class NewsService {
  private key = '2356832b0876432c8814987efd07620a';
  private httpService = axios.create({
    timeout: 30000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  private newsSearchResultsModel = newsSearchResultsModel;

  public async persist(newsSearchResults: INewsSearchResults) {
    return await newsSearchResultsModel.create(newsSearchResults);
  }

  public async findById(id: string): Promise<INewsSearchResultsRes> {
    try {
      const res = await this.newsSearchResultsModel.findById(id);
      return {
        query: res.query,
        createdAt: res.createdAt,
        articles: res.articles,
        id: res.id,
      };
    } catch (error) {
      throw new HttpException(
        500,
        `${error.response.data.message} (error proxied)`,
      );
    }
  }

  public async get({
    query,
  }: {
    query: string;
  }): Promise<INewsSearchResultsRes> {
    try {
      const dateTo = moment().format('YYYY-MM-DD');
      const dateFrom = moment().subtract(7, 'd').format('YYYY-MM-DD');
      const results = await this.httpService.get<any>(
        `https://newsapi.org/v2/everything?language=ru&q=${query}&from=${dateFrom}&to=${dateTo}&sortBy=publishedAt&pageSize=100&apiKey=${this.key}`,
      );
      const res = await this.persist({
        query: query,
        createdAt: `${moment.utc().format()}`,
        articles: results.data.articles,
      });
      return {
        query: query,
        createdAt: `${moment.utc().format()}`,
        articles: results.data.articles,
        id: res.id,
      };
    } catch (error) {
      throw new HttpException(
        500,
        `${error.response.data.message} (error proxied)`,
      );
    }
  }
}
