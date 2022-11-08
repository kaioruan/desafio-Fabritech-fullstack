import * as Jwt from 'jsonwebtoken';
export const UsersMock =  [
  {
    username: 'Kaio',
    role: 'user',
    email: 'kaio@gmail.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      // senha: secret_admin
  },
  {
    username: 'Luis',
    role: 'user',
    email: 'luis@gmail.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
      // senha: secret_user
  },
]
export const token = Jwt.sign({ userId: 1 }, 'jwt_secret', {
  expiresIn: '1d',
});

export const ClientsMock = [
  {
    "id": 1,
    "username": "Kaio Oliveira",
    "email": "kaio@teste.com",
    "role": "client",
    "addressId": 17,
    "relationship": "Pai/Mãe",
    "address.id": 17,
    "address.cep": "49090670",
    "address.street": "Rua Antonio Freires",
    "address.district": "Jardins",
    "address.city": "Aracaju",
    "address.state": "SE",
    "address.country": "Brasil"
  },
  {
    "id": 2,
    "username": "Moura Oliveira",
    "email": "moura@gmail.com",
    "role": "client",
    "addressId": 18,
    "relationship": "Irmão/Irmã",
    "address.id": 18,
    "address.cep": "49090600",
    "address.street": "Rua Jacy Andrade",
    "address.district": "Soledade",
    "address.city": "Aracaju",
    "address.state": "SE",
    "address.country": "Brasil"
  }
]

export const newClient = {
  "username": "Kaio God",
  "email": "kaio@gmail.com",
  "role": "client",
  "relationship": "Pai",
  "addressId": "2",
  "address": {
    "cep": "49090600",
    "street": "Rua Jacy Andrade de Jesus",
    "district": "Bugio",
    "city": "Aracaju",
    "state": "SE",
    "country": "Brasil"
  }
}

export const newClientInvalid = {
  "username": "Kaio God",
  "email": "kaio.com",
  "role": "client",
  "relationship": "Pai",
}

export const newClientAddressInvalid = {
  "username": "Kaio God",
  "email": "kaio@teste.com",
  "role": "client",
  "relationship": "Pai",
  "address": {
    "cep": "49090600",
    "street": "Rua Jacy Andrade de Jesus",
  }
}