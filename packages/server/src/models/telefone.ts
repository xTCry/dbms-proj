import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { component, componentId } from './component';
import type { model, modelId } from './model';
import type { order, orderId } from './order';

export interface telefoneAttributes {
  id: number;
  model_id: number;
  date_issues: string;
}

export type telefonePk = "id";
export type telefoneId = telefone[telefonePk];
export type telefoneCreationAttributes = Optional<telefoneAttributes, telefonePk>;

export class telefone extends Model<telefoneAttributes, telefoneCreationAttributes> implements telefoneAttributes {
  id!: number;
  model_id!: number;
  date_issues!: string;

  // telefone hasMany component
  components!: component[];
  getcomponents!: Sequelize.HasManyGetAssociationsMixin<component>;
  setcomponents!: Sequelize.HasManySetAssociationsMixin<component, componentId>;
  addcomponent!: Sequelize.HasManyAddAssociationMixin<component, componentId>;
  addcomponents!: Sequelize.HasManyAddAssociationsMixin<component, componentId>;
  createcomponent!: Sequelize.HasManyCreateAssociationMixin<component>;
  removecomponent!: Sequelize.HasManyRemoveAssociationMixin<component, componentId>;
  removecomponents!: Sequelize.HasManyRemoveAssociationsMixin<component, componentId>;
  hascomponent!: Sequelize.HasManyHasAssociationMixin<component, componentId>;
  hascomponents!: Sequelize.HasManyHasAssociationsMixin<component, componentId>;
  countcomponents!: Sequelize.HasManyCountAssociationsMixin;
  // telefone hasMany order
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
  // telefone belongsTo model
  model!: model;
  getmodel!: Sequelize.BelongsToGetAssociationMixin<model>;
  setmodel!: Sequelize.BelongsToSetAssociationMixin<model, modelId>;
  createmodel!: Sequelize.BelongsToCreateAssociationMixin<model>;

  static initModel(sequelize: Sequelize.Sequelize): typeof telefone {
    telefone.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'model',
        key: 'id'
      }
    },
    date_issues: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'telefone',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__telefone__28CD6834DB975BA7",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return telefone;
  }
}
