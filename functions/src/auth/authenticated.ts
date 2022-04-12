import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export async function isAuthenticated(req: Request, res: Response, next: any) {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({ message: 'Unauthorized not authroized' });

  if (!authorization.startsWith('Bearer'))
    return res
      .status(401)
      .send({ message: 'Unauthorized doesnt start with bearer' });

  const split = authorization.split('Bearer ');
  if (split.length !== 2)
    return res.status(401).send({ message: 'Unauthorized no token' });

  const token = split[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);
    console.log('decodedToken', JSON.stringify(decodedToken));
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      role: decodedToken.role,
      email: decodedToken.email,
    };
    return next();
  } catch (er) {
    const err: any = er;
    console.error(`${err.code} -  ${err.message}`);
    return res.status(401).send({ message: `${err.code} -  ${err.message}` });
  }
}
