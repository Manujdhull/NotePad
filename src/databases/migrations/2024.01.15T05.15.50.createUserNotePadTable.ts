import type { Migration } from 'umzug';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('Notes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    userid: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: 'UserModels',
        key: 'id',
      },
    },

    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Body: {
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
  await sequelize.getQueryInterface().dropTable('Notes');
};
