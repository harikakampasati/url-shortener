const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clicks', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    url_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'urls',
        key: 'id'
      }
    },
    visitor_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    device_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    browser: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    browser_version: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    os: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    os_version: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    referrer: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'clicks',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "clicks_country",
        fields: [
          { name: "country" },
        ]
      },
      {
        name: "clicks_created_at",
        fields: [
          { name: "created_at" },
        ]
      },
      {
        name: "clicks_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "clicks_url_id",
        fields: [
          { name: "url_id" },
        ]
      },
      {
        name: "clicks_visitor_id",
        fields: [
          { name: "visitor_id" },
        ]
      },
    ]
  });
};
