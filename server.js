const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const port = process.env.PORT || 9876;
const server = require("http").Server(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(routes);

process.on("uncaughtException", (err, data) => {
  if (err) {
    console.log("critical error, yet system keeps running", err);
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
