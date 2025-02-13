const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urls', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    long_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    short_url: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "urls_short_url_key"
    },
    custom_alias: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "urls_custom_alias_key"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    topic: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    total_clicks: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    unique_clicks: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM("active","inactive","expired"),
      allowNull: true,
      defaultValue: "active"
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    password_protected: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    url_password: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'urls',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "urls_custom_alias_key",
        unique: true,
        fields: [
          { name: "custom_alias" },
        ]
      },
      {
        name: "urls_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "urls_short_url",
        fields: [
          { name: "short_url" },
        ]
      },
      {
        name: "urls_short_url_key",
        unique: true,
        fields: [
          { name: "short_url" },
        ]
      },
      {
        name: "urls_status",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "urls_topic",
        fields: [
          { name: "topic" },
        ]
      },
      {
        name: "urls_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
