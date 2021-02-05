const axios = require("axios");

class Functions {
  async postData(payload, token, urlArray) {
    return new Promise((resolve, reject) => {
      let promiseArr = urlArray.map((url) =>
        axios.post(url, {
          payload,
          token,
        })
      );
      //if tasks are dependent on each other => Promise.all
      Promise.allSettled(promiseArr)
        .then((res) => {
          res.forEach((res) => {
            if (res.status == "rejected") {
              console.log(res);
              //do something with rejected promise
            }
          });
          resolve({
            status: 200,
            response: { message: `data posted to url` },
          });
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports = Functions;
