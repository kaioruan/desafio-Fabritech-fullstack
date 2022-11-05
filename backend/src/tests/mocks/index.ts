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