import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerSpec.js';
import applyFormRoute from './routes/applyFormRoute.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { requestLogger } from './middleware/logger.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api', apiLimiter);

app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customSiteTitle: 'Apply Form API Documentation',
    }),
);

app.use('/api/apply-form', applyFormRoute);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
