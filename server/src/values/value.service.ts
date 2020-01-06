import { Model } from "sequelize";
import { ValueEntity } from "./value.entity";
export class ValueModel extends Model implements ValueEntity {
  id: number;
  text: string;
}

export const add = async (value: ValueEntity) => {
  value.id = undefined;
  let newValue = await ValueModel.create(value);
  return newValue as ValueEntity;
};

export const get = async () => {
  const values: ValueEntity[] = await ValueModel.findAll();
  return values;
};
