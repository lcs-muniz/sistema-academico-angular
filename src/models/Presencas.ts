import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../instances/mysql';
import { Aluno } from './Aluno';
import { Disciplina } from './Disciplina';

export class Presencas extends Model {
    public id!: number;
    public alunoId!: number | null;
    public disciplinaId!: number | null;
    public data!: Date | null;
    public presente!: number | null;
}

Presencas.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        alunoId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Aluno,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        disciplinaId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Disciplina,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        data: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        presente: {
            type: DataTypes.TINYINT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'presencas',
        timestamps: true,
        paranoid: true,
    }
)