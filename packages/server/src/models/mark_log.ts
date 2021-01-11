import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { mark, markId } from './mark';

export interface mark_logAttributes {
  id: number;
  changed_date: Date;
  last_value: string;
  new_value: string;
  mark_id: number;
}

export type mark_logPk = "id";
export type mark_logId = mark_log[mark_logPk];
export type mark_logCreationAttributes = Optional<mark_logAttributes, mark_logPk>;

export class mark_log extends Model<mark_logAttributes, mark_logCreationAttributes> implements mark_logAttributes {
  id!: number;
  changed_date!: Date;
  last_value!: string;
  new_value!: string;
  mark_id!: number;

  // mark_log belongsTo mark
  mark!: mark;
  getmark!: Sequelize.BelongsToGetAssociationMixin<mark>;
  setmark!: Sequelize.BelongsToSetAssociationMixin<mark, markId>;
  createmark!: Sequelize.BelongsToCreateAssociationMixin<mark>;

  static initModel(sequelize: Sequelize.Sequelize): typeof mark_log {
    mark_log.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    changed_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_value: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    new_value: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    mark_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mark',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'mark_log',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__mark_log__3213E83FA50B839C",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return mark_log;
  }
}
