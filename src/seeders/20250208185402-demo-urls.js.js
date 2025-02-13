'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, get the user ids
    const users = await queryInterface.sequelize.query(
      `SELECT id from users LIMIT 2;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    return queryInterface.bulkInsert('urls', [
      {
        id: uuidv4(),
        user_id: users[0].id,
        long_url: 'https://www.example.com/very/long/url/1',
        short_url: 'abc123',
        custom_alias: 'example1',
        title: 'Example URL 1',
        description: 'This is a test URL',
        topic: 'technology',
        total_clicks: 0,
        unique_clicks: 0,
        status: 'active',
        password_protected: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        user_id: users[1].id,
        long_url: 'https://www.example.com/very/long/url/2',
        short_url: 'def456',
        custom_alias: 'example2',
        title: 'Example URL 2',
        description: 'Another test URL',
        topic: 'marketing',
        total_clicks: 0,
        unique_clicks: 0,
        status: 'active',
        password_protected: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('urls', null, {});
  }
};
