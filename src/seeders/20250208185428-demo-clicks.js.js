'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get URL ids
    const urls = await queryInterface.sequelize.query(
      `SELECT id from urls LIMIT 2;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const clicks = [];
    const now = new Date();

    // Generate 10 clicks for each URL
    urls.forEach(url => {
      for (let i = 0; i < 10; i++) {
        clicks.push({
          id: uuidv4(),
          url_id: url.id,
          visitor_id: `visitor_${i}`,
          ip_address: `192.168.1.${i}`,
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          device_type: i % 2 === 0 ? 'desktop' : 'mobile',
          browser: 'Chrome',
          browser_version: '91.0',
          os: 'Windows',
          os_version: '10',
          country: 'US',
          city: 'New York',
          referrer: 'https://google.com',
          created_at: new Date(now - i * 86400000), // Spread over last 10 days
          updated_at: new Date(now - i * 86400000)
        });
      }
    });

    return queryInterface.bulkInsert('clicks', clicks);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clicks', null, {});
  }
};