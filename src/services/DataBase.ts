import knex, {Knex} from 'knex';
import {config} from 'dotenv';


export default class DataBase {

  protected connection(): Knex {
    config();

    return knex({
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA
      }
    });
  }

  protected  closeConnection(){
    return this.connection().destroy();
  }
}