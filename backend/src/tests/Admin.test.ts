import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import ClientModel from '../database/models/ClientModel';
import { ClientsMock, token, newClient, newClientInvalid, newClientAddressInvalid } from './mocks';

chai.use(chaiHttp);

const expect = chai.expect;


describe('Rota Admin', () => {
  describe('Rota /admin', () => {
    before(async () => {
      sinon.stub(ClientModel, 'findAll').resolves(ClientsMock as unknown as ClientModel[]);
    })
    after(() => {
      (ClientModel.findAll as sinon.SinonStub).restore();
    })
    it('Retorna uma lista de clientes com status 200', async () => {
      const response = await chai.request(app)
        .get('/admin')
      expect(response.body).to.be.deep.equal(ClientsMock);
      expect(response.status).to.be.equal(200);
    })
  })
  describe('Quando não tem', () => {
    before(async () => {
      sinon.stub(ClientModel, 'findAll').resolves([] as unknown as ClientModel[]);
    })
    after(() => {
      (ClientModel.findAll as sinon.SinonStub).restore();
    })
    it('Retorna uma lista vazia com status 200', async () => {
      const response = await chai.request(app)
        .get('/admin')
        expect(response.body).to.be.deep.equal({ message:'No clients found' });
    })
  })
  describe('Create Client', () => {
    before(async () => {
      sinon.stub(ClientModel, 'create').resolves(newClient as unknown as ClientModel);
    })
    after(() => {
      (ClientModel.create as sinon.SinonStub).restore();
    })
    it('Retorna um cliente com status 201', async () => {
      const response = await chai.request(app)
        .post('/admin')
        .send(newClient);

      expect(response.body).to.be.deep.equal(newClient);
      expect(response.status).to.be.equal(201);
    })
  })
  describe('Update Client', () => {
    before(async () => {
      sinon.stub(ClientModel, 'update').resolves(ClientsMock[0] as unknown as [number, ClientModel[]]);
    })
    after(() => {
      (ClientModel.update as sinon.SinonStub).restore();
    })
    it('Retorna um cliente com status 200', async () => {
      const response = await chai.request(app)
        .put('/admin/1')
        .send(newClient);
      expect(response.status).to.be.equal(200);
    })
  })
  describe('Delete Client', () => {
    before(async () => {
      sinon.stub(ClientModel, 'destroy').resolves(1);
    })
    after(() => {
      (ClientModel.destroy as sinon.SinonStub).restore();
    })
    it('Retorna um cliente com status 200', async () => {
      const response = await chai.request(app)
        .delete('/admin/1')
      expect(response.status).to.be.equal(200);
    })
  })
  describe('Create Client Invalid', () => {
    before(async () => {
      sinon.stub(ClientModel, 'create').resolves(newClientInvalid as unknown as ClientModel);
    })
    after(() => {
      (ClientModel.create as sinon.SinonStub).restore();
    })
    it('Retorna status 400 ao ter dados inválidos', async () => {
      const response = await chai.request(app)
        .post('/admin')
        .send(newClientInvalid);
      expect(response.status).to.be.equal(400);
    })
    it('Retorna status 401 ao não ter o endereço', async () => {
      const response = await chai.request(app)
        .post('/admin')
        .send(newClientAddressInvalid);
      expect(response.status).to.be.equal(401);
    })
  })
})
