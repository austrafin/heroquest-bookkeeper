const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(fileUpload());
app.use(cors());
app.use(express.json());

const host = process.env.MONGODB_HOST;
mongoose.connect(host, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const playerCardRouter = require("./routes/player_cards");

app.use("/player_cards", playerCardRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
