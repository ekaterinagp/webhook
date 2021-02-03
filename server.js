const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const url = "https://enntsuvdd2l6p38.m.pipedream.net/?fbclid=IwAR28TDUpj5NpPvhrzlN13Aeykz7Iq08tRbIdXgszpS_ZCI1Yk2SSEsEe_1g";
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const token = "foo";
const functions = require("./functions");

const port = process.env.PORT || 9876;

const server = require("http").Server(app);

const routes = require("./routes");
app.use(routes);

//add counter for webhooks
//create random token each time

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
