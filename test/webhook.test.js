const Functions = require("../functions.js");

let functions;
beforeEach(async () => {
  functions = new Functions();
});

describe("call API to register webhooks", () => {
  test("add several URL to array, message and status succsess", async () => {
    let data = {
      url:
        "https://enntsuvdd2l6p38.m.pipedream.net/?fbclid=IwAR28TDUpj5NpPvhrzlN13Aeykz7Iq08tRbIdXgszpS_ZCI1Yk2SSEsEe_1g",
      token: "foo",
    };
    let result = await functions.registerWebhook(data);
    let result1 = await functions.registerWebhook(data);
    let result2 = await functions.registerWebhook(data);
    expect(result.status).toBe(200);
    expect(result1.status).toBe(200);
    expect(result2.status).toBe(200);
    expect(result.response.message).toBe("webhook registered");
    expect(result.response.url).toEqual(data.url);
  });

  test("add URL to array, token missing", async () => {
    let data = {
      url:
        "https://enntsuvdd2l6p38.m.pipedream.net/?fbclid=IwAR28TDUpj5NpPvhrzlN13Aeykz7Iq08tRbIdXgszpS_ZCI1Yk2SSEsEe_1g",
    };
    let result = await functions.registerWebhook(data);
    expect(result.status).toBe(401);
    expect(result.response.error).toBe("unathorized");
  });

  test("add URL to array, url missing", async () => {
    let data = {
      token: "foo",
    };
    let result = await functions.registerWebhook(data);
    expect(result.status).toBe(400);
    expect(result.response.error).toBe("url is required");
  });

  test("add URL to array, data is empty", async () => {
    let data = {};
    let result = await functions.registerWebhook(data);
    expect(result.status).toBe(401);
    expect(result.response.error).toBe("unathorized");
  });
});

describe("post data to saved URL", () => {
  test("post data to one url, status and message succsess", async () => {
    let data = { payload: ["any", { valid: "JSON" }], token: "foo" };
    let array = [
      "https://enntsuvdd2l6p38.m.pipedream.net/?fbclid=IwAR28TDUpj5NpPvhrzlN13Aeykz7Iq08tRbIdXgszpS_ZCI1Yk2SSEsEe_1g",
    ];
    let result = await functions.postData(data, array);
    expect(result.status).toBe(200);
  });

  test("post data to one url, no payload, status unauthorized", async () => {
    let data = {};
    let result = await functions.postData(data);
    expect(result.status).toBe(401);
    expect(result.response.error).toBe("unathorized");
  });
});
