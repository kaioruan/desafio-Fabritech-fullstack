import IClient from '../interface/IClient';
import ClientModel from '../database/models/ClientModel';

class AdminService {
  public model = ClientModel;

  public getAllClients = async (): Promise<IClient[]> => {
    const result = await this.model.findAll({ raw: true });
    return result as unknown as IClient[];
  };
}

export default AdminService;
