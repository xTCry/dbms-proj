import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { schedule, scheduleId } from './schedule';

export interface auditoryAttributes {
  id: number;
  name: string;
  corpus: string;
}

export type auditoryPk = "id";
export type auditoryId = auditory[auditoryPk];
export type auditoryCreationAttributes = Optional<auditoryAttributes, auditoryPk>;

export class auditory extends Model<auditoryAttributes, auditoryCreationAttributes> implements auditoryAttributes {
  id!: number;
  name!: string;
  corpus!: string;

  // auditory hasMany schedule
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

  static initModel(sequelize: Sequelize.Sequelize): typeof auditory {
    auditory.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ__auditory__72E12F1B0947F16F"
    },
    corpus: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'auditory',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__auditory__3213E83FA0B86B60",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ__auditory__72E12F1B0947F16F",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  return auditory;
  }
}
