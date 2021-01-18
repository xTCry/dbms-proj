import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { mark_log, mark_logId } from './mark_log';
import type { schedule, scheduleId } from './schedule';
import type { student, studentId } from './student';

export interface markAttributes {
  id: number;
  date: Date;
  value: string;
  student_id: number;
  schedule_id: number;
}

export type markPk = "id";
export type markId = mark[markPk];
export type markCreationAttributes = Optional<markAttributes, markPk>;

export class mark extends Model<markAttributes, markCreationAttributes> implements markAttributes {
  id!: number;
  date!: Date;
  value!: string;
  student_id!: number;
  schedule_id!: number;

  // mark belongsTo schedule
  schedule!: schedule;
  getschedule!: Sequelize.BelongsToGetAssociationMixin<schedule>;
  setschedule!: Sequelize.BelongsToSetAssociationMixin<schedule, scheduleId>;
  createschedule!: Sequelize.BelongsToCreateAssociationMixin<schedule>;
  // mark belongsTo student
  student!: student;
  getstudent!: Sequelize.BelongsToGetAssociationMixin<student>;
  setstudent!: Sequelize.BelongsToSetAssociationMixin<student, studentId>;
  createstudent!: Sequelize.BelongsToCreateAssociationMixin<student>;
  // mark hasMany mark_log
  mark_logs!: mark_log[];
  getmark_logs!: Sequelize.HasManyGetAssociationsMixin<mark_log>;
  setmark_logs!: Sequelize.HasManySetAssociationsMixin<mark_log, mark_logId>;
  addmark_log!: Sequelize.HasManyAddAssociationMixin<mark_log, mark_logId>;
  addmark_logs!: Sequelize.HasManyAddAssociationsMixin<mark_log, mark_logId>;
  createmark_log!: Sequelize.HasManyCreateAssociationMixin<mark_log>;
  removemark_log!: Sequelize.HasManyRemoveAssociationMixin<mark_log, mark_logId>;
  removemark_logs!: Sequelize.HasManyRemoveAssociationsMixin<mark_log, mark_logId>;
  hasmark_log!: Sequelize.HasManyHasAssociationMixin<mark_log, mark_logId>;
  hasmark_logs!: Sequelize.HasManyHasAssociationsMixin<mark_log, mark_logId>;
  countmark_logs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof mark {
    mark.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('getdate')
    },
    value: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student',
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
    tableName: 'mark',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "mark_index",
        fields: [
          { name: "value" },
          { name: "student_id" },
        ]
      },
      {
        name: "PK__mark__3213E83FF084F8A6",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return mark;
  }
}
