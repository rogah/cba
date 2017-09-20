const descriptionParser = require('./description-parser');
const { week, date, string, currency } = require('./helpers');

const accountTypeFormatter = accountType => {
    return data => {
        const [ effectiveDate, amount, description, balance ] = data;
        const { getValueDate, getDescription } = descriptionParser(description);

        const valueDate = getValueDate(effectiveDate);

        return [
            week(effectiveDate),
            date(effectiveDate),
            date(valueDate),
            currency(amount),
            accountType,
            '',
            string(getDescription()),
            currency(balance)
        ];
    };
};

module.exports = {
    accountTypeFormatter,
};
