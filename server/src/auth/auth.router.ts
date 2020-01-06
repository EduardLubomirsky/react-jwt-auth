import * as JwtHelper from "core/common/jwt-helper";
import { Router, NextFunction } from "express";
import { AuthMiddleware } from "core/middlewares/auth.middleware";
import * as UserService from "./user.service";
import { Response, Request } from "express";
import { AuthContext } from "core/common/jwt-helper";
import { HttpException } from "core/common/http-exception";
import * as HashEncrypter from "core/common/hash-encrypter";
export const itemsRouter = Router();
import { UserRole } from "./user.entity";

itemsRouter.get(
  "/profile",
  AuthMiddleware([]),
  async (req: Request, res: Response, next: NextFunction) => {
    const user: AuthContext = req["user"];
    try {
      res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }
);

itemsRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqModel: {
        email: string;
        password: string;
      } = { ...req.body };
      const hashedPassword: string = await HashEncrypter.getHash(
        reqModel.password
      );
      console.log(hashedPassword);
      const existedUser = await UserService.findOne(
        reqModel.email
      );
      if (existedUser) {
        throw new HttpException(["User already exist!"]);
      }
      const userEntity = await UserService.add({
        email: reqModel.email,
        password: hashedPassword,
        id: null,
        role: UserRole.Client
      });
      const authContext = JwtHelper.authenticate(userEntity);
      return res.send(authContext);
    } catch (e) {
      next(e);
    }
  }
);

itemsRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqModel: {
        email: string;
        password: string;
      } = { ...req.body };
      const user = await UserService.findOne(reqModel.email);
      
      if (!user) {
        throw new HttpException(["Invalid credentials!"]);
      }

      const result = await HashEncrypter.validateHash(reqModel.password, user.password);

      if (!result) {
        throw new HttpException(["Invalid password!"]);
      }
      const authContext = JwtHelper.authenticate(user);
      return res.send(authContext);
    } catch (e) {
      next(e);
    }
  });
