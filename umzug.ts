// import {  } from 'umzug';
const umzug =require('umzug');
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
	"NotePad",
	"mackmanuj",
	"Rubi@123",
	{
	host:"localhost",
	dialect: 'mysql'
});

export const migrator = new umzug.Umzug({
	migrations: {
		glob: ['src/migrations/*.ts', { cwd: __dirname }],
	},
	context: sequelize,
	storage: new umzug.SequelizeStorage({
		sequelize,
	}),
	logger: console,
});

export type Migration =  (typeof migrator._types.migration);