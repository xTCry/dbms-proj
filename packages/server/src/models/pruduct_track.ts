import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { component, componentId } from './component';
import type { order, orderId } from './order';

export interface pruduct_trackAttributes {
  id: number;
  order_id: number;
  component_id?: number;
  quantity: number;
  date_taken: string;
}

export type pruduct_trackPk = "id";
export type pruduct_trackId = pruduct_track[pruduct_trackPk];
export type pruduct_trackCreationAttributes = Optional<pruduct_trackAttributes, pruduct_trackPk>;

export class pruduct_track extends Model<pruduct_trackAttributes, pruduct_trackCreationAttributes> implements pruduct_trackAttributes {
  id!: number;
  order_id!: number;
  component_id?: number;
  quantity!: number;
  date_taken!: string;

  // pruduct_track belongsTo component
  component!: component;
  getcomponent!: Sequelize.BelongsToGetAssociationMixin<component>;
  setcomponent!: Sequelize.BelongsToSetAssociationMixin<component, componentId>;
  createcomponent!: Sequelize.BelongsToCreateAssociationMixin<component>;
  // pruduct_track belongsTo order
  order!: order;
  getorder!: Sequelize.BelongsToGetAssociationMixin<order>;
  setorder!: Sequelize.BelongsToSetAssociationMixin<order, orderId>;
  createorder!: Sequelize.BelongsToCreateAssociationMixin<order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof pruduct_track {
    pruduct_track.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    component_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'component',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    date_taken: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pruduct_track',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__pruduct___7F2A977145CBA56D",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return pruduct_track;
  }
}
