module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
          // senha: secret_admin
      },
      {
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
          // senha: secret_user
      },
      // {
      //   username: "Kaio Oliveira",
      //   role: "user",
      //   email: "kaio@user.com",
      //   password: "$2a$10$Vr2tX37HOrsYadXPrJC/1evCJQ9c5zRmUsIZt5S5.NxROwdBB9T.S",
      //   //senha 12345678
      // },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
