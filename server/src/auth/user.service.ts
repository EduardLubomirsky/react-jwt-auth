import { Model } from "sequelize";
import { UserEntity, UserRole } from "./user.entity";
export interface UserSequelizeScheme extends UserEntity, Model<UserEntity> {}

export class UserModel extends Model implements UserEntity {
  id: number;
  email: string;
  fullName: string;
  password: string;
  role: UserRole;
}

export const add = async (entity: UserEntity): Promise<UserEntity> => {
  let newValue = await UserModel.create(entity);
  return newValue;
};

export const findOne = async (
  email: string
): Promise<UserEntity> => {
  const result = await UserModel.findOne({
    where: { email: email}
  });
  return result;
};
