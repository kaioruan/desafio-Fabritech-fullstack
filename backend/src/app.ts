import * as express from 'express';

import UserController from './controller/User';
import LoginValidation from './middlewares/LoginValidation';
import AdminController from './controller/Admin';

const userController = new UserController();
const loginValidation = new LoginValidation();
const adminController = new AdminController();
class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', loginValidation.Validate, userController.login);
    this.app.post('/register', userController.Register);
    this.app.post('/validate', userController.validate);
    this.app.get('/admin', adminController.getAllClients);
    this.app.post('/admin', adminController.createClient);
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
