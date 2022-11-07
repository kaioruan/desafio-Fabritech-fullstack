import { DataTypes, Model } from 'sequelize';
import db from '.';

class Address extends Model {
  id!: number;
  cep!: string;
  street!: string;
  district!: string;
  city!: string;
  state!: string;
  country!: string;
}

Address.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'address',
  underscored: true,
  timestamps: false,
  tableName: 'address',
});

export default Address;
