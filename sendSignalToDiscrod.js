function dergomesazhin(){
  // Replace with your Discord webhook URL
  const webhookUrl = "https://discord.com/api/webhooks/1321881426513236043/AKbo7RakwkOFiPQ7YZWl1PzpK6bBBuf078yRajbxktR4j3kkV4BFSlFmrm5bgHV95ouN";

  // Get the active sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get the cell reference from a specific cell (e.g., "A1")
  const cellReference = sheet.getRange("D2").getValue(); // Replace "A1" with the cell containing "D5"
  console.log(cellReference)
  // Get the value from the cell indicated by the reference
  const cellValue = sheet.getRange(cellReference).getValue();

  // Set up the payload
  const payload = {
    content: cellValue
  };

  // Make a POST request to the Discord webhook
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(webhookUrl, options);
}
