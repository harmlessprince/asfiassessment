const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const listEndpoints = require("express-list-endpoints"); 
const database = require("./config/database");
// const router = express.Router();
const routes = require("./routes/api");

const app = express();
const port = process.env.APP_PORT || 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.g
app.use("/api/players", routes);
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

console.log(listEndpoints(app));
database
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}.`);
    });
  })
  .catch();
