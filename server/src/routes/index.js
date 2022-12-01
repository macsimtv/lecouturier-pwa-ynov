import Router from '@koa/router';
import todoRoutes from '../components/todo/todo.routes.js';
import listRoutes from '../components/list/list.routes.js';

const API_V1_PREFIX = new Router({ prefix: '/api/v1' });

API_V1_PREFIX.use('/todo', todoRoutes.routes(), todoRoutes.allowedMethods());
API_V1_PREFIX.use('/list', listRoutes.routes(), listRoutes.allowedMethods());

export { API_V1_PREFIX };