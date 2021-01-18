import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { notify_schedule, notify_scheduleId } from './notify_schedule';
import type { role, roleId } from './role';
import type { student, studentCreationAttributes, studentId } from './student';
import type { teacher, teacherCreationAttributes, teacherId } from './teacher';

export interface userAttributes {
  id: number;
  login: string;
  password: string;
  photo_path?: string;
  name: string;
  last_name: string;
  second_name?: string;
  personal_address: string;
  personal_telephone: string;
  personal_birthday: string;
  registeration_date: string;
  role_id: number;
}

export type userPk = "id";
export type userId = user[userPk];
export type userCreationAttributes = Optional<userAttributes, userPk>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  login!: string;
  password!: string;
  photo_path?: string;
  name!: string;
  last_name!: string;
  second_name?: string;
  personal_address!: string;
  personal_telephone!: string;
  personal_birthday!: string;
  registeration_date!: string;
  role_id!: number;

  // user hasMany notify_schedule
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
  // user hasOne student
  student!: student;
  getstudent!: Sequelize.HasOneGetAssociationMixin<student>;
  setstudent!: Sequelize.HasOneSetAssociationMixin<student, studentId>;
  createstudent!: Sequelize.HasOneCreateAssociationMixin<studentCreationAttributes>;
  // user hasOne teacher
  teacher!: teacher;
  getteacher!: Sequelize.HasOneGetAssociationMixin<teacher>;
  setteacher!: Sequelize.HasOneSetAssociationMixin<teacher, teacherId>;
  createteacher!: Sequelize.HasOneCreateAssociationMixin<teacherCreationAttributes>;
  // user belongsTo role
  role!: role;
  getrole!: Sequelize.BelongsToGetAssociationMixin<role>;
  setrole!: Sequelize.BelongsToSetAssociationMixin<role, roleId>;
  createrole!: Sequelize.BelongsToCreateAssociationMixin<role>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    user.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ__user__7838F27276E0F2A5"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    photo_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    second_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    personal_address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    personal_telephone: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    personal_birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    registeration_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.fn('getdate')
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__user__3213E83FD6237DD8",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ__user__7838F27276E0F2A5",
        unique: true,
        fields: [
          { name: "login" },
        ]
      },
    ]
  });
  return user;
  }
}
