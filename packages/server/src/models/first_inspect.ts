import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';

export interface first_inspectAttributes {
  id: number;
  visible_defects: string;
  comment_client: string;
  date_inspect: string;
}

export type first_inspectPk = "id";
export type first_inspectId = first_inspect[first_inspectPk];
export type first_inspectCreationAttributes = Optional<first_inspectAttributes, first_inspectPk>;

export class first_inspect extends Model<first_inspectAttributes, first_inspectCreationAttributes> implements first_inspectAttributes {
  id!: number;
  visible_defects!: string;
  comment_client!: string;
  date_inspect!: string;

  // first_inspect hasMany order
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

  static initModel(sequelize: Sequelize.Sequelize): typeof first_inspect {
    first_inspect.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    visible_defects: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    comment_client: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    date_inspect: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'first_inspect',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__first_in__6D84F785F9A92F42",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return first_inspect;
  }
}
