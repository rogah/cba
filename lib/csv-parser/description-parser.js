const { date, string } = require('./helpers');

const VALUE_DATE_EXPRESSION = /^(.*)( Value Date: )(\d{2}\/\d{2}\/\d{4})$/;

module.exports = (description) => {
    const matches = description.match(VALUE_DATE_EXPRESSION);

    if (matches) {
      this.description = matches[1];
      this.valueDate = matches[3];
    } else {
      this.description = description;
    }

    return {
      getDescription: () => this.description,
      getValueDate: (defaultDate) => this.valueDate || defaultDate
    };
};
