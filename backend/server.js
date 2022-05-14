require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use("/player_cards", require("./routes/player_cards"));
app.use("/armory_items", require("./routes/armory_items"));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerJsdoc({
      definition: {
        openapi: "3.0.0",
        info: {
          title: "HeroQuest bookkeeper API",
          version: "1.0.0",
          description:
            "This program can be used to keep book of stats in a game called HeroQuest.",
          contact: {
            name: "Matti Syrjänen",
          },
        },
        servers: [
          {
            url: "http://localhost:5000",
          },
        ],
      },
      apis: ["./routes/armory_items.js", "./routes/player_cards.js"],
    })
  )
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
