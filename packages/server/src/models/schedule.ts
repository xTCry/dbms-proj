import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { auditory, auditoryId } from './auditory';
import type { group, groupId } from './group';
import type { lesson, lessonId } from './lesson';
import type { mark, markId } from './mark';
import type { notify_schedule, notify_scheduleId } from './notify_schedule';
import type { teacher, teacherId } from './teacher';

export interface scheduleAttributes {
  id: number;
  time_start: string;
  date: Date;
  duration: number;
  lesson_type: number;
  lesson_id: number;
  teacher_id: number;
  auditory_id: number;
  group_id: number;
}

export type schedulePk = "id";
export type scheduleId = schedule[schedulePk];
export type scheduleCreationAttributes = Optional<scheduleAttributes, schedulePk>;

export class schedule extends Model<scheduleAttributes, scheduleCreationAttributes> implements scheduleAttributes {
  id!: number;
  time_start!: string;
  date!: Date;
  duration!: number;
  lesson_type!: number;
  lesson_id!: number;
  teacher_id!: number;
  auditory_id!: number;
  group_id!: number;

  // schedule hasMany mark
  marks!: mark[];
  getmarks!: Sequelize.HasManyGetAssociationsMixin<mark>;
  setmarks!: Sequelize.HasManySetAssociationsMixin<mark, markId>;
  addmark!: Sequelize.HasManyAddAssociationMixin<mark, markId>;
  addmarks!: Sequelize.HasManyAddAssociationsMixin<mark, markId>;
  createmark!: Sequelize.HasManyCreateAssociationMixin<mark>;
  removemark!: Sequelize.HasManyRemoveAssociationMixin<mark, markId>;
  removemarks!: Sequelize.HasManyRemoveAssociationsMixin<mark, markId>;
  hasmark!: Sequelize.HasManyHasAssociationMixin<mark, markId>;
  hasmarks!: Sequelize.HasManyHasAssociationsMixin<mark, markId>;
  countmarks!: Sequelize.HasManyCountAssociationsMixin;
  // schedule hasMany notify_schedule
  notify_schedules!: notify_schedule[];
  getnotify_schedules!: Sequelize.HasManyGetAssociationsMixin<notify_schedule>;
  setnotify_schedules!: Sequelize.HasManySetAssociationsMixin<notify_schedule, notify_scheduleId>;
  addnotify_schedule!: Sequelize.HasManyAddAssociationMixin<notify_schedule, notify_scheduleId>;
  addnotify_schedules!: Sequelize.HasManyAddAssociationsMixin<notify_schedule, notify_scheduleId>;
  createnotify_schedule!: Sequelize.HasManyCreateAssociationMixin<notify_schedule>;
  removenotify_schedule!: Sequelize.HasManyRemoveAssociationMixin<notify_schedule, notify_scheduleId>;
  removenotify_schedules!: Sequelize.HasManyRemoveAssociationsMixin<notify_schedule, notify_scheduleId>;
  hasnotify_schedule!: Sequelize.HasManyHasAssociationMixin<notify_schedule, notify_scheduleId>;
  hasnotify_schedules!: Sequelize.HasManyHasAssociationsMixin<notify_schedule, notify_scheduleId>;
  countnotify_schedules!: Sequelize.HasManyCountAssociationsMixin;
  // schedule belongsTo auditory
  auditory!: auditory;
  getauditory!: Sequelize.BelongsToGetAssociationMixin<auditory>;
  setauditory!: Sequelize.BelongsToSetAssociationMixin<auditory, auditoryId>;
  createauditory!: Sequelize.BelongsToCreateAssociationMixin<auditory>;
  // schedule belongsTo group
  group!: group;
  getgroup!: Sequelize.BelongsToGetAssociationMixin<group>;
  setgroup!: Sequelize.BelongsToSetAssociationMixin<group, groupId>;
  creategroup!: Sequelize.BelongsToCreateAssociationMixin<group>;
  // schedule belongsTo lesson
  lesson!: lesson;
  getlesson!: Sequelize.BelongsToGetAssociationMixin<lesson>;
  setlesson!: Sequelize.BelongsToSetAssociationMixin<lesson, lessonId>;
  createlesson!: Sequelize.BelongsToCreateAssociationMixin<lesson>;
  // schedule belongsTo teacher
  teacher!: teacher;
  getteacher!: Sequelize.BelongsToGetAssociationMixin<teacher>;
  setteacher!: Sequelize.BelongsToSetAssociationMixin<teacher, teacherId>;
  createteacher!: Sequelize.BelongsToCreateAssociationMixin<teacher>;

  static initModel(sequelize: Sequelize.Sequelize): typeof schedule {
    schedule.init(
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            time_start: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            lesson_type: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            lesson_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'lesson',
                    key: 'id',
                },
            },
            teacher_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'teacher',
                    key: 'id',
                },
            },
            auditory_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'auditory',
                    key: 'id',
                },
            },
            group_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'group',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'schedule',
            schema: 'dbo',
            hasTrigger: true,
            timestamps: false,
            indexes: [
                {
                    name: 'PK__schedule__3213E83FA808F5EC',
                    unique: true,
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'sceduler_index',
                    fields: [{ name: 'id' }, { name: 'date' }, { name: 'group_id' }],
                },
                {
                    name: 'scheduler_index',
                    fields: [{ name: 'id' }, { name: 'date' }, { name: 'group_id' }],
                },
            ],
        }
    );
  return schedule;
  }
}
