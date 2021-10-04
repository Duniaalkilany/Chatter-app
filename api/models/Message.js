const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/saif');

const MessageSchema = sequelize.define('Message', {
  conversationId: {
    type: DataTypes.STRING,
  },
  //sender contain sender id
  sender: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
});

module.exports = MessageSchema;
