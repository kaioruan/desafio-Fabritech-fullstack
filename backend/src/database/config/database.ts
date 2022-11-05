import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  host: process.env.DB_HOST || '192.168.0.7',
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASS || '12345678@',
  database: 'Desafio Fabritech',
  port: Number(process.env.DB_PORT) || 3004,
  dialect: 'mssql',
}

module.exports = config;
