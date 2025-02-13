'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get URL ids
    const urls = await queryInterface.sequelize.query(
      `SELECT id from urls LIMIT 2;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const analytics = [];
    const now = new Date();

    // Generate 7 days of analytics for each URL
    urls.forEach(url => {
      for (let i = 0; i < 7; i++) {
        analytics.push({
          id: uuidv4(),
          url_id: url.id,
          date: new Date(now - i * 86400000),
          total_clicks: Math.floor(Math.random() * 100),
          unique_visitors: Math.floor(Math.random() * 50),
          device_stats: JSON.stringify({
            desktop: Math.floor(Math.random() * 60),
            mobile: Math.floor(Math.random() * 40)
          }),
          browser_stats: JSON.stringify({
            chrome: Math.floor(Math.random() * 70),
            firefox: Math.floor(Math.random() * 30)
          }),
          os_stats: JSON.stringify({
            windows: Math.floor(Math.random() * 50),
            mac: Math.floor(Math.random() * 30),
            linux: Math.floor(Math.random() * 20)
          }),
          country_stats: JSON.stringify({
            US: Math.floor(Math.random() * 40),
            UK: Math.floor(Math.random() * 30),
            IN: Math.floor(Math.random() * 30)
          }),
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    });

    return queryInterface.bulkInsert('daily_analytics', analytics);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('daily_analytics', null, {});
  }
};