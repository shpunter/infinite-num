import { addV5 } from "../lab/add/v5/index.ts";
import { subV2 } from "../lab/sub/v2/index.ts";

export const add = addV5;
export const sub = subV2;

// example
console.log(sub("3", "1.1"));
console.log(add("3", "1.1"));