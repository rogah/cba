const { authenticate } = require('./authenticate');
const { push } = require('./data');

// const SCOPES = [
//     'https://www.googleapis.com/auth/spreadsheets'
// ];

// const TOKEN_DIR = `${(process.env.HOME)}/.credentials/`;
// const TOKEN_PATH = `${TOKEN_DIR}sheets.googleapis.com-jars.json`;

// const DEFAULT_JAR_CLIENT_SECRETS = `${(process.env.HOME)}/jars_client_secret.json`;
// const CLIENT_SECRETS = process.env.JARS_CLIENT_SECRETS || DEFAULT_JAR_CLIENT_SECRETS;

/*
// cba push [options]
getCredentials()
    .then(createClient) // credentials
    .then(authorize) // oauth2Client
    .then(appendData)
    .then(onSuccess)
    .catch(onFailure);

// cba authorize [options]
getAuthorizationCode()
    .then(generateToken)
    .then(storeToken)
    .then(onSuccess)
    .catch(onFailure);
*/

const connect = (file, otherFiles, options) => {
    authenticate()
        .then(console.log)
        .catch(console.error);
};

const upload = (data) => {
    push(data)
        .then(console.log)
        .catch(console.error);
}

/*
// credentials.js
    export const getCredentials = ... // get credntials;

// client.js
    export const getClient = getCredentials()
        .then(createClient);

// authorization.js
    export const createToken = () => getClient()
        .then(getAuthorizationCode)
        .then(generateToken)
        .then(createTokenDirectory)
        .then(storeToken);

    const validateToken = ... // resolve with valid token (not expired) or rejects invalid token

    export const getToken = readToken()
        .then(validateToken)
        .then(returnToken, createToken);

    export const authorize = ... // assign valid token to client and returns client;

// authentication.js
    const authenticate = Promise.all([
        getClient,
        getToken,
    ]);

    export const connect = authenticate()
        .then(authorize);

// sheets.js
    ....
*/

module.exports = {
    connect,
    upload,
};
