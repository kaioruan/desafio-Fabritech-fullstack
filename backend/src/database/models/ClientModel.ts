import { DataTypes, Model } from 'sequelize';
import db from '.';

class CLient extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
  addres!: string;
  relationship!: string;
}

CLient.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  relationship: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'clients',
  underscored: true,
  timestamps: false,
});

export default CLient;
