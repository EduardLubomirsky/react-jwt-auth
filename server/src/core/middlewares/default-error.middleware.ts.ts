import { Response, NextFunction, Request } from "express";
import { ErrorRequestHandler } from "express-serve-static-core";
import { HttpException } from "core/common/http-exception";
import { logError } from "core/common/logger";
export const DefaultErrorMiddleware: ErrorRequestHandler = async (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  const error = err as Error;
  if (err instanceof HttpException) {
    res.status(400).send((error as HttpException).messages);
    return;
  }
  logError(`${error.name} ${error.message} ${error.stack}`);
  res.sendStatus(500).send("Internal Server Error!");
};
