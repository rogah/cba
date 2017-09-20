const fs = require('fs');

const DEFAULT_CLIENT_SECRETS = `${(process.env.HOME)}/jars_client_secret.json`;
const CLIENT_SECRETS = process.env.JARS_CLIENT_SECRETS || DEFAULT_CLIENT_SECRETS;

const CREDENTIALS_FILE = './api/client_secret_659258546186-tcmgsdng4hsmb4qdeht8jmej5b626d2d.apps.googleusercontent.com.json';

const getCredentials = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(CREDENTIALS_FILE, (err, content) => {
            if (err) {
                reject(err);
            } else {
                resolve({ credentials: JSON.parse(content) });
            }
        });
    });
};

module.exports = { 
    getCredentials
};
