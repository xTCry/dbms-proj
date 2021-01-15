import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';

export interface clientAttributes {
  id: number;
  surname: string;
  name: string;
  mid_name?: string;
  mob_telefone: string;
}

export type clientPk = "id";
export type clientId = client[clientPk];
export type clientCreationAttributes = Optional<clientAttributes, clientPk>;

export class client extends Model<clientAttributes, clientCreationAttributes> implements clientAttributes {
  id!: number;
  surname!: string;
  name!: string;
  mid_name?: string;
  mob_telefone!: string;

  // client hasMany order
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

  static initModel(sequelize: Sequelize.Sequelize): typeof client {
    client.init({
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
    mob_telefone: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'client',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PK__client__6EC2B6C001B8E2B3",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return client;
  }
}
