import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';

export interface second_inspectAttributes {
  id: number;
  fault: string;
  price_diagnose: number;
  date_inspect: string;
}

export type second_inspectPk = "id";
export type second_inspectId = second_inspect[second_inspectPk];
export type second_inspectCreationAttributes = Optional<second_inspectAttributes, second_inspectPk>;

export class second_inspect extends Model<second_inspectAttributes, second_inspectCreationAttributes> implements second_inspectAttributes {
  id!: number;
  fault!: string;
  price_diagnose!: number;
  date_inspect!: string;

  // second_inspect hasMany order
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

  static initModel(sequelize: Sequelize.Sequelize): typeof second_inspect {
    second_inspect.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fault: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price_diagnose: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    date_inspect: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'second_inspect',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__second_i__BA68297DA2C656B6",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return second_inspect;
  }
}
