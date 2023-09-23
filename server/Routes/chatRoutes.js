const express = require('express');
const { accessChat } = require('../Controllers/chatController');

const app = express();

const Router = express.Router();

Router.route("/").post(accessChat);


module.exports = Router;