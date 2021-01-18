import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { schedule, scheduleId } from './schedule';
import type { user, userId } from './user';

export interface notify_scheduleAttributes {
  id: number;
  date_time: Date;
  peer_id: number;
  sender_id?: number;
  schedule_id: number;
}

export type notify_schedulePk = "id";
export type notify_scheduleId = notify_schedule[notify_schedulePk];
export type notify_scheduleCreationAttributes = Optional<notify_scheduleAttributes, notify_schedulePk>;

export class notify_schedule extends Model<notify_scheduleAttributes, notify_scheduleCreationAttributes> implements notify_scheduleAttributes {
  id!: number;
  date_time!: Date;
  peer_id!: number;
  sender_id?: number;
  schedule_id!: number;

  // notify_schedule belongsTo user
  user!: user;
  getuser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setuser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createuser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // notify_schedule belongsTo schedule
  schedule!: schedule;
  getschedule!: Sequelize.BelongsToGetAssociationMixin<schedule>;
  setschedule!: Sequelize.BelongsToSetAssociationMixin<schedule, scheduleId>;
  createschedule!: Sequelize.BelongsToCreateAssociationMixin<schedule>;

  static initModel(sequelize: Sequelize.Sequelize): typeof notify_schedule {
    notify_schedule.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    peer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'schedule',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'notify_schedule',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__notify_s__3213E83F63D3B21D",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return notify_schedule;
  }
}
