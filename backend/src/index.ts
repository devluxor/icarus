import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import cors from 'cors';

import asteroidRouter from './routes/asteroidRouter';
import errorHandler from './middleware/errorHandler';
import unknownEndpoint from './middleware/unknownEndpoint';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(bodyParser.json());

app.use('/api/asteroids', asteroidRouter);

app.use(errorHandler);
app.use(unknownEndpoint);


app.listen(PORT, () => {
  console.log(`Icarus server running on ${PORT} 🌠`);
});