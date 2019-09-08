const useBoard = (fen) => {
  const board = new Array(128)
  const position = fen.split(/\s+/)[0]
  let square = 0
  for (var char of position.split('')) {
    if (char === '/') {
      square += 8
    } else if ('0123456789'.indexOf(char) !== -1) {
      square += parseInt(char, 10)
    } else {
      board[square] = { color: char < 'a' ? 'w' : 'b', type: char.toLowerCase() }
      square++
    }
  }
  return board
}

export default useBoard
