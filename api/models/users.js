'use strict';
//min , max for number og ch
const UserSchema = (sequelize, DataTypes) => 
    sequelize.define("app-users", {
    username: {
      type: DataTypes.STRING,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      min: 6,
    },
    profilePicture: {
        //not required but when create bu default will be empty
      type: DataTypes.STRING,
      default: "",
    },
    coverPicture: {
      type: DataTypes.STRING,
      default: "",
    },
    followers: {
       // users ids's
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      default:[]
    },
    followings: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      default: []
    },
    isAdmin: {
        //when create a user by defaault its not admin is user so default : false
      type: DataTypes.BOOLEAN,
      default: false,
    },
    desc: {
      type:DataTypes.STRING,
      max: 50,
    },
    city: {
      type: DataTypes.STRING,
      max: 50,
    },
    from: {
      type:DataTypes.NUMBER,
      max: 50,
    },
    relationship: {
      //type number because we will give it as options 1.single , 2. married, 3. complecated 
      type: DataTypes.ENUM(1,2,3),
      
    },
   

    },
    //auyo update timestamps when i create a user or update user.
    { timestamps: true }
    );

module.exports = UserSchema;