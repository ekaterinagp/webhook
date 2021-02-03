// module.exports = (app) => {
//   console.log("Webhook is running");
//   app.post("/webhook", (req, res) => {
//     console.log("Activate webhook");
//     console.log(req.body);
//     res.status(200).send();
//   });
// };

const https = require("https");
const url = "https://requestbin.fullcontact.com/rf385urf";
const data = {
  payload: ["any", { valid: "JSON" }],
};

const options = {
  hostname: url,
  path: "/api/webhooks/test",
  method: "POST",
  port: 9876,
  json: true,
  headers: {
    "Content-Type": "application/json",
  },
};

async function hook() {
  try {
    const res = await https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    console.log(res);
  } catch (e) {
    console.log("error", e);
  }
}

// hook();

app.post("/api/webhooks", (req, res) => {
  // check if verification token is correct
  if (req.query.token !== token) {
    return res.sendStatus(401);
  }

  // print request body
  console.log(req.body);

  // return a text response
  const data = {
    responses: [
      {
        type: "text",
        elements: ["Hi", "Hello"],
      },
    ],
  };

  res.json(data);
});
