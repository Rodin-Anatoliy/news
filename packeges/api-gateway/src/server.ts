process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
process.env.ENV_PATH =
  process.env.NODE_ENV === 'production'
    ? '/../../../prod.env'
    : '/../../../dev.env';

require('dotenv').config({ path: __dirname + process.env.ENV_PATH });
import App from '@/app';
import validateEnv from '@utils/validateEnv';
import NewsRout from '@/routes/news.route';

validateEnv();
const app = new App([new NewsRout()]);

app.listen();
