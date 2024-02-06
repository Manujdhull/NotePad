import { DataTypes } from 'sequelize';
import type { Migration } from 'umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn('Notes', 'deletedAt', {
    type: DataTypes.DATE,
    defaultValue: null,
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn('Notes', 'deletedAt');
};
