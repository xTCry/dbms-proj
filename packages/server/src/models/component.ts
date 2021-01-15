import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { buy, buyId } from './buy';
import type { maker, makerId } from './maker';
import type { pruduct_track, pruduct_trackId } from './pruduct_track';
import type { telefone, telefoneId } from './telefone';

export interface componentAttributes {
  id: number;
  telefone_id: number;
  maker_id: number;
  name_component: string;
  price_install: number;
  price_client: number;
}

export type componentPk = "id";
export type componentId = component[componentPk];
export type componentCreationAttributes = Optional<componentAttributes, componentPk>;

export class component extends Model<componentAttributes, componentCreationAttributes> implements componentAttributes {
  id!: number;
  telefone_id!: number;
  maker_id!: number;
  name_component!: string;
  price_install!: number;
  price_client!: number;

  // component hasMany buy
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
  // component belongsTo maker
  maker!: maker;
  getmaker!: Sequelize.BelongsToGetAssociationMixin<maker>;
  setmaker!: Sequelize.BelongsToSetAssociationMixin<maker, makerId>;
  createmaker!: Sequelize.BelongsToCreateAssociationMixin<maker>;
  // component belongsTo telefone
  telefone!: telefone;
  gettelefone!: Sequelize.BelongsToGetAssociationMixin<telefone>;
  settelefone!: Sequelize.BelongsToSetAssociationMixin<telefone, telefoneId>;
  createtelefone!: Sequelize.BelongsToCreateAssociationMixin<telefone>;
  // component hasMany pruduct_track
  pruduct_tracks!: pruduct_track[];
  getpruduct_tracks!: Sequelize.HasManyGetAssociationsMixin<pruduct_track>;
  setpruduct_tracks!: Sequelize.HasManySetAssociationsMixin<pruduct_track, pruduct_trackId>;
  addpruduct_track!: Sequelize.HasManyAddAssociationMixin<pruduct_track, pruduct_trackId>;
  addpruduct_tracks!: Sequelize.HasManyAddAssociationsMixin<pruduct_track, pruduct_trackId>;
  createpruduct_track!: Sequelize.HasManyCreateAssociationMixin<pruduct_track>;
  removepruduct_track!: Sequelize.HasManyRemoveAssociationMixin<pruduct_track, pruduct_trackId>;
  removepruduct_tracks!: Sequelize.HasManyRemoveAssociationsMixin<pruduct_track, pruduct_trackId>;
  haspruduct_track!: Sequelize.HasManyHasAssociationMixin<pruduct_track, pruduct_trackId>;
  haspruduct_tracks!: Sequelize.HasManyHasAssociationsMixin<pruduct_track, pruduct_trackId>;
  countpruduct_tracks!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof component {
    component.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    telefone_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'telefone',
        key: 'id'
      }
    },
    maker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'maker',
        key: 'id'
      }
    },
    name_component: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    price_install: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    price_client: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'component',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__componen__015144A49211AFB1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return component;
  }
}
