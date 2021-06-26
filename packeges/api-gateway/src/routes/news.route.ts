import { Router } from 'express';
import { NewsController } from '@controllers/news.controller';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { NewsGetReqDto } from '../dtos/news-get-req.dto';

class HotelsSearchRout implements Route {
  public path = '/news';
  public router = Router();
  public newsController = new NewsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/get`,
      validationMiddleware(NewsGetReqDto, 'query'),
      this.newsController.getNews,
    );
  }
}

export default HotelsSearchRout;
