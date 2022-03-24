import { NextFunction, Request } from 'express';

const paginate =
  (genericArray: Array<any>) =>
  (req: Request, _: any, next: NextFunction): void => {
    const page: number = parseInt(req.query.page as string, 10) ?? 1;
    const perPage = parseInt(req.query.perPage as string, 10) ?? 10;
    const paginated = genericArray.slice((page - 1) * perPage, perPage * page);

    req.paginated = paginated;

    return next();
  };

export default paginate;
