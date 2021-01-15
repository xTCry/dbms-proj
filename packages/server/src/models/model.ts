import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { brand, brandId } from './brand';
import type { telefone, telefoneId } from './telefone';

export interface modelAttributes {
  id: number;
  model: string;
  brand_id: number;
}

export type modelPk = "id";
export type modelId = model[modelPk];
export type modelCreationAttributes = Optional<modelAttributes, modelPk>;

export class model extends Model<modelAttributes, modelCreationAttributes> implements modelAttributes {
  id!: number;
  model!: string;
  brand_id!: number;

  // model belongsTo brand
  brand!: brand;
  getbrand!: Sequelize.BelongsToGetAssociationMixin<brand>;
  setbrand!: Sequelize.BelongsToSetAssociationMixin<brand, brandId>;
  createbrand!: Sequelize.BelongsToCreateAssociationMixin<brand>;
  // model hasMany telefone
  telefones!: telefone[];
  gettelefones!: Sequelize.HasManyGetAssociationsMixin<telefone>;
  settelefones!: Sequelize.HasManySetAssociationsMixin<telefone, telefoneId>;
  addtelefone!: Sequelize.HasManyAddAssociationMixin<telefone, telefoneId>;
  addtelefones!: Sequelize.HasManyAddAssociationsMixin<telefone, telefoneId>;
  createtelefone!: Sequelize.HasManyCreateAssociationMixin<telefone>;
  removetelefone!: Sequelize.HasManyRemoveAssociationMixin<telefone, telefoneId>;
  removetelefones!: Sequelize.HasManyRemoveAssociationsMixin<telefone, telefoneId>;
  hastelefone!: Sequelize.HasManyHasAssociationMixin<telefone, telefoneId>;
  hastelefones!: Sequelize.HasManyHasAssociationsMixin<telefone, telefoneId>;
  counttelefones!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof model {
    model.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    model: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'brand',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'model',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__model__7540352855D00751",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return model;
  }
}
