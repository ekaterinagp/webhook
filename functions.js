const axios = require("axios");

class Functions {
  // _urlArray = [];

  async registerWebhook(data) {
    let { token, url } = data;
    // console.log(data);

    if (!token) {
      return { status: 401, response: { error: "unathorized" } };
    }
    if (!url) {
      return { status: 400, response: { error: "url is required" } };
    }

    try {
      // const count = this._urlArray.push(url);
      // console.log("count", count);
      // console.log("arrayfull", this._urlArray);

      return {
        status: 200,
        response: { message: "webhook registered", url },
      };
    } catch (err) {
      return { status: 400, response: err };
    }
  }

  async postData(data, array) {
    let { payload, token } = data;

    if (!payload) {
      return { status: 401, response: { error: "unathorized" } };
    }

    try {
      array.forEach(async (url) => {
        try {
          axios
            .post(url, {
              payload,
              token,
            })
            .then((res) => {
              console.log(`statusCode: ${res.statusCode}`);
              console.log(res);
            })
            .catch((error) => {
              console.error(error);
            });

          console.log(array);
        } catch (error) {
          return { status: 400, response: err };
        }
      });
      return {
        status: 200,
        response: { message: "data posted to url" },
      };
    } catch (err) {
      return { status: 400, response: err };
    }
  }
}

module.exports = Functions;
