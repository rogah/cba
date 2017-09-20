const reader = require('./reader');
const { writeTempFile, writeOutputFile } = require('./writter');
const { accountTypeFormatter } = require('./formatter');
const { parseAccountType } = require('./account-type');

const logStats = data => {
    console.log(`Records: ${data.length}`);
    return data;
};

const concat = dataSet => dataSet.reduce((set, data) => set.concat(data), []);

const parseCsv = (file, otherFiles, options) => {
    const accountType = parseAccountType(options.type);
    const formatAccountType = accountTypeFormatter(accountType);

    const files = otherFiles.concat(file);
    const readers = files.map(file => reader(file, formatAccountType));

    Promise.all(readers)
        .then(concat)
        .then(logStats)
        .then(writeTempFile)
        .then(writeOutputFile(options.output))
        .catch(console.error);
};

const getTempData = () => {
    // return promisse with temp data from tempFile
};

module.exports = {
    parseCsv,
};
