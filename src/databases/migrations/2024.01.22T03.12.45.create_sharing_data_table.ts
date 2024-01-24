import { DataTypes } from 'sequelize';
import type { Migration } from '../../../umzug';

export const up: Migration = async ({
  context: sequelize,
}: {
  context: any;
}): Promise<void> => {
  await sequelize.getQueryInterface().createTable('SharedNotes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    
    sharedNoteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Notes',
        key: 'id',
      },
    },

    sharedToUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserModels',
        key: 'id',
      },
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
export const down: Migration = async ({
  context: sequelize,
}: {
  context: any;
}): Promise<void> => {
  await sequelize.getQueryInterface().dropTable('SharedNotes');
};
