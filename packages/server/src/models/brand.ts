import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { model, modelId } from './model';

export interface brandAttributes {
  id: number;
  brand: string;
}

export type brandPk = "id";
export type brandId = brand[brandPk];
export type brandCreationAttributes = Optional<brandAttributes, brandPk>;

export class brand extends Model<brandAttributes, brandCreationAttributes> implements brandAttributes {
  id!: number;
  brand!: string;

  // brand hasMany model
  models!: model[];
  getmodels!: Sequelize.HasManyGetAssociationsMixin<model>;
  setmodels!: Sequelize.HasManySetAssociationsMixin<model, modelId>;
  addmodel!: Sequelize.HasManyAddAssociationMixin<model, modelId>;
  addmodels!: Sequelize.HasManyAddAssociationsMixin<model, modelId>;
  createmodel!: Sequelize.HasManyCreateAssociationMixin<model>;
  removemodel!: Sequelize.HasManyRemoveAssociationMixin<model, modelId>;
  removemodels!: Sequelize.HasManyRemoveAssociationsMixin<model, modelId>;
  hasmodel!: Sequelize.HasManyHasAssociationMixin<model, modelId>;
  hasmodels!: Sequelize.HasManyHasAssociationsMixin<model, modelId>;
  countmodels!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof brand {
    brand.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    brand: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'brand',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__brand__4D3CE12898B02997",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return brand;
  }
}
