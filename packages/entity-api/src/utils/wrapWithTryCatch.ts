import { Request, Response, NextFunction } from "express";

const wrapWithTryCatch =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };

export default wrapWithTryCatch;
