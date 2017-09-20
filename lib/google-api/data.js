const { getCredentials } = require('./credentials');
const { createClient } = require('./client');
const { append } = require('./sheets');

const {
    authorize,
} = require('./authorization');

const push = (data) => {
    return getCredentials()
        .then(createClient)
        .then(authorize)
        .then(append(data));
};

module.exports = {
    push,
};
