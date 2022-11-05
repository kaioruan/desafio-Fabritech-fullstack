import { Request, Response } from 'express';
import AdminService from '../services/AdminService';

// const ERROR_500 = 'Internal Server Error';

class AdminController {
  constructor(private adminService = new AdminService()) {}

  public getAllClients = async (req: Request, res: Response): Promise<Response> => {
    const result = await this.adminService.getAllClients();
    return res.status(200).json(result);
  };
}

export default AdminController;
