import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { group, groupId } from './group';
import type { student, studentId } from './student';

export interface headman2groupAttributes {
  id: number;
  student_id: number;
  group_id: number;
}

export type headman2groupPk = "id";
export type headman2groupId = headman2group[headman2groupPk];
export type headman2groupCreationAttributes = Optional<headman2groupAttributes, headman2groupPk>;

export class headman2group extends Model<headman2groupAttributes, headman2groupCreationAttributes> implements headman2groupAttributes {
  id!: number;
  student_id!: number;
  group_id!: number;

  // headman2group belongsTo group
  group!: group;
  getgroup!: Sequelize.BelongsToGetAssociationMixin<group>;
  setgroup!: Sequelize.BelongsToSetAssociationMixin<group, groupId>;
  creategroup!: Sequelize.BelongsToCreateAssociationMixin<group>;
  // headman2group belongsTo student
  student!: student;
  getstudent!: Sequelize.BelongsToGetAssociationMixin<student>;
  setstudent!: Sequelize.BelongsToSetAssociationMixin<student, studentId>;
  createstudent!: Sequelize.BelongsToCreateAssociationMixin<student>;

  static initModel(sequelize: Sequelize.Sequelize): typeof headman2group {
    headman2group.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student',
        key: 'id'
      }
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'group',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'headman2group',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__headman2__3213E83FD7576C38",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return headman2group;
  }
}
