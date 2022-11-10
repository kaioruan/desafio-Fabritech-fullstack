import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  host: process.env.DB_HOST || '192.168.0.7',
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASS || 'aA12345678@',
  database: 'Desafio Fabritech',
  dialect: 'mssql',
  dialectOptions: {
    trustServerCertificate: true,
  },
  logging: false,
}

module.exports = config;
