import sequelize, { DataTypes } from 'sequelize';
import type { Migration } from 'umzug';

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn(
        'Users',
        'Email',
        {
            type: DataTypes.STRING,
            defaultValue: null
        }
    )
};
export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColoum(
        'Users',
        'Email'
    );
};
