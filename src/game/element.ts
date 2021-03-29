import { Position } from './position';

const minPosition = 10;
export enum Element {
  Empty = 0,
  E = 0,
  Block = 1,
  block = 1,
  BlockA = 1,
  BA = 1,
  BlockB = 2,
  BB = 2,
  BlockC = 3,
  BC = 3,
  BlockD = 4,
  BD = 4,
  Char = 100,
  Rabbit = 100,
  CharLeft = 100 + minPosition * Position.Left,
  CL = 100 + minPosition * Position.Left,
  CharRight = 100 + minPosition * Position.Right,
  CR = 100 + minPosition * Position.Right,
  CharDown = 100 + minPosition * Position.Down,
  CD = 100 + minPosition * Position.Down,
  CharUp = 100 + minPosition * Position.Up,
  CU = 100 + minPosition * Position.Up,
  Item = 10000,
  Carrot = 10000,
  carrot = 10000,
  C = 10000,
  Tree = 1000000,
  T = 1000000,
}

const removeUpper = (element: number, upper: number): number => {
  let tempElement = element;
  if (tempElement >= upper) {
    const n = Math.trunc(tempElement / upper);
    tempElement = tempElement - n * upper;
  }

  return tempElement;
};

const removeBottom = (element: number, current: number): number => {
  let tempElement = element;
  if (tempElement >= current) {
    const n = Math.trunc(tempElement / current);
    tempElement = n * current;
  }

  return tempElement;
};

export const getBlock = (element: number): number => {
  let tempElement = removeUpper(element, Element.Tree);
  tempElement = removeUpper(tempElement, Element.Item);
  tempElement = removeUpper(tempElement, Element.Char);
  tempElement = removeUpper(tempElement, minPosition);
  tempElement = Math.round(tempElement / Element.block);
  return tempElement;
};

export const getChar = (element: number): number => {
  let tempElement = removeUpper(element, Element.Tree);
  tempElement = removeUpper(tempElement, Element.Item);
  tempElement = removeBottom(tempElement, Element.Char);
  tempElement = Math.round(tempElement / Element.Char);
  // console.log('char', tempElement);
  return tempElement;
};

export const getPosition = (element: number): number => {
  let tempElement = removeUpper(element, Element.Tree);
  tempElement = removeUpper(tempElement, Element.Item);
  tempElement = removeUpper(tempElement, Element.Char);
  tempElement = removeBottom(tempElement, minPosition);
  tempElement = Math.round(tempElement / minPosition);
  // console.log('pos', tempElement);
  return tempElement;
};

export const getItem = (element: number): number => {
  let tempElement = removeUpper(element, Element.Tree);
  tempElement = removeBottom(tempElement, Element.Item);
  tempElement = removeBottom(tempElement, Element.Char);
  tempElement = Math.round(tempElement / Element.Item);
  return tempElement;
};
