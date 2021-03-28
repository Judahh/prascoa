import { Element } from './element';
export const levels = [
  // [
  //   [0, 1 + Element.CharRight, 1],
  //   [1 + Element.CharDown, 1, 1 + Element.CharLeft],
  //   [1, 1 + Element.CharUp, 0],
  // ],
  // [
  //   //! 0 Just forward
  //   [0, 0, 0],
  //   [0, Element.BA + Element.CharRight, Element.BB + Element.C],
  //   [0, 0, 0],
  // ],
  // [
  //   //! 1
  //   [0, 0, 0],
  //   [
  //     Element.BA + Element.CharRight,
  //     Element.BB + Element.C,
  //     Element.BA + Element.C,
  //   ],
  //   [0, 0, 0],
  // ],
  // [
  //   //! 2 Add turns
  //   [0, 0, 0],
  //   [0, Element.BA + Element.CharUp, Element.BB + Element.C],
  //   [0, 0, 0],
  // ],
  // [
  //   //! 3
  //   [Element.BA + Element.CharDown, 0, 0],
  //   [Element.BB + Element.C, 0, 0],
  //   [Element.BA + Element.C, Element.BB + Element.C, Element.BB + Element.C],
  // ],
  // [
  //   //! 4 Add if e carrot
  //   [Element.BA + Element.CharRight, 0, 0],
  //   [0, Element.BA + Element.CharRight, Element.BB + Element.C],
  //   [0, 0, 0],
  // ],
  // [
  //   //! 5 Add block, not, and e or
  //   [Element.BA + Element.CharRight, 0, 0],
  //   [Element.BA + Element.CharRight, Element.BB, Element.BB + Element.C],
  //   [0, 0, 0],
  // ],
  // [
  //   //! 6 Add loop e number
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [
  //     Element.BA + Element.CharRight,
  //     Element.BB + Element.C,
  //     Element.BA + Element.C,
  //     Element.BA + Element.C,
  //   ],
  //   [0, 0, 0, 0],
  // ],
  [
    [
      Element.BA + Element.CharDown,
      Element.BB + Element.C,
      Element.BA + Element.C,
    ],
    [Element.BB + Element.C, 0, Element.BB + Element.C],
    [Element.BA + Element.C, Element.BB + Element.C, Element.BA + Element.C],
  ],
  [
    //! 7
    [
      Element.BA + Element.CharRight,
      Element.BB + Element.C,
      Element.BA + Element.C,
    ],
    [Element.BB + Element.C, 0, Element.BB + Element.C],
    [Element.BA + Element.C, Element.BB + Element.C, Element.BA + Element.C],
  ],
  [
    //! 8
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
    //! 9
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
    //! 10
    [0, 0, 1, 1, 1],
    [0, 0, 1, 0, 1],
    [0, 0, 1 + Element.C, 0, 1],
    [0, 0, 0, 0, 1],
    [1 + Element.CharRight, 1, 1, 1, 1],
  ],
  [
    //! 11
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
    //! 12
    [0, 1 + Element.C, 1 + Element.C, 1 + Element.C, 0],
    [1 + Element.C, 1, 1, 1, 1 + Element.C],
    [1 + Element.C, 1, 1 + Element.CharDown, 1, 1 + Element.C],
    [1 + Element.C, 1, 1, 1, 1 + Element.C],
    [0, 1 + Element.C, 1 + Element.C, 1 + Element.C, 0],
  ],
];
