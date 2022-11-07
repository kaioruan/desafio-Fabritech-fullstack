import { Request, Response, NextFunction } from 'express';
import ClientModel from '../database/models/ClientModel';

class RegisterValidation {
  public model = ClientModel;
  public ValidateClient = async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, address, role, relationship } = req.body;
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !username || !address || !role || !relationship) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!EMAIL_VALIDATION_REGEX.test(email)) {
      return res.status(400).json({ message: 'Email incorrect' });
    }
    const result = await this.model.findOne({ where: { email }, raw: true });
    if (result) {
      return res.status(401).json({ message: 'this email is already registered' });
    }
    next();
  };

  public AddressValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { cep, street, country, district, city, state } = req.body.address;
    if (!cep || !street || !country || !district || !city || !state) {
      return res.status(400).json({ message: 'All fields must be filled!' });
    }
    next();
  };

  public ValidateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password, role } = req.body;
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !username || !password || !role) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!EMAIL_VALIDATION_REGEX.test(email)) {
      return res.status(400).json({ message: 'Email incorrect' });
    }
    const result = await this.model.findOne({ where: { email }, raw: true });
    if (result) {
      return res.status(401).json({ message: 'this email is already registered' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'password must be at least 6 characters' });
    }
    if (username.length < 6) {
      return res.status(401).json({ message: 'username must be at least 6 characters' });
    } next();
  };
}

export default RegisterValidation;
