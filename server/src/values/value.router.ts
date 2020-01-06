import * as ValueService from "values/value.service";
import { Router, Request, Response, NextFunction } from "express";

export const itemsRouter = Router();

itemsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqModel: {
        text: string;
        id: undefined;
      } = { ...req.body };
      await ValueService.add(reqModel);
      res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);
itemsRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const values = await ValueService.get();
      res.status(200).send(values);
    } catch (e) {
      next(e);
    }
  }
);
