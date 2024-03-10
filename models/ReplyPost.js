const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ReplyPost extends Model {}

ReplyPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
    },
    forumPostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'forum_post',
            key: 'id'
        },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'reply_post',
  }
);

module.exports = ReplyPost;
