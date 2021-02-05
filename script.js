const axios = require("axios");

const data = {
  url: "https://f377ed3adea111140dde189e3a7e4488.m.pipedream.net/",
  token: "foo",
};

const data1 = {
  url:
    "https://enntsuvdd2l6p38.m.pipedream.net/?fbclid=IwAR28TDUpj5NpPvhrzlN13Aeykz7Iq08tRbIdXgszpS_ZCI1Yk2SSEsEe_1g",
  token: "bar",
};

const registerHook = (token, url) => {
  axios
    .post("http://localhost:9876/api/webhooks", {
      token: token,
      url: url,
    })
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.error(error);
    });
};

const postTest = () => {
  axios
    .post("http://localhost:9876/api/webhooks/test", {
      payload: ["any", { valid: "JSON" }],
      token: "foo",
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

registerHook(data.token, data.url);
registerHook(data1.token, data1.url);
postTest();
