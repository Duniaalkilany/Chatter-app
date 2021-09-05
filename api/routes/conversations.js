
//conversations routes for messenger :

const router = require("express").Router();
const Conversation = require("../models/Conversation");
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
// create new conv
router.post("/", async (req, res) => {
  await Conversation.sync()
  const newConversation = Conversation.build ({
    members: [req.body.senderId, req.body.receiverId],
  });
 
  
  console.log(req.body.senderId);
  console.log(req.body.receiverId);
  
//to add members array //(contains id's of sender and reciever) array in sql db 
  try {
    console.log('heyyyyyy inside try ');
    console.log('newConversation',newConversation );
    const savedConversation = await newConversation.save();
    console.log('savedConversation',savedConversation);
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
    // console.log('errror',err);
  }
});


//get conv of a user
router.get("/:userId", async (req, res) => {
  try {
    let userId =(req.params.userId).toString()
    const conversation = await Conversation.findAll({
      where: {
        members: {
          [Sequelize.Op.contains]: [userId]
        },
        
      // members: { $in: [userId] },
    
        // where: {
        //   members: {
        //     $in: [userId]
        //   },
        // }
      // where: {
      // members: { $in: [req.params.userId] },}
      // where: {
      //   members: {
      //     $in: [req.params.userId] 
      //   }
        // members: { $in: [req.params.userId] },
      }
  
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (err) {
    // res.status(500).json(err);
 console.log(err);
  }
});
// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      where: {
        members: {
          [Sequelize.Op.all]: [req.params.firstUserId, req.params.secondUserId]
        },
      }
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;