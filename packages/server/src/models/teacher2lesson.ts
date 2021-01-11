import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { lesson, lessonId } from './lesson';
import type { teacher, teacherId } from './teacher';

export interface teacher2lessonAttributes {
  id: number;
  teacher_id: number;
  lesson_id: number;
}

export type teacher2lessonPk = "id";
export type teacher2lessonId = teacher2lesson[teacher2lessonPk];
export type teacher2lessonCreationAttributes = Optional<teacher2lessonAttributes, teacher2lessonPk>;

export class teacher2lesson extends Model<teacher2lessonAttributes, teacher2lessonCreationAttributes> implements teacher2lessonAttributes {
  id!: number;
  teacher_id!: number;
  lesson_id!: number;

  // teacher2lesson belongsTo lesson
  lesson!: lesson;
  getlesson!: Sequelize.BelongsToGetAssociationMixin<lesson>;
  setlesson!: Sequelize.BelongsToSetAssociationMixin<lesson, lessonId>;
  createlesson!: Sequelize.BelongsToCreateAssociationMixin<lesson>;
  // teacher2lesson belongsTo teacher
  teacher!: teacher;
  getteacher!: Sequelize.BelongsToGetAssociationMixin<teacher>;
  setteacher!: Sequelize.BelongsToSetAssociationMixin<teacher, teacherId>;
  createteacher!: Sequelize.BelongsToCreateAssociationMixin<teacher>;

  static initModel(sequelize: Sequelize.Sequelize): typeof teacher2lesson {
    teacher2lesson.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teacher',
        key: 'id'
      }
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lesson',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'teacher2lesson',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__teacher2__3213E83FE442E614",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return teacher2lesson;
  }
}
