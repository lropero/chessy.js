# chessy.js &middot; [![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
*Chess tools for the brain.*

### Installation
```sh
$ npm install chessy --save
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
```js
const fen = 'rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 0 1'
const attacks = chessy.getAttacks(fen)
console.log(attacks)
/*
{
  black: [
    ['f6', 'e4']
  ],
  white: [
    ['c4', 'a6'],
    ['c4', 'f7']
  ]
}
*/
```
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-attacks-white.png" width="300">&nbsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-attacks-black.png" width="300">

##### getDefenses(fen: String)
```js
const fen = 'rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 0 1'
const defenses = chessy.getDefenses(fen)
console.log(defenses)
/*
{
  black: [
    ['a8', 'b8'],
    ['a8', 'a6'],
    ['b8', 'a6'],
    ['c8', 'b7'],
    ['d8', 'e8'],
    ['d8', 'e7'],
    ['d8', 'd6'],
    ['d8', 'c8'],
    ['e8', 'f8'],
    ['e8', 'f7'],
    ['e8', 'e7'],
    ['e8', 'd8'],
    ['f8', 'g7'],
    ['f8', 'e7'],
    ['h8', 'h7'],
    ['h8', 'f8'],
    ['b7', 'a6'],
    ['e7', 'f6'],
    ['e7', 'd6'],
    ['g7', 'f6'],
    ['f6', 'e8'],
    ['f6', 'h7']
  ],
  white: [
    ['c4', 'a2'],
    ['d4', 'c2'],
    ['c3', 'e4'],
    ['c3', 'd1'],
    ['c3', 'a2'],
    ['b2', 'c3'],
    ['a1', 'a2'],
    ['a1', 'c1'],
    ['c1', 'b2'],
    ['d1', 'c2'],
    ['d1', 'd4'],
    ['d1', 'e1'],
    ['d1', 'c1'],
    ['e1', 'f2'],
    ['e1', 'd1'],
    ['h1', 'h2'],
    ['h1', 'e1']
  ]
}
*/
```
<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-defenses-white.png" width="300">&nbsp;<img src="https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-defenses-black.png" width="300">
