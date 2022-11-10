module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('address', [
      {
        cep: '49090500',
        street: 'Rua da Paz',
        district: 'Jardim Centenário',
        city: 'Aracaju',
        state: 'Sergipe',
        country: 'Brasil'
      },
      {
        cep: '49090701',
        street: 'Rua da Gloria',
        district: 'Jardim Centenário',
        city: 'Aracaju',
        state: 'Sergipe',
        country: 'Brasil'
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('address', null, {});
  },
};
