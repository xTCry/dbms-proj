import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { specialty, specialtyId } from './specialty';

export interface kafedraAttributes {
  id: number;
  name: string;
}

export type kafedraPk = "id";
export type kafedraId = kafedra[kafedraPk];
export type kafedraCreationAttributes = Optional<kafedraAttributes, kafedraPk>;

export class kafedra extends Model<kafedraAttributes, kafedraCreationAttributes> implements kafedraAttributes {
  id!: number;
  name!: string;

  // kafedra hasMany specialty
  specialties!: specialty[];
  getspecialties!: Sequelize.HasManyGetAssociationsMixin<specialty>;
  setspecialties!: Sequelize.HasManySetAssociationsMixin<specialty, specialtyId>;
  addspecialty!: Sequelize.HasManyAddAssociationMixin<specialty, specialtyId>;
  addspecialties!: Sequelize.HasManyAddAssociationsMixin<specialty, specialtyId>;
  createspecialty!: Sequelize.HasManyCreateAssociationMixin<specialty>;
  removespecialty!: Sequelize.HasManyRemoveAssociationMixin<specialty, specialtyId>;
  removespecialties!: Sequelize.HasManyRemoveAssociationsMixin<specialty, specialtyId>;
  hasspecialty!: Sequelize.HasManyHasAssociationMixin<specialty, specialtyId>;
  hasspecialties!: Sequelize.HasManyHasAssociationsMixin<specialty, specialtyId>;
  countspecialties!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof kafedra {
    kafedra.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "UQ__kafedra__72E12F1BB5E13C15"
    }
  }, {
    sequelize,
    tableName: 'kafedra',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__kafedra__3213E83F867A6E42",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ__kafedra__72E12F1BB5E13C15",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  return kafedra;
  }
}
