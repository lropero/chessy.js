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
// {
//   black: [['f6', 'e4']],
//   white: [['c4', 'a6'], ['c4', 'f7']]
// }
```
![chessy-attacks-white](https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-attacks-white.png =300x300)
![chessy-attacks-black](https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-attacks-black.png =300x300)
