import express from 'express';
import morgan from 'morgan';
import { generateWorkflowHandler } from './routes/generate';
import { errorHandler } from './middleware/error-handler';
import { healthHandler } from './routes/health';

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

app.get('/health', healthHandler);
app.post('/generate', generateWorkflowHandler);

app.use(errorHandler);

export default app;

