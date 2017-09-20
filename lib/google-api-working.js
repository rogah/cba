var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// client id: 659258546186-tcmgsdng4hsmb4qdeht8jmej5b626d2d.apps.googleusercontent.com
// client secret: MGtFHLWnwerknniPmleYp5vo


// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
//var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var TOKEN_DIR = `${(process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE)}/.credentials/`;
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-jars.json';

fs.readFile('./api/client_secret_659258546186-tcmgsdng4hsmb4qdeht8jmej5b626d2d.apps.googleusercontent.com.json', (err, content) => {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: '1MqVk7CTc3NKTauMyNhAePDuAdprF5SjBpUVbhIQCr3k',
    range: 'Details!A1:H1',
    includeValuesInResponse: true,
    insertDataOption: 'INSERT_ROWS',
    responseDateTimeRenderOption: 'FORMATTED_STRING',
    responseValueRenderOption: 'FORMATTED_VALUE',
    valueInputOption: 'USER_ENTERED',
    resource: {
        range: 'Details!A1:H1',
        majorDimension: 'ROWS',
        values: [
            ['2017-99', '1/1/2017','13/1/2017','-10.34','Saving','','Blablabla', '+9999.99'],
            ['2017-99', '1/2/2017','13/2/2017','-20.34','Current','','Blablabla', '+8888.88'],
        ],
    },
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log(response);
  });
}

module.exports = () => {};