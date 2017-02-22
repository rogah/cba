const descriptionParser = require('./description-parser');
const { week, date } = require('./helpers');

module.exports = (accountType) => {
    return data => {
        const [ effectiveDate, amount, description, balance ] = data;
        const { getValueDate, getDescription } = descriptionParser(description);

        return [
            week(effectiveDate),
            date(effectiveDate),
            getValueDate(),
            amount,
            accountType,
            '',
            getDescription(),
            balance
        ];
    };
};
