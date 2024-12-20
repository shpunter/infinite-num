import { addIntPart, splitFn } from "./utils.ts";

export const addV3 = (num1: string, num2: string) => {
  const [int1] = splitFn(num1);
  const [int2] = splitFn(num2);

  const result = addIntPart(int1, int2);
  let str = "";

  for (let i = 0; i < result.length; i++) {
    str = result[i] + str;
  }

  return str;
};
