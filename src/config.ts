import {Static, Type} from "@sinclair/typebox";

export const configSchema = Type.Strict(Type.Object({
  PORT: Type.Number(),
  REDIS_HOST: Type.String(),
  REDIS_PORT: Type.Number(),
  REDIS_PASSWORD: Type.String(),
}));
export type configType = Static<typeof configSchema>;
