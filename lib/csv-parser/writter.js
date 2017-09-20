const csv = require('fast-csv');

const { getTempFile } = require('../config');

const quoteColumns = [ 
    true,   // week number
    false,  // effective date
    false,  // value date
    false,  // amount
    true,   // account type
    true,   // category
    true,   // description
    false   // account balance
];

const writeCsv = (file, data) => {
    return new Promise((resolve, reject) => {
        csv.writeToPath(file, data, { quoteColumns: quoteColumns })
            .on('error', error => reject(error))
            .on('finish', () => resolve(data));
    });
};

const writeTempFile = data => {
    return writeCsv(getTempFile(), data);
};

const writeOutputFile = outputFile => {
    return (data) => {
        if (!outputFile) {
            return Promise.resolve(data);
        }
        return writeCsv(outputFile, data);
    };
};

module.exports = {
    writeTempFile,
    writeOutputFile,
};
