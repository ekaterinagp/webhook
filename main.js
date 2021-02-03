const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
// const url = "https://requestbin.fullcontact.com/rf385urf";
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const token = "foo";

const port = process.env.PORT || 9876;
const https = require("https");
const server = require("http").Server(app);

const array = [];

const options = {
  // hostname: "https://requestbin.fullcontact.com/",
  path: "/rf385urf",
  method: "POST",
  port: 9876,
  json: true,
  headers: {
    "Content-Type": "application/json",
  },
  body: {
    token: "foo",
  },
};

app.post("/api/webhooks", (req, res) => {
  if (!req.body.token) {
    return res.sendStatus(401);
  }
  console.log(req.body);
  let { token, url } = req.body;
  array.push(url);
  console.log(array);
  res.status(200).end();
});

app.post("/api/webhooks/test", (req, res) => {
  if (!req.body.payload) {
    return res.sendStatus(401);
  }
  console.log(req.body);
  let { payload } = req.body;
  array.forEach(async (one) => {
    // let newURL = new URL(one);
    // options.hostname = newURL.hostname;
    // options.body.payload = payload;
    // options.path = newURL.pathname;

    try {
      // const res = await https.request(options, (res) => {
      //   console.log(`statusCode: ${res.statusCode}`);

      //   res.on("data", (d) => {
      //     process.stdout.write(d);
      //   });
      // });
      axios
        .post(one, {
          payload,
          token: "foo",
        })
        .then((res) => {
          console.log(`statusCode: ${res.statusCode}`);
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });

      console.log(res._eventsCount);
    } catch (e) {
      console.log("error", e);
    }
    res.send();
  });
});

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
