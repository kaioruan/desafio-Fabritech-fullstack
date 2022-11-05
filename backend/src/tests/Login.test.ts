import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/UserModel';
import { UsersMock, token } from './mocks';

chai.use(chaiHttp);

const expect = chai.expect;

const UserLogin = {
  email: 'kaio@gmail.com',
  password: 'secret_admin',
}

const UserInvalid = {
  email: 'john@gmail.com',
  password: 'secret_admin',
}

describe('Rota Login', () => {
  describe('Usuário válido', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(UsersMock[0] as User);
    })

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
    it('Retorna um Token JWT com status 200', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(UserLogin);

      expect(response.body).to.have.property('token');
      expect(response.status).to.be.equal(200);
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

    it('Retorna uma mensagem de erro com status 401', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(UserInvalid);

      expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
      expect(response.status).to.be.equal(401);
    });
  });
  describe('Rota /login/validate', () => {
    before(async () => {
      sinon.stub(User, 'findOne').resolves(UsersMock[0] as User);
    })

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
    it('Retornar usuário encontrado', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', token);
        expect(response.body).to.be.deep.equal({ role: UsersMock[0].role });
        expect(response.status).to.be.equal(200);
    })
  })
})