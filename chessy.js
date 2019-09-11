/**
 * Copyright (c) 2019, Luciano Ropero <lropero@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

const OFFSETS = {
  b: [-17, -15, 17, 15],
  k: [-17, -16, -15, 1, 17, 16, 15, -1],
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  p: {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15]
  },
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  r: [-16, 1, 16, -1]
}

/* eslint-disable */
const SQUARES = {
  a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
  a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
  a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
  a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
  a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
  a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
  a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
  a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
}
/* eslint-enable */

const fenToBoard = (fen) => {
  const board = new Array(128)
  const split = fen.split(/\s+/)
  const ep = split[3] !== '-' && SQUARES[split[3]]
  const position = split[0]
  const turn = split[1]
  let square = 0
  for (const char of position.split('')) {
    if (char === '/') {
      square += 8
    } else if ('0123456789'.indexOf(char) !== -1) {
      square += parseInt(char, 10)
    } else {
      board[square] = { color: char >= 'a' ? 'b' : 'w', type: char.toLowerCase() }
      square++
    }
  }
  return [board, { ep, turn }]
}

const getAttacks = (fen, swap) => {
  const attacks = { black: {}, white: {} }
  const [board, { ep, turn }] = fenToBoard(fen)
  const sights = getSights(fen, board)
  for (const color of ['black', 'white']) {
    const color2 = (swap && (color === 'black' ? 'white' : 'black')) || color
    attacks[color] = Object.keys(sights[color2]).reduce((attacksColor, fromAlgebraic) => {
      for (const toAlgebraic of sights[color2][fromAlgebraic]) {
        const enPassant = ep && board[SQUARES[fromAlgebraic]].color === turn && board[SQUARES[fromAlgebraic]].type === 'p' && SQUARES[toAlgebraic] === ep
        const piece = board[SQUARES[toAlgebraic]] && board[SQUARES[toAlgebraic]].color !== (color2).charAt(0)
        if ((enPassant) || (piece)) {
          if (!attacksColor[fromAlgebraic]) {
            attacksColor[fromAlgebraic] = []
          }
          attacksColor[fromAlgebraic].push(toAlgebraic)
        }
      }
      return attacksColor
    }, {})
  }
  return attacks
}

const getDefenses = (fen) => {
  const defenses = { black: {}, white: {} }
  const board = fenToBoard(fen)[0]
  const sights = getSights(fen, board)
  for (const color of ['black', 'white']) {
    defenses[color] = Object.keys(sights[color]).reduce((defensesColor, fromAlgebraic) => {
      for (const toAlgebraic of sights[color][fromAlgebraic]) {
        if (board[SQUARES[toAlgebraic]] && board[SQUARES[toAlgebraic]].color === color.charAt(0)) {
          if (!defensesColor[fromAlgebraic]) {
            defensesColor[fromAlgebraic] = []
          }
          defensesColor[fromAlgebraic].push(toAlgebraic)
        }
      }
      return defensesColor
    }, {})
  }
  return defenses
}

const getSights = (fen, board) => {
  const temp = { black: {}, white: {} }
  board = board || fenToBoard(fen)[0]
  for (const [from, piece] of board.entries()) {
    if (piece) {
      const color = piece.color === 'b' ? 'black' : 'white'
      const fromAlgebraic = squareToAlgebraic(from)
      if (piece.type === 'p') {
        for (let i = 2; i < 4; i++) {
          const to = from + OFFSETS.p[piece.color][i]
          if (to & 0x88) continue
          if (!temp[color][fromAlgebraic]) {
            temp[color][fromAlgebraic] = []
          }
          temp[color][fromAlgebraic].push(squareToAlgebraic(to))
        }
      } else {
        for (let i = 0; i < OFFSETS[piece.type].length; i++) {
          let to = from
          while (true) {
            to += OFFSETS[piece.type][i]
            if (to & 0x88) break
            if (!temp[color][fromAlgebraic]) {
              temp[color][fromAlgebraic] = []
            }
            temp[color][fromAlgebraic].push(squareToAlgebraic(to))
            if (board[to] || piece.type === 'k' || piece.type === 'n') break
          }
        }
      }
    }
  }
  const sights = { black: {}, white: {} }
  for (const color of ['black', 'white']) {
    for (const fromAlgebraic of Object.keys(temp[color]).sort()) {
      sights[color][fromAlgebraic] = temp[color][fromAlgebraic].sort()
    }
  }
  return sights
}

const getThreats = (fen) => {
  return getAttacks(fen, true)
}

const squareToAlgebraic = (square) => {
  const file = square & 15
  const rank = square >> 4
  return 'abcdefgh'.substring(file, file + 1) + '87654321'.substring(rank, rank + 1)
}

exports.getAttacks = getAttacks
exports.getDefenses = getDefenses
exports.getSights = getSights
exports.getThreats = getThreats

module.exports = { getAttacks, getDefenses, getSights, getThreats }
