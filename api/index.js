const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");

const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, './public')));

const {
  Sequelize
} = require('sequelize');

io.on('connection', socket => {
  console.log('connected ' + socket.id);

  socket.emit('message', 'Welcome to Chat-Stream!');
})

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const router = express.Router();

dotenv.config();

const sequelize = new Sequelize('postgres://localhost:5432/saif')


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({
  storage: storage
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

server.listen(8800, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log("Backend server is running!");
});