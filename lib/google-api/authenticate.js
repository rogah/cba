const { getCredentials } = require('./credentials');
const { createClient } = require('./client');

const {
    getAuthorizationCode,
    generateToken,
    createTokenDirectory,
    storeToken,
} = require('./authorization');

const authenticate = () => {
    return getCredentials()
        .then(createClient)
        .then(getAuthorizationCode)
        .then(generateToken)
        .then(createTokenDirectory)
        .then(storeToken);
};

module.exports = {
    authenticate,
};
