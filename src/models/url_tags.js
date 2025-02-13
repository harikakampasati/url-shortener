const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('url_tags', {
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
    tag_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'url_tags',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "url_tags_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "url_tags_tag_name",
        fields: [
          { name: "tag_name" },
        ]
      },
      {
        name: "url_tags_url_id",
        fields: [
          { name: "url_id" },
        ]
      },
    ]
  });
};
