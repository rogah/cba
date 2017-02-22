const CURRENT_ACCOUNT_TYPE = 'Current';
const SAVING_ACCOUNT_TYPE = 'Saving';

function isCurrentAccount(type) {
  return type.toLowerCase() === CURRENT_ACCOUNT_TYPE.toLowerCase();
}

function isSavingAccount(type) {
  return type.toLowerCase() === SAVING_ACCOUNT_TYPE.toLowerCase()
}

function parse(type) {
  if (isCurrentAccount(type))
    return CURRENT_ACCOUNT_TYPE;
  else if (isSavingAccount(type))
    return SAVING_ACCOUNT_TYPE;
};

module.exports = {
  parse
};
