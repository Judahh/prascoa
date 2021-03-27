import { Element } from './element';
export const levels = [
  // [
  //   //! 0 Apenas forward
  //   [0, 0, 0],
  //   [0, Element.BA + Element.CharRight, Element.BB + Element.C],
  //   [0, 0, 0],
  // ],
  // [
  //   [0, 0, 0],
  //   [
  //     Element.BA + Element.CharRight,
  //     Element.BB + Element.C,
  //     Element.BA + Element.C,
  //   ],
  //   [0, 0, 0],
  // ],
  // [
  //   //! 2 Adiciona turns
  //   [0, 0, 0],
  //   [0, Element.BA + Element.CharUp, Element.BB + Element.C],
  //   [0, 0, 0],
  // ],
  // [
  //   [Element.BA + Element.CharDown, 0, 0],
  //   [Element.BB + Element.C, 0, 0],
  //   [Element.BA + Element.C, Element.BB + Element.C, Element.BB + Element.C],
  // ],
  [
    //! 4 Adiciona if e carrot
    [Element.BA + Element.CharRight, 0, 0],
    [0, Element.BA + Element.CharRight, Element.BB + Element.C],
    [0, 0, 0],
  ],
  [
    //! 5 Adiciona block, not, and e or
    [Element.BA + Element.CharRight, 0, 0],
    [Element.BA + Element.CharRight, Element.BB, Element.BB + Element.C],
    [0, 0, 0],
  ],
  [
    //! 6 Adiciona loop e number
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [
      Element.BA + Element.CharRight,
      Element.BB + Element.C,
      Element.BA + Element.C,
      Element.BA + Element.C,
    ],
    [0, 0, 0, 0],
  ],
  [
    [
      Element.BA + Element.CharRight,
      Element.BB + Element.C,
      Element.BA + Element.C,
    ],
    [Element.BB + Element.C, 0, Element.BB + Element.C],
    [Element.BA + Element.C, Element.BB + Element.C, Element.BA + Element.C],
  ],
  [
    [
      0,
      0,
      Element.BA + Element.C,
      Element.BB + Element.C,
      Element.BA + Element.C,
    ],
    [0, 0, Element.BB + Element.C, 0, Element.BB + Element.C],
    [
      Element.BA + Element.C,
      Element.BB + Element.C,
      Element.BA + Element.CharRight,
      Element.BB + Element.C,
      Element.BA + Element.C,
    ],
    [Element.BB + Element.C, 0, Element.BB + Element.C, 0, 0],
    [
      Element.BA + Element.C,
      Element.BB + Element.C,
      Element.BA + Element.C,
      0,
      0,
    ],
  ],
  [
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 + Element.C, 1, 1, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line prettier/prettier
    [Element.BA + Element.CharUp, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 1, 1],
    [0, 0, 1, 0, 1],
    [0, 0, 1 + Element.C, 0, 1],
    [0, 0, 0, 0, 1],
    [1 + Element.CharRight, 1, 1, 1, 1],
  ],
  [
    [1 + Element.C, 1 + Element.C, 1 + Element.C, 1 + Element.C, 1 + Element.C],
    [1 + Element.C, 0, 1 + Element.C, 0, 1 + Element.C],
    [
      1 + Element.C,
      1 + Element.C,
      1 + Element.CharDown,
      1 + Element.C,
      1 + Element.C,
    ],
    [1 + Element.C, 0, 1 + Element.C, 0, 1 + Element.C],
    [1 + Element.C, 1 + Element.C, 1 + Element.C, 1 + Element.C, 1 + Element.C],
  ],
  [
    [0, 1 + Element.C, 1 + Element.C, 1 + Element.C, 0],
    [1 + Element.C, 1, 1, 1, 1 + Element.C],
    [1 + Element.C, 1, 1 + Element.CharDown, 1, 1 + Element.C],
    [1 + Element.C, 1, 1, 1, 1 + Element.C],
    [0, 1 + Element.C, 1 + Element.C, 1 + Element.C, 0],
  ],
];
