const CLIENT_ID = 'ljdUkc5VX2Is7F1j3w';
const CLIENT_SECRET = 'gn)@%yy63Zvh*XOjGU@uMFvQM2#R924*';
const REDIRECT_URI = 'http://127.0.0.1:3333';
const TOKEN_FILE_NAME = 'OAuthSettings.txt'; // File to store tokens
const TICKTICK_API_URL = 'https://ticktick.com';

/**
 * Check and retrieve stored tokens from Google Drive
 */
function getStoredTokens() {
  const files = DriveApp.getFilesByName(TOKEN_FILE_NAME);
  if (files.hasNext()) {
    const file = files.next();
    return JSON.parse(file.getBlob().getDataAsString());
  }
  return null;
}

/**
 * Save tokens to Google Drive
 */
function saveTokens(tokens) {
  const files = DriveApp.getFilesByName(TOKEN_FILE_NAME);
  if (files.hasNext()) {
    const file = files.next();
    file.setContent(JSON.stringify(tokens));
  } else {
    DriveApp.createFile(TOKEN_FILE_NAME, JSON.stringify(tokens));
  }
}

/**
 * Check if the token is expired
 */
function isTokenExpired() {
  const tokens = getStoredTokens();
  if (!tokens) return true;

  const expirationTime = tokens.acquired_at + tokens.expires_in * 1000; // Convert seconds to milliseconds
  const currentTime = Date.now();
  
  Logger.log(`Token Expiration Time: ${expirationTime}`);
  Logger.log(`Current Time: ${currentTime}`);
  Logger.log(`Is expired: ${currentTime >= expirationTime}`)
  return currentTime >= expirationTime;
}

/**
 * Start the OAuth process manually
 */
function startOAuthProcess() {
  const authUrl = `https://ticktick.com/oauth/authorize?scope=tasks:write&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  Logger.log('Please visit this URL and authorize the app: ' + authUrl);

  // Display a prompt to the user
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'TickTick OAuth Authorization',
    `Please visit this URL, authorize the app, and paste the authorization code below:\n\n${authUrl}`,
    ui.ButtonSet.OK_CANCEL
  );

  // Handle user input
  if (response.getSelectedButton() == ui.Button.OK) {
    const authCode = response.getResponseText();
    if (authCode) {
      completeOAuthProcess(authCode);
    } else {
      Logger.log('No authorization code entered. Process canceled.');
    }
  } else {
    Logger.log('Authorization process was canceled.');
  }
}

/**
 * Complete the OAuth process by exchanging the authorization code for tokens
 */
function completeOAuthProcess(authCode) {
  const tokenUrl = 'https://ticktick.com/oauth/token';
  const payload = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
    code: authCode,
  };

  const options = {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload: payload,
  };

  const response = UrlFetchApp.fetch(tokenUrl, options);
  const tokens = JSON.parse(response.getContentText());

  if (tokens.access_token) {
    const tokenData = {
      access_token: tokens.access_token,
      expires_in: tokens.expires_in,
      token_type: tokens.token_type,
      scope: tokens.scope,
      acquired_at: Date.now(), // Record the time when the token was acquired
    };

    // Save the tokens to Google Drive
    saveTokens(tokenData);

    Logger.log('OAuth process completed successfully. Tokens saved.');
  } else {
    throw new Error('Failed to complete OAuth: ' + response.getContentText());
  }
}

/**
 * Make an authenticated API request to TickTick
 */
function makeAuthenticatedRequest(endpoint, method = 'get', payload = null) {
  if (isTokenExpired()) {
    Logger.log('Access token expired. Starting OAuth process...');
    startOAuthProcess();
    return;
  }
  Logger.log('Not expired 1');
  const tokens = getStoredTokens();
  if (!tokens || !tokens.access_token) {
    Logger.log('No access token found. Starting OAuth process...');
    startOAuthProcess();
    return;
  }
  Logger.log('Token Found');

  const headers = {
    Authorization: `Bearer ${tokens.access_token}`,
  };

  const options = {
    method: method,
    headers: headers,
    muteHttpExceptions: true, // Capture full response in case of errors

  };

  if (payload) {
    Logger.log('If payload problem');

    options.contentType = 'application/json';
    options.payload = JSON.stringify(payload);
  }

  try {
    Logger.log("Not Ok");
    const response = UrlFetchApp.fetch(`${TICKTICK_API_URL}${endpoint}`, options);
    Logger.log("Ok 1");
    const responseCode = response.getResponseCode();
    Logger.log('Response Code: ' + responseCode);
    if (responseCode === 401) {
      // Handle unauthorized (token expired or invalid)
      Logger.log('Unauthorized request. Token might have expired or is invalid.');
      startOAuthProcess(); // Re-authenticate the user
      return;
    }
    Logger.log("Ok 2");
    // Log full response on successful request
    Logger.log('API response: ' + response.getContentText());
    Logger.log(response);
    return JSON.parse(response.getContentText());
    
  } catch (error) {
    Logger.log('API request failed: ' + error);
    throw new Error('API request failed: ' + error);
  }
}

/**
 * Format the due date from the sheet to the required format (ensure it's in TickTick's required format)
 */
function formatDueDate(dueDate) {
  if(dueDate!=""){

  
  
  const date = new Date(dueDate);
  Logger.log("Date" + dueDate)
  // Extract components
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  // Format to the required structure
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+0000`;
  Logger.log("Formated date" + formattedDate)
  return formattedDate;
  } else {
    return ""
  }
  
}
/**
 * Example function to create a task in TickTick
 */
function createTaskInTickTick() {
  // Open the spreadsheet by its ID (or use SpreadsheetApp.getActiveSpreadsheet())
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TickTickAPI"); // Make sure your sheet name is 'Tasks' or change it

  // Example: Get specific cell data from row 2 (or whichever row you need)
  const title = sheet.getRange("B4").getValue();  // Row 2, Column 1 (Title)
  const dueDate = sheet.getRange("F4").getValue();  // Row 2, Column 2 (Due Date)
  const priority = sheet.getRange("D4").getValue();  // Row 2, Column 3 (Priority)
  const content = sheet.getRange("E4").getValue();
  Logger.log(`Title: ${title}, Due Date: ${dueDate}, Priority: ${priority}`);

  if (title) {
    const endpoint = '/open/v1/task';
    const payload = {
      "title": title,
      "dueDate": formatDueDate(dueDate), //"2025-01-8T23:00:00+0000"
      "priority": priority, // Medium priority
      "content": content,
    };
  
  const response = makeAuthenticatedRequest(endpoint, 'post', payload);
  Logger.log('Task created: ' + JSON.stringify(response));
  } else {
    Logger.log('Missing required data.');
  }
}
