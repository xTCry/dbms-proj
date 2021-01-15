import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';

export interface statusAttributes {
  id: number;
  status_done: string;
}

export type statusPk = "id";
export type statusId = status[statusPk];
export type statusCreationAttributes = Optional<statusAttributes, statusPk>;

export class status extends Model<statusAttributes, statusCreationAttributes> implements statusAttributes {
  id!: number;
  status_done!: string;

  // status hasMany order
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

  static initModel(sequelize: Sequelize.Sequelize): typeof status {
    status.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status_done: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'status',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__status__5D2DC6E8DD6F32FA",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return status;
  }
}
