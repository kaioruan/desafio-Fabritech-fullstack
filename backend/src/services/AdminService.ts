import IClientAddress from '../interface/IClientAddress';
import IClient from '../interface/IClient';
import ClientModel from '../database/models/ClientModel';
import Address from '../database/models/AddressModel';
import sequelize from '../database/models';

class AdminService {
  public model = ClientModel;
  public modelAddress = Address;

  public getAllClients = async (): Promise<IClient[]> => {
    const result = await this.model.findAll({
      raw: true,
      attributes: { exclude: ['address_id'] },
      include: [
        {
          model: this.modelAddress,
          as: 'address',
        },
      ],
    });
    return result as unknown as IClient[];
  };

  public createClient = async (client: IClientAddress): Promise<IClientAddress> => {
    const { email, username, address, role, relationship } = client;
    const { cep, street, country, district, city, state } = address;
    const searchUser = await this.model.findOne({ where: { email }, raw: true });
    if (searchUser) {
      throw new Error('this email is already registered');
    }
    const userAddress = { cep, street, country, district, city, state };
    const transaction = await sequelize.transaction(async (t) => {
      const result = await this.modelAddress.create({ ...userAddress }, { transaction: t });
      const resultClient = await this.model.create({
        email, username, role, relationship, addressId: result.id }, { transaction: t,
      });
      return resultClient;
    });
    return transaction as unknown as IClientAddress;
  };

  public deleteClient = async (id: string): Promise<void> => {
    const result = await this.model.findOne({ where: { id }, raw: true });
    if (!result) {
      throw new Error('User not found');
    }
    await this.model.destroy({ where: { id } });
  };

  public updateClient = async (id: string, client: IClientAddress): Promise<IClientAddress> => {
    const { email, username, address, role, relationship, addressId } = client;
    const { cep, street, country, district, city, state } = address;
    const updateClient = { email, username, role, relationship };
    const userAddress = { cep, street, country, district, city, state };
    const transaction = await sequelize.transaction(async (t) => {
      const result = await this.modelAddress.update(
        { ...userAddress },
        { where: { id: addressId }, transaction: t },
      );
      console.log(result);
      const resultClient = await this.model.update(
        { ...updateClient, id },
        { where: { addressId }, transaction: t },
      );
      return resultClient;
    });
    return transaction as unknown as IClientAddress;
  };
}

export default AdminService;
