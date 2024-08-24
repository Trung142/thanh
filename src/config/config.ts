import { SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();
const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DIALECT
  } = process.env;
const config: { [key: string]: SequelizeOptions } = {
  development: {
    username: DB_USER || 'ux2tiqpc65zlyljc',
    password: DB_PASSWORD || 'g0tvvZbo0IETZN7sgJ2o',
    database: DB_NAME || 'beebpobbvhjwfyhjmy1x',
    host: DB_HOST || 'beebpobbvhjwfyhjmy1x-mysql.services.clever-cloud.com',
    port: parseInt(DB_PORT || '3306', 10),
    dialect: DB_DIALECT as any || 'mysql', // Điều chỉnh dialect cho phù hợp (postgres, mysql, sqlite, etc.)
    logging: false
  },
  test: {
    username: DB_USER || 'ux2tiqpc65zlyljc',
    password: DB_PASSWORD || 'g0tvvZbo0IETZN7sgJ2o',
    database: DB_NAME || 'beebpobbvhjwfyhjmy1x',
    host: DB_HOST || 'beebpobbvhjwfyhjmy1x-mysql.services.clever-cloud.com',
    port: parseInt(DB_PORT || '3306', 10),
    dialect: DB_DIALECT as any || 'mysql', // Điều chỉnh dialect cho phù hợp (postgres, mysql, sqlite, etc.)
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'production_db',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
  }
};

export default config;
