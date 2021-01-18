import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { schedule, scheduleId } from './schedule';
import type { teacher2lesson, teacher2lessonId } from './teacher2lesson';
import type { user, userId } from './user';

export interface teacherAttributes {
  id: number;
  experience?: string;
  user_id: number;
}

export type teacherPk = "id";
export type teacherId = teacher[teacherPk];
export type teacherCreationAttributes = Optional<teacherAttributes, teacherPk>;

export class teacher extends Model<teacherAttributes, teacherCreationAttributes> implements teacherAttributes {
  id!: number;
  experience?: string;
  user_id!: number;

  // teacher hasMany schedule
  schedules!: schedule[];
  getschedules!: Sequelize.HasManyGetAssociationsMixin<schedule>;
  setschedules!: Sequelize.HasManySetAssociationsMixin<schedule, scheduleId>;
  addschedule!: Sequelize.HasManyAddAssociationMixin<schedule, scheduleId>;
  addschedules!: Sequelize.HasManyAddAssociationsMixin<schedule, scheduleId>;
  createschedule!: Sequelize.HasManyCreateAssociationMixin<schedule>;
  removeschedule!: Sequelize.HasManyRemoveAssociationMixin<schedule, scheduleId>;
  removeschedules!: Sequelize.HasManyRemoveAssociationsMixin<schedule, scheduleId>;
  hasschedule!: Sequelize.HasManyHasAssociationMixin<schedule, scheduleId>;
  hasschedules!: Sequelize.HasManyHasAssociationsMixin<schedule, scheduleId>;
  countschedules!: Sequelize.HasManyCountAssociationsMixin;
  // teacher belongsTo user
  user!: user;
  getuser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setuser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createuser!: Sequelize.BelongsToCreateAssociationMixin<user>;
  // teacher hasMany teacher2lesson
  teacher2lessons!: teacher2lesson[];
  getteacher2lessons!: Sequelize.HasManyGetAssociationsMixin<teacher2lesson>;
  setteacher2lessons!: Sequelize.HasManySetAssociationsMixin<teacher2lesson, teacher2lessonId>;
  addteacher2lesson!: Sequelize.HasManyAddAssociationMixin<teacher2lesson, teacher2lessonId>;
  addteacher2lessons!: Sequelize.HasManyAddAssociationsMixin<teacher2lesson, teacher2lessonId>;
  createteacher2lesson!: Sequelize.HasManyCreateAssociationMixin<teacher2lesson>;
  removeteacher2lesson!: Sequelize.HasManyRemoveAssociationMixin<teacher2lesson, teacher2lessonId>;
  removeteacher2lessons!: Sequelize.HasManyRemoveAssociationsMixin<teacher2lesson, teacher2lessonId>;
  hasteacher2lesson!: Sequelize.HasManyHasAssociationMixin<teacher2lesson, teacher2lessonId>;
  hasteacher2lessons!: Sequelize.HasManyHasAssociationsMixin<teacher2lesson, teacher2lessonId>;
  countteacher2lessons!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof teacher {
    teacher.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    experience: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      unique: "UQ__teacher__B9BE370ED2642935"
    }
  }, {
    sequelize,
    tableName: 'teacher',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__teacher__3213E83F5FEC5CEE",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ__teacher__B9BE370ED2642935",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return teacher;
  }
}
