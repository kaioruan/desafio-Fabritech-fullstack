import { Request, Response } from 'express';
import UserService from '../services/UserService';

// const ERROR_500 = 'Internal Server Error';

class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const result = await this.userService.login(email, password);
    return res.status(200).json({ token: result });
  };

  public validate = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    const result = await this.userService.validate(authorization as string);
    return res.status(200).json({ role: result });
  };

  public Register = async (req: Request, res: Response): Promise<Response> => {
    // const { email, password } = req.body;
    const result = await this.userService.Register(req.body);
    return res.status(200).json(result);
  };
}

export default UserController;
