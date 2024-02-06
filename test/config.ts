import { Options } from '@mikro-orm/core';
import { MongoDriver } from '@mikro-orm/mongodb';
import { MySqlDriver } from '@mikro-orm/mysql';
require('dotenv').config()

export const connectionConfig: Options = {
  driver: MySqlDriver,
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '', 10) || 3306,
  user: process.env.MYSQL_USER || 'root',
  password:
    process.env.MYSQL_PASSWORD !== undefined
      ? process.env.MYSQL_PASSWORD === ''
        ? undefined
        : process.env.MYSQL_PASSWORD
      : 'password',
  dbName: process.env.MYSQL_DB || 'casbin'
}

export const mongoConnectionConfig: Options = {
  driver: MongoDriver,
  dbName: process.env.MONGODB_DB_NAME,
  clientUrl: process.env.MONGODB_CLIENT_URL
}