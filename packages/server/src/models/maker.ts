import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { component, componentId } from './component';

export interface makerAttributes {
  id: number;
  maker: string;
  country_make: string;
}

export type makerPk = "id";
export type makerId = maker[makerPk];
export type makerCreationAttributes = Optional<makerAttributes, makerPk>;

export class maker extends Model<makerAttributes, makerCreationAttributes> implements makerAttributes {
  id!: number;
  maker!: string;
  country_make!: string;

  // maker hasMany component
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

  static initModel(sequelize: Sequelize.Sequelize): typeof maker {
    maker.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    maker: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    country_make: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'maker',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__maker__708F134F7DAA1D77",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return maker;
  }
}
