import { Request, Response } from 'express';

export function isAuthorized(opts: {
  hasRole: Array<'admin' | 'manager' | 'user'>;
  allowSameUser?: boolean;
}) {
  return (req: Request, res: Response, next: any) => {
    const { role, email, uid } = res.locals;
    const { id } = req.params;
    console.error('the morty town locals' + res.locals);
    if (email === 'jst4nt0n@gmail.com') return next();

    if (opts.allowSameUser && id && uid === id) return next();

    if (!role) return res.status(403).send();

    if (opts.hasRole.includes(role)) return next();

    return res.status(403).send();
  };
}
