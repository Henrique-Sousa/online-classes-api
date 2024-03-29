import express from 'express';
import { connect } from 'mongoose';
import passport from 'passport';
import './config/passportConfig';
import classesRouter from './routes/classes';
import logUserIn from './controllers/userController';

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

async function run(): Promise<void> {
  await connect('mongodb://localhost:27017/tindin');
}

run().catch((err) => console.log(err));

const app = express();

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*', (_req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  next();
});

app.post('/users', logUserIn);
app.use('/classes', passport.authenticate('jwt', { session: false }), classesRouter);

app.listen(3000);
