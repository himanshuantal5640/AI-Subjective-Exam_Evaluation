const Message = require("../models/Message");

exports.getChatHistory = async (req, res) => {

  const { userId } = req.params;

  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: userId },
      { sender: userId, receiver: req.user.id }
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
};
