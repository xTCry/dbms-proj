import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';

export interface roleAttributes {
  id: number;
  name: string;
  role: number;
}

export type rolePk = "id";
export type roleId = role[rolePk];
export type roleCreationAttributes = Optional<roleAttributes, rolePk>;

export class role extends Model<roleAttributes, roleCreationAttributes> implements roleAttributes {
  id!: number;
  name!: string;
  role!: number;

  // role hasMany user
  users!: user[];
  getusers!: Sequelize.HasManyGetAssociationsMixin<user>;
  setusers!: Sequelize.HasManySetAssociationsMixin<user, userId>;
  adduser!: Sequelize.HasManyAddAssociationMixin<user, userId>;
  addusers!: Sequelize.HasManyAddAssociationsMixin<user, userId>;
  createuser!: Sequelize.HasManyCreateAssociationMixin<user>;
  removeuser!: Sequelize.HasManyRemoveAssociationMixin<user, userId>;
  removeusers!: Sequelize.HasManyRemoveAssociationsMixin<user, userId>;
  hasuser!: Sequelize.HasManyHasAssociationMixin<user, userId>;
  hasusers!: Sequelize.HasManyHasAssociationsMixin<user, userId>;
  countusers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof role {
    role.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'role',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__role__3213E83F6A743188",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return role;
  }
}
