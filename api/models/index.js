'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const UserSchema = require('./users');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL||'postgres://localhost:5432/dunia';;
// const DATABASE_URL = process.env.DATABASE_URL 

let sequelizeOptions = {
  dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
};


const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);



module.exports = {
  db: sequelize,
  users: UserSchema(sequelize, DataTypes),
};