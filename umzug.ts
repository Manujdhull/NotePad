// import {  } from 'umzug';
const umzug =require('umzug');
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(
	// "NotePad",
	// "mackmanuj",
	// "Rubi@123",
	process.env.database,
	process.env.username,
	process.env.password,
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
	logger: console,
});

export type Migration =  (typeof migrator._types.migration);