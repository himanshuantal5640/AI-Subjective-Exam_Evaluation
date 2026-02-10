const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes')
const examRoutes = require("./routes/examRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use("/api/exams", examRoutes);
app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
