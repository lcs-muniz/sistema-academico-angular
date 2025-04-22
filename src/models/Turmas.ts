import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Cursos } from "./Cursos";

export class Turmas extends Model {
    public id!: number;
    public nome!: string;
    public periodo!: string;
    public id_curso!: number;
}

Turmas.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
        },
        periodo: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true,
        },
        id_cursos: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Cursos,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "turmas",
        paranoid:false,
        timestamps: false,
    }
);
