export type ArrayToStr = (
  carryOver: number,
  array: number[],
  isFloat: boolean,
) => string;

export type StrToArray = (
  strings: string[],
) => [[number[], number], [number[], number], boolean];
