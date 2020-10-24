const hljs = require('highlight.js');
const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '../src/js/mediaCheck-demo.js')).toString();
const highlightedCode = hljs.highlight('javascript', code).value;

console.log(highlightedCode);
