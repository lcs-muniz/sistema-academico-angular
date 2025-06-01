import { DataTypes, DecimalDataType, Model } from 'sequelize';

import { sequelize } from '../instances/mysql';
import { Aluno } from './Aluno';
import { Disciplina } from './Disciplina';

export class Notas extends Model{
    public id!: number;
    public alunoId!: number;
    public disciplinaId!: number;
    public nota!: DecimalDataType;
    public data_avaliacao!: Date;

}

Notas.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        alunoId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
            references: {
                model: Aluno,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        disciplinaId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
            references: {
                model: Disciplina,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        nota: {
            type: DataTypes.DECIMAL(5,2),
            allowNull: true,
        },
        data_avaliacao: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "notas",
        timestamps: true, 
        paranoid: true,
    }
)