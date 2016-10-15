const process = require('process')
const prependFile = require('prepend-file')
const package = require('./package.json')
const targetFile = process.argv[process.argv.length - 1]
const isTargetFileMinned = targetFile.match(/\bmin\.js$/)

let fullBanner = `/*                    _ _        ____ _               _
   _ __ ___   ___  __| (_) __ _ / ___| |__   ___  ___| | __
  | '_ \` _ \\ / _ \\/ _\` | |/ _\` | |   | '_ \\ / _ \\/ __| |/ /
  | | | | | |  __/ (_| | | (_| | |___| | | |  __/ (__|   <
  |_| |_| |_|\\___|\\__,_|_|\\__,_|\\____|_| |_|\\___|\\___|_|\\_\\

  ${package.homepage}

  Version: ${package.version}, ${getTodaysDate()}
  Author: Rob Tarr (http://twitter.com/robtarr)
*/\n\n`

let minBanner = `/*
  ${package.name}
  ${package.homepage}

  Version: ${package.version}, ${getTodaysDate()}
  Author: Rob Tarr (http://twitter.com/robtarr)
*/\n\n`

prependFile(targetFile, isTargetFileMinned ? minBanner : fullBanner)

// Helper
function getTodaysDate () {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date();
  return `${pad(d.getMonth()+1)}-${pad(d.getDate())}-${d.getFullYear()}`
}
