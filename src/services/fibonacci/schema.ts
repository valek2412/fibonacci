import { Static, Type } from "@sinclair/typebox";

export const InputReceive = Type.Object({
  number: Type.Number(),
});
export type InputReceiveType = Static<typeof InputReceive>;


export const InputReply = Type.Object({
  ticket: Type.Number(),
});
export type InputReplyType = Static<typeof InputReply>;


export const OutputReceive = Type.Object({
  ticket: Type.Number(),
});
export type OutputReceiveType = Static<typeof OutputReceive>;


export const OutputReply = Type.Object({
  fibonacci: Type.String(),
});
export type OutputReplyType = Static<typeof OutputReply>;

