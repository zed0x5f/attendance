import * as firebaseFunctions from 'firebase-functions';
import * as firebaseAdmin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './users/routes-config';

firebaseAdmin.initializeApp();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));
routesConfig(app);
app.get('/test', (req, res, next) => {
  res.status(200).json({ message: 'hello' });
  return res;
});

export const api = firebaseFunctions.https.onRequest(app);
