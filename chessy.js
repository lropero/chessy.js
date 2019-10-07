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

const COLORS = ['black', 'white']

const OFFSETS = {
  bishop: [-17, -15, 17, 15],
  king: [-17, -16, -15, 1, 17, 16, 15, -1],
  knight: [-18, -33, -31, -14, 18, 33, 31, 14],
  pawn: {
    black: [16, 32, 17, 15],
    white: [-16, -32, -17, -15]
  },
  queen: [-17, -16, -15, 1, 17, 16, 15, -1],
  rook: [-16, 1, 16, -1]
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
  if (typeof fen === 'string' && /^[1-8BKNQRbknqr]+\/([1-8BKNPQRbknpqr]+\/){6}[1-8BKNQRbknqr]+(\s[bw]\s(-|K?Q?k?q?)\s(-|[a-h][36])\s\d+\s\d+)?$/.test(fen)) {
    const [position, turn = null,, ep = null] = fen.split(' ')
    const board = new Array(128)
    const charToType = (char) => {
      switch (char) {
        case 'b': return 'bishop'
        case 'k': return 'king'
        case 'n': return 'knight'
        case 'p': return 'pawn'
        case 'q': return 'queen'
        case 'r': return 'rook'
      }
    }
    let square = 0
    for (const char of position.split('')) {
      if (char === '/') {
        square += 8
      } else if ('0123456789'.indexOf(char) !== -1) {
        square += parseInt(char, 10)
      } else {
        board[square++] = { color: char >= 'a' ? 'black' : 'white', type: charToType(char.toLowerCase()) }
      }
    }
    return { board, ep: ep && ep !== '-' && SQUARES[ep], turn }
  }
  return { board: [], ep: null, turn: null }
}

const getAttacking = (fen, extra = {}) => {
  const attacking = COLORS.reduce((attacking, color) => {
    attacking[color] = {}
    return attacking
  }, {})
  const { board, ep, turn } = (Object.keys(extra).length === 3 && extra) || fenToBoard(fen)
  if (board.length) {
    const sights = getSights(fen, { board })
    for (const [index, color] of COLORS.entries()) {
      attacking[(extra.threats && COLORS[1 - index]) || color] = Object.keys(sights[color]).reduce((attackingColor, fromAlgebraic) => {
        for (const toAlgebraic of sights[color][fromAlgebraic]) {
          const enPassant = ep === SQUARES[toAlgebraic] && turn === board[SQUARES[fromAlgebraic]].color.charAt(0) && board[SQUARES[fromAlgebraic]].type === 'pawn'
          const piece = board[SQUARES[toAlgebraic]] && board[SQUARES[toAlgebraic]].color !== color
          const illegalKingMove = piece && board[SQUARES[fromAlgebraic]].type === 'king' && Object.values(sights[board[SQUARES[toAlgebraic]].color]).reduce((defended, defenses) => [...defended, ...defenses], []).includes(toAlgebraic)
          if ((enPassant || piece) && !illegalKingMove) {
            if (!attackingColor[extra.threats ? toAlgebraic : fromAlgebraic]) {
              attackingColor[extra.threats ? toAlgebraic : fromAlgebraic] = []
            }
            attackingColor[extra.threats ? toAlgebraic : fromAlgebraic].push(extra.threats ? fromAlgebraic : toAlgebraic)
          }
        }
        return attackingColor
      }, {})
    }
  }
  return attacking
}

const getDefending = (fen, extra = {}) => {
  const defending = COLORS.reduce((defending, color) => {
    defending[color] = {}
    return defending
  }, {})
  const { board } = (Object.keys(extra).includes('board') && extra) || fenToBoard(fen)
  if (board.length) {
    const sights = getSights(fen, { board })
    for (const color of COLORS) {
      defending[color] = Object.keys(sights[color]).reduce((defendingColor, fromAlgebraic) => {
        for (const toAlgebraic of sights[color][fromAlgebraic]) {
          if (board[SQUARES[toAlgebraic]] && board[SQUARES[toAlgebraic]].color === color) {
            if (!defendingColor[extra.swap ? toAlgebraic : fromAlgebraic]) {
              defendingColor[extra.swap ? toAlgebraic : fromAlgebraic] = []
            }
            defendingColor[extra.swap ? toAlgebraic : fromAlgebraic].push(extra.swap ? fromAlgebraic : toAlgebraic)
          }
        }
        return defendingColor
      }, {})
    }
  }
  return defending
}

