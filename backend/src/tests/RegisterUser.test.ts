import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const expect = chai.expect;

const UserRegister = {
  username: 'Kaio Oliveira',
  email: 'kaio@gmail.com',
  password: 'secret_admin',
  role: 'user',

}

const RegisterInvalid = {
  username: 'Kaio Oliveira',
  email: 'john.com',
  password: '12214124',
  role: 'user',
}

const UserMock = [{
    "id": 5,
    "username": "Kaio Oliveira",
    "role": "user",
    "email": "tesste@teste.com",
    "token": "$2a$10$IIUwu351jqUgK5VO6TJd6.HtLJuSH/eTSPEE..YI3yMIVAetbm8x."

}]
describe('Rota Register', () => {
  describe('Usuário válido', () => {
    before(async () => {
      sinon.stub(User, 'create').resolves(UserMock[0] as unknown as User);
    })

    after(() => {
      (User.create as sinon.SinonStub).restore();
    })
    it('Retorna status 201 ao conseguir registrar', async () => {
      const response = await chai.request(app)
        .post('/register')
        .send(UserRegister);
      expect(response.status).to.be.equal(201);
    });
  })
  describe('Quando o email é invalido', () => {  
    before(async () => {
      sinon.stub(User, "findOne")
        .resolves(null as unknown as User);
    });

    after(() => {
      (User.findOne as sinon.SinonStub ).restore();
    })
    it('Retorna uma mensagem de erro com status 400', async () => {
      const response = await chai.request(app)
        .post('/register')
        .send(RegisterInvalid);

      expect(response.body).to.be.deep.equal({ message: 'Email incorrect' });
      expect(response.status).to.be.equal(400);
    });
  });
})