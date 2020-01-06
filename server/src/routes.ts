import { Request, Response, Application } from "express";
import * as authRouter from "./auth/auth.router";
import * as valueRouter from "./values/value.router";
import * as showRouter from "./show/show.router";
import { AuthMiddleware } from "core/middlewares/auth.middleware";
import Environment from "environment";

export const connect = (app: Application) => {
  app.route("/").get((_req: Request, res: Response) => {
    res.status(200).send({
      message: `API ${Environment.nodeEnv} Worked!`
    });
  });
  app.use("/auth", authRouter.itemsRouter);
  app.use("/shows", showRouter.itemsRouter);
  app.use("/values", AuthMiddleware([]), valueRouter.itemsRouter);
};