const getDefenses = (fen, extra = {}) => {
  return getDefending(fen, Object.assign({}, extra, { swap: true }))
}

const getInfo = (fen, algebraics) => {
  if (Array.isArray(algebraics)) {
    const { board, ep, turn } = fenToBoard(fen)
    if (board.length) {
      const attacking = getAttacking(fen, { board, ep, turn })
      const defending = getDefending(fen, { board, ep, turn })
      const defenses = getDefenses(fen, { board, ep, turn })
      const sights = getSights(fen, { board, ep, turn })
      const threats = getThreats(fen, { board, ep, turn })
      return algebraics.sort().reduce((info, algebraic) => {
        const piece = board[SQUARES[algebraic]]
        if (piece) {
          info[algebraic] = {
            attacking: Object.assign({}, ...Object.values(attacking))[algebraic] || null,
            defending: Object.assign({}, ...Object.values(defending))[algebraic] || null,
            defenses: Object.assign({}, ...Object.values(defenses))[algebraic] || null,
            piece,
            sights: Object.assign({}, ...Object.values(sights))[algebraic] || null,
            threats: Object.assign({}, ...Object.values(threats))[algebraic] || null
          }
        }
        return info
      }, {})
    }
  }
  return {}
}

const getObscured = (fen) => {
  const obscured = COLORS.reduce((obscured, color) => {
    obscured[color] = []
    return obscured
  }, {})
  const { board } = fenToBoard(fen)
  if (board.length) {
    const sights = getSights(fen)
    const squares = Object.keys(SQUARES).sort()
    for (const color of COLORS) {
      obscured[color] = squares.filter((algebraic) => ![].concat(...Object.keys(sights[color])).concat(...Object.values(sights[color])).includes(algebraic))
    }
  }
  return obscured
}

const getSights = (fen, extra = {}) => {
  const temp = COLORS.reduce((temp, color) => {
    temp[color] = {}
    return temp
  }, {})
  const { board } = (Object.keys(extra).includes('board') && extra) || fenToBoard(fen)
  if (board.length) {
    for (const [from, piece] of board.entries()) {
      if (piece) {
        const fromAlgebraic = squareToAlgebraic(from)
        if (piece.type === 'pawn') {
          for (let i = 2; i < 4; i++) {
            const to = from + OFFSETS.pawn[piece.color][i]
            if (to & 0x88) continue
            if (!temp[piece.color][fromAlgebraic]) {
              temp[piece.color][fromAlgebraic] = []
            }
            temp[piece.color][fromAlgebraic].push(squareToAlgebraic(to))
          }
        } else {
          for (let i = 0; i < OFFSETS[piece.type].length; i++) {
            let to = from
            while (true) {
              to += OFFSETS[piece.type][i]
              if (to & 0x88) break
              if (!temp[piece.color][fromAlgebraic]) {
                temp[piece.color][fromAlgebraic] = []
              }
              temp[piece.color][fromAlgebraic].push(squareToAlgebraic(to))
              if (board[to] || piece.type === 'king' || piece.type === 'knight') break
            }
          }
        }
      }
    }
  }
  const sights = COLORS.reduce((sights, color) => {
    sights[color] = {}
    return sights
  }, {})
  for (const color of COLORS) {
    for (const fromAlgebraic of Object.keys(temp[color]).sort()) {
      sights[color][fromAlgebraic] = temp[color][fromAlgebraic].sort()
    }
  }
  return sights
}

const getThreats = (fen, extra = {}) => {
  return getAttacking(fen, Object.assign({}, extra, { threats: true }))
}

const squareToAlgebraic = (square) => {
  const file = square & 15
  const rank = square >> 4
  return 'abcdefgh'.substring(file, file + 1) + '87654321'.substring(rank, rank + 1)
}

exports.getAttacking = getAttacking
exports.getDefending = getDefending
exports.getDefenses = getDefenses
exports.getInfo = getInfo
exports.getObscured = getObscured
exports.getSights = getSights
exports.getThreats = getThreats

module.exports = { getAttacking, getDefending, getDefenses, getInfo, getObscured, getSights, getThreats }
