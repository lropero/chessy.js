# chessy.js &middot; [![npm version](https://badge.fury.io/js/chessy.svg)](https://www.npmjs.com/package/chessy)&nbsp;[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
*A pawn and a king.*

<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy.gif?raw=true" width="400">

### Installation
```sh
$ yarn add chessy
```

### Usage
Import default object..
```js
const chessy = require('chessy')
```

..or use named imports
```js
const { getAttacking, getDefending, getDefenses, getInfo, getObscured, getSights, getThreats } = require('chessy')
```

### API
#### getAttacking(fen: String)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-attacking-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-attacking-black.png?raw=true" width="300">
```js
const fen = 'rnb1kbnr/pp2pppp/1q1p4/8/Q3P3/5N2/PPP2PPP/RNB1KB1R b KQkq - 2 5'
const attacking = getAttacking(fen)
console.log(attacking)
/*
{
  black: {
    b6: ['b2', 'f2']
  },
  white: {
    a4: ['a7', 'e8']
  }
}
*/
```

#### getDefending(fen: String)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-defending-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-defending-black.png?raw=true" width="300">
```js
const fen = 'rnb1kbnr/pp2pppp/1q1p4/8/Q3P3/5N2/PPP2PPP/RNB1KB1R b KQkq - 2 5'
const defending = getDefending(fen)
console.log(defending)
/*
{
  black: {
    a7: ['b6'],
    a8: ['a7', 'b8'],
    b6: ['a7', 'b7', 'd6'],
    c8: ['b7'],
    e7: ['d6'],
    e8: ['e7', 'f7', 'f8'],
    f8: ['e7', 'g7'],
    g8: ['e7'],
    h8: ['g8', 'h7']
  },
  white: {
    a1: ['a2', 'b1'],
    a4: ['a2', 'c2', 'e4'],
    c1: ['b2'],
    e1: ['f1', 'f2'],
    f1: ['g2'],
    f3: ['e1', 'h2'],
    g2: ['f3'],
    h1: ['f1', 'h2']
  }
}
*/
```

#### getDefenses(fen: String)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-defenses-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-defenses-black.png?raw=true" width="300">
```js
const fen = 'rnb1kbnr/pp2pppp/1q1p4/8/Q3P3/5N2/PPP2PPP/RNB1KB1R b KQkq - 2 5'
const defenses = getDefenses(fen)
console.log(defenses)
/*
{
  black: {
    b6: ['a7'],
    a7: ['a8', 'b6'],
    b8: ['a8'],
    b7: ['b6', 'c8'],
    d6: ['b6', 'e7'],
    e7: ['e8', 'f8', 'g8'],
    f7: ['e8'],
    f8: ['e8'],
    g7: ['f8'],
    g8: ['h8'],
    h7: ['h8']
  },
  white: {
    a2: ['a1', 'a4'],
    b1: ['a1'],
    c2: ['a4'],
    e4: ['a4'],
    b2: ['c1'],
    f1: ['e1', 'h1'],
    f2: ['e1'],
    g2: ['f1'],
    e1: ['f3'],
    h2: ['f3', 'h1'],
    f3: ['g2']
  }
}
*/
```

#### getInfo(fen: String, algebraics: Array)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-info-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-info-black.png?raw=true" width="300">
```js
const fen = 'rnb1kbnr/pp2pppp/1q1p4/8/Q3P3/5N2/PPP2PPP/RNB1KB1R b KQkq - 2 5'
const info = getInfo(fen, ['a4', 'b6', 'f2'])
console.log(info)
/*
{
  a4: {
    attacking: ['a7', 'e8'],
    defending: ['a2', 'c2', 'e4'],
    defenses: null,
    piece: { color: 'white', type: 'queen' },
    sights: ['a2', 'a3', 'a5', 'a6', 'a7', 'b3', 'b4', 'b5', 'c2', 'c4', 'c6', 'd4', 'd7', 'e4', 'e8'],
    threats: null
  },
  b6: {
    attacking: ['b2', 'f2'],
    defending: ['a7', 'b7', 'd6'],
    defenses: ['a7'],
    piece: { color: 'black', type: 'queen' },
    sights: ['a5', 'a6', 'a7', 'b2', 'b3', 'b4', 'b5', 'b7', 'c5', 'c6', 'c7', 'd4', 'd6', 'd8', 'e3', 'f2'],
    threats: null
  },
  f2: {
    attacking: null,
    defending: null,
    defenses: ['e1'],
    piece: { color: 'white', type: 'pawn' },
    sights: ['e3', 'g3'],
    threats: ['b6']
  }
}
*/
```

