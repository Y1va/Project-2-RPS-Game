const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ForumPost extends Model {}

ForumPost.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
    },
  },
  {
    sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'forum_post'
  }
);

module.exports = ForumPost;
