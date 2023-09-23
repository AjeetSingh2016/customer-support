const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const chatRoute = require('./Routes/chatRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const conversationRoute = require("./Routes/conversation");
const messageRoute = require("./Routes/message");



const app = express();
app.use(cors());
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8085;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

const connectDb = async()=>{
   try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log("Server is connected");
   } catch (error) {
       console.log("Server is not connected ", error);
   }
}
connectDb();


app.get('/', (req, res) => {
    res.send('App is running');
})


app.use("/user", userRoutes);

app.use("/chat", chatRoute);

app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);



app.listen(PORT, console.log("Server is listening") );