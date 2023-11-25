export type HSL = {
  h: number;
  s: number;
  l: number;
};

export type HEX = `#${string}`;

export type Color = HSL | HEX;
