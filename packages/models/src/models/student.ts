import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { group, groupId } from './group';
import type { headman2group, headman2groupId } from './headman2group';
import type { mark, markId } from './mark';
import type { user, userId } from './user';

export interface studentAttributes {
  id: number;
  user_id: number;
  group_id: number;
  student_id: string;
}

export type studentPk = "id";
export type studentId = student[studentPk];
export type studentCreationAttributes = Optional<studentAttributes, studentPk>;

export class student extends Model<studentAttributes, studentCreationAttributes> implements studentAttributes {
  id!: number;
  user_id!: number;
  group_id!: number;
  student_id!: string;

  // student hasMany headman2group
  headman2groups!: headman2group[];
  getheadman2groups!: Sequelize.HasManyGetAssociationsMixin<headman2group>;
  setheadman2groups!: Sequelize.HasManySetAssociationsMixin<headman2group, headman2groupId>;
  addheadman2group!: Sequelize.HasManyAddAssociationMixin<headman2group, headman2groupId>;
  addheadman2groups!: Sequelize.HasManyAddAssociationsMixin<headman2group, headman2groupId>;
  createheadman2group!: Sequelize.HasManyCreateAssociationMixin<headman2group>;
  removeheadman2group!: Sequelize.HasManyRemoveAssociationMixin<headman2group, headman2groupId>;
  removeheadman2groups!: Sequelize.HasManyRemoveAssociationsMixin<headman2group, headman2groupId>;
  hasheadman2group!: Sequelize.HasManyHasAssociationMixin<headman2group, headman2groupId>;
  hasheadman2groups!: Sequelize.HasManyHasAssociationsMixin<headman2group, headman2groupId>;
  countheadman2groups!: Sequelize.HasManyCountAssociationsMixin;
  // student hasMany mark
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
  // student belongsTo group
  group!: group;
  getgroup!: Sequelize.BelongsToGetAssociationMixin<group>;
  setgroup!: Sequelize.BelongsToSetAssociationMixin<group, groupId>;
  creategroup!: Sequelize.BelongsToCreateAssociationMixin<group>;
  // student belongsTo user
  user!: user;
  getuser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setuser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createuser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof student {
    student.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      unique: "UQ__student__B9BE370EFF074FF7"
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'group',
        key: 'id'
      }
    },
    student_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ__student__2A33069BB509EDBD"
    }
  }, {
    sequelize,
    tableName: 'student',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__student__3213E83FA2912547",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ__student__2A33069BB509EDBD",
        unique: true,
        fields: [
          { name: "student_id" },
        ]
      },
      {
        name: "UQ__student__B9BE370EFF074FF7",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return student;
  }
}
