import express from 'express';
import morgan from 'morgan';
import routes from './routes';

import { createRoles } from './libs/initialSetup';

const app = express();

createRoles();

app.use(express.json());
app.use(morgan('dev'));
app.use(routes);

export default app;