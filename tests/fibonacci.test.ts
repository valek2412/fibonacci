import build from "../src/app";
import { expect } from "chai";
import {FastifyInstance} from "fastify";

describe("App", () => {
  let app: FastifyInstance;

  before(async () => {
    app = await build();
    await app.redis.flushdb();
  });

  describe("Fibonacci", () => {
    it("Checking fibonacci equals mock array", async () => {
      const fibonacciArray = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

      for (let i = 0; i < fibonacciArray.length; i++) {
        const ticketRes = await app.inject().post("/input").body({ number: i });
        const ticket = JSON.parse(ticketRes.body).ticket;

        const fibonacciRes = await app.inject().post("/output").body({ ticket: +ticket });
        const fibonacci = JSON.parse(fibonacciRes.body).fibonacci;

        expect(+fibonacci).to.equal(fibonacciArray[i]);
      }
    });
  });
});
