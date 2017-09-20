const fs = require('fs');
const readline = require('readline');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const TOKEN_DIR = `${(process.env.HOME)}/.credentials/`;
const TOKEN_PATH = `${TOKEN_DIR}sheets.googleapis.com-jars.json`;

const getAuthorizationCode = ({ oauth2Client }) => {
    return new Promise((resolve, reject) => {
        try {
            const authorizeUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES
            });

            console.log('Authorize this app by visiting this url: ', authorizeUrl);
            var readlineInterface = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            readlineInterface.question('Enter the code from that page here: ', (code) => {
                readlineInterface.close();
                resolve({ oauth2Client, code });
            });
        } catch(err) {
            reject(err);
        } 
    });
};

const generateToken = ({ oauth2Client, code }) => {
    return new Promise((resolve, reject) => {
        oauth2Client.getToken(code, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve({ oauth2Client, token });
            }
        });
    });
};

const createTokenDirectory = ({ oauth2Client, token }) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(TOKEN_DIR, (err) => {
            if (err && err.code !== 'EEXIST') {
                reject(err);
            } else {
                resolve({ oauth2Client, token });
            }
        });
    });
};

const storeToken = ({ oauth2Client, token }) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({ oauth2Client, token });
            }
        });
    });
};

const authorize = ({ oauth2Client }) => {
    return new Promise((resolve, reject) => {
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) {
                reject(err);
            } else {
                oauth2Client.credentials = JSON.parse(token);
                resolve({ oauth2Client });
            }
        });
    });
};

module.exports = {
    getAuthorizationCode,
    generateToken,
    createTokenDirectory,
    storeToken,
    authorize,
};
