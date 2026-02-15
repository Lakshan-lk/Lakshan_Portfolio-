try {
    const vsc = require('react-icons/vsc');
    console.log('VSC Check:', 'VscVscode' in vsc ? 'Found VscVscode' : 'Not Found');
} catch (e) { console.log('VSC Error', e.message); }

try {
    const tb = require('react-icons/tb');
    console.log('TB Check:', 'TbBrandVscode' in tb ? 'Found TbBrandVscode' : 'Not Found');
} catch (e) { console.log('TB Error', e.message); }

try {
    const si = require('react-icons/si');
    console.log('SI Check:', 'SiVisualstudiocode' in si ? 'Found' : 'Not Found');
} catch (e) { console.log('SI Error', e.message); }
