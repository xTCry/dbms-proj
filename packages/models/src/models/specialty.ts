import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { group, groupId } from './group';
import type { kafedra, kafedraId } from './kafedra';

export interface specialtyAttributes {
  id: number;
  name: string;
  kafedra_id: number;
}

export type specialtyPk = "id";
export type specialtyId = specialty[specialtyPk];
export type specialtyCreationAttributes = Optional<specialtyAttributes, specialtyPk>;

export class specialty extends Model<specialtyAttributes, specialtyCreationAttributes> implements specialtyAttributes {
  id!: number;
  name!: string;
  kafedra_id!: number;

  // specialty hasMany group
  groups!: group[];
  getgroups!: Sequelize.HasManyGetAssociationsMixin<group>;
  setgroups!: Sequelize.HasManySetAssociationsMixin<group, groupId>;
  addgroup!: Sequelize.HasManyAddAssociationMixin<group, groupId>;
  addgroups!: Sequelize.HasManyAddAssociationsMixin<group, groupId>;
  creategroup!: Sequelize.HasManyCreateAssociationMixin<group>;
  removegroup!: Sequelize.HasManyRemoveAssociationMixin<group, groupId>;
  removegroups!: Sequelize.HasManyRemoveAssociationsMixin<group, groupId>;
  hasgroup!: Sequelize.HasManyHasAssociationMixin<group, groupId>;
  hasgroups!: Sequelize.HasManyHasAssociationsMixin<group, groupId>;
  countgroups!: Sequelize.HasManyCountAssociationsMixin;
  // specialty belongsTo kafedra
  kafedra!: kafedra;
  getkafedra!: Sequelize.BelongsToGetAssociationMixin<kafedra>;
  setkafedra!: Sequelize.BelongsToSetAssociationMixin<kafedra, kafedraId>;
  createkafedra!: Sequelize.BelongsToCreateAssociationMixin<kafedra>;

  static initModel(sequelize: Sequelize.Sequelize): typeof specialty {
    specialty.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ__specialt__72E12F1B63F07E98"
    },
    kafedra_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'kafedra',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'specialty',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__specialt__3213E83F2B9037A4",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ__specialt__72E12F1B63F07E98",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  return specialty;
  }
}
