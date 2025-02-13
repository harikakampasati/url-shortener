// seeders/YYYYMMDDHHMMSS-demo-url-tags.js
'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First get the URL ids
    const urls = await queryInterface.sequelize.query(
      `SELECT id from urls;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Common tags for URLs
    const commonTags = [
      'marketing',
      'social-media',
      'blog',
      'documentation',
      'analytics',
      'sales',
      'product',
      'support',
      'development',
      'testing'
    ];

    const urlTags = [];

    // For each URL, assign 2-3 random tags
    urls.forEach(url => {
      // Shuffle tags array
      const shuffledTags = [...commonTags].sort(() => 0.5 - Math.random());
      // Pick 2-3 random tags
      const numTags = Math.floor(Math.random() * 2) + 2; // 2 or 3 tags
      
      for (let i = 0; i < numTags; i++) {
        urlTags.push({
          id: uuidv4(),
          url_id: url.id,
          tag_name: shuffledTags[i],
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    });

    // Also add some specific tag combinations for testing
    if (urls.length >= 2) {
      // Add same tags to first two URLs for testing tag grouping
      ['important', 'featured'].forEach(tag => {
        urlTags.push({
          id: uuidv4(),
          url_id: urls[0].id,
          tag_name: tag,
          created_at: new Date(),
          updated_at: new Date()
        });
        urlTags.push({
          id: uuidv4(),
          url_id: urls[1].id,
          tag_name: tag,
          created_at: new Date(),
          updated_at: new Date()
        });
      });
    }

    return queryInterface.bulkInsert('url_tags', urlTags);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('url_tags', null, {});
  }
};