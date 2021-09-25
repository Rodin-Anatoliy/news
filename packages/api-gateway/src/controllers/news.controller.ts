import { NextFunction, Request, Response } from 'express';
import { NewsService } from '@/services/news.service';

export class NewsController {
  constructor() {
    this.newsService = new NewsService();
  }
  private newsService: NewsService;

  public getNews = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.query as any;
    try {
      const result = await this.newsService.get({ query });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getNewsById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { searchId } = req.query as any;
    try {
      const result = await this.newsService.findById(searchId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
