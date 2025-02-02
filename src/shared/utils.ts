import type { A2S, S2AMD, S2ASA } from "./types.ts";

// array to string
export const a2s: A2S = (array, isFloat, isNegative = false) => {
  let isToCheckTail = isFloat;

  for (let i = array.length - 1; i >= 0; i--) {
    if (isToCheckTail && array[i] === 46) {
      array[i] = 32;
      isToCheckTail = false;
      break;
    }

    if (isToCheckTail && array[i] === 48) array[i] = 32;
    else break;
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i + 1] === 46 || array.length <= 1) break;

    if (array[i] === 48) array[i] = 32;
    else break;
  }

  return (isNegative ? "-" : "") + String.fromCharCode(...array).trim();
};

// string to array (sub, add)
export const s2aSA: S2ASA = (strings) => {
  const { length: len } = strings;
  const int = Array<number>(len);
  const array = Array<number[]>(len);
  const negative = Array<boolean>(len);
  let isFloat = false;

  for (let i = 0; i < len; i++) {
    negative[i] = strings[i].charCodeAt(0) === 45;
    const shift = negative[i] ? 1 : 0;
    int[i] = strings[i].length - shift;
    array[i] = Array<number>(strings[i].length - shift);
  }

  for (let i = 0; i < len; i++) {
    const shift = negative[i] ? 1 : 0;
    for (let idx = 0 + shift; idx < strings[i].length; idx++) {
      const charCode = strings[i].charCodeAt(idx);

      if (charCode === 46) {
        int[i] = idx - shift;
        isFloat || (isFloat = true);
      }

      array[i][idx - shift] = charCode;
    }
  }

  return [
    { array: array[0], int: int[0], negative: negative[0] },
    { array: array[1], int: int[1], negative: negative[1] },
    isFloat,
  ];
};

// string to array (mul, div)
export const s2aMD: S2AMD = (strings) => {
  const { length: len } = strings;
  const decs = Array<number>(len);
  const arrays = Array<number[]>(len);

  for (let i = 0; i < len; i++) {
    arrays[i] = Array<number>(0);
  }

  for (let i = 0; i < len; i++) {
    for (let idx = 0; idx < strings[i].length; idx++) {
      const charCode = strings[i].charCodeAt(idx);

      if (arrays[i].length === 0 && charCode === 48) continue;
      if (charCode === 46) {
        decs[i] = strings[i].length - 1 - idx;
        continue;
      }

      arrays[i].push(charCode);
    }
  }

  return [[arrays[0], decs[0] ?? 0], [arrays[1], decs[1] ?? 0]];
};
