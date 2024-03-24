const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const videosroutes = require("./routes/videos");

// define port
const { PORT } = process.env;

// middleware for CORS
app.use(cors());

// add middleware - 1) apikey 2) json 3) cors

// middleware for JSON formatnp
app.use(express.json());

// middleware to check if received is JSON or not
app.use((req, res, next) => {
  if (
    req.method == "Post" &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res.status(400).send("JSON format needed to post comments");
  }

  next();
});

// serve static-files
app.use("/static-files", express.static("public"));

// import videos-routes here
app.use("/videos", videosroutes);

// listen to port
app.listen(PORT, () => {
  console.log("Listening to port ", PORT);
});
