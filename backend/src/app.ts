import * as express from 'express';

import UserController from './controller/User';
import LoginValidation from './middlewares/LoginValidation';
import AdminController from './controller/Admin';
import RegisterValidation from './middlewares/Register';
import TokenValidation from './middlewares/TokenValidation';

const userController = new UserController();
const loginValidation = new LoginValidation();
const adminController = new AdminController();
const registerValidation = new RegisterValidation();
const token = new TokenValidation();
class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', loginValidation.Validate, userController.login);
    this.app.post('/register', registerValidation.ValidateUser, userController.Register);
    this.app.get('/login/validate', userController.validate);
    this.app.get('/admin', token.validate, adminController.getAllClients);
    this.app.post(
      '/admin',
      registerValidation.ValidateClient,
      registerValidation.AddressValidate,
      adminController.createClient,
    );
    this.app.delete('/admin/:id', adminController.deleteClient);
    this.app.put('/admin/:id', adminController.updateClient);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
