/**
 * Created by Berkay GÜNGÖR 2.8.2018
 * This class is used for jest testing 
 */
const path = require('path');

module.exports = {
    process(src, filename, config, options) {
        return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
    },
};
