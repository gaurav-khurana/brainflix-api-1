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

// import videos-routes here
app.use("/videos", videosroutes);

// listen to port
app.listen(PORT, () => {
  console.log("Listening to port ", PORT);
});
