const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    google_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_google_id_key"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_email_key"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    profile_picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("active","inactive","blocked"),
      allowNull: true,
      defaultValue: "active"
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_google_id_key",
        unique: true,
        fields: [
          { name: "google_id" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
