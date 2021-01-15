import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { client, clientId } from './client';
import type { first_inspect, first_inspectId } from './first_inspect';
import type { pruduct_track, pruduct_trackId } from './pruduct_track';
import type { second_inspect, second_inspectId } from './second_inspect';
import type { status, statusId } from './status';
import type { telefone, telefoneId } from './telefone';
import type { users, usersId } from './users';

export interface orderAttributes {
  id: number;
  telefone_id: number;
  status_id: number;
  operator_id: number;
  engineer_id: number;
  first_inspect_id: number;
  second_inspect_id?: number;
  client_id: number;
  date_accept: string;
  date_issues?: string;
  price_repair?: number;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderCreationAttributes = Optional<orderAttributes, orderPk>;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: number;
  telefone_id!: number;
  status_id!: number;
  operator_id!: number;
  engineer_id!: number;
  first_inspect_id!: number;
  second_inspect_id?: number;
  client_id!: number;
  date_accept!: string;
  date_issues?: string;
  price_repair?: number;

  // order belongsTo client
  client!: client;
  getclient!: Sequelize.BelongsToGetAssociationMixin<client>;
  setclient!: Sequelize.BelongsToSetAssociationMixin<client, clientId>;
  createclient!: Sequelize.BelongsToCreateAssociationMixin<client>;
  // order belongsTo users
  user!: users;
  getuser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setuser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createuser!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // order belongsTo first_inspect
  first_inspect!: first_inspect;
  getfirst_inspect!: Sequelize.BelongsToGetAssociationMixin<first_inspect>;
  setfirst_inspect!: Sequelize.BelongsToSetAssociationMixin<first_inspect, first_inspectId>;
  createfirst_inspect!: Sequelize.BelongsToCreateAssociationMixin<first_inspect>;
  
  // order belongsTo second_inspect
  second_inspect!: second_inspect;
  getsecond_inspect!: Sequelize.BelongsToGetAssociationMixin<second_inspect>;
  setsecond_inspect!: Sequelize.BelongsToSetAssociationMixin<second_inspect, second_inspectId>;
  createsecond_inspect!: Sequelize.BelongsToCreateAssociationMixin<second_inspect>;
  // order belongsTo status
  status!: status;
  getstatus!: Sequelize.BelongsToGetAssociationMixin<status>;
  setstatus!: Sequelize.BelongsToSetAssociationMixin<status, statusId>;
  createstatus!: Sequelize.BelongsToCreateAssociationMixin<status>;
  // order belongsTo telefone
  telefone!: telefone;
  gettelefone!: Sequelize.BelongsToGetAssociationMixin<telefone>;
  settelefone!: Sequelize.BelongsToSetAssociationMixin<telefone, telefoneId>;
  createtelefone!: Sequelize.BelongsToCreateAssociationMixin<telefone>;
  // order hasMany pruduct_track
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

  static initModel(sequelize: Sequelize.Sequelize): typeof order {
    order.init({
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
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status',
        key: 'id'
      }
    },
    operator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    engineer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    first_inspect_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'first_inspect',
        key: 'id'
      }
    },
    second_inspect_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: -1,
      references: {
        model: 'second_inspect',
        key: 'id'
      }
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id'
      }
    },
    date_accept: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_issues: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "0001-01-01"
    },
    price_repair: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: true,
      defaultValue: -1
    }
  }, {
    sequelize,
    tableName: 'order',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PK__zakaz__DD5B8F3F813AAD59",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "zakazclient",
        fields: [
          { name: "client_id" },
        ]
      },
      {
        name: "zakazEmployee",
        fields: [
          { name: "engineer_id" },
        ]
      },
    ]
  });
  return order;
  }
}
