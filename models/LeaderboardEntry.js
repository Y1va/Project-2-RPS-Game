const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class LeaderboardEntry extends Model {}

LeaderboardEntry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'match',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'leaderboard_entry'
  }
);

module.exports = LeaderboardEntry;
