const { google } = require('googleapis');
const config = require('../config/env');
const logger = require('../config/logger');

const auth = new google.auth.OAuth2(
  config.googleClientId,
  config.googleClientSecret
);

auth.setCredentials({
  refresh_token: config.googleRefreshToken
});

const sheets = google.sheets({ version: 'v4', auth });

const appendRow = async (range, values) => {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: config.googleSheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [values]
      }
    });
    return response.data;
  } catch (err) {
    logger.error('Google Sheets Append Error:', err.message);
    throw err;
  }
};

const getRows = async (range) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.googleSheetId,
      range: range
    });
    return response.data.values;
  } catch (err) {
    logger.error('Google Sheets Get Error:', err.message);
    throw err;
  }
};

module.exports = {
  appendRow,
  getRows,
};
