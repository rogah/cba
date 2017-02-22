const { date, string } = require('./helpers');

const VALUE_DATE_EXPRESSION = /^(.*)( Value Date: )(\d{2}\/\d{2}\/\d{4})$/;

// class DescriptionParser {
//   constructor(description) {
//     const matches = description.match(VALUE_DATE_EXPRESSION);
//     if (matches) {
//       this.description = string(matches[1]);
//       this.valueDate = date(matches[3]);
//     } else {
//       this.description = description;
//     }
//   }

//   getDescription() {
//     return this.description;
//   }

//   getValueDate() {
//     return this.valueDate;
//   }
// }

module.exports = (description) => {
    const matches = description.match(VALUE_DATE_EXPRESSION);

    if (matches) {
      this.description = string(matches[1]);
      this.valueDate = date(matches[3]);
    } else {
      this.description = description;
    }

    return {
      getDescription: () => this.description,
      getValueDate: () => this.valueDate
    };
};
