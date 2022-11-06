import { DataTypes, Model } from 'sequelize';
import db from '.';
import Address from './AddressModel';

class Client extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
  addressId!: number;
  relationship!: string;
}

Client.init({
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
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressId: {
    type: DataTypes.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    field: 'address_id',
    references: {
      model: 'address',
      key: 'id',
    },
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

Client.belongsTo(Address, { foreignKey: 'address_id', as: 'address' });
Address.hasMany(Client, { foreignKey: 'id', as: 'clients' });

export default Client;
