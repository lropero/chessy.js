# chessy.js &middot; [![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
*Chess tools for the brain.*

### Installation
```sh
$ npm install chessy --save
```

### Usage
```js
const chessy = require('chessy')

const fen = 'rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 0 1'
const attacks = chessy.getAttacks(fen)
const defenses = chessy.getDefenses(fen)
const sights = chessy.getSights(fen)
const threats = chessy.getThreats(fen)
```

##### getAttacks(fen: String)
![chessy-attacks-white](https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-attacks-white.gif)
![chessy-attacks-black](https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-attacks-black.gif)

##### getDefenses(fen: String)
![chessy-defenses-white](https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-defenses-white.gif)
![chessy-defenses-black](https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-defenses-black.gif)

##### getSights(fen: String)
![chessy-sights-white](https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-sights-white.gif)
![chessy-sights-black](https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-sights-black.gif)

##### getThreats(fen: String)
![chessy-threats-white](https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-threats-white.gif)
![chessy-threats-black](https://github.com/lropero/lichessy/blob/master/thumbnails/chessy-threats-black.gif)
