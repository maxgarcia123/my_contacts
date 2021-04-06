'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('contact_numbers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_contact_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'user_contacts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_provider: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        defaultValue: true,
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.dropTable('contact_numbers');

  }
};