#### getObscured(fen: String)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-obscured-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-obscured-black.png?raw=true" width="300">
```js
const fen = 'rnb1kbnr/pp2pppp/1q1p4/8/Q3P3/5N2/PPP2PPP/RNB1KB1R b KQkq - 2 5'
const obscured = getObscured(fen)
console.log(obscured)
/*
{
  black: ['a1', 'a2', 'a3', 'a4', 'b1', 'c1', 'c2', 'c3', 'c4', 'd1', 'd2', 'd3', 'd5', 'e1', 'e2', 'e4', 'f1', 'f3', 'f4', 'g1', 'g2', 'g3', 'g5', 'h1', 'h2', 'h4', 'h5'],
  white: ['a8', 'b6', 'b7', 'b8', 'c5', 'c7', 'c8', 'd6', 'd8', 'e6', 'e7', 'f6', 'f7', 'f8', 'g4', 'g6', 'g7', 'g8', 'h5', 'h7', 'h8']
}
*/
```

#### getSights(fen: String)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-sights-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-sights-black.png?raw=true" width="300">
```js
const fen = 'rnb1kbnr/pp2pppp/1q1p4/8/Q3P3/5N2/PPP2PPP/RNB1KB1R b KQkq - 2 5'
const sights = getSights(fen)
console.log(sights)
/*
{
  black: {
    a7: ['b6'],
    a8: ['a7', 'b8'],
    b6: ['a5', 'a6', 'a7', 'b2', 'b3', 'b4', 'b5', 'b7', 'c5', 'c6', 'c7', 'd4', 'd6', 'd8', 'e3', 'f2'],
    b7: ['a6', 'c6'],
    b8: ['a6', 'c6', 'd7'],
    c8: ['b7', 'd7', 'e6', 'f5', 'g4', 'h3'],
    d6: ['c5', 'e5'],
    e7: ['d6', 'f6'],
    e8: ['d7', 'd8', 'e7', 'f7', 'f8'],
    f7: ['e6', 'g6'],
    f8: ['e7', 'g7'],
    g7: ['f6', 'h6'],
    g8: ['e7', 'f6', 'h6'],
    h7: ['g6'],
    h8: ['g8', 'h7']
  },
  white: {
    a1: ['a2', 'b1'],
    a2: ['b3'],
    a4: ['a2', 'a3', 'a5', 'a6', 'a7', 'b3', 'b4', 'b5', 'c2', 'c4', 'c6', 'd4', 'd7', 'e4', 'e8'],
    b1: ['a3', 'c3', 'd2'],
    b2: ['a3', 'c3'],
    c1: ['b2', 'd2', 'e3', 'f4', 'g5', 'h6'],
    c2: ['b3', 'd3'],
    e1: ['d1', 'd2', 'e2', 'f1', 'f2'],
    e4: ['d5', 'f5'],
    f1: ['a6', 'b5', 'c4', 'd3', 'e2', 'g2'],
    f2: ['e3', 'g3'],
    f3: ['d2', 'd4', 'e1', 'e5', 'g1', 'g5', 'h2', 'h4'],
    g2: ['f3', 'h3'],
    h1: ['f1', 'g1', 'h2'],
    h2: ['g3']
  }
}
*/
```

#### getThreats(fen: String)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-threats-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-threats-black.png?raw=true" width="300">
```js
const fen = 'rnb1kbnr/pp2pppp/1q1p4/8/Q3P3/5N2/PPP2PPP/RNB1KB1R b KQkq - 2 5'
const threats = getThreats(fen)
console.log(threats)
/*
{
  black: {
    a7: ['a4'],
    e8: ['a4']
  },
  white: {
    b2: ['b6'],
    f2: ['b6']
  }
}
*/
```
