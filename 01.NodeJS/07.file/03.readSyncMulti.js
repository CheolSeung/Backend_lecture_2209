// 동기적으로 파일을 읽는 것은 권장사항이 아님

const fs = require('fs');

let bufA = fs.readFileSync('tmp/a.txt', 'utf8');
let bufB = fs.readFileSync('tmp/b.txt', 'utf8');
let bufC = fs.readFileSync('tmp/c.txt', 'utf8');

console.log(bufA);
console.log(bufB);
console.log(bufC);