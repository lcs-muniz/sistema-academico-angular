import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../instances/mysql';
import { Turmas } from './Turmas';

export class Aluno extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public matricula!: string;
    public id_turma!: number | null; 
}

Aluno.init(
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
        id_turma: {
            type: DataTypes.INTEGER,
            unique: false,
            allowNull: true,
            references: {
                model: Turmas,
                key: "id",
            },
        },
    },
    {
        sequelize,
        tableName: "alunos",
        paranoid:true,
        timestamps: true,
    }
);
