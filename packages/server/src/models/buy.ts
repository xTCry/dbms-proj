import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { component, componentId } from './component';
import type { provider, providerId } from './provider';

export interface buyAttributes {
  id: number;
  component_id: number;
  maker_id: number;
  buy_price: number;
  quantity: number;
  date_buy: string;
}

export type buyPk = "id";
export type buyId = buy[buyPk];
export type buyCreationAttributes = Optional<buyAttributes, buyPk>;

export class buy extends Model<buyAttributes, buyCreationAttributes> implements buyAttributes {
  id!: number;
  component_id!: number;
  maker_id!: number;
  buy_price!: number;
  quantity!: number;
  date_buy!: string;

  // buy belongsTo component
  component!: component;
  getcomponent!: Sequelize.BelongsToGetAssociationMixin<component>;
  setcomponent!: Sequelize.BelongsToSetAssociationMixin<component, componentId>;
  createcomponent!: Sequelize.BelongsToCreateAssociationMixin<component>;
  // buy belongsTo provider
  provider!: provider;
  getprovider!: Sequelize.BelongsToGetAssociationMixin<provider>;
  setprovider!: Sequelize.BelongsToSetAssociationMixin<provider, providerId>;
  createprovider!: Sequelize.BelongsToCreateAssociationMixin<provider>;

  static initModel(sequelize: Sequelize.Sequelize): typeof buy {
    buy.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    component_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'component',
        key: 'id'
      }
    },
    maker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'provider',
        key: 'id'
      }
    },
    buy_price: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false
    },
    quantity: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    date_buy: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'buy',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__zakupka__D507E43F8AF1E523",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return buy;
  }
}
