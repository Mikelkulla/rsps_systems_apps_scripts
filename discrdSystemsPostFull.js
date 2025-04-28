function exportRangeAsImageAndSendToDiscordAndEmail(message){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dashboard");
  
  //Define the range to exp[ort as an image
  const range = sheet.getRange("D5:N35");
  
  const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  const sheetId = sheet.getSheetId();
  const rangeNotation = range.getA1Notation();
  
  // Create an export URL for the PDF
  const exportUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=pdf&gid=${sheetId}&range=${rangeNotation}` +
                    `&size=a4&portrait=false&fitw=true&top_margin=0.05&bottom_margin=0&left_margin=0.05&right_margin=0.05&gridlines=false`;

  // Generate the current date and time for the file name
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "dd-MM-yyyy HH:mm:ss");
  const fileName = `Dashboard Snapshot ${formattedDate}.pdf`;

  // Fetch the PDF as a blob
  const token = ScriptApp.getOAuthToken();
  const headers = {
    'Authorization': 'Bearer ' + token
  };
  const response = UrlFetchApp.fetch(exportUrl, { headers: headers });
  const pdfBlob = response.getBlob().setName(fileName);

  // Send the PDF to Discord
  const webhookurl = "https://discord.com/api/webhooks/1321759096231297068/U4Qvcxe8MIV3kBWDkuINVP1qTw5bNtMp2QERnAxoIDypkn-5lwsvamYnqm4jLqCPEflK";
  const formData = {
    payload_json: JSON.stringify({ content: '<@1148972441390022657>\n' + message }),
    file: pdfBlob,
  };

  const options = {
    method: "post",
    payload: formData,
  };

  UrlFetchApp.fetch(webhookurl, options);

  Logger.log("PDF sent to Discord.");

  // Send the PDF as an email
  const recipientEmails = ["mikel.kulla84+systemsupdate@gmail.com", "surjakullaa@gmail.com"]; // List of emails
  const subject = "Dashboard Snapshot - " + formattedDate;
  const body = message;

  MailApp.sendEmail({
    to: recipientEmails.join(','),
    subject: subject,
    body: body,
    attachments: [pdfBlob]
  });

  Logger.log("Email sent to recipients.");
}

function captureTheReportText(){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getRange("B4:B10").getValues();
  const message = data.map(row => row[0]).join("\n");
  return message
}

function sendSystemToDicsordAndEmail(){
  combineAll_1()
  message = captureTheReportText()
  exportRangeAsImageAndSendToDiscordAndEmail(message)
}