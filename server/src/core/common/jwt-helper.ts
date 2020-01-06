import Environment from "environment";
import * as jsonwebtoken from "jsonwebtoken";
import { UserEntity, UserRole } from "auth/user.entity";

export interface AuthContext {
  id: number;
  email: string;
  userRole: UserRole;
}

export interface IRequest extends Request {
  user?: AuthContext;
}

export const authenticate = (user: UserEntity) => {
  const authContext: AuthContext = {
    id: user.id,
    email: user.email,
    userRole: user.role
  };
  const token = jsonwebtoken.sign(authContext, Environment.secret, {
    expiresIn: Environment.tokenExpiresIn
  });
  return {
    token: token,
    user: authContext,
    expiresIn: Environment.tokenExpiresIn
  };
};

export const verify = (token: string): Promise<AuthContext> => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, Environment.secret, (err, decoded) => {
      if (err) {
        reject(null);
        return;
      }
      resolve(decoded);
    });
  });
};
