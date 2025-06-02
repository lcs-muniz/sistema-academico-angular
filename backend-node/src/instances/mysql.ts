// src/instances/mysql.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_DB : process.env.MYSQL_DB;
const dbUser = process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_USER : process.env.MYSQL_USER;
const dbPassword = process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_PASSWORD : process.env.MYSQL_PASSWORD;
const dbHost = process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_HOST : process.env.MYSQL_HOST;
const dbPort = process.env.NODE_ENV === 'test' ? process.env.MYSQL_TEST_PORT : process.env.MYSQL_PORT;

if (!dbName || !dbUser || !dbHost || !dbPort) {
    console.error("Variáveis de ambiente do banco de dados não configuradas corretamente!");
    process.exit(1);
}

export const sequelize = new Sequelize(
    dbName as string,
    dbUser as string,
    dbPassword as string,
    {
        dialect: 'mysql',
        port: parseInt(dbPort as string),
        host: dbHost as string,
        logging: process.env.NODE_ENV === 'test' ? false : console.log,
    }
);

export const conectarBanco = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado ao banco com sucesso!");
        if (process.env.NODE_ENV !== 'test') {
            await sequelize.sync({ alter: true });
        }
    } catch (error) {
        console.error("Erro ao conectar ou sincronizar com o banco de dados:", error);
        if (process.env.NODE_ENV === 'test') {
            throw error;
        }
    }
};