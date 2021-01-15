import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface graphicAttributes {
  id: number;
  graphic_work: string;
  graphic_hours: number;
}

export type graphicPk = "id";
export type graphicId = graphic[graphicPk];
export type graphicCreationAttributes = Optional<graphicAttributes, graphicPk>;

export class graphic extends Model<graphicAttributes, graphicCreationAttributes> implements graphicAttributes {
  id!: number;
  graphic_work!: string;
  graphic_hours!: number;

  // graphic hasMany users
  users!: users[];
  getusers!: Sequelize.HasManyGetAssociationsMixin<users>;
  setusers!: Sequelize.HasManySetAssociationsMixin<users, usersId>;
  adduser!: Sequelize.HasManyAddAssociationMixin<users, usersId>;
  addusers!: Sequelize.HasManyAddAssociationsMixin<users, usersId>;
  createuser!: Sequelize.HasManyCreateAssociationMixin<users>;
  removeuser!: Sequelize.HasManyRemoveAssociationMixin<users, usersId>;
  removeusers!: Sequelize.HasManyRemoveAssociationsMixin<users, usersId>;
  hasuser!: Sequelize.HasManyHasAssociationMixin<users, usersId>;
  hasusers!: Sequelize.HasManyHasAssociationsMixin<users, usersId>;
  countusers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof graphic {
    graphic.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    graphic_work: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    graphic_hours: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'graphic',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__graphic__EC24C93089B138BF",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return graphic;
  }
}
