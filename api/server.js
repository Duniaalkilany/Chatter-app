const express = require("express");
const app = express();

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);

//testing 
app.get('/',(req,res)=>{
    res.send('welcome to homepage!!');
})

module.exports = {
    server: app,
    start: (port) => {
      if (!port) {
        throw new Error('Missing Port');
      }
      app.listen(port, () => console.log(`Listening on ${port}`));
    },
  };
