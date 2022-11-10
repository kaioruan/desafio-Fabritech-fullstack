module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('clients', [
      {
        username: 'Kaio Oliveira',
        email: 'kaio@teste.com',
        role: 'client',
        relationship: 'Irmão/Irmã',
        address_id: 1,
      },
      {
        username: 'Jackson Santos',
        email: 'jackson@teste.com',
        role: 'client',
        relationship: 'Pai/Mãe',
        address_id: 2,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('clients', null, {});
  },
};
