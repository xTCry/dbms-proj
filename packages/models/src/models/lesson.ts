import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { schedule, scheduleId } from './schedule';
import type { teacher2lesson, teacher2lessonId } from './teacher2lesson';

export interface lessonAttributes {
  id: number;
  name: string;
}

export type lessonPk = "id";
export type lessonId = lesson[lessonPk];
export type lessonCreationAttributes = Optional<lessonAttributes, lessonPk>;

export class lesson extends Model<lessonAttributes, lessonCreationAttributes> implements lessonAttributes {
  id!: number;
  name!: string;

  // lesson hasMany schedule
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
  // lesson hasMany teacher2lesson
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

  static initModel(sequelize: Sequelize.Sequelize): typeof lesson {
    lesson.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ__lesson__72E12F1BF25876E7"
    }
  }, {
    sequelize,
    tableName: 'lesson',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "lesson_index",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "PK__lesson__3213E83FC36C963C",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ__lesson__72E12F1BF25876E7",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  return lesson;
  }
}
