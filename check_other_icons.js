try {
    const vsc = require('react-icons/vsc');
    console.log('VSC:', Object.keys(vsc).filter(k => k.toLowerCase().includes('code') || k.toLowerCase().includes('visual')));
} catch (e) { console.log('No vsc'); }

try {
    const di = require('react-icons/di');
    console.log('DI:', Object.keys(di).filter(k => k.toLowerCase().includes('visual')));
} catch (e) { console.log('No di'); }
