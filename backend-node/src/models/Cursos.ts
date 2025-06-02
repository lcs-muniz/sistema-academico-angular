import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../instances/mysql';

export class Cursos extends Model{
    public id!: number;
    public nome!: string;
    public descricao!: string | null;

}

Cursos.init (
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

        descricao:{
            type: DataTypes.TEXT,
            allowNull: true,
            unique: false,
        }
    },
    {
        sequelize,
        tableName: "cursos",
        timestamps: true, 
        paranoid: true,
    }
)