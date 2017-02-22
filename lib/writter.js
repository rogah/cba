const csv = require('fast-csv');

module.exports = (file) => {
    return (data) => {
        return new Promise((resolve, reject) => {
            csv
                .writeToPath(file, data)
                .on('error', reject)
                .on('finish', resolve);
        });
    };
};
