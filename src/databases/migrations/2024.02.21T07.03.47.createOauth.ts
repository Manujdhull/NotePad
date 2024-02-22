import type { Migration } from 'umzug';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('UserOauth', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      type: DataTypes.STRING,
    },

    displayName: {
      type: DataTypes.STRING,
    },

    createdAt: {
      type: DataTypes.DATE,
      default: DataTypes.NOW(),
    },

    updatedAt: {
      type: DataTypes.DATE,
      default: DataTypes.NOW(),
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('UserOauth');
};
