const router = require("express").Router();

const Functions = require("./functions");

let countUrl = 0;
let urlArray = [];

router.post("/api/webhooks", async (req, res) => {
  let { token, url } = req.body;
  if (!token) {
    return res.status(401).send({ error: "unauthorized" });
  }
  if (!url) {
    return res.status(400).send({ error: "url is required" });
  }
  countUrl++;
  urlArray.push(url);
  console.log(countUrl, urlArray);
  return res.status(200).send({ message: `webhook registered on url ${url}` });
});

router.post("/api/webhooks/test", async (req, res) => {
  let { payload, token } = req.body;
  if (!token) {
    return res.status(401).send({ error: "unauthorized" });
  }
  if (!payload) {
    return res.status(400).send({ error: "payload is required" });
  }
  let functions = new Functions();

  try {
    let { response, status } = await functions.postData(
      payload,
      token,
      urlArray
    );
    return res.status(status).send(response.message);
  } catch (error) {
    // console.log(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
