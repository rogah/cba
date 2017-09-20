const moment = require('moment');

const DATE_FORMAT = 'DD-MM-YYYY';

function week(value) {
  return `'${moment(value, DATE_FORMAT).format('YYYY-ww')}`;
}

function date(value) {
  return moment(value, DATE_FORMAT).format('DD-MM-YYYY');
}

function string(value) {
  return value.trim();
}

function currency(value) {
  return value.replace(/\+/g, '');
}

module.exports = {
    week,
    date,
    string,
    currency
};