const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// TODO: Replace with the path to your service account JSON file
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');
const credentials = require(SERVICE_ACCOUNT_PATH);

// Google Sheets setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});
const sheets = google.sheets({ version: 'v4', auth });

// TODO: Replace with your Google Sheet ID
const SPREADSHEET_ID = '1GL6nm3ie_WCLUJcW--xd5mUBy59Fv8Nix3xvlonTCPI';

app.post('/api/collect-email', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:A', // Adjust if your sheet name is different
      valueInputOption: 'RAW',
      requestBody: {
        values: [[email, new Date().toISOString()]],
      },
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save email' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 