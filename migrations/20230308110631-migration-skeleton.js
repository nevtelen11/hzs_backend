'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
        await queryInterface.addConstraint('ingatlanok', 
        {
          fields: ['kategoria'],
          type: 'foreign key',
          name: 'kategoria_fkey',
          references: {
            table: 'kategoriak',
            field: 'id'
          },
          transaction
        }
      );
      await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ingatlanok', 'kategoria_fkey');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
