import * as ShowService from "show/show.service";
import { Router, Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "core/middlewares/auth.middleware";

export const itemsRouter = Router();

itemsRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const shows = await ShowService.getAll();
      res.status(200).send(shows);
    } catch (e) {
      next(e);
    }
  }
);

itemsRouter.get(
  "/:id",
  AuthMiddleware([]),
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { params: { id } } = _req;
      const show = await ShowService.getById(+id);
      res.status(200).send(show);
    } catch (e) {
      next(e);
    }
  }
);
