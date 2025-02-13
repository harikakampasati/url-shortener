'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        google_id: '103827964174271428764',
        email: 'test.user1@gmail.com',
        name: 'Test User 1',
        profile_picture: 'https://lh3.googleusercontent.com/test1',
        status: 'active',
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        google_id: '103827964174271428765',
        email: 'test.user2@gmail.com',
        name: 'Test User 2',
        profile_picture: 'https://lh3.googleusercontent.com/test2',
        status: 'active',
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};