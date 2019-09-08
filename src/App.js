import Chess from 'chess.js'
import Chessboard from 'chessboardjsx'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { debounceTime } from 'rxjs/operators'
import { fromEvent } from 'rxjs'

import { OFFSETS } from './constants'
import { linesToSvg, squareToChessboardCoordinates } from './utils'
import { useBoard } from './hooks'

const Chessy = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
`

const Main = styled.div`
  display: inline-flex;
  position: relative;
`

const App = () => {
  const [chess] = useState(new Chess())
  const [position, setPosition] = useState(chess.fen())
  const [width, setWidth] = useState(window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth)
  const board = useBoard(chess.fen())
  const lines = []
  const orientation = 'white'
  useEffect(() => {
    const interval = setInterval(() => {
      const moves = chess.moves()
      const move = moves[Math.floor(Math.random() * moves.length)]
      chess.move(move)
      setPosition(chess.fen())
      if (chess.game_over()) {
        clearInterval(interval)
      }
    }, 500)
    const resize = fromEvent(window, 'resize').pipe(debounceTime(10)).subscribe(({ target }) => setWidth(target.innerHeight < target.innerWidth ? target.innerHeight : target.innerWidth))
    return () => {
      clearInterval(interval)
      resize.unsubscribe()
    }
  }, [chess])
  for (var [from, piece] of board.entries()) {
    if (piece) {
      if (piece.type === 'p') {
        for (let j = 2; j < 4; j++) {
          const to = from + OFFSETS.p[piece.color][j]
          if (to & 0x88) continue
          if (board[to] && board[to].color === piece.color) {
            const [x1, y1] = squareToChessboardCoordinates(from, orientation, width)
            const [x2, y2] = squareToChessboardCoordinates(to, orientation, width)
            lines.push({ color: piece.color === 'b' ? 'blue' : 'green', x1, y1, x2, y2 })
          }
        }
      } else {
        for (let j = 0; j < OFFSETS[piece.type].length; j++) {
          let to = from
          while (true) {
            to += OFFSETS[piece.type][j]
            if (to & 0x88) break
            if (board[to]) {
              if (board[to].color === piece.color) {
                const [x1, y1] = squareToChessboardCoordinates(from, orientation, width)
                const [x2, y2] = squareToChessboardCoordinates(to, orientation, width)
                lines.push({ color: piece.color === 'b' ? 'blue' : 'green', x1, y1, x2, y2 })
              }
              break
            }
            if (piece.type === 'n' || piece.type === 'k') break
          }
        }
      }
    }
  }
  return (
    <Main>
      <Chessy>{linesToSvg(lines, width)}</Chessy>
      <Chessboard
        orientation={orientation}
        position={position}
        transitionDuration={0}
        width={width}
      />
    </Main>
  )
}

export default App
