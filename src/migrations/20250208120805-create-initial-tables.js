'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      // Create users table
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        google_id: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true
          }
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        profile_picture: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        last_login: {
          type: Sequelize.DATE,
          allowNull: true
        },
        status: {
          type: Sequelize.ENUM('active', 'inactive', 'blocked'),
          defaultValue: 'active'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });

      // Create URLs table
      await queryInterface.createTable('urls', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false
        },
        long_url: {
          type: Sequelize.TEXT,
          allowNull: false,
          validate: {
            isUrl: true
          }
        },
        short_url: {
          type: Sequelize.STRING(10),
          unique: true,
          allowNull: false
        },
        custom_alias: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: true
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        topic: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        total_clicks: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        unique_clicks: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        status: {
          type: Sequelize.ENUM('active', 'inactive', 'expired'),
          defaultValue: 'active'
        },
        expires_at: {
          type: Sequelize.DATE,
          allowNull: true
        },
        password_protected: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        url_password: {
          type: Sequelize.STRING,
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });

    // Create clicks table for detailed analytics
      await queryInterface.createTable('clicks', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        url_id: {
          type: Sequelize.UUID,
          references: {
            model: 'urls',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false
        },
        visitor_id: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        ip_address: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        user_agent: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        device_type: {
          type: Sequelize.STRING(20),
          allowNull: false
        },
        browser: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        browser_version: {
          type: Sequelize.STRING(20),
          allowNull: true
        },
        os: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        os_version: {
          type: Sequelize.STRING(20),
          allowNull: true
        },
        country: {
          type: Sequelize.STRING(2),
          allowNull: true
        },
        city: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        referrer: {
          type: Sequelize.STRING(255),
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });  
      
      // Create URL tags table for better organization
      await queryInterface.createTable('url_tags', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        url_id: {
          type: Sequelize.UUID,
          references: {
            model: 'urls',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false
        },
        tag_name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });

      // Create daily_analytics table for aggregated stats
      await queryInterface.createTable('daily_analytics', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        url_id: {
          type: Sequelize.UUID,
          references: {
            model: 'urls',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        total_clicks: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        unique_visitors: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        device_stats: {
          type: Sequelize.JSONB,
          defaultValue: {}
        },
        browser_stats: {
          type: Sequelize.JSONB,
          defaultValue: {}
        },
        os_stats: {
          type: Sequelize.JSONB,
          defaultValue: {}
        },
        country_stats: {
          type: Sequelize.JSONB,
          defaultValue: {}
        },
        referrer_stats: {
          type: Sequelize.JSONB,
          defaultValue: {}
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });

      // Add indexes for better performance
      await queryInterface.addIndex('urls', ['short_url']);
      await queryInterface.addIndex('urls', ['user_id']);
      await queryInterface.addIndex('urls', ['topic']);
      await queryInterface.addIndex('urls', ['status']);
      await queryInterface.addIndex('clicks', ['url_id']);
      await queryInterface.addIndex('clicks', ['created_at']);
      await queryInterface.addIndex('clicks', ['visitor_id']);
      await queryInterface.addIndex('clicks', ['country']);
      await queryInterface.addIndex('daily_analytics', ['url_id', 'date']);
      await queryInterface.addIndex('url_tags', ['url_id']);
      await queryInterface.addIndex('url_tags', ['tag_name']);
  },

  async down (queryInterface, Sequelize) {
      // Drop tables in reverse order
      await queryInterface.dropTable('daily_analytics');
      await queryInterface.dropTable('url_tags');
      await queryInterface.dropTable('clicks');
      await queryInterface.dropTable('urls');
      await queryInterface.dropTable('users');
  }
};
