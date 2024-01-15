import type { Migration } from 'umzug';
import {DataTypes} from 'sequelize'

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('Notes', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
            autoIncrement:true
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
            references:{
                model:"users",
                key:"userName"
            }
		},
        Title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Body:{
            type:DataTypes.STRING,
            allowNull:false
        },
		createdAt:{
			type:DataTypes.DATEONLY
		},
		updatedAt:{
			type:DataTypes.DATEONLY
		}
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('Notes');
};