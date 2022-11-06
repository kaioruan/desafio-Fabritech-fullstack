'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      relationship: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        ForeignKey: true,
        references: {
          model: 'address',
          key: 'id'
        }
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clients');
  }
};
