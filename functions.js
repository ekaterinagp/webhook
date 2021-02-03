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

      // promiseArr.push(
      //   axios.post("bad url", {
      //     payload,
      //     token,
      //   })
      // );

      Promise.all(promiseArr)
        .then((res) => {
          console.log("success, all done");
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
