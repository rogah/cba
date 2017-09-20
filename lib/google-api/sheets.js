const google = require('googleapis');

const createRequest = (data, oauth2Client) => {
    return {
        auth: oauth2Client,
        spreadsheetId: '1MqVk7CTc3NKTauMyNhAePDuAdprF5SjBpUVbhIQCr3k',
        range: 'Details!A:H',
        includeValuesInResponse: false,
        insertDataOption: 'INSERT_ROWS',
        responseDateTimeRenderOption: 'FORMATTED_STRING',
        responseValueRenderOption: 'FORMATTED_VALUE',
        valueInputOption: 'USER_ENTERED',
        resource: {
            range: 'Details!A:H',
            majorDimension: 'ROWS',
            values: data,
        }
    };
};

const append = data => {
    return (oauth2Client) => {
        return new Promise((resolve, reject) => {
            const sheets = google.sheets('v4');
            const request = createRequest(data, oauth2Client);

            sheets.spreadsheets.values.append(request, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    };
};

module.exports = {
    append,
};
