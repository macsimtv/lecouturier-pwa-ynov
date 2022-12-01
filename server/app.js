import './src/config/database.js';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';
import serve from 'koa-static';
import cors from '@koa/cors';

import { API_V1_PREFIX } from './src/routes/index.js';

const app = new Koa()

app
    .use(cors('*'))
    .use(serve('public'))
    .use(bodyParser())
    .use(respond())
    .use(API_V1_PREFIX.routes())
    .use(API_V1_PREFIX.allowedMethods())

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ http://locahost:${PORT}`))