import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import chalk from 'chalk';
import { config } from 'dotenv';

config();

// Middleware imports
import jwtValidation from './middlewares/jwtValidation.middleware.js';

// Route imports
import authRouter from './routes/auth.routes.js';
import paymentRouter from './routes/payment.routes.js';
import userRouter from './routes/user.routes.js';
import examRouter from './routes/exam.routes.js';
import noteRouter from './routes/note.routes.js';
import quickTestRouter from './routes/quickTest.routes.js';

const app = express();

const PORT = process.env.API_PORT || 3000;
const whiteList = ['https://app.teodrive.com', 'http://localhost:5173'];

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: whiteList }));

// Routes
app.use('/auth', authRouter);
app.use('/users', jwtValidation, userRouter);
app.use('/exams', jwtValidation, examRouter);
app.use('/notes', jwtValidation, noteRouter);
app.use('/payments', paymentRouter);
app.use('/quick-test', jwtValidation, quickTestRouter);

// Not Found route
app.use((req, res, next) => {
  return res.status(404).send('404\nNot Found');
});

// Server listening
app.listen(PORT, () => {
  console.log(
    chalk.black.bgGreenBright.bold(` Running \n`) +
      chalk.yellowBright(`🚀 Server listening on port `) +
      chalk.magentaBright.bold(`${PORT}`)
  );
});
