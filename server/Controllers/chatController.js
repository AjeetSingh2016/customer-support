const Chat = require("../models/userModel");
const User = require("../models/userModel");

const accessChat = async (req, res) => {
    const { userId } = req.body;

    const currentUser = "60ae58123d1ed1599b042fca"
  
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
      }
    
      var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: currentUser} } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage");
    
      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email",
      });
    
      if (isChat.length > 0) {
        res.send(isChat[0]);
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [currentUser, userId],
        };
    
        try {
          const createdChat = await Chat.create(chatData);
          const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
          );
          res.status(200).json(FullChat);
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
      }
  };



module.exports = {
    accessChat,
};
