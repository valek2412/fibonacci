import {FastifyPluginAsync} from "fastify";

import {
  InputReceive,
  InputReceiveType,
  InputReply,
  InputReplyType,
  OutputReceive,
  OutputReceiveType, OutputReply,
  OutputReplyType
} from "./schema";

import { getFibonacci } from "./utils";


const fibonacci: FastifyPluginAsync = async (fastify) => {
  const { redis } = fastify;

  fastify.post<{ Body: InputReceiveType; Reply: InputReplyType }>(
    "/input",
    {
      schema: {
        body: InputReceive,
        response: {
          200: InputReply,
        },
      },
    },
    async (request, reply) => {
      const {number} = request.body;

      const counter = await redis.get("ticketsCounter");

      const ticket = counter ? parseInt(counter) + 1 : 1;
      await redis.set("ticketsCounter", ticket);

      const fibonacciResult = getFibonacci(number);
      await redis.set(`${ticket}`, fibonacciResult);
      reply.send({ ticket });
    }
  );

  fastify.post<{ Body: OutputReceiveType; Reply: OutputReplyType }>(
    "/output",
    {
      schema: {
        body: OutputReceive,
        response: {
          200: OutputReply,
        },
      },
    },
    async (request, reply) => {
      const ticket = request.body.ticket;
      const fibonacci = await redis.get(`${ticket}`);
      if (!fibonacci) {
        throw new Error("Ticket not found");
      }

      reply.send({ fibonacci: fibonacci });
    }
  );
};


export default fibonacci;
