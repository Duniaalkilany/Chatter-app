const {
  Sequelize,
  DataTypes
} = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/dunia')

const ConversationSchema = sequelize.define('Conversation', {
  members: {
    type: DataTypes.ARRAY((DataTypes.STRING))
  }
})

module.exports = ConversationSchema;