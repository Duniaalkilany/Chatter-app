//here i will initial user , get , update ,getall and so on !


const router = require("express").Router();
const {users} = require("../models");
const bcrypt = require("bcrypt");

//update user//i mean here update information in usermodel like pass, city,... (user accont jusy if valid id or admin else error//403//You can update only your account!)
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        //first if user want to update password 
        //send new pass in body 
        //generate new pass and hashed it then update it 
      if (req.body.password) {
        try {

          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
     // here when i try to update user acoount info (infi in model )
      try {
        let id = parseInt(req.params.id);
        const obj = req.body;
        let found = await users.findOne({ where: {id: id} });
        let updatedRecord = await found.update(obj);
        
        res.status(200).json("Account has been updated");
      } catch (err) {
          console.log(err);
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });
  


//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        let id = parseInt(req.params.id);
        let deletedRecord = await users.destroy({where: {id: id}});
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });
//get a user

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let user = await users.findOne({ where: {id: id} });
        //not necessary properties // dont want to get it 
        // delete user.dataValues['password']
        const { password, updatedAt, ...other } = user.dataValues;
      res.status(200).json(other);
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  });
//get all users X because in real social media apps i did not do get all users 
//follow a user


router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
         //user to foolow (updatre followers , add current user  )
         const id = (req.params.id);
        const user = await users.findOne({ where: {id: id} });
       //user want to foolow (update following , add user )
       const userId = (req.body.userId);
        const currentUser = await users.findOne({ where: {id: userId} });
        if (!user.followers.includes(req.body.userId)) {
            await user.update({ $push: { followers:req.body.userId  } });
           
            await currentUser.update({ $push: { followings: req.params.id } });
        //   await user.followers.push( req.body.userId);
        //   await user.update({
        //     followers: user.followers
        //   });
        //   await currentUser.followings.push(req.params.id);
        //   await currentUser.update({
        //     followings: user.followings
        //   });
          res.status(200).json(user);
          console.log(user);
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
          console.log(err);
        // res.status(500).json(err);
      }
    } 
    //if ! is false , meaning same user 
    else {
      res.status(403).json("you cant follow yourself");
    }
  });
//unfollow a user

//testing 
router.get('/',(req,res)=>{
    res.send('hey its user routes!!');
})

module.exports = router;