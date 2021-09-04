const router = require("express").Router();

const {users} = require("../models");
//pasword
const bcrypt = require("bcrypt");


//testing 
router.get('/',(req,res)=>{
    res.send('hey its auth routes!!');
})

//REGISTER
router.post("/register", async (req, res) => {
    console.log("inside signup !!! ");
    console.log({body: req.body})

    try {
    
    //Salt and Hash Passwords with bcrypt//generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
//create new user 


// const userRecord = await users.create(req.body);
// const output = {
//   user: userRecord
 
// };
    const userRecord= await users.create({
 
        username : req.body.username,
        email: req.body.email,
       password:hashedPassword,
       profilePicture: req.body.profilePicture,
       coverPicture:req.body.coverPicture,
       followers:req.body.followers,
       followings:req.body.followings,
       isAdmin:req.body.isAdmin,
       desc:req.body.desc,
       city: req.body.city,
       from: req.body.from,
       relationship:req.body.relationship,
      });
      
   // save user and respond
      console.log("record >>>>> ", userRecord)
      res.status(200).json(userRecord);
    } catch (e) {
       console.log(e);
      }
    });

//LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await users.findOne({ where: {email:req.body.email} });
      //4040 not found 
      !user && res.status(404).json("user not found");
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      //400 bad request
      !validPassword && res.status(400).json("wrong password")
  
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  });


    
    
//         username : "dunia",
//         email: "dunia@gamail.com",
//         password:"123456"
//     });
//     console.log("record >>>>> ",userRecord )
//     res.send('okey!!')
// }
// catch (e) {
//     console.log(e);
    

// }



//   try {
//     //generate new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     //create new user
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     //save user and respond
//     const user = await newUser.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err)
//   }
// });




module.exports = router;