import { Model } from "sequelize";
import { ShowEntity } from "./show.entity";

export class ShowModel extends Model implements ShowEntity {
    id: number;
    title: string;
    image: string;
    description: string;
}

export const getAll = async (): Promise<ShowEntity> => {
    const result = await ShowModel.findAll();
    return result;
};

export const getById = async (id: number): Promise<ShowEntity> => {
    const result = await ShowModel.findOne({
        where: {
            id,
        }
    });
    return result;
}
