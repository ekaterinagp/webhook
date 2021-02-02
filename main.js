const express = require("express");
const compression = require("compression");
const app = express();
const bodyParser = require("body-parser");
app.use(compression());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 9876;
const server = require("http").Server(app);

process.on("uncaughtException", (err, data) => {
  if (err) {
    console.log("critical error, yet system keeps running");
    console.log(data);
    return;
  }
});

server.listen(port, (err) => {
  if (err) {
    console.log("server couldn't connect");
    return;
  }
  console.log(`Listening on port ${port}`);
});

require("./webhook.js")(app);
