const router = require("express").Router();

const Functions = require("./functions");

let countUrl = 0;
let urlArray = [];

router.post("/api/webhooks", async (req, res) => {
  let functions = new Functions();

  let { response, status } = await functions.registerWebhook(req.body);
  console.log(status);
  console.log("url", response.url);
  if (status == 200) {
    countUrl++;
    urlArray.push(response.url);
  }
  console.log(countUrl);
  return res.status(status).send(response);
});

router.post("/api/webhooks/test", async (req, res) => {
  let functions = new Functions();
  let result = await functions.postData(req.body, urlArray);
  console.log(result);
  console.log({ urlArray });
  res.send();
});

// app.post("/api/webhooks/test", (req, res) => {
//   if (!req.body.payload) {
//     return res.sendStatus(401);
//   }
//   console.log(req.body);
//   let { payload } = req.body;
//   array.forEach(async (url) => {
//     try {
//       axios
//         .post(url, {
//           payload,
//           token: "foo",
//         })
//         .then((res) => {
//           console.log(`statusCode: ${res.statusCode}`);
//           console.log(res);
//         })
//         .catch((error) => {
//           console.error(error);
//         });

//       console.log(res._eventsCount);
//     } catch (e) {
//       console.log("error", e);
//     }
//     res.send();
//   });
// });

module.exports = router;
