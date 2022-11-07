import IClientAddress from '../interface/IClientAddress';
import IClient from '../interface/IClient';
import ClientModel from '../database/models/ClientModel';
import Address from '../database/models/AddressModel';
import sequelize from '../database/models';

class AdminService {
  public model = ClientModel;
  public modelAddress = Address;

  public getAllClients = async (): Promise<IClient[]> => {
    const result = await this.model.findAll({ raw: true });
    return result as unknown as IClient[];
  };

  public createClient = async (client: IClientAddress): Promise<IClientAddress> => {
    const { email, username, address, role, relationship } = client;
    const { cep, street, country, district, city, state } = address;
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
}

export default AdminService;
