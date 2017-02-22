const csv = require('fast-csv');

const defaultFormat = (data) => data;

module.exports = (file, format = defaultFormat) => {
    return new Promise((resolve, reject) => {
        const set = [];

        csv
            .fromPath(file)
            .transform(format)
            .on("data", (data) => set.push(data))
            .on('error', reject)
            .on('end', () => resolve(set));
    });
};
