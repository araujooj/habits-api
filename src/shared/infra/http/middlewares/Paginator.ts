import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default function Paginator(req: Request, res: Response, next: NextFunction): void {
  let { perPage, page } = req.query;

  let realPage: number;
  let realTake: number;

  if (perPage) realTake = +perPage;
  else {
    perPage = '15';
    realTake = 15;
  }
  if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
  else {
    realPage = 0;
    page = '1';
  }

  if (realTake > 500) {
    throw new AppError('perPage value can be only until 500 units');
  }

  const intPage = Number(page);

  const nextUrl = `${process.env.APP_API_URL}${req.baseUrl}?perPage=${perPage}&page=${intPage + 1}`;

  const previousUrl = `${process.env.APP_API_URL}${req.baseUrl}?perPage=${perPage}&page=${
    intPage - 1
  }`;

  res.header('Access-Control-Expose-Headers', '*');
  res.header({ page, perPage });

  req.pagination = {
    page: Number(page),
    nextUrl,
    previousUrl,
    realTake,
    realPage,
  };

  return next();
}
