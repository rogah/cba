#!/usr/bin/env node

const program = require('commander');

const packageJson = require('./package.json');

const { parseCsv } = require('./lib/csv-parser');

// const reader = require('./lib/reader');
// const writter = require('./lib/writter');
// const formatter = require('./lib/formatter');

// const { parse } = require('./lib/account-type');

program
  .version(packageJson.version);

program
  .command('transaction <output> <files...>')
  .alias('trans')
  .description('parse transactions')
  .option("-t, --type <type>", "set current accout type", /^(current|saving)$/i, 'current')
  .action(parseCsv);
  // .action((output, files, options) => {
  //   const accountType = parse(options.type);
  //   const format = formatter(accountType);

  //   const readers = files.map(file => reader(file, format));
  //   const concat = dataSet => dataSet.reduce((set, data) => set.concat(data), []);

  //   const logStats = (data) => {
  //     console.log(`Records: ${data.length}`);
  //     return data;
  //   }

  //   Promise.all(readers)
  //     .then(concat)
  //     .then(logStats)
  //     .then(writter(output))
  //     .catch(console.error);
  // });

// program
//   .command('drive')
//   .description('authenticate and push data to google driver')
//   .option("-a, --authenticate", "authenticate to google driver")
//   .option("-p, --push", "authenticate to google driver")
//   .action((options) => {
//     console.log('feito!', options.authenticate);
//   });

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

/*
const { push, authenticate } = require('./lib/google-api');

push([
    ['2017-99', '1/1/2017','13/1/2017','-10.34','Saving','','Blablabla', '+9999.99'],
    ['2017-99', '1/2/2017','13/2/2017','-20.34','Current','','Blablabla', '+8888.88'],
  ])
  .then((oauth2Client) => {
      console.log(oauth2Client);
  })
  .catch((err) => {
    console.error(err);
  });
*/

/*
authenticate()
  .then((tokenPath) => {
      console.log(tokenPath);
  })
  .catch((err) => {
    console.error(err);
  });
*/