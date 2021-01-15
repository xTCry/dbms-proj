import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { buy, buyId } from './buy';

export interface providerAttributes {
  id: number;
  vendor: string;
  city: string;
  street_home: string;
  telefone: string;
}

export type providerPk = "id";
export type providerId = provider[providerPk];
export type providerCreationAttributes = Optional<providerAttributes, providerPk>;

export class provider extends Model<providerAttributes, providerCreationAttributes> implements providerAttributes {
  id!: number;
  vendor!: string;
  city!: string;
  street_home!: string;
  telefone!: string;

  // provider hasMany buy
  buys!: buy[];
  getbuys!: Sequelize.HasManyGetAssociationsMixin<buy>;
  setbuys!: Sequelize.HasManySetAssociationsMixin<buy, buyId>;
  addbuy!: Sequelize.HasManyAddAssociationMixin<buy, buyId>;
  addbuys!: Sequelize.HasManyAddAssociationsMixin<buy, buyId>;
  createbuy!: Sequelize.HasManyCreateAssociationMixin<buy>;
  removebuy!: Sequelize.HasManyRemoveAssociationMixin<buy, buyId>;
  removebuys!: Sequelize.HasManyRemoveAssociationsMixin<buy, buyId>;
  hasbuy!: Sequelize.HasManyHasAssociationMixin<buy, buyId>;
  hasbuys!: Sequelize.HasManyHasAssociationsMixin<buy, buyId>;
  countbuys!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof provider {
    provider.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    vendor: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    street_home: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'provider',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__provider__708F134FA0C3F293",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "providercomp",
        fields: [
          { name: "vendor" },
          { name: "city" },
        ]
      },
    ]
  });
  return provider;
  }
}
