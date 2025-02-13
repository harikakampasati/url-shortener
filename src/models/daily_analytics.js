const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('daily_analytics', {
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    total_clicks: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    unique_visitors: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    device_stats: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    browser_stats: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    os_stats: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    country_stats: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    referrer_stats: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}
    }
  }, {
    sequelize,
    tableName: 'daily_analytics',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "daily_analytics_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "daily_analytics_url_id_date",
        fields: [
          { name: "url_id" },
          { name: "date" },
        ]
      },
    ]
  });
};
