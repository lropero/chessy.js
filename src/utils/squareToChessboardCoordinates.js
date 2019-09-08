const squareToChessboardCoordinates = (square, orientation, width) => {
  const file = square & 15
  const rank = square >> 4
  const squareSize = width / 8
  const x = squareSize * ((orientation === 'black' ? 7 - file : file) + 1) - squareSize / 2
  const y = squareSize * ((orientation === 'black' ? 7 - rank : rank) + 1) - squareSize / 2
  return [x, y]
}

export default squareToChessboardCoordinates
