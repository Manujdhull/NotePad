import type { Migration } from 'umzug';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('UserModels', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
  await sequelize.getQueryInterface().dropTable('UserModels');
};
