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

exports.sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;
    const newMessage = await Message.create({
      sender: req.user.id,
      receiver,
      message
    });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
