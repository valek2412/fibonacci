import fastify, {FastifyInstance} from "fastify";
import fastifyRedis from "fastify-redis";

import fibonacci from "./services/fibonacci";

const build = (opts = {}): FastifyInstance => {
  const app = fastify(opts);

  app.register(fastifyRedis, { host: "127.0.0.1" });
  app.register(fibonacci);

  return app;
};

export default build;
