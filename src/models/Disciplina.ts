import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Professores } from "./Professores";

export class Disciplina extends Model{
    public id!: number;
    public nome!: string;
    public id_professor!: number;
}

Disciplina.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        id_professor: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
            references: {
                model: Professores,
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "disciplinas",
        timestamps: false, 
        paranoid: false,
    }
)