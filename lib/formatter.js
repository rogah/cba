const descriptionParser = require('./description-parser');
const { week, date } = require('./helpers');

module.exports = (accountType) => {
    return data => {
        const [ effectiveDate, amount, description, balance ] = data;
        const parser = descriptionParser(description);

        return [
            week(effectiveDate),
            date(effectiveDate),
            parser.getValueDate(),
            amount,
            accountType,
            '',
            parser.getDescription(),
            balance
        ];
    };
};
