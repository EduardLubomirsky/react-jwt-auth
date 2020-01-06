import { Response, NextFunction } from "express";
import * as JwtHelper from "core/common/jwt-helper";
import { UserRole } from "auth/user.entity";
import { IRequest } from "core/common/jwt-helper";

export const AuthMiddleware = (permissions: UserRole[]): any => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      var token = req.headers["authorization"] as string;
      if (!token) {
        return res
          .status(401)
          .send({ auth: false, message: "No token provided." });
      }
      const authContext = await JwtHelper.verify(token);
      if (!authContext) {
        return res
          .status(401)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      if (
        permissions.length !== 0 &&
        permissions.filter(p => p === authContext.userRole).length === 0
      ) {
        return res
          .status(401)
          .send({ auth: false, message: "You don't have such permissions!" });
      }
      req["user"] = authContext;
      next();
    } catch (e) {
      return res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
  };
};
