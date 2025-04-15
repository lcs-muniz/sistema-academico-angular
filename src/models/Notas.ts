import { Model, DataTypes, DecimalDataType } from "sequelize";
import { sequelize } from "../instances/mysql";

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
        },
        disciplinaId: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: true,
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
        tableName: "cursos",
        timestamps: false, 
        paranoid: false,
    }
)