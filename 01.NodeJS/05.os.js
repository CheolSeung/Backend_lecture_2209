const os = require('os');

const cpus = os.cpus();
console.log(cpus.length);

console.log(Math.round(os.totalmem()/Math.pow(2,30), 4)+'GB', os.freemem());

console.log(os.networkInterfaces());