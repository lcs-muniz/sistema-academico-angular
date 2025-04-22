import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Aluno } from './Aluno';
import { Disciplina } from './Disciplina';

export class Presencas extends Model {
    public id!: number;
    public alunoId!: number;
    public disciplinaId!: number;
    public data!: Date;
    public presente!: number;
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
            unique: false,

        },
        presente: {
            type: DataTypes.TINYINT,
            allowNull: true,
            unique: false,
        },
    },
    {
        sequelize,
        tableName: 'presencas',
        timestamps: false,
        paranoid: false,
    }
)