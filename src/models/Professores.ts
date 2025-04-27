import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export class Professores extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public matricula!: string;
}

Professores.init(
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
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        matricula: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "professores",
        paranoid: true,
        timestamps: true,
    }
);
