// import {  } from 'umzug';
const umzug =require('umzug');
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(
	process.env.database_name,
	process.env.database_username,
	process.env.database_password,
	{
	host:"localhost",
	dialect: 'mysql'
});

export const migrator = new umzug.Umzug({
	migrations: {
		glob: ['src/databases/migrations/*.ts', { cwd: __dirname }],
	},
	context: sequelize,
	storage: new umzug.SequelizeStorage({
		sequelize,
	}),
});

export type Migration =  (typeof migrator._types.migration);