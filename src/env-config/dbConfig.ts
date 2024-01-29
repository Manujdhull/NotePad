export const dbConfig = (): object => {
  const db = { databases: {} };
  db.databases['default'] = {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    database: process.env.database_name,
    username: process.env.database_username,
    password: process.env.database_password,
    logging: console.log,
    name: 'default',
  } as IDBConfig;
  return db;
};
export interface IDBConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
