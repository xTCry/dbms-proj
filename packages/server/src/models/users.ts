import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { dolzhnost, dolzhnostId } from './dolzhnost';
import type { graphic, graphicId } from './graphic';
import type { order, orderId } from './order';

export interface usersAttributes {
  id: number;
  surname: string;
  name: string;
  mid_name?: string;
  photo_employee: string;
  graphic_id: number;
  position_id: number;
  login?: string;
  password?: string;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersCreationAttributes = Optional<usersAttributes, usersPk>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  surname!: string;
  name!: string;
  mid_name?: string;
  photo_employee!: string;
  graphic_id!: number;
  position_id!: number;
  login?: string;
  password?: string;

  // users hasMany order
  orders!: order[];
  getorders!: Sequelize.HasManyGetAssociationsMixin<order>;
  setorders!: Sequelize.HasManySetAssociationsMixin<order, orderId>;
  addorder!: Sequelize.HasManyAddAssociationMixin<order, orderId>;
  addorders!: Sequelize.HasManyAddAssociationsMixin<order, orderId>;
  createorder!: Sequelize.HasManyCreateAssociationMixin<order>;
  removeorder!: Sequelize.HasManyRemoveAssociationMixin<order, orderId>;
  removeorders!: Sequelize.HasManyRemoveAssociationsMixin<order, orderId>;
  hasorder!: Sequelize.HasManyHasAssociationMixin<order, orderId>;
  hasorders!: Sequelize.HasManyHasAssociationsMixin<order, orderId>;
  countorders!: Sequelize.HasManyCountAssociationsMixin;
  
  // users belongsTo graphic
  graphic!: graphic;
  getgraphic!: Sequelize.BelongsToGetAssociationMixin<graphic>;
  setgraphic!: Sequelize.BelongsToSetAssociationMixin<graphic, graphicId>;
  creategraphic!: Sequelize.BelongsToCreateAssociationMixin<graphic>;
  // users belongsTo dolzhnost
  dolzhnost!: dolzhnost;
  getdolzhnost!: Sequelize.BelongsToGetAssociationMixin<dolzhnost>;
  setdolzhnost!: Sequelize.BelongsToSetAssociationMixin<dolzhnost, dolzhnostId>;
  createdolzhnost!: Sequelize.BelongsToCreateAssociationMixin<dolzhnost>;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    surname: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    mid_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "no"
    },
    photo_employee: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    graphic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'graphic',
        key: 'id'
      }
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dolzhnost',
        key: 'id'
      }
    },
    login: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "employee",
        fields: [
          { name: "position_id" },
        ]
      },
      {
        name: "PK__employee__F807679CD25F68B8",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "providercomp",
        fields: [
          { name: "surname" },
          { name: "name" },
        ]
      },
    ]
  });
  return users;
  }
}
