const si = require('react-icons/si');
const keys = Object.keys(si);
const matches = keys.filter(k => k.toLowerCase().includes('visual') || k.toLowerCase().includes('vscode') || k.toLowerCase().includes('code'));
console.log(matches);
