'use strict';
require('dotenv').config();

const {
  Sequelize,
  DataTypes
} = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE_URL)
const sequelize = new Sequelize('postgres://localhost:8800/noor')
// 'postgres://localhost:5432/dunia'

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
})

module.exports = MessageSchema