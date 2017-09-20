const os = require('os');
const path = require('path');
const fs = require('fs');

const nconf = require('nconf');

const configDir = path.join(os.homedir(), '.cba');
const configFile = path.join(configDir, 'config.json');

const defaultTempFile = path.join(configDir, 'tmp.csv');

const defaults = {
    temp: {
        file: defaultTempFile
    }
};

nconf.argv()
    .env()
    .file({ file: configFile })
    .defaults(defaults);

const save = () => {
    nconf.save(error => {
        if (error) console.error(error);
    });
};

if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
}

if (!fs.existsSync(configFile)) {
    save();
}

module.exports = {
    getTempFile: () => nconf.get('temp:file')
};
