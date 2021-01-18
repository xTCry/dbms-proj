import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { headman2group, headman2groupId } from './headman2group';
import type { schedule, scheduleId } from './schedule';
import type { specialty, specialtyId } from './specialty';
import type { student, studentId } from './student';

export interface groupAttributes {
  id: number;
  name: string;
  date_formation: string;
  specialty_id: number;
}

export type groupPk = "id";
export type groupId = group[groupPk];
export type groupCreationAttributes = Optional<groupAttributes, groupPk>;

export class group extends Model<groupAttributes, groupCreationAttributes> implements groupAttributes {
  id!: number;
  name!: string;
  date_formation!: string;
  specialty_id!: number;

  // group belongsTo specialty
  specialty!: specialty;
  getspecialty!: Sequelize.BelongsToGetAssociationMixin<specialty>;
  setspecialty!: Sequelize.BelongsToSetAssociationMixin<specialty, specialtyId>;
  createspecialty!: Sequelize.BelongsToCreateAssociationMixin<specialty>;
  // group hasMany headman2group
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
  // group hasMany schedule
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
  // group hasMany student
  students!: student[];
  getstudents!: Sequelize.HasManyGetAssociationsMixin<student>;
  setstudents!: Sequelize.HasManySetAssociationsMixin<student, studentId>;
  addstudent!: Sequelize.HasManyAddAssociationMixin<student, studentId>;
  addstudents!: Sequelize.HasManyAddAssociationsMixin<student, studentId>;
  createstudent!: Sequelize.HasManyCreateAssociationMixin<student>;
  removestudent!: Sequelize.HasManyRemoveAssociationMixin<student, studentId>;
  removestudents!: Sequelize.HasManyRemoveAssociationsMixin<student, studentId>;
  hasstudent!: Sequelize.HasManyHasAssociationMixin<student, studentId>;
  hasstudents!: Sequelize.HasManyHasAssociationsMixin<student, studentId>;
  countstudents!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof group {
    group.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ__group__72E12F1B969B9A96"
    },
    date_formation: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.fn('getdate')
    },
    specialty_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'specialty',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'group',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "group_index",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "PK__group__3213E83F1C86124C",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ__group__72E12F1B969B9A96",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  return group;
  }
}
