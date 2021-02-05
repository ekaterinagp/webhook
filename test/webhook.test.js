const Functions = require("../functions.js");

let functions;
beforeEach(async () => {
  functions = new Functions();
});

const spyConsole = () => {
  let spy = {};

  beforeAll(() => {
    spy.console = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    spy.console.mockRestore();
  });

  return spy;
};

describe("post data to saved URL", () => {
  let spy = spyConsole();
  test("post data to one url, status and message succsess", async () => {
    let array = [
      "https://enntsuvdd2l6p38.m.pipedream.net/?fbclid=IwAR28TDUpj5NpPvhrzlN13Aeykz7Iq08tRbIdXgszpS_ZCI1Yk2SSEsEe_1g",
      "https://f377ed3adea111140dde189e3a7e4488.m.pipedream.net/",
    ];
    let payload = ["any", { valid: "JSON" }];
    let token = "foo";
    let result = await functions.postData(payload, token, array);
    expect(result.status).toBe(200);
  });

  test("post data to one url, bad url", async () => {
    let array = [
      "https://enntsuvdd2l6p38.m.pipedream.net/?fbclid=IwAR28TDUpj5NpPvhrzlN13Aeykz7Iq08tRbIdXgszpS_ZCI1Yk2SSEsEe_1g",
      "bad url",
    ];
    let payload = ["any", { valid: "JSON" }];
    let token = "foo";
    let result = await functions.postData(payload, token, array);
    expect(console.error).toHaveBeenCalled();
    expect(result.response.message).toBe("data posted to url");
  });
});
