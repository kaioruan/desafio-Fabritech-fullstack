import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/UserModel';

class LoginValidation {
  public model = UserModel;
  public Validate = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !EMAIL_VALIDATION_REGEX.test(email)) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const result = await this.model.findOne({ where: { email }, raw: true });
    if (!result) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };
}

export default LoginValidation;
