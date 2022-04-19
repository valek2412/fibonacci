import fastify, {FastifyInstance} from "fastify";
import fastifyRedis from "fastify-redis";
import fastifyEnv from "fastify-env";

import {configSchema, configType} from "./config";

import fibonacci from "./services/fibonacci";

declare module "fastify" {
  interface FastifyInstance {
    config: configType;
  }
}

const build = async (opts = {}): Promise<FastifyInstance> => {
  const app = fastify(opts);

  app.register(fastifyEnv, {
    confKey: "config",
    schema: configSchema,
    dotenv: process.env.NODE_ENV !== "production"
  });
  await app.after();

  app.register(fastifyRedis, {
    host: app.config.REDIS_HOST,
    port: app.config.REDIS_PORT,
    password: app.config.REDIS_PASSWORD
  });

  app.register(fibonacci);

  return app;
};

export default build;
