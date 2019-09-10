# chessy.js &middot; [![npm version](https://badge.fury.io/js/chessy.svg)](https://www.npmjs.com/package/chessy)&nbsp;[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
*Chess tools for the brain.*

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
const { getAttacks, getDefenses, getSights, getThreats } = require('chessy')
```

### API
##### getAttacks(fen: String)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-attacks-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-attacks-black.png?raw=true" width="300">
```js
const fen = 'rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 0 1'
const attacks = getAttacks(fen)
console.log(attacks)
/*
{
  black: {
    f6: ['e4']
  },
  white: {
    c4: ['a6', 'f7']
  }
}
*/
```

##### getDefenses(fen: String)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-defenses-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-defenses-black.png?raw=true" width="300">
```js
const fen = 'rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 0 1'
const defenses = getDefenses(fen)
console.log(defenses)
/*
{
  black: {
    a8: ['a6', 'b8'],
    b7: ['a6'],
    b8: ['a6'],
    c8: ['b7'],
    d8: ['c8', 'd6', 'e7', 'e8'],
    e7: ['d6', 'f6'],
    e8: ['d8', 'e7', 'f7', 'f8'],
    f6: ['e8', 'h7'],
    f8: ['e7', 'g7'],
    g7: ['f6'],
    h8: ['f8', 'h7']
  },
  white: {
    a1: ['a2', 'c1'],
    b2: ['c3'],
    c1: ['b2'],
    c3: ['a2', 'd1', 'e4'],
    c4: ['a2'],
    d1: ['c1', 'c2', 'd4', 'e1'],
    d4: ['c2'],
    e1: ['d1', 'f2'],
    h1: ['e1', 'h2']
  }
}
*/
```

##### getSights(fen: String)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-sights-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-sights-black.png?raw=true" width="300">
```js
const fen = 'rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 0 1'
const sights = getSights(fen)
console.log(sights)
/*
{
  black: {
    a6: ['b5'],
    a8: ['a6', 'a7', 'b8'],
    b7: ['a6', 'c6'],
    b8: ['a6', 'c6', 'd7'],
    c8: ['b7', 'd7', 'e6', 'f5', 'g4', 'h3'],
    d6: ['c5', 'e5'],
    d8: ['a5', 'b6', 'c7', 'c8', 'd6', 'd7', 'e7', 'e8'],
    e7: ['d6', 'f6'],
    e8: ['d7', 'd8', 'e7', 'f7', 'f8'],
    f6: ['d5', 'd7', 'e4', 'e8', 'g4', 'g8', 'h5', 'h7'],
    f7: ['e6', 'g6'],
    f8: ['e7', 'g7'],
    g7: ['f6', 'h6'],
    h7: ['g6'],
    h8: ['f8', 'g8', 'h7']
  },
  white: {
    a1: ['a2', 'b1', 'c1'],
    a2: ['b3'],
    b2: ['a3', 'c3'],
    c1: ['b2', 'd2', 'e3', 'f4', 'g5', 'h6'],
    c2: ['b3', 'd3'],
    c3: ['a2', 'a4', 'b1', 'b5', 'd1', 'd5', 'e2', 'e4'],
    c4: ['a2', 'a6', 'b3', 'b5', 'd3', 'd5', 'e2', 'e6', 'f1', 'f7'],
    d1: ['c1', 'c2', 'd2', 'd3', 'd4', 'e1', 'e2', 'f3', 'g4', 'h5'],
    d4: ['b3', 'b5', 'c2', 'c6', 'e2', 'e6', 'f3', 'f5'],
    e1: ['d1', 'd2', 'e2', 'f1', 'f2'],
    e4: ['d5', 'f5'],
    f2: ['e3', 'g3'],
    g2: ['f3', 'h3'],
    h1: ['e1', 'f1', 'g1', 'h2'],
    h2: ['g3']
  }
}
*/
```

##### getThreats(fen: String)
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-threats-white.png?raw=true" width="300">&emsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-threats-black.png?raw=true" width="300">
```js
const fen = 'rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 0 1'
const threats = getThreats(fen)
console.log(threats)
/*
{
  black: {
    c4: ['a6', 'f7']
  },
  white: {
    f6: ['e4']
  }
}
*/
```
