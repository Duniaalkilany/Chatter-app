
'use strict';
require('dotenv').config();

const {
  Sequelize,
  DataTypes
} = require('sequelize');

// const sequelize = new Sequelize(process.env.DATABASE_URL)
const sequelize = new Sequelize('postgres://localhost:8800/noor')
// 'postgres://localhost:5432/dunia'
const ConversationSchema = sequelize.define('conversation-proj', {
  members: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  }

}



)




module.exports = ConversationSchema;