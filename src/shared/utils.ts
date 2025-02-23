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
export const s2aSA: S2ASA = (string) => {
  const isNegative = string.charCodeAt(0) === 45;
  const shift = isNegative ? 1 : 0;
  const array = Array<number>(string.length - shift);
  let intLength = string.length - shift;
  let isFloat = false;

  for (let idx = 0 + shift; idx < string.length; idx++) {
    const charCode = string.charCodeAt(idx);

    if (charCode === 46) {
      intLength = idx - shift;
      isFloat || (isFloat = true);
    }

    array[idx - shift] = charCode;
  }

  return { array, intLength, isNegative, isFloat };
};

// string to array (mul, div)
export const s2aMD: S2AMD = (string) => {
  const array = Array<number>(0);
  const isNegative = string.charCodeAt(0) === 45;
  const shift = isNegative ? 1 : 0;
  let dec = 0;

  for (let idx = 0 + shift; idx < string.length; idx++) {
    const charCode = string.charCodeAt(idx);

    if (array.length === 0 && charCode === 48) continue;
    if (charCode === 46) {
      dec = string.length - 1 - idx - shift;
      continue;
    }

    array.push(charCode);
  }

  return {
    array,
    intLength: array.length - dec, 
    isNegative,
    isFloat: dec > 0,
  };
};
