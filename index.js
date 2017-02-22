#!/usr/bin/env node

const program = require('commander');

const packageJson = require('./package.json');

const reader = require('./lib/reader');
const writter = require('./lib/writter');
const formatter = require('./lib/formatter');

const { parse } = require('./lib/account-type');

program
  .version(packageJson.version);

program
  .command('transaction <output> <files...>')
  .alias('trans')
  .description('parse transactions')
  .option("-t, --type <type>", "set current accout type", /^(current|saving)$/i, 'current')
  .action((output, files, options) => {
    const accountType = parse(options.type);
    const format = formatter(accountType);

    const readers = files.map(file => reader(file, format));
    const concat = dataSet => dataSet.reduce((set, data) => set.concat(data), []);

    const logStats = (data) => {
      console.log(`Records: ${data.length}`);
      return data;
    }

    Promise.all(readers)
      .then(concat)
      .then(logStats)
      .then(writter(output))
      .catch(console.error);
  });

program.on('--help', () => {
  console.log('  Examples:');
  console.log();
  console.log('    $ cba transaction --type current ./path/to/output.csv ./path/to/file1.csv ./path/to/file2.csv');
  console.log('    $ cba transaction --type saving ./path/to/output.csv ./path/to/file.csv');
  console.log('    $ cba transaction --t current ./path/to/output.csv ./path/to/file.csv');
  console.log('    $ cba transaction ./path/to/output.csv ./path/to/file.csv');
  console.log('    $ cba trans ./path/to/output.csv ./path/to/file.csv');
  console.log();
});

program.parse(process.argv);
