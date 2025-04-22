import { Model, DataTypes, DecimalDataType } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";

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
            unique: true,
            references: {
                model: Aluno,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        disciplinaId: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: true,
            references: {
                model: Disciplina,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        nota: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            unique: false,
        },
        data_avaliacao: {
            type: DataTypes.DATE,
            allowNull: true,
            unique: false,
        },
    },
    {
        sequelize,
        tableName: "notas",
        timestamps: false, 
        paranoid: false,
    }
)