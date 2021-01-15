import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface dolzhnostAttributes {
  id: number;
  position: string;
}

export type dolzhnostPk = "id";
export type dolzhnostId = dolzhnost[dolzhnostPk];
export type dolzhnostCreationAttributes = Optional<dolzhnostAttributes, dolzhnostPk>;

export class dolzhnost extends Model<dolzhnostAttributes, dolzhnostCreationAttributes> implements dolzhnostAttributes {
  id!: number;
  position!: string;

  // dolzhnost hasMany users
  users!: users[];
  getusers!: Sequelize.HasManyGetAssociationsMixin<users>;
  setusers!: Sequelize.HasManySetAssociationsMixin<users, usersId>;
  adduser!: Sequelize.HasManyAddAssociationMixin<users, usersId>;
  addusers!: Sequelize.HasManyAddAssociationsMixin<users, usersId>;
  createuser!: Sequelize.HasManyCreateAssociationMixin<users>;
  removeuser!: Sequelize.HasManyRemoveAssociationMixin<users, usersId>;
  removeusers!: Sequelize.HasManyRemoveAssociationsMixin<users, usersId>;
  hasuser!: Sequelize.HasManyHasAssociationMixin<users, usersId>;
  hasusers!: Sequelize.HasManyHasAssociationsMixin<users, usersId>;
  countusers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof dolzhnost {
    dolzhnost.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    position: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'dolzhnost',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__dolzhnos__D652893D87B0F371",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return dolzhnost;
  }
}
